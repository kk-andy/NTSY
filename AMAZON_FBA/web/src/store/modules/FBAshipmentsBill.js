import { reqGetShipmentsBill } from "@/api/FBA";
import { getButtonList } from '@/api/permision'
import { reject } from "core-js/fn/promise";
const state = {
  tableData: [],
  tableSel: [], //table选中项
  tableTotal: "", //条数
  showButtons: {
    exportData: false,
    importData: false,
    saveFBAinfo: false
  },
}
const mutations = {
  cahngeTableData(state, arg) {
    state.tableData = arg
  },
  //改变table选中项
  changeTableSel(state, arg) {
    state.tableSel = arg
  },
  changeTableTotal(state, arg) {
    state.tableTotal = arg
  },
  GET_BUTTON_LIST(state, list) {
    list.forEach(item => {
      state.showButtons[item.key] = true
    })
  }
}
const actions = {
  getTableData({ commit }, arg) {
    return new Promise((resolve, reject) => {
      reqGetShipmentsBill(arg).then(data => {
        if (data.code == 0) {
          // console.log(data)
          commit("cahngeTableData", data.data.list)
          commit("changeTableTotal", data.data.total)
          resolve()
        } else {
          reject(data.msg)
        }
      }).catch((err) => {
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