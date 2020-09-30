import {
    getAssessorder,
    assessorderRead,
    assessorderSubmit,
    assessorderAbnormalFile,
    assessorderChangeFollower,
    assessshipRead,
    assessshipSubmit,
    assessshipShipInfo,
    assessreviewRead,
    assessreSubmit,
    getAssessship,
    getAssessreview,
    getAssessselleraudit,
    assesssellerauditBatchrelease,
    assesssellerauditRead,
    assesssellerauditRelease ,
} from "@/api/releaseManagement";
import { getButtonList } from "@/api/permision";
import { Message, Loading } from "element-ui";
import router from "@/router";
let loadingInstance;
const state = {
    modal_fail: false,
    modal_demander: false,
    assessorderList: {},
    assessshipList: {},
    assessreviewList: {},
    assesssellerauditList: {},
    assessshipRead: {},
    assessorderRead: {},
    purchaserRead: {},
    assessreviewRead: {},
    assesssellerauditRead: {},
    showButtons: {
        addbudget: false,
        look_operationLog: false
    }
};
const mutations = {
    GET_assessorder(state, response) {
        state.assessorderList = response.data;
    },
    GET_assessshipList(state, response) {
        state.assessshipList = response.data;
    },
    GET_assessreview(state, response) {
        state.assessreviewList = response.data;
    },
    GET_assessselleraudit(state, response) {
        state.assesssellerauditList = response.data;
    },
    assessorderRead(state, response) {
        state.assessorderRead = response.data;
    },
    assessshipRead(state, response) {
        state.assessshipRead = response.data;
    },
    assessshipShipInfo(state, response) {
        state.assessshipShipInfo = response.data;
    },
    assessreviewRead(state, response) {
        state.assessreviewRead = response.data;
    },
    assesssellerauditRead(state, response) {
        state.assesssellerauditRead = response.data;
    },
    GET_PRODUCT_BUTTON(state, res) {
        res.forEach(item => {
            state.showButtons[item.key] = true;
        });
    },
    CLEAR_VALUE(state) {
        state.modal_fail = false
    },
    CLEAR_demander(state) {
        state.modal_demander = false
    },

};
const actions = {
    // 评测下单列表
    getAssessorder({ commit }, query) {
        loadingInstance = Loading.service({
            fullscreen: true,
            text: "拼命加载中",
            spinner: "el-icon-loading",
            target: ".main-container"
        });
        return new Promise((resolve, reject) => {
            getAssessorder(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("GET_assessorder", response);
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
    // 评测下单-获取详情
    assessorderRead({ commit, dispatch }, query) {
        return new Promise((resolve, reject) => {
            assessorderRead(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("assessorderRead", response);
                    }
                    resolve();
                })
        });
    },
    // 评测下单-提交
    assessorderSubmit({ commit, dispatch }, query) {
        return new Promise((resolve, reject) => {
            assessorderSubmit(query)
                .then(response => {
                    if (response.code == 0) {
                        Message({
                            message: "成功！",
                            type: "success"
                        });
                        router.push({ name: "EvaluationOrder" })
                    }
                    resolve();
                })
        });
    },
    // 评测下单-异常归档
    assessorderAbnormalFile({ commit, dispatch }, { query, item, port }) {
        return new Promise((resolve, reject) => {
            assessorderAbnormalFile(query)
                .then(response => {
                    if (response.code == 0) {
                        Message({
                            message: "归档成功！",
                            type: "success"
                        });
                        dispatch(port, item);
                        commit("CLEAR_VALUE");
                    }
                    resolve();
                })
        });
    },
    // 评测下单-更改测评人
    assessorderChangeFollower({ commit, dispatch }, { query, item }) {
        return new Promise((resolve, reject) => {
            assessorderChangeFollower(query)
                .then(response => {
                    if (response.code == 0) {
                        Message({
                            message: "更改成功！",
                            type: "success"
                        });
                        dispatch("getAssessorder", item);
                        commit("CLEAR_demander");
                    }
                    resolve();
                })
        });
    },
    // 获取物流跟踪列表
    getAssessship({ commit }, query) {
        loadingInstance = Loading.service({
            fullscreen: true,
            text: "拼命加载中",
            spinner: "el-icon-loading",
            target: ".main-container"
        });
        return new Promise((resolve, reject) => {
            getAssessship(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("GET_assessshipList", response);
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
    // 物流跟踪-获取详情
    assessshipRead({ commit, dispatch }, query) {
        return new Promise((resolve, reject) => {
            assessshipRead(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("assessshipRead", response);
                    }
                    resolve();
                })
        });
    },
    // 物流跟踪-提交
    assessshipSubmit({ commit, dispatch }, query) {
        return new Promise((resolve, reject) => {
            assessshipSubmit(query)
                .then(response => {
                    if (response.code == 0) {
                        Message({
                            message: "提交成功！",
                            type: "success"
                        });
                        router.push({ name: "LogisticsTracking" })
                    }
                    resolve();
                })
        });
    },
    // 物流跟踪-获取物流信息
    assessshipShipInfo({ commit, dispatch }, query) {
        return new Promise((resolve, reject) => {
            assessshipShipInfo(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("assessshipShipInfo", response);
                    }
                    resolve();
                })
        });
    },
    // 留评跟踪-获取列表
    getAssessreview({ commit }, query) {
        loadingInstance = Loading.service({
            fullscreen: true,
            text: "拼命加载中",
            spinner: "el-icon-loading",
            target: ".main-container"
        });
        return new Promise((resolve, reject) => {
            getAssessreview(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("GET_assessreview", response);
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
    // 留评跟踪-获取详情
    assessreviewRead({ commit, dispatch }, query) {
        return new Promise((resolve, reject) => {
            assessreviewRead(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("assessreviewRead", response);
                    }
                    resolve();
                })
        });
    },
    // 留评跟踪-提交
    assessreSubmit({ commit, dispatch }, query) {
        return new Promise((resolve, reject) => {
            assessreSubmit(query)
                .then(response => {
                    if (response.code == 0) {
                        Message({
                            message: "提交成功！",
                            type: "success"
                        });
                        router.push({ name: "LeaveReviewTracking" })
                    }
                    resolve();
                })
        });
    },
    getAssessselleraudit({ commit }, query) {
        loadingInstance = Loading.service({
            fullscreen: true,
            text: "拼命加载中",
            spinner: "el-icon-loading",
            target: ".main-container"
        });
        return new Promise((resolve, reject) => {
            getAssessselleraudit(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("GET_assessselleraudit", response);
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
    // 留评跟踪-批量提交
    assesssellerauditBatchrelease({ commit, dispatch }, { query, item }) {
        return new Promise((resolve, reject) => {
            assesssellerauditBatchrelease(query)
                .then(response => {
                    if (response.code == 0) {
                        Message({
                            message: "提交成功！",
                            type: "success"
                        });
                        dispatch("getAssessselleraudit", item)

                    }
                    resolve();
                })
        });
    },
    // 留评跟踪-提交
    assesssellerauditRelease({ commit, dispatch }, query) {
        return new Promise((resolve, reject) => {
            assesssellerauditRelease(query)
                .then(response => {
                    if (response.code == 0) {
                        Message({
                            message: "提交成功！",
                            type: "success"
                        });
                        router.push({ name: "OperationalEvaluation" })
                    }
                    resolve();
                })
        });
    },
    // 留评跟踪-详情
    assesssellerauditRead({ commit, dispatch }, query) {
        return new Promise((resolve, reject) => {
            assesssellerauditRead(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("assesssellerauditRead", response)
                    }
                    resolve();
                })
        });
    },
};
export default {
    namespaced: true,
    state,
    mutations,
    actions
};
