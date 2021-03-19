// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入重置样式
import './assets/css/reset.css'

// 引入公共组件
import comComponents from "./components/index";
for(let i in comComponents){
  Vue.component(i,comComponents[i])
}

// 引入过滤器
import comFilter from "./filters/index.js";
for(let i in comFilter){
  Vue.filter(i,comFilter[i])
}

// 引入axios
import store from "./store";

// 引入elemen-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

Vue.prototype.$proImg='http://localhost:3000'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
