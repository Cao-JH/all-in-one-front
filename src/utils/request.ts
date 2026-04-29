import axios, { AxiosError, type AxiosRequestConfig, type InternalAxiosRequestConfig } from 'axios'

interface ApiResponse<T = unknown> {
  code?: number | string
  data?: T
  message?: string
  msg?: string
  [key: string]: unknown
}

const TOKEN_KEY = 'token'
const SUCCESS_CODES = [0, 200]

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/',
  timeout: 10000,
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(TOKEN_KEY)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

service.interceptors.response.use(
  (response) => {
    const res = response.data

    if (!isApiResponse(res)) {
      return res
    }

    if (res.code === undefined || SUCCESS_CODES.includes(Number(res.code))) {
      return res
    }

    return Promise.reject(new Error(getResponseMessage(res)))
  },
  (error: AxiosError<ApiResponse>) => {
    console.error('API error:', getErrorMessage(error))
    return Promise.reject(error)
  },
)

function isApiResponse(value: unknown): value is ApiResponse {
  return typeof value === 'object' && value !== null
}

function getResponseMessage(response: ApiResponse) {
  return response.message || response.msg || 'Request failed'
}

function getErrorMessage(error: AxiosError<ApiResponse>) {
  if (error.response?.data) {
    return getResponseMessage(error.response.data)
  }

  if (error.code === 'ECONNABORTED') {
    return 'Request timeout'
  }

  return error.message || 'Network error'
}

function request<T = unknown>(config: AxiosRequestConfig) {
  return service.request<unknown, ApiResponse<T>>(config)
}

export { service }
export type { ApiResponse }
export default request
