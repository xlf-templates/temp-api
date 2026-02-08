import { Request, Response, NextFunction } from 'express'
import { ValidationError } from 'sequelize'

// 自定义错误类
export class AppError extends Error {
  public statusCode: number
  public isOperational: boolean

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

// 404 错误处理中间件
export const notFound = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const error = new AppError(`资源不存在 - ${req.originalUrl}`, 404)
  next(error)
}

// 全局错误处理中间件
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
): void => {
  let err = { ...error } as any
  err.message = error.message

  // 开发环境下打印错误堆栈
  if (process.env.NODE_ENV === 'development') {
    console.error('Error Stack:', error.stack)
  }

  // Sequelize 验证错误
  if (error instanceof ValidationError) {
    const message = error.errors.map((err) => err.message).join(', ')
    err = new AppError(message, 400)
  }

  // Sequelize 唯一性约束错误
  if ((error as any).name === 'SequelizeUniqueConstraintError') {
    const message = '数据已存在，请检查唯一性字段'
    err = new AppError(message, 400)
  }

  // JWT 错误
  if ((error as any).name === 'JsonWebTokenError') {
    const message = '访问令牌无效'
    err = new AppError(message, 401)
  }

  if ((error as any).name === 'TokenExpiredError') {
    const message = '访问令牌已过期'
    err = new AppError(message, 401)
  }

  // 类型转换错误
  if ((error as any).name === 'CastError') {
    const message = '资源不存在'
    err = new AppError(message, 404)
  }

  res.status(err.statusCode || 500).json({
    success: false,
    code: err.statusCode || 500,
    message: err.message || '服务器内部错误',
    ...(process.env.NODE_ENV === 'development' && {
      stack: error.stack,
    }),
  })
}

export default errorHandler
