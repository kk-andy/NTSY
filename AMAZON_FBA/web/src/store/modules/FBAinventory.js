import { getData, exportData } from '@/api/FBAinventory'
import { getRoleList } from '@/api/shopPermissionSetting'
import { getButtonList } from '@/api/permision' 
import { downlaod, message, loading, loadingClose } from '@/utils/common'
const state = {
    searchList: [
        {
            label: 'SKU',
            value: 'sku'
        },
        {
            label: 'MSKU',
            value: 'm_sku'
        },
        {
            label: 'FNSKU',
            value: 'fn_sku'
        },
        {
            label: 'ASIN',
            value: 'asin'
        }
    ],
    showButtons: {
        exportData: false,
    },
    tableData: [],
    total: 0
}
const mutations = {
    GET_DATA(state, data) {
        console.log(data.list)
        state.tableData = data.list
        state.total = data.total
    },
    GET_BUTTON_LIST(state, list) {
        list.forEach(item => {
            state.showButtons[item.key] = true
        })
    }
}
const actions = {
    async getList({ commit }, params) {
        loading()
        await getData(params).then(res => {
            loadingClose()
            commit('GET_DATA', res.data)
        }).catch(err => {
            loadingClose()
        })
    },
    async exportData({  }, params) {
        loading()
        await exportData(params).then(res => {
            loadingClose()
            // commit('CHANGE_EXPORT_NUM', 0)
            // commit('CLOSE_EXPORT_MODAL', false)
            downlaod(res, '库位导出')
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