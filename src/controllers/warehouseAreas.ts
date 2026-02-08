import { Request, Response } from 'express'
import { WarehouseArea, Warehouse } from '@/models'
import { ok, fail } from '@/utils/response'
import { Op } from 'sequelize'

export const listWarehouseAreas = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1
    const pageSize = Number(req.query.pageSize) || 10
    const offset = (page - 1) * pageSize
    const where: any = {}
    if (req.query.warehouseId) where.warehouseId = Number(req.query.warehouseId)
    if (req.query.areaCode) where.areaCode = { [Op.like]: `%${req.query.areaCode}%` }
    if (req.query.areaName) where.areaName = { [Op.like]: `%${req.query.areaName}%` }
    if (req.query.status) where.status = Number(req.query.status)
    const result = await WarehouseArea.findAndCountAll({
      where,
      limit: pageSize,
      offset,
      order: [['sortOrder', 'DESC'], ['id', 'ASC']],
      include: [{ model: Warehouse, as: 'warehouse' }],
    })
    return ok(res, '获取库区列表成功', {
      items: result.rows,
      total: result.count,
      page,
      pageSize,
    })
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

export const getWarehouseArea = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const item = await WarehouseArea.findByPk(id, { include: [{ model: Warehouse, as: 'warehouse' }] })
    if (!item) return fail(res, '库区不存在', 404)
    return ok(res, '获取库区成功', item)
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

export const createWarehouseArea = async (req: Request, res: Response) => {
  try {
    const next: any = { ...req.body }
    if (next.areaCode) next.areaCode = String(next.areaCode).trim()
    if (next.areaName) next.areaName = String(next.areaName).trim()
    const item = await WarehouseArea.create(next)
    return ok(res, '创建库区成功', item, 201)
  } catch (error: any) {
    return fail(res, error.message, 400)
  }
}

export const updateWarehouseArea = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const item = await WarehouseArea.findByPk(id)
    if (!item) return fail(res, '库区不存在', 404)
    const next: any = { ...req.body }
    if (next.areaCode) next.areaCode = String(next.areaCode).trim()
    if (next.areaName) next.areaName = String(next.areaName).trim()
    await item.update(next)
    return ok(res, '更新库区成功', item)
  } catch (error: any) {
    return fail(res, error.message, 400)
  }
}

export const deleteWarehouseArea = async (req: Request, res: Response): Promise<void> => {
  try {
    let ids: number[]
    if (req.params.id) ids = [Number(req.params.id)]
    else if (req.query.ids && Array.isArray(req.query.ids)) ids = req.query.ids.map((id: any) => Number(id))
    else {
      res.status(400).json({ success: false, message: '缺少有效的 id 或 ids' })
      return
    }
    const count = await WarehouseArea.destroy({ where: { id: { [Op.in]: ids } } })
    if (!count) {
      res.status(404).json({ success: false, message: '库区不存在' })
      return
    }
    ok(res, '删除库区成功')
    return
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
    return
  }
}
