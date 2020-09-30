import {
    asyncRoutes,
    constantRoutes
} from '@/router'
import {
    getMenus,
    logout
} from '@/api/permision'
import {
    setMenus,
    setSesstionToken,
    setPHPSESSID
} from '@/utils/auth'
import Layout from '@/layout'
import {
    menuName
} from '@/utils/menu'
let dashboard = [{
    path: '/home',
    component: Layout,
    redirect: '/dashboard',
    alwaysShow: true,
    meta: {
        title: 'Dashboard',
        icon: 'dashboard',
        noCache: false
    },
    children: [{
        path: 'dashboard',
        component: () =>
            import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: {
            title: 'Dashboard',
            noCache: false
        }
    }]
}, ]
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
    const res = []

    routes.forEach(route => {
        const tmp = {
            ...route
        }
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    })

    return res
}

const state = {
    routes: constantRoutes,
    addRoutes: [],
    menuIdList: {} //-----
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        // state.addRoutes = routes
        if (state.routes.length === 1) {
            state.routes = state.routes.concat(routes)
        }
        // setMenus(JSON.stringify(state.routes))
    },
    //-----
    SET_MENU_ID: (state, IDS) => {
        state.menuIdList = IDS
    }
}

const actions = {
    generateRoutes({
        commit
    }, query) {
        return new Promise((reslove, reject) => {

            getMenus(query).then(res => {
                let list = []
                let idList = {}
                res.data.modules.forEach(item => {
                    let obj = {}
                    obj.path = item.url
                    obj.component = Layout
                    obj.alwaysShow = true
                    obj.redirect = `${item.path}/${item.menus[0].path}`
                    obj.meta = {
                        title: item.name,
                        icon: item.icon,
                        noCache: true
                    }
                    if (item.url === '/supplier') {
                        obj.meta.noCache = false
                    }
                    obj.children = []
                    item.menus.forEach(element => {
                        let menu = {}
                        menu.path = element.url
                        menu.name = menuName(element.url)
                        menu.meta = {
                            title: element.name,
                            noCache: true,
                            id: element.id
                        }
                        obj.children.push(menu)
                        idList[element.url] = element.id //---------
                    })
                    list.push(obj)
                })
                commit('SET_ROUTES', list)
                //----------
                commit('SET_MENU_ID', idList)
                sessionStorage.setItem('list', JSON.stringify([...dashboard, ...list]))
                sessionStorage.setItem('munuIdList', JSON.stringify(idList))
            })
        })
    },
    logout() {
        setPHPSESSID('')
        setSesstionToken('')
        window.location.href = 'http://test1.product.nantang-tech.com/index.php/api/login/logout'
        window.location.href = `${process.env.VUE_APP_LOGIN_URL}/#/login`
        return new Promise((reslove, reject) => {

            // logout().then(res => {
            //     setSesstionToken('')
            //     window.location.href = `${process.env.VUE_APP_LOGIN_URL}/#/login`
            // }).catch(err => {
            //     reject(err)
            // })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
