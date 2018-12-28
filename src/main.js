import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import utils from "./utils"
import Axios from 'axios'
import Bootstrap from 'bootstrap-vue'
import "bootstrap-vue/dist/bootstrap-vue.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import  iview from 'iview'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false;
Vue.prototype.utils = utils;
Vue.prototype.axios = Axios;
Vue.use(Bootstrap);
Vue.use(iview)
// Vue.config.devtools = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
