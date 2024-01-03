import express from 'express'
import { createRole } from '../controllers/role.controller.js'

const router = express.Router()

router.route('/create-role').post(createRole)

export default router
