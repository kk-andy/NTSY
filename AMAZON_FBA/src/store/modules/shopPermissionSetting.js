import {
    getData,
    delShopRole,
    getRoleList,
    addShopRole,
    updateShopRole
} from '@/api/shopPermissionSetting'
import { getButtonList } from '@/api/permision' 
import { message, loading, loadingClose } from '@/utils/common'
const state = {
    options: [
        {
            value: '不为空'
        },
        {
            value: '空'
        },
        {
            value:''
        }
    ],
    showButtons: {
        edit: false
    },
    tableData: [],
    total: 0,
    roleList: [],
    parentForm: {
        // staffId: '',
        remark: '',
        staffName: '',
        shopModelList: []
    },
    shopRoleModal: false
}
const mutations = {
    GET_DATA(state, data) {
        data.data.forEach(item => {
            item.shopNameStr = item.shopModelList.map(shop => shop.label).join(',')
        })
        // console.log(data)
        state.tableData = data.data
        state.total = data.total
    },
    CHANGE_MODAL_TYPE(state, flag) {
        state.shopRoleModal = flag
    },
    GET_ROLE_DATA(state, data) {
        state.roleList  = data
    },
    CAHNGE_PARENT_FORM(state, val = undefined) {
        if (val) {
            state.parentForm = val
        } else {
            Object.keys(state.parentForm).forEach(key => state.parentForm[key] = '')
            state.parentForm.shopModelList = []
        }
    },
    GET_BUTTON_LIST(state, list) {
        list.forEach(item => {
            state.showButtons[item.key] = true
        })
    }
}
const actions = {
    async getData({ commit }, params) {
        loading()
        await getData(params).then(res => {
            loadingClose()
            commit('GET_DATA', res.data)
        }).catch(err => {
            loadingClose()
        })
    },
    async getRoleList({ commit }, params) {
        // loading()
        await getRoleList(params).then(res => {
            // loadingClose()
            commit('GET_ROLE_DATA', res.data)
        }).catch(err => {
            loadingClose()
        })
    },
    async addShopRole({ dispatch, commit }, { data, params }) {
        loading()
        await addShopRole(data).then(res => {
            loadingClose()
            if (res.code === 0) {
                message('success', '新增成功')
                commit('CHANGE_MODAL_TYPE', false)
                commit('CAHNGE_PARENT_FORM')
                dispatch('getData', params) 
            } else {
                message('error', res.msg)
            }
        }).catch(err => {
            loadingClose()
        })
    },
    async updateShopRole({ dispatch, commit }, { data, params }) {
        loading()
        await updateShopRole(data).then(res => {
            loadingClose()
            if (res.code === 0) {
                message('success', '编辑成功')
                commit('CHANGE_MODAL_TYPE', false)
                commit('CAHNGE_PARENT_FORM')
                dispatch('getData', params) 
            } else {
                message('error', res.msg)
            }
        }).catch(err => {
            loadingClose()
        })
    },
    async delShopRole({ dispatch }, { relationId, params }) {
        loading()
        await delShopRole(relationId).then(res => {
            loadingClose()
            if (res.code === 0) {
                message('success', '删除成功')
                dispatch('getData', params)
            } else {
                message('error', res.msg)
            }
        }).catch(err => {
            loadingClose()
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
    state,
    mutations,
    actions
}