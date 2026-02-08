# API 文档

## 简介

欢迎使用 Temp API 文档！这是一个基于 Node.js + Express + TypeScript + Sequelize + MySQL 的后端 API 服务。

## 快速开始

### 1. 认证

所有需要身份验证的接口都需要在请求头中包含 JWT 令牌：

```
Authorization: Bearer <your_jwt_token>
```

### 2. 获取令牌

通过登录接口获取 JWT 令牌：

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

### 3. 使用令牌

在后续请求中使用返回的令牌：

```bash
curl -X GET http://localhost:3000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## API 接口概览

### 认证相关 (`/api/v1/auth`)

- `POST /register` - 用户注册
- `POST /login` - 用户登录
- `GET /me` - 获取当前用户信息
- `PUT /profile` - 更新用户信息
- `PUT /password` - 修改密码

### 用户管理 (`/api/v1/users`) - 需要管理员权限

- `GET /` - 获取用户列表（支持分页和搜索）
- `GET /:id` - 获取单个用户信息
- `POST /` - 创建用户
- `PUT /:id` - 更新用户信息
- `DELETE /:id` - 删除用户
- `POST /batch-delete` - 批量删除用户

### 系统相关 (`/api/v1`)

- `GET /` - API 根路径
- `GET /health` - 健康检查

## 响应格式

所有接口都返回统一的响应格式：

### 成功响应

```json
{
  "success": true,
  "message": "操作成功",
  "data": {
    // 具体数据内容
  }
}
```

### 错误响应

```json
{
  "success": false,
  "message": "错误描述",
  "errors": [
    {
      "field": "字段名",
      "message": "错误详情"
    }
  ]
}
```

## 状态码说明

- `200` - 请求成功
- `201` - 创建成功
- `400` - 请求参数错误
- `401` - 未授权（需要登录）
- `403` - 权限不足
- `404` - 资源不存在
- `500` - 服务器内部错误

## 用户角色权限

### 普通用户 (`user`)

- 可以查看和修改自己的个人信息
- 可以修改自己的密码

### 管理员 (`admin`)

- 拥有所有普通用户权限
- 可以管理所有用户（查看、创建、更新、删除）
- 可以批量操作用户

## 参数验证规则

### 用户名

- 长度：3-50 个字符
- 格式：只能包含字母、数字和下划线
- 示例：`john_doe`

### 邮箱

- 格式：有效的邮箱地址
- 示例：`user@example.com`

### 密码

- 长度：至少 6 个字符
- 格式：必须包含至少一个字母和一个数字
- 示例：`password123`

## 分页查询

用户列表接口支持分页查询：

```bash
GET /api/v1/users?page=1&limit=10&search=john&status=active&role=user
```

参数说明：

- `page`: 页码（从 1 开始）
- `limit`: 每页数量（1-100）
- `search`: 搜索关键词（匹配用户名或邮箱）
- `status`: 用户状态过滤
- `role`: 用户角色过滤

## 错误处理

### 参数验证错误

```json
{
  "success": false,
  "message": "请求参数验证失败",
  "errors": [
    {
      "field": "email",
      "message": "请输入有效的邮箱地址"
    },
    {
      "field": "password",
      "message": "密码长度至少6个字符"
    }
  ]
}
```

### 认证错误

```json
{
  "success": false,
  "message": "访问令牌缺失或格式错误"
}
```

### 权限错误

```json
{
  "success": false,
  "message": "权限不足"
}
```

## 示例代码

### JavaScript (Fetch)

```javascript
// 登录
const login = async (email, password) => {
  const response = await fetch('/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await response.json()
  if (data.success) {
    localStorage.setItem('token', data.data.token)
  }
  return data
}

// 获取用户信息
const getCurrentUser = async () => {
  const token = localStorage.getItem('token')
  const response = await fetch('/api/v1/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.json()
}
```

### Python (requests)

```python
import requests

# 登录
def login(email, password):
    response = requests.post('http://localhost:3000/api/v1/auth/login',
        json={'email': email, 'password': password})
    return response.json()

# 获取用户信息
def get_current_user(token):
    headers = {'Authorization': f'Bearer {token}'}
    response = requests.get('http://localhost:3000/api/v1/auth/me',
        headers=headers)
    return response.json()
```

## 开发环境

- Node.js 版本：>= 16.0.0
- 数据库：MySQL 5.7+
- 字符编码：UTF-8

## 联系支持

如有问题请联系：

- 邮箱：support@example.com
- 文档版本：1.0.0
- 最后更新：2023-12-01
