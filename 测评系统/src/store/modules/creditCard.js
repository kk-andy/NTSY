//信用卡库button
import {
    getButtonList
} from '@/api/permision'
const state = {
    showButtons: {
        search: false,
        insert: false,
        importBtn: false,
        exportBtn: false,
    },
}
const mutations = {
    GET_BUTTON_LIST(state, list) {
        list.forEach(item => {
            state.showButtons[item.key] = true
        })
    }
}
const actions = {
    async getButtonList({
        commit
    }, params) {
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
};
