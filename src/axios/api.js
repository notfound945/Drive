import request from 'src/axios/request'

export function post (url, params) {
  return new Promise((resolve, reject) => {
    request.post(url, params).then(result => {
      console.log('api.js then', result)
      resolve(result)
    }).catch(error => {
      console.log('api.js catch', error)
      reject(error)
    })
  })
}
