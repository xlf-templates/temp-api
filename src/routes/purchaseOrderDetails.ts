import { Router } from 'express'
import {
  listPurchaseOrderDetails,
  getPurchaseOrderDetail,
  updatePurchaseOrderDetail,
} from '@/controllers/purchaseOrderDetails'
import authenticate from '@/middleware/auth'

const router: Router = Router()

router.use(authenticate)

router.get('/', listPurchaseOrderDetails)
router.get('/:id', getPurchaseOrderDetail)
router.put('/:id', updatePurchaseOrderDetail)
// 通常不需要直接创建或删除单个详情，这些操作应该在主订单的创建或更新接口中统一处理

export default router
