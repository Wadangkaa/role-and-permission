import { User } from '../models/user.model.js'
import { ApiError } from '../utils/ApiError.js'
import jwt from 'jsonwebtoken'

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // retriving token
    const token =
      req.cookies?.accessToken ||
      req.header('Authorization')?.replace('Bearer ', '')

    // checking if token exists
    if (!token) {
      throw new ApiError(401, 'Unauthorized request')
    }

    // verifying token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    // fetching authorized user
    const user = await User.findById(decodedToken?._id).select(
      '-password -refreshToken'
    )

    // validating user
    if (!user) {
      throw new ApiError(401, 'invalid access token')
    }

    // adding user to request object
    req.user = user

    next()
  } catch (error) {
    throw new ApiError(401, error.message || 'invalid access token')
  }
})

export { verifyJWT }
