import vine from '@vinejs/vine'
import type { Request, Response, NextFunction } from 'express'

const body = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body

    const schema = vine.object({ title: vine.string() })

    await vine.validate({ schema, data })

    next()
  } catch (error: any) {
    next(error)
  }
}

export default { body }
