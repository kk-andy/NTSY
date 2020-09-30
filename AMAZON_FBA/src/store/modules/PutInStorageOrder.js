/* 入库单 */
import { getPurchaseInList, getPutInStorageOrderDetail, getQuerySpace, purchaseInStockIn, dropPurchaseIn } from '@/api/PutInStorageOrder'
import { loading, loadingClose, message } from '@/utils/common'
import { getButtonList } from '@/api/permision' 
import router from '@/router'
const state = {
    tableData: [],
    detail: {},
    detailItems: [],
    spaceList: [], /* 库位列表 */
    GRNStatus: [
        {
            label: '已作废',
            value: 2,
        },
        {
            label: '待入库',
            value: 1
        },
        {
            label: '已入库',
            value: 3
        }
    ],
    showButtons: {
        invalid: false,
        checkOrder: false
    },
    searchList: [
        {
          label: '采购单号',
          value: 'purchaseId'
        },
        {
          label: '入库单号',
          value: 'inCode'
        },
        {
          label: '采购员',
          value: 'purchaser'
        }
    ],
    total: 0
}
const mutations = {
    GET_DATA(state, data) {
        state.tableData = data.data
        state.total = data.total
    },
    GET_DETAIL(state, data) {
        state.detail = data.detail
        data.items.forEach(item => {
          item.count = item.planCount - item.inCount
          item.spaceId = item.spaceId ? item.spaceId : ''
        })
        state.detailItems = data.items
    },
    GET_SPACE(state, data) {
        state.spaceList = data
    },
    GET_BUTTON_LIST(state, list) {
        console.log(list)
        list.forEach(item => {
            state.showButtons[item.key] = true
        })
    }
}
const actions = {
    async getPurchaseInList({ commit }, params) {
        loading()
        await getPurchaseInList(params).then(res => {
            loadingClose()
            if (res.code === 0) {
                commit('GET_DATA', res.data)
            } else {
                message('error', res.msg)
            }
        }).catch(err => {
            loadingClose()
        })
    },
    async getPutInStorageOrderDetail({ commit }, params) {
        loading()
        await getPutInStorageOrderDetail(params).then(res => {
            loadingClose()
            if (res.code === 0) {
                commit('GET_DETAIL', res.data)
            } else {
                message('error', res.msg)
            }
        }).catch(err => {
            message('error', res.msg)
        })
    },
    async getQuerySpace({ commit }, params) {
        await getQuerySpace(params).then(res => {
            commit('GET_SPACE', res.data)
        })
    },
    async purchaseInStockIn({ }, data) {
        loading()
        await purchaseInStockIn(data).then(res => {
            loadingClose()
            if (res.code === 0) {
                router.push({
                    name: 'PutInStorageOrder'
                })
            } else {
                message('error', res.msg)
            }
        }).catch(err => {
            loadingClose()
        })
    },
    async dropPurchaseIn({ dispatch }, { code, data }) {
        await dropPurchaseIn(code).then(res => {
            if (res.code === 0) {
                message('success', '操作成功')
                dispatch('getPurchaseInList', data)
            } else {
                message('error', res.msg)
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
    state,
    mutations,
    actions
}
