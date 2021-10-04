import Vue from 'vue'
import Router from 'vue-router'

const Ebook = () => import('views/Ebook')

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/ebook'
  },
  {
    path: '/ebook',
    component: Ebook
  }
]

const router = new Router({
  routes,
  // mode: 'history'
})

export default router