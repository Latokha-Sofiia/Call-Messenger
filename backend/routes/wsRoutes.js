function setupWebSocketServer(io) {
  io.on("connection", (socket) => {
    console.log("New WebSocket connection established")

    // Получение сообщения от клиента
    socket.on("chat message", (msg) => {
      console.log(`Received message: ${msg}`)
    })

    // Обработка отключения клиента
    socket.on("disconnect", () => {
      console.log("WebSocket connection closed")
    })
  })
}

module.exports = setupWebSocketServer
