import {
    getPeoduct1,
    getCommonsList,
    getUnvailableLocation,
    getAvailableLocation,
    getShippingType,
    getListingConfig,
    getRefundPolicye,
    getShippingCountries,
    getshippingDispatchtime,
    getAllowMultiattr,
    getTaxLocation,
    getUPCcode,
    createListing,
    getSpuInfo,
    getSkuInfo,
    getSkuCode,
    savePublicationRecords,
    upadteListingDetail,
    getTemplateList,
    copyCreateListing,
    InfringementOfWord,
    verifyAddItem
} from '@/api/listing'
import { resolve, reject } from 'core-js/fn/promise'
import { startLoading, endLoading } from '@/utils/common'
import router from '@/router'
const state = {
    product1List: [],
    categoryLevelList: [],
    imagePath: [],
    sites: [],
    currency: [],
    shops: [],
    unavailableLocation: [], // 不可运送国家
    showAreaDialog: false,
    availableLocation: [],
    shippingType: [],
    domestic: [], // 国内运输
    international: [], // 国际运输
    listingConfig: [], // 政策模板下拉框
    returnPolicy: [], // 退款政策下拉框
    shippingCountries: [], // 获取运输政策--获取国家/区域
    shippingDispatchTime: [], // 运输政策--处理时间Options
    allowMultiattr: true, // 产品分类下是否允多属性sku
    taxLocation: [], // 其他政策--税收地区
    spuInfo: '',
    templateList: [],
    skuIdList: [],
    checkProductTitle: true,
    checkeditContent: true,
    paypal_accounts: [], // 店铺账号
    modal_test_cost: false,
    showMainFigureBUtton: true,
    showMainTitleButton: true,
    feeResults: [],
    status: false,
    Warnings: [],
    Errors: [],
    selfSettingNumData: [ // 10天内购买的限制数量,
        {
            id: 1,
            value: 1
        },
        {
            id: 2,
            value: 2
        },
        {
            id: 3,
            value: 3
        },
        {
            id: 4,
            value: 4
        },
        {
            id: 5,
            value: 5
        },
        {
            id: 6,
            value: 6
        },
        {
            id: 7,
            value: 7
        },
        {
            id: 8,
            value: 8
        },
        {
            id: 9,
            value: 9
        },
        {
            id: 10,
            value: 10
        },
        {
            id: 25,
            value: 25
        },
        {
            id: 50,
            value: 50
        },
        {
            id: 75,
            value: 75
        },
        {
            id: 100,
            value: 100
        }
    ],
    restrictBuyerCreditNumData: [ // 数量限购后，信用限购的值
        {
            id: 0,
            value: 0
        },
        {
            id: 1,
            value: 1
        },
        {
            id: 2,
            value: 2
        },
        {
            id: 3,
            value: 3
        },
        {
            id: 4,
            value: 4
        },
        {
            id: 5,
            value: 5
        }
    ],
    imageAdData: [{
            id: 'None',
            value: "无"
        },
        {
            id: 'Gallery',
            value: "小图"
        },
        {
            id: 'Plus',
            value: "橱窗展示"
        }
    ],
    creditRatingNumData: [{
            id: -1,
            value: -1
        },
        {
            id: -2,
            value: -2
        },
        {
            id: -3,
            value: -3
        },
        {
            id: -4,
            value: -4
        },
        {
            id: -5,
            value: -5
        },
        {
            id: -6,
            value: -6
        },
    ],
    policyViolation: [{
            id: 4,
            value: 4
        },
        {
            id: 5,
            value: 5
        },
        {
            id: 6,
            value: 6
        },
        {
            id: 7,
            value: 7
        }
    ],
    policyViolationDays: [{
            id: 'Days_30',
            value: "30"
        },
        {
            id: 'Days_180',
            value: "180"
        }
    ],
    modules: [{
            id: 1,
            name: "基础信息"
        },
        {
            id: 2,
            name: "产品信息"
        },
        {
            id: 3,
            name: "属性信息"
        },
        {
            id: 4,
            name: "描述信息"
        },
        {
            id: 5,
            name: "价格信息"
        },
        {
            id: 6,
            name: "付款信息"
        },
        {
            id: 7,
            name: "退款政策"
        },
        {
            id: 8,
            name: "运输政策"
        },
        {
            id: 9,
            name: "其他政策"
        },
        {
            id: 10,
            name: "发布设置"
        }
    ],
    discardBidData: [{
            id: 1,
            value: 1
        },
        {
            id: 2,
            value: 2
        },
        {
            id: 3,
            value: 3
        },
        {
            id: 4,
            value: 4
        },
        {
            id: 5,
            value: 5
        }
    ],
    discardDaysData: [{
            id: 'Days_30',
            value: 30
        },
        {
            id: 'Days_180',
            value: 180
        },
        {
            id: 'Days_360',
            value: 360
        }
    ],
    /* 刊登天数 */
    listing_durationList: [{
            id: 0,
            value: 'GTC'
        },
        {
            id: 1,
            value: 1
        },
        {
            id: 3,
            value: 3
        },
        {
            id: 5,
            value: 5
        },
        {
            id: 7,
            value: 7
        },
        {
            id: 10,
            value: 10
        },
        {
            id: 15,
            value: 15
        },
        {
            id: 30,
            value: 30
        },
    ],
    upcCode: ''
}
const mutations = {
    GET_PRODUCT_LIST(state, res) {
        state.product1List = res.data
        state.categoryLevelList.push(res.data)
    },
    GET_COMMONS_LIST(state, res) {
        let { sites, currency, shops, paypal_accounts } = res.data
        state.sites = sites
        state.currency = currency
        state.shops = shops
        state.paypal_accounts = paypal_accounts
    },
    GET_UNVAIABLE_COUNTRY(state, res) {
        for (const key in res.data) {
            if (res.data.hasOwnProperty(key)) {
                const item = res.data[key];
                if (item instanceof Array) {
                    item.forEach(country => {
                        country.select = false
                            // this.$set(country, "select", false);
                    });
                } else {
                    for (const key in item) {
                        if (item.hasOwnProperty(key)) {
                            const region = item[key];
                            region.forEach(country => {
                                country.select = false
                            });
                        }
                    }
                }
            }
        }
        state.unavailableLocation = res.data
    },
    /* 可运送国家 */
    GET_VAIABLE_COUNTRY(state, res) {
        res.data.forEach(item => {
            item.select = false
        });
        state.availableLocation = res.data
    },
    /* 运输方式 */
    GET_SHPPING_TYPE(state, res) {
        state.domestic = res.data.domestic
        state.international = res.data.international
    },
    CLOSE_SHOW_DIALOG(state) {
        state.showAreaDialog = false
    },
    // 获取政策模板下拉框
    GET_LISTING_CONFIG(state, res) {
        res.data.forEach(item => {
            item.international_shipping.forEach(ele => {
                if (typeof(ele.shipping_location) === 'array') {
                    ele.shipping_location.forEach(obj => {
                        obj.select = false
                    })
                }
            })
        })
        state.listingConfig = res.data
    },
    clearUpcCode(state) {
        state.upcCode = ''
    },
    /* 退款政策下拉框 */
    GET_RETURN_POLICYE(state, res) {
        state.returnPolicy = res.data
    },
    /* 获取运输政策--获取国家/区域 */
    GET_SHPPING_COUNTRIES(state, res) {
        state.shippingCountries = res.data
    },
    /* 运输政策--处理时间Options */
    GET_SHPPING_DISPATCHTIME(state, res) {
        state.shippingDispatchTime = res.data
    },
    GET_ALLOW_MULTIATTR(state, res) {
        state.allowMultiattr = res.data.allow_multi_attr
    },
    /* 其他政策--税收地区 */
    GET_TAX_LOACATION(state, res) {
        state.taxLocation = res.data
    },
    /* 生成upc编码 */
    GET_UPC_CODE(state, res) {
        state.upcCode = res.data.upc
    },
    /* 加载spu信息 */
    GET_SPU_INFO(state, res) {
        state.spuInfo = res.data
    },
    /* 获取sku信息 */
    GET_SKU_INFO(state, res) {},
    /* 获取sku编码 */
    GET_SKU_CODE(state, res) {
        state.skuIdList = res.data
    },
    /* 获取模板列表 */
    GET_TEMPATE_LIST(state, list) {
        state.templateList = list
    },
    /* 改变标题的侵权 */
    CHANGE_PRODUCT_FLAG(state, res) {
        if (res.code === 0) {
            state.checkProductTitle = true
        } else {
            state.checkProductTitle = false
        }

    },
    /* 改变富文本的侵权 */
    CHANGE_CONTENT_FLAG(state, res) {
        if (res.code === 0) {
            state.checkeditContent = true
        } else {
            state.checkeditContent = false
        }

    },
    /* 费用检测 */
    VERIFY_ADDITEM(state, res) {
        let response = res.data
        state.modal_test_cost = true
        state.status = response.status
        state.Warnings = response.Warnings
        state.Errors = response.Errors
        state.feeResults = response.feeResults
    },
    /* 清空模板数据 */
    CLEAR_TEMPLATE_LIST(state) {
        state.templateList = []
    }
    /* 获取一键插图的图片路劲 */
    // GET_IMAGE_PATH(state, res) {
    //     console.log(res)
    // }
}
const actions = {
    getPeoduct1({ commit }, query) {
        return new Promise((resolve, reject) => {
            getPeoduct1(query).then(res => {
                commit('GET_PRODUCT_LIST', res)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    /* 获取公共信息 */
    getCommonsList({ commit }) {
        return new Promise((resolve, reject) => {
            getCommonsList().then(res => {
                commit('GET_COMMONS_LIST', res)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    /* 运输政策， 不可运送国家 */
    getUnvailableLocation({ commit }, query) {
        return new Promise((resolve, reject) => {
            getUnvailableLocation(query).then(res => {
                commit('GET_UNVAIABLE_COUNTRY', res)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    /* 获取可运送国家 */
    getAvailableLocation({ commit }, query) {
        return new Promise((resolve, reject) => {
            getAvailableLocation(query).then(res => {
                commit('GET_VAIABLE_COUNTRY', res)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    /* 获取运输方式 */
    getShippingType({ commit }, query) {
        return new Promise((resolve, reject) => {
            getShippingType(query).then(res => {
                commit('GET_SHPPING_TYPE', res)
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    /* 获取政策模板下拉框 */
    getListingConfig({ commit }, query) {
        return new Promise((resolve, reject) => {
            getListingConfig(query).then(res => {
                commit('GET_LISTING_CONFIG', res)
            })
        })
    },
    /* 退款政策下拉框 */
    getRefundPolicye({ commit }, query) {
        return new Promise((resolve, reject) => {
            getRefundPolicye(query).then(res => {
                commit('GET_RETURN_POLICYE', res)
            })
        })
    },
    /* 获取运输政策--获取国家/区域 */
    getShippingCountries({ commit }, query) {
        return new Promise((resolve, reject) => {
            getShippingCountries(query).then(res => {
                commit('GET_SHPPING_COUNTRIES', res)
            })
        })
    },
    /* 运输政策--处理时间Options */
    getshippingDispatchtime({ commit }, query) {
        return new Promise((resolve, reject) => {
            getshippingDispatchtime(query).then(res => {
                commit('GET_SHPPING_DISPATCHTIME', res)
            })
        })
    },
    /* 产品分类下是否允多属性sku */
    getAllowMultiattr({ commit }, query) {
        return new Promise((resolve, reject) => {
            getAllowMultiattr(query).then(res => {
                commit('GET_ALLOW_MULTIATTR', res)
            })
        })
    },
    /* 其他政策--税收地区 */
    getTaxLocation({ commit }, query) {
        return new Promise((resolve, reject) => {
            getTaxLocation(query).then(res => {
                commit('GET_TAX_LOACATION', res)
            })
        })
    },
    /* 生成upc编码 */
    getUPCcode({ commit }) {
        return new Promise((resolve, reject) => {
            getUPCcode().then(res => {
                commit('GET_UPC_CODE', res)
            })
        })
    },
    /* 创建listing */
    createListing({}, data) {
        return new Promise((resolve, reject) => {
            createListing(data).then(res => {
                _g.toastMsg('success', '创建listing成功')
                router.push({ name: 'ListOfSelections' })
            })
        })
    },
    /* 复制listing保存 */
    copyCreateListing({}, data) {
        return new Promise((resolve, reject) => {
            copyCreateListing(data).then(res => {
                _g.toastMsg('success', '复制listing成功')
                router.push({ name: 'ListingList' })
            })
        })
    },
    /* 保存编辑刊登记录 */
    savePublicationRecords({}, data) {
        return new Promise((resolve, reject) => {
            savePublicationRecords(data).then(res => {
                _g.toastMsg('success', '保存listing成功')
                router.push({ name: 'ListOfPublicationRecords' })
            })
        })
    },
    /* 保存编辑待发布 */
    savePendingEdit({}, data) {
        return new Promise((resolve, reject) => {
            savePublicationRecords(data).then(res => {
                _g.toastMsg('success', '待发布listing成功')
                router.push({ name: 'PendingList' })
            })
        })
    },
    /* 在线listing更新 */
    upadteListingDetail({}, data) {
        return new Promise((resolve, reject) => {
            upadteListingDetail(data).then(res => {
                _g.toastMsg('success', '在线listing更新成功')
                router.push({ name: 'ListingList' })
            })
        })
    },
    /* 加载spu信息 */
    getSpuInfo({ commit }, query) {
        return new Promise((resolve, reject) => {
            getSpuInfo(query).then(res => {
                commit('GET_SPU_INFO', res)
            })
        })
    },
    /* 获取sku信息 */
    getSkuInfo({ commit }, query) {
        return new Promise((resolve, reject) => {
            getSkuInfo(query).then(res => {
                commit('GET_SKU_INFO', res)
            })
        })
    },
    /* 获取sku编码 */
    getSkuCode({ commit }, query) {
        return new Promise((resolve, reject) => {
            getSkuCode(query).then(res => {
                commit('GET_SKU_CODE', res)
            })
        })
    },
    /* 获取模板列表 */
    getTemplateList({ commit }, query) {
        return new Promise((resolve, reject) => {
            getTemplateList(query).then(res => {
                commit('GET_TEMPATE_LIST', res.data.list)
            })
        })
    },
    /* 侵权词 */
    InfringementOfWord({ commit }, { formData, flag }) {
        return new Promise((resolve, reject) => {
            InfringementOfWord(formData).then(res => {
                if (flag.title === 'productTitle') {
                    commit('CHANGE_PRODUCT_FLAG', res)
                } else {
                    commit('CHANGE_CONTENT_FLAG', res)
                }
            })
        })
    },
    /* 费用检测 */
    verifyAddItem({ commit }, data) {
        return new Promise((resolve, reject) => {
            startLoading('费用检测中')
            verifyAddItem(data).then(res => {
                commit('VERIFY_ADDITEM', res)
                endLoading()
            })
        })
    }
    /* 获取一键插图的图片路劲 */
    // getImagePath({ commit }, data) {
    //     return new Promise((resolve, reject) => {
    //         getImagePath(data).then(res => {
    //             commit('GET_IMAGE_PATH', res)
    //         }).catch(err => {
    //             reject(err)
    //         })
    //     })
    // }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}