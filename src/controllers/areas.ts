import { Request, Response } from 'express'
import { Area } from '@/models'
import { ok, fail } from '@/utils/response'
import { Op } from 'sequelize'

export const listAreas = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1
    const pageSize = Number(req.query.pageSize) || 10
    const offset = (page - 1) * pageSize
    const where: any = {}
    const includeChildren =
      String(req.query.tree || '').toLowerCase() === 'true'

    // 当 tree 为 true 时，强制只查 parentId 为 null 的顶级节点
    if (includeChildren) {
      where.parentId = null
    } else {
      if (req.query.parentId === 'null') where.parentId = null
      else if (req.query.parentId !== undefined)
        where.parentId = Number(req.query.parentId)
    }

    if (req.query.name) where.name = { [Op.like]: `%${req.query.name}%` }
    if (req.query.code) where.code = { [Op.like]: `%${req.query.code}%` }

    if (req.query.status) {
      const statusArr = Array.isArray(req.query.status)
        ? req.query.status
        : [req.query.status]
      where.status = { [Op.in]: statusArr }
    }

    const result = await Area.findAndCountAll({
      where,
      limit: pageSize,
      offset,
      order: [
        ['sort', 'DESC'],
        ['id', 'ASC'],
      ],
      include: includeChildren ? [{ model: Area, as: 'children' }] : undefined,
    })
    return ok(res, '获取地区列表成功', {
      items: result.rows,
      total: result.count,
      page,
      pageSize,
    })
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

export const listProvinces = async (req: Request, res: Response) => {
  try {
    const where: any = { parentId: null }
    if (req.query.name) where.name = { [Op.like]: `%${req.query.name}%` }
    if (req.query.status) {
      const statusArr = Array.isArray(req.query.status)
        ? req.query.status
        : [req.query.status]
      where.status = { [Op.in]: statusArr }
    }
    const includeChildren =
      String(req.query.tree || '').toLowerCase() === 'true'
    const items = await Area.findAll({
      where,
      order: [
        ['sort', 'DESC'],
        ['id', 'ASC'],
      ],
      include: includeChildren ? [{ model: Area, as: 'children' }] : undefined,
    })
    return ok(res, '获取省份成功', { items })
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

export const listCities = async (req: Request, res: Response) => {
  try {
    const where: any = {}
    if (req.query.provinceId) where.parentId = Number(req.query.provinceId)
    else where.parentId = { [Op.ne]: null }
    if (req.query.name) where.name = { [Op.like]: `%${req.query.name}%` }
    if (req.query.status) {
      const statusArr = Array.isArray(req.query.status)
        ? req.query.status
        : [req.query.status]
      where.status = { [Op.in]: statusArr }
    }
    const items = await Area.findAll({
      where,
      order: [
        ['sort', 'DESC'],
        ['id', 'ASC'],
      ],
    })
    return ok(res, '获取城市成功', { items })
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

export const getArea = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const item = await Area.findByPk(id, {
      include: [
        { model: Area, as: 'children' },
        { model: Area, as: 'parent' },
      ],
    })
    if (!item) return fail(res, '地区不存在', 404)
    return ok(res, '获取地区成功', item)
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

export const createArea = async (req: Request, res: Response) => {
  try {
    const parentId = req.body.parentId ?? null
    if (parentId !== null) {
      const parent = await Area.findByPk(Number(parentId))
      if (!parent) return fail(res, '父级不存在', 400)
      if (parent.parentId !== null) return fail(res, '父级必须为省级', 400)
    }
    const item = await Area.create(req.body)
    return ok(res, '创建地区成功', item, 201)
  } catch (error: any) {
    return fail(res, error.message, 400)
  }
}

export const updateArea = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const item = await Area.findByPk(id)
    if (!item) return fail(res, '地区不存在', 404)
    const parentId = req.body.parentId ?? item.parentId
    if (parentId !== null) {
      const parent = await Area.findByPk(Number(parentId))
      if (!parent) return fail(res, '父级不存在', 400)
      if (parent.parentId !== null) return fail(res, '父级必须为省级', 400)
    }
    await item.update(req.body)
    return ok(res, '更新地区成功', item)
  } catch (error: any) {
    return fail(res, error.message, 400)
  }
}

export const deleteArea = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    let ids: number[]

    if (req.params.id) {
      ids = [Number(req.params.id)]
    } else if (req.query.ids && Array.isArray(req.query.ids)) {
      ids = req.query.ids.map((id: any) => Number(id))
      console.log({ ids })
    } else {
      res.status(400).json({ success: false, message: '缺少有效的 id 或 ids' })
      return
    }

    const count = await Area.destroy({ where: { id: { [Op.in]: ids } } })
    if (!count) {
      res.status(404).json({ success: false, message: '地区不存在' })
      return
    }
    ok(res, '删除地区成功')
    return
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
    return
  }
}
