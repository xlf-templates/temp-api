import { Request, Response } from 'express'
import { AdminLog, Admin } from '@/models'
import { ok, fail } from '@/utils/response'

export const listAdminLogs = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1
    const pageSize = Number(req.query.pageSize) || 10
    const offset = (page - 1) * pageSize
    const uid = req.query.uid ? Number(req.query.uid) : undefined

    const result = await AdminLog.findAndCountAll({
      where: uid ? { uid } : undefined,
      limit: pageSize,
      offset,
      order: [['id', 'DESC']],
      include: [{ model: Admin, as: 'admin' }],
    })
    return ok(res, '获取日志列表成功', {
      items: result.rows,
      total: result.count,
      page,
      pageSize,
    })
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

export const getAdminLog = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const log = await AdminLog.findByPk(id, {
      include: [{ model: Admin, as: 'admin' }],
    })
    if (!log) return fail(res, '日志不存在', 404)
    return ok(res, '获取日志成功', log)
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

export const createAdminLog = async (req: Request, res: Response): Promise<void> => {
  try {
    const log = await AdminLog.create(req.body)
    ok(res, '创建日志成功', log, 201)
    return
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
    return
  }
}

export const updateAdminLog = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id)
    const log = await AdminLog.findByPk(id)
    if (!log) {
      res.status(404).json({ success: false, message: '日志不存在' })
      return
    }
    await log.update(req.body)
    ok(res, '更新日志成功', log)
    return
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
    return
  }
}

export const deleteAdminLog = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id)
    const count = await AdminLog.destroy({ where: { id } })
    if (!count) {
      res.status(404).json({ success: false, message: '日志不存在' })
      return
    }
    ok(res, '删除日志成功')
    return
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
    return
  }
}
