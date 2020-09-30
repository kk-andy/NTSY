import { loading, loadingClose, message } from '@/utils/common';
import { 
    getData, 
    changePrice, 
    changeStock, 
    changeSpecialPrice, 
    getLog, 
    listingActive, 
    listingInactive, 
    listingDelete,
    allChangePrice,
    allChangeStock,
    allChangeSpecialPrice,
    updateListingInfo,
    singleSkuShelves,
    singleSkuOffShelf,
    singleSkuDelete,
    gloabUpdateSave,
    batchCopy
} from '@/api/listingList'
import { getButtonList } from '@/api/permision'
import router from '@/router'
const state = {
    modal_operationlog: false,
    modal_offShelf: false,
    total: 0,
    logTotal: 0,
    tableData: [],
    showBatchEditPopup: false,
    showButtons: {
        allShelves: false,
        showCheckAll: false,
        allOffShelf: false,
        allDelete: false,
        allChangePrice: false,
        allChangeStock: false,
        allChangeSalesPrice: false,
        log: false,
        edit: false,
        offShelf: false,
        shelves: false,
        deleteContent: false,
        copyOperation: false
    },
    copyShop: '',
    modal_copyShop: false,
    is_global: 1,
    operationLogList: [],
    recordCurrent: {},
    priceOptions: [{
            id: 0,
            val: "修改为固定价格"
        },
        {
            id: 1,
            val: "原价格基础上增加"
        },
        {
            id: 2,
            val: "原价格基础上减少"
        },
        {
            id: 3,
            val: "原价格乘以百分比"
        }
    ],
    inStockOptions: [{
            id: 0,
            val: "修改为固定库存数量"
        },
        {
            id: 1,
            val: "原库存数量上增加"
        },
        {
            id: 2,
            val: "原库存数量上减少"
        }
    ],
    timeList: [{
            label: '拉取时间',
            value: 'updated_at'
        },
        {
            label: '刊登时间',
            value: 'created_at'
        }
    ]
}
const mutations = {
    GET_DATA(state, data) {
        state.total = data.total
        data.data.forEach(item => {
            item.priceArr = []
            item.isStockArr = []
            item.specialPriceArr = []
            item.skuList = []
            for (const key in item.newquantity) {
                const e = item.newquantity[key];
                item.isStockArr.push({ sku: key, isStock: e[0], status: e[1] });
            }
            for (const key in item.newprice) {
                if (item.newprice.hasOwnProperty(key)) {
                    const e = item.newprice[key];
                    item.priceArr.push({ sku: key, price: e[0], status: e[1] });
                }
            }
            for (const key in item.newspecial) {
                if (item.newspecial.hasOwnProperty(key)) {
                    const e = item.newspecial[key];
                    item.specialPriceArr.push({ sku: key, price: e[0], status: e[1] });
                }
            }
            for (const key in item.newsku) {
                if (item.newsku.hasOwnProperty(key)) {
                    const e = item.newsku[key];
                    item.skuList.push({ sku: key, status: e });
                }
            }
            console.log(item.specialPriceArr)
          });
        state.tableData = data.data
        console.log( state.tableData,88888)
    },
    GET_LOG(state, data) {
        state.modal_operationlog = true
        state.operationLogList = data
        console.log(data)
    },
    GET_BUTTON_LIST(state, list) {
        list.forEach(item => {
            state.showButtons[item.key] = true
        })
    },
    CLOSE_MODAL(state) {
        state.copyShop = ''
        state.modal_copyShop = false
        state.is_global = 1
        state.showBatchEditPopup = false
    },
    CloseCopyModal(state) {
        state.copyShop = ''
        state.modal_copyShop = false
        state.is_global = 1
    }
}
const actions = {
    async getData({ commit }, params) {
        loading()
        await getData(params).then(res => {
            try {
                loadingClose()
                commit('GET_DATA', res.data.list)
            } catch {
                loadingClose()
            }
        }).catch(err => {
            loadingClose()
        })
    },
    async changePrice({}, data) {
        await changePrice(data).then(res => {
            if (res.code === 0) {
                message('success', res.msg)
            }
            // message('success', res.data.msg)
        }).catch(err => {

        })
    },
    async changeStock({}, data) {
        await changeStock(data).then(res => {
            if (res.code === 0) {
                message('success', res.msg)
            }
        }).catch(err => {

        })
    },
    async changeSpecialPrice({}, data) {
        await changeSpecialPrice(data).then(res => {
            if (res.code === 0) {
                message('success', res.msg)
            }
        }).catch(err => {

        })
    },
    async getLog({ commit }, params) {
        loading()
        await getLog(params).then(res => {
            loadingClose()
            commit('GET_LOG', res.data.list)
        }).catch(err => {
            loadingClose()
        })
    },
    async listingActive({ dispatch }, { data, params }) {
        loading()
        await listingActive(data).then(res => {
            loadingClose()
            if (res.code === 0) {
                message('success', res.msg)
                dispatch('getData', params)
            }
        }).catch(err => {
            loadingClose()
        })
    },
    async listingInactive({ dispatch }, { data, params }) {
        loading()
        await listingInactive(data).then(res => {
            loadingClose()
            if (res.code === 0) {
                message('success', res.msg)
                dispatch('getData', params)
            }
        }).catch(err => {
            loadingClose()
        })
    },
    async listingDelete({ dispatch }, { data, params }) {
        loading()
        await listingDelete(data).then(res => {
            loadingClose()
            if (res.code === 0) {
                message('success', res.msg)
                dispatch('getData', params)
            }
        }).catch(err => {
            loadingClose()
        })
    },
    async getButtonList({ commit }, params) {
        await getButtonList(params).then(res => {
            commit('GET_BUTTON_LIST', res.data.buttonList)
        })
    },
    async allChangePrice({ commit, dispatch }, { data, params }) {
        loading()
        await allChangePrice(data).then(res => {
            loadingClose()
            if (res.code === 0) {
                dispatch('getData', params)
                message('success', res.msg)
                commit('CLOSE_MODAL')
            }
        }).catch(err => {
            loadingClose()
        })
    },
    async allChangeSpecialPrice({ commit, dispatch }, { data, params }) {
        loading()
        await allChangeSpecialPrice(data).then(res => {
            loadingClose()
            if (res.code === 0) {
                dispatch('getData', params)
                message('success', res.msg)
                commit('CLOSE_MODAL')
            }
        }).catch(err => {
            loadingClose()
        })
    },
    async allChangeStock({ commit, dispatch }, { data, params }) {
        loading()
        await allChangeStock(data).then(res => {
            loadingClose()
            if (res.code === 0) {
                dispatch('getData', params)
                message('success', '发布成功')
                commit('CLOSE_MODAL')
            }
        }).catch(err => {
            loadingClose()
        })
    },
    async updateListingInfo({}, data) {
        loading()
        await updateListingInfo(data).then(res => {
            loadingClose()
            if (res.code === 0) {
                router.push({
                    name: 'ListingList'
                })
            }
        }).catch(err => {
            loadingClose()
        })
    },
    async singleSkuShelves({ dispatch }, { data, params }) {
        loading()
        await singleSkuShelves(data).then(res => {
            loadingClose()
            if (res.code === 0) {
                dispatch('getData', params)
                message('success', res.msg)
            }
        }).catch(err => {
            loadingClose()
        })
    },
    async singleSkuOffShelf({ dispatch }, { data, params }) {
        loading()
        await singleSkuOffShelf(data).then(res => {
            loadingClose()
            if (res.code === 0) {
                dispatch('getData', params)
                message('success', res.msg)
            }
        }).catch(err => {
            loadingClose()
        })
    },
    async singleSkuDelete({ dispatch }, { data, params }) {
        loading()
        await singleSkuDelete(data).then(res => {
            loadingClose()
            if (res.code === 0) {
                dispatch('getData', params)
                message('success', res.msg)
            }
        }).catch(err => {
            loadingClose()
        })
    },
    async gloabUpdateSave({ commit, dispatch }, { data, params }) {
        loading()
        await gloabUpdateSave(data).then(res => {
            loadingClose()
            if (res.code === 0) {
                commit('CLOSE_MODAL')
                message('success', res.msg)
                dispatch('getData', params)
            }
        }).catch(err => {
            commit('CLOSE_MODAL')
            loadingClose()
        })
    },
    async batchCopy({ commit, dispatch }, { data, params }) {
        loading()
        await batchCopy(data).then(res => {
            loadingClose()
            if (res.code === 0) {
                commit('CloseCopyModal')
                dispatch('getData', params)
                message('success', res.msg)
            } else {
                message('error', res.msg)
            }
        }).catch(err => {
            loadingClose()
        })
    }
}
export default {
    namespaced: true,
    mutations,
    actions,
    state
}