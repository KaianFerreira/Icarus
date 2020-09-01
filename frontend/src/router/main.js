export default [
  {
    path: '*',
    redirect: '/signin'
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import (/* webpackChunkName: "main" */ '../components/Signin.vue')
  },
  {
    path: '/signon',
    name: 'signon',
    component: () => import(/* webpackChunkName: "main" */ '../components/Signon.vue')
  },
]