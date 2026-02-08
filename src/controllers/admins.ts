import { Request, Response } from 'express'
import { Admin, AdminGroup, AdminLog } from '@/models'
import { Op } from 'sequelize'
import { signToken, generateNodePassword } from '@/utils/jwt'
import { ok, fail } from '@/utils/response'
import { getCurrentUser } from '@/utils/requestContext'

// 列表（分页）
export const listAdmins = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1
    const pageSize = Number(req.query.pageSize) || 10
    const offset = (page - 1) * pageSize

    const result = await Admin.findAndCountAll({
      limit: pageSize,
      offset,
      order: [['id', 'DESC']],
      include: [{ model: AdminGroup, as: 'group' }],
    })

    return ok(res, '获取管理员列表成功', {
      items: result.rows.map((u) => u.toSafeJSON()),
      total: result.count,
      page,
      pageSize,
    })
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

// 详情
export const getAdmin = async (req: Request, res: Response) => {
  try {
    // 从 header 的 token 中解析出当前登录管理员 id
    const id = getCurrentUser()?.id
    if (!id) return fail(res, '未登录或 token 无效', 401)

    const admin = await Admin.findByPk(id, {
      include: [
        { model: AdminGroup, as: 'group' },
        { model: AdminLog, as: 'logs', limit: 20, order: [['id', 'DESC']] },
      ],
    })
    if (!admin) return fail(res, '管理员不存在', 404)
    return ok(res, '获取管理员成功', admin.toSafeJSON())
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

// 创建
export const createAdmin = async (req: Request, res: Response) => {
  const pwd = generateNodePassword()
  try {
    const { groupId, ...restBody } = req.body
    const body = Object.assign({}, restBody, {
      password: pwd,
      initPassword: pwd,
      isUpdatePassword: 0,
    })
    const admin = await Admin.create({ ...body, groupId: groupId ?? null })

    return ok(res, '创建管理员成功', admin.toSafeJSON(), 201)
  } catch (error: any) {
    return fail(res, error.message, 400)
  }
}

// 更新
export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const admin = await Admin.findByPk(id)
    if (!admin) return fail(res, '管理员不存在', 404)
    await admin.update(req.body)
    return ok(res, '更新管理员成功', admin.toSafeJSON())
  } catch (error: any) {
    return fail(res, error.message, 400)
  }
}

// 删除
export const deleteAdmin = async (
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
    const count = await Admin.destroy({ where: { id: { [Op.in]: ids } } })
    if (!count) {
      res.status(404).json({ success: false, message: '管理员不存在' })
      return
    }
    ok(res, '删除管理员成功')
    return
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
    return
  }
}

// 登录
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return fail(res, '缺少登录参数', 400)
    }

    const admin = await Admin.findOne({
      where: { username },
    })
    if (!admin) return fail(res, '账号不存在', 401)

    const valid = await admin.validatePassword(password)
    if (!valid) return fail(res, '密码错误', 401)

    await admin.updateLastLogin()
    const token = signToken({ userId: admin.id, username: admin.username })

    return ok(res, '登录成功', { token, user: admin.toSafeJSON() })
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

// 注册
export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return fail(res, '缺少注册参数', 400)
    }

    const exists = await Admin.findOne({ where: { username } })
    if (exists) return fail(res, '用户名已存在', 400)

    const admin = await Admin.create({ username, password })
    const token = signToken({
      userId: admin.id,
      username: admin.username,
      role: 'admin',
    })

    return ok(res, '注册成功', { token, user: admin.toSafeJSON() }, 201)
  } catch (error: any) {
    return fail(res, error.message, 400)
  }
}
