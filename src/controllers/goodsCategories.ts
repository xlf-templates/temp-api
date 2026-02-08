import { Request, Response } from 'express'
import { GoodsCategory } from '@/models'
import { ok, fail } from '@/utils/response'
import { Op } from 'sequelize'

export const listGoodsCategories = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1
    const pageSize = Number(req.query.pageSize) || 10
    const offset = (page - 1) * pageSize
    const parentId = req.query.parentId ? Number(req.query.parentId) : undefined

    // 构建查询条件
    const where: any = {}
    if (parentId !== undefined) {
      where.parentId = parentId
    }

    // 模糊搜索 name, enName, code
    if (req.query.name) {
      where.name = { [Op.like]: `%${req.query.name}%` }
    }
    if (req.query.enName) {
      where.enName = { [Op.like]: `%${req.query.enName}%` }
    }
    if (req.query.code) {
      where.code = { [Op.like]: `%${req.query.code}%` }
    }

    // status 数组包含
    if (req.query.status) {
      const statusArr = Array.isArray(req.query.status)
        ? req.query.status
        : [req.query.status]
      where.status = { [Op.in]: statusArr }
    }

    const result = await GoodsCategory.findAndCountAll({
      where,
      limit: pageSize,
      offset,
      order: [
        ['sort', 'DESC'],
        ['id', 'ASC'],
      ],
    })

    return ok(res, '获取商品分类列表成功', {
      items: result.rows,
      total: result.count,
      page,
      pageSize,
    })
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

export const getGoodsCategory = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const category = await GoodsCategory.findByPk(id, {
      include: [{ model: GoodsCategory, as: 'children' }],
    })
    if (!category) return fail(res, '分类不存在', 404)
    return ok(res, '获取分类成功', category)
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

export const createGoodsCategory = async (req: Request, res: Response) => {
  try {
    // const parentId = req.body.parentId || 0
    const category = await GoodsCategory.create(req.body)
    return ok(res, '创建分类成功', category, 201)
  } catch (error: any) {
    return fail(res, error.message, 400)
  }
}

export const updateGoodsCategory = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const category = await GoodsCategory.findByPk(id)
    if (!category) return fail(res, '分类不存在', 404)
    await category.update(req.body)
    return ok(res, '更新分类成功', category)
  } catch (error: any) {
    return fail(res, error.message, 400)
  }
}

export const deleteGoodsCategory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // 支持单个 id 或 ids 数组
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

    const count = await GoodsCategory.destroy({
      where: { id: { [Op.in]: ids } },
    })
    if (!count) {
      res.status(404).json({ success: false, message: '分类不存在' })
      return
    }
    ok(res, '删除分类成功')
    return
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
    return
  }
}
