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
      user: {
        uname: 'null',
        headImg: '',
        ugrade: 0
      }
    },
    mutations: {
      register (state, user) {
        state.user = user
      }
    },
    getters: {
      getUser: (state) => () => {
        return state.user
      }
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,
    plugins: [vuexLocal.plugin]
  })

  return Store
}
