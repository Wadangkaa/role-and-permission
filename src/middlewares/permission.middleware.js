import { ApiError } from '../utils/apiError.js'
import { asyncHandler } from '../utils/asynchandler.js'

export function checkPermissions(...permissions) {
  return asyncHandler((req, res, next) => {
    // fetching authenticated user
    const user = req.user

    // validating user
    if (user && user.permissions) {
      // fetching user's permissions
      const userPermissions = user.permissions.map((perm) => perm.name)

      // validating permissions
      if (
        permissions.every((permission) => userPermissions.includes(permission))
      ) {
        next()
      } else {
        throw new ApiError(403, 'Permission denied')
      }
    } else {
      throw new ApiError(401, 'Unauthorized')
    }
  })
}
export function checkAnyPermissions(...permissions) {
  return asyncHandler((req, res, next) => {
    // fetching authenticated user
    const user = req.user

    // validating user
    if (user && user.permissions) {
      // fetching user's permissions
      const userPermissions = user.permissions.map((perm) => perm.name)

      // validating permissions
      if (
        permissions.some((permission) => userPermissions.includes(permission))
      ) {
        next()
      } else {
        throw new ApiError(403, 'Permission denied')
      }
    } else {
      throw new ApiError(401, 'Unauthorized')
    }
  })
}
