import axios, { AxiosRequestConfig } from "axios"
import cookie from 'react-cookies'
import { Modal, Toast } from "../components/common/modals";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACK_URL,
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
    if (error.response.status === 401) {
      cookie.remove('accessToken')
      Modal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      })
    }
    Promise.reject(error)
  }
)

export default http
