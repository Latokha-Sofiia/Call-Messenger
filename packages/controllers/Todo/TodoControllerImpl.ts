import { IApiClient, ApiClient } from "@packages/api-client/src/ApiClient"
import { TodoController } from "./TodoController"
import {
  Todo,
  TodosStore,
  todosStore as defaultTodosStore,
} from "@packages/stores/src/TodoStore"

export class TodoControllerImpl implements TodoController {
  constructor(
    private apiClient: IApiClient,
    private todosStore: TodosStore = defaultTodosStore
  ) {}

  async fetchTodos() {
    try {
      const response = await this.apiClient.get<Todo[]>("/todos")
      this.todosStore.cleanTodos()
      this.todosStore.addTodos(response.data)
    } catch (error) {
      console.error("Error fetching todos:", error)
    }
  }

  async addTodo(title: string) {
    try {
      const response = await this.apiClient.post<Todo[]>("/todos", { title })
      const newTodos: Todo[] = response.data
      this.todosStore.addTodos(newTodos)
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
