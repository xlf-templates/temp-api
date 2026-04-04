import { Request, Response } from 'express'
import { PaymentRecord, PurchaseOrder, Supplier } from '@/models'
import { ok, fail } from '@/utils/response'
import { Op } from 'sequelize'

// 获取付款记录列表
export const listPaymentRecords = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1
    const pageSize = Number(req.query.pageSize) || 10
    const offset = (page - 1) * pageSize

    const where: any = {}
    if (req.query.paymentNo) where.paymentNo = { [Op.like]: `%${req.query.paymentNo}%` }
    if (req.query.orderId) where.orderId = Number(req.query.orderId)
    if (req.query.supplierId) where.supplierId = Number(req.query.supplierId)
    if (req.query.status !== undefined) where.status = Number(req.query.status)

    const result = await PaymentRecord.findAndCountAll({
      where,
      limit: pageSize,
      offset,
      order: [['id', 'DESC']],
      include: [
        { model: PurchaseOrder, as: 'order', attributes: ['id', 'orderNo', 'totalAmount', 'paidAmount'] },
        { model: Supplier, as: 'supplier', attributes: ['id', 'name', 'code'] }
      ],
    })

    return ok(res, '获取付款记录列表成功', {
      items: result.rows,
      total: result.count,
      page,
      pageSize,
    })
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

// 获取付款记录详情
export const getPaymentRecord = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const item = await PaymentRecord.findByPk(id, {
      include: [
        { model: PurchaseOrder, as: 'order', attributes: ['id', 'orderNo', 'totalAmount', 'paidAmount'] },
        { model: Supplier, as: 'supplier', attributes: ['id', 'name', 'code'] }
      ],
    })
    
    if (!item) return fail(res, '付款记录不存在', 404)
    return ok(res, '获取付款记录成功', item)
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

// 创建付款记录
export const createPaymentRecord = async (req: Request, res: Response) => {
  try {
    const body = req.body
    
    // 生成付款流水号
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
    body.paymentNo = body.paymentNo || `PAY${dateStr}${randomNum}`
    body.paymentDate = body.paymentDate || new Date()

    const order = await PurchaseOrder.findByPk(body.orderId)
    if (!order) {
      return fail(res, '关联的采购订单不存在', 404)
    }

    if (!body.supplierId) {
      return fail(res, '必须提供付款的供应商ID (supplierId)', 400)
    }

    const tx = await (PaymentRecord.sequelize as any).transaction()
    try {
      const record = await PaymentRecord.create(body, { transaction: tx })

      // 如果付款状态是已确认 (1)，则更新订单的已付金额和付款状态
      if (record.status === 1) {
        const newPaidAmount = Number(order.paidAmount) + Number(record.amount)
        let newPaymentStatus = 1 // 部分付款
        if (newPaidAmount >= order.totalAmount) {
          newPaymentStatus = 2 // 已结清
        }
        await order.update({ 
          paidAmount: newPaidAmount,
          paymentStatus: newPaymentStatus
        }, { transaction: tx })
      }

      await tx.commit()
      return ok(res, '创建付款记录成功', record, 201)
    } catch (e) {
      await tx.rollback()
      throw e
    }
  } catch (error: any) {
    return fail(res, error.message, 400)
  }
}

// 更新付款记录状态 (如：确认付款或驳回)
export const updatePaymentStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const { status } = req.body
    
    if (![1, 2].includes(Number(status))) {
      return fail(res, '无效的状态值', 400)
    }

    const record = await PaymentRecord.findByPk(id)
    if (!record) return fail(res, '付款记录不存在', 404)

    if (record.status !== 0) {
      return fail(res, '只能更新待确认的付款记录', 400)
    }

    const order = await PurchaseOrder.findByPk(record.orderId)
    if (!order) return fail(res, '关联的采购订单不存在', 404)

    const tx = await (PaymentRecord.sequelize as any).transaction()
    try {
      await record.update({ status }, { transaction: tx })

      // 如果是确认付款，更新订单信息
      if (Number(status) === 1) {
        const newPaidAmount = Number(order.paidAmount) + Number(record.amount)
        let newPaymentStatus = 1 // 部分付款
        if (newPaidAmount >= order.totalAmount) {
          newPaymentStatus = 2 // 已结清
        }
        await order.update({ 
          paidAmount: newPaidAmount,
          paymentStatus: newPaymentStatus
        }, { transaction: tx })
      }

      await tx.commit()
      return ok(res, '更新付款状态成功', record)
    } catch (e) {
      await tx.rollback()
      throw e
    }
  } catch (error: any) {
    return fail(res, error.message, 400)
  }
}

// 删除付款记录 (只能删除待确认或已驳回的)
export const deletePaymentRecord = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id)
    const record = await PaymentRecord.findByPk(id)
    
    if (!record) {
      res.status(404).json({ success: false, message: '付款记录不存在' })
      return
    }

    if (record.status === 1) {
      res.status(400).json({ success: false, message: '不能删除已确认的付款记录' })
      return
    }

    await record.destroy()
    ok(res, '删除付款记录成功')
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
}