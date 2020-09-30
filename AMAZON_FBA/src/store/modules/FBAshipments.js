import { getShipments } from "@/api/FBA"
import { getButtonList } from '@/api/permision'
const state = {
  shipmentsTable: [], //首页table
  shipmentsTableTotal: "", //首页table总数
  showButtons: {
    manualSync: false,
    printPlan: false,
    invalid: false,
    uploadLog: false,
    uploadBox: false,
    printTitle: false,
    sign: false
  },

}
const mutations = {
  changeShipmentsTable(state, arg) {
    state.shipmentsTable = arg
  },
  changeShipmentsTableTotal(state, arg) {
    state.shipmentsTableTotal = arg
  },
  GET_BUTTON_LIST(state, list) {
    list.forEach(item => {
      state.showButtons[item.key] = true
    })
  }
}
const actions = {
  getShipmentsTable({ commit }, arg) {
    return new Promise((resolve, reject) => {
      getShipments(arg).then(data => {
        if (data.code == 0) {
          commit("changeShipmentsTable", data.data.list)
          commit("changeShipmentsTableTotal", data.data.total)
          resolve()
        } else {
          reject(data.msg)
        }
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