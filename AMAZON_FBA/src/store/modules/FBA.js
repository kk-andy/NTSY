import { reqGetSite, reqGetShop, reqGetOAUserList, reqGetCarrier } from "@/api/FBA"
import { reqGetShopList } from "@/api/common"
const state = {
  site: [],
  shop: [],
  //OA 人员列表
  OAUserList: [],
  carriers: [] //物流承运商
}
const mutations = {
  changeSite(state, arg) {
    state.site = arg
  },
  changeShop(state, arg) {
    state.shop = arg
  },
  //OA 人员列表
  changeOAUserList(state, arg) {
    state.OAUserList = arg
  },
  //物流承运商
  changeCarriers(state, arg) {
    state.carriers = arg
  }
}
const actions = {
  async getSite({ commit }, arg) {
    await reqGetSite().then(data => {
      if (data.code == 0) {
        commit("changeSite", data.data)
      }
    })
  },
  async getShop({ commit }, arg) {
    // await reqGetShop().then(data => {
    await reqGetShopList().then(data => {
      if (data.code == 0) {
        commit("changeShop", data.data)
      }
    })
  },
  //获取 OA人员列表
  getOAUserList({ commit }, arg) {
    return new Promise((resolve, reject) => {
      reqGetOAUserList(arg).then(data => {
        resolve()
        commit("changeOAUserList", data.data)
      })
    })
  },
  //获取物流承运商
  getCarries({ commit }, arg) {
    reqGetCarrier().then(data => {
      if (data.code == 0) {
        commit("changeCarriers", data.data)
      }
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}