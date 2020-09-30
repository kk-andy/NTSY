import {
    getData,
    getContent,
    exportData
} from '@/api/DeliveryManagement'
import { getButtonList } from '@/api/permision' 
import {  loading, loadingClose, message, downlaod, dateFormat } from '@/utils/common'
const state = {
    tableData: [
       
    ],
    showButtons: {
        exportData: false
    },
    orderDetail: {},
    orderDetailItems: [],
    searchList: [
        {
            label: '普源订单号',
            value: 'orderNid'
        },
        {
            label: '订单编号',
            value: 'orderId'
        }
    ],
    typeList: [
        {
            label: '正常',
            value: 1
        },
        {
            label: '异常',
            value: 0
        }
    ],
    total: 0
}
const mutations = {
    GET_DATA(state, data) {
        data.data.forEach(item => {
            item.orderDate = item.orderDate ? dateFormat(item.orderDate) : '' 
        })
        state.tableData = data.data
        state.total = data.total
    },
    GET_CONTENT(state, data) {
        state.orderDetail = data.detail
        state.orderDetailItems = data.items
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
            downlaod(res, 'FBA订单')
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