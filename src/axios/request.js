import axios from 'axios'
import qs from 'qs'

if (process.env.NODE_ENV === 'development') {
  // axios.defaults.baseURL = 'https://www.lshyj1234.xyz/drive'
} else if (process.env.NODE_ENV === 'debug') {
  // axios.defaults.baseURL = 'https://www.lshyj1234.xyz/drive'
} else if (process.env.NODE_ENV === 'production') {
  // axios.defaults.baseURL = 'https://www.lshyj1234.xyz/drive'
}
const service = axios.create({
  timeout: 5000
})

service.interceptors.request.use(config => {
  config.headers = Object.assign(config.method === 'get' ? {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8'
  } : {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Headers': 'x-requested-with,content-type'
  }, config.headers)

  if (config.method === 'post') {
    const contentType = config.headers['Content-Type']
    // 根据Content-Type转换data格式
    if (contentType) {
      if (contentType.includes('multipart')) { // 类型 'multipart/form-data;'
        // config.data = data;
      } else if (contentType.includes('json')) { // 类型 'application/json;'
        // 服务器收到的raw body(原始数据) "{name:"nowThen",age:"18"}"（普通字符串）
        config.data = JSON.stringify(config.data)
      } else { // 类型 'application/x-www-form-urlencoded;'
        // 服务器收到的raw body(原始数据) name=nowThen&age=18
        config.data = qs.stringify(config.data)
      }
    }
  }
  return Promise.resolve(config)
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    return Promise.reject(error.response)
  }
)

export default service
