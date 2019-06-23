// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import API from './axios/api.js'
import 'lib-flexible/flexible.js'
import { axios } from './axios/axios.js'
import 'jquery'
import fastClick from 'fastclick'
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
fastClick.attach(document.body)
Vue.config.productionTip = false
Vue.prototype.API = API
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
