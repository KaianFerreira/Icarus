import './registerServiceWorker'
import './assets/_scss/app.scss'
import Vue from 'vue'
import App from './components/App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { VueMaskDirective } from 'v-mask'
import { getToken } from './libs/token'
import { get as getUser } from './api/auth'
Vue.directive('mask', VueMaskDirective)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

const start = async () => {
  try {
    if (getToken()) {
      // Refresh token
      const data = await getUser()
      // data.profile = await getProfile()
      store.dispatch('signIn', data)
    } else {
      store.dispatch('signOut')
    }
  } catch (error) {
    console.warn(error)
    store.dispatch('signOut')
  }
}
start()
