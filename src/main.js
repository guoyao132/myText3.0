import Vue from 'vue'

import router from './router'
import store from './store'
import utils from "./utils"
import Axios from 'axios'
import Bootstrap from 'bootstrap-vue'
import "bootstrap-vue/dist/bootstrap-vue.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import  iview from 'iview'
import 'iview/dist/styles/iview.css'
import VueHighlightJS from 'vue-highlight.js'

import 'highlight.js/styles/railscasts.css'
import javascript from 'highlight.js/lib/languages/javascript'
import python from 'highlight.js/lib/languages/python'

import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'

import App from './App.vue'
Vue.config.productionTip = false;
Vue.prototype.utils = utils;
Vue.prototype.axios = Axios;
Vue.use(Bootstrap);
Vue.use(iview)
Vue.use(VueHighlightJS, {
  // Register only languages that you want
  languages: {
    javascript,
    python
  }
});
Vue.use(codemirror)
// Vue.config.devtools = false;

Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  setTimeout(() =>{
    blocks.forEach((block)=>{
      hljs.highlightBlock(block)
    })
  }, 200)
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
