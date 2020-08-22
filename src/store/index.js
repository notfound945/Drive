import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const vuexLocal = new VuexPersistence({
    storage: window.sessionStorage
  })
  const Store = new Vuex.Store({
    modules: {
      // example
    },

    state: {
      // Development server api
      host: 'https://www.lshyj1234.xyz:8443/drive',
      // 在线用户
      driveUser: {

      },
      // 会话id
      sessionId: '',
      fileList: {

      }
    },
    mutations: {
      registerSessionId (state, sessionId) {
        state.sessionId = sessionId
      },
      registerSessionDriveUser (state, driveUser) {
        state.driveUser = driveUser
      },
      registerFileList (state, fileList) {
        state.fileList = fileList
      }
    },
    getters: {
      getSessionId: (state) => () => {
        return state.sessionId
      },
      getSessionDriveUser: (state) => () => {
        return state.driveUser
      },
      getFileList: (state) => () => {
        return state.fileList
      },
      getHost: (state) => () => {
        return state.host
      }
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,
    plugins: [vuexLocal.plugin]
  })

  return Store
}
