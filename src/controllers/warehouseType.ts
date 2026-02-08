import { Request, Response } from 'express'
import { WarehouseType } from '@/models'
import { ok, fail } from '@/utils/response'
import { Op } from 'sequelize'

export const listWarehouseTypes = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1
    const pageSize = Number(req.query.pageSize) || 10
    const offset = (page - 1) * pageSize

    const where: any = {}
    if (req.query.name) where.name = { [Op.like]: `%${req.query.name}%` }
    if (req.query.status) {
      const arr = Array.isArray(req.query.status)
        ? req.query.status.map((item: any) => Number(item))
        : [Number(req.query.status)]
      where.status = { [Op.in]: arr }
    }

    const result = await WarehouseType.findAndCountAll({
      where,
      limit: pageSize,
      offset,
      order: [
        ['sort', 'DESC'],
        ['id', 'ASC'],
      ],
    })
    return ok(res, '获取仓库类型列表成功', {
      items: result.rows,
      total: result.count,
      page,
      pageSize,
    })
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

export const getWarehouseType = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const item = await WarehouseType.findByPk(id)
    if (!item) return fail(res, '仓库类型不存在', 404)
    return ok(res, '获取仓库类型成功', item)
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

export const createWarehouseType = async (req: Request, res: Response) => {
  try {
    const item = await WarehouseType.create(req.body)
    return ok(res, '创建仓库类型成功', item, 201)
  } catch (error: any) {
    return fail(res, error.message, 400)
  }
}

export const updateWarehouseType = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const item = await WarehouseType.findByPk(id)
    if (!item) return fail(res, '仓库类型不存在', 404)
    await item.update(req.body)
    return ok(res, '更新仓库类型成功', item)
  } catch (error: any) {
    return fail(res, error.message, 400)
  }
}

export const deleteWarehouseType = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    let ids: number[]
    if (req.params.id) {
      ids = [Number(req.params.id)]
    } else if (req.query.ids && Array.isArray(req.query.ids)) {
      ids = req.query.ids.map((id: any) => Number(id))
    } else {
      res.status(400).json({ success: false, message: '缺少有效的 id 或 ids' })
      return
    }
    const count = await WarehouseType.destroy({
      where: { id: { [Op.in]: ids } },
    })
    if (!count) {
      res.status(404).json({ success: false, message: '仓库类型不存在' })
      return
    }
    ok(res, '删除仓库类型成功')
    return
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
    return
  }
}
