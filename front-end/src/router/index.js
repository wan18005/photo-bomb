import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import Dashbord from '../views/Dashbord.vue'
import Car from '../views/Car.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  },
  {
    path: '/dashboard',
    name: 'Dashbord',
    component: Dashbord
  },
  {
    path: '/car/:id',
    name: 'car',
    component: Car
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
