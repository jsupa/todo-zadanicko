import express from 'express'
import c from '../controllers/task.controller.js'

import h from './../lib/helper.js'
import v from '../validators/task.validator.js'

export const taskRouter = express.Router()

taskRouter.post('/', h.verifyToken, h.checkAuth, v.body, c.create)
taskRouter.get('/:id', c.show)
taskRouter.put('/:id', h.verifyToken, h.checkAuth, c.update)

/**
 * @openapi
 * /task:
 *  post:
 *   tags: [Task]
 *   security:
 *    - bearerAuth: []
 *   summary: Create Task
 *   description: Create a new task for a list
 *   requestBody:
 *    description: Task object
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        listId:
 *         type: string
 *        title:
 *         type: string
 *        description:
 *         type: string
 *        dueDate:
 *         type: string
 *         format: date-time
 *        tags:
 *         type: array
 *         items:
 *          type: string
 *          enum: ['todo', 'done', 'doing', 'backlog', 'archived']
 *   responses:
 *     422:
 *       description: Bad Request, Validation Error
 *     200:
 *       description: Success
 *
 * /task/{id}:
 *  get:
 *   tags: [Task]
 *   security: []
 *   summary: Get task
 *   description: Get a task
 *   parameters:
 *    - name: id
 *      in: path
 *      description: Task ID
 *   responses:
 *     200:
 *       description: Success
 *
 *  put:
 *   tags: [Task]
 *   security:
 *    - bearerAuth: []
 *   summary: Update task
 *   description: Update a task
 *   requestBody:
 *    description: task object
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        title:
 *         type: string
 *        description:
 *         type: string
 *        dueDate:
 *         type: string
 *         format: date-time
 *        tags:
 *         type: array
 *         items:
 *          type: string
 *          enum: ['todo', 'done', 'doing', 'backlog', 'archived']
 *   parameters:
 *    - name: id
 *      in: path
 *      description: Task ID
 *   responses:
 *     200:
 *       description: Success
 */
