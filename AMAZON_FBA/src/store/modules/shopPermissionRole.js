import { 
    getData,
    delShopRole,
    addShopRole,
    updateShopRole
} from '@/api/shopPermissionRole'
import { message, loading, loadingClose } from '@/utils/common'
const state = {
    tableData: [],
    total: 0,
    shopRoleModal: false,
    parentForm: {
        roleName: '',
        remark: '',
        shopModelList: []
    }
}
const mutations = {
    GET_DATA(state, data) {
        data.data.forEach(item => {
            item.shopNameStr = item.shopModelList.map(shop => shop.label).join(',')
        })
        state.tableData = data.data
        state.total = data.total
    },
    CHANGE_MODAL_TYPE(state, flag) {
        state.shopRoleModal = flag
    },
    CAHNGE_PARENT_FORM(state, val = undefined) {
        if (val) {
            state.parentForm = val
        } else {
            Object.keys(state.parentForm).forEach(key => state.parentForm[key] = '')
            state.parentForm.shopModelList = []
        }
    },
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
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}