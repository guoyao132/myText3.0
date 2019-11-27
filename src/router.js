import Vue from 'vue'
import Router from 'vue-router'
import defaultVue from "./views/ThreeeDemo"
import home from "./views/Home"

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'default',
      component: defaultVue
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/ol',
      name: 'ol',
      component: resolve => require(['@/views/Ol'], resolve)
    },
    {
      path: '/threeedemo',
      name: 'threeedemo',
      component: resolve => require(['@/views/ThreeeDemo'], resolve)
    },
    {
      path: '/myxdhmap',
      name: 'myxdhmap',
      component: resolve => require(['@/views/MyXdhMap'], resolve)
    },
    {
      path: '/myxdhmap2',
      name: 'myxdhmap2',
      component: resolve => require(['@/views/MyXdhMap2'], resolve)
    },
    {
      path: '/maindiv',
      name: 'maindiv',
      component: resolve => require(['@/views/MainDiv'], resolve)
    },
    {
      path: '/block',
      name: 'Block',
      component: resolve => require(['@/views/Block'], resolve)
    },
    {
      path: '/iview',
      name: 'Iview',
      component: resolve => require(['@/views/Iview'], resolve)
    },
    {
      path: '/higelight',
      name: 'Higelight',
      component: resolve => require(['@/views/Higelight'], resolve)
    },
    {
      path: '/codemirror',
      name: 'Codemirror',
      component: resolve => require(['@/views/Codemirror'], resolve)
    },
    {
      path: '/changeColor',
      name: 'ChangeColor',
      component: resolve => require(['@/views/ChangeColor'], resolve)
    },
    {
      path: '/scatter',
      name: 'Scatter',
      component: resolve => require(['@/views/Scatter'], resolve)
    },
    {
      path: '/cssanimate',
      name: 'CssAnimate',
      component: resolve => require(['@/views/CssAnimate'], resolve)
    },
    {
      path: '/amap',
      name: 'AMap',
      component: resolve => require(['@/views/AMap'], resolve)
    },
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['@/views/Login'], resolve)
    },
    {
      path: '/children',
      name: 'Children',
      component: resolve => require(['@/views/Children'], resolve),
      children: [
        {
          path: 'child1',
          name: 'Child1',
          component: resolve => require(['@/components/Child1'], resolve),
          redirect: {name: 'GrandChild1'},
          children: [
            {
              path: 'grandchild1',
              name: 'GrandChild1',
              component: resolve => require(['@/components/GrandChild1'], resolve)
            },
            {
              path: 'grandchild2',
              name: 'GrandChild2',
              component: resolve => require(['@/components/GrandChild2'], resolve)
            },
          ]
        },
        {
          path: 'chlidl2',
          name: 'Chlidl2',
          component: resolve => require(['@/components/Chlidl2'], resolve),
          redirect: {name: 'GrandChild3'},
          children: [
            {
              path: 'grandchild3',
              name: 'GrandChild3',
              component: resolve => require(['@/components/GrandChild3'], resolve)
            },
            {
              path: 'grandchild4',
              name: 'GrandChild4',
              component: resolve => require(['@/components/GrandChild4'], resolve)
            },
          ]
        },
      ],
      redirect: "/children/child1"
    },
  ]
})

//路由跳转判断需要登录----meta.requiresAuth为true则需要登录才能进入
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