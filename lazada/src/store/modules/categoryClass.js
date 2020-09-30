    import {
        getList,
        getCateList,
        getCteatorList,
    } from '@/api/categoryClass'
    import { getButtonList } from '@/api/permision'
    import {  Loading } from 'element-ui'
    let loadingInstance
    const state = {
        tableData: [],
        cate_list: [],
        total: 0,
        creatorList: [],
        showButtons: {
            addAapping: false,
            deleteContent: false
        },
        categoryList: [
            {
                prodductClassId: '',
                productId: '',
                companyClassList: []
            },
            {
                prodductClassId: '',
                productId: '',
                companyClassList: []
            },
            {
                prodductClassId: '',
                productId: '',
                companyClassList: []
            },
        ],
    }
    const mutations = {
        GET_LIST(state, res) {
            state.tableData = res.data.data
            state.total = res.data.total
        },
        GET_CATE_LIST(state, res) {
            state.cate_list = res.data
        },
        GET_CREATORLIST(state, res) {
            // console.log(res)
            state.creatorList = res.data
        },
        GET_BUTTON_LIST(state, list) {
            list.forEach(item => {
                state.showButtons[item.key] = true
            })
        }
    }
    const actions = {
        getList({ commit }, query) {
            loadingInstance = Loading.service({ fullscreen: true, text: '拼命加载中', spinner: 'el-icon-loading', target: '.main-container' })
            return new Promise((resolve, reject) => {
                getList(query).then(res => {
                    loadingInstance.close()
                    commit('GET_LIST', res)
                }).catch(err => {
                    loadingInstance.close()
                    reject(err)
                })
            })
        },
        getCateList({ commit }) {
            return new Promise((resolve, reject) => {
                getCateList().then(res => {
                    commit('GET_CATE_LIST', res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        getCteatorList({ commit }) {
            return new Promise((resolve, reject) => {
                getCteatorList().then(res => {
                    commit('GET_CREATORLIST', res)
                }).catch(err => {
                    reject(err)
                })
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