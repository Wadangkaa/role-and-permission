import express from 'express'
import { createRole } from '../controllers/role.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = express.Router()

// router.route('/create-role').post(verifyJWT, createRole('admin'), createRole)

export default router
