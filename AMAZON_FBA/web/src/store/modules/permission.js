import { constantRoutes } from '@/router'
// import { modules } from '@/menuAndButton'

import {
    getMenus,
    logout
} from '@/api/permision'
import { setMenus, setSesstionToken } from '@/utils/auth'
import Layout from '@/layout'
let dashboard = [{
        path: '/home',
        component: Layout,
        redirect: '/dashboard',
        alwaysShow: true,
        meta: { title: 'Dashboard', icon: 'dashboard', noCache: false },
        children: [{
            path: 'dashboard',
            component: () =>
                import ('@/views/dashboard/index'),
            name: 'Dashboard',
            meta: { title: 'Dashboard', noCache: false }
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
        const tmp = {...route }
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
    routes: [],
    addRoutes: [],
    menuIdList: {}
}

const mutations = {
    SET_ROUTES: (state, list) => {
        state.routes = list
    },
    SET_MENU_ID: (state, IDS) =>  {
        state.menuIdList = IDS
    }
}

const actions = {
        async generateRoutes({ commit }, query) {
        // return new Promise((reslove, reject) => {
            await getMenus(query).then(res => {
                const { modules } = res.data
                let list = []
                let idList = {}
                modules.forEach(item => {
                    let obj = {}
                    obj.path = item.url
                    obj.component = Layout
                    obj.alwaysShow = true
                    obj.redirect = item.menus[0].url
                    obj.meta = {
                        title: item.name,
                        icon: item.icon,
                        noCache: true
                    }
                    obj.children = []
                    item.menus.forEach(element => {
                        let menu = {}
                        menu.path = element.url
                        menu.meta = {
                            title: element.name,
                            noCache: true,
                            id: element.id
                        }
                        obj.children.push(menu)
                        idList[element.url] = element.id
                    })
                    list.push(obj)
                })
                commit('SET_ROUTES', [...dashboard, ...list])
                commit('SET_MENU_ID', idList)
                sessionStorage.setItem('list', JSON.stringify([...dashboard, ...list]))
                sessionStorage.setItem('munuIdList', JSON.stringify(idList))
            }) 
        // })
        // console.log(constantRoutes)
        // commit('SET_ROUTES', constantRoutes)
    },
    logout() {
        return new Promise((reslove, reject) => {
            logout().then(res => {
                sessionStorage.clear()
                window.location.href = `${process.env.VUE_APP_ERP_ADMIN}/#/login`
            }).catch(err => {
                reject(err)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}