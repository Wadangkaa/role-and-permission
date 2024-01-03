# Role and permissions in express js

global code to implement role and permissions in express app

## About this

This project gives endpoints for creating roles, provides you middlewares that can be used in every project that needs to implement role and permissions

## Features

- role checking middlewares
- permissions checking middlewares
- authorization checking middlewares
- login and logout controllers
- roles creation controllers

## Before using

- replace getAuthenticatedUser's query in auth middleware with your query to get authenticated user
- only use role and permission middlewares after authorizated user

## usage

```
import express from 'express'
import { createRole } from '../controllers/role.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.route('/create-role').post(verifyJWT, createRole('admin'), createRole)

export default router
```
