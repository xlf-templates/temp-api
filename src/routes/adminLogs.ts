import { Router } from 'express'
import {
  listAdminLogs,
  getAdminLog,
  createAdminLog,
  updateAdminLog,
  deleteAdminLog,
} from '@/controllers/adminLogs'
import authenticate from '@/middleware/auth'

const router: Router = Router()

router.use(authenticate)

/**
 * @swagger
 * /admin-logs:
 *   get:
 *     summary: 获取管理员操作日志列表
 *     tags: [AdminLogs]
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
router.get('/', listAdminLogs)

/**
 * @swagger
 * /admin-logs/{id}:
 *   get:
 *     summary: 获取管理员操作日志详情
 *     tags: [AdminLogs]
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
router.get('/:id', getAdminLog)

/**
 * @swagger
 * /admin-logs:
 *   post:
 *     summary: 创建管理员操作日志
 *     tags: [AdminLogs]
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
router.post('/', createAdminLog)

/**
 * @swagger
 * /admin-logs/{id}:
 *   put:
 *     summary: 更新管理员操作日志
 *     tags: [AdminLogs]
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
router.put('/:id', updateAdminLog)

/**
 * @swagger
 * /admin-logs/{id}:
 *   delete:
 *     summary: 删除管理员操作日志
 *     tags: [AdminLogs]
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
router.delete('/:id', deleteAdminLog)

export default router
