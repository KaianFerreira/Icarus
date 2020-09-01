import axios from 'axios'
import router from '../router'
import { removeToken } from './token'

const api = axios.create({
  baseURL: process.env.VUE_APP_API
})

api.interceptors.response.use(undefined, error => {
  if (error.response.status === 401) {
    // Remove token
    removeToken()
    router.push('/')
  }
  return Promise.reject(error)
})

export default api
