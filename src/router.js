import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Block from './views/Block'
import Iview from './views/Iview'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'default',
      component: Block
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/block',
      name: 'Block',
      component: Block
    },
    {
      path: '/iview',
      name: 'Iview',
      component: Iview
    },
  ]
})
