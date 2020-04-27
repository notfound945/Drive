import request from 'src/axios/request'
import _ from 'lodash'
import { Notify } from 'quasar'

export function post (url, params) {
  return new Promise((resolve, reject) => {
    request.post(url, params).then(result => {
      if (_.isUndefined(result)) {
        Notify.create({
          position: 'top',
          color: 'green-4',
          textColor: 'white',
          message: '请求异常，请检查网络环境！'
        })
        resolve(result)
      } else {
        resolve(result.data)
      }
    }).catch(error => {
      if (_.isUndefined(error)) {
        Notify.create({
          position: 'top',
          color: 'red-4',
          textColor: 'white',
          message: '请求异常，请检查网络环境'
        })
      } else {
        Notify.create({
          position: 'top',
          color: 'red-4',
          textColor: 'white',
          message: error
        })
      }
      reject(error)
    })
  })
}
