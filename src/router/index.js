import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import User from '../views/User/User.vue'
import Home from '../views/Home/Home.vue'
import Mall from '../views/Mall/Mall.vue'
import pageOne from '../views/Other/pageOne.vue'
import pageTow from '../views/Other/pageTow.vue'
import Login from '../views/Login/Login.vue'

Vue.use(VueRouter)

const routes = [
  // { path: '/', redirect: '/main' },
  {
    path: '/',
    name: 'main',
    component: Main,
    redirect: 'home',
    children: [
      // {
      //   path: '/home',
      //   name: 'home',
      //   component: Home,
      // },
      // {
      //   path: '/user',
      //   name: 'user',
      //   component: User
      // },
      // {
      //   path: '/mall',
      //   name: 'mall',
      //   component: Mall
      // },
      // {
      //   path: '/page1',
      //   name: 'page1',
      //   component: pageOne
      // },
      // {
      //   path: '/page2',
      //   name: 'page2',
      //   component: pageTow
      // }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
