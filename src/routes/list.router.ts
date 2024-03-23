import express from 'express'
import c from '../controllers/list.controller.js'

import h from './../lib/helper.js'
import v from '../validators/list.validator.js'

export const listRouter = express.Router()

listRouter.get('/', h.verifyToken, h.checkAuth, c.index)
listRouter.post('/', h.verifyToken, h.checkAuth, v.body, c.create)

listRouter.get('/:id', c.show)
listRouter.put('/:id', h.verifyToken, h.checkAuth, v.body, c.update)
listRouter.delete('/:id', h.verifyToken, h.checkAuth, c.archive)

listRouter.post('/:id/invite', h.verifyToken, h.checkAuth, c.invite)
listRouter.delete('/:id/invite', h.verifyToken, h.checkAuth, c.uninvite)

/**
 * @openapi
 * /list:
 *  get:
 *   tags: [List]
 *   security:
 *    - bearerAuth: []
 *   summary: Get user lists
 *   description: Get all user lists
 *   responses:
 *     200:
 *       description: Success
 *
 *  post:
 *   tags: [List]
 *   security:
 *    - bearerAuth: []
 *   summary: Create list
 *   description: Create a new list
 *   requestBody:
 *    description: List object
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        title:
 *         type: string
 *   responses:
 *     422:
 *       description: Bad Request, Validation Error
 *     200:
 *       description: Success
 *
 * /list/{id}:
 *  get:
 *   tags: [List]
 *   security: []
 *   summary: Get list
 *   description: Get a list
 *   parameters:
 *    - name: id
 *      in: path
 *      description: List ID
 *   responses:
 *     200:
 *       description: Success
 *
 *  put:
 *   tags: [List]
 *   security:
 *    - bearerAuth: []
 *   summary: Update list
 *   description: Update a list
 *   requestBody:
 *    description: List object
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        title:
 *         type: string
 *   parameters:
 *    - name: id
 *      in: path
 *      description: List ID
 *   responses:
 *     200:
 *       description: Success
 *
 *  delete:
 *   tags: [List]
 *   security:
 *    - bearerAuth: []
 *   summary: Delete list
 *   description: Delete a list
 *   parameters:
 *    - name: id
 *      in: path
 *      description: List ID
 *   responses:
 *     200:
 *       description: Success
 *
 * /list/{id}/invite:
 *  post:
 *   tags: [List]
 *   security:
 *    - bearerAuth: []
 *   summary: Invite user
 *   description: Invite a user to a list
 *   parameters:
 *    - name: id
 *      in: path
 *      description: List ID
 *   requestBody:
 *    description: List object
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        email:
 *         type: string
 *   responses:
 *     200:
 *       description: Success
 *
 *  delete:
 *   tags: [List]
 *   security:
 *    - bearerAuth: []
 *   summary: Uninvite user
 *   description: Uninvite a user from a list
 *   parameters:
 *    - name: id
 *      in: path
 *      description: List ID
 *   requestBody:
 *    description: List object
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        email:
 *         type: string
 *   responses:
 *     200:
 *       description: Success
 *
 */
