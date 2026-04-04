import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import crypto from 'crypto'
import { uploadImage, uploadFile } from '@/controllers/upload'
import authenticate from '@/middleware/auth'

const router: Router = Router()

// 确保目录存在
const ensureDir = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

// 配置文件存储
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dest = 'uploads/files'
    if (file.mimetype.startsWith('image/')) {
      dest = 'uploads/images'
    }
    ensureDir(dest)
    cb(null, dest)
  },
  filename: function (req, file, cb) {
    // 生成唯一文件名
    const uniqueSuffix = crypto.randomBytes(16).toString('hex')
    const ext = path.extname(file.originalname)
    cb(null, `${uniqueSuffix}${ext}`)
  },
})

// 文件过滤器
const fileFilter = (req: any, file: any, cb: any) => {
  // 根据不同的路由使用不同的过滤逻辑
  if (req.path === '/image') {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('只允许上传图片文件!'), false)
    }
  } else {
    cb(null, true)
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 限制10MB
  },
})

// 应用 token 验证
router.use(authenticate)

// 路由
router.post('/image', upload.single('file'), uploadImage)
router.post('/file', upload.single('file'), uploadFile)

export default router
