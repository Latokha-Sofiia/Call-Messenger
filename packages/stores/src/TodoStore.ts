import { makeAutoObservable } from "mobx"

export interface Todo {
  id: string
  title: string
  completed: boolean
}

export interface TodosStore {
  todos: Todo[]
  addTodos(todos: Todo[]): void
  updateTodo(updatedTodo: Todo): void
  // setTodos(todos: Todo[]): void
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
    this.todos = [...this.todos, ...todos]
  }

  updateTodo(updatedTodo: Todo) {
    this.todos = this.todos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    )
  }

  // setTodos(todos: Todo[]) {
  //   this.todos = todos
  // }

  removeTodo(id: string) {
    this.todos = this.todos.filter((todo) => todo.id !== id)
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
