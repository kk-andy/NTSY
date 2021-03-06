import Vue from 'vue'
import Router from 'vue-router'
/* webpackChunkName  魔法注释 便于打包以后知道每一个打包的文件名 */
Vue.use(Router)

/* Layout */
import Layout from '@/layout'
/* Router Modules */
import dataPermission from "@/router/modules/dataPermission"
import FBA from "@/router/modules/FBA"
import DeliveryManagement from './modules/DeliveryManagement'
import ProcurementManagement from './modules/ProcurementManagement'
import StockManagement from './modules/StockManagement'
import BasisData from './modules/BasisData'
import Statement from './modules/Statement'
import InitialData from './modules/InitialData'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path(.*)',
      component: () =>
        import('@/views/redirect/index')
    }]
  },
  {
    path: '/',
    redirect: '/home/dashboard',
  },
  {
    path: '/auth-redirect',
    component: () =>
      import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () =>
      import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () =>
      import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/home',
    component: Layout,
    redirect: '/dashboard',
    alwaysShow: true,
    meta: { title: 'Dashboard', icon: 'dashboard' },
    children: [{
      path: 'dashboard',
      component: () =>
        import('@/views/dashboard/index'),
      name: 'Dashboard',
      meta: { title: 'Dashboard', noCache: true }
    }]
  },
  DeliveryManagement,
  ProcurementManagement,
  StockManagement,
  FBA,
  dataPermission,
  BasisData,
  Statement,
  InitialData,
  {
    path: '/*',
    component: () =>
      import('@/views/error-page/404'),
    hidden: true
  },
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  mode: 'history',
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router