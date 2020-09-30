import { getData, addTemplate, getTemplateInfo, saveTemplate } from '@/api/descriptionTemplate'
import { getButtonList } from '@/api/permision'
// import {  Loading } from 'element-ui'
import { loading, loadingClose } from '@/utils/common';
// let loadingInstance
const state = {
    modal_template: false,
    total: 0,
    logTotal: 0,
    tableData: [{}],
    templateTitle: '新增模板',
    templateName: '',
    associatedShop: '',
    richTextContent: '',
    showButtons: {
        edit: false,
        addTemplate: false
    },
}
const mutations = {
    GET_DATA_LIST(state, list) {
        state.tableData = list.data
        state.total = list.total
    },
    CLOSE_MODAL(state, _this) {
        state.modal_template = false
        state.richTextContent = null
        state.templateName = null
        state.associatedShop = null
        _this.$refs.content.setContent('')
    },
    GET_TEMPLATE_INFO(state, { data, _this }) {
        state.modal_template = true
        state.templateName = data.template_name
        state.richTextContent = data.template_info
        state.associatedShop = data.shop_id
        _this.$refs.content.setContent(data.template_info)
    },
    GET_BUTTON_LIST(state, list) {
        list.forEach(item => {
            state.showButtons[item.key] = true
        })
    }
}
const actions = {
    async getData({ commit }, params) {
        // loadingInstance = Loading.service({ fullscreen: true, text: '拼命加载中', spinner: 'el-icon-loading', target: '.main-container' })
        loading()
        await getData(params).then(res => {
            try {
                // loadingInstance.close()
                loadingClose()
                commit('GET_DATA_LIST', res.data.list)
            } catch(err) {
                // loadingInstance.close()
                loadingClose()
                throw new Error(err)
            }
        }).catch(err => {
            // loadingInstance.close()
            loadingClose()
        })
    },
    async addTemplate({ commit, dispatch }, { data, params, _this }) {
        await addTemplate(data).then(res => {
            try {
                console.log(res)
                dispatch('getData', params)
                commit('CLOSE_MODAL', _this)
            } catch(err) {
                loadingInstance.close()
                throw new Error(err)
            }
        })
    },
    async getTemplateInfo({ commit }, { id, _this }) {
        // loadingInstance = Loading.service({ fullscreen: true, text: '拼命加载中', spinner: 'el-icon-loading', target: '.main-container' })
        loading()
        await getTemplateInfo({ id }).then(res => {
            try {
                // loadingInstance.close()
                loadingClose()
                let data = res.data
                commit('GET_TEMPLATE_INFO', { data, _this })
            } catch(err) {
                // loadingInstance.close()
                loadingClose()
            }
        })
    },
    async saveTemplate({ commit, dispatch }, { data, params, _this }) {
        await saveTemplate(data).then(res => {
            try {
                console.log(res)
                dispatch('getData', params)
                commit('CLOSE_MODAL', _this)
            } catch(err) {
                loadingInstance.close()
                throw new Error(err)
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
    mutations,
    actions,
    state
}