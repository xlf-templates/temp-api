export interface EnvConfig {
  PORT: number
  NODE_ENV: 'development' | 'production' | 'test'
  DB_HOST: string
  DB_PORT: number
  DB_NAME: string
  DB_USER: string
  DB_PASSWORD: string
  JWT_SECRET: string
  JWT_EXPIRES_IN: string
  API_PREFIX: string
  CORS_ORIGIN: string
  LOG_LEVEL: string
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvConfig {}
  }
}
