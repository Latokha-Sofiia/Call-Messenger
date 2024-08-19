const express = require("express")
const path = require("path")
const http = require("http")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const { Server } = require("socket.io")

const app = express()

app.use(cookieParser())

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.json({ extended: true }))
app.use("/api/todos", require("./routes/todos.routes"))
app.use("/api/conferences", require("./routes/conferences.routes"))
app.use("/api/auth", require("./routes/auth.routes"))

const PORT = 5000

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*",
  },
})

const setupWebSocketServer = require("./routes/wsRoutes")
setupWebSocketServer(io)

app.set("io", io)

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
