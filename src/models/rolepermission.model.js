import mongoose, { Schema } from "mongoose"

const rolePermissionSchema = new Schema(
  {
    roleId: {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
    permissionId: {
      type: Schema.Types.ObjectId,
      ref: "Permission",
    },
  },
  { timestamps: true }
)

export const Role = mongoose.model("Role", rolePermissionSchema)
