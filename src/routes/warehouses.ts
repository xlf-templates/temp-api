import { Router } from 'express'
import {
  listWarehouses,
  getWarehouse,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
} from '@/controllers/warehouses'
import authenticate from '@/middleware/auth'

const router: Router = Router()

router.use(authenticate)

router.get('/', listWarehouses)
router.get('/:id', getWarehouse)
router.post('/', createWarehouse)
router.put('/:id', updateWarehouse)
router.delete('/:id', deleteWarehouse)
router.delete('/', deleteWarehouse)

export default router
