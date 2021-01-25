import Vue from 'vue'
import VueRouter from 'vue-router'
//import BikeRegister from '@/views/BikeRegister';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Bikes',
    component: () => import('../views/BikesList.vue')
  },
  {
    path: '/new',
    name: 'New',
    component: () => import('../views/BikeRegister.vue')
  }
  
]

const router = new VueRouter({
  routes
})

export default router
