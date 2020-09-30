/* 盘点单 */
import {
    getData,
    getContent,
    exportData,
    updateIninventory,
    addIninventory,
    auditIninvetory,
    findSkuDetail,
    invalidIninvetory
} from '@/api/Inventory'
import { getButtonList } from '@/api/permision' 
import { loading, loadingClose, message, dateFormat, downlaod } from '@/utils/common'
import router from '@/router'
const state = {
    tableData: [
    ],
    showButtons: {
        exportData: false,
        addOrder: false,
        audit: false
    },
    total: 0,
    detail:{},
    detailItems: [],
    auditState: 0, /* 是否通过 */
    auditModal: false, /* 审核弹窗 */
    auditRemark: '',
    stateList: [
        {
            label: '待审核',
            value: 1
        },
        {
            label: '已审核',
            value: 2
        },
        {
            label: '审核不通过',
            value: 3
        },
        {
            label: '作废',
            value: 4
        }
    ],
    skuDetail: {},
}
const mutations = {
    GET_DATA(state, data) {
        state.tableData = data.data
        data.data.forEach(item => {
            item.createDate = item.createDate ? dateFormat(item.createDate) : ''
        })
        state.total = data.total
    },
    GET_CONTENT(state, data) {
        state.detail = data.detail
        state.detailItems = data.items
    },
    change_detailItems(state, data) {
        // state.detailItems = []
        state.detailItems = data
    },
    CLOSR_AUDIT_MODAL(state, flag) {
        state.auditRemark = ''
        state.auditModal = flag
        state.auditState = 0
    },
    CHANGE_AUDIT_STATE(state, flag) {
        state.auditState = flag
    },
    // GET_SKU_DETAIL(state, data) {
    //     data.count = 0
    //     state.skuDetail = data
    // },
    ADD_SKU_DETAIL(state, data) {
        data.count = 0
        state.detailItems.push(data)
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
    async getContent({ commit }, params) {
        loading()
        await getContent(params).then(res => {
            loadingClose()
            commit('GET_CONTENT', res.data)
        }).catch(err => {
            loadingClose()
        })
    },
    async exportData({}, params) {
        loading()
        await exportData(params).then(res => {
            loadingClose()
            downlaod(res, '盘点单.xls')
        })
    },
    async updateIninventory({}, data) {
        loading()
        await updateIninventory(data).then(res => {
            loadingClose()
            if (res.code === 0) {
                router.push({
                    name: 'Inventory'
                })
            } else {
                    message('error', res.msg)
            }
        }).catch(err => {
            loadingClose()
        })
    },
    async addIninventory({}, data) {
        loading()
        await addIninventory(data).then(res => {
            loadingClose()
            if (res.code === 0) {
                router.push({
                    name: 'Inventory'
                })
            } else {
                message('error', res.msg)
            }
        }).catch(err => {
            loadingClose()
        })
    },
    /* 审核盘点单 */
    async auditIninvetory({ commit, dispatch }, { data, params }) {
        loading()
        await auditIninvetory(data).then(res => {
            loadingClose()
            if (res.code === 0) {
                commit('CLOSR_AUDIT_MODAL', false)
                dispatch('getData', params)
                message('success', '审核成功')
                // router.push({
                //     name: 'Inventory'
                // })
            } else {
                message('error', res.msg)
            }
        }).catch(err => {
            loadingClose()
        })
    },
    async findSkuDetail({ commit }, data) {
        loading()
        await findSkuDetail(data).then(res => {
            loadingClose()
            if (res.code === 0) {
                commit('ADD_SKU_DETAIL', res.data)
            } else {
                message('error', res.msg)
            }
        }).catch(err => {
            loadingClose()
        })
    },
    async invalidIninvetory({}, params) {
        loading()
        await invalidIninvetory(params).then(res => {
            loadingClose()
            if (res.code === 0) {
                router.push({
                    name: 'Inventory'
                })
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