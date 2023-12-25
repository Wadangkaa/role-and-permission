import express from "express"
import {
  getAllUsers,
  getAuthUserDetails,
  registerUser,
} from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth-middleware.js"
import { checkRole } from "../middlewares/checkRole.middleware.js"
import { ROLE } from "../types/roles.types.js"

const router = express.Router()

// private routes
router.route("/get-all-user").get(verifyJWT, checkRole(ROLE.ADMIN), getAllUsers)
router.route("/register").post(verifyJWT, registerUser)
router.route("/get-details").get(verifyJWT, getAuthUserDetails)

export default router
