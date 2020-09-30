
import { getPurchaseOrderList, getPurchaseOrderDetail, generatePurchaseIn } from '@/api/Procurementorder'
import { loading, loadingClose, message } from '@/utils/common'
import { getButtonList } from '@/api/permision' 
import router from '@/router'
const state = {
    tableData: [
    ],
    total: 0,
    detail: {},
    detailItems: [],
    showButtons: {
      generateorder: false
    },
    GET_BUTTON_LIST(state, list) {
      list.forEach(item => {
          state.showButtons[item.key] = true
      })
    },
    PurchaseorderList: [
      {
        label: '尚未入库',
        value: 1
      },
      {
        label: '部分到货',
        value: 2
      },
      {
        label: '完全到货',
        value: 3
      }
    ]
}
const mutations = {
  GET_DATA: (state, data) => {
    state.total = data.total
    state.tableData = data.data
  },
  GET_BUTTON_LIST(state, list) {
    list.forEach(item => {
        state.showButtons[item.key] = true
    })
  },
  GET_DATA_DETAIL: (state, data) => {
    console.log(data.detail)
    state.detail = data.detail
    data.items.forEach(item => {
      item.count = ''
    })
    state.detailItems = data.items
  }
}
const actions = {
  async getPurchaseOrderList({ commit }, params) {
    loading()
    await getPurchaseOrderList(params).then(res => {
      loadingClose()
      if (res.code === 0) {
        commit('GET_DATA', res.data)
      }
    }).catch(err => {
      loadingClose()
    })
  },
  async getPurchaseOrderDetail({ commit }, params) {
    loading()
    await getPurchaseOrderDetail(params).then(res => {
      loadingClose()
      if (res.code === 0) {
        console.log(res)
        commit('GET_DATA_DETAIL', res.data)
      }
    }).catch(err => {
      loadingClose()
    })
  },
  async generatePurchaseIn({}, data) {
    loading()
    await generatePurchaseIn(data).then(res => {
      loadingClose()
      if (res.code === 0) {
        message('success', '生成入库单成功')
        router.push({
          name: 'PutInStorageOrder'
        })
      } else {
        message('error', res.msg)
      }
    }).catch(err => {
      loadingClose()
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
