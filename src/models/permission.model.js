import mongoose, { Schema } from "mongoose"

const permissionSchema = new Schema(
  {
    name: String,
  },
  { timestamps: true }
)

export const Permission = mongoose.model("Permission", permissionSchema)
