export default [
  {
    path: '/admin',
    component: () => import(/* webpackChunkName: "admin" */ '../components/admin/AdminRouter.vue'),
    children:[
      {
        path: '',
        name: 'adminDashboard',
        component: () => import(/* webpackChunkName: "admin" */ '../components/admin/AdminDashboard.vue')
      }
    ]
  }
]