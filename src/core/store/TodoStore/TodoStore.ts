import { makeAutoObservable } from "mobx"
import { notificationController } from "../../controllers/NotificationController/NotificationController"
import { CatType } from "../NotificationStore/NotificationStore"

export interface Todo {
  id: string
  title: string
  completed: boolean
}

export interface TodosStore {
  todos: Todo[]
  addTodos(todos: Todo[]): void
  loadMoreTodos(todos: Todo[]): void
  updateTodo(updatedTodo: Todo): void
  removeTodo(id: string): void
  completeTodo(id: string): void
  cleanTodos(): void
}

export class TodosStoreImpl implements TodosStore {
  todos: Todo[] = []

  constructor() {
    makeAutoObservable(this)
  }

  addTodos(todos: Todo[]) {
    const existingIds = this.todos.map((todo) => todo.id)
    const newTodos = todos.filter((todo) => !existingIds.includes(todo.id))
    this.todos = [...this.todos, ...newTodos]
    notificationController.showNotification("Добавлено новое TODO:", CatType.happy, todos[0].title)
  }

  loadMoreTodos(todos: Todo[]) {
    const existingIds = this.todos.map((todo) => todo.id)
    const newTodos = todos.filter((todo) => !existingIds.includes(todo.id))
    this.todos = [...this.todos, ...newTodos]
  }

  updateTodo(updatedTodo: Todo) {
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
    notificationController.showNotification("Todo нас покинуло...", CatType.sad, "")
  }

  completeTodo(id: string) {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  }

  cleanTodos() {
    this.todos = []
  }
}

export const todosStore = new TodosStoreImpl()
