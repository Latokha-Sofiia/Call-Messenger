const express = require("express")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const http = require("http")
const { Server } = require("socket.io")
const mongoose = require("mongoose")
const setupWebSocketServer = require("./routes/wsRoutes")
const MongoStore = require("connect-mongo")
const sharedSession = require("express-socket.io-session")

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

const sessionMiddleware = session({
  secret: "your-secret-key",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl:
      "mongodb+srv://sofiianeroda:Qwerty123@cluster0.u56fu.mongodb.net/call-messenger?retryWrites=true&w=majority&appName=Cluster0",
    ttl: 14 * 24 * 60 * 60,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 14,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  },
})

app.use(sessionMiddleware)

app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/todos", require("./routes/todos.routes"))
app.use("/api/conferences", require("./routes/conferences.routes"))
app.use("/", require("./routes/main.routes"))

async function start() {
  const uri =
    "mongodb+srv://sofiianeroda:Qwerty123@cluster0.u56fu.mongodb.net/call-messenger?retryWrites=true&w=majority&appName=Cluster0"

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  const PORT = 5000
  const server = http.createServer(app)
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  })

  io.use(
    sharedSession(sessionMiddleware, {
      autoSave: true,
    })
  )

  const setupWebSocketServer = require("./routes/wsRoutes")
  setupWebSocketServer(io)
  app.set("io", io)

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

start()
