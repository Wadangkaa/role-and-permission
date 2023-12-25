import express from 'express'
import cors from 'cors'
import {
    firstMiddleware,
    secondMiddleware,
} from './middlewares/auth.middleware.js'
const { PORT } = process.env

const app = express()

app.use(express.json())
app.use(cors())

app.route('/').get(firstMiddleware, secondMiddleware)

export default app
