import { getButtonList } from '@/api/permision'
import {
    getList,
    deleteData,
    getPermissonsList,
    addRole,
    editRole,
    editRoleSubmit
} from '@/api/permissionRole'
import { Message, Loading } from 'element-ui'
import router from '@/router'
let loadingInstance
const state = {
    showButtons: {
        handleEdit: false,
        delete_single: false,
        add: false
    },
    tableData: [],
    total: 0,
    permisionsList: [],
    editPermissionList: [],
    checkList: []
}
const mutations = {
    GET_PRODUCT_BUTTON(state, res) {
        res.forEach(item => {
            state.showButtons[item.key] = true
        })
    },
    GET_LIST(state, res) {
        state.tableData = res.data.list
        state.total = res.total
    },
    GET_PERMISSIONS_LIST(state, res) {
        res.data.deptList.forEach(item => {
            item.label = item.title
            item.children.forEach(element => {
                element.label = element.title
                if (element.children) {
                    element.children.forEach(son => {
                        son.label = son.title
                        if (son.children) {
                            son.children.forEach(grandson => {
                                grandson.label = grandson.title
                            })
                        }
                    })
                }
            })
        })
        state.permisionsList = res.data.deptList
    },
    GET_EDIT_PERMISSION(state, res) {
        let list = []
        res.data.deptList.forEach(item => {
            item.label = item.title
            if (item.checked) {
                list.push(item.id)
            }
            item.children.forEach(element => {
                element.label = element.title
                if (element.checked) {
                    list.push(element.id)
                }
                if (element.children) {
                    element.children.forEach(son => {
                        if (son.checked) {
                            list.push(son.id)
                        }
                        son.label = son.title
                        if (son.children) {
                            son.children.forEach(grandson => {
                                if (grandson.checked) {
                                    list.push(grandson.id)
                                }
                                grandson.label = grandson.title
                            })
                        }
                    })
                }
            })
        })
        console.log(list)
        state.checkList = list
        console.log(state.checkList)
        state.editPermissionList = res.data.deptList
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
    getList({ commit }, query) {
        loadingInstance = Loading.service({ fullscreen: true, text: '拼命加载中', spinner: 'el-icon-loading', target: '.main-container' })
        return new Promise((reslove, reject) => {
            getList(query).then(res => {
                commit('GET_LIST', res)
                loadingInstance.close()
                reslove()
            }).catch(err => {
                loadingInstance.close()
                reject(err)
            })
        })
    },
    deleteData({ dispatch }, { data, query }) {
        return new Promise((reslove, reject) => {
            deleteData(data).then(res => {
                dispatch('getList', query)
                reslove()
            }).catch(err => {
                reject(err)
            })
        })
    },
    getPermissonsList({ commit }) {
        return new Promise((reslove, reject) => {
            getPermissonsList().then(res => {
                commit('GET_PERMISSIONS_LIST', res)
                reslove()
            }).catch(err => {
                reject(err)
            })
        })
    },
    addRole({}, data) {
        return new Promise((reslove, reject) => {
            addRole(data).then(res => {
                Message({
                    message: '添加成功',
                    type: 'success'
                })
                router.push({ name: 'Role' })
            })
        })
    },
    editRole({ commit }, query) {
        return new Promise((reslove, reject) => {
            editRole(query).then(res => {
                commit('GET_EDIT_PERMISSION', res)
            })
        })
    },
    editRoleSubmit({}, data) {
        return new Promise((reslove, reject) => {
            editRoleSubmit(data).then(res => {
                Message({
                    message: '修改成功',
                    type: 'success'
                })
                router.push({ name: 'Role' })
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