import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import IndexPage from '../views/indexPage.vue'
import Register from '../views/register.vue'
import SpacePage from '../views/spacePage.vue'
import UserInfoPage from '../views/userInfoPage.vue'
import myPhoto from '../views/myPhoto.vue'
import test from '../views/test.vue';
import mySpace from '../views/mySpace.vue';
import myApp from '../views/myApp.vue';

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
  },{
    path: '/myPhoto',
    name: 'myPhoto',
    component: myPhoto
  },{
    path: '/mySpace',
    name: 'mySpace',
    component: mySpace
  },{
    path: '/myApp',
    name: 'myApp',
    component: myApp
  },
  {
    path: '/test',
    name: 'test',
    component: test
  },
 
  
]

const router = new VueRouter({
  routes
})

export default router
