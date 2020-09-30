import { getMenus } from '@/api/menu'
import { resolve } from 'core-js/fn/promise'
import Layout from '@/layout'


const state = {
    menus: []
}
const mutations = {

}
const actions = {
    getMenus({ commit }, query) {
        return new Promise((resolve, reject) => {
            getMenus(query).then(res => {
                let list = []
                res.data.modules.forEach(item => {
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
                    if (item.url === '/supplier') {
                        obj.meta.noCache = false
                    }
                    obj.children = []
                    item.menus.forEach(element => {
                        let menu = {}
                        menu.path = element.url
                        // menu.name = menuName(element.url)
                        menu.meta = {
                            title: element.name,
                            noCache: true,
                            id: element.id
                        }
                        obj.children.push(menu)
                    })
                    list.push(obj)
                })
                // console.log(list);
                commit('SET_ROUTES', list)
            })
        })
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}