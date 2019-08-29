import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Login from './views/auth/Login.vue'
import Registration from './views/auth/Registation.vue'
import RepairPassword from './views/auth/PasswordRepair.vue'
import ResetPassowrd from './views/auth/ResetPassword.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/registration',
    name: 'registration',
    component: Registration,
    props: route => ({
      email: route.query.email
    })
  },
  {
    path: '/repairpassword',
    name: 'repairpassword',
    component: RepairPassword,
    props: route => ({
      email: route.query.email
    })
  },
  {
    path: '/resetpassword',
    name: 'resetpassword',
    component: ResetPassowrd,
    props: route => ({
      repairToken: route.query.repairToken
    })
  }
  ]
})
