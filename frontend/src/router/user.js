export default [
  {
    path: '/user',
    component: () => import(/* webpackChunkName: "user" */ '../components/user/UserRouter.vue'),
    children:[
      {
        path: '',
        name: 'userDashboard',
        component: () => import(/* webpackChunkName: "user" */ '../components/user/UserDashboard.vue')
      },
      {
        path: 'profile',
        name: 'userProfile',
        component: () => import(/* webpackChunkName: "user" */ '../components/user/UserProfile.vue')
      }
    ]
  }
]