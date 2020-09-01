import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, removeToken } from '../libs/token'
import router from '../router'

Vue.use(Vuex)

// const startTime = new Date()

export default new Vuex.Store({
  state: {
    loaded: false,
    user: null
  },
  mutations: {
    loaded (state, data) { state.loaded = data },
    user (state, data) { state.user = data }
  },
  actions: {
    loaded (store) {
      // const diff = (new Date()) - startTime
      // if has splash screen set the durantion here
      // const wait = 000 - diff < 0 ? 0 : 0000 - diff
      setTimeout(() => { store.commit('loaded', true) }, 0)
    },
    async signIn (store, data) {
      store.commit('user', data.user)
      setToken(data.token)
      const path = window.location.pathname
      if (data.user.role === 'admin' && !path.startsWith('/admin')) router.replace('/admin')
      if (data.user.role === 'user' && !path.startsWith('/user')) router.replace('user')
      store.dispatch('loaded')
    },
    signOut (store) {
      store.commit('user', null)
      removeToken()
      const path = window.location.pathname
      if (path.startsWith('/admin') || path.startsWith('/user')) router.replace('/')
      store.dispatch('loaded')
    },

  }
})
