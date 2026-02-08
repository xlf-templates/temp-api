import { Router } from 'express'
import {
  listGoods,
  getGoods,
  createGoods,
  updateGoods,
  deleteGoods,
} from '@/controllers/goods'
import authenticate from '@/middleware/auth'

const router: Router = Router()

router.use(authenticate)

router.get('/', listGoods)
router.get('/:id', getGoods)
router.post('/', createGoods)
router.put('/:id', updateGoods)
router.delete('/:id', deleteGoods)

export default router
