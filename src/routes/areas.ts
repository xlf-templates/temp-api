import { Router } from 'express'
import {
  listAreas,
  listProvinces,
  listCities,
  getArea,
  createArea,
  updateArea,
  deleteArea,
} from '@/controllers/areas'
import authenticate from '@/middleware/auth'

const router: Router = Router()

router.use(authenticate)

router.get('/', listAreas)
router.get('/provinces', listProvinces)
router.get('/cities', listCities)
router.get('/:id', getArea)
router.post('/', createArea)
router.put('/:id', updateArea)
router.delete('/:id', deleteArea)
router.delete('/', deleteArea)

export default router
