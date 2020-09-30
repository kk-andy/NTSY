import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { loadingClose } from '@/utils/common'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getSesstionToken, setSesstionToken, getCommonData, setAppID } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'
NProgress.configure({ showSpinner: false }) // NProgress Configuration
let query = {
  appId: 13
}
let token = 'b7a5ec884b120f93c8080601ec9557ded3e24a4f95ae0d152937d1064527654d' /* 正式服token */
let params = {
  appKey: "ebb5a0f44d96e18556f8",
  appSecret: "9b34a3d6c67d2dc58f4090dfb6c6f8de",
  name: "fba_warehouse"
}
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  if (to.path === '/home/dashboard') { // 判断当前进入的页面
    if (to.query.token && to.query.id) {
      setSesstionToken(to.query.token)
      setAppID(to.query.id)

      await store.dispatch('permission/generateRoutes', { appId: to.query.id })
      /* 获取用户staffId */
      await store.dispatch('getStaffName')
      await store.dispatch('getStaffId')
      store.dispatch('getOAUserToken', params)
      // store.commit('permission/SET_ROUTES')

      store.dispatch('getCommonData')
    } else {
      if (process.env.NODE_ENV === 'development') {
        setSesstionToken(token)
        await store.dispatch('permission/generateRoutes', { appId: query.appId })
        await store.dispatch('getStaffName')
        await store.dispatch('getOAUserToken', params)
        /* 获取用户staffId */
        await store.dispatch('getStaffId')
        store.dispatch('getCommonData')
      }
      // store.commit('permission/SET_ROUTES')
    }
  } else {

    if (getCommonData()) {
      store.commit('GET_COMMON_DATA', JSON.parse(getCommonData()))
    }
  }

  const hasToken = getSesstionToken()
  if (hasToken) {
    next()
  } else {
    // window.location.href = `${process.env.VUE_APP_ERP_ADMIN}/#/login`
    next()

  }
})

router.afterEach(() => {
  // finish progress bar
  if (document.getElementsByClassName('el-loading-mask')[0]) {
    loadingClose()
  }
  NProgress.done()
})