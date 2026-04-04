import { Request, Response } from 'express'
import {
  WarehouseLocation,
  Warehouse,
  WarehouseLocationType,
  Zone,
} from '@/models'
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
        ['sort', 'DESC'],
        ['id', 'ASC'],
      ],
      include: [
        { model: Warehouse, as: 'warehouse' },
        { model: WarehouseLocationType, as: 'type' },
        { model: Zone, as: 'zone' },
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

export const bulkCreateWarehouseLocations = async (
  req: Request,
  res: Response,
) => {
  try {
    const items = req.body?.items
    if (!Array.isArray(items) || items.length === 0) {
      return fail(res, 'body.items 不能为空数组', 400)
    }

    const rows: any[] = []
    const errors: any[] = []
    const seen = new Set<string>()

    items.forEach((raw: any, index: number) => {
      const warehouseId = Number(raw?.warehouseId)
      const locationCode = String(raw?.locationCode ?? '').trim()
      const name = String(raw?.name ?? '').trim()

      if (!warehouseId || Number.isNaN(warehouseId)) {
        errors.push({
          index,
          field: 'warehouseId',
          message: 'warehouseId 必填',
        })
        return
      }
      if (!locationCode) {
        errors.push({
          index,
          field: 'locationCode',
          message: 'locationCode 必填',
        })
        return
      }
      if (!name) {
        errors.push({ index, field: 'name', message: 'name 必填' })
        return
      }

      const key = `${warehouseId}::${locationCode}`
      if (seen.has(key)) {
        errors.push({
          index,
          field: 'locationCode',
          message: '同一仓库下 locationCode 重复',
        })
        return
      }
      seen.add(key)

      const row: any = {
        warehouseId,
        locationCode,
        name,
      }

      if (raw?.zoneId !== undefined && raw?.zoneId !== null)
        row.zoneId = Number(raw.zoneId)
      if (raw?.locationType !== undefined && raw?.locationType !== null)
        row.locationType = Number(raw.locationType)
      if (raw?.shelfNo !== undefined && raw?.shelfNo !== null)
        row.shelfNo = String(raw.shelfNo).trim()
      if (raw?.layerNo !== undefined && raw?.layerNo !== null)
        row.layerNo = String(raw.layerNo).trim()
      if (raw?.positionNo !== undefined && raw?.positionNo !== null)
        row.positionNo = String(raw.positionNo).trim()
      if (raw?.maxWeight !== undefined && raw?.maxWeight !== null)
        row.maxWeight = Number(raw.maxWeight)
      if (raw?.maxVolume !== undefined && raw?.maxVolume !== null)
        row.maxVolume = Number(raw.maxVolume)
      if (raw?.length !== undefined && raw?.length !== null)
        row.length = Number(raw.length)
      if (raw?.width !== undefined && raw?.width !== null)
        row.width = Number(raw.width)
      if (raw?.height !== undefined && raw?.height !== null)
        row.height = Number(raw.height)
      if (raw?.sort !== undefined && raw?.sort !== null)
        row.sort = Number(raw.sort)
      if (raw?.status !== undefined && raw?.status !== null)
        row.status = Number(raw.status)
      if (raw?.remark !== undefined && raw?.remark !== null)
        row.remark = String(raw.remark)

      rows.push(row)
    })

    if (errors.length) return fail(res, '参数错误', 400, errors)

    const tx = await (WarehouseLocation.sequelize as any).transaction()
    try {
      await WarehouseLocation.bulkCreate(rows, {
        transaction: tx,
        validate: true,
      })
      await tx.commit()
    } catch (e) {
      await tx.rollback()
      throw e
    }

    const created = await WarehouseLocation.findAll({
      where: {
        [Op.or]: rows.map((r) => ({
          warehouseId: r.warehouseId,
          locationCode: r.locationCode,
        })),
      },
      include: [
        { model: Warehouse, as: 'warehouse' },
        { model: WarehouseLocationType, as: 'type' },
        { model: Zone, as: 'zone' },
      ],
      order: [['id', 'ASC']],
    })

    return ok(
      res,
      '批量创建库位成功',
      { items: created, total: created.length },
      201,
    )
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
export const getMaxShelfNoByWarehouseId = async (
  req: Request,
  res: Response,
) => {
  try {
    const warehouseId = Number(req.query.warehouseId)
    console.log('warehouseId', warehouseId)

    if (!warehouseId || Number.isNaN(warehouseId)) {
      return fail(res, 'warehouseId 必填且为数字', 400)
    }

    const maxShelf = await WarehouseLocation.max('shelfNo', {
      where: { warehouseId },
    })

    return ok(res, '获取最大 shelfNo 成功', {
      warehouseId,
      maxShelfNo: maxShelf ?? 0,
    })
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}
