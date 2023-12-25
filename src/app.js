import express from "express"
import userRouter from "./routes/user.routes.js"
import postRouter from "./routes/post.routes.js"
import authenticationRouter from "./routes/authentication.routes.js"
import { errorFormate } from "./utils/standard-error.js"

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World! how are you?")
})

app.use("/api/v1/auth", authenticationRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/posts", postRouter)

app.use(errorFormate())

export default app
