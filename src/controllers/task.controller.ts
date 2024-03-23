import type { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import type { IUser } from '../models/user.model'
import List from '../models/list.model'
import Task from '../models/task.model'

interface Controller {
  create(req: Request, res: Response, next: NextFunction): Promise<void>
  show(req: Request, res: Response, next: NextFunction): Promise<void>
  update(req: Request, res: Response, next: NextFunction): Promise<void>
}

interface CustomRequest extends Request {
  user: IUser
}

const create = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body

    if (!mongoose.isValidObjectId(body.listId))
      throw new Error('Invalid list ID')

    const list = await List.findOne({
      _id: body.listId,
      $or: [{ owner: req.user }, { invitees: req.user }],
      deletedAt: { $exists: false },
    })

    if (!list) throw new Error('List not found')

    const task = await Task.create({
      title: body.title,
      description: body.description,
      dueDate: body.dueDate,
      tags: body.tags,
    })

    await list.updateOne({ $push: { tasks: task } })

    res.json({ message: 'success', task: task })
  } catch (error) {
    next(error)
  }
}

const show = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) throw new Error('Invalid ID')

    const task = await Task.findOne({
      _id: req.params.id,
      deletedAt: { $exists: false },
    })

    res.json({ task })
  } catch (error) {
    next(error)
  }
}

const update = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) throw new Error('Invalid ID')

    const list = await List.findOne({
      $or: [{ owner: req.user }, { invitees: req.user }],
      deletedAt: { $exists: false },
      tasks: { $in: [req.params.id] },
    })

    if (!list) throw new Error('Access denied')

    await Task.updateOne(
      { _id: req.params.id },
      {
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        tags: req.body.tags,
      },
    )

    res.json({ message: 'success' })
  } catch (error) {
    next(error)
  }
}

export default {
  create,
  show,
  update,
} as Controller
