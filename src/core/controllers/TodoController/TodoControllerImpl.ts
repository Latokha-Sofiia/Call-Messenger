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
        withCredentials: true,
        params: {},
      })
      const newTodos: ITodo[] = response.data.todos
      this.todosStore.loadMoreTodos(newTodos)

      // response.data.todos.forEach((todo) => this.todosStore.updateTodo(todo))
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
        withCredentials: true,
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
          },
          { withCredentials: true }
        )
        const newTodos: ITodo[] = response.data
        this.todosStore.addTodos(newTodos)
      }
    } catch (error) {
      console.error("Error adding todo:", error)
    }
  }

  async removeTodo(_id: string) {
    try {
      await this.apiClient.delete(`/api/todos?id=${_id}`, {
        withCredentials: true,
      })
      this.todosStore.removeTodo(_id)
    } catch (error) {
      console.error("Error removing todo:", error)
    }
  }

  async completeTodo(_id: string) {
    try {
      await this.apiClient.patch(
        `/api/todos?id=${_id}`,
        {},
        { withCredentials: true }
      )
      this.todosStore.completeTodo(_id)
    } catch (error) {
      console.error("Error completing todo:", error)
    }
  }

  async updateTodo(_id: string, newTitle: string, name: string) {
    try {
      if (newTitle.trim() !== "") {
        await this.apiClient.patch<ITodo>(
          `/api/todos/edit?id=${_id}`,
          { title: newTitle },
          { withCredentials: true }
        )
        this.todosStore.editTodo(_id, newTitle, name)
      }
    } catch (error) {
      console.error("Error adding todo:", error)
    }
  }

  updateTodoInStore(newTodo: ITodoWithName): void {
    this.todosStore.editTodo(newTodo._id, newTodo.title, newTodo.name)
  }
}

const apiClient = new ApiClient({ baseUrl: "http://localhost", port: 5000 })
export const todoController = new TodoControllerImpl(apiClient)
