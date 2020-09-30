import {
  reqGetSignDiffList,
  reqExportSignDiff
} from '@/api/Statement'
import { loading, loadingClose, downlaod, message } from '@/utils/common'
const state = {
  tableData: [],
  tableTotal: 0,
  tableSel: '',
  exportData: "", //导出bolb流

}
const mutations = {
  CHANGE_tableData(state, arg) {
    state.tableData = arg.list;
    state.tableTotal = arg.total
  },
  CHANGE_tableSel(state, arg) {
    if (arg.length > 1) {
      let data = "";
      arg.forEach((item, key) => {
        data += item.id + ",";
      });
      data = data.substring(0, data.length - 1);
      state.tableSel = data;
    } else {
      state.tableSel = arg;
    }


  },
  CHANGE_exportData(state, arg) {
    state.exportData = arg
  }
}
const actions = {
  getSignDiffList({ commit }, arg) {
    loading()
    reqGetSignDiffList(arg)
      .then(data => {
        loadingClose()
        if (data.code == 0) {
          commit("CHANGE_tableData", data.data)
        }
      })
      .catch(() => {
        loadingClose()
      })
  },
  getExportData({ commit, state }, arg) {
    if (!state.tableSel) {
      message('error', '请先进行选择')
      return false
    }
    loading;
    reqExportSignDiff({ id: state.tableSel })
      .then(data => {
        loadingClose()
        commit('CHANGE_exportData', data)
        downlaod(data, '签收差异报表')
      })
      .catch(() => {
        loadingClose()
      })

  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}