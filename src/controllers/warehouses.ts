import { Request, Response } from 'express'
import { Warehouse, WarehouseArea, WarehouseLocation } from '@/models'
import { ok, fail } from '@/utils/response'
import { Op } from 'sequelize'

export const listWarehouses = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1
    const pageSize = Number(req.query.pageSize) || 10
    const offset = (page - 1) * pageSize
    const where: any = {}
    if (req.query.code)
      where.warehouseCode = { [Op.like]: `%${req.query.code}%` }
    if (req.query.name) where.name = { [Op.like]: `%${req.query.name}%` }
    if (req.query.status) where.status = Number(req.query.status)
    const result = await Warehouse.findAndCountAll({
      where,
      limit: pageSize,
      offset,
      order: [
        ['sortOrder', 'DESC'],
        ['id', 'ASC'],
      ],
    })
    return ok(res, '获取仓库列表成功', {
      items: result.rows,
      total: result.count,
      page,
      pageSize,
    })
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

export const getWarehouse = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const item = await Warehouse.findByPk(id, {
      include: [
        { model: WarehouseArea, as: 'areas' },
        { model: WarehouseLocation, as: 'locations' },
      ],
    })
    if (!item) return fail(res, '仓库不存在', 404)
    return ok(res, '获取仓库成功', item)
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

export const createWarehouse = async (req: Request, res: Response) => {
  try {
    const next: any = { ...req.body }
    if (next.warehouseCode)
      next.warehouseCode = String(next.warehouseCode).trim()
    if (next.warehouseName)
      next.warehouseName = String(next.warehouseName).trim()
    const item = await Warehouse.create(next)
    return ok(res, '创建仓库成功', item, 201)
  } catch (error: any) {
    return fail(res, error.message, 400)
  }
}

export const updateWarehouse = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const item = await Warehouse.findByPk(id)
    if (!item) return fail(res, '仓库不存在', 404)
    const next: any = { ...req.body }
    if (next.warehouseCode)
      next.warehouseCode = String(next.warehouseCode).trim()
    if (next.warehouseName)
      next.warehouseName = String(next.warehouseName).trim()
    await item.update(next)
    return ok(res, '更新仓库成功', item)
  } catch (error: any) {
    return fail(res, error.message, 400)
  }
}

export const deleteWarehouse = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    let ids: number[]
    if (req.params.id) ids = [Number(req.params.id)]
    else if (req.query.ids && Array.isArray(req.query.ids))
      ids = req.query.ids.map((id: any) => Number(id))
    else {
      res.status(400).json({ success: false, message: '缺少有效的 id 或 ids' })
      return
    }
    const count = await Warehouse.destroy({ where: { id: { [Op.in]: ids } } })
    if (!count) {
      res.status(404).json({ success: false, message: '仓库不存在' })
      return
    }
    ok(res, '删除仓库成功')
    return
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
    return
  }
}
