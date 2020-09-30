import { 
    getData,
    exportData,
    getContent,
    invalidTransfer, /* 作废调拨单 */
    auditTransfer, /* 审核调拨单 */
    findSkuDetail, /* 查找sku */
    createTransfer,
    updateTransfers
} from '@/api/Transfers'
import { loading, loadingClose, downlaod, message } from '@/utils/common'
import { getButtonList } from '@/api/permision' 
import router from '@/router'
const state = {
    tableData: [
        
    ],
    showButtons: {
        exportData: false,
        addOrder: false,
        audit: false
    },
    detail: {},
    auditState: 0,
    auditModal: false,
    auditRemark: '',
    skuDetail: {},
    detailItems: [],
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
    total: 0
}
const mutations = {
    GET_DATA(state, data) {
        state.tableData  = data.data
        state.total = data.total
    },
    GET_CONTENT(state, data) {
        state.detail = data.detail
        state.detailItems = data.items
    },
    DELETE_ITEMS(state, index) {
        state.detailItems.splice(index, 1)
    },
    CLOSR_AUDIT_MODAL(state, flag) {
        state.auditState = 0
        state.auditRemark = ''
        state.auditModal = flag
    },
    CHANGE_AUDIT_STATE(state, auditState) {
        state.auditState = auditState
    },
    CHANGE_AUDIT_REMARK(state, val) {
        state.auditRemark = val
    },
    // GET_SKU_CONTENT(state, data) {
    //     data.count = 0
    //     state.skuDetail = data
    // },
    change_detailItems(state, data) {
        state.detailItems = data
    },
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
    async getData({ commit }, parmas) {
        loading()
        await getData(parmas).then(res => {
            loadingClose()
            commit('GET_DATA', res.data)
        }).catch(err => {
            loadingClose()
        })
    },
    async exportData({}, params) {
        loading()
        await exportData(params).then(res => {
            loadingClose()
            downlaod(res, '调拨单明细.xls')
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
    async invalidTransfer({}, params) {
        loading()
        await invalidTransfer(params).then(res => {
            loadingClose()
            if (res.code === 0) {
                router.push({
                    name: 'Transfers'
                })
            } else {
                message('error', res.msg)
            }
        }).catch(err => {
            loadingClose()
        })
    },
    /* 审核调拨单 */
    async auditTransfer({ commit, dispatch }, { data, params }) {
        loading()
        await auditTransfer(data).then(res => {
            loadingClose()
            if (res.code === 0) {
                commit('CLOSR_AUDIT_MODAL', false)
                dispatch('getData', params)
                message('success', '审核成功')
                // router.push({
                //     name: 'Transfers'
                // })
            } else {
                message('error', res.msg)
            }
        }).catch(err => {
            loadingClose()
        })
    },
    /* 查找sku */
    async findSkuDetail({ commit }, params) {
        loading()
        await findSkuDetail(params).then(res => {
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
    /* 新增调拨单 */
    async createTransfer({}, data) {
        loading()
        await createTransfer(data).then(res => {
            loadingClose()
            if (res.code === 0) {
               router.push({
                   name: 'Transfers'
               })
            } else {
                message('error', res.msg)
            }
        }).catch(err => {
            loadingClose()
        })
    },
    async updateTransfers({}, data) {
        loading()
        await updateTransfers(data).then(res => {
            loadingClose()
            if (res.code === 0) {
                router.push({
                    name: 'Transfers'
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