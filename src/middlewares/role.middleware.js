import { ApiError } from '../utils/apiError.js'
import { asyncHandler } from '../utils/asynchandler.js'

export function checkRoles(...roles) {
  return asyncHandler((req, res, next) => {
    // fetching authenticated user
    const user = req.user

    console.log(user, roles)
    // validating user
    if (user && user.roles) {
      // fetching user's roles
      const userRoles = user.roles.map((role) => role.name)

      // validating roles
      if (roles.every((role) => userRoles.includes(role))) {
        next()
      } else {
        throw new ApiError(403, 'Role-based permission denied')
      }
    } else {
      throw new ApiError(401, 'Unauthorized')
    }
  })
}
