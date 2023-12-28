import { ApiError } from '../utils/apiError.js'
import { asyncHandler } from '../utils/asynchandler.js'

export function checkRole(role) {
  return (req, res, next) => {
    const user = req.user

    if (user && user.roles) {
      if (user.roles.includes(role)) {
        next() // User has the required role
      } else {
        res.status(403).send('Role-based permission denied')
      }
    } else {
      res.status(401).send('Unauthorized')
    }
  }
}
