import { getFirstVessel } from "@/api/FBA";
import { getButtonList } from '@/api/permision' 
const state = {
  firstVesselTableData: [],
  total: "",
  tableSel: [],
  showButtons: {
    exportData: false,
  },
}
const mutations = {
  changeFirstVesselTableData(state, arg) {
    state.firstVesselTableData = arg.list
    state.total = arg.total * 1
  },
  changeTableSel(state, arg) {
    state.tableSel = arg
  },
  GET_BUTTON_LIST(state, list) {
    list.forEach(item => {
        state.showButtons[item.key] = true
    })
  }
}
const actions = {
  getFirstVesselTableData({ commit }, arg) {
    return new Promise((resolve, reject) => {
      getFirstVessel(arg).then(data => {

        if (data.code == 0) {
          commit("changeFirstVesselTableData", data.data)
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