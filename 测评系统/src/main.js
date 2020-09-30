import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
import {
    Modal
} from 'view-design'
import 'view-design/dist/styles/iview.css'
Vue.component('Modal', Modal)
import '@/styles/index.scss' // global css
import PageTotal from '@/components/pageTotal'
Vue.component('PageTotal', PageTotal)
import App from './App'
import store from './store'
import router from './router'
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
import * as filters from './filters' // global filters
import {
    getMenuId
} from '@/utils/menuName'
Vue.prototype.$getMenuId = getMenuId;
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
//剪切板
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

Vue.use(Element, {
    size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
