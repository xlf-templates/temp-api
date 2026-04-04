import { Request, Response } from 'express'
import { PurchaseOrderDetail, PurchaseOrder, Goods, Supplier } from '@/models'
import { ok, fail } from '@/utils/response'

// 获取采购订单详情列表
export const listPurchaseOrderDetails = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1
    const pageSize = Number(req.query.pageSize) || 10
    const offset = (page - 1) * pageSize

    const where: any = {}
    if (req.query.orderId) where.orderId = Number(req.query.orderId)
    if (req.query.goodsId) where.goodsId = Number(req.query.goodsId)
    if (req.query.supplierId) where.supplierId = Number(req.query.supplierId)
    if (req.query.status !== undefined) where.status = Number(req.query.status)

    const result = await PurchaseOrderDetail.findAndCountAll({
      where,
      limit: pageSize,
      offset,
      order: [['id', 'DESC']],
      include: [
        { model: PurchaseOrder, as: 'order', attributes: ['id', 'orderNo', 'status'] },
        { model: Goods, as: 'goods', attributes: ['id', 'name', 'code'] },
        { model: Supplier, as: 'supplier', attributes: ['id', 'name', 'code'] }
      ],
    })

    return ok(res, '获取采购订单详情列表成功', {
      items: result.rows,
      total: result.count,
      page,
      pageSize,
    })
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

// 获取单个采购订单详情
export const getPurchaseOrderDetail = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const item = await PurchaseOrderDetail.findByPk(id, {
      include: [
        { model: PurchaseOrder, as: 'order', attributes: ['id', 'orderNo', 'status'] },
        { model: Goods, as: 'goods', attributes: ['id', 'name', 'code'] },
        { model: Supplier, as: 'supplier', attributes: ['id', 'name', 'code'] }
      ],
    })
    
    if (!item) return fail(res, '采购订单详情不存在', 404)
    return ok(res, '获取采购订单详情成功', item)
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

// 更新采购订单详情（例如更新收货数量）
export const updatePurchaseOrderDetail = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const { receivedQuantity, status, remark } = req.body
    
    const detail = await PurchaseOrderDetail.findByPk(id)
    if (!detail) return fail(res, '采购订单详情不存在', 404)

    const order = await PurchaseOrder.findByPk(detail.orderId)
    if (!order) return fail(res, '关联的采购订单不存在', 404)

    // 如果订单已完成或已取消，不允许修改详情
    if (order.status === 3 || order.status === 4) {
      return fail(res, '当前订单状态下不可修改详情', 400)
    }

    const tx = await (PurchaseOrderDetail.sequelize as any).transaction()
    try {
      // 验证收货数量
      let newReceivedQty = detail.receivedQty
      let newStatus = detail.status

      if (receivedQuantity !== undefined) {
        newReceivedQty = Number(receivedQuantity)
        if (newReceivedQty < 0) {
          throw new Error('收货数量不能为负数')
        }
        if (newReceivedQty > detail.quantity) {
          throw new Error('收货数量不能大于采购数量')
        }

        // 自动判断状态
        if (newReceivedQty === 0) {
          newStatus = 0 // 未收货
        } else if (newReceivedQty < detail.quantity) {
          newStatus = 1 // 部分收货
        } else {
          newStatus = 2 // 已全部收货
        }
      }

      // 如果客户端直接传了 status，覆盖自动判断的值
      if (status !== undefined) {
        newStatus = Number(status)
      }

      await detail.update({
        receivedQty: newReceivedQty,
        status: newStatus,
        remark: remark !== undefined ? remark : detail.remark
      }, { transaction: tx })

      // TODO: 这里可以加入联动逻辑：如果所有的 detail 都已收货，则更新主订单的 status 为已完成

      await tx.commit()
      return ok(res, '更新采购订单详情成功', detail)
    } catch (e) {
      await tx.rollback()
      throw e
    }
  } catch (error: any) {
    return fail(res, error.message, 400)
  }
}
