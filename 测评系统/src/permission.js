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
    getMenus,
    setPHPSESSID,
    setSesstionuSername,
    setSesstionSkuToken,
    getToken,
    setToken,
    removeToken
} from '@/utils/auth'

import {
    authorize
} from "@/utils/devoption";
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({
    showSpinner: false
}) // NProgress Configuration
let query = {
    appId: 8
}
// const getMenusFunc = () => {
//     store.dispatch('permission/generateRoutes', query)
// }
// const whiteList = ['/login'] // no redirect whitelist
// let token = '96be85869fb0cb6d577bedd7038e4cfcc00e113cb8c7bd0cdd237bcce86eaa64'
router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start()
    // set page title
    // await setToken(token)
    document.title = getPageTitle(to.meta.title)

    // store.dispatch('permission/generateRoutes', query)
    if (to.path === '/home/dashboard') { // 判断当前进入的页面

        if (to.query.token && to.query.id) {

            // setPHPSESSID('2799931ea1caa007078d38a5e8c480a7') //发版注销
            console.log(to)
            query.appId = to.query.id
            store.dispatch('permission/generateRoutes', query)
            setSesstionToken(to.query.token) // 请求获取toke 然后保存token
            store.dispatch('commons/getUserName')
            // setSesstionuSername(to.query.username) // 获取用户名 保存

            let obj = {
                appKey: "Zoq9pgDz85plXZTeFSjx",
                appSecret: "oGDMxgU5DL8IBpBug2LGYM1tYN4oefob"
            };
            // authorize(obj).then(res => {
            //     debugger
            //     if (res.code == 0) {
            //         setSesstionSkuToken(res.data.authorization)
            //     }
            // })
        } else {

            store.dispatch('permission/generateRoutes', query)
            // setSesstionToken(token)
            next()
        }

    }

    const hasToken = getSesstionToken()
    if (hasToken) {
        // if (!getMenus()) {
        //     // store.dispatch('permission/generateRoutes', query)
        // }
        next()
    } else {
        window.location.href = `${process.env.VUE_APP_LOGIN_URL}/#/login`

        // next()
        // if (whiteList.indexOf(to.path) !== -1) {
        //     next()
        // } else {
        //     next(`/login?redirect=${to.path}`)
        //     next()
        //     NProgress.done()
        // }
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
