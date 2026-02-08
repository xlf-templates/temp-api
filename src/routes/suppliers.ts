import { Router } from 'express'
import {
  listSuppliers,
  getSupplier,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from '@/controllers/suppliers'
import authenticate from '@/middleware/auth'

const router: Router = Router()

router.use(authenticate)

router.get('/', listSuppliers)
router.get('/:id', getSupplier)
router.post('/', createSupplier)
router.put('/:id', updateSupplier)
router.delete('/:id', deleteSupplier)
router.delete('/', deleteSupplier)

export default router
