import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Express } from 'express'
import path from 'path'

// Swagger 基本配置
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Temp API Documentation',
    version: '1.0.0',
    description:
      '基于 Node.js + Express + TypeScript + Sequelize + MySQL 的后端API服务',
    contact: {
      name: 'API Support',
      email: 'support@example.com',
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  servers: [
    {
      url: 'http://localhost:3001/api/v1',
      description: '开发环境',
    },
    {
      url: 'https://api.example.com/api/v1',
      description: '生产环境',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT认证令牌，格式: Bearer <token>',
      },
    },
    schemas: {
      ApiResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            description: '请求是否成功',
          },
          code: {
            type: 'integer',
            description: '业务状态码，成功为200',
            example: 200,
          },
          message: {
            type: 'string',
            description: '响应消息',
          },
          data: {
            description: '响应数据',
          },
        },
        required: ['success'],
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false,
          },
          code: {
            type: 'integer',
            description: '业务状态码，错误时与HTTP状态一致',
            example: 400,
          },
          message: {
            type: 'string',
            description: '错误消息',
          },
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: {
                  type: 'string',
                  description: '错误字段',
                },
                message: {
                  type: 'string',
                  description: '错误描述',
                },
              },
            },
            description: '详细错误信息',
          },
        },
        required: ['success', 'message'],
      },
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: '用户ID',
            example: 1,
          },
          username: {
            type: 'string',
            description: '用户名',
            example: 'john_doe',
          },
          userCode: {
            type: 'string',
            description: '用户编码',
            example: 'U2023110001',
          },
          avatar: {
            type: 'string',
            format: 'uri',
            description: '头像URL',
            example: 'https://example.com/avatar.jpg',
            nullable: true,
          },
          status: {
            type: 'integer',
            enum: [0, 1],
            description: '状态 0=禁用,1=启用',
            example: 1,
          },
          lastLoginAt: {
            type: 'string',
            format: 'date-time',
            description: '最后登录时间',
            example: '2023-12-01T10:30:00Z',
            nullable: true,
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: '创建时间',
            example: '2023-12-01T10:00:00Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: '更新时间',
            example: '2023-12-01T10:30:00Z',
          },
        },
        required: ['id', 'username', 'userCode', 'status'],
      },
      UserRegister: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
            minLength: 3,
            maxLength: 50,
            pattern: '^[a-zA-Z0-9_]+$',
            description: '用户名，只能包含字母、数字和下划线',
            example: 'john_doe',
          },
          userCode: {
            type: 'string',
            description: '用户编码（唯一）',
            example: 'U2023110001',
          },
          password: {
            type: 'string',
            minLength: 6,
            pattern: '^(?=.*[A-Za-z])(?=.*\\d)',
            description: '密码，至少6位，必须包含字母和数字',
            example: 'password123',
          },
        },
        required: ['username', 'userCode', 'password'],
      },
      UserLogin: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
            description: '用户名（与 userCode 至少填一个）',
            example: 'john_doe',
          },
          userCode: {
            type: 'string',
            description: '用户编码（与 username 至少填一个）',
            example: 'U2023110001',
          },
          password: {
            type: 'string',
            description: '密码',
            example: 'password123',
          },
        },
        required: ['password'],
        anyOf: [
          { required: ['username'] },
          { required: ['userCode'] },
        ],
      },
      AuthResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true,
          },
          code: {
            type: 'integer',
            description: '业务状态码，成功为200',
            example: 200,
          },
          message: {
            type: 'string',
            example: '登录成功',
          },
          data: {
            type: 'object',
            properties: {
              user: {
                $ref: '#/components/schemas/User',
              },
              token: {
                type: 'string',
                description: 'JWT认证令牌',
                example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              },
            },
          },
        },
      },
      PaginationResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true,
          },
          code: {
            type: 'integer',
            description: '业务状态码，成功为200',
            example: 200,
          },
          message: {
            type: 'string',
            example: '获取数据成功',
          },
          data: {
            type: 'object',
            properties: {
              users: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/User',
                },
              },
              pagination: {
                type: 'object',
                properties: {
                  currentPage: {
                    type: 'integer',
                    example: 1,
                  },
                  totalPages: {
                    type: 'integer',
                    example: 10,
                  },
                  totalCount: {
                    type: 'integer',
                    example: 100,
                  },
                  pageSize: {
                    type: 'integer',
                    example: 10,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  tags: [
    {
      name: 'Authentication',
      description: '认证相关接口',
    },
    {
      name: 'System',
      description: '系统相关接口',
    },
    {
      name: 'Admins',
      description: '管理员账户管理接口（需要鉴权）',
    },
    {
      name: 'AdminGroups',
      description: '管理员分组管理接口（需要鉴权）',
    },
    {
      name: 'AdminGroupAccess',
      description: '管理员分组成员关系接口（需要鉴权）',
    },
    {
      name: 'AdminLogs',
      description: '管理员操作日志接口（需要鉴权）',
    },
    {
      name: 'AdminRules',
      description: '权限规则与菜单接口（需要鉴权）',
    },
  ],
}

// Swagger 选项配置
const options: swaggerJSDoc.Options = {
  definition: swaggerDefinition,
  apis: [
    path.join(__dirname, '../routes/*.ts'), // 路由文件路径
    path.join(__dirname, '../controllers/*.ts'), // 控制器文件路径
  ],
}

// 生成 Swagger 规范
const swaggerSpec = swaggerJSDoc(options)

// Swagger UI 选项
const swaggerUiOptions = {
  customCss: `
    .swagger-ui .topbar { display: none }
    .swagger-ui .info { margin: 20px 0; }
    .swagger-ui .scheme-container { margin: 20px 0; padding: 20px; background: #f8f9fa; border-radius: 5px; }
  `,
  customSiteTitle: 'Temp API Documentation',
  customfavIcon: '/favicon.ico',
  swaggerOptions: {
    docExpansion: 'none', // 默认折叠所有接口
    tagsSorter: 'alpha', // 按字母顺序排序标签
    operationsSorter: 'alpha', // 按字母顺序排序操作
    defaultModelsExpandDepth: 2, // 模型展开深度
    defaultModelExpandDepth: 2,
    displayRequestDuration: true, // 显示请求耗时
    tryItOutEnabled: true, // 启用试用功能
    persistAuthorization: true, // 持久化认证信息
  },
}

// 设置 Swagger 文档
export const setupSwagger = (app: Express): void => {
  // API 文档页面
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, swaggerUiOptions)
  )

  // 提供 JSON 格式的 API 规范
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })

  console.log(
    `📚 API文档地址: http://localhost:${process.env.PORT || 3001}/api-docs`
  )
}

export { swaggerSpec }
export default setupSwagger
