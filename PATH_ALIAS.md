# TypeScript 路径别名配置

## 问题描述

在使用 TypeScript 项目时，可能会遇到以下错误：

```
Error: Cannot find module '@/config/database'
```

这是因为 TypeScript 编译器在运行时无法解析路径别名（path mapping）。

## 解决方案

本项目已经配置了完整的路径别名支持，包括开发环境和生产环境。

### 1. 开发环境

使用 `tsconfig-paths` 来支持路径别名解析：

```bash
npm run dev
```

相关配置：

- `package.json` 中的 dev 脚本使用 `-r tsconfig-paths/register`
- `.ts-node.json` 配置文件
- `nodemon.json` 配置文件

### 2. 生产环境

使用 `module-alias` 和 `tsc-alias` 来支持路径别名：

```bash
npm run build
npm start
```

相关配置：

- `package.json` 中的 `_moduleAliases` 配置
- `app.ts` 开头的 `module-alias/register` 注册
- 构建脚本使用 `tsc-alias` 转换路径

### 3. 路径别名配置

在 `tsconfig.json` 中配置的路径别名：

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"],
      "@/config/*": ["src/config/*"],
      "@/controllers/*": ["src/controllers/*"],
      "@/models/*": ["src/models/*"],
      "@/routes/*": ["src/routes/*"],
      "@/middleware/*": ["src/middleware/*"],
      "@/utils/*": ["src/utils/*"],
      "@/types/*": ["src/types/*"]
    }
  }
}
```

## 使用示例

```typescript
// 使用路径别名
import { User } from '@/models/User'
import { authenticate } from '@/middleware/auth'
import { AppError } from '@/middleware/errorHandler'

// 等价于相对路径
import { User } from '../models/User'
import { authenticate } from '../middleware/auth'
import { AppError } from '../middleware/errorHandler'
```

## 依赖包

### 开发依赖

- `tsconfig-paths` - 开发环境路径解析
- `tsc-alias` - 构建时路径转换
- `@types/module-alias` - 类型定义

### 运行时依赖

- `module-alias` - 生产环境路径解析

## 故障排除

如果仍然遇到路径解析问题：

1. **检查依赖是否安装**：

   ```bash
   npm install
   ```

2. **清理构建缓存**：

   ```bash
   rm -rf dist node_modules/.cache
   ```

3. **重新构建**：

   ```bash
   npm run build
   ```

4. **验证配置文件**：
   - 检查 `tsconfig.json` 中的 paths 配置
   - 检查 `package.json` 中的 \_moduleAliases 配置
   - 检查 `.ts-node.json` 配置

## 注意事项

- 路径别名必须以 `@/` 开头
- 开发和生产环境使用不同的解析机制
- 构建后的代码会自动转换路径别名为相对路径
