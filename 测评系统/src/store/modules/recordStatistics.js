import {
    getAssesscompletedrecord,
    refundAgain,
    exportRecord,
} from "@/api/recordStatistics";
import {
    getButtonList
} from "@/api/permision";
import {
    downlaod
} from '@/utils/common'
import {
    Message,
    Loading
} from "element-ui";
let loadingInstance;
const state = {
    assesscompletedrecord: {
        list: [{
            ntcp_id: 123,
            id: 123
        }]
    },
    showButtons: {
        search: false,
        exportBtn: false,
        refundSecond: false
    }
};
const mutations = {
    GET_assesscompletedrecord(state, response) {
        state.assesscompletedrecord = response.data;
    },
    GET_PRODUCT_BUTTON(state, res) {
        res.forEach(item => {
            state.showButtons[item.key] = true;
        });
    },
    GET_BUTTON_LIST(state, list) {
        list.forEach(item => {
            state.showButtons[item.key] = true
        })
    }
};
const actions = {
    getAssesscompletedrecord({
        commit
    }, query) {
        loadingInstance = Loading.service({
            fullscreen: true,
            text: "拼命加载中",
            spinner: "el-icon-loading",
            target: ".main-container"
        });
        return new Promise((resolve, reject) => {
            getAssesscompletedrecord(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("GET_assesscompletedrecord", response);
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
    // 二次返款
    refundAgain({
        commit,
        dispatch
    }, {
        id,
        query
    }) {
        return new Promise((resolve, reject) => {
            refundAgain({
                    id
                })
                .then(response => {
                    if (response.code == 0) {
                        dispatch("getAssesscompletedrecord", query);
                    }
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // 导出记录
    exportRecord({
        commit,
        dispatch
    }, query) {
        return new Promise((resolve, reject) => {
            exportRecord(query)
                .then(response => {
                    downlaod(response, `测评完成.xlsx`)
                    Message({
                        message: '导出成功',
                        type: 'success'
                    })

                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    async getButtonList({
        commit
    }, params) {
        await getButtonList(params).then(res => {
            commit('GET_BUTTON_LIST', res.data.buttonList)
        })
    }
};
export default {
    namespaced: true,
    state,
    mutations,
    actions
};
