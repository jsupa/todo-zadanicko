import express from 'express'

import { loginRouter } from './../routes/login.router.js'
import { listRouter } from './../routes/list.router.js'
import { taskRouter } from './../routes/task.router.js'

export const routes = express.Router()

routes.use('/login', loginRouter)
routes.use('/list', listRouter)
routes.use('/task', taskRouter)
