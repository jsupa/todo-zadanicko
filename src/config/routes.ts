import express from 'express'

import { loginRouter } from './../routes/login.router.js'

export const routes = express.Router()

routes.use('/login', loginRouter)
