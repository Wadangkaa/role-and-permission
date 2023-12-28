import { ApiResponse } from '../utils/ApiResponse.js'
import { User } from '../models/user.model.js'
import { asyncHandler } from '../utils/asynchandler.js'
import { ApiError } from '../utils/apiError.js'

export const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  const { username, password, roleId } = req.body

  // validation -not empty
  if ([username, password, roleId].some((field) => field?.trim() === '')) {
    throw new ApiError(400, 'all fields are required')
  }

  // check if user already exists: username, email
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    throw new ApiError(400, 'user already exists')
  }

  // create user object - create entry in db
  const user = await User.create({
    username: username.toLowerCase(),
    password,
    roleId,
  })

  // remove password and refresh token field from response
  const createdUser = await User.findById(user._id).select('-password')

  // check for user creation
  if (!createdUser) {
    throw new ApiError(500, 'something went wrong while creating user')
  }

  // return response
  res
    .status(201)
    .json(new ApiResponse(200, createdUser, 'user registered successfully'))
})

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find()

  return res
    .status(200)
    .json(new ApiResponse(200, users, 'users fetched successfully'))
})

export const getAuthUserDetails = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, 'users fetched successfully'))
})

export { getAllUsers }
