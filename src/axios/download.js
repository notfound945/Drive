import axios from 'axios'
import qs from 'qs'
import { Notify } from 'quasar'
import _ from 'lodash'

const cancelToken = axios.CancelToken

const service = axios.create({
  timeout: 0,
  withCredentials: true
})

service.interceptors.request.use(config => {
  config.headers = Object.assign(config.method === 'get' ? {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8'
  } : {
    // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Content-Type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Headers': 'x-requested-with,content-type'
  }, config.headers)

  if (config.method === 'post') {
    const contentType = config.headers['Content-Type']
    // 根据Content-Type转换data格式
    if (contentType) {
      if (contentType.includes('multipart')) { // 类型 'multipart/form-data;'
        // config.data = data
        // config.data = qs.stringify(config.data)
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
    // console.log('response result', response)
    if (response.status === 200) {
      return Promise.resolve(response.data)
    } else {
      // console.log('not 200')
      Notify.create({
        position: 'top',
        color: 'red-6',
        textColor: 'white',
        message: 'Error Code : ' + response.status
      })
      return Promise.reject(response)
    }
  },
  error => {
    // console.log('response error')
    if (!_.isUndefined(error.response)) {
      Notify.create({
        position: 'top',
        color: 'red-6',
        textColor: 'white',
        icon: 'cancel',
        message: 'Error Code : ' + error.response.status
      })
    } else {
      Notify.create({
        position: 'top',
        color: 'red-6',
        textColor: 'white',
        icon: 'block',
        message: 'Download file process broken.'
      })
    }
    return Promise.reject(error)
  }
)

export default {
  service,
  cancelToken
}
