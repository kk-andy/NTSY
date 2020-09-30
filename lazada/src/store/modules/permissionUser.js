import { getButtonList } from '@/api/permision'
import {
    getList,
    editEmployees,
    configurationPermission,
    exportData,
    getAssignAuth
} from '@/api/permissionUser'
import { downlaod } from '@/utils/common'
import { Message, Loading } from 'element-ui'
let loadingInstance
const state = {
    showButtons: {
        exportData: false,
        handeleEdit: false,
        configuration: false,
    },
    total: 0,
    departmentList: [],
    tableData: [],
    modal_edit: false,
    modal_configuration: false,
    roleID: '',
    engCode: '',
    note: '',
    roleList: []
}
const mutations = {
    GET_PRODUCT_BUTTON(state, res) {
        res.forEach(item => {
            state.showButtons[item.key] = true
        })
    },
    GET_LIST(state, res) {
        state.tableData = res.data.list
        state.departmentList = res.data.dept_list
        state.total = res.total
    },
    CLOSE_EDIT_MODAL(state) {
        state.modal_edit = false
        state.engCode = ''
        state.note = ''
    },
    CLOSE_CONFIG_MODAL(state) {
        state.modal_configuration = false
    },
    GET_TOLELIST(state, data) {
        state.roleList = data.roleList
        state.roleID = data.info.role_id
    }
}
const actions = {
    /* 获取按钮权限 */
    getButtonList({ commit }, query) {
        return new Promise((reslove, reject) => {
            getButtonList(query).then(res => {
                let list = []
                res.data.buttonList.forEach(item => {
                    list.push({
                        key: item.key
                    })
                })
                commit('GET_PRODUCT_BUTTON', list)
            })
        })
    },
    /* 获取列表 */
    getList({ commit }, query) {
        loadingInstance = Loading.service({ fullscreen: true, text: '拼命加载中', spinner: 'el-icon-loading', target: '.main-container' })
        return new Promise((reslove, reject) => {
            getList(query).then(res => {
                commit('GET_LIST', res)
                loadingInstance.close()
                reslove()
            }).catch(err => {
                loadingInstance.close()
            })
        })
    },
    /* 编辑员工资料 */
    editEmployees({ commit, dispatch }, { data, query }) {
        return new Promise((reslove, reject) => {
            editEmployees(data).then(res => {
                commit('CLOSE_EDIT_MODAL')
                dispatch('getList', query)
                reslove()
            }).catch(err => {
                reject(err)
            })
        })
    },
    /* 配置权限 */
    configurationPermission({ commit, dispatch }, { data, query }) {
        return new Promise((reslove, reject) => {
            configurationPermission(data).then(res => {
                commit('CLOSE_CONFIG_MODAL')
                dispatch('getList', query)
                reslove()
            }).catch(err => {
                reject(err)
            })
        })
    },
    exportData({ commit }, { data, devTime }) {
        return new Promise((reslove, reject) => {
            exportData(data).then(res => {
                downlaod(res, `商品中心人员${devTime}.xlsx`)
                Message({
                    message: '导出成功',
                    type: 'success'
                })
                reslove()
            })
        })
    },
    getAssignAuth({ commit }, query) {
        return new Promise((reslove, reject) => {
            getAssignAuth(query).then(res => {
                commit('GET_TOLELIST', res.data)
                reslove()
            })
        })
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}