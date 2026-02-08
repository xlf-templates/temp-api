import { Router } from 'express'
import {
  listWeightUnits,
  getWeightUnit,
  createWeightUnit,
  updateWeightUnit,
  deleteWeightUnit,
} from '@/controllers/weightUnits'
import authenticate from '@/middleware/auth'

const router: Router = Router()

router.use(authenticate)

router.get('/', listWeightUnits)
router.get('/:id', getWeightUnit)
router.post('/', createWeightUnit)
router.put('/:id', updateWeightUnit)
router.delete('/:id', deleteWeightUnit)
router.delete('/', deleteWeightUnit)
export default router
