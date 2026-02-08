import { Router } from 'express'
import {
  listWarehouseAreaTypes,
  getWarehouseAreaType,
  createWarehouseAreaType,
  updateWarehouseAreaType,
  deleteWarehouseAreaType,
} from '@/controllers/warehouseAreaType'
import authenticate from '@/middleware/auth'

const router: Router = Router()

router.use(authenticate)

router.get('/', listWarehouseAreaTypes)
router.get('/:id', getWarehouseAreaType)
router.post('/', createWarehouseAreaType)
router.put('/:id', updateWarehouseAreaType)
router.delete('/:id', deleteWarehouseAreaType)
router.delete('/', deleteWarehouseAreaType)
export default router
