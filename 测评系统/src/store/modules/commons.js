import {
    getUserName,
    getServiceitem,
    getDemanderlist,
    getSitelist,
    getPlatformlist,
    getCurrency,
    getFollowerlist,
    getPaymenttype,
    getPaymentmethod,
    getChangetype,
    getReviewrating,
    getDemanddept,
    getBuyerstatus,
    getCreditcardstatus,
    getCreditcardchannel,
    getuserdept,
    getRefundreason,
    getstaffdept,
    getshoplist,
    platformcost,
    assessorderAbnormalFile,
    staffdept,
} from "@/api/commons";
import {
    setSesstionuSername,
} from '@/utils/auth'
import {
    Message,
    Loading
} from "element-ui";
import router from "@/router";
const state = {
    servicetype: [{
            id: 1,
            value: "测评"
        },
        {
            id: 2,
            value: "代购"
        },
    ], //服务类型
    modal_fail: false,
    abnormal: {
        id: "",
        reason: "",
        currency: "",
        actual_amount: "",
        refund_reason: ""
    },
    rules: {
        reason: [{
            required: true,
            message: "请输入归档原因",
            trigger: "blur"
        }],
        currency: [{
            required: true,
            message: "请输入退款金额",
            trigger: "blur"
        }],
        actual_amount: [{
            required: true,
            message: "请选择退款币种",
            trigger: "change"
        }],
        refund_reason: [{
            required: true,
            message: "请选择退款原由",
            trigger: "change"
        }]
    },
    userName: "", //用户名
    serviceitem: [], // 服务项目
    demanderlist: [], // 需求人
    sitelist: [], // 站点
    platformlist: [], // 平台
    currency: [], // 币种
    followerlist: [], // 测评人
    paymenttype: [], // 结算渠道
    paymentmethod: [], // 结算方式
    changetype: [], // 手续费
    reviewrating: [], // 评论星级
    demanddept: [], // 需求人组别
    buyerstatus: [], // 买家号账号状态
    creditcardstatus: [], // 信用卡状态
    creditcardchannel: [], //信用卡渠道
    userdept: [], //数据权限-选择部门组别
    refundreason: [], //退款原因
    staffdept: [], //根据员工id获取员工部门
    shoplist: [], //获取所有店铺
    platformcost: [], //平台费承担方
    staffdept: [], //测评系统员工部门列表
};
const mutations = {
    GET_userName(state, data) {
        state.userName = data.name
        setSesstionuSername(data.name)
    },
    GET_Serviceitem(state, response) {
        state.serviceitem = response.data;
    },
    GET_Demanderlist(state, response) {
        state.demanderlist = response.data;
    },
    GET_Sitelist(state, response) {
        state.sitelist = response.data;
    },
    GET_Platformlist(state, response) {
        state.platformlist = response.data;
    },
    GET_Currency(state, response) {
        state.currency = response.data;
    },
    GET_Followerlist(state, response) {
        state.followerlist = response.data;
    },
    GET_Paymenttype(state, response) {
        state.paymenttype = response.data;
    },
    GET_Paymentmethod(state, response) {
        state.paymentmethod = response.data;
    },
    GET_Changetype(state, response) {
        state.changetype = response.data;
    },
    GET_Reviewrating(state, response) {
        state.reviewrating = response.data;
    },
    GET_Demanddept(state, response) {
        state.demanddept = response.data;
    },
    GET_Buyerstatus(state, response) {
        state.buyerstatus = response.data;
    },
    GET_Creditcardstatus(state, response) {
        state.creditcardstatus = response.data;
    },
    GET_Creditcardchannel(state, response) {
        state.creditcardchannel = response.data;
    },
    GET_Userdept(state, response) {
        state.userdept = response.data;
    },
    GET_Refundreason(state, response) {
        state.refundreason = response.data;
    },
    GET_staffdept(state, response) {
        state.staffdept = response.data;
    },
    GET_shoplist(state, response) {
        state.shoplist = response.data;
    },
    GET_platformcost(state, response) {
        state.platformcost = response.data;
    },
    GET_staffdept(state, response) {
        state.staffdept = response.data;
    },
    CLEAR_LIST(state, that) {
        that.$refs["abnormal"].resetFields();
        state.modal_fail = false;
    }
};
const actions = {
    //用户名
    getUserName({
        commit
    }, arg) {
        return new Promise((resolve, reject) => {
            getUserName().then(data => {
                if (data.code == 0) {
                    commit("GET_userName", data.data)
                    resolve()
                }
            })
        })
    },
    // 服务项目
    getServiceitem({
        commit,
        dispatch
    }, query) {
        return new Promise((resolve, reject) => {
            getServiceitem(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("GET_Serviceitem", response);
                    }
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // 需求人
    getDemanderlist({
        commit,
        dispatch
    }, query) {
        return new Promise((resolve, reject) => {
            getDemanderlist(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("GET_Demanderlist", response);
                    }
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // 站点
    getSitelist({
        commit,
        dispatch
    }, query) {
        return new Promise((resolve, reject) => {
            getSitelist(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("GET_Sitelist", response);
                    }
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // 平台
    getPlatformlist({
        commit,
        dispatch
    }, query) {
        return new Promise((resolve, reject) => {
            getPlatformlist(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("GET_Platformlist", response);
                    }
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // 币种
    getCurrency({
        commit,
        dispatch
    }, query) {
        return new Promise((resolve, reject) => {
            getCurrency(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("GET_Currency", response);
                    }
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // 测评人
    getFollowerlist({
        commit,
        dispatch
    }, query) {
        return new Promise((resolve, reject) => {
            getFollowerlist(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("GET_Followerlist", response);
                    }
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // 结算渠道
    getPaymenttype({
        commit,
        dispatch
    }, query) {
        return new Promise((resolve, reject) => {
            getPaymenttype(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("GET_Paymenttype", response);
                    }
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // 结算方式
    getPaymentmethod({
        commit,
        dispatch
    }, query) {
        return new Promise((resolve, reject) => {
            getPaymentmethod(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("GET_Paymentmethod", response);
                    }
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // 手续费
    getChangetype({
        commit,
        dispatch
    }, query) {
        return new Promise((resolve, reject) => {
            getChangetype(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("GET_Changetype", response);
                    }
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // 评论星级
    getReviewrating({
        commit,
        dispatch
    }, query) {
        return new Promise((resolve, reject) => {
            getReviewrating(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("GET_Reviewrating", response);
                    }
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // 需求人组别
    getDemanddept({
        commit,
        dispatch
    }, query) {
        return new Promise((resolve, reject) => {
            getDemanddept(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("GET_Demanddept", response);
                    }
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // 买家号账号状态
    getBuyerstatus({
        commit,
        dispatch
    }, query) {
        return new Promise((resolve, reject) => {
            getBuyerstatus(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("GET_Buyerstatus", response);
                    }
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // 信用卡状态
    getCreditcardstatus({
        commit,
        dispatch
    }, query) {
        return new Promise((resolve, reject) => {
            getCreditcardstatus(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("GET_Creditcardstatus", response);
                    }
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // 信用卡渠道
    getCreditcardchannel({
        commit,
        dispatch
    }, query) {
        return new Promise((resolve, reject) => {
            getCreditcardchannel(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("GET_Creditcardchannel", response);
                    }
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // 数据权限-选择部门组别
    getuserdept({
        commit,
        dispatch
    }, query) {
        return new Promise((resolve, reject) => {
            getuserdept(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("GET_Userdept", response);
                    }
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // 退款原因
    getRefundreason({
        commit,
        dispatch
    }, query) {
        return new Promise((resolve, reject) => {
            getRefundreason(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("GET_Refundreason", response);
                    }
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // 根据员工id获取员工部门
    getstaffdept({
        commit,
        dispatch
    }, query) {
        return new Promise((resolve, reject) => {
            getstaffdept(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("GET_staffdept", response);
                    }
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // 获取所有店铺
    getshoplist({
        commit,
        dispatch
    }, query) {
        return new Promise((resolve, reject) => {
            getshoplist(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("GET_shoplist", response);
                    }
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // 平台费承担方
    platformcost({
        commit,
        dispatch
    }, query) {
        return new Promise((resolve, reject) => {
            platformcost(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("GET_platformcost", response);
                    }
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // 异常归档
    assessorderAbnormalFile({
        commit,
        dispatch
    }, {
        data,
        that,
        name
    }) {
        return new Promise((resolve, reject) => {
            assessorderAbnormalFile(data).then(response => {
                if (response.code == 0) {
                    Message({
                        message: "归档成功！",
                        type: "success"
                    });
                }
                commit("CLEAR_LIST", that);
                setTimeout(() => {
                    router.push({
                        name
                    });
                }, 2000);
                resolve();
            });
        });
    },
    // 异常归档
    staffdept({
        commit,
        dispatch
    }, data) {
        return new Promise((resolve, reject) => {
            staffdept(data).then(response => {
                if (response.code == 0) {
                    commit("GET_staffdept", response);
                }
            });
        });
    }
};
export default {
    namespaced: true,
    state,
    mutations,
    actions
};
