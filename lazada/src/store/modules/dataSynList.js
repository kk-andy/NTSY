import { getData, batchSync } from '@/api/dataSynList'
import { getButtonList } from '@/api/permision'
import { loading, loadingClose } from '@/utils/common'
const state = {
    modal_operationlog: false,
    modal_release: false,
    releaseTime: '',
    total: 0,
    logTotal: 0,
    tableData: [],
    showButtons: {
        allAgainSynchronous: false,
        againSynchronous: false
    },
    syncStatusList: [
        {
            name: '待同步',
            value: 0
        },
        {
            name: '同步成功',
            value: 1
        },
        {
            name: '同步失败',
            value: 2
        }
    ]
}
const mutations = {
    GET_DATA(state, data) {
        state.tableData = data.list.data
        state.total = data.list.total
    },
    GET_BUTTON_LIST(state, list) {
        list.forEach(item => {
            state.showButtons[item.key] = true
        })
    }
}
const actions = {
    async getData({ commit }, data) {
        loading()
        await getData(data).then(res => {
            loadingClose()
            commit('GET_DATA',res.data)
        }).catch(err => {
            loadingClose()
        })
    },
    async batchSync({ dispatch }, { data, params }) {
        loading()
        await batchSync(data).then(res => {
            if (res.code === 0) {
                loadingClose()
                dispatch('getData', params)
            }
            loadingClose()
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
    mutations,
    actions,
    state
}