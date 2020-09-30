import { getDevelperList } from '@/api/ListOfSelections'
import { resolve, reject } from 'core-js/fn/promise'
const state = {
    develperList: []
}
const mutations = {
    GET_DEVELOPER_LIST(state, data) {
        state.develperList = data
    }
}
const actions = {
    getDevelperList({ commit }) {
        return new Promise((resolve, reject) => {
            getDevelperList().then(res => {
                commit('GET_DEVELOPER_LIST', res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}