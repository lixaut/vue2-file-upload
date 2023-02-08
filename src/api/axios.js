
import axios from 'axios'

// 创建请求实例
const request = axios.create({
  baseURL: 'http://127.0.0.1:8888',
  // 默认数据格式
  headers: { 'Content-Type': 'multipart/form-data' },
  // 特殊数据格式转换
  transformRequest: [(data, headers) => {
    if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      return new URLSearchParams(data)
    }
    return data
  }]
})

// 响应拦截器
request.interceptors.response.use(response => {
  return response.data
}, reason => {
  return Promise.reject(reason)
})

export default request