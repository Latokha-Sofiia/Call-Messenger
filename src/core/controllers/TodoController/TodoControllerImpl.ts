import { IApiClient, ApiClient } from "../../ApiClient"
import { TodoController } from "./TodoController"
import {
  TodosStore,
  todosStore as defaultTodosStore,
} from "../../store/TodoStore/TodoStore"
import { ITodo, ITodoWithName } from "@/core/models"
import { UserContext } from "@/core/context/UserContext"
import { useContext } from "react"

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
        // }>("./todos.routes", {
      }>("/api/todos", {
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
      const response = await this.apiClient.get<{
        todos: ITodo[]
        tag: string
      }>("/api/todos", {
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
        const response = await this.apiClient.post<ITodo[]>(
          "/api/todos/create",
          {
            title,
          }
        )
        const newTodos: ITodo[] = response.data
        this.todosStore.addTodos(newTodos)
      }
    } catch (error) {
      console.error("Error adding todo:", error)
    }
  }

  async removeTodo(id: string) {
    try {
      await this.apiClient.delete(`/api/todos?id=${id}`)
      this.todosStore.removeTodo(id)
    } catch (error) {
      console.error("Error removing todo:", error)
    }
  }

  async completeTodo(id: string) {
    try {
      await this.apiClient.patch(`/api/todos?id=${id}`)
      this.todosStore.completeTodo(id)
    } catch (error) {
      console.error("Error completing todo:", error)
    }
  }

  async updateTodo(id: string, newTitle: string, name: string) {
    try {
      if (newTitle.trim() !== "") {
        await this.apiClient.patch<ITodo>(
          `/api/todos/edit?id=${id}&title=${newTitle}&name=${name}`
        )
        this.todosStore.editTodo(id, newTitle, name)
      }
    } catch (error) {
      console.error("Error adding todo:", error)
    }
  }

  updateTodoInStore(newTodo: ITodoWithName): void {
    this.todosStore.editTodo(newTodo.id, newTodo.title, newTodo.name)
  }
}

const apiClient = new ApiClient({ baseUrl: "http://localhost", port: 5000 })
export const todoController = new TodoControllerImpl(apiClient)
