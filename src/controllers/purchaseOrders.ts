import { Request, Response } from 'express'
import {
  PurchaseOrder,
  PurchaseOrderDetail,
  Supplier,
  Admin,
  Goods,
} from '@/models'
import { ok, fail } from '@/utils/response'
import { Op } from 'sequelize'

// 获取采购订单列表
export const listPurchaseOrders = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1
    const pageSize = Number(req.query.pageSize) || 10
    const offset = (page - 1) * pageSize

    const where: any = {}
    if (req.query.orderNo)
      where.orderNo = { [Op.like]: `%${req.query.orderNo}%` }
    if (req.query.status !== undefined) where.status = Number(req.query.status)
    if (req.query.paymentStatus !== undefined)
      where.paymentStatus = Number(req.query.paymentStatus)

    const result = await PurchaseOrder.findAndCountAll({
      where,
      limit: pageSize,
      offset,
      order: [['id', 'DESC']],
      include: [
        {
          model: Admin,
          as: 'buyer',
          attributes: ['id', 'username', 'realName'],
        },
        {
          model: PurchaseOrderDetail,
          as: 'details',
          include: [
            {
              model: Supplier,
              as: 'supplier',
              attributes: ['id', 'name', 'code'],
            },
          ],
        },
      ],
    })

    return ok(res, '获取采购订单列表成功', {
      items: result.rows,
      total: result.count,
      page,
      pageSize,
    })
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

// 获取采购订单详情
export const getPurchaseOrder = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const item = await PurchaseOrder.findByPk(id, {
      include: [
        {
          model: Admin,
          as: 'buyer',
          attributes: ['id', 'username', 'realName'],
        },
        {
          model: PurchaseOrderDetail,
          as: 'details',
          include: [
            { model: Goods, as: 'goods' },
            {
              model: Supplier,
              as: 'supplier',
              attributes: ['id', 'name', 'code'],
            },
          ],
        },
      ],
    })

    if (!item) return fail(res, '采购订单不存在', 404)
    return ok(res, '获取采购订单成功', item)
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

// 创建采购订单（包含详情）
export const createPurchaseOrder = async (req: Request, res: Response) => {
  try {
    const { details, ...body } = req.body

    // 生成订单号 (简单示例，实际可能需要更复杂的规则)
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    const randomNum = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0')
    body.orderNo = body.orderNo || `PO${dateStr}${randomNum}`

    const tx = await (PurchaseOrder.sequelize as any).transaction()
    try {
      const order = await PurchaseOrder.create(body, { transaction: tx })

      if (Array.isArray(details) && details.length > 0) {
        const detailRows = details.map((d: any) => ({
          orderId: order.id,
          goodsId: d.goodsId,
          supplierId: d.supplierId, // 添加供应商ID
          quantity: d.quantity,
          unitPrice: d.unitPrice,
          remark: d.remark,
        }))
        await PurchaseOrderDetail.bulkCreate(detailRows, { transaction: tx })
      }

      // 重新计算订单总金额
      const allDetails = await PurchaseOrderDetail.findAll({
        where: { orderId: order.id },
        transaction: tx,
      })
      const totalAmount = allDetails.reduce(
        (sum, d) => sum + Number(d.amount),
        0,
      )
      await order.update({ totalAmount }, { transaction: tx })

      await tx.commit()

      const created = await PurchaseOrder.findByPk(order.id, {
        include: [{ model: PurchaseOrderDetail, as: 'details' }],
      })
      return ok(res, '创建采购订单成功', created, 201)
    } catch (e) {
      await tx.rollback()
      throw e
    }
  } catch (error: any) {
    return fail(res, error.message, 400)
  }
}

// 更新采购订单
export const updatePurchaseOrder = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const item = await PurchaseOrder.findByPk(id)
    if (!item) return fail(res, '采购订单不存在', 404)

    // 如果订单已完成或已取消，通常不允许修改
    if (item.status === 3 || item.status === 4) {
      return fail(res, '当前状态下不可修改订单', 400)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { details, orderNo, ...body } = req.body // 不允许修改订单号

    const tx = await (PurchaseOrder.sequelize as any).transaction()
    try {
      await item.update(body, { transaction: tx })

      // 更新详情逻辑：删除旧的，创建新的 (简化的全量替换逻辑)
      if (Array.isArray(details)) {
        await PurchaseOrderDetail.destroy({
          where: { orderId: id },
          transaction: tx,
        })
        if (details.length > 0) {
          const detailRows = details.map((d: any) => ({
            orderId: id,
            goodsId: d.goodsId,
            supplierId: d.supplierId, // 添加供应商ID
            quantity: d.quantity,
            unitPrice: d.unitPrice,
            remark: d.remark,
          }))
          await PurchaseOrderDetail.bulkCreate(detailRows, { transaction: tx })
        }
      }

      // 重新计算订单总金额
      const allDetails = await PurchaseOrderDetail.findAll({
        where: { orderId: id },
        transaction: tx,
      })
      const totalAmount = allDetails.reduce(
        (sum, d) => sum + Number(d.amount),
        0,
      )
      await item.update({ totalAmount }, { transaction: tx })

      await tx.commit()

      const updated = await PurchaseOrder.findByPk(id, {
        include: [{ model: PurchaseOrderDetail, as: 'details' }],
      })
      return ok(res, '更新采购订单成功', updated)
    } catch (e) {
      await tx.rollback()
      throw e
    }
  } catch (error: any) {
    return fail(res, error.message, 400)
  }
}

// 删除采购订单
export const deletePurchaseOrder = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = Number(req.params.id)
    const item = await PurchaseOrder.findByPk(id)

    if (!item) {
      res.status(404).json({ success: false, message: '采购订单不存在' })
      return
    }

    if (item.status !== 0 && item.status !== 4) {
      res
        .status(400)
        .json({ success: false, message: '只能删除待审核或已取消的订单' })
      return
    }

    const tx = await (PurchaseOrder.sequelize as any).transaction()
    try {
      await PurchaseOrderDetail.destroy({
        where: { orderId: id },
        transaction: tx,
      })
      await item.destroy({ transaction: tx })
      await tx.commit()
      ok(res, '删除采购订单成功')
    } catch (e) {
      await tx.rollback()
      throw e
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
}
