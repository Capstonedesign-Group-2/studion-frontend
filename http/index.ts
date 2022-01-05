import axios, { AxiosRequestConfig } from "axios"
import cookie from 'react-cookies'

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

export default http
