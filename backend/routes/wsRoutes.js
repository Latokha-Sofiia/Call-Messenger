function setupWebSocketServer(io) {
  io.on("connection", async (socket) => {
    const userId = socket.handshake.session.userId

    socket.emit("user-connected", userId)
    console.log("user connected WebSocket, userId:", userId)

    // Получение сообщения от клиента
    socket.on("chat message", (msg) => {
      console.log(`Received message: ${msg}`)
    })

    socket.on("join", function (userId) {
      console.log("User joined with ID:", userId)
      socket.join(userId)
    })

    socket.on("disconnect", () => {
      console.log("WebSocket connection closed")
    })
  })
}

module.exports = setupWebSocketServer
