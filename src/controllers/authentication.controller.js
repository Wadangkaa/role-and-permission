import { ApiError } from '../utils/apiError.js'
import { User } from '../models/user.model.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asynchandler.js'
import { cookieOptions } from '../utils/cookieoptions.js'
import mongoose from 'mongoose'

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body

  // check if email, password is empty
  if (!username) {
    throw new ApiError(400, 'username is required')
  }

  // fetching user
  const user = await User.findOne({ username })

  // check if user exists
  if (!user) {
    throw new ApiError(404, 'user not found')
  }

  // validating user password
  const isPasswordValid = await user.isPasswordCorrect(password)
  if (!isPasswordValid) {
    throw new ApiError(401, 'invalid credentials')
  }

  // generating tokens
  const accessToken = user.generateAccessToken()
  console.log('id', user._id)

  // remove password and refreshToken from user to send response
  const loggedInUser = await User.aggregate([
    {
      $match: { _id: user._id },
    },
    {
      $lookup: {
        from: 'roles',
        localField: 'roleIds',
        foreignField: '_id',
        as: 'roles',
      },
    },
    {
      $project: {
        _id: 0,
        id: '$_id',
        username: '$username',
        roles: {
          $map: {
            input: '$roles',
            as: 'role',
            in: '$$role.name',
          },
        },
      },
    },
  ])

  // sending response
  return res
    .status(200)
    .cookie('accessToken', accessToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          loggedInUser: loggedInUser[0],
          accessToken,
        },
        'User created successfully'
      )
    )
})

const logoutUser = asyncHandler(async (req, res) => {
  // sending response
  return res
    .status(200)
    .clearCookie('accessToken', cookieOptions)
    .json(new ApiResponse(200, {}, 'user logged out'))
})

export { loginUser, logoutUser }
