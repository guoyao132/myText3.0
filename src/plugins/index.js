import  msg from './msg/msg'

let plugins = {};

plugins.install = function(Vue){
  Vue.component(msg.name, msg);
}

export default plugins;