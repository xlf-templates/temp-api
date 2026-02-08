import { Request, Response } from 'express'
import { AdminGroup, Admin } from '@/models'
import { ok, fail } from '@/utils/response'
import { Op } from 'sequelize'

export const listAdminGroups = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1
    const pageSize = Number(req.query.pageSize) || 10
    const offset = (page - 1) * pageSize

    const result = await AdminGroup.findAndCountAll({
      limit: pageSize,
      offset,
      order: [['updatedAt', 'DESC']],
      include: [{ model: Admin, as: 'admins' }],
    })

    // 将 rules 字段按 . 分割成数组
    const items = result.rows.map((group: any) => {
      const g = group.toJSON()
      if (g.rules && typeof g.rules === 'string') {
        g.rules = g.rules.split(',')
      } else {
        g.rules = []
      }
      return g
    })

    return ok(res, '获取管理员分组列表成功', {
      items,
      total: result.count,
      page,
      pageSize,
    })
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

export const getAdminGroup = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const group = await AdminGroup.findByPk(id, {
      include: [{ model: Admin, as: 'admins', through: { attributes: [] } }],
    })
    if (!group) return fail(res, '分组不存在', 404)

    // 将 rules 字段按 , 分割成数组
    const g: any = group.toJSON()
    if (g.rules && typeof g.rules === 'string') {
      g.rules = g.rules.split(',')
    }

    return ok(res, '获取分组成功', g)
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}
export const createAdminGroup = async (req: Request, res: Response) => {
  try {
    // 如果 rules 是数组，转成逗号分隔字符串
    if (Array.isArray(req.body.rules)) {
      req.body.rules = req.body.rules.join(',')
    }
    const group = await AdminGroup.create(req.body)
    return ok(res, '创建分组成功', group, 201)
  } catch (error: any) {
    return fail(res, error.message, 400)
  }
}

export const updateAdminGroup = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const group = await AdminGroup.findByPk(id)
    if (!group) return fail(res, '分组不存在', 404)
    // 如果 rules 是数组，转成逗号分隔字符串
    if (Array.isArray(req.body.rules)) {
      req.body.rules = req.body.rules.join(',')
    }
    await group.update(req.body)
    return ok(res, '更新分组成功', group)
  } catch (error: any) {
    return fail(res, error.message, 400)
  }
}

export const deleteAdminGroup = async (
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
    const count = await AdminGroup.destroy({ where: { id: { [Op.in]: ids } } })
    if (!count) {
      res.status(404).json({ success: false, message: '分组不存在' })
      return
    }
    ok(res, '删除分组成功')
    return
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
    return
  }
}
