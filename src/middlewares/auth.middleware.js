import { User } from '../models/user.model.js'
import { ApiError } from '../utils/apiError.js'
import jwt from 'jsonwebtoken'
import { asyncHandler } from '../utils/asynchandler.js'
import mongoose from 'mongoose'

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
    // const user = await User.findById(decodedToken?._id).select(
    //   '-password -refreshToken'
    // )

    // fetching authorized user with its role and permissions
    const user = await getAuthenticatedUser(decodedToken)

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

const getAuthenticatedUser = async (decodedToken) => {
  const authUserAsArray = await User.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(decodedToken?._id) },
    },
    {
      $lookup: {
        from: 'roles',
        localField: 'roleId',
        foreignField: '_id',
        as: 'roles',
      },
    },
    {
      $lookup: {
        from: 'rolepermissions',
        localField: 'roleId',
        foreignField: 'roleId',
        as: 'permissions',
        pipeline: [
          {
            $lookup: {
              from: 'permissions',
              localField: 'permissionId',
              foreignField: '_id',
              as: 'permission',
            },
          },
          {
            $addFields: {
              permission: {
                $first: '$permission',
              },
            },
          },
        ],
      },
    },
    {
      $project: {
        _id: 1,
        username: 1,
        roles: {
          _id: 1,
          name: 1,
        },
        permissions: {
          $map: {
            input: '$permissions',
            as: 'permission',
            in: {
              _id: '$$permission.permission._id',
              name: '$$permission.permission.name',
            },
          },
        },
      },
    },
  ])

  return authUserAsArray[0]
}

export { verifyJWT }
