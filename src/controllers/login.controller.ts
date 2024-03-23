import type { NextFunction, Request, Response } from 'express'
import User, { type IUser } from '../models/user.model'

interface Controller {
  login(req: Request, res: Response, next: NextFunction): void
  me(req: Request, res: Response): void
  register(req: Request, res: Response, next: NextFunction): void
  logout(req: Request, res: Response): void
}

interface CustomRequest extends Request {
  user: IUser
}

const login = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body

  try {
    const email = body.email.toLowerCase()
    const password = body.password

    const user = await User.findOne({ email })

    if (!user) throw new Error('User not found')

    const isMatch = await user.comparePassword(password)

    if (!isMatch) throw new Error('Invalid password')

    await user.generateToken()

    res.status(200).json({ message: 'success', token: user.token })
  } catch (error: any) {
    next(error)
  }
}

const me = (req: Request, res: Response) => {
  res.json({ user: req.user })
}

const register = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body

  try {
    const email = body.email.toLowerCase()
    const password = body.password

    const user = await User.findOne({ email })

    if (user) throw new Error('User already exists')

    const newUser = await User.create({ email, password })

    await newUser.generateToken()

    res.status(200).json({ message: 'success', token: newUser.token })
  } catch (error: any) {
    next(error)
  }
}

const logout = async (req: CustomRequest, res: Response) => {
  await req.user.updateOne({ token: '' })

  req.logout({ keepSessionInfo: false }, () =>
    res.json({ status: 'Logged out' }),
  )
}

export default {
  login,
  me,
  register,
  logout,
} as Controller
