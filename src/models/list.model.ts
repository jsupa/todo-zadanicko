import mongoose, { Schema, Document } from 'mongoose'
import type { IUser } from './user.model'
import type { ITask } from './task.model'

export interface IList extends Document {
  owner: IUser
  invitees: IUser[]

  title: string

  tasks: ITask[]

  deletedAt: Date
}

const listSchema: Schema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    invitees: [{ type: Schema.Types.ObjectId, ref: 'User' }],

    title: { type: String, required: true },

    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],

    deletedAt: { type: Date },
  },
  { timestamps: true },
)

const List = mongoose.model<IList>('List', listSchema)

export default List
