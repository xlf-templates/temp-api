import { Router } from 'express'
import {
  listGoodsCategories,
  getGoodsCategory,
  createGoodsCategory,
  updateGoodsCategory,
  deleteGoodsCategory,
} from '@/controllers/goodsCategories'
import authenticate from '@/middleware/auth'

const router: Router = Router()

router.use(authenticate)

router.get('/', listGoodsCategories)
router.get('/:id', getGoodsCategory)
router.post('/', createGoodsCategory)
router.put('/:id', updateGoodsCategory)
router.delete('/:id', deleteGoodsCategory)
router.delete('/', deleteGoodsCategory)

export default router
