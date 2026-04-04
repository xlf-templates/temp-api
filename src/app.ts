// 生产环境路径别名支持
if (process.env.NODE_ENV === 'production') {
  require('module-alias/register')
}

import express, { Express } from 'express'
import cors from 'cors'
// import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import dotenv from 'dotenv'
import { testConnection, syncDatabase } from '@/config/database'
import { initModels } from '@/models'
import setupSwagger from '@/config/swagger'
import routes from '@/routes'
import { notFound, errorHandler } from '@/middleware/errorHandler'
import { requestContext } from '@/utils/requestContext'
import path from 'path'

// 加载环境变量
dotenv.config()

// 创建 Express 应用
const app: Express = express()

// 获取环境变量
const PORT = process.env.PORT || 3001
const NODE_ENV = process.env.NODE_ENV || 'development'
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173'
const API_PREFIX = process.env.API_PREFIX || '/api/v1'

// 信任代理（用于部署在反向代理后面）
app.set('trust proxy', 1)

// 安全中间件
// app.use(
//   helmet({
//     crossOriginEmbedderPolicy: false,
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'"],
//         styleSrc: ["'self'", "'unsafe-inline'"],
//         scriptSrc: ["'self'"],
//         imgSrc: ["'self'", 'data:', 'https:'],
//       },
//     },
//   })
// )

// CORS 配置
app.use(
  cors({
    origin: NODE_ENV === 'production' ? [CORS_ORIGIN] : true, // 开发环境允许所有来源
    // origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
)

// 压缩中间件
app.use(compression())

// 请求日志中间件
if (NODE_ENV === 'development') {
  app.use(morgan('dev'))
} else {
  app.use(morgan('combined'))
}

// 解析请求体
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(requestContext)

// 配置文件静态访问
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// 根路径
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Temp API Server!',
    version: '1.0.0',
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
  })
})

// API 路由
app.use(API_PREFIX, routes)

// 设置 Swagger API 文档
setupSwagger(app)

// 404 处理
app.use(notFound)

// 全局错误处理
app.use(errorHandler)

// 启动服务器
const startServer = async (): Promise<void> => {
  try {
    // 测试数据库连接
    await testConnection()

    // 初始化模型
    initModels()

    // 同步数据库（开发环境）
    if (NODE_ENV === 'development') {
      // 保证 goods 的包装/重量单位外键语义为 SET NULL
      // const { ensureGoodsUnitFksSetNull } = await import('@/config/database')
      // await ensureGoodsUnitFksSetNull()
      await syncDatabase({ alter: false })
    }

    // 启动服务器
    app.listen(PORT, () => {
      console.log(`
🚀 服务器启动成功！
📱 环境: ${NODE_ENV}
🌐 地址: http://localhost:${PORT}
📊 API: http://localhost:${PORT}${API_PREFIX}
⏰ 时间: ${new Date().toLocaleString()}
      `)
    })
  } catch (error) {
    console.error('❌ 服务器启动失败:', error)
    process.exit(1)
  }
}

// 优雅关闭
const gracefulShutdown = (signal: string) => {
  console.log(`\n收到 ${signal} 信号，正在优雅关闭服务器...`)

  // 关闭数据库连接等清理工作
  process.exit(0)
}

// 监听退出信号
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
process.on('SIGINT', () => gracefulShutdown('SIGINT'))

// 处理未捕获的异常
process.on('uncaughtException', (error) => {
  console.error('❌ 未捕获的异常:', error)
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ 未处理的 Promise 拒绝:', reason)
  console.error('Promise:', promise)
  process.exit(1)
})

// 启动服务器
startServer()

export default app
