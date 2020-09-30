import {
    getshop_list,
    getproduct_cats_info,
    getshop_cats_info,
    getitem_list,
    getsite_list,
    getrule_list,
    gettask_list,
    deleteRule,
    selectRule,
    get_listings,
} from '@/api/marketing'
import { Message, Loading } from "element-ui";
import { resolve, reject } from 'core-js/fn/promise'

const state = {
    form: {
        shop_id: "",
        page: 1,
        per_page_num: 10,
    },
    shop_list: [],
    product_cats_info: {},
    shop_cats_info: [],
    item_list: [],
    listing_ids: [],
    site_list: [],
    rule_list: [],
    task_list: [],
    total: 0,
}
const mutations = {
    GET_shop_list(state, res) {
        state.form.shop_id = res.data[0].shop_id;
        state.shop_list = res.data;
    },
    GET_product_cats_info(state, res) {
        state.product_cats_info = res.data
    },
    GET_shop_cats_info(state, res) {
        state.shop_cats_info = res.data
    },
    GET_item_list(state, res) {
        state.item_list = res.data.list;
        state.listing_ids = res.data.listing_ids;
    },
    GET_site_list(state, res) {
        state.site_list = res.data;
    },
    GET_rule_list(state, res) {
        state.rule_list = res.data;
    },
    GET_task_list(state, res) {
        state.task_list = res.data;
    },
}
const actions = {
    getshop_list({ commit }, query) {
        return new Promise((resolve, reject) => {
            getshop_list(query).then(res => {
                if (res.code == 0) {
                    commit('GET_shop_list', res)
                }
            }).catch(err => {
                reject(err)
            })
        })
    },
    getproduct_cats_info({ commit }, query) {
        return new Promise((resolve, reject) => {
            getproduct_cats_info(query).then(res => {
                if (res.code == 0) {
                    commit('GET_product_cats_info', res)
                }
            }).catch(err => {
                reject(err)
            })
        })
    },
    getshop_cats_info({ commit }, query) {
        return new Promise((resolve, reject) => {
            getshop_cats_info(query).then(res => {
                if (res.code == 0) {
                    commit('GET_shop_cats_info', res)
                }
            }).catch(err => {
                reject(err)
            })
        })
    },
    getitem_list({ commit }, query) {
        return new Promise((resolve, reject) => {
            getitem_list(query).then(res => {
                if (res.code == 0) {
                    commit('GET_item_list', res)
                }
            }).catch(err => {
                reject(err)
            })
        })
    },
    getsite_list({ commit }, query) {
        return new Promise((resolve, reject) => {
            getsite_list(query).then(res => {
                if (res.code == 0) {
                    commit('GET_site_list', res)
                }
            }).catch(err => {
                reject(err)
            })
        })
    },
    getrule_list({ commit }, query) {
        return new Promise((resolve, reject) => {
            getrule_list(query).then(res => {
                if (res.code == 0) {
                    commit('GET_rule_list', res)
                }
            }).catch(err => {
                reject(err)
            })
        })
    },
    deleteRule({ commit, dispatch }, { data, query }) {
        return new Promise((resolve, reject) => {
            deleteRule(data).then(res => {
                if (res.code == 0) {
                    Message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    dispatch('getrule_list', query)
                }
            }).catch(err => {
                reject(err)
            })
        })
    },
    gettask_list({ commit }, query) {
        return new Promise((resolve, reject) => {
            gettask_list(query).then(res => {
                if (res.code == 0) {
                    commit('GET_task_list', res)
                }
            }).catch(err => {
                reject(err)
            })
        })
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}