import { reqGetReplenishmentPlan, reqExportReplenishmentPlan, reqGetOAUserList, reqGetShipmentsInfo, reqGetLogistics } from "@/api/FBA"
import { loading, loadingClose, message } from '@/utils/common'
import { getButtonList } from '@/api/permision'
// import { getOAUserList } from "@/api/common"
const state = {
  //OA 人员列表
  // OAUserList: [],
  //运输方式
  Logistics: [],
  //补货计划tableData
  replenishmentPlanTableData: [],
  //补货单文件流
  replenishmentPlanFlow: "",
  //补货计划单总条数
  replenishmentTotal: 0,
  //补货单table批量选择
  replenishmintSelVal: [],

  //新发货计划 发货详情 tableData
  shipmentsInfo: [],
  //新发货计划 plan——id
  plan_id: "",
  //新发货计划shop
  shop_id: "",
  shop_name: "",
  //新发货计划 table批量选择
  newShipmentsSelVal: [],
  showButtons: {
    exportData: false,

  },

}
const mutations = {
  //change补货计划单
  changeReTableData(state, arg) {
    state.replenishmentPlanTableData = arg
  },
  //change计划单总条数
  changeReplenishmentTotal(state, arg) {
    state.replenishmentTotal = arg
  },
  //change补货单文件流
  changeReplenishmentFlow(state, arg) {
    state.replenishmentPlanFlow = arg
  },
  //改变补货单table批量选择
  changeReplenishmentSelVal(state, arg) {
    state.replenishmintSelVal = arg
  },
  //OA 人员列表
  // changeOAUserList(state, arg) {
  //   state.OAUserList = arg
  // },
  //运输方式
  cahngeLogistics(state, arg) {
    state.Logistics = arg
  },
  //补货计划的发货计划详情
  changeShipmentsInfo(state, arg) {
    state.shipmentsInfo = arg
  },
  //plan_id
  changePlanId(state, arg) {
    state.plan_id = arg
  },
  changeShop(state, arg) {
    state.shop_id = arg.shop_id;
    state.shop_name = arg.shop_name
  },
  //新发货计划批量
  changeNewShipmentsSelVal(state, arg) {
    state.newShipmentsSelVal = arg
  },
  GET_BUTTON_LIST(state, list) {

    list.forEach(item => {
      state.showButtons[item.key] = true
    })
  }

}
const actions = {
  //补货单获取
  getReplenishmentPlan({ commit }, arg) {
    return new Promise((resolve, reject) => {
      reqGetReplenishmentPlan(arg).then(data => {
        if (data.code == 0) {
          commit("changeReTableData", data.data.list);
          commit("changeReplenishmentTotal", data.data.total)
          resolve()
        }
      })
    })

  },
  //补货单流
  getReplenishmentFlow({ commit }, arg) {
    return new Promise(resolve => {
      reqExportReplenishmentPlan(arg).then(data => {
        commit("changeReplenishmentFlow", data)
        resolve()
      })
    })
  },
  //获取 OA人员列表
  // getOAUserList({ commit }, arg) {
  //   return new Promise((resolve, reject) => {
  //     reqGetOAUserList(arg).then(data => {
  //       resolve()
  //       commit("changeOAUserList", data.data)
  //     })
  //   })
  // },
  //获取运输方式
  getLogistics({ commit }, arg) {
    reqGetLogistics().then(data => {
      commit("cahngeLogistics", data.data)
    })
  },
  //获取补货计划的发货详情
  getShipmentsInfo({ commit }, arg) {
    return new Promise((resolve, reject) => {
      reqGetShipmentsInfo({ plan_id: arg }).then(data => {
        commit("changeShipmentsInfo", data.data.sku_list)
        commit("changePlanId", data.data.plan_id)
        commit("changeShop", { shop_id: data.data.shop_id, shop_name: data.data.shop_name })
        resolve()
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