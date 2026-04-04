import { Request, Response } from 'express'
import { ok, fail } from '@/utils/response'

export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return fail(res, '请选择要上传的图片', 400)
    }

    // 构建文件访问URL
    // 假设你的静态文件服务前缀是 /uploads
    const fileUrl = `${process.env.BASE_URL}/uploads/images/${req.file.filename}`

    return ok(res, '图片上传成功', {
      url: fileUrl,
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
    })
  } catch (error: any) {
    return fail(res, error.message || '图片上传失败', 500)
  }
}

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return fail(res, '请选择要上传的文件', 400)
    }

    const fileUrl = `/uploads/files/${req.file.filename}`

    return ok(res, '文件上传成功', {
      url: fileUrl,
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
    })
  } catch (error: any) {
    return fail(res, error.message || '文件上传失败', 500)
  }
}
