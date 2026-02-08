import { Router } from 'express'
import {
  listAdminRules,
  getAdminRule,
  createAdminRule,
  updateAdminRule,
  deleteAdminRule,
  listMyRules,
} from '@/controllers/adminRules'
import authenticate from '@/middleware/auth'

const router: Router = Router()

router.use(authenticate)

/**
 * @swagger
 * /admin-rules:
 *   get:
 *     summary: 获取权限规则列表
 *     tags: [AdminRules]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 获取成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.get('/', listAdminRules)

/**
 * @swagger
 * /admin-rules/mine:
 *   get:
 *     summary: 获取当前用户允许的规则/菜单
 *     description: 可按类型过滤并可返回树结构。
 *     tags: [AdminRules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [directory, menu, button]
 *         description: 仅返回指定类型的规则
 *       - in: query
 *         name: tree
 *         schema:
 *           type: boolean
 *         description: 是否按 pid 构建树形结构
 *     responses:
 *       200:
 *         description: 获取成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.get('/mine', listMyRules)

/**
 * @swagger
 * /admin-rules/{id}:
 *   get:
 *     summary: 获取权限规则详情
 *     tags: [AdminRules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 获取成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.get('/:id', getAdminRule)

/**
 * @swagger
 * /admin-rules:
 *   post:
 *     summary: 创建权限规则
 *     tags: [AdminRules]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: 创建成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.post('/', createAdminRule)

/**
 * @swagger
 * /admin-rules/{id}:
 *   put:
 *     summary: 更新权限规则
 *     tags: [AdminRules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: 更新成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.put('/:id', updateAdminRule)

/**
 * @swagger
 * /admin-rules/{id}:
 *   delete:
 *     summary: 删除权限规则
 *     tags: [AdminRules]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 删除成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */
router.delete('/:id', deleteAdminRule)

export default router
