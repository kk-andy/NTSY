import {
    getList,
} from '@/api/abnormalFile'
import { Message, Loading } from 'element-ui'
import { getButtonList } from '@/api/permision'
let loadingInstance
const state = {
    tableData:[
        {
            dept_name: "5456",
            last_month_sales: "1794-08-06",
            month_budget: "草稿",
            time: "类型",
            month_used_budget: "项目",
            froze_amount: "需求甲",
            month_left_budget: "需求甲",
          },
    ],
    total:10,
    showButtons: {
        submitFail_cha: false,
        submitFail_eng: false
    }
}
const mutations = {
    GET_LIST(state, res){
        state.tableData = res.data
    },
    // 获取按钮
    GET_PRODUCT_BUTTON(state, res) {
        res.forEach(item => {
            state.showButtons[item.key] = true
        })
    }
}
const actions = {
    getList({ commit }) {
        loadingInstance = Loading.service({ fullscreen: true, text: '拼命加载中', spinner: 'el-icon-loading', target: '.main-container' })
        return new Promise((reslove, reject) => {
            getList().then(response => {
                commit('GET_LIST', response)
                loadingInstance.close()
                reslove()
            }).catch(err => {
                loadingInstance.close()
                reject(err)
            })
        })
    },
    getEngList({ commit }) {
        return new Promise((reslove, reject) => {
            getEngList().then(response => {
                commit('GET_ENG_WORD', response)
                reslove()
            }).catch(err => {
                reject(err)
            })
        })
    },
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
    }
}
export default {
    namespaced: true,
    mutations,
    actions,
    state
}