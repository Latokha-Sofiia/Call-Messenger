import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"

interface ApiClientConfig {
  baseUrl: string
  port?: number
  // authToken?: string
}

export interface IApiClient {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>
  post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>>
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>
  patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>>
}


export class ApiClient implements IApiClient {
  private axiosInstance: AxiosInstance
  constructor(config: ApiClientConfig) {
    const { baseUrl, port } = config
    this.axiosInstance = axios.create({
      baseURL: `${baseUrl}${port ? `:${port}` : ""}`,
    })
  }
  get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config)
  }

  post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config)
  }

  delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config)
  }

  patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.patch<T>(url, data, config)
  }
}
