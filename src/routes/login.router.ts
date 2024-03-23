import express from 'express'
import controller from '../controllers/login.controller.js'

import helper from './../lib/helper.js'
import validate from '../validators/login.validator.js'

export const loginRouter = express.Router()

loginRouter.post('/', helper.checkLogin, validate.login, controller.login)
loginRouter.post(
  '/register',
  helper.checkLogin,
  validate.register,
  controller.register,
)
loginRouter.get('/me', helper.verifyToken, helper.checkAuth, controller.me)
loginRouter.get(
  '/logout',
  helper.verifyToken,
  helper.checkAuth,
  controller.logout,
)

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
 *   parameters:
 *    - name: Accept-Language
 *      in: header
 *      description: Language
 *      required: false
 *      schema:
 *       type: string
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
 *   parameters:
 *    - name: Accept-Language
 *      in: header
 *      description: Language
 *      required: false
 *      schema:
 *       type: string
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
