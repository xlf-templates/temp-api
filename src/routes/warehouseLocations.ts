import { Router } from 'express'
import {
  listWarehouseLocations,
  getWarehouseLocation,
  createWarehouseLocation,
  updateWarehouseLocation,
  deleteWarehouseLocation,
} from '@/controllers/warehouseLocations'
import authenticate from '@/middleware/auth'

const router: Router = Router()

router.use(authenticate)

router.get('/', listWarehouseLocations)
router.get('/:id', getWarehouseLocation)
router.post('/', createWarehouseLocation)
router.put('/:id', updateWarehouseLocation)
router.delete('/:id', deleteWarehouseLocation)
router.delete('/', deleteWarehouseLocation)

export default router
