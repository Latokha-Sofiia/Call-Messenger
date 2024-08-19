import { io, Socket } from "socket.io-client"

const WEBSOCKET_EDIT_TODO = "edit-todo"

class WebsocketController {
  private socket: Socket

  constructor() {
    this.socket = io("http://localhost:5000", {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })
  }

  handleEditTodo(fn: (...args: any[]) => void): void {
    this.socket.on(WEBSOCKET_EDIT_TODO, fn)
  }

  unsubscribeEditTodo(fn: (...args: any[]) => void): void {
    this.socket.off(WEBSOCKET_EDIT_TODO, fn)
  }
}

export const websocketController = new WebsocketController()
