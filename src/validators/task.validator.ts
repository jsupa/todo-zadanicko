import vine from '@vinejs/vine'
import type { Request, Response, NextFunction } from 'express'

const body = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body

    const schema = vine.object({
      listId: vine.string(),
      title: vine.string(),
      description: vine.string().optional(),
      dueDate: vine.string().optional(),
      tags: vine.array(vine.string()).optional(),
    })

    await vine.validate({ schema, data })

    next()
  } catch (error: any) {
    next(error)
  }
}

export default { body }
