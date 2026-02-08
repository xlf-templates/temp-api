import { Request, Response } from 'express'
import { Supplier, Area } from '@/models'
import { ok, fail } from '@/utils/response'
import { Op } from 'sequelize'

export const listSuppliers = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1
    const pageSize = Number(req.query.pageSize) || 10
    const offset = (page - 1) * pageSize
    const where: any = {}
    if (req.query.code) where.code = { [Op.like]: `%${req.query.code}%` }
    if (req.query.name) where.name = { [Op.like]: `%${req.query.name}%` }
    if (req.query.status) {
      const arr = Array.isArray(req.query.status)
        ? req.query.status
        : [req.query.status]
      where.status = { [Op.in]: arr }
    }
    if (req.query.contact)
      where.contact = { [Op.like]: `%${req.query.contact}%` }
    if (req.query.phone) where.phone = { [Op.like]: `%${req.query.phone}%` }
    if (req.query.email) where.email = { [Op.like]: `%${req.query.email}%` }
    if (req.query.address)
      where.address = { [Op.like]: `%${req.query.address}%` }
    if (req.query.provinceId) where.provinceId = Number(req.query.provinceId)
    if (req.query.cityId) where.cityId = Number(req.query.cityId)

    const result = await Supplier.findAndCountAll({
      where,
      limit: pageSize,
      offset,
      order: [['id', 'DESC']],
      include: [
        { model: Area, as: 'province' },
        { model: Area, as: 'city' },
      ],
    })
    return ok(res, '获取供应商列表成功', {
      items: result.rows,
      total: result.count,
      page,
      pageSize,
    })
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

export const getSupplier = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const item = await Supplier.findByPk(id, {
      include: [
        { model: Area, as: 'province' },
        { model: Area, as: 'city' },
      ],
    })
    if (!item) return fail(res, '供应商不存在', 404)
    return ok(res, '获取供应商成功', item)
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

export const createSupplier = async (req: Request, res: Response) => {
  try {
    const next: any = { ...req.body }
    if (next.code) next.code = String(next.code).trim()
    if (next.name) next.name = String(next.name).trim()
    if (next.enName) next.enName = String(next.enName).trim()
    if (next.contact) next.contact = String(next.contact).trim()
    if (next.phone) next.phone = String(next.phone).trim()
    if (next.email) next.email = String(next.email).trim()
    if (next.address) next.address = String(next.address).trim()
    if (next.provinceId) next.provinceId = Number(next.provinceId)
    if (next.cityId) next.cityId = Number(next.cityId)
    if (next.status) next.status = Number(next.status)
    const item = await Supplier.create(next)
    return ok(res, '创建供应商成功', item, 201)
  } catch (error: any) {
    return fail(res, error.message, 400)
  }
}

export const updateSupplier = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const item = await Supplier.findByPk(id)
    if (!item) return fail(res, '供应商不存在', 404)
    const next: any = { ...req.body }
    if (next.code) next.code = String(next.code).trim()
    if (next.name) next.name = String(next.name).trim()
    if (next.enName) next.enName = String(next.enName).trim()
    if (next.contact) next.contact = String(next.contact).trim()
    if (next.phone) next.phone = String(next.phone).trim()
    if (next.email) next.email = String(next.email).trim()
    if (next.address) next.address = String(next.address).trim()
    if (next.provinceId) next.provinceId = Number(next.provinceId)
    if (next.cityId) next.cityId = Number(next.cityId)
    if (next.status) next.status = Number(next.status)
    if (next.remark) next.remark = String(next.remark).trim()
    await item.update(next)
    return ok(res, '更新供应商成功', item)
  } catch (error: any) {
    return fail(res, error.message, 400)
  }
}
export const deleteSupplier = async (
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
    const count = await Supplier.destroy({ where: { id: { [Op.in]: ids } } })
    if (!count) {
      res.status(404).json({ success: false, message: '供应商不存在' })
      return
    }
    ok(res, '删除供应商成功')
    return
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
    return
  }
}
