import router from './router'
import store from './store'
import {
    Message
} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
    getSesstionToken,
    setSesstionToken,
    setAppID
} from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'
NProgress.configure({
    showSpinner: false
}) // NProgress Configuration
let query = {
    appId: 7
}
let token = 'd4ddffb8d01e0e31b3db0e120ee88ef63a5ce91c0be294261f43028038a14106'
router.beforeEach((to, from, next) => {
    NProgress.start()
    // to.query.token = '3b5dedd8407284110f7de37f1908ae96bcbbf476476f87500ba3b466edef3392';
    // to.query.id = '7';

    document.title = getPageTitle(to.meta.title)
    if (to.path === '/home/dashboard') { // 判断当前进入的页面
        if (to.query.token && to.query.id) {

            query.appId = to.query.id
            setAppID(to.query.id)
            setSesstionToken(to.query.token) // 请求获取toke 然后保存token

            store.dispatch('permission/generateRoutes', query)
            store.dispatch('user/getInfo')
        }
        // else {
        //     setAppID(query.appId)
        //     setSesstionToken(token)
        //     store.dispatch('user/getInfo')    
        //     store.dispatch('permission/generateRoutes', query)   
        // }
    } else {
        /* 当跳往编辑listing页面时需要带上toke和id */
        if (to.query.token && to.query.id) {

            query.appId = to.query.id
            setAppID(to.query.id)
            setSesstionToken(to.query.token) // 请求获取toke 然后保存token

            store.dispatch('permission/generateRoutes', query)
            store.dispatch('user/getInfo')
        }
    }
    const hasToken = getSesstionToken()
    if (hasToken) {
        // if (!getMenus()) {
        //     store.dispatch('permission/generateRoutes', query)
        // }
        next()
    } else {
        window.location.href = `${process.env.VUE_APP_ERP_ADMIN}/#/login`
        // next()

    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
    // loadingClose()

})
