import mongoose, { Schema } from 'mongoose'
import { Role } from './role.model.js'
import { Permission } from './permission.model.js'

const rolePermissionSchema = new Schema(
  {
    roleId: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
    },
    permissionId: {
      type: Schema.Types.ObjectId,
      ref: 'Permission',
    },
  },
  { timestamps: true }
)

export const RolePermission = mongoose.model(
  'RolePermission',
  rolePermissionSchema
)
