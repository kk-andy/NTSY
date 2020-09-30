    import {
        getList,
        getCateList,
        getCteatorList,
    } from '@/api/categoryClass'
    import { resolve, reject } from 'core-js/fn/promise'

    const state = {
        tableData: [],
        cate_list: [],
        total: 0,
        creatorList: []
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
        }
    }
    const actions = {
        getList({ commit }, query) {
            return new Promise((resolve, reject) => {
                getList(query).then(res => {
                    commit('GET_LIST', res)
                }).catch(err => {
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
        }
    }
    export default {
        namespaced: true,
        state,
        mutations,
        actions
    }