import { getData, getAuthshop, authshopEdit } from '@/api/dataPermission'
import { getButtonList } from '@/api/permision'
import { Loading } from 'element-ui'
import { data } from 'autoprefixer'
let loadingInstance
const state = {
    modal_template: false,
    checkedAll: false,
    total: 0,
    logTotal: 0,
    tableData: [],
    templateTitle: '新增模板',
    showButtons: {
        edit: false,
    },
    shopList: [
    ]
}
const mutations = {
    GET_DATA(state, data) {
        state.tableData = data.data
        state.total = data.total
    },
    GET_AUTHSHOP(state, data) {
        let { shopList, info } = data
        shopList.forEach(item => {
            item.select = false
            info.forEach(ele => {
                if (item.id === ele.shop_id) {
                    item.select =  true
                }
            })
        })
        if (shopList.length === info.length) {
            state.checkedAll = true
        } else {
            state.checkedAll = false
        }
        state.modal_template = true
        state.shopList = shopList
    },
    CLOSE_MODAL(state) {
        state.modal_template = false
        state.checkedAll = false
    },
    GET_BUTTON_LIST(state, list) {
        list.forEach(item => {
            state.showButtons[item.key] = true
        })
    }
}
const actions = {
    async getData({ commit }, params) {
        loadingInstance = Loading.service({ fullscreen: true, text: '拼命加载中', spinner: 'el-icon-loading', target: '.main-container' })
        await getData(params).then(res => {
            try {
                console.log(res)
                loadingInstance.close()
                commit('GET_DATA', res.data.auth_list)
            } catch(err) {
                loadingInstance.close()
                throw new Error(err)
            }
        })
    },
    async getAuthshop({ commit }, params) {
        loadingInstance = Loading.service({ fullscreen: true, text: '拼命加载中', spinner: 'el-icon-loading', target: '.main-container' })
        await getAuthshop(params).then(res => {
            loadingInstance.close()
            commit('GET_AUTHSHOP', res.data)
        })
    },
    async authshopEdit({ commit, dispatch }, { data, params }) {
        await authshopEdit(data).then(res => {
            try {
                dispatch('getData', params)
                commit('CLOSE_MODAL')
            } catch(err) {
                throw new Error(err)
            }
        })
    },
    async getButtonList({ commit }, params) {
        await getButtonList(params).then(res => {
            commit('GET_BUTTON_LIST', res.data.buttonList)
        })
    }
}
export default {
    namespaced: true,
    mutations,
    actions,
    state
}