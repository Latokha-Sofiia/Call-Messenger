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
    }>("/api/auth/personal-data", {
      withCredentials: true,
    })

    console.log("response", response)
    return response.data
  }

  async logout() {
    await this.apiClient.patch<IAuthResponseLogin>("/api/auth/logout", {
      withCredentials: true,
    })
  }

  async loginHandler(
    login: string,
    password: string
  ): Promise<IAuthResponseLogin | false> {
    try {
      const response = await this.apiClient.post<IAuthResponseLogin>(
        "/api/auth/login",
        {
          login,
          password,
        },
        {
          withCredentials: true,
        }
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
    password: string
  ): Promise<IAuthResponseRegister> {
    try {
      const response = await this.apiClient.post<IAuthResponseRegister>(
        "/api/auth/register",
        {
          name,
          login,
          password,
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
