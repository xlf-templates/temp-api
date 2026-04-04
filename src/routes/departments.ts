import { Router } from 'express'
import {
  listDepartments,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from '@/controllers/departments'
import authenticate from '@/middleware/auth'

const router: Router = Router()

router.use(authenticate)

router.get('/', listDepartments)
router.get('/:id', getDepartment)
router.post('/', createDepartment)
router.put('/:id', updateDepartment)
router.delete('/:id', deleteDepartment)

export default router
