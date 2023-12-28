import express from 'express'
import {
  addPost,
  getAllPosts,
  getSelfPosts,
} from '../controllers/post.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { ROLE } from '../enums/role.js'
import { checkRole } from '../middlewares/role.middleware.js'
import { PERMISSION } from '../enums/permission.js'
import { checkPermissions } from '../middlewares/permission.middleware.js'

const router = express.Router()

router.get(
  '/',
  verifyJWT,
  checkPermissions(PERMISSION.READ_POST, PERMISSION.EDIT_POST),
  async (req, res) => {
    return res.json({ message: 'you are here dude' })
  }
)
router.route('/add-post').post(verifyJWT, addPost)

router.route('/get-all-posts').get(verifyJWT, getAllPosts)

router.route('/get-self-posts').get(verifyJWT, getSelfPosts)

export default router
