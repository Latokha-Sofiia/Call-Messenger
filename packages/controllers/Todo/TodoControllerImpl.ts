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
      this.todosStore.setTodos(response.data)
    } catch (error) {
      console.error("Error fetching todos:", error)
    }
  }


  async addTodo(title: string) {
    try {
      const response = await this.apiClient.post<Todo[]>("/todos", { title })
      // Удалить log
      console.log(response)
      const todos: Todo[] = response.data
      this.todosStore.setTodos(todos)
    } catch (error) {
      console.error("Error adding todo:", error)
    }
  }

  async removeTodo(id: string) {
    try {
      await this.apiClient.delete(`/todos?id=${id}`)
      this.todosStore.removeTodo(id)

      const response = await this.apiClient.get<Todo[]>("/todos")
      // Удалить log
      console.log(response)
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
