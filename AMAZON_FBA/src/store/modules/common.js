/* 获取公共数据模块 */
import {
  getCommonData,
  getOAUserList,
  getOAUserToken,
  reqGetWareHouse,
  reqGetShopList,
  gettransitWarehoureList,
  reqGetArriveStatus,
  getStaffId,
  getAllShop,
  getStaffName
} from '@/api/common'
import { setCommonData, setSesstionToken, setStaffId, setStaffName } from '@/utils/auth'
import { loading, loadingClose } from '@/utils/common'
const state = {
  /* 仓库 */
  warehouseList: [],
  avatar: 'https://nterp.nantang-tech.com/assets/img/ERP_logo.b0309f53.png',
  /* 仓库类型 */
  warehouseTypeList: [],
  /* 采购单状态 */
  purchaseOrderList: [],
  /* 站点 */
  siteCodeList: [],
  /* 单据类型 */
  documentsTypeList: [],
  token: '',
  /* oa人员列表 */
  OAUserList: [],
  /* 店铺 */
  shopList: [],
  transitWarehoureList: [],
  /* 中转仓 */
  // 到货情况
  arriveStatus: [],
  /* 搜索类型 */
  searchList: [
  {
    label: '快递单号',
    value: 'shipNumber'
  },
  {
    label: '采购单号',
    value: 'purchaseId'
  },
  {
    label: '采购员',
    value: 'purchaser'
  }],
  allShopList: [],
  staffID: '',
  staffName: '',
  colorList: {
    1: {
      color: '#E6A23C',
      type: '待审核'
    },
    2: {
      color: '#F56C6C',
      type: '已审核'
    },
    3: {
      color: '#67C23A',
      type: '审核不通过'
    },
    4: {
      color: '#909399',
      type: '作废'
    }
  },
  4: {
    color: '#909399',
    type: '作废'
  },
  total: 0
};


const mutations = {
  GET_COMMON_DATA(state, data) {
    state.siteCodeList = data.SITE
    state.warehouseTypeList = data.WAREHOUSE_TYPE
  },
  SET_TOKEN(state, token) {
    state.token = token
    sessionStorage.setItem('OA-Token', token)
    // setSesstionToken(token)
  },
  GET_USER_LIST(state, list) {
    console.log(list)
    state.OAUserList = list
    console.log(state.OAUserList)
  },
  GET_WAREHOUSE_LIST(state, arg) { //虚拟仓列表
    state.warehouseList = arg
  },
  GET_SHOP_LIST(state, arg) { //店铺列表
    state.shopList = arg
  },
  //chang 到货情况
  GET_ARRIVE_STATUS(state, arg) {
    state.arriveStatus = arg
  },
  GET_TRANS_WAREHOURSE_LIST(state, data) {
    state.transitWarehoureList = data
  },
  GET_STAFFID(state, id) {
    state.staffID = id
  },
  GET_STAFFNAME(state, name) {
    sessionStorage.setItem('name', name)
    state.staffName = name
  },
  GET_ALL_SHOP(state, data) {
    state.allShopList = data
  }
};
const actions = {
  async getCommonData({ commit }) {
    await getCommonData().then(res => {
      commit('GET_COMMON_DATA', res.data)
      setCommonData(JSON.stringify(res.data))
    })
  },
  async getOAUserToken({ commit }, params) {
    await getOAUserToken(params).then(res => {
      commit('SET_TOKEN', res.data.authorization)
    })
  },
  async getOAUserList({ commit }, params) {
    // loading()
    await getOAUserList(params).then(res => {
      // loadingClose()
      commit('GET_USER_LIST', res.data.users)
    })
  },
  async getWarehouseList({ commit }, params) { //虚拟仓列表
    await reqGetWareHouse().then(data => {
      commit("GET_WAREHOUSE_LIST", data.data)
    })
  },
  async getShopList({ commit }, ) { //获取权限店铺列表
    await reqGetShopList().then(data => {
      commit("GET_SHOP_LIST", data.data)
    })
  },
  async getArriveStatus({ commit }, arg) { //到货情况
    await reqGetArriveStatus().then(data => {
      commit("GET_ARRIVE_STATUS", data.data)
    })
  },
  async gettransitWarehoureList({ commit }) {
    /* 中转仓 */
    await gettransitWarehoureList().then(res => {
      commit("GET_TRANS_WAREHOURSE_LIST", res.data)
    })
  },
  async getStaffId({ commit }) {
    await getStaffId().then(res => {
      commit('GET_STAFFID', res.data.staffId)
      setStaffId(JSON.stringify(res.data.staffId))
    })
  },
  async getStaffName({ commit }) {
    await getStaffName().then(res => {
      commit('GET_STAFFNAME', res.data.name)
      setStaffName(JSON.stringify(res.data.name))
    })
  },
  /* 获取所有店铺 */
  async getAllShop({ commit }) {
    await getAllShop().then(res => {
      commit('GET_ALL_SHOP', res.data)
    })
  }
}
export default {
  state,
  mutations,
  actions
}