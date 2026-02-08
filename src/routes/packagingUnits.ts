import { Router } from 'express'
import {
  listPackagingUnits,
  getPackagingUnit,
  createPackagingUnit,
  updatePackagingUnit,
  deletePackagingUnit,
} from '@/controllers/packagingUnits'
import authenticate from '@/middleware/auth'

const router: Router = Router()

router.use(authenticate)

router.get('/', listPackagingUnits)
router.get('/:id', getPackagingUnit)
router.post('/', createPackagingUnit)
router.put('/:id', updatePackagingUnit)
router.delete('/:id', deletePackagingUnit)
router.delete('/', deletePackagingUnit)

export default router
