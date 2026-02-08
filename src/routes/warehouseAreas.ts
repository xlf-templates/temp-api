import { Router } from 'express'
import {
  listWarehouseAreas,
  getWarehouseArea,
  createWarehouseArea,
  updateWarehouseArea,
  deleteWarehouseArea,
} from '@/controllers/warehouseAreas'
import authenticate from '@/middleware/auth'

const router: Router = Router()

router.use(authenticate)

router.get('/', listWarehouseAreas)
router.get('/:id', getWarehouseArea)
router.post('/', createWarehouseArea)
router.put('/:id', updateWarehouseArea)
router.delete('/:id', deleteWarehouseArea)
router.delete('/', deleteWarehouseArea)

export default router
