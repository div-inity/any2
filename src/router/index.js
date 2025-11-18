import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '../components/NotFound.vue'
import AllDevs from '../views/devs/AllDevsView.vue'
import Dev from '../views/devs/DevsMainView.vue'

const routes = [
  { 
    path: '/:pathMatch(.*)*', 
    component: NotFound,
    name: '404'
  },
  {
    path: '/',
    name: 'Домашняя',
    component: HomeView
  },
  {
    path: '/about',
    name: 'О проекте',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  { 
    path: '/devs',
    name: 'Разработки',
    component: AllDevs
  },
  { 
    path: '/devs/:any',
    name: 'Одна из разработок',
    component: Dev
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
