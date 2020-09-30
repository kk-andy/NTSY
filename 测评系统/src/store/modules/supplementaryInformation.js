import {
    getPurchaser,
    getCreditcard,
    getServiceitem,
    purchaserRead,
    purchaserCreate,
    purchaserUpdate,
    creditcardCreate,
    creditcardRead,
    creditcardUpdate,
    purchaserExport,
    creditcardExport,
    serviceitemExport,
    getdashboard,
    getFirstCate
} from "@/api/supplementaryInformation";
import {
    getCreditcardList
} from "@/api/commons"
import {
    getButtonList
} from "@/api/permision";
import {
    downlaod,

} from '@/utils/common'
import {
    Message,
    Loading
} from "element-ui";
import {
    tagEmail,
    tagMobile
} from "@/common/validate";
import {
    GetFormValue,
    setFormValue,
    clearFormValue,
    clearObjValue,
    valueData
} from "@/utils/common";
import router from "@/router";
import store from "@/store"
let loadingInstance;
const state = {
    dashboard: [],
    purchaserList: {},
    creditcardList: {},
    serviceitem: {},
    item: {},
    item1: {},

    showButtons: {
        addbudget: false,
        look_operationLog: false
    },
    // 买家号库
    formData: {
        account_code: {
            label: "账号编码：",
            formType: "a-input",
            value: "",
            placeholder: "系统自动生成",
            outCol: 12,
            col: 12,
            disabled: true
        },
        name: {
            label: "姓名：",
            formType: "a-input",
            value: "",
            placeholder: "请输入姓名",
            outCol: 12,
            col: 12,
            rules: [{
                max: 10,
                message: '姓名不能超过10字符'
            }]
        },

        platform: {
            label: "平台：",
            formType: "a-select",
            value: "",
            placeholder: "请选择平台",
            options: [],
            api: "getPlatformlist",
            change: (formData, item) => {

                store.dispatch("supplementaryInformation/purchaserCreditcard", {
                    platform: item.value
                })
            },
            format: valueData,
            props: {
                label: "name",
                value: "id"
            },
            outCol: 12,
            col: 12,
            rules: [{
                required: true,
                message: "请选择平台",
                trigger: "blur"
            }],
            disabled: true
        },
        sex: {
            label: "性别：",
            formType: "a-select",
            value: "",
            placeholder: "请选择性别",
            options: [{
                    label: '男',
                    value: 1
                },
                {
                    label: '女',
                    value: 2
                },
                {
                    label: '不限',
                    value: 3
                }
            ],

            outCol: 12,
            col: 12,
            props: {
                label: "label",
                value: "value"
            },

        },
        site: {
            label: "站点：",
            formType: "a-select",
            value: "",
            placeholder: "请选择站点",
            options: [],
            api: "getSitelist",
            format: valueData,
            outCol: 12,
            col: 12,
            props: {
                label: "name",
                value: "id"
            },
            rules: [{
                required: true,
                message: "请选择站点",
                trigger: "blur"
            }],
            disabled: true
        },
        phone: {
            label: "电话：",
            formType: "a-input",
            value: "",
            placeholder: "请输入电话",
            outCol: 12,
            col: 12,
            rules: [{
                trigger: "blur",
                max: 16,
                message: '最长可输入16字符'
            }]
        },
        email: {
            label: "账号邮箱：",
            formType: "a-input",
            value: "",
            placeholder: "请输入账号邮箱",
            outCol: 12,
            col: 12,
            rules: [{
                    required: true,
                    message: "请输入账号邮箱",
                    trigger: "blur"
                },
                {
                    trigger: "blur",
                    validator: tagEmail
                }
            ],
            disabled: true
        },
        adress: {
            label: "地址：",
            formType: "a-input",
            value: "",
            placeholder: "请输入地址",
            outCol: 12,
            col: 12,
            rules: [{
                max: 32,
                message: '最多填写32字符'
            }]
        },
        email_password: {
            label: "登录密码：",
            formType: "a-input",
            value: "",
            placeholder: "请输入登录密码",
            outCol: 12,
            col: 12,
            rules: [{
                required: true,
                message: "请输入登录密码",
                trigger: "blur"
            }]
        },
        city: {
            label: "城市：",
            formType: "a-input",
            value: "",
            placeholder: "请输入城市名称",
            outCol: 12,
            col: 12,
            rules: [{
                max: 16,
                message: '最多填写16字符'
            }]
        },
        password: {
            label: "邮箱密码：",
            formType: "a-input",
            value: "",
            placeholder: "请输入邮箱密码",
            outCol: 12,
            col: 12,
            rules: [{
                required: true,
                message: "请输入邮箱密码",
                trigger: "blur"
            }]
        },
        state: {
            label: "州：",
            formType: "a-input",
            value: "",
            placeholder: "请输入州名称",
            outCol: 12,
            col: 12,
            rules: [{
                max: 50,
                message: '最多填写10字符'
            }]
        },
        secondary_email: {
            label: "辅助邮箱：",
            formType: "a-input",
            value: "",
            placeholder: "请输入辅助邮箱",
            outCol: 12,
            col: 12,
            rules: [{
                trigger: "blur",
                validator: tagEmail
            }]
        },
        postal_code: {
            label: "邮编：",
            formType: "a-input",
            value: "",
            placeholder: "请输入州名称",
            outCol: 12,
            col: 12,
            rules: [{
                    type: 'string',
                    message: '邮编为数字类型'
                },
                {
                    max: 8,
                    message: '最多填写8字符'
                }
            ]
        },
        status: {
            label: "账号状态：",
            formType: "a-select",
            value: "",
            api: "getBuyerstatus",
            props: {
                label: "name",
                value: "value"
            },
            placeholder: "请选择账号状态",
            options: [],
            outCol: 12,
            col: 12,
            rules: [{
                required: true,
                message: "请选择账号状态",
                trigger: "blur"
            }]
        },
        shopping_habits: {
            label: "购物习惯：",
            formType: "a-select",
            value: [],
            api: 'getFirstCate',
            placeholder: "请选择购物习惯",
            multiple: true,
            options: [
                // {
                //     label: '男',
                //     value: 1
                // },
                // {
                //     label: '女',
                //     value: 2
                // },
                // {
                //     label: '保密',
                //     value: 3
                // }
            ],

            outCol: 12,
            col: 12,
            props: {
                label: "node_name",
                value: "node_id"
            },

        },
        ip: {
            label: "绑定IP：",
            formType: "a-input",
            value: "",
            placeholder: "请输入绑定IP",
            outCol: 12,
            col: 12,
            // rules: [
            //     {
            //         required: true,
            //         message: "请输入绑定IP",
            //         trigger: "blur"
            //     }
            // ]
        },
        ip_server: {
            label: "IP渠道：",
            formType: "a-input",
            value: "",
            placeholder: "请输入IP渠道",
            outCol: 12,
            col: 12,
            // rules: [
            //     {
            //         required: true,
            //         message: "请输入IP渠道",
            //         trigger: "blur"
            //     }
            // ]
        },

        // site: {
        //     label: "站点：",
        //     formType: "a-select",
        //     value: "",
        //     placeholder: "请选择站点",
        //     options: [],
        //     api: "getSitelist",
        //     format: valueData,
        //     col: 6,
        //     props: {
        //         label: "name",
        //         value: "id"
        //     },
        //     rules: [{
        //         required: true,
        //         message: "请选择站点",
        //         trigger: "blur"
        //     }],
        //     disabled: true
        // },
        creditcard: {
            label: "信用卡：",
            formType: "a-select",
            value: "",
            placeholder: "请输入信用卡",
            outCol: 12,
            col: 12,
            options: [],
            format: valueData,
            props: {
                label: "name",
                value: "id"
            },
            // rules: [
            //     {
            //         required: true,
            //         message: "请输入信用卡",
            //         trigger: "blur"
            //     }
            // ]
        },
        remark: {
            label: "账号备注：",
            formType: "a-textarea",
            value: "",
            placeholder: "请输入账号备注",
            outCol: 12,
            col: 12,
        }
    },
    // 信用卡库
    cardformData: {
        account_code: {
            label: "卡编号：",
            formType: "a-input",
            value: "",
            placeholder: "系统自动显示,不可编辑",
            col: 6,
            disabled: true,
        },

        creditcard: {
            label: "信用卡号：",
            formType: "a-input",
            value: '',
            placeholder: "请输入信用卡号",
            col: 6,
            rules: [{
                required: true,
                message: "请输入信用卡号",
                trigger: "blur",
            }, ],
        },
        due_date: {
            label: "到期日：",
            formType: "a-date-picker",
            value: null,
            col: 6,
            valueFormat: 'yyyy-MM',
            type: "month",
            //   type: "date",
            startPlaceholder: "开始日期",
            endPlaceholder: "结束日期",
            rules: [{
                type: "string",
                required: true,
                message: "请选择到期日",
                trigger: "change",
            }, ],
        },
        security_code: {
            label: "安全码：",
            formType: "a-input",
            value: '',
            placeholder: "请输入安全码",
            col: 6,
            rules: [{
                required: true,
                // message: "请输入安全码",
                trigger: "blur",
                validator: (rule, value, callback) => {
                    console.log(value)
                    if (!value) {
                        callback(new Error('请输入安全码'));
                    } else {
                        if (value.toString().length > 3) {
                            callback(new Error('超出3位长度限制'));
                        }
                        callback();
                    }
                }
            }],
        },
        card_channel: {
            label: "卡渠道：",
            formType: "a-select",
            value: "",
            placeholder: "请选择卡渠道",
            options: [],
            props: {
                label: "name",
                value: "value"
            },
            api: 'getCreditcardchannel',
            col: 6,
            rules: [{
                required: true,
                message: "请选择卡渠道",
                trigger: "change",
            }, ],
        },
        account_code1: {
            label: "匹配买家号：",
            formType: "a-input",
            value: '',
            placeholder: "系统自动显示,不可编辑",
            col: 6,
            disabled: true,
        },
        status: {
            label: "卡状态：",
            formType: "a-select",
            value: "",
            api: "getBuyerstatus",
            props: {
                label: "name",
                value: "value"
            },
            placeholder: "请选择卡状态",
            options: [],
            col: 6,
            rules: [{
                required: true,
                message: "请选择卡状态",
                trigger: "change",
            }, ],
        },
        currency: {
            label: "币种：",
            formType: "a-select",
            value: "",
            api: "getCurrency",
            format: valueData,
            placeholder: "请选择币种",
            options: [],
            col: 6,
            rules: [{
                required: true,
                message: "请选择币种",
                trigger: "change",
            }, ],
        },
        recharge_amount: {
            label: "历史充值金额：",
            formType: "a-input",
            value: '',
            placeholder: "系统自动显示,不可编辑",
            col: 6,
            disabled: true,
        },
        consumption_amount: {
            label: "历史消费金额：",
            formType: "a-input",
            value: '',
            placeholder: "系统自动显示,不可编辑",
            col: 6,
            disabled: true,
        },
        balance: {
            label: "当前卡余额：",
            formType: "a-input",
            value: '',
            placeholder: "系统自动显示,不可编辑",
            col: 6,
            disabled: true,
        },
    },

};
const mutations = {
    GET_dashboard(state, response) {
        state.dashboard = response.data;
    },
    GET_purchaser(state, response) {
        state.purchaserList = response.data;
    },
    GET_creditcard(state, response) {
        state.creditcardList = response.data;
    },
    GET_serviceitem(state, response) {
        state.serviceitem = response.data;
    },
    GET_BUYER(state, res) {
        setFormValue(res.data, state.formData);
        state.item = res.data;
        let arr = res.data.shopping_habits.split(',')
        state.formData.shopping_habits.value = arr
    },
    GET_BUYER1(state, res) {
        setFormValue(res.data, state.cardformData);
        state.item1 = res.data;
    },
    CHANGE_PurchaserCreditcard(state, arg) {
        state.formData.creditcard.options = arg
    },
    clearItem() {
        clearFormValue(state.formData)
        clearObjValue(state.item)

    },
    clearItem1() {
        clearFormValue(state.cardformData)
        clearObjValue(state.item1)

    },
    GET_PRODUCT_BUTTON(state, res) {
        res.forEach(item => {
            state.showButtons[item.key] = true;
        });
    },
    CHANGE_DISABLED(state, arg) {
        // console.log(state.formData)
        state.formData.platform.disabled = arg
        state.formData.site.disabled = arg
        state.formData.email.disabled = arg
    }
};
const actions = {
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
                        commit("GET_purchaser", response);
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
    // 详情 买家号库
    purchaserRead({
        commit,
        dispatch
    }, data) {
        return new Promise((resolve, reject) => {
            purchaserRead(data).then(response => {
                //信用卡列表获取
                dispatch("purchaserCreditcard", {
                    platform: response.data.platform
                })
                // dispatch("getPurchaser", item);
                commit("GET_BUYER", response);

                resolve();
            });
        });
    },
    //详情 买家号库详情 信用卡列表
    purchaserCreditcard({
        commit
    }, arg) {
        // console.log(arg, 111)
        getCreditcardList(arg).then(data => {

            if (data.code == 0) {
                let arr = Object.values(data.data);
                arr = valueData(arr)
                commit("CHANGE_PurchaserCreditcard", arr)
            }
        })
    },
    // 新增 买家号库
    purchaserCreate({
        commit,
        dispatch
    }, data) {
        return new Promise((resolve, reject) => {
            purchaserCreate(data).then(response => {
                if (response.code == 0) {

                    router.push({
                        name: "BuyerAccount"
                    });
                }

                resolve();
            });
        });
    },
    // 更新 买家号库
    purchaserUpdate({
        commit,
        dispatch
    }, data) {
        return new Promise((resolve, reject) => {
            purchaserUpdate(data).then(response => {
                if (response.code == 0) {
                    Message({
                        message: response.message,
                        type: "success"
                    });
                }
                // dispatch("getPurchaser", item);
                // commit("GET_BUYER", response);

                resolve();
            });
        });
    },
    // 详情 信用卡库
    creditcardRead({
        commit,
        dispatch
    }, data) {
        return new Promise((resolve, reject) => {
            creditcardRead(data).then(response => {
                // dispatch("getPurchaser", item);
                commit("GET_BUYER1", response);

                resolve();
            });
        });
    },
    // 新增 信用卡库 
    creditcardCreate({
        commit,
        dispatch
    }, data) {
        return new Promise((resolve, reject) => {
            creditcardCreate(data).then(response => {
                if (response.code == 0) {
                    router.push({
                        name: "CreditCard"
                    });
                }

                resolve();
            });
        });
    },
    // 更新 信用卡库
    creditcardUpdate({
        commit,
        dispatch
    }, data) {
        return new Promise((resolve, reject) => {
            creditcardUpdate(data).then(response => {
                if (response.code == 0) {
                    Message({
                        message: response.message,
                        type: "success"
                    });
                }
                // dispatch("getPurchaser", item);
                // commit("GET_BUYER", response);

                resolve();
            });
        });
    },
    getCreditcard({
        commit
    }, query) {
        loadingInstance = Loading.service({
            fullscreen: true,
            text: "拼命加载中",
            spinner: "el-icon-loading",
            target: ".main-container"
        });
        return new Promise((resolve, reject) => {
            getCreditcard(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("GET_creditcard", response);
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
    getServiceitem({
        commit
    }, query) {
        loadingInstance = Loading.service({
            fullscreen: true,
            text: "拼命加载中",
            spinner: "el-icon-loading",
            target: ".main-container"
        });
        return new Promise((resolve, reject) => {
            getServiceitem(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("GET_serviceitem", response);
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
    getdashboard({
        commit
    }, query) {
        loadingInstance = Loading.service({
            fullscreen: true,
            text: "拼命加载中",
            spinner: "el-icon-loading",
            target: ".main-container"
        });
        return new Promise((resolve, reject) => {
            getdashboard(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("GET_dashboard", response);
                    }
                    loadingInstance.close();
                    resolve();
                })
        });
    },
    // 买家号库-导出记录
    purchaserExport({
        commit,
        dispatch
    }, query) {
        return new Promise((resolve, reject) => {
            purchaserExport(query)
                .then(response => {
                    downlaod(response, `买家号库.xlsx`)
                    Message({
                        message: '导出成功',
                        type: 'success'
                    })
                    resolve();
                })
        });
    },
    // 信用卡库-导出记录
    creditcardExport({
        commit,
        dispatch
    }, query) {
        return new Promise((resolve, reject) => {
            creditcardExport(query)
                .then(response => {
                    downlaod(response, `信用卡库.xlsx`)
                    Message({
                        message: '导出成功',
                        type: 'success'
                    })
                    resolve();
                })
        });
    },
    // 信用卡库-导出记录
    serviceitemExport({
        commit,
        dispatch
    }, query) {
        return new Promise((resolve, reject) => {
            serviceitemExport(query)
                .then(response => {
                    downlaod(response, `服务项目.xlsx`)
                    Message({
                        message: '导出成功',
                        type: 'success'
                    })
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
