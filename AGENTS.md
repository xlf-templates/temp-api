# AGENTS.md - Developer Guidelines for temp-api

## Project Overview
- **Type**: Node.js + Express + TypeScript REST API
- **Database**: MySQL with Sequelize ORM
- **Port**: 3001 (default)
- **API Prefix**: `/api/v1`

## Commands

### Development & Build
```bash
npm run dev           # Start dev server with hot reload
npm run dev:debug     # Start with debugging enabled
npm run build         # Compile TypeScript (tsc && tsc-alias)
npm run start         # Run production build
```

### Linting
```bash
npm run lint          # Run ESLint
npm run lint:fix      # Auto-fix ESLint issues
```

### Database
```bash
npm run db:migrate    # Run Sequelize migrations
npm run db:seed       # Seed database
npm run db:create     # Create database
npm run db:drop       # Drop database
```

### Testing
No test framework is configured. Do not add tests unless explicitly requested.

## Code Style Guidelines

### TypeScript
- Use `strict: true` in tsconfig.json (all strict type checking enabled)
- Always declare explicit return types for functions
- Avoid `any` - use `unknown` or specific types instead
- Use optional chaining (`?.`) and nullish coalescing (`??`)

### Path Aliases
Use path aliases instead of relative imports:
```typescript
// Good
import { GoodsCategory } from '@/models'

// Avoid
import { GoodsCategory } from '../../models'
```
Available aliases: `@/config/*`, `@/controllers/*`, `@/models/*`, `@/routes/*`, `@/middleware/*`, `@/utils/*`, `@/types/*`

### Naming Conventions
- **Files**: camelCase (e.g., `goodsCategories.ts`, `jwt.ts`)
- **Classes/Types/Interfaces**: PascalCase (e.g., `GoodsCategory`)
- **Functions/Variables**: camelCase (e.g., `listGoodsCategories`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_PREFIX`)
- **Database tables**: snake_case (e.g., `goods_category`)

### Controller Pattern
```typescript
export const listItems = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1
    const result = await Model.findAndCountAll({ ... })
    return ok(res, 'Success', { items: result.rows, total: result.count })
  } catch (error: any) {
    return fail(res, error.message, 500)
  }
}
```

### Route Pattern
```typescript
import { Router } from 'express'
import { listItems } from '@/controllers/items'
import authenticate from '@/middleware/auth'

const router: Router = Router()
router.use(authenticate)
router.get('/', listItems)
export default router
```

### Model Pattern
```typescript
export interface GoodsCategoryAttributes {
  id: number
  name: string
}

export class GoodsCategory extends Model<GoodsCategoryAttributes, GoodsCategoryCreationAttributes> {
  public id!: number
}

GoodsCategory.init({ ... }, { sequelize, tableName: 'goods_category' })
```

### Response Format
Use `ok()` and `fail()` from `@/utils/response`:
```typescript
return ok(res, 'Success', data)
return fail(res, 'Error', 400)
return ok(res, 'Created', data, 201)
```

### Error Handling
- Use `AppError` class for operational errors
- Use global error handler middleware
- Log errors with console.error in development
- Never expose sensitive information

### ESLint Rules
- `@typescript-eslint/no-unused-vars`: error
- `@typescript-eslint/no-explicit-any`: warn
- `prefer-const`: error
- `no-var`: error

Run `npm run lint` before committing.

### Swagger Documentation
- Access at `/api-docs`
- Add JSDoc comments to routes

## Project Structure
```
src/
├── app.ts            # Main entry
├── config/           # Database, swagger config
├── controllers/      # Request handlers
├── models/           # Sequelize models
├── routes/           # Express routers
├── middleware/       # Auth, error handling
├── utils/            # Utilities (response, jwt, etc.)
├── types/            # TypeScript types
├── migrations/       # Database migrations
└── seeders/          # Database seeders
```

## Common Tasks

### Adding a New Model
1. Create file in `src/models/`
2. Define interfaces and class
3. Add to `src/models/index.ts`

### Adding a New Route
1. Create controller in `src/controllers/`
2. Create route file in `src/routes/`
3. Import and mount in `src/routes/index.ts`

### Database Changes
1. Create migration: `npx sequelize-cli migration:generate --name name`
2. Run: `npm run db:migrate`
## 回复语言规范
- 所有 AI 回答必须使用中文
- 技术术语可保留英文（如 API、Component），但需附中文解释
- 代码注释优先使用中文，复杂逻辑可中英双语
- 与用户交流全程使用中文
- 技术文档生成优先输出中文版本