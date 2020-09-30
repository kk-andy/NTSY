import {
    getShopList,
    getSellerlist,
    getSiteList,
    getTemplateList,
    getProductLine,
    getBrandInfo,
    getLazadaStatusList,
    getSyncList,
    getShopMethod,
    getDevelperList,
    getNoPermissionsShops,
    getLazadaAccountList
} from '@/api/common'

import { getSesstionToken } from '@/utils/auth'
const state = {
    operationLogTitle: '日志',
    distributionTitle: '主管分配',
    releaseTitle: '定时发布',
    settingTargetTitle: '新增目标值',
    templateTitle: '新增模板',
    offShelfTitle: '下架',
    placeholder: '输入多个回车换行',
    brandList: [],
    lazadaURL: process.env.VUE_APP_LAZADA_URL, /* lazada项目地址 */
    uploadUrl: `${process.env.VUE_APP_ERP_DOMAIN}listing/tool/image/upload`,
    headers: {
        Authorization: getSesstionToken()
    },
    noPermissonShops: [],
    operationLogList: [],
    shopList: [],
    sellerList: [],
    lazadaStatusList: [],
    siteList: [],
    productLineList: [],
    productLineListTwo: [],
    page: {
        currentPage: 1,
        size: 10
    },
    logPage: {
        currentPage: 1,
        size: 6
    },
    isList: [{
        label: '是',
        value: 1
    },
    {
        label: '否',
        value: 0
    }
    ],
    isTort:[{
        label:"是",
        value:1
    },
    {
        label:"否",
        value:0
    }
    ],
    ListingTypeList: [{
        label: '待刊登',
        value: 0
    },
    {
        label: '成功',
        value: 1
    },
    {
        label: '失败',
        value: 2
    }
    ],
    synchronousMattersList: [{
        label: '创建listing',
        value: 0
    },
    {
        label: '手动修改价格',
        value: 1
    },
    {
        label: '手动修改库存',
        value: 2
    },
    {
        label: '自动修改库存',
        value: 3
    },
    {
        label: '修改其他信息',
        value: 4
    },
    ],
    statusList: [{
        label: '启用',
        value: 1
    },
    {
        label: '禁用',
        value: 0
    }
    ],
    syncList: [],
    accountList: [],
    templateList: [],
    shopMethodsList: [],
    DevelperList: [],
}

const mutations = {
    GET_SHOP_LIST(state, data) {
        state.shopList = data
    },
    GET_SELLER_LIST(state, data) {
        state.sellerList = data
    },
    GET_SITE_LIST(state, data) {
        state.siteList = data
    },
    GET_TEMPLATE_LIST(state, data) {
        state.templateList = data.list
    },
    GET_PRODUCT_LINE(state, data) {
        state.productLineList = data
    },
    GET_BRANDINFO(state, data) {
        state.brandList = data
    },
    GET_LAZADA_STATUS_LIST(state, data) {
        let list = []
        for (let key in data) {
            list.push({
                name: key,
                value: data[key]
            })
        }
        state.lazadaStatusList = list
    },
    GET_SYNC_LIST(state, data) {
        let list = []
        for (let key in data) {
            list.push({
                name: key,
                value: data[key]
            })
        }
        state.syncList = list
    },
    GET_SHOP_METHOD_LIST(state, list) {
        let listArray = []
        list.forEach(item => {
            let obj = {}
            if (item === 'LGS') {
                obj.label = '普通'
                obj.value = item
            }
            if (item === 'LGS_TH') {
                obj.label = '陆运'
                obj.value = item
            }
            listArray.push(obj)
        })

        state.shopMethodsList = listArray
    },
    GET_DEVELPER_LIST(state ,data){
        state.DevelperList = data
    },
    GET_NO_PERMISSION_SHOP(state, data) {
        state.noPermissonShops = data
    },
    GET_ACCOUNT_LIST(state, data) {
        state.accountList = data
    }
}
const actions = {
    async getShopList({ commit }) {
        await getShopList().then(res => {
            try {
                commit('GET_SHOP_LIST', res.data)
            } catch (err) {
                throw new Error(err)
            }
        })
    },
    async getSellerlist({ commit }) {
        await getSellerlist().then(res => {
            try {
                commit('GET_SELLER_LIST', res.data)
            } catch (err) {
                throw new Error(err)
            }
        })
    },
    async getSiteList({ commit }) {
        await getSiteList().then(res => {
            try {
                commit('GET_SITE_LIST', res.data)
            } catch (err) {
                throw new Error(err)
            }
        })
    },
    async getTemplateList({ commit }) {
        await getTemplateList().then(res => {
            try {
                commit('GET_TEMPLATE_LIST', res.data)
            } catch (err) {
                throw new Error(err)
            }
        })
    },
    async getProductLine({ commit }) {
        await getProductLine().then(res => {
            commit('GET_PRODUCT_LINE', res.data)
        })
    },
    async getBrandInfo({ commit }) {
        await getBrandInfo().then(res => {
            commit('GET_BRANDINFO', res.data)
        })
    },
    async getLazadaStatusList({ commit }) {
        await getLazadaStatusList().then(res => {
            commit('GET_LAZADA_STATUS_LIST', res.data)
        })
    },
    async getSyncList({ commit }) {
        await getSyncList().then(res => {
            commit('GET_SYNC_LIST', res.data)
        })
    },
    async getShopMethod({ commit }) {
        await getShopMethod().then(res => {
            commit('GET_SHOP_METHOD_LIST', res.data)
        })
    },
    async getDevelperList({commit}){
        await getDevelperList().then(res =>{
            commit('GET_DEVELPER_LIST',res.data)
            
        })
    },
    async getNoPermissionsShops({ commit }) {
        await getNoPermissionsShops().then(res => {
            commit('GET_NO_PERMISSION_SHOP', res.data)
        })
    },
    async getLazadaAccountList({ commit }) {
        await getLazadaAccountList().then(res => {
            commit('GET_ACCOUNT_LIST', res.data)
        })
    }
}
export default {
    state,
    actions,
    mutations
}