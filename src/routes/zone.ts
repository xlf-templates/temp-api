import { Router } from 'express'
import {
  listZones,
  getZone,
  createZone,
  updateZone,
  deleteZone,
} from '@/controllers/zone'
import authenticate from '@/middleware/auth'

const router: Router = Router()

router.use(authenticate)

router.get('/', listZones)
router.get('/:id', getZone)
router.post('/', createZone)
router.put('/:id', updateZone)
router.delete('/:id', deleteZone)
router.delete('/', deleteZone)
export default router
