import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Block from './views/Block'
import Iview from './views/Iview'
import Higelight from './views/Higelight'
import Codemirror from './views/Codemirror'
import ChangeColor from './views/ChangeColor'
import Scatter from './views/Scatter'
import CssAnimate from './views/CssAnimate'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'default',
      component: CssAnimate
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
    {
      path: '/cssanimate',
      name: 'CssAnimate',
      component: CssAnimate
    },
  ]
})

/*路由跳转判断需要登录----meta.requiresAuth为true则需要登录才能进入*/
router.beforeEach(function (to,from,next) {
  next();
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