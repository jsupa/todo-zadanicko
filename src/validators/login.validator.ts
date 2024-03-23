import vine from '@vinejs/vine'
import type { Request, Response, NextFunction } from 'express'

interface Validator {
  login: (req: Request, res: Response, next: NextFunction) => void
  register: (req: Request, res: Response, next: NextFunction) => void
}

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body

    const schema = vine.object({
      email: vine.string().email(),
      password: vine.string(),
    })

    await vine.validate({ schema, data })

    next()
  } catch (error: any) {
    next(error)
  }
}

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body

    const schema = vine.object({
      email: vine.string().email(),
      password: vine.string().minLength(6).maxLength(32),
    })

    await vine.validate({ schema, data })

    next()
  } catch (error: any) {
    next(error)
  }
}

export default { login, register } as Validator
