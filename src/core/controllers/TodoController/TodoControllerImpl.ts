import { IApiClient, ApiClient } from "../../ApiClient"
import { TodoController } from "./TodoController"
import {
  TodosStore,
  todosStore as defaultTodosStore,
} from "../../store/TodoStore/TodoStore"
import { ITodo } from "@/core/models"

export class TodoControllerImpl implements TodoController {
  private nextTag: string | undefined = undefined

  constructor(
    private apiClient: IApiClient,
    private todosStore: TodosStore = defaultTodosStore
  ) {}

  async fetchTodos(pageSize: number = 30) {
    try {
      const response = await this.apiClient.get<{
        todos: ITodo[]
        tag: string
      }>("/todos", {
        params: {},
      })
      response.data.todos.forEach((todo) => this.todosStore.updateTodo(todo))
      this.nextTag = response.data.tag
    } catch (error) {
      console.error("Error fetching todos:", error)
    }
  }
  async loadMoreTodos(pageSize: number = 30) {
    if (!this.nextTag) return
    try {
      console.log("todo пагинация")
      const response = await this.apiClient.get<{
        todos: ITodo[]
        tag: string
      }>("/todos", {
        params: { pageSize, tag: this.nextTag },
      })
      this.todosStore.loadMoreTodos(response.data.todos)
      this.nextTag = response.data.tag
    } catch (error) {
      console.error("Error loading more todos:", error)
    }
  }

  async addTodo(title: string) {
    try {
      if (title.trim() !== "") {
        const response = await this.apiClient.post<ITodo[]>("/todos", { title })
        const newTodos: ITodo[] = response.data
        this.todosStore.addTodos(newTodos)
      }
    } catch (error) {
      console.error("Error adding todo:", error)
    }
  }

  async removeTodo(id: string) {
    try {
      await this.apiClient.delete(`/todos?id=${id}`)
      this.todosStore.removeTodo(id)
    } catch (error) {
      console.error("Error removing todo:", error)
    }
  }

  async completeTodo(id: string) {
    try {
      await this.apiClient.patch(`/todos?id=${id}`)
      this.todosStore.completeTodo(id)
    } catch (error) {
      console.error("Error completing todo:", error)
    }
  }
}

const apiClient = new ApiClient({ baseUrl: "http://localhost", port: 5000 })
export const todoController = new TodoControllerImpl(apiClient)
