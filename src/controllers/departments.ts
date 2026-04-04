import { Request, Response } from 'express'
import { Department, Admin } from '@/models'
import { ok, fail } from '@/utils/response'
import { Op } from 'sequelize'

// 获取部门列表 (树形结构或平铺列表)
export const listDepartments = async (req: Request, res: Response) => {
  try {
    const { name, status } = req.query
    const where: any = {}

    if (name) {
      where.name = { [Op.like]: `%${name}%` }
    }
    if (status !== undefined) {
      where.status = Number(status)
    }

    const items = await Department.findAll({
      where,
      order: [
        ['sort', 'ASC'],
        ['id', 'ASC'],
      ],
      include: [
        {
          model: Admin,
          as: 'leader',
          attributes: [
            'id',
            'username',
            'realName',
            'email',
            'avatar',
            'phone',
          ],
        },
        {
          model: Admin,
          as: 'admins',
          attributes: [
            'id',
            'username',
            'realName',
            'email',
            'avatar',
            'phone',
          ],
        },
      ],
    })

    // 默认返回树形结构
    const isTree = req.query.isTree !== 'false'
    if (isTree && !name) {
      const buildTree = (parentId: number | null): any[] => {
        return items
          .filter((item) => item.parentId === parentId)
          .map((item) => {
            const json = item.toJSON() as any
            const children = buildTree(item.id)
            if (children.length > 0) {
              json.children = children
            }
            return json
          })
      }
      return ok(res, '获取部门列表成功', { items: buildTree(null) })
    }

    return ok(res, '获取部门列表成功', { items })
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

// 获取部门详情
export const getDepartment = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const item = await Department.findByPk(id, {
      include: [
        {
          model: Admin,
          as: 'leader',
          attributes: [
            'id',
            'username',
            'realName',
            'email',
            'avatar',
            'phone',
          ],
        },
        {
          model: Admin,
          as: 'admins',
          attributes: [
            'id',
            'username',
            'realName',
            'email',
            'avatar',
            'phone',
          ],
        },
        { model: Department, as: 'parent' },
      ],
    })
    if (!item) return fail(res, '部门不存在', 404)
    return ok(res, '获取部门详情成功', item)
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}

// 创建部门
export const createDepartment = async (req: Request, res: Response) => {
  try {
    const item = await Department.create(req.body)
    return ok(res, '创建部门成功', item, 201)
  } catch (error: any) {
    return fail(res, error.message, 400)
  }
}

// 更新部门
export const updateDepartment = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const { parentId } = req.body

    // 防止将自己设为自己的父级
    if (parentId && Number(parentId) === id) {
      return fail(res, '父级部门不能是自己', 400)
    }

    const item = await Department.findByPk(id)
    if (!item) return fail(res, '部门不存在', 404)

    await item.update(req.body)
    return ok(res, '更新部门成功', item)
  } catch (error: any) {
    return fail(res, error.message, 400)
  }
}

// 删除部门
export const deleteDepartment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = Number(req.params.id)

    // 检查是否有子部门
    const hasChildren = await Department.findOne({ where: { parentId: id } })
    if (hasChildren) {
      res
        .status(400)
        .json({ success: false, message: '该部门下存在子部门，无法删除' })
      return
    }

    // 检查是否有关联的用户
    const hasAdmins = await Admin.findOne({ where: { departmentId: id } })
    if (hasAdmins) {
      res
        .status(400)
        .json({ success: false, message: '该部门下存在关联用户，无法删除' })
      return
    }

    const count = await Department.destroy({ where: { id } })
    if (!count) {
      res.status(404).json({ success: false, message: '部门不存在' })
      return
    }

    ok(res, '删除部门成功')
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message })
  }
}
