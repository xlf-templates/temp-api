import { Router } from 'express'
import adminsRoutes from './admins'
import adminGroupsRoutes from './adminGroups'
import adminLogsRoutes from './adminLogs'
import adminRulesRoutes from './adminRules'
import goodsCategoriesRoutes from './goodsCategories'
import goodsImagesRoutes from './goodsImages'
import goodsRoutes from './goods'
import packagingUnitsRoutes from './packagingUnits'
import weightUnitsRoutes from './weightUnits'
import areasRoutes from './areas'
import suppliersRoutes from './suppliers'
import warehousesRoutes from './warehouses'
import warehouseAreasRoutes from './warehouseAreas'
import warehouseLocationsRoutes from './warehouseLocations'
import warehouseTypesRoutes from './warehouseType'
import warehouseAreaTypesRoutes from './warehouseAreaType'
import warehouseLocationTypesRoutes from './warehouseLocationType'

const router: Router = Router()

/**
 * @swagger
 * tags:
 *   name: System
 *   description: 系统相关接口
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: API根路径
 *     tags: [System]
 *     responses:
 *       200:
 *         description: API服务状态
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Temp API Server is running!"
 *                 version:
 *                   type: string
 *                   example: "1.0.0"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-12-01T10:00:00Z"
 */

/**
 * @swagger
 * /health:
 *   get:
 *     summary: 健康检查
 *     tags: [System]
 *     responses:
 *       200:
 *         description: 服务器健康状态
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Server is healthy"
 *                 uptime:
 *                   type: number
 *                   description: 服务器运行时间（秒）
 *                   example: 3600.123
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-12-01T10:00:00Z"
 */
// API 根路径响应
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Temp API Server is running!',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  })
})

// 健康检查
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  })
})

// API 路由
router.use('/admins', adminsRoutes)
router.use('/admin-groups', adminGroupsRoutes)
router.use('/admin-logs', adminLogsRoutes)
router.use('/admin-rules', adminRulesRoutes)
router.use('/goods-categories', goodsCategoriesRoutes)
router.use('/goods-images', goodsImagesRoutes)
router.use('/goods', goodsRoutes)
router.use('/packaging-units', packagingUnitsRoutes)
router.use('/weight-units', weightUnitsRoutes)
router.use('/areas', areasRoutes)
router.use('/suppliers', suppliersRoutes)
router.use('/warehouses', warehousesRoutes)
router.use('/warehouse-areas', warehouseAreasRoutes)
router.use('/warehouse-locations', warehouseLocationsRoutes)
router.use('/warehouse-types', warehouseTypesRoutes)
router.use('/warehouse-area-types', warehouseAreaTypesRoutes)
router.use('/warehouse-location-types', warehouseLocationTypesRoutes)
export default router
