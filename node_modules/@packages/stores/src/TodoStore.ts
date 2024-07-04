import { makeAutoObservable } from "mobx"

export interface Todo {
  id: string
  title: string
  completed: boolean
}

export interface TodosStore {
  todos: Todo[]
  setTodos(todos: Todo[]): void
  removeTodo(id: string): void
  completeTodo(id: string): void
}

class TodosStoreImpl implements TodosStore {
  todos: Todo[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setTodos(todos: Todo[]) {
    this.todos = todos
  }

  removeTodo(id: string) {
    this.todos = this.todos.filter((todo) => todo.id !== id)
  }

  completeTodo(id: string) {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  }
}

export const todosStore = new TodosStoreImpl()
