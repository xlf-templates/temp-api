import { Router } from 'express'
import {
  listWarehouseLocationTypes,
  getWarehouseLocationType,
  createWarehouseLocationType,
  updateWarehouseLocationType,
  deleteWarehouseLocationType,
} from '@/controllers/warehouseLocationType'
import authenticate from '@/middleware/auth'

const router: Router = Router()

router.use(authenticate)

router.get('/', listWarehouseLocationTypes)
router.get('/:id', getWarehouseLocationType)
router.post('/', createWarehouseLocationType)
router.put('/:id', updateWarehouseLocationType)
router.delete('/:id', deleteWarehouseLocationType)
router.delete('/', deleteWarehouseLocationType)
export default router
