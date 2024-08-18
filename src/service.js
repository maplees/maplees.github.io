import axios from 'axios'

const service = axios.create({
// baserURL会自动加载接口地址
  // baseURL: 'https://demo.crudapi.cn/api/business',
  baseURL: '/api', // 为了解决跨域问题，将地址改为api
  // 限制请求时间
  timeout: 3000,

  headers: {
    'Content-type': 'application/json;charset=utf-8'
    // 有cookie时可以在这里写

  },
  // 使用http提供凭证解决没有cookie的问题
  auth: {
    username: 'superadmin',
    password: '1234567890'
  }
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})
// 添加响应拦截器
service.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

export default service
