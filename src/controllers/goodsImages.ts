import { Request, Response } from 'express'
import { GoodsImage, Goods } from '@/models'
import { ok, fail } from '@/utils/response'
import { Op } from 'sequelize'

export const listGoodsImages = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1
    const pageSize = Number(req.query.pageSize) || 10
    const offset = (page - 1) * pageSize
    const where: any = {}
    if (req.query.goodsId) where.goodsId = Number(req.query.goodsId)
    if (req.query.isMain !== undefined)
      where.isMain = Number(req.query.isMain) === 1 ? 1 : 0
    const result = await GoodsImage.findAndCountAll({
      where,
      limit: pageSize,
      offset,
      order: [['sort', 'DESC'], ['id', 'ASC']],
    })
    return ok(res, '获取商品图片列表成功', {
      items: result.rows,
      total: result.count,
      page,
      pageSize,
    })
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

export const getGoodsImage = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const item = await GoodsImage.findByPk(id)
    if (!item) return fail(res, '图片不存在', 404)
    return ok(res, '获取图片成功', item)
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

export const createGoodsImage = async (req: Request, res: Response) => {
  try {
    const goodsId = Number(req.body.goodsId)
    const url = String(req.body.url || '').trim()
    const isMain = Number(req.body.isMain || 0) === 1 ? 1 : 0
    if (!goodsId || !url) return fail(res, '缺少必要参数', 400)
    const goods = await Goods.findByPk(goodsId)
    if (!goods) return fail(res, '商品不存在', 404)
    const item = await GoodsImage.create({
      goodsId,
      url,
      isMain,
      sort: Number(req.body.sort || 0),
      remark: req.body.remark,
    })
    return ok(res, '创建商品图片成功', item, 201)
  } catch (error: any) {
    return fail(res, error.message, 400)
  }
}

export const updateGoodsImage = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const item = await GoodsImage.findByPk(id)
    if (!item) return fail(res, '图片不存在', 404)
    const next: any = { ...req.body }
    if (next.url) next.url = String(next.url).trim()
    if (next.isMain !== undefined)
      next.isMain = Number(next.isMain) === 1 ? 1 : 0
    await item.update(next)
    return ok(res, '更新商品图片成功', item)
  } catch (error: any) {
    return fail(res, error.message, 400)
  }
}

export const deleteGoodsImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id)
    const count = await GoodsImage.destroy({ where: { id } })
    if (!count) {
      res.status(404).json({ success: false, message: '图片不存在' })
      return
    }
    ok(res, '删除商品图片成功')
    return
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
    return
  }
}
