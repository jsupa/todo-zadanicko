import mongoose, { Schema, Document } from 'mongoose'
import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export interface IUser extends Document {
  email: string
  password: string
  token: string

  generateToken(): Promise<string>
  comparePassword(password: string): Promise<boolean>
}

const userSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false },
    token: { type: String },
  },
  { timestamps: true },
)

userSchema.methods.generateToken = async function () {
  const token = jwt.sign({ user_id: this._id }, config.jwtSecret, {
    expiresIn: '1h',
  })

  this.token = token

  await this.save()

  return token
}

userSchema.methods.comparePassword = async function (password: string) {
  const user = await User.findById(this._id).select('+password')

  return password === user?.password
}

const User = mongoose.model<IUser>('User', userSchema)

export default User
