import { Router } from 'express'
import {
  listPurchaseOrders,
  getPurchaseOrder,
  createPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder,
} from '@/controllers/purchaseOrders'
import authenticate from '@/middleware/auth'

const router: Router = Router()

router.use(authenticate)

router.get('/', listPurchaseOrders)
router.get('/:id', getPurchaseOrder)
router.post('/', createPurchaseOrder)
router.put('/:id', updatePurchaseOrder)
router.delete('/:id', deletePurchaseOrder)

export default router
