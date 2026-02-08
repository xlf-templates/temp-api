import { AsyncLocalStorage } from 'async_hooks'
import { Request, Response, NextFunction } from 'express'

type User = {
  id: number
  username: string
  userCode: string
  role?: string
  groupIds?: number[]
  ruleIds?: number[]
}

type Context = {
  req: Request
  res: Response
  user?: User
}

const storage = new AsyncLocalStorage<Context>()

export const requestContext = (req: Request, res: Response, next: NextFunction) => {
  storage.run({ req, res }, () => next())
}

export const setCurrentUser = (user?: User) => {
  const store = storage.getStore()
  if (store) store.user = user
}

export const getCurrentUser = (): User | undefined => {
  return storage.getStore()?.user
}
