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
      driveUser: {
      },
      sessionId: ''
    },
    mutations: {
      registerSessionId (state, sessionId) {
        state.sessionId = sessionId
      },
      registerSessionDriveUser (state, driveUser) {
        state.driveUser = driveUser
      }
    },
    getters: {
      getSessionId: (state) => () => {
        return state.sessionId
      },
      getSessionDriveUser: (state) => () => {
        return state.driveUser
      }
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,
    plugins: [vuexLocal.plugin]
  })

  return Store
}
