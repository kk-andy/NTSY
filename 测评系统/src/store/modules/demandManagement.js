import {
    getPurchaser,
    purchaserCreate,
    purchaserUpdate,
    purchaserRead,
    purchaserPush,
    purchaserCopy,
    getAssessrelease,
    assessreleaseRead,
    assessreleaseSubmit,
    assessreleaseReject,
    autoassign,
    allSubmit
} from "@/api/demandManagement";
import {
    loading,
    loadingClose
} from "@/utils/common"
import {
    getButtonList
} from "@/api/permision";
import {
    Message,
    Loading
} from "element-ui";
import router from "@/router";
let loadingInstance;
const state = {
    purchaserList: [],
    assessreleaseList: [],
    purchaserRead: {},
    assessreleaseRead: {},
    autoassign: {},
    showButtons: {
        addbudget: false,
        look_operationLog: false
    }
};
const mutations = {
    // 获取需求列表
    GET_purchaserList(state, response) {
        state.purchaserList = response.data;
    },
    // 获取需求详情
    GET_purchaserRead(state, response) {
        state.purchaserRead = response.data;
    },
    // 获取审核派发-列表
    GET_assessreleaseList(state, response) {
        state.assessreleaseList = response.data;
    },
    // 获取审核派发-获取详情
    GET_assessreleaseRead(state, response) {
        state.assessreleaseRead = response.data;
    },
    // 获取审核派发-自动匹配买家账号
    GET_autoassign(state, response) {
        state.autoassign = response.data;
    },
    GET_PRODUCT_BUTTON(state, res) {
        res.forEach(item => {
            state.showButtons[item.key] = true;
        });
    }
};
const actions = {
    // 获取需求列表
    getPurchaser({
        commit
    }, query) {
        loadingInstance = Loading.service({
            fullscreen: true,
            text: "拼命加载中",
            spinner: "el-icon-loading",
            target: ".main-container"
        });
        return new Promise((resolve, reject) => {
            getPurchaser(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("GET_purchaserList", response);
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
    // 需求列表-新增
    purchaserCreate({
        commit,
        dispatch
    }, query) {
        return new Promise((resolve, reject) => {
            purchaserCreate(query).then(response => {
                if (response.code == 0) {
                    Message({
                        message: "成功！",
                        type: "success"
                    });
                    router.push({
                        name: "DemandList"
                    })
                }
            })
        });
    },
    // 需求列表-更新
    purchaserUpdate({
        commit,
        dispatch
    }, query) {
        return new Promise((resolve, reject) => {
            purchaserUpdate(query).then(response => {
                if (response.code == 0) {
                    Message({
                        message: "更新成功！",
                        type: "success"
                    });
                    router.push({
                        name: "DemandList"
                    })
                }
            })
        });
    },
    // 需求列表-提交审核
    purchaserPush({
        commit,
        dispatch
    }, {
        query,
        item
    }) {
        return new Promise((resolve, reject) => {
            purchaserPush(query)
                .then(response => {
                    dispatch("getPurchaser", item);
                    // commit("GET_purchaserList", response);
                    // if (response.code == 0) {
                    // }
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    //需求列表-批量提交
    async allSubmit({
        commit,
        dispatch
    }, {
        ids,
        item
    }) {
        loading()
        await allSubmit({
                ids
            })
            .then(data => {
                if (data.code == 0) {
                    dispatch("getPurchaser", item);
                    Message({
                        message: "提交成功！",
                        type: "success"
                    });
                    loadingClose()
                } else {
                    loadingClose()
                }
            })
            .catch(err => {
                loadingClose()
            })
    },
    // 需求列表-复制
    purchaserCopy({
        commit,
        dispatch
    }, {
        query,
        item
    }) {
        return new Promise((resolve, reject) => {
            purchaserCopy(query)
                .then(response => {
                    dispatch("getPurchaser", item);
                    // commit("GET_purchaserList", response);
                    // if (response.code == 0) {
                    // }
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // 需求列表-获取详情
    purchaserRead({
        commit,
        dispatch
    }, query) {
        return new Promise((resolve, reject) => {
            purchaserRead(query)
                .then(response => {
                    // dispatch("getPurchaser", item);
                    commit("GET_purchaserRead", response);
                    // if (response.code == 0) {
                    // }
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // 获取审核派发列表
    getAssessrelease({
        commit
    }, query) {
        loadingInstance = Loading.service({
            fullscreen: true,
            text: "拼命加载中",
            spinner: "el-icon-loading",
            target: ".main-container"
        });
        return new Promise((resolve, reject) => {
            getAssessrelease(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("GET_assessreleaseList", response);
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
    // 审核派发-详情
    assessreleaseRead({
        commit,
        dispatch
    }, query) {
        return new Promise((resolve, reject) => {
            assessreleaseRead(query)
                .then(response => {
                    // console.log("审核派发")
                    if (response.code == 0) {
                        commit("GET_assessreleaseRead", response);
                    }
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // 审核派发-提交
    assessreleaseSubmit({
        commit,
        dispatch
    }, query) {
        return new Promise((resolve, reject) => {
            assessreleaseSubmit(query)
                .then(response => {
                    if (response.code == 0) {
                        Message({
                            message: "发布成功！",
                            type: "success"
                        });
                        router.push({
                            name: "DemandAudit"
                        })
                    }
                })
        });
    },
    // 审核派发-批量发布/驳回
    assessreleaseReject({
        commit,
        dispatch
    }, {
        query,
        item
    }) {
        return new Promise((resolve, reject) => {
            assessreleaseReject(query)
                .then(response => {
                    if (response.code == 0) {
                        Message({
                            message: "成功驳回！",
                            type: "success"
                        });
                        if (item) {
                            dispatch("getAssessrelease", item)
                        }
                        router.push({
                            name: "DemandAudit"
                        })
                    }
                })
        });
    },
    // 审核派发-自动匹配买家账号
    autoassign({
        commit,
        dispatch
    }, query) {
        return new Promise((resolve, reject) => {
            autoassign(query).then(response => {
                if (response.code == 0) {
                    commit("GET_autoassign", response);
                    resolve()
                }
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
