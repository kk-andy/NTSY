import { getData, saveSkuInfo, getSitePrice, getProductTwoLine } from '@/api/listOfSelections'
import { getButtonList } from '@/api/permision'
// import { Loading } from 'element-ui'
import { loading, loadingClose } from '@/utils/common';
import router from '@/router'
import { set } from 'core-js/fn/dict';
let loadingInstance
const state = {
    modal_operationlog: false,
    modal_distribution: false,
    total: 0,
    logTotal: 0,
    design_distribution: '',
    global_price_quantity_info: {},
    platform: [],
    flag: true,
    isListingList: [{
        label: '是',
        value: 1
    },
    {
        label: '否',
        value: 0
    }
    ],
    showButtons: {
        edit: false
    },
    creatorList: [],
    siteListPrice: [],
    tableData: [], 
    ProductTwoLine: [],
}
const mutations = {
    GET_DATA(state, data) {
        state.platform = data.platform
        state.tableData = data.product_list.data
        state.total = data.product_list.total
    },
    GET_BUTTON_LIST(state, list) {
        list.forEach(item => {
            state.showButtons[item.key] = true
        })
    },
    GET_SITE_PRICE(state, data) {
        let obj = {}
        // console.log(data,"我是返回的数据")
        // console.log(this,5555)
        data.forEach(item => {
            obj[item.id] = []
            // if (Object.prototype.hasOwnProperty.call(obj, item.id)) {
            for (let key in item) {
                if (key !== 'id' && key !== 'sku_id') {
                    obj[item.id].push({
                        site_code: key,
                        price: item[key].price,
                        special_price: item[key].special_price,
                        gross_margin: item[key].gross_margin 
                    })
                }
            }
        })
        // console.log(obj)
        if (state.flag) { /* 用来判断当前是修改整体的六合一，还是通过利润率修改单独的六合一 */
            state.global_price_quantity_info = obj
        }
        state.siteListPrice = data
        // console.log(data,"我是data")
        
    },
    CLEAR_siteListPrice(state) {
        state.siteListPrice = []
    },
    CLEAR_global_price_quantity_info(state) {
        state.global_price_quantity_info = {}
    },
    GET_PRODUCT_TWO_LIN(state, data) {
        state.ProductTwoLine = data
    },
    CLEARProductTwoLine(state) {
        state.ProductTwoLine = []
    }
}

const actions = {
    async getData({ commit }, query) {
        loading()
        await getData(query).then(res => {
            try {
                loadingClose()
                commit('GET_DATA', res.data)
            } catch (err) {
                loadingClose()
                throw new Error(err)
            }
            // console.log(res.data)
        }).catch(e => {
            loadingClose()
        })
    },
    /* 保存选品信息 */
    async saveSkuInfo({ commit }, { data, flag }) {
        loading()
        await saveSkuInfo(data).then(res => {
            if (res.code === 0) {
                loadingClose()
                if (flag) {
                    router.push({
                        name: 'ListOfSelections'
                    })
                } else {
                    router.push({
                        name: 'ListingList'
                    })
                }

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
    async getSitePrice({ commit }, params) {
        await getSitePrice(params).then(res => {
            commit('GET_SITE_PRICE', res.data)
        })
    },
    async getProductTwoLine({ commit }, params) {
        await getProductTwoLine(params).then(res => {
            commit('GET_PRODUCT_TWO_LIN', res.data)
        })
    }
}
export default {
    namespaced: true,
    mutations,
    actions,
    state
}