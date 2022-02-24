import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () =>  import('../views/home/Home')
Vue.use(VueRouter)

const routes =[
  {
    path: '',
    redirect:'/home'
  },


  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/category',
    name: 'category',
    component: () => import('../views/category/Category.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/cart/Cart')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/profile/Profile')
  },

]

const router = new VueRouter({
  routes,
  mode:'history',
})

export default router
