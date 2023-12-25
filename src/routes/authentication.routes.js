import express from "express"
import {
  loginUser,
  logoutUser,
} from "../controllers/authentication.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = express.Router()

// public routes
router.route("/login").post(loginUser)

// private routes
router.route("/logout").post(verifyJWT, logoutUser)

export default router
