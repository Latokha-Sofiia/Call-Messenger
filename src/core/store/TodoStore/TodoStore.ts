import { makeAutoObservable } from "mobx"
import { notificationController } from "../../controllers/NotificationController/NotificationController"
import { ITodo } from "@/core/models"
import { INotificationType } from "@/core/constants/Notifications/NotificationsTypes"
import { io, Socket } from "socket.io-client"

export interface TodosStore {
  todos: ITodo[]
  addTodos(todos: ITodo[]): void
  loadMoreTodos(todos: ITodo[]): void
  updateTodo(updatedTodo: ITodo): void
  removeTodo(id: string): void
  completeTodo(id: string): void
  cleanTodos(): void
  editTodo(id: string, newTitle: string, name: string): void
}

export class TodosStoreImpl implements TodosStore {
  todos: ITodo[] = []
  private socket: Socket

  constructor() {
    makeAutoObservable(this)

    this.socket = io("http://localhost:5000", {
      transports: ["websocket"],
      withCredentials: true,
    })

    this.socket.on("user-connected", (userId: string) => {
      this.socket.emit("join", userId)
    })

    this.socket.on("todo-created", (newTodo: ITodo) => {
      this.addTodos([newTodo])
    })

    this.socket.on("todo-deleted", (deletedTodo: ITodo) => {
      this.removeTodo(deletedTodo._id)
    })

    this.socket.on("todo-completed", (todo: ITodo) => {
      this.completeTodo(todo._id)
    })

    this.socket.on("edit-todo", (updatedTodo: ITodo) => {
      this.editTodo(updatedTodo._id, updatedTodo.title, "Name")
    })
  }

  addTodos(todos: ITodo[]) {
    const existingIds = this.todos.map((todo) => todo._id)
    console.log("existingIds", existingIds)

    const newTodos = todos.filter((todo) => !existingIds.includes(todo._id))
    this.todos = [...newTodos, ...this.todos]
    console.log("this.todos", this.todos)
    notificationController.showNotification(
      "Добавлено новое TODO:",
      INotificationType.Added,
      todos[0].title,
      () => {}
    )
  }

  loadMoreTodos(todos: ITodo[]) {
    const existingIds = this.todos.map((todo) => todo._id)
    const newTodos = todos.filter((todo) => !existingIds.includes(todo._id))
    this.todos = [...this.todos, ...newTodos]
  }

  updateTodo(updatedTodo: ITodo) {
    const todoIndex = this.todos.findIndex(
      (todo) => todo._id === updatedTodo._id
    )
    console.log("updatedTodo", updatedTodo)
    console.log("todoIndex", todoIndex)

    if (todoIndex !== -1) {
      this.todos[todoIndex] = updatedTodo
    } else if (updatedTodo.title.trim() !== "") {
      this.todos = [...this.todos, updatedTodo]
    }

    this.todos = this.todos.map((todo) =>
      todo._id === updatedTodo._id ? updatedTodo : todo
    )
  }

  removeTodo(id: string) {
    this.todos = this.todos.filter((todo) => todo._id !== id)
    notificationController.showNotification(
      "Todo нас покинуло...",
      INotificationType.Removed,
      "",
      () => {}
    )
  }

  completeTodo(id: string) {
    this.todos = this.todos.map((todo) =>
      todo._id === id ? { ...todo, completed: !todo.completed } : todo
    )

    const todoItem = this.todos.find((todo) => todo._id === id)

    if (todoItem.completed) {
      notificationController.showNotification(
        "Неужели ты наконец-то сделал это???",
        INotificationType.Completed,
        todoItem.title,
        () => {}
      )
    } else {
      notificationController.showNotification(
        "Куда делось Todo?",
        INotificationType.NotCompleted,
        "",
        () => {}
      )
    }
  }

  editTodo(id: string, newTitle: string, name: string) {
    this.todos = this.todos.map((todo) =>
      todo._id === id ? { ...todo, title: newTitle } : todo
    )

    const todoItem = this.todos.find((todo) => todo._id === id)
    notificationController.showNotification(
      "Todo изменено",
      INotificationType.Edited,
      `Пользователь ${name} изменил туду`,
      () => {}
    )
  }

  cleanTodos() {
    this.todos = []
  }
}
export const todosStore = new TodosStoreImpl()
