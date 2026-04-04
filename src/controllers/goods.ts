import { Request, Response } from 'express'
import {
  Goods,
  GoodsCategory,
  PackagingUnit,
  WeightUnit,
  GoodsImage,
  Zone,
  Warehouse,
  // WarehouseLocation,
  Supplier,
} from '@/models'
import { ok, fail } from '@/utils/response'
import { Op } from 'sequelize'

export const listGoods = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1
    const pageSize = Number(req.query.pageSize) || 10
    const offset = (page - 1) * pageSize

    const where: any = {}
    // 支持传入categoryId数组查询
    if (req.query.categoryId) {
      const categoryIdArr = Array.isArray(req.query.categoryId)
        ? req.query.categoryId
            .map((c: any) => Number(c))
            .filter((n: number) => !isNaN(n))
        : String(req.query.categoryId)
            .split(',')
            .map((c: string) => Number(c.trim()))
            .filter((n: number) => !isNaN(n))
      if (categoryIdArr.length > 0) {
        where.categoryId = { [Op.in]: categoryIdArr }
      }
    }

    if (req.query.code) where.code = { [Op.like]: `%${req.query.code}%` }
    if (req.query.name) where.name = { [Op.like]: `%${req.query.name}%` }
    if (req.query.enName) where.enName = { [Op.like]: `%${req.query.enName}%` }

    // 支持传入供应商ids数组查询
    if (req.query.supplierIds) {
      const supplierIds = Array.isArray(req.query.supplierIds)
        ? req.query.supplierIds
            .map((id: any) => Number(id))
            .filter((n: number) => !isNaN(n))
        : String(req.query.supplierIds)
            .split(',')
            .map((id: string) => Number(id.trim()))
            .filter((n: number) => !isNaN(n))
      if (supplierIds.length > 0) {
        where.supplierIds = {
          [Op.like]: supplierIds.map((id) => `%${id}%`).join('|'),
        }
      }
    }

    // 支持传入status数组查询
    if (req.query.status) {
      const statusArr = Array.isArray(req.query.status)
        ? req.query.status
            .map((s: any) => Number(s))
            .filter((n: number) => !isNaN(n))
        : String(req.query.status)
            .split(',')
            .map((s: string) => Number(s.trim()))
            .filter((n: number) => !isNaN(n))
      if (statusArr.length > 0) {
        where.status = { [Op.in]: statusArr }
      }
    }

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
        { model: Zone, as: 'warehouseZone' },
        { model: Warehouse, as: 'warehouse' },
        // { model: WarehouseLocation, as: 'warehouseLocation' },
      ],
    })
    // 收集所有需要查询的 supplierIds

    const allSupplierIds = new Set<number>()
    result.rows.forEach((item) => {
      let ids: number[] = []
      // 尝试获取 supplierIds（可能触发 getter，也可能是原始值）
      const rawIds = item.supplierIds as any
      if (Array.isArray(rawIds)) {
        ids = rawIds
      } else if (typeof rawIds === 'string' && rawIds.trim() !== '') {
        ids = rawIds
          .split(',')
          .map(Number)
          .filter((n: number) => !isNaN(n))
      }

      ids.forEach((id) => allSupplierIds.add(id))
      // 将解析后的数组存回对象，方便后面使用
      ;(item as any)._parsedSupplierIds = ids
    })

    // 批量查询所有相关的供应商
    let suppliersMap = new Map<number, any>()
    if (allSupplierIds.size > 0) {
      const suppliers = await Supplier.findAll({
        where: { id: { [Op.in]: Array.from(allSupplierIds) } },
        attributes: ['id', 'code', 'name', 'status'], // 根据需要选择返回的字段
      })
      suppliersMap = new Map(suppliers.map((s) => [s.id, s.toJSON()]))
    }

    // 组装数据
    const items = result.rows.map((item) => {
      const json = item.toJSON() as any
      const ids = (item as any)._parsedSupplierIds || []
      json.suppliers = ids
        .map((id: number) => suppliersMap.get(id))
        .filter(Boolean)
      return json
    })

    return ok(res, '获取商品列表成功', {
      items,
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
        { model: Zone, as: 'warehouseZone' },
        { model: Warehouse, as: 'warehouse' },
        // { model: WarehouseLocation, as: 'warehouseLocation' },
      ],
    })
    if (!item) return fail(res, '商品不存在', 404)

    const json = item.toJSON() as any
    let ids: number[] = []
    const rawIds = item.supplierIds as any
    if (Array.isArray(rawIds)) {
      ids = rawIds
    } else if (typeof rawIds === 'string' && rawIds.trim() !== '') {
      ids = rawIds
        .split(',')
        .map(Number)
        .filter((n: number) => !isNaN(n))
    }

    if (ids.length > 0) {
      const suppliers = await Supplier.findAll({
        where: { id: { [Op.in]: ids } },
        attributes: ['id', 'code', 'name', 'status'],
      })
      json.suppliers = suppliers
    } else {
      json.suppliers = []
    }

    return ok(res, '获取商品成功', json)
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
          { model: Zone, as: 'warehouseZone' },
          { model: Warehouse, as: 'warehouse' },
          // { model: WarehouseLocation, as: 'warehouseLocation' },
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

export const bulkCreateGoods = async (req: Request, res: Response) => {
  try {
    const { items } = req.body
    if (!Array.isArray(items) || items.length === 0) {
      return fail(res, '参数 items 必须是非空数组', 400)
    }

    const tx = await (Goods.sequelize as any).transaction()
    try {
      const createdItems = []
      const duplicateCodes = []

      for (const itemData of items) {
        const { images, ...body } = itemData

        // 检查 code 是否已存在
        const existingCode = await Goods.findOne({
          where: { code: body.code },
          transaction: tx,
        })
        if (existingCode) {
          duplicateCodes.push(body.code)
          continue // 跳过这条数据，继续下一条
        }

        const item = await Goods.create(body, { transaction: tx })

        if (Array.isArray(images) && images.length) {
          const rows = images
            .map((img: any) => ({
              goodsId: item.id,
              name: img.name,
              fileId: img.fileId,
              url: String(img.url || '').trim(),
              isMain: Number(img.isMain || 0) === 1 ? 1 : 0,
              sort: Number(img.sort || 0),
              remark: img.remark,
            }))
            .filter((r: any) => r.url)
          if (rows.length)
            await GoodsImage.bulkCreate(rows, { transaction: tx })
        }

        createdItems.push(item)
      }
      await tx.commit()

      let message = `成功创建 ${createdItems.length} 个商品`
      if (duplicateCodes.length > 0) {
        message += `，其中 ${duplicateCodes.length} 个商品因编码重复被跳过（${duplicateCodes.join(', ')}）`
      }

      return ok(
        res,
        message,
        {
          total: createdItems.length,
          duplicateCount: duplicateCodes.length,
          duplicateCodes,
          items: createdItems,
        },
        201,
      )
    } catch (e: any) {
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
          { model: Zone, as: 'warehouseZone' },
          { model: Warehouse, as: 'warehouse' },
          // { model: WarehouseLocation, as: 'warehouseLocation' },
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
