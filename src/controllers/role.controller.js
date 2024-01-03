import { Role } from '../models/role.model.js'
import { RolePermission } from '../models/rolepermission.model.js'
import { ApiError } from '../utils/apiError.js'
import { asyncHandler } from '../utils/asynchandler.js'

export const createRole = asyncHandler(async (req, res) => {
  // validate if the authenticated user have permission to create a role

  // creating a new role
  const { name, permissions } = req.body

  const newRole = await Role.create({
    name,
  })

  if (!newRole) {
    throw new ApiError(500, 'Role creation failed')
  }

  permissions.forEach((permission) => {
    RolePermission.create({ roleId: newRole._id, permissionId: permission })
  })

  res.status(201).json({
    success: true,
    data: newRole,
  })
})
