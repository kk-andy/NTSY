import {
    getAssessabnormal,
    restore,
    read,
    checkRead,
    submit,
    exportRecord,
    assessorderAbnormalFile
} from "@/api/abnormalStatistics";
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
import {
    GetFormValue,
    setFormValue,
    valueData
} from "@/utils/common";
import router from "@/router";
let loadingInstance;
const state = {
    assessabnormal: {
        list: [{
            ntcp_id: 111,
            id: 12
        }],
        total: 10
    },
    showButtons: {
        search: false,
        exportBtn: false,
        recover: false,
    },
    abnormal: {
        id: "",
        reason: "",
        currency: "",
        actual_amount: "",
        refund_reason: ""
    },
    modal_fail: false,
    formData1: {
        amount: {
            label: "下单价格",
            formType: "a-input",
            value: 1,
            col: 12,
            disabled: true,
        },
        currency: {
            label: "币种",
            formType: "a-input",
            value: 1,
            col: 12,
            disabled: true,
        },
        comment_content: {
            label: "评论内容",
            formType: "a-textarea",
            rows: 2,
            value: 1,
            col: 12,
            disabled: true,
        },
        commentImg: {
            label: "评论图片",
            formType: "a-img",
            value: [],
            readOnly: true,
        },
        server_fee: {
            label: "服务费",
            formType: "a-input",
            value: 1,
            col: 12,
            disabled: true,
        },
        remark: {
            label: "订单备注",
            formType: "a-textarea",
            rows: 3,
            value: 1,
            col: 12,
            disabled: true,
        },
        aDivider: {
            formType: "a-divider",
            col: 24,
        },
        buyer_account: {
            label: "买家账号",
            formType: "a-input",
            value: 1,
            col: 12,
            disabled: true,
        },
        follower_remark: {
            label: "测评人备注",
            formType: "a-textarea",
            rows: 2,
            value: 1,
            col: 12,
            disabled: true,
        },
        aDividers: {
            formType: "a-divider",
            col: 24,
        },
        recipient_account: {
            label: "收款账号",
            formType: "a-input",
            value: 1,
            col: 12,
            disabled: true,
        },
        change_type: {
            label: "手续费",
            formType: "a-input",
            value: 1,
            col: 12,
            disabled: true,
        },
        follower: {
            label: "测评人",
            formType: "a-input",
            value: 1,
            col: 12,
            disabled: true,
        },
        actual_sku: {
            label: "实发SKU",
            formType: "a-input",
            value: 1,
            col: 12,
            disabled: true,
        },
        buyer_type: {
            label: "客户类别",
            formType: "a-input",
            value: 1,
            col: 12,
            disabled: true,
        },
        aDivider3: {
            formType: "a-divider",
            col: 24,
        },
        shop_name: {
            label: "发货店铺",
            formType: "a-input",
            value: 1,
            col: 12,
            disabled: true,
        },
        receive_address: {
            label: "收货地址",
            formType: "a-input",
            value: 1,
            col: 12,
            disabled: true,
        },
        ship_fee: {
            label: "配送运费",
            formType: "a-input",
            value: 1,
            col: 12,
            disabled: true,
        },
        aDivider4: {
            formType: "a-divider",
            col: 24,
        },
        review_link: {
            label: "评论链接",
            formType: "a-input",
            value: 1,
            col: 12,
            disabled: true,
        },
        review_rating: {
            label: "评论星级",
            formType: "a-input",
            value: 1,
            col: 12,
            disabled: true,
        },
    },
    formData: {
        ntcp_id: {
            label: "需求编号：",
            formType: "a-input",
            value: "",
            placeholder: "请输入需求编号",
            col: 12,
            disabled: true
        },
        create_at: {
            label: "提交日期：",
            formType: "a-input",
            value: "",
            placeholder: "请输入提交日期",
            col: 12,
            disabled: true
        },
        type: {
            label: "服务类型：",
            formType: "a-input",
            value: "",
            placeholder: "请输入服务类型",
            col: 12,
            disabled: true
        },
        server_name: {
            label: "服务项目：",
            formType: "a-input",
            value: "",
            placeholder: "请输入服务项目",
            col: 12,
            disabled: true
        },
        staff_name: {
            label: "需求人：",
            formType: "a-input",
            value: "",
            placeholder: "请输入需求人",
            col: 12,
            disabled: true
        },
        store_name: {
            label: "店铺简称：",
            formType: "a-input",
            value: "",
            placeholder: "请输入店铺简称",
            col: 12,
            disabled: true
        },
        platform: {
            label: "平台：",
            formType: "a-input",
            value: "",
            placeholder: "请输入平台",
            col: 12,
            disabled: true
        },
        site: {
            label: "站点：",
            formType: "a-input",
            value: "",
            placeholder: "请输入站点",
            col: 12,
            disabled: true
        },
        sku: {
            label: "SKU：",
            formType: "a-input",
            value: "",
            placeholder: "请输入SKU",
            col: 12,
            disabled: true
        },
        ASIN: {
            label: "ASIN：",
            formType: "a-input",
            value: "",
            placeholder: "请输入ASIN",
            col: 12,
            disabled: true
        },
        keyword: {
            label: "关键词：",
            formType: "a-input",
            value: "",
            placeholder: "请输入关键词",
            col: 12,
            disabled: true
        },
        keyword_position: {
            label: "关键词位置：",
            formType: "a-textarea",
            value: 1,
            placeholder: "请输入关键词位置",
            col: 12,
            disabled: true
        },
        order_time: {
            label: "下单时间：",
            formType: "a-input",
            value: "",
            placeholder: "请输入下单时间",
            col: 12,
            disabled: true
        },
        order_id: {
            label: "采购单号：",
            formType: "a-input",
            value: "",
            placeholder: "请输入采购单号",
            col: 12,
            disabled: true
        },
        actual_amount: {
            label: "实付金额：",
            formType: "a-input",
            value: "",
            placeholder: "请输入实付金额",
            col: 12,
            disabled: true
        },
        currency: {
            label: "实付币种：",
            formType: "a-input",
            value: "",
            placeholder: "请输入实付币种",
            col: 12,
            disabled: true
        },
        payment_type: {
            label: "结算渠道：",
            formType: "a-input",
            value: "",
            placeholder: "请输入结算渠道",
            col: 12,
            disabled: true
        },
        payment_method: {
            label: "结算方式：",
            formType: "a-input",
            value: "",
            placeholder: "请输入结算方式",
            col: 12,
            disabled: true
        },
        ship_type: {
            label: "物流方式",
            formType: "a-input",
            value: 1,
            col: 12,
            disabled: true
        },
        track_num: {
            label: "物流单号",
            formType: "a-input",
            value: 1,
            col: 12,
            disabled: true
        },
        ship_status: {
            label: "物流状态",
            formType: "a-input",
            value: 1,
            col: 12,
            disabled: true
        },
        es_arrival_date: {
            label: "预计到达时间",
            formType: "a-input",
            value: 1,
            col: 12,
            disabled: true
        },
        review_date: {
            label: "评论日期",
            formType: "a-input",
            value: 1,
            col: 12,
            disabled: true
        },
        screenshot: {
            label: "评论截图",
            formType: "a-img",
            value: [],
            readOnly: true,
        },
    },
    formData3: {
        assess_id: {
            label: "返款状态：",
            formType: "a-select",
            value: "",
            // api:'getListall',
            //   props: {
            //     label: "ruleName",
            //     value: "id",
            //   },
            placeholder: "请选择返款状态",
            options: [],
            col: 12,
            rules: [{
                required: true,
                message: "请选择返款状态",
                trigger: "change"
            }]
        },
        real_amount: {
            label: "实返金额：",
            formType: "a-input",
            value: "",
            placeholder: "请输入实返金额",
            col: 12,
            disabled: true,
            rules: [{
                required: true,
                message: "请输入实返金额",
                trigger: "blur"
            }]
        },
        currency: {
            label: "币种：",
            formType: "a-select",
            value: "",
            api: "getCurrency",
            format: valueData,
            placeholder: "请选择币种",
            options: [],
            col: 12,
            rules: [{
                required: true,
                message: "请选择币种",
                trigger: "change"
            }]
        }
    },
    formData4: {
        payment_account: {
            label: "返款交易号：",
            formType: "a-input",
            value: "",
            placeholder: "请输入返款交易号",
            col: 12,
            disabled: true,
            rules: [{
                required: true,
                message: "请输入返款交易号",
                trigger: "blur"
            }]
        },
        refund_date: {
            label: "返款日期：",
            formType: "a-date-picker",
            value: undefined,
            col: 12,
            // type: "daterange",
            type: "date",
            // startPlaceholder: "开始日期",
            // endPlaceholder: "结束日期",
            rules: [{
                type: "string",
                required: true,
                message: "返款日期",
                trigger: "change"
            }]
        },
        remark1: {
            label: "返款截图：",
            formType: "a-img",
            col: 24,
            limit: 5,
            value: [{
                name: "11",
                url: "http://file.nantang-tech.com/uploads/20200803/a44c32bc7248049f4c152c0998d590d9.jpg"
            }]
        }
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
    }
};
const mutations = {
    GET_assessabnormal(state, response) {
        state.assessabnormal = response.data;
    },
    GET_PRODUCT_BUTTON(state, res) {
        res.forEach(item => {
            state.showButtons[item.key] = true;
        });
    },
    GET_READLIST(state, res) {
        console.log(res);
        let from = {
            ...state.formData1,
            ...state.formData,
            ...state.formData3,
            ...state.formData4
        };
        setFormValue(res.data, from);
        let commentImg = [];
        let screenshot = [];
        if (res.data.pic) {
            res.data.pic.forEach((item) => {
                if (item.type == 1) {
                    commentImg.push(item);
                } else if (item.type == 2) {
                    screenshot.push(item);
                }
            });
        }
        state.formData.screenshot.value = screenshot;
        state.formData1.commentImg.value = commentImg;
    },
    CLEAR_LIST(state, that) {
        that.$refs["abnormal"].resetFields();
        state.modal_fail = false;
    },
    GET_BUTTON_LIST(state, list) {
        list.forEach(item => {
            state.showButtons[item.key] = true
        })
    }
};
const actions = {
    getAssessabnormal({
        commit
    }, query) {
        loadingInstance = Loading.service({
            fullscreen: true,
            text: "拼命加载中",
            spinner: "el-icon-loading",
            target: ".main-container"
        });
        return new Promise((resolve, reject) => {
            getAssessabnormal(query)
                .then(response => {
                    if (response.code == 0) {
                        commit("GET_assessabnormal", response);
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
    //回复原环节
    restore({
        commit,
        dispatch
    }, {
        id,
        query
    }) {
        return new Promise((resolve, reject) => {
            restore({
                id
            }).then(response => {
                if (response.code == 0) {
                    dispatch("getAssessabnormal", query);
                }
                resolve();
            });
        });
    },
    //异常归档详情
    read({
        commit,
        dispatch
    }, data) {
        return new Promise((resolve, reject) => {
            read(data).then(response => {
                if (response.code == 0) {
                    // dispatch("getAssessabnormal", query);
                    commit("GET_READLIST", response);
                }
                resolve();
            });
        });
    },
    //测评详情
    checkRead({
        commit,
        dispatch
    }, data) {
        return new Promise((resolve, reject) => {
            checkRead(data).then(response => {
                if (response.code == 0) {
                    // dispatch("getAssessabnormal", query);
                    commit("GET_READLIST", response);
                }
                resolve();
            });
        });
    },
    // 二次返款提交
    submit({
        commit,
        dispatch
    }, {
        data,
        name,
        that
    }) {
        return new Promise((resolve, reject) => {
            submit(data).then(response => {
                if (response.code == 0) {
                    setTimeout(() => {
                        router.push({
                            name
                        });
                    }, 2000);
                }
                resolve();
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
    // 导出记录
    exportRecord({
        commit,
        dispatch
    }, query) {
        return new Promise((resolve, reject) => {
            exportRecord(query)
                .then(response => {
                    downlaod(response, `异常归档.xlsx`)
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
