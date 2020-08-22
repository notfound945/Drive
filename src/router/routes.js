
const routes = [
  {
    name: 'index',
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    name: 'user',
    path: '/user/:id',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Home') },
      { path: 'account', component: () => import('pages/AccountCenter') }
    ]
  },
  {
    path: '/flex',
    component: () => import('layouts/FlexLayout.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
