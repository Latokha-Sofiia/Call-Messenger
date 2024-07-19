import { makeAutoObservable } from "mobx"
import { notificationController } from "../../controllers/NotificationController/NotificationController"
import { ITodo } from "@/core/models"
import { INotificationType } from "@/core/constants/Notifications/NotificationsTypes"

export interface TodosStore {
  todos: ITodo[]
  addTodos(todos: ITodo[]): void
  loadMoreTodos(todos: ITodo[]): void
  updateTodo(updatedTodo: ITodo): void
  removeTodo(id: string): void
  completeTodo(id: string): void
  cleanTodos(): void
}

export class TodosStoreImpl implements TodosStore {
  todos: ITodo[] = []

  constructor() {
    makeAutoObservable(this)
  }

  addTodos(todos: ITodo[]) {
    const existingIds = this.todos.map((todo) => todo.id)
    const newTodos = todos.filter((todo) => !existingIds.includes(todo.id))
    this.todos = [...newTodos, ...this.todos]
    notificationController.showNotification(
      "Добавлено новое TODO:",
      INotificationType.Added,
      todos[0].title,
      () => {}
    )
  }

  loadMoreTodos(todos: ITodo[]) {
    const existingIds = this.todos.map((todo) => todo.id)
    const newTodos = todos.filter((todo) => !existingIds.includes(todo.id))
    this.todos = [...this.todos, ...newTodos]
  }

  updateTodo(updatedTodo: ITodo) {
    const todoIndex = this.todos.findIndex((todo) => todo.id === updatedTodo.id)
    if (todoIndex !== -1) {
      this.todos[todoIndex] = updatedTodo
    } else if (updatedTodo.title.trim() !== "") {
      this.todos = [...this.todos, updatedTodo]
    }

    this.todos = this.todos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    )
  }

  removeTodo(id: string) {
    this.todos = this.todos.filter((todo) => todo.id !== id)
    notificationController.showNotification(
      "Todo нас покинуло...",
      INotificationType.Removed,
      "",
      () => {}
    )
  }

  completeTodo(id: string) {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )

    const todoItem = this.todos.find((todo) => todo.id === id)

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

  cleanTodos() {
    this.todos = []
  }
}

export const todosStore = new TodosStoreImpl()
