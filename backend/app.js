const express = require("express")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const http = require("http")
const { Server } = require("socket.io")

const app = express()

app.use(cookieParser())

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))

app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
)

app.use("/api/todos", require("./routes/todos.routes"))
app.use("/api/conferences", require("./routes/conferences.routes"))
app.use("/api/auth", require("./routes/auth.routes"))
app.use("/", require("./routes/main.routes"))

const PORT = 5000
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
})

const setupWebSocketServer = require("./routes/wsRoutes")
setupWebSocketServer(io)
app.set("io", io)

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
