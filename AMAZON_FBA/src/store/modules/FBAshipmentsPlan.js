import { reqGetShipmentsPlan, reqGetShipmentDetail, reqGetLogistics, addUpdateShipmentsPlan, deleteShipmentsPlan } from "@/api/FBA"
import { getButtonList } from '@/api/permision'
import { reject } from "core-js/fn/promise"
import { Promise } from "jszip/lib/external"
const state = {
  //发货计划table
  shipmentsPlanTableData: [],
  //发货计划table 总数
  shipmentsPlanTableDataTotal: "",
  //判断新增发货 or 编辑发货计划  0：新增 1：编辑
  editType: 6,
  //发货详情table 编辑发货计划table 新增发货计划table
  shipmentsDetailTableData: {},
  //添加发货计划跳转的缓存
  insertShipmentPlanArg: {
    shop_id: "",
    warehouse_id: "",
    shipping_type_id: "",
    remark: "",
    estimate_at: ""
  },
  showButtons: {
    addPlan: false,
    createData: false,
    printPlan: false,
    printLabel: false,
    printBill: false,
    editPlan: false,
    deletePlan: false,

  },
  //发货计划单批量选中
  shipmentsPlanVal: "",
  //用户手动添加批量选中
  insertFromUserValue: [],
  //运输方式
  transportType: [],

}
const mutations = {
  changeShipmentsPlanTable: (state, data) => {
    state.shipmentsPlanTableData = data
  },
  changeShipmentsPlanTableDataTotal(state, data) {
    state.shipmentsPlanTableDataTotal = data
  },
  changeShipmentsDetailTableData(state, data) {
    state.shipmentsDetailTableData = data
  },
  //前端改变店铺
  changeTableShop(state, arg) {
    state.shipmentsDetailTableData.shop_id = arg
  },
  //改变editType
  changeEditType(state, data) {
    state.editType = data
  },
  //添加发货计划的缓存
  saveInsertStatus(state, data) {
    state.insertShipmentPlanArg = data
  },

  //用户手动选中
  changeInsertFromUserValue(state, arg) {
    state.insertFromUserValue = arg
  },
  //--------------------

  changeShipmentsPlanVal(state, arg) {
    state.shipmentsPlanVal = arg
  },
  changeTransportType(state, arg) {
    state.transportType = arg
  },
  GET_BUTTON_LIST(state, list) {
    list.forEach(item => {
      state.showButtons[item.key] = true
    })
  }
}
const actions = {
  getShipmentsPlanTable({ commit }, arg) {
    return new Promise((resolve, reject) => {
      reqGetShipmentsPlan(arg).then(data => {
        if (data.code == 0) {
          commit("changeShipmentsPlanTable", data.data.list)
          commit("changeShipmentsPlanTableDataTotal", data.data.total)
          resolve()
        } else {
          reject()
        }

      })
    })
  },
  getShipmentsDetail({ commit }, arg) {
    return new Promise((resolve, reject) => {
      reqGetShipmentDetail({ shipment_id: arg }).then(data => {

        if (data.code == 0) {
          commit("changeShipmentsDetailTableData", data.data);
          resolve()
        }
      })
    })
  },
  async getTransportType({ commit }, arg) {
    await reqGetLogistics().then(data => {
      if (data.code == 0) {
        commit("changeTransportType", data.data)
      }
    })
  },
  //发货计划详情编辑部分 数据整合
  changeShipmentsDetailEdit({ state }, { arg, type }) {

    //type:1编辑 2删除
    if (type == 1) {
      return new Promise((resolve, reject) => {

        // if (arg.shipment_id == state.shipmentsDetailTableData.id) { //预防id不匹配
        state.shipmentsDetailTableData.shipment_id = state.shipmentsDetailTableData.id
        state.shipmentsDetailTableData.remark = arg.remark ? arg.remark : state.shipmentsDetailTableData.remark
        state.shipmentsDetailTableData.shipping_type_id = arg.shipping_type_id ? arg.shipping_type_id : state.shipmentsDetailTableData.shipping_type_id
        state.shipmentsDetailTableData.shop_id = arg.shop_id ? arg.shop_id : state.shipmentsDetailTableData.shop_id
        state.shipmentsDetailTableData.warehouse_id = arg.warehouse_id ? arg.warehouse_id : state.shipmentsDetailTableData.warehouse_id

        arg.items.forEach((item, key) => {
          if (item[0]) {
            state.shipmentsDetailTableData.items[key].plan_num = item[0]
          } else {
            state.shipmentsDetailTableData.items[key].plan_num = 0
          }

          if (item[1]) {
            state.shipmentsDetailTableData.items[key].remark = item[1]
          }
        })

        addUpdateShipmentsPlan(state.shipmentsDetailTableData)
          .then(data => {
            resolve()
            if (data.code == 0) {
              resolve()
            } else {
              reject()
            }
          })
          .catch(() => { reject() })
        // } else {
        //   reject()
        // }
      })
    } else if (type == 2) {
      // return new Promise((resolve, reject) => {
      state.shipmentsDetailTableData.items.splice(arg, 1)

    }


  },
  //手动添加商品

  insertToShipmentsDetailTable({ state }, data) {
    // return new Promise((resolve, reject) => {
    //没有商品时添加进行的初始化
    if (!state.shipmentsDetailTableData.items) {
      state.shipmentsDetailTableData.items = []
    }
    data.forEach(item => {

      state.shipmentsDetailTableData.items.unshift(item)
    })
    // console.log(state.shipmentsDetailTableData)

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