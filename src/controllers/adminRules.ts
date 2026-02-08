import { Request, Response } from 'express'
import { AdminRules, AdminGroup } from '@/models'
import { ok, fail } from '@/utils/response'
import { buildRuleTree } from '@/utils/permissions'
import { getCurrentUser } from '@/utils/requestContext'
export const listAdminRules = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1
    const pageSize = Number(req.query.pageSize) || 10
    const offset = (page - 1) * pageSize
    const parentId = req.query.parentId ? Number(req.query.parentId) : undefined

    const result = await AdminRules.findAndCountAll({
      // 顶层列表只展示根节点（parentId 为 null）；如果传了 parentId，则展示该 parentId 下的子节点
      where: parentId !== undefined ? { parentId } : { parentId: null },
      limit: pageSize,
      offset,
      order: [
        ['sort', 'DESC'],
        ['id', 'ASC'],
      ],
      include: [{ model: AdminRules, as: 'children' }],
    })
    return ok(res, '获取规则列表成功', {
      items: result.rows,
      total: result.count,
      page,
      pageSize,
    })
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

export const getAdminRule = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const rule = await AdminRules.findByPk(id, {
      include: [
        { model: AdminRules, as: 'children' },
        { model: AdminRules, as: 'parent' },
      ],
    })
    if (!rule) return fail(res, '规则不存在', 404)
    return ok(res, '获取规则成功', rule)
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

export const createAdminRule = async (req: Request, res: Response) => {
  try {
    const rule = await AdminRules.create(req.body)
    return ok(res, '创建规则成功', rule, 201)
  } catch (error: any) {
    return fail(res, error.message, 400)
  }
}

export const updateAdminRule = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const rule = await AdminRules.findByPk(id)
    if (!rule) return fail(res, '规则不存在', 404)
    await rule.update(req.body)
    return ok(res, '更新规则成功', rule)
  } catch (error: any) {
    return fail(res, error.message, 400)
  }
}

export const deleteAdminRule = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = Number(req.params.id)
    const count = await AdminRules.destroy({ where: { id } })
    if (!count) {
      res.status(404).json({ success: false, message: '规则不存在' })
      return
    }
    ok(res, '删除规则成功')
    return
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
    return
  }
}

// 当前登录用户的可用规则（可选类型过滤与树形返回）
export const listMyRules = async (req: Request, res: Response) => {
  try {
    const uid = getCurrentUser()?.id
    if (!uid) return fail(res, '未登录或令牌无效', 401)

    // 查询用户所在的组（单组）
    const { Admin } = await import('@/models')
    const user = await Admin.findByPk(uid)
    if (!user || user.groupId == null) return fail(res, '用户未分配权限组', 403)
    const group = await AdminGroup.findByPk(user.groupId)
    if (!group) return fail(res, '权限组不存在', 404)
    const ruleSpec = (group as any).rules as string

    let rules: any[] = []

    // 如果是 *，返回所有规则
    if (ruleSpec === '*') {
      rules = await AdminRules.findAll({
        order: [
          ['sort', 'DESC'],
          ['id', 'ASC'],
        ],
      })
    } else {
      // const ids = ruleSpec
      //   .split(',')
      //   .map((id: string) => Number(id.trim()))
      //   .filter(Boolean)
      // if (!ids.length) return ok(res, '获取我的规则树成功', [])
      // rules = await AdminRules.findAll({
      //   where: { id: ids },
      //   order: [
      //     ['sort', 'DESC'],
      //     ['id', 'ASC'],
      //   ],
      // })
      const ids = ruleSpec
        .split(',')
        .map((id: string) => Number(id.trim()))
        .filter(Boolean)

      if (!ids.length) return ok(res, '获取我的规则树成功', [])

      // 先查询目标规则
      const targetRules = await AdminRules.findAll({
        where: { id: ids },
        order: [
          ['sort', 'DESC'],
          ['id', 'ASC'],
        ],
      })

      // 找出父级ID
      const parentIds = targetRules
        .map((rule) => rule.parentId)
        .filter(
          (parentId): parentId is number =>
            parentId !== null && !ids.includes(parentId),
        )

      // 去重
      const uniqueParentIds = [...new Set(parentIds)]

      rules = [...targetRules]

      // 查询父级规则
      if (uniqueParentIds.length > 0) {
        const parentRules = await AdminRules.findAll({
          where: { id: uniqueParentIds },
          order: [
            ['sort', 'DESC'],
            ['id', 'ASC'],
          ],
        })
        rules = [...rules, ...parentRules]
      }
    }

    // 树形返回
    const tree = buildRuleTree(rules)
    return ok(res, '获取我的规则树成功', tree)
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}
