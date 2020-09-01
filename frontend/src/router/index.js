import Vue from 'vue'
import VueRouter from 'vue-router'
import main from './main'
import user from './user'
import admin from './admin'

Vue.use(VueRouter)


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
  const routes = [
    ...main,
    ...user,
    ...admin
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
