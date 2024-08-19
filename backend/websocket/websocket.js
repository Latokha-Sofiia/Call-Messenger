const jwt = require("jsonwebtoken")
const User = require("../models/User")
const Conversation = require("../models/Conversation")
const config = require("config")

const createWebsocket = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  })

  io.on("connection", (socket) => {
    socket.on("i logged", async () => {
      const senderId = jwt.verify(
        socket.handshake.auth.token,
        config.get("jwtSecret")
      )
      await User.findOneAndUpdate(
        { _id: senderId.userId },
        { $set: { socketId: socket.id } },
        { useFindAndModify: false }
      )
    })

    socket.on("find user", async (msg) => {
      const fromId = jwt.verify(
        socket.handshake.auth.token,
        config.get("jwtSecret")
      ).userId
      const fromUser = await User.findById({ _id: fromId })
      let users = await User.find()

      let filteredArr = users.filter((user) => {
        return user.email.includes(msg)
      })

      const senderId = jwt.verify(
        socket.handshake.auth.token,
        config.get("jwtSecret")
      )

      const senderInUsers = filteredArr.findIndex(
        (item) => item.id === senderId.userId
      )
      if (senderInUsers > -1) {
        filteredArr = [
          ...filteredArr.slice(0, senderInUsers),
          ...filteredArr.slice(senderInUsers + 1, filteredArr.lenght),
        ]
      }
      const response = {
        payload: [],
      }

      if (filteredArr) {
        filteredArr.map((user) => {
          response.payload.push({
            id: user.id,
            name: user.name,
            email: user.email,
          })
        })
      }
      io.to(fromUser.socketId).emit("find user", JSON.stringify(response))
    })

    socket.on("get conversation", async () => {
      const fromId = jwt.verify(
        socket.handshake.auth.token,
        config.get("jwtSecret")
      ).userId
      const fromUser = await User.findById({ _id: fromId })
      if (fromUser.conversationList) {
        fromUser.populated("conversationList")
        await fromUser.populate("conversationList").execPopulate()

        const jsonArr = []

        let promises = []
        for (let item of fromUser.conversationList) {
          if (JSON.stringify(item.members[0]._id) === JSON.stringify(fromId)) {
            promises.push(
              new Promise(async (resolve, reject) => {
                await User.findById(
                  { _id: item.members[1]._id },
                  (err, doc) => {
                    jsonArr.push({
                      id: doc._id,
                      name: doc.name,
                      email: doc.email,
                      lastMessage: item.lastMessage,
                    })
                    resolve()
                  }
                )
              })
            )
          } else {
            promises.push(
              new Promise(async (resolve, reject) => {
                await User.findById(
                  { _id: item.members[0]._id },
                  (err, doc) => {
                    jsonArr.push({
                      id: doc._id,
                      name: doc.name,
                      email: doc.email,
                      lastMessage: item.lastMessage,
                    })
                    resolve()
                  }
                )
              })
            )
          }
        }

        await Promise.all(promises).then(() => {
          io.to(fromUser.socketId).emit(
            "get conversation",
            JSON.stringify(jsonArr)
          )
        })
      }
    })

    socket.on("disconnect", async () => {
      if (socket.handshake.auth.token) {
        const senderId = jwt.verify(
          socket.handshake.auth.token,
          config.get("jwtSecret")
        )
        await User.findOneAndUpdate(
          { _id: senderId.userId },
          { $set: { socketId: null } },
          { useFindAndModify: false }
        )
      }
    })
  })
}

module.exports = createWebsocket
