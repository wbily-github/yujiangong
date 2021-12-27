import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import IndexPage from '../views/indexPage.vue'
import Register from '../views/register.vue'
import SpacePage from '../views/spacePage.vue'
import UserInfoPage from '../views/userInfoPage.vue'

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
  {
    path: '/spacePage',
    name: 'spacePage',
    component: SpacePage
  },{
    path: '/userInfoPage',
    name: 'userInfoPage',
    component: UserInfoPage
  },
  
]

const router = new VueRouter({
  routes
})

export default router
