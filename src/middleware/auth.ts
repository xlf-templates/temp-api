import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { Admin } from '@/models'
import { getUserRuleIds } from '@/utils/permissions'
import { setCurrentUser } from '@/utils/requestContext'

// JWT 载荷接口
interface JwtPayload {
  userId: number
  username: string
  role?: string
}

// 鉴权中间件：校验Bearer Token并附加req.user
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: '未提供访问令牌' })
    }

    const token = authHeader.substring(7)
    const secret = process.env.JWT_SECRET || 'temp_api_secret'
    const decoded = jwt.verify(token, secret) as JwtPayload

    const user = await Admin.findByPk(decoded.userId)
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: '令牌对应用户不存在' })
    }

    // 根据你的权限模型，附加分组与规则信息到请求对象
    // 用户所属分组（单一）
    const groupIds = user.groupId ? [user.groupId] : []

    // 2) 用户可用的规则ID集合（去重，过滤禁用分组/规则）
    const ruleIds = await getUserRuleIds(user.id)

    // 附加安全用户与权限上下文
    req.user = {
      id: user.id,
      username: user.username,
      // role可选，若不使用则不必依赖
      role: decoded.role,
      groupIds,
      ruleIds,
    } as any
    setCurrentUser(req.user as any)

    return next()
  } catch (error: any) {
    return res
      .status(401)
      .json({ success: false, message: '访问令牌无效或已过期' })
  }
}

export default authenticate
