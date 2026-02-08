import { Request, Response } from 'express'
import { WarehouseLocation, Warehouse, WarehouseArea } from '@/models'
import { ok, fail } from '@/utils/response'
import { Op } from 'sequelize'

export const listWarehouseLocations = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1
    const pageSize = Number(req.query.pageSize) || 10
    const offset = (page - 1) * pageSize
    const where: any = {}
    if (req.query.warehouseId) where.warehouseId = Number(req.query.warehouseId)

    if (req.query.locationCode)
      where.locationCode = { [Op.like]: `%${req.query.locationCode}%` }
    if (req.query.name) where.name = { [Op.like]: `%${req.query.name}%` }
    const result = await WarehouseLocation.findAndCountAll({
      where,
      limit: pageSize,
      offset,
      order: [
        ['sortOrder', 'DESC'],
        ['id', 'ASC'],
      ],
      include: [
        { model: Warehouse, as: 'warehouse' },
        { model: WarehouseArea, as: 'area' },
      ],
    })
    return ok(res, '获取库位列表成功', {
      items: result.rows,
      total: result.count,
      page,
      pageSize,
    })
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

export const getWarehouseLocation = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const item = await WarehouseLocation.findByPk(id, {
      include: [{ model: Warehouse, as: 'warehouse' }],
    })
    if (!item) return fail(res, '库位不存在', 404)
    return ok(res, '获取库位成功', item)
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

export const createWarehouseLocation = async (req: Request, res: Response) => {
  try {
    const next: any = { ...req.body }
    if (next.locationCode) next.locationCode = String(next.locationCode).trim()
    if (next.name) next.name = String(next.name).trim()
    const item = await WarehouseLocation.create(next)
    return ok(res, '创建库位成功', item, 201)
  } catch (error: any) {
    return fail(res, error.message, 400)
  }
}

export const updateWarehouseLocation = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const item = await WarehouseLocation.findByPk(id)
    if (!item) return fail(res, '库位不存在', 404)
    const next: any = { ...req.body }
    if (next.locationCode) next.locationCode = String(next.locationCode).trim()
    if (next.name) next.name = String(next.name).trim()
    await item.update(next)
    return ok(res, '更新库位成功', item)
  } catch (error: any) {
    return fail(res, error.message, 400)
  }
}

export const deleteWarehouseLocation = async (
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
    const count = await WarehouseLocation.destroy({
      where: { id: { [Op.in]: ids } },
    })
    if (!count) {
      res.status(404).json({ success: false, message: '库位不存在' })
      return
    }
    ok(res, '删除库位成功')
    return
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
    return
  }
}
