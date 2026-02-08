import { Router } from 'express'
import {
  listWarehouseTypes,
  getWarehouseType,
  createWarehouseType,
  updateWarehouseType,
  deleteWarehouseType,
} from '@/controllers/warehouseType'
import authenticate from '@/middleware/auth'

const router: Router = Router()

router.use(authenticate)

router.get('/', listWarehouseTypes)
router.get('/:id', getWarehouseType)
router.post('/', createWarehouseType)
router.put('/:id', updateWarehouseType)
router.delete('/:id', deleteWarehouseType)
router.delete('/', deleteWarehouseType)
export default router
