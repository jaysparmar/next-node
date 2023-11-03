import axios from 'axios'

const api = axios.create()

api.interceptors.request.use(
  config => {
    config.url = `http://localhost:8000${config.url}`
    const token = localStorage.getItem('accessToken') // Replace 'YOUR_BEARER_TOKEN_HERE' with your actual token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default api
