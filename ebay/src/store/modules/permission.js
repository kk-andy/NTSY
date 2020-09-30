import { asyncRoutes, constantRoutes } from '@/router'
import { getMenus } from '@/api/menu'
import Layout from '@/layout'

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
        const tmp = { ...route }
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
    SET_ROUTES: (state, data) => {
        // console.log(data)
        // console.log(munuIdList)
        state.routes = data.list
        state.menuIdList = data.munuIdList
    }
}

const actions = {
    generateRoutes({ commit }, query) {
        return new Promise((resolve, reject) => {
            getMenus(query).then(res => {
                let list = []
                let munuIdList = {}
                list.push({
                    path: '/',
                    component: Layout,
                    redirect: '/dashboard',
                    children: [{
                        path: 'dashboard',
                        component: () =>
                            import('@/view/dashboard/index'),
                        name: 'Dashboard',
                        meta: { title: '首页', icon: 'dashboard', affix: true, noCache: true }
                    }]
                })
                if (res.code == 0) {
                    res.data.modules.forEach(item => {

                        let obj = {}
                        obj.path = item.url
                        obj.component = Layout
                        obj.alwaysShow = true
                        if (item.name === `权限管理` && sessionStorage.getItem("name") === '陆洲') {
                            obj.hidden = true;
                        }
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

                            if (element.name === `账号配置` && sessionStorage.getItem("name") === '陆洲') {
                                menu.hidden = true;
                            }
                            // menu.name = menuName(element.url)
                            menu.meta = {
                                title: element.name,
                                noCache: true,
                                id: element.id
                            }
                            munuIdList[element.url] = element.id
                            obj.children.push(menu)
                        })
                        list.push(obj)
                    })
                    sessionStorage.setItem('list', JSON.stringify(list))
                    sessionStorage.setItem('munuIdList', JSON.stringify(munuIdList))
                    let data = { list, munuIdList }
                    commit('SET_ROUTES', data)
                }
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