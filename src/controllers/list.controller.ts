import type { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'
import User, { type IUser } from '../models/user.model'
import List from '../models/list.model'
import Task from '../models/task.model'

interface Controller {
  index(req: Request, res: Response, next: NextFunction): Promise<void>
  create(req: Request, res: Response, next: NextFunction): Promise<void>
  show(req: Request, res: Response, next: NextFunction): Promise<void>
  update(req: Request, res: Response, next: NextFunction): Promise<void>
  archive(req: Request, res: Response, next: NextFunction): Promise<void>
  invite(req: Request, res: Response, next: NextFunction): Promise<void>
  uninvite(req: Request, res: Response, next: NextFunction): Promise<void>
}

interface CustomRequest extends Request {
  user: IUser
}

const index = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const lists = await List.find({
      $or: [{ owner: req.user }, { invitees: req.user }],
      deletedAt: { $exists: false },
    }).populate(['tasks', 'invitees'])

    res.json({ lists, count: lists.length })
  } catch (error) {
    next(error)
  }
}

const create = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body

    const list = await List.create({
      owner: req.user,
      title: body.title,
    })

    res.json({ message: 'success', listId: list.id })
  } catch (error) {
    next(error)
  }
}

const show = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) throw new Error('Invalid ID')

    const list = await List.findOne({
      _id: req.params.id,
      deletedAt: { $exists: false },
    }).populate(['tasks', 'invitees'])

    console.log(list)

    if (!list) throw new Error('List not found')

    res.json({ list })
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
      _id: req.params.id,
      owner: req.user,
      deletedAt: { $exists: false },
    })

    if (!list) throw new Error('List not found')

    await list.updateOne({
      title: req.body.title,
    })

    res.json({ message: 'success' })
  } catch (error) {
    next(error)
  }
}

const archive = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) throw new Error('Invalid ID')

    const list = await List.findOne(
      { _id: req.params.id, deletedAt: { $exists: false } },
      { deletedAt: new Date() },
    )

    if (!list) throw new Error('List not found')

    await list.updateOne({ deletedAt: new Date() })

    await Task.updateMany(
      { id: { $in: list.tasks } },
      { $push: { tags: 'archived' } },
    )

    res.json({ message: 'success' })
  } catch (error) {
    next(error)
  }
}

const invite = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) throw new Error('Invalid ID')

    const list = await List.findOne({
      _id: req.params.id,
      deletedAt: { $exists: false },
    })

    if (!list) throw new Error('List not found')

    const user = await User.findOne({
      $and: [
        { email: req.body.email },
        { email: { $ne: req.user.email } },
        { _id: { $nin: list.invitees } },
      ],
    })

    if (!user) throw new Error('User not found')

    await list.updateOne({ $push: { invitees: user } })

    res.json({ message: 'success' })
  } catch (error) {
    next(error)
  }
}

const uninvite = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) throw new Error('Invalid ID')

    const user = await User.findOne({ email: req.body.email })

    if (!user) throw new Error('User not found')

    const list = await List.findOne({
      _id: req.params.id,
      deletedAt: { $exists: false },
      invitees: { $in: user.id },
    })

    if (!list) throw new Error('User not invited')

    await list.updateOne({ $pull: { invitees: user.id } })

    res.json({ message: 'success' })
  } catch (error) {
    next(error)
  }
}

export default {
  index,
  create,
  show,
  update,
  archive,
  invite,
  uninvite,
} as Controller
