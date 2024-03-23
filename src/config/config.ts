const config: IConfig = {
  version: '1.0.0',
  name: 'jsupa-amcef-todo',
  webPort: parseInt(process.env.WEB_PORT || '3001'),
  mongoUri:
    process.env.MONGO_URI || 'mongodb://localhost:27017/jsupa-amcef-dev2',
  sessionSecret: process.env.SESSION_SECRET || 'secret',
  jwtSecret: process.env.JWT_SECRET || 'secret',
}

export default config

interface IConfig {
  version: string
  name: string
  webPort: number
  mongoUri: string
  sessionSecret: string
  jwtSecret: string
}
