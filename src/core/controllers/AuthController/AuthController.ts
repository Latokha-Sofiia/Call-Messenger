import { ApiClient, IApiClient } from "@/core/ApiClient"
import {
  IAuthResponseLogin,
  IAuthResponseRegister,
  ICheckAuthResponse,
} from "@/core/models"
import * as M from "materialize-css"
import { TodoControllerImpl } from "@/core/controllers/TodoController/TodoControllerImpl"

class AuthController {
  constructor(private apiClient: IApiClient) {}

  async checkAuth() {
    const response = await this.apiClient.get<ICheckAuthResponse>(
      "/api/auth/check-auth",
      {
        withCredentials: true,
      }
    )
    return response
  }

  async getPersonalData() {
    const response = await this.apiClient.get<{
      name: string
      login: string
      password: string
      surname: string
      photo_url: string
    }>("/api/auth/personal-data", {
      withCredentials: true,
    })

    return response.data
    return
  }

  async updatePersonalData(data: {
    name: string
    surname: string
    login: string
    password: string
    photo_url: string
  }) {
    try {
      const response = await this.apiClient.put(
        "/api/auth/update-personal-data",
        data,
        {
          withCredentials: true,
        }
      )
      return response.data
    } catch (e) {
      this.showNotification("Ошибка при обновлении данных")
      return null
    }
  }

  async logout() {
    try {
      const response = await this.apiClient.get("/api/auth/logout", {
        withCredentials: true,
      })
      if (response.status === 200) {
        this.showNotification("Вы успешно вышли из системы")
        window.location.href = "/login"
      } else {
        throw new Error("Ошибка при выходе из системы")
      }
    } catch (error) {
      this.showNotification("Ошибка при выходе из системы")
    }
  }

  async loginHandler(
    login: string,
    password: string
  ): Promise<IAuthResponseLogin | false> {
    try {
      const response = await this.apiClient.post<IAuthResponseLogin>(
        "/api/auth/login",
        { login, password },
        { withCredentials: true }
      )
      this.showNotification(`Выполнен вход под логином ${login}`)
      return response.data
    } catch (e) {
      this.showNotification(e.response.data.message)
      return false
    }
  }

  async registerHandler(
    name: string,
    login: string,
    password: string,
    surname: string,
    photo_url: string
  ): Promise<IAuthResponseRegister> {
    try {
      const response = await this.apiClient.post<IAuthResponseRegister>(
        "/api/auth/register",
        {
          name: name,
          login: login,
          password: password,
          surname: surname,
          photo_url: photo_url,
        }
      )

      this.showNotification("Регистрация прошла успешно")

      return response.data
    } catch (e) {
      this.showNotification(e.response.data.message)
    }
  }

  private showNotification(text: string): void {
    if (M && text) {
      M.toast({ html: text })
    }
  }
}

const apiClient = new ApiClient({ baseUrl: "http://localhost", port: 5000 })
export const authController = new AuthController(apiClient)
