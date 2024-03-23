import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import config from '../config/config.js'
import User from '../models/user.model.js'

interface Helper {
  checkAuth(req: Request, res: Response, next: NextFunction): void
  checkLogin(req: Request, res: Response, next: NextFunction): void
  verifyToken(req: Request, res: Response, next: NextFunction): void
}

const helper = {} as Helper

helper.checkAuth = (req, res, next) => {
  try {
    if (req.isAuthenticated()) return next()

    res.status(401)

    throw new Error('Not authenticated')
  } catch (err) {
    next(err)
  }
}

helper.checkLogin = (req, _res, next) => {
  try {
    if (req.isAuthenticated()) throw new Error('Already authenticated')

    next()
  } catch (err) {
    next(err)
  }
}

helper.verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.isAuthenticated()) return next()

    const bearerToken = req.headers.authorization

    if (!bearerToken) throw new Error('Unauthorized')

    const token = bearerToken.split(' ')
    const parsedToken = token[token.length - 1]

    if (!parsedToken) throw new Error('Unauthorized')

    const decoded = jwt.verify(parsedToken, config.jwtSecret) as jwt.JwtPayload

    if (!decoded) throw new Error('Unauthorized')
    if (!decoded.user_id) throw new Error('Unauthorized')

    const user = await User.findOne({ id: decoded.user_id, token: parsedToken })

    if (!user) throw new Error('Unauthorized')

    console.log('user', user)

    req.logIn(user, (err) => {
      if (err) next(err)

      next()
    })
  } catch (error: any) {
    error.status = 401

    next(error)
  }
}

export default helper
