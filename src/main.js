// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Cookies from 'js-cookie'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import Mint from 'mint-ui';
import { ShortPassword } from '@nutui/nutui';
import 'mint-ui/lib/style.css'
import './assets/css/my-mint.css'
import './assets/css/reset.css'
import axios from 'axios'
let echarts = require('echarts/lib/echarts')

Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios

Vue.use(ElementUI);
Vue.use(Mint);
Vue.config.productionTip = false

ShortPassword.install(Vue);
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
