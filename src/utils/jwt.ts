import jwt, { Secret, SignOptions } from 'jsonwebtoken'
import crypto from 'crypto'
export const signToken = (payload: object): string => {
  const secret: Secret = (process.env.JWT_SECRET || 'temp_api_secret') as Secret
  const expiresIn: SignOptions['expiresIn'] = (process.env.JWT_EXPIRES_IN ||
    '7d') as SignOptions['expiresIn']
  return jwt.sign(payload, secret, { expiresIn })
}
export const generateNodePassword = (length = 6) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let password = ''

  for (let i = 0; i < length; i++) {
    const randomByte = crypto.randomBytes(1)[0]
    password += chars[randomByte % chars.length]
  }

  return password
}
