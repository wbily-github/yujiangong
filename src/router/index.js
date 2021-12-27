import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import IndexPage from '../views/indexPage.vue'
import Register from '../views/register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  }, 
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/indexPage',
    name: 'IndexPage',
    component: IndexPage
  },
]

const router = new VueRouter({
  routes
})

export default router
