import express from "express"
import {
  addPost,
  getAllPosts,
  getSelfPosts,
} from "../controllers/post.controller.js"
import { verifyJWT } from "../middlewares/auth-middleware.js"
import { ROLE } from "../types/roles.types.js"
import { checkRole } from "../middlewares/checkRole.middleware.js"

const router = express.Router()

router.route("/add-post").post(verifyJWT, addPost)

router
  .route("/get-all-posts")
  .get(verifyJWT, checkRole(ROLE.ADMIN), getAllPosts)

router.route("/get-self-posts").get(verifyJWT, getSelfPosts)

export default router
