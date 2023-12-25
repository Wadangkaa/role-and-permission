import mongoose, { Schema } from 'mongoose'

const roleSchema = new Schema()(
  {
    name: String,
  },
  { timestamps: true }
)

export const Role = mongoose.model('Role', roleSchema)
