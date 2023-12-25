import { Response } from 'express'
import { RequestWithUser } from '../interfaces/requestWithUser.interface.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { Post } from '../models/post.model.js'

export const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
  return res.status(200).json(new ApiResponse(200, posts, 'all posts'))
})

export const getSelfPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ postedBy: req.user._id })
  return res.status(200).json(new ApiResponse(200, posts, 'self posts'))
})

export const addPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body
  const post = await Post.create({
    title,
    content,
    postedBy: req.user._id,
  })
  return res.status(201).json(new ApiResponse(201, post, 'post added'))
})
