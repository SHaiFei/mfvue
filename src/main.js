/*
 * @Author: your name
 * @Date: 2021-01-10 14:10
 * @LastEditors: your name
 * @Description: In User Settings Edit
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import Cookies from 'js-cookie'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import permission from './directive/permission'
import util from '@/assets/js/util.js'

// import './permission' // permission control

// Vue.use(Element, {
//   size: Cookies.get('size') || 'medium' // set element-ui default size
// })
import QS from 'qs'

import { parseTime } from "@/utils/index" // 日期转换

Vue.prototype.parseTime = parseTime

import global_ from './api/global'
Vue.prototype.GLOBAL = global_;

Vue.prototype.axios = axios;

Vue.use(util)
Vue.use(ElementUI)
// Vue.use(permission)
Vue.use(Cookies)
Vue.use(router)
Vue.use(QS)
// 按需引入vue-awesome图标
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/chart-bar.js';
import 'vue-awesome/icons/chart-area.js';
import 'vue-awesome/icons/chart-pie.js';
import 'vue-awesome/icons/chart-line.js';
import 'vue-awesome/icons/align-left.js';

// 全局注册图标
Vue.component('icon', Icon);

// 适配flex
import '@/common/flexible.js';

// 引入全局css
import './assets/styles/style.scss';

Vue.config.productionTip = false;
// 全局EventBus传参
Vue.prototype.$EventBus = new Vue()
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
