import {
    getData,
    exportData,
    getContent
} from '@/api/Outbound'
import { loading, loadingClose, messagem,  downlaod } from '@/utils/common'
import { getButtonList } from '@/api/permision' 
const state = {
    tableData: [

    ],
    /* 搜索类型 */
    searchTypeList: [
        {
            label: '单号',
            value: 'ticketCode'
        },
    ],
    showButtons: {
        exportData: false,
    },
    kindList: [
        {
            label: '出库',
            value: 0
        },
        {
            label: '入库',
            value: 1
        }
    ],
    itypeList1: [
        {
            label: '采购入库',
            value: 1
        },
        {
            label: '调拨入库',
            value: 2
        },
        {
            label: 'FBA货件入库',
            value: 3
        },
        {
            label: '盘点入库',
            value: 4
        }
    ],
    itypeList0: [
        // {
        //     label: '订单出库',
        //     value: 1
        // },
        {
            label: '调拨出库',
            value: 2
        },
        {
            label: 'FBA出库',
            value: 3
        },
        {
            label: '盘点出库',
            value: 4
        },
        {
            label: 'FBA货件出库',
            value: 1
        }
    ],
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
    detail: {},
    detailItems: [],
    total: 0
}
const mutations = {
    GET_DATA: (state, data) => {
        state.total = data.total
        state.tableData = data.data
    },
    GET_CONTENT(state, data) {
        console.log(data)
        state.detail = data.detail
        state.detailItems = data.items
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
          if (res.code === 0) {
            commit('GET_DATA', res.data)
          }
        }).catch(err => {
          loadingClose()
        })
    },
    async exportData({}, params) {
        loading()
        await exportData(params).then(res => {
            loadingClose()
            downlaod(res, '出入库列表')
        }).catch(err => {
            loadingClose()
        })
    },
    async getContent({ commit }, { type, ticketCode }) {
        loading()
        await getContent({ type, ticketCode }).then(res => {
            loadingClose()
            if (res.code === 0) {
                commit('GET_CONTENT', res.data)
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