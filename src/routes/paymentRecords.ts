import { Router } from 'express'
import {
  listPaymentRecords,
  getPaymentRecord,
  createPaymentRecord,
  updatePaymentStatus,
  deletePaymentRecord,
} from '@/controllers/paymentRecords'
import authenticate from '@/middleware/auth'

const router: Router = Router()

router.use(authenticate)

router.get('/', listPaymentRecords)
router.get('/:id', getPaymentRecord)
router.post('/', createPaymentRecord)
router.put('/:id/status', updatePaymentStatus)
router.delete('/:id', deletePaymentRecord)

export default router
