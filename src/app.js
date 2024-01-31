import express from 'express'
import userRouter from './routes/user.routes.js'
import postRouter from './routes/post.routes.js'
import permissionRouter from './routes/permission.routes.js'
import roleRouter from './routes/role.routes.js'
import authenticationRouter from './routes/authentication.routes.js'
import { errorFormate } from './utils/standard-error.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
)

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static('public'))
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Hello World! how are you?')
})

app.use('/api/v1/auth', authenticationRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/posts', postRouter)
app.use('/api/v1/permissions', permissionRouter)
app.use('/api/v1/roles', roleRouter)

app.use(errorFormate())

export default app
