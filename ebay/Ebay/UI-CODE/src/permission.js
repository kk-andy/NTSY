import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, setToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    setToken(sessionStorage.getItem('token'))
    // start progress bar
    NProgress.start()

    // set page title
    document.title = getPageTitle(to.meta.title)

    // determine whether the user has logged in
    const hasToken = getToken()

    if (hasToken) {
        // const { roles } = await store.dispatch('user/getInfo')

        // generate accessible routes map basuser/getInfoed on roles
        // store.dispatch('permission/generateRoutes')
        next()

    } else {
        /* has no token*/
        console.log(
            whiteList
        );
        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            // next(`/login?redirect=${to.path}`)
            sessionStorage.clear();
            window.location.href = _g.getLastDomain();
            NProgress.done()
        }
    }
    if (to.fullPath === '/dashboard') {
        store.dispatch("user/getInfo");
        store.dispatch("permission/generateRoutes", {
            appId: sessionStorage.getItem("subId")
        });
        let int = setInterval(() => {
            if (sessionStorage.getItem("name") !== null) {
                clearInterval(int)
            }
            store.dispatch("permission/generateRoutes", {
                appId: sessionStorage.getItem("subId")
            });
        }, 500);

    } else if (to.query.token && to.query.id) {
        sessionStorage.setItem('token', to.query.token)
        sessionStorage.setItem('subId', to.query.id)
        store.commit('user/SET_TOKEN', to.query.token)
        console.log(window.location.href)
        await store.dispatch("user/getInfo");  
        await store.dispatch("permission/generateRoutes", {
            appId: sessionStorage.getItem("subId")
        }); 
        // _g.redirectRoute('')
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})