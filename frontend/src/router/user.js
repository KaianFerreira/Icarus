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
      },
      {
        path: 'note',
        name: 'userNotes',
        component: () => import(/* webpackChunkName: "user" */ '../components/user/UserNotes.vue')
      },
      {
        path: 'note/:id',
        name: 'userNote',
        component: () => import(/* webpackChunkName: "user" */ '../components/user/UserNote.vue'),
        props: true
      }
    ]
  }
]