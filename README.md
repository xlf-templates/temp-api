# Temp API

一个基于 Node.js + Express + TypeScript + Sequelize + MySQL 的后端 API 服务

## 技术栈

- **Node.js** - JavaScript 运行时
- **Express** - Web 应用框架
- **TypeScript** - 类型安全的 JavaScript
- **Sequelize** - ORM 数据库操作
- **MySQL** - 关系型数据库
- **JWT** - 身份认证
- **bcryptjs** - 密码加密
- **Swagger** - API 文档

## 功能特性

- ✅ 用户注册/登录
- ✅ JWT 身份认证
- ✅ 角色权限管理
- ✅ 用户管理 CRUD
- ✅ 请求参数验证
- ✅ 错误处理中间件
- ✅ 日志记录
- ✅ CORS 跨域支持
- ✅ 安全防护 (Helmet)
- ✅ 请求压缩
- ✅ Swagger API 文档

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 环境配置

复制环境变量示例文件并配置：

```bash
cp .env.example .env
```

修改 `.env` 文件中的配置：

```env
# 服务器配置
PORT=3000
NODE_ENV=development

# 数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_NAME=temp_api_db
DB_USER=root
DB_PASSWORD=your_password

# JWT配置
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# 其他配置
API_PREFIX=/api/v1
CORS_ORIGIN=http://localhost:5173
LOG_LEVEL=info
```

### 3. 数据库设置

确保 MySQL 服务已启动，然后创建数据库：

```sql
CREATE DATABASE temp_api_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 4. 启动开发服务器

```bash
npm run dev
```

服务器将在 http://localhost:3000 启动

### 5. 访问 API 文档

启动服务器后，可以访问以下地址查看 API 文档：

- **Swagger UI**: http://localhost:3000/api-docs
- **API 规范 JSON**: http://localhost:3000/api-docs.json

## 可用脚本

```bash
# 开发模式（热重载）
npm run dev

# 构建项目
npm run build

# 生产环境启动
npm start

# 代码检查
npm run lint

# 修复代码格式
npm run lint:fix

# 数据库迁移
npm run db:migrate

# 数据库种子
npm run db:seed
```

## API 接口

> 📚 **完整的 API 文档请访问**: http://localhost:3000/api-docs
>
> 📄 **文档说明**: 查看 [API_DOCS.md](./API_DOCS.md) 获取详细使用指南

### 认证相关

- `POST /api/v1/auth/register` - 用户注册
- `POST /api/v1/auth/login` - 用户登录
- `GET /api/v1/auth/me` - 获取当前用户信息
- `PUT /api/v1/auth/profile` - 更新用户信息
- `PUT /api/v1/auth/password` - 修改密码

### 用户管理（需要管理员权限）

- `GET /api/v1/users` - 获取用户列表
- `GET /api/v1/users/:id` - 获取单个用户
- `POST /api/v1/users` - 创建用户
- `PUT /api/v1/users/:id` - 更新用户
- `DELETE /api/v1/users/:id` - 删除用户
- `POST /api/v1/users/batch-delete` - 批量删除用户

### 其他

- `GET /api/v1/` - API 根路径
- `GET /api/v1/health` - 健康检查

## 项目结构

```
src/
├── config/          # 配置文件
│   └── database.ts  # 数据库配置
├── controllers/     # 控制器
│   ├── authController.ts
│   └── userController.ts
├── middleware/      # 中间件
│   ├── auth.ts     # 认证中间件
│   ├── errorHandler.ts # 错误处理
│   └── validation.ts   # 参数验证
├── models/          # 数据模型
│   ├── User.ts
│   └── index.ts
├── routes/          # 路由
│   ├── auth.ts
│   ├── users.ts
│   └── index.ts
├── types/           # 类型定义
│   └── env.ts
├── utils/           # 工具函数
├── migrations/      # 数据库迁移
├── seeders/         # 数据库种子
└── app.ts          # 应用入口
```

## 开发规范

### 代码风格

- 使用 TypeScript 严格模式
- 遵循 ESLint 规则
- 使用 Prettier 格式化代码

### 提交规范

使用语义化提交信息：

- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建过程或辅助工具的变动

## 部署

### 1. 构建项目

```bash
npm run build
```

### 2. 设置生产环境变量

### 3. 启动应用

```bash
npm start
```

## 许可证

MIT License
