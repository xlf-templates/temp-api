import { Request, Response } from 'express'
import {
  Goods,
  GoodsCategory,
  PackagingUnit,
  WeightUnit,
  GoodsImage,
} from '@/models'
import { ok, fail } from '@/utils/response'
import { Op } from 'sequelize'

export const listGoods = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1
    const pageSize = Number(req.query.pageSize) || 10
    const offset = (page - 1) * pageSize

    const where: any = {}
    if (req.query.categoryId) where.categoryId = Number(req.query.categoryId)
    if (req.query.packagingUnit)
      where.packagingUnit = Number(req.query.packagingUnit)
    if (req.query.weightUnit) where.weightUnit = Number(req.query.weightUnit)
    if (req.query.code) where.code = { [Op.like]: `%${req.query.code}%` }
    if (req.query.name) where.name = { [Op.like]: `%${req.query.name}%` }

    const result = await Goods.findAndCountAll({
      where,
      limit: pageSize,
      offset,
      order: [['id', 'DESC']],
      include: [
        { model: GoodsCategory, as: 'category' },
        { model: PackagingUnit, as: 'packagingUnitInfo' },
        { model: WeightUnit, as: 'weightUnitInfo' },
        { model: GoodsImage, as: 'images' },
      ],
    })

    return ok(res, '获取商品列表成功', {
      items: result.rows,
      total: result.count,
      page,
      pageSize,
    })
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

export const getGoods = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const item = await Goods.findByPk(id, {
      include: [
        { model: GoodsCategory, as: 'category' },
        { model: PackagingUnit, as: 'packagingUnitInfo' },
        { model: WeightUnit, as: 'weightUnitInfo' },
        { model: GoodsImage, as: 'images' },
      ],
    })
    if (!item) return fail(res, '商品不存在', 404)
    return ok(res, '获取商品成功', item)
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

export const createGoods = async (req: Request, res: Response) => {
  try {
    const tx = await (Goods.sequelize as any).transaction()
    try {
      const { images, ...body } = req.body
      const item = await Goods.create(body, { transaction: tx })
      if (Array.isArray(images) && images.length) {
        const rows = images
          .map((img: any) => ({
            goodsId: item.id,
            url: String(img.url || '').trim(),
            isMain: Number(img.isMain || 0) === 1 ? 1 : 0,
            sort: Number(img.sort || 0),
            remark: img.remark,
          }))
          .filter((r: any) => r.url)
        if (rows.length) await GoodsImage.bulkCreate(rows, { transaction: tx })
      }
      await tx.commit()
      const created = await Goods.findByPk(item.id, {
        include: [
          { model: GoodsCategory, as: 'category' },
          { model: PackagingUnit, as: 'packagingUnitInfo' },
          { model: WeightUnit, as: 'weightUnitInfo' },
          { model: GoodsImage, as: 'images' },
        ],
      })
      return ok(res, '创建商品成功', created, 201)
    } catch (e) {
      await tx.rollback()
      throw e
    }
  } catch (error: any) {
    return fail(res, error.message, 400)
  }
}

export const updateGoods = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const item = await Goods.findByPk(id)
    if (!item) return fail(res, '商品不存在', 404)
    const tx = await (Goods.sequelize as any).transaction()
    try {
      const { images, ...body } = req.body
      await item.update(body, { transaction: tx })
      if (Array.isArray(images)) {
        await GoodsImage.destroy({ where: { goodsId: id }, transaction: tx })
        const rows = images
          .map((img: any) => ({
            goodsId: id,
            url: String(img.url || '').trim(),
            isMain: Number(img.isMain || 0) === 1 ? 1 : 0,
            sort: Number(img.sort || 0),
            remark: img.remark,
          }))
          .filter((r: any) => r.url)
        if (rows.length) await GoodsImage.bulkCreate(rows, { transaction: tx })
      }
      await tx.commit()
      const updated = await Goods.findByPk(id, {
        include: [
          { model: GoodsCategory, as: 'category' },
          { model: PackagingUnit, as: 'packagingUnitInfo' },
          { model: WeightUnit, as: 'weightUnitInfo' },
          { model: GoodsImage, as: 'images' },
        ],
      })
      return ok(res, '更新商品成功', updated)
    } catch (e) {
      await tx.rollback()
      throw e
    }
  } catch (error: any) {
    return fail(res, error.message, 400)
  }
}

export const deleteGoods = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    let ids: number[]
    if (req.params.id) {
      ids = [Number(req.params.id)]
    } else if (req.query.ids) {
      const raw = Array.isArray(req.query.ids) ? req.query.ids : [req.query.ids]
      ids = raw.map((id: any) => Number(id))
    } else {
      res.status(400).json({ success: false, message: '缺少有效的 id 或 ids' })
      return
    }

    const count = await Goods.destroy({ where: { id: { [Op.in]: ids } } })
    if (!count) {
      res.status(404).json({ success: false, message: '商品不存在' })
      return
    }
    ok(res, '删除商品成功')
    return
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
    return
  }
}
