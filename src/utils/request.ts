import axios from 'axios'

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
})

/* ================= 请求拦截 ================= */
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

/* ================= 响应拦截 ================= */
service.interceptors.response.use(
  (response) => {
    const res = response.data

    // 根据你后端格式改
    if (res.code !== 200) {
      console.error(res.message)
      return Promise.reject(res.message)
    }

    return res
  },
  (error) => {
    console.error('接口错误:', error)
    return Promise.reject(error)
  },
)

export default service
