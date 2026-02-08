import { Router } from 'express'
import {
  listGoodsImages,
  getGoodsImage,
  createGoodsImage,
  updateGoodsImage,
  deleteGoodsImage,
} from '@/controllers/goodsImages'
import authenticate from '@/middleware/auth'

const router: Router = Router()

router.use(authenticate)

router.get('/', listGoodsImages)
router.get('/:id', getGoodsImage)
router.post('/', createGoodsImage)
router.put('/:id', updateGoodsImage)
router.delete('/:id', deleteGoodsImage)

export default router
