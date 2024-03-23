import mongoose, { Schema, Document } from 'mongoose'

export interface ITask extends Document {
  title: string
  description?: string
  dueDate?: Date
  tags?: ['todo' | 'done' | 'doing' | 'backlog' | 'archived']
}

const taskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    tags: [
      { type: String, enum: ['todo', 'done', 'doing', 'backlog', 'archived'] },
    ],
    dueDate: { type: Date },
  },
  { timestamps: true },
)

const Task = mongoose.model<ITask>('Task', taskSchema)

export default Task
