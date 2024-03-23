import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import morgan from 'morgan'
import { consola } from 'consola'
import swaggerUi from 'swagger-ui-express'

import User, { type IUser } from './../models/user.model.js'
import { routes } from './../config/routes.js'
import config from './../config/config.js'
import swagger from './swagger.js'

export interface CustomRequest extends Request {
  user?: IUser
}

morgan.token('body', (req: Request) => JSON.stringify(req.body))

passport.serializeUser((user: any, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)

    done(null, user)
  } catch (error) {
    done(error, null)
  }
})

class Server {
  private app: Express

  constructor() {
    this.app = express()
  }

  public setup(): void {
    this.setDefaults()
  }

  public start(): void {
    try {
      this.app.listen(config.webPort)
      consola.success(`Server listening on port ${config.webPort}`)
    } catch (error) {
      consola.error(error)
    }
  }

  private setDefaults(): void {
    this.app.set('trust proxy', true)

    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))

    this.app.use(cookieParser(config.sessionSecret))
    this.app.use(sessionConfig)

    this.app.use(passport.initialize())
    this.app.use(passport.session())

    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger))

    this.app.use(
      morgan(
        ':remote-addr | :method (:status) :url | (:response-time ms) :body',
      ),
    )

    this.app.use('/', routes)

    this.app.use(notFound)
    this.app.use(errorHandler)
  }
}

const store = MongoStore.create({
  mongoUrl: config.mongoUri,
  collectionName: 'sessions',
})

const sessionConfig = session({
  secret: config.sessionSecret,
  name: 'oreo',
  resave: true,
  saveUninitialized: true,
  store,
})

const notFound = (req: Request, res: Response, next: any) => {
  res.status(404)

  const error = new Error('404 - Not Found')

  next(error)
}

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  consola.error(err)

  res.status(err.status || 500)

  console.log('status', res.statusCode)

  res.json({
    message: err.message,
    messages: err.messages,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  })
}

export default new Server()
