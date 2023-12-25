import express from 'express'
import cors from 'cors'
const { PORT } = process.env

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', function (req, res) {
    res.send('hello world')
})

export default app
