import { Router } from 'express'
import {
  listWarehouseLocations,
  getWarehouseLocation,
  createWarehouseLocation,
  bulkCreateWarehouseLocations,
  updateWarehouseLocation,
  deleteWarehouseLocation,
  getMaxShelfNoByWarehouseId,
} from '@/controllers/warehouseLocations'
import authenticate from '@/middleware/auth'

const router: Router = Router()

router.use(authenticate)

router.get('/', listWarehouseLocations)
router.get('/max-shelf-no', getMaxShelfNoByWarehouseId)
router.get('/:id', getWarehouseLocation)
router.post('/', createWarehouseLocation)
router.post('/bulk', bulkCreateWarehouseLocations)
router.put('/:id', updateWarehouseLocation)
router.delete('/:id', deleteWarehouseLocation)
router.delete('/', deleteWarehouseLocation)

export default router
