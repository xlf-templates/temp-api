import 'express'

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number
        username: string
        userCode: string
        role?: string
        groupIds?: number[]
        ruleIds?: number[]
      }
    }
  }
}

export {}