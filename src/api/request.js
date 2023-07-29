import axios from 'axios'
import { ElMessage } from 'element-plus'
import { diffTokenTime } from '@/utils/auth'
import store from '@/store'

const service = axios.create({
  baseURL: 'http://127.0.0.1:8080',
  timeout: 4000,
  headers: {
    'Content-Type': 'application/json'
  },
  params: {}
})

service.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('ac_token')) {
      if (diffTokenTime()) {
        store.dispatch('app/logout')
        return Promise.reject(new Error('token 失效了'))
      }
    }
    config.headers.Authorization = localStorage.getItem('ac_token')
    return config
  },
  (error) => {
    return Promise.reject(new Error(error))
  }
)

service.interceptors.response.use(
  (response) => {
    const { code, data, msg } = response.data
    if (code === 200) {
      ElMessage({
        message: msg,
        type: 'success',
        duration: 2000
      })
      return data
    } else {
      ElMessage.error(msg)
      return Promise.reject(new Error(msg))
    }
  },
  (error) => {
    const { code, data, msg } = error.response.data
    ElMessage.error(msg)
    console.log(code, data)
    return Promise.reject(new Error(error.response.data))
  }
)

export default service
