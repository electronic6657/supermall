import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () =>  import('../views/home/Home')
Vue.use(VueRouter)

const routes =[
  {
    path: '',
    redirect:'/home',
    meta: {footShow: true}
  },


  {
    path: '/home',
    name: 'Home',
    meta: {footShow: true},
    component: Home
  },
  {
    path: '/category',
    name: 'category',
    meta: {footShow: true},
    component: () => import('../views/category/Category.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    meta: {footShow: true},
    component: () => import('../views/cart/Cart')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {footShow: true},
    component: () => import('../views/profile/Profile')
  },
  {
    path: '/detail/:iid',
    name: 'detail',
    component: () => import('../views/detail/Detail')
  }

]

const router = new VueRouter({
  routes,
  mode:'history',
})

export default router
