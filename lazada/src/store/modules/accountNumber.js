import { getData, getAccountInfo, editAccountInfo } from '@/api/accountNumber'
import { getButtonList } from '@/api/permision'
import {  Loading } from 'element-ui'
import { loading, loadingClose } from '@/utils/common';
let loadingInstance
const state = {
    total: 0,
    logTotal: 0,
    tableData: [{}],
    modal_basic: false,
    modal_title: '新增账号',
    account_id: '',
    accountList: [],
    showButtons: {
        edit: false,
    },
    form: {
        accountName: '',
        site: '',
        token: '',
        shop: '',
        saller: '',
        statusCode: '',
        refresh_token: '',
        shippingMethod: ''
    },
    rules: {
        accountName: [
            { required: true, message: "请输入账号名称", trigger: "blur" },
            {
                min: 1,
                max: 50,
                message: "长度在 1 到 50 个字符",
                trigger: "blur"
            }
        ],
        token: [
            { required: true, message: "请输入token", trigger: "blur" },
            {
                min: 1,
                max: 200,
                message: "长度在 1 到 200 个字符",
                trigger: "blur"
            }
        ],
        refresh_token: [
            { required: true, message: "请输入refresh_token", trigger: "blur" },
            {
                min: 1,
                max: 200,
                message: "长度在 1 到 200 个字符",
                trigger: "blur"
            }
        ],
        statusCode: [
            { required: true, message: "请选择状态", trigger: "blur" }
        ],
        shop: [
            { required: true, message: "请输入店铺名称", trigger: "blur" },
            {
                min: 1,
                max: 50,
                message: "长度在 1 到 50 个字符",
                trigger: "blur"
            }
        ],
        saller: [
            { required: true, message: "请选择销售员", trigger: "change" }
        ],
        site: [
            { required: true, message: "请选择站点", trigger: "change" }
        ]
    }
}
const mutations = {
    GET_DATA(state, data) {
        state.accountList = data.accounts
        state.tableData = data.account_list.data
        state.total = data.account_list.total
    },
    GET_ACCOUNT_INFO(state, data) {
        state.modal_basic = true
        let item = data[0]
        state.form.accountName = item.account_name
        state.form.site = item.site_code
        state.form.token = item.access_token
        state.form.shop = item.shop_name
        state.form.saller = item.seller_id
        state.form.statusCode = item.status
        state.form.refresh_token = item.refresh_token
        state.form.shippingMethod = item.shipping_method
    },
    CLOSE_MODAL(state) {
        state.modal_basic = false
    },
    GET_BUTTON_LIST(state, list) {
        list.forEach(item => {
            state.showButtons[item.key] = true
        })
    }
}
const actions = {
    async getData({ commit }, params) {
        // loadingInstance = Loading.service({ fullscreen: true, text: '拼命加载中', spinner: 'el-icon-loading', target: '.main-container' })
        loading()
        await getData(params).then(res => {
            try {
                loadingClose()
                commit('GET_DATA', res.data)
            } catch(err) {
                loadingClose()
                throw new Error(err)
            }
        }).catch(err => {
            loadingClose()
        })
    },
    async getAccountInfo({ commit }, params){
        // loadingInstance = Loading.service({ fullscreen: true, text: '拼命加载中', spinner: 'el-icon-loading', target: '.main-container' })
        loading()
        await getAccountInfo(params).then(res => {
            try {
                loadingClose()
                commit('GET_ACCOUNT_INFO', res.data)
            } catch(err) {
                loadingClose()
                throw new Error(err)
            }
        })
    },
    async editAccountInfo({ commit, dispatch }, { data, params }) {
        await editAccountInfo(data).then(res => {
            try {
                dispatch('getData', params)
                commit('CLOSE_MODAL')
            } catch(err) {
                throw new Error(err)
            }
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
    mutations,
    actions,
    state
}