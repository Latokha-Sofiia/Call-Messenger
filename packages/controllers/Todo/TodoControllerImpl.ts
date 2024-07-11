import { IApiClient, ApiClient } from "@packages/api-client/src/ApiClient"
import { TodoController } from "./TodoController"
import {
  Todo,
  TodosStore,
  todosStore as defaultTodosStore,
} from "@packages/stores/src/TodoStore"

export class TodoControllerImpl implements TodoController {
  private nextTag: string | undefined = undefined;

  constructor(
    private apiClient: IApiClient,
    private todosStore: TodosStore = defaultTodosStore
  ) {}

  async fetchTodos(pageSize: number = 30) {
    try {
      const response = await this.apiClient.get<{ todos: Todo[], tag: string }>("/todos", {
        params: { pageSize }
      })
      this.todosStore.cleanTodos()
      this.todosStore.addTodos(response.data.todos)
      this.nextTag = response.data.tag
    } catch (error) {
      console.error("Error fetching todos:", error)
    }
  }
  async loadMoreTodos(pageSize: number = 30) {
    if (!this.nextTag) return;
    try {
      console.log('efgdsbfdcb');
      const response = await this.apiClient.get<{ todos: Todo[], tag: string }>("/todos", {
        params: { pageSize, tag: this.nextTag }
      })
      this.todosStore.addTodos(response.data.todos)
      this.nextTag = response.data.tag
    } catch (error) {
      console.error("Error loading more todos:", error)
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
