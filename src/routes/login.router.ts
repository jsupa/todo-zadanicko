import express from 'express'
import c from '../controllers/login.controller.js'

import h from './../lib/helper.js'
import v from '../validators/login.validator.js'

export const loginRouter = express.Router()

loginRouter.post('/', h.checkLogin, v.login, c.login)
loginRouter.post('/register', h.checkLogin, v.register, c.register)
loginRouter.get('/me', h.verifyToken, h.checkAuth, c.me)
loginRouter.get('/logout', h.verifyToken, h.checkAuth, c.logout)

/**
 * @openapi
 * /login:
 *  post:
 *   tags: [Login]
 *   security: []
 *   summary: Login
 *   description: User login
 *   requestBody:
 *    description: User object
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        email:
 *         type: string
 *        password:
 *          type: string
 *   responses:
 *     422:
 *       description: Bad Request, Validation Error
 *     200:
 *       description: Success
 *
 * /login/register:
 *  post:
 *   tags: [Login]
 *   security: []
 *   summary: Register
 *   description: Register new user
 *   requestBody:
 *    description: User object
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        email:
 *         type: string
 *        password:
 *          type: string
 *   responses:
 *     422:
 *       description: Bad Request, Validation Error
 *     200:
 *       description: Success
 *
 * /login/me:
 *  get:
 *   tags: [Login]
 *   security:
 *    - bearerAuth: []
 *   summary: Me
 *   description: Get user profile
 *   responses:
 *     422:
 *       description: Bad Request, Validation Error
 *     200:
 *       description: Success
 *
 * /login/logout:
 *  get:
 *   tags: [Login]
 *   security:
 *    - bearerAuth: []
 *   summary: Me
 *   description: Get user profile
 *   responses:
 *     422:
 *       description: Bad Request, Validation Error
 *     200:
 *       description: Success
 */
