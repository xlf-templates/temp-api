import { Router } from 'express'
import {
  listAdminGroups,
  getAdminGroup,
  createAdminGroup,
  updateAdminGroup,
  deleteAdminGroup,
} from '@/controllers/adminGroups'
import authenticate from '@/middleware/auth'

const router:Router = Router()

router.use(authenticate)

/**
 * @swagger
 * /admin-groups:
 *   get:
 *     summary: 获取管理员分组列表
 *     tags: [AdminGroups]
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
router.get('/', listAdminGroups)

/**
 * @swagger
 * /admin-groups/{id}:
 *   get:
 *     summary: 获取管理员分组详情
 *     tags: [AdminGroups]
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
router.get('/:id', getAdminGroup)

/**
 * @swagger
 * /admin-groups:
 *   post:
 *     summary: 创建管理员分组
 *     tags: [AdminGroups]
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
router.post('/', createAdminGroup)

/**
 * @swagger
 * /admin-groups/{id}:
 *   put:
 *     summary: 更新管理员分组
 *     tags: [AdminGroups]
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
router.put('/:id', updateAdminGroup)

/**
 * @swagger
 * /admin-groups/{id}:
 *   delete:
 *     summary: 删除管理员分组
 *     tags: [AdminGroups]
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
router.delete('/:id', deleteAdminGroup)

export default router