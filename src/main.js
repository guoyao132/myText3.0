import Vue from 'vue'

import router from './router'
import store from './store'
import utils from "./utils"
import Axios from 'axios'
import qs from "qs"
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
import AMap from "vue-amap"
// let Base64 = require('js-base64').Base64;
import {Base64} from "js-base64"

import App from './App.vue'
Vue.config.productionTip = false;
Vue.prototype.utils = utils;
Vue.prototype.$Base64 = Base64;

import XdhMap from 'xdh-map'
import 'xdh-map/lib/xdhmap.css'
Vue.use(XdhMap)


let basturl = "";
let env = process.env.NODE_ENV;
if ( env == 'production' || env == 'test' || env == 'dev') {
  basturl = process.env.VUE_APP_BASEURL;
}

Axios.defaults.transformRequest = [function (data) {
  //post 提交数据变为
  return qs.stringify(data);
}];
Vue.prototype.axios = Axios;
Vue.use(Bootstrap);
Vue.use(iview);
Vue.use(AMap);
// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德的key
  key: 'YOUR_KEY',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
});
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

import {videoPlayer} from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'videojs-flash'
Vue.use(videoPlayer);


import * as THREE from "three"
Vue.prototype.$THREE = THREE;

import plugins from './plugins/index'
Vue.use(plugins);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
