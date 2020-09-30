import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
import '@/styles/index.scss' // global css

import { getTokenAndID } from '@/utils/common'
Vue.prototype.$getTokenAndID = getTokenAndID
import App from './App'
import store from './store'
import router from './router'
import _g from './global';
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
import * as filters from './filters' // global filters
import axios from './utils/http'
import auth from './utils/authHttp'
import { Modal } from 'view-design'
import 'view-design/dist/styles/iview.css'
import { getMenuId } from '@/utils/menuName'
Vue.prototype.$getMenuId = getMenuId;
Vue.component('Modal', Modal)
Vue.prototype.$axios = axios;
Vue.prototype.$authHttp = auth;
window._g = _g;
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//     const { mockXHR } = require('../mock')
//     mockXHR()
// }
Vue.use(Element, {
    size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
Vue.prototype.$bus = new Vue();
//全局实例
const bus = new Vue();
window.bus = bus;
Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})