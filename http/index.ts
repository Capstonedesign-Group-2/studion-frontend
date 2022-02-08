import axios, { AxiosRequestConfig } from "axios"
import cookie from 'react-cookies'

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACK_URL || 'http://localhost:8000/api',
  headers: { "content-type": "application/json" },
})

http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const isAccessToken = cookie.load('accessToken');
    if (isAccessToken) {
      config.headers = {
        Authorization: `Bearer ${isAccessToken}`
      };
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

http.interceptors.response.use(
  (config: AxiosRequestConfig) => {
    return config
  },
  error => {
    // if (error.response.status === 401) {
    //   Modal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: error.message,
    //   }).then(() => {
    //     cookie.remove('accessToken')
    //     window.location.replace('/login')
    //   })
    // } else if (error.response.status === 500) {
    //   Modal.fire({
    //     icon: 'error',
    //     title: 'Oops...',
    //     text: error.message,
    //   })
    // }
    console.error(error)
    // Promise.reject(error)
  }
)

export default http
