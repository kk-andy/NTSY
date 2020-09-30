import {
    getAssessrefund,
    getAssessrefundagain,
    getCreditcardrechange,
} from "@/api/financialManagement";
import { getButtonList } from "@/api/permision";
import { Message, Loading } from "element-ui";
let loadingInstance;
const state = {
    assessrefundList: {
        list:[{
            dept_name:12523,
            id:1
        }]
    },
    assessrefundagainList: {
        list:[{
            dept_name:12523,
            id:1
        }]
    },
    creditcardrechange: {
       
    },
    showButtons: {
        addbudget: false,
        look_operationLog: false
    }
};
const mutations = {
    GET_assessrefund(state, response) {
        state.assessrefundList = response.data;
    },
    GET_creditcardrechange(state, response) {
        state.creditcardrechange = response.data;
    },
    GET_assessrefundagain(state, response) {
        state.assessrefundagainList = response.data;
    },
    GET_PRODUCT_BUTTON(state, res) {
        res.forEach(item => {
            state.showButtons[item.key] = true;
        });
    }
};
const actions = {
    getAssessrefund({ commit }, query) {
        loadingInstance = Loading.service({
            fullscreen: true,
            text: "拼命加载中",
            spinner: "el-icon-loading",
            target: ".main-container"
        });
        return new Promise((resolve, reject) => {
            getAssessrefund(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("GET_assessrefund", response);
                    }
                    loadingInstance.close();
                    resolve();
                })
                .catch(error => {
                    loadingInstance.close();
                    reject(error);
                });
        });
    },
    // // 需求列表-提交审核
    // purchaserPush({ commit, dispatch }, { query, item }) {
    //     return new Promise((resolve, reject) => {
    //         purchaserPush(query)
    //             .then(response => {
    //                 dispatch("getPurchaser", item);
    //                 // commit("GET_purchaserList", response);
    //                 // if (response.code == 0) {
    //                 // }
    //                 resolve();
    //             })
    //             .catch(error => {
    //                 reject(error);
    //             });
    //     });
    // },
    // // 需求列表-复制
    // purchaserCopy({ commit, dispatch }, { query, item }) {
    //     return new Promise((resolve, reject) => {
    //         purchaserCopy(query)
    //             .then(response => {
    //                 dispatch("getPurchaser", item);
    //                 // commit("GET_purchaserList", response);
    //                 // if (response.code == 0) {
    //                 // }
    //                 resolve();
    //             })
    //             .catch(error => {
    //                 reject(error);
    //             });
    //     });
    // },
    // // 需求列表-获取详情
    // purchaserRead({ commit, dispatch }, query) {
    //     return new Promise((resolve, reject) => {
    //         purchaserRead(query)
    //             .then(response => {
    //                 // dispatch("getPurchaser", item);
    //                 commit("GET_purchaserRead", response);
    //                 // if (response.code == 0) {
    //                 // }
    //                 resolve();
    //             })
    //             .catch(error => {
    //                 reject(error);
    //             });
    //     });
    // },
    getAssessrefundagain({ commit }, query) {
        loadingInstance = Loading.service({
            fullscreen: true,
            text: "拼命加载中",
            spinner: "el-icon-loading",
            target: ".main-container"
        });
        return new Promise((resolve, reject) => {
            getAssessrefundagain(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("GET_assessrefundagain", response);
                    }
                    loadingInstance.close();
                    resolve();
                })
                .catch(error => {
                    loadingInstance.close();
                    reject(error);
                });
        });
    },
    getCreditcardrechange({ commit }, query) {
        loadingInstance = Loading.service({
            fullscreen: true,
            text: "拼命加载中",
            spinner: "el-icon-loading",
            target: ".main-container"
        });
        return new Promise((resolve, reject) => {
            getCreditcardrechange(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("GET_creditcardrechange", response);
                    }
                    loadingInstance.close();
                    resolve();
                })
                .catch(error => {
                    loadingInstance.close();
                    reject(error);
                });
        });
    },
    // // 需求列表-获取详情
    // assessreleaseReject({ commit, dispatch }, { query, item }) {
    //     return new Promise((resolve, reject) => {
    //         assessreleaseReject(query)
    //             .then(response => {
    //                 // dispatch("getAssessrelease", item)
    //                 // if (response.code == 0) {
    //                 // }
    //                 resolve();
    //             })
    //             .catch(error => {
    //                 reject(error);
    //             });
    //     });
    // },
};
export default {
    namespaced: true,
    state,
    mutations,
    actions
};
