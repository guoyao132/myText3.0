import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Block from './views/Block'
import Iview from './views/Iview'
import Higelight from './views/Higelight'
import Codemirror from './views/Codemirror'
import ChangeColor from './views/ChangeColor'
import Scatter from './views/Scatter'
import router from '../../wk-webserver-front/src/router'

Vue.use(Router)

cosnt router = new Router({
  routes: [
    {
      path: '/',
      name: 'default',
      component: Scatter
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
    {
      path: '/higelight',
      name: 'Higelight',
      component: Higelight
    },
    {
      path: '/codemirror',
      name: 'Codemirror',
      component: Codemirror
    },
    {
      path: '/changeColor',
      name: 'ChangeColor',
      component: ChangeColor
    },
    {
      path: '/scatter',
      name: 'Scatter',
      component: Scatter
    },
  ]
})

/*路由跳转判断需要登录----meta.requiresAuth为true则需要登录才能进入*/
router.beforeEach(function (to,from,next) {
  // if ((to.path === "/login" || to.path === "/regsiter") && window.sessionStorage.getItem('islogin') == 'true') {
  //   next(false);
  //   return;
  // }
  // if (to.matched.some(record => record.meta.requiresAuth)) {
  //   if(window.sessionStorage.getItem('islogin') == 'true'){
  //     next();
  //   }else{
  //     window.sessionStorage.setItem('target',to.fullPath)
  //     next({
  //       path:'/login'
  //     })
  //   }
  // } else {
  //   next()
  // }
})

export default router