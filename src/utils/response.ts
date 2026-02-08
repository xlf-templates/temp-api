import { Response } from 'express'

export const ok = (
  res: Response,
  message: string,
  data?: any,
  status = 200
) => {
  return res.status(status).json({ success: true, code: 200, message, data })
}

export const fail = (
  res: Response,
  message: string,
  status = 400,
  errors?: any
) => {
  return res.status(status).json({ success: false, code: status, message, ...(errors ? { errors } : {}) })
}