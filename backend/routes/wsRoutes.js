function setupWebSocketServer(io) {
  io.on("connection", (socket) => {
    // Получение сообщения от клиента
    socket.on("chat message", (msg) => {
      console.log(`Received message: ${msg}`)
    })

    socket.on("join", function (userId) {
      console.log("join", userId)
      socket.join(userId)
    })

    socket.on("disconnect", () => {
      console.log("WebSocket connection closed")
    })
  })
}

module.exports = setupWebSocketServer
