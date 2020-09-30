import { loading, loadingClose, message  } from '@/utils/common'
import { getButtonList } from '@/api/permision'
import { getData, getLogList, updateSynchronous, publishRecordUpdate } from '@/api/listOfPublicationRecords'
import router from '@/router'
const state = {
    modal_operationlog: false,
    total: 0,
    logTotal: 0,
    operationLogList: [],
    tableData: [],
    push_sourceList: [
        {
            label: '选品刊登',
            value: 0
        },
        {
            label: '复制刊登',
            value: 1
        }
    ],
    showButtons: {
        allSynchronous: false,
        edit: false,
        synchronous: false,
        log: false
    },
}
const mutations = {
    GET_DATA(state, data) {
        state.tableData = data.product_list.data
        state.total = data.product_list.total
    },
    GET_LOG_LIST(state, data) {
        state.modal_operationlog = true
        state.operationLogList = data.list
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
            commit('GET_DATA',res.data)
        }).catch(err => {
            loadingClose()
        })
    },
    async getLogList({ commit }, params) {
        await getLogList(params).then(res => {
            commit('GET_LOG_LIST',res.data)
        }).catch(err => {

        })
    },
    async updateSynchronous({ dispatch }, { data, params }) {
        await updateSynchronous(data).then(res => {
            if (res.code === 0) {
                message('success', res.msg)
                dispatch('getData', params)
            }
        }).catch(err => {

        })
    },
    async publishRecordUpdate({}, data) {
        loading()
        await publishRecordUpdate(data).then(res => {
            if (res.code === 0) {
                loadingClose()
                router.push({
                    name: 'ListOfPublicationRecords'
                })
            } else {
                loadingClose()          
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
    mutations,
    actions,
    state
}