import {
    getAssessauth,
    assessauthRead,
    assessauthUpdate,
} from "@/api/dataPermission";
import {
    getButtonList
} from "@/api/permision";
import {
    Message,
    Loading
} from "element-ui";
let loadingInstance;
const state = {
    assessauth: {},
    assessauthRead: [],
    modal_fail: false,
    showButtons: {
        search: false,
        edit: false
    }
};
const mutations = {
    GET_Assessauth(state, response) {
        state.assessauth = response.data;
    },
    assessauthRead(state, response) {
        state.assessauthRead = response.data;
    },
    GET_PRODUCT_BUTTON(state, res) {
        res.forEach(item => {
            state.showButtons[item.key] = true;
        });
    },
    CLEAR_VALUE(state) {
        state.modal_fail = false
    },
    GET_BUTTON_LIST(state, list) {
        list.forEach(item => {
            state.showButtons[item.key] = true
        })
    }
};
const actions = {
    getAssessauth({
        commit
    }, query) {
        loadingInstance = Loading.service({
            fullscreen: true,
            text: "拼命加载中",
            spinner: "el-icon-loading",
            target: ".main-container"
        });
        return new Promise((resolve, reject) => {
            getAssessauth(query).then(response => {
                if (response.code == 0) {
                    commit("GET_Assessauth", response);
                }
                loadingInstance.close();
                resolve();
            })
        });
    },
    // 详情
    assessauthRead({
        commit,
        dispatch
    }, query) {
        return new Promise((resolve, reject) => {
            assessauthRead(query).then(response => {
                if (response.code == 0) {
                    commit("assessauthRead", response);
                }
                resolve();
            })
        });
    },
    // 更新
    assessauthUpdate({
        commit,
        dispatch
    }, {
        query,
        item,
        that
    }) {
        return new Promise((resolve, reject) => {
            assessauthUpdate(query).then(response => {
                if (response.code == 0) {
                    dispatch("getAssessauth", item);
                    commit("CLEAR_VALUE");
                    that.$refs.tree.setCheckedKeys([]);
                }
                resolve();
            })
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
