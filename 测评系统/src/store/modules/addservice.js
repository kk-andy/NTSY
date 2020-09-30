import { serviceCreate, serviceUpdate,serviceRead } from "@/api/addservice"; 
import { getButtonList } from "@/api/permision";
import { GetFormValue, setFormValue,clearFormValue,clearObjValue, valueData } from "@/utils/common";
import { Message, Loading } from "element-ui";
import router from "@/router";
let loadingInstance;
const state = {
    item:{},
    showButtons: {
        addbudget: false,
        look_operationLog: false
    },
    //服务项目价卡
    serviceformData:{
        item_name: {
          label: "项目名称：",
          formType: "a-input",
          value: '',
          placeholder: "请输入项目名称",
          col: 6,
          rules: [
            {
              required: true,
              message: "请输入项目名称",
              trigger: "blur",
            },
          ],
        },
        platform: {
          label: "所属平台：",
          formType: "a-select",
          value: "",
          api: "getPlatformlist",
          format: valueData,
          props: {
              label: "name",
              value: "id"
          },
          placeholder: "请选择所属平台",
          options: [],
          col: 6,
          rules: [
            {
              required: true,
              message: "请选择所属平台",
              trigger: "change",
            },
          ],
        },
        unit_price: {
          label: "单价：",
          formType: "a-input",
          value: '',
          placeholder: "请输入单价",
          col: 6,
          rules: [
            {
              required: true,
              message: "请输入单价",
              trigger: "blur",
            },
          ],
        },
        currency: {
          label: "币种：",
          formType: "a-select",
          value: "",
          placeholder: "请选择币种",
          options: [],
          api: "getCurrency",
          format: valueData,
          col: 6,
          rules: [
            {
              required: true,
              message: "请选择币种",
              trigger: "change",
            },
          ],
        },
        America_operation_cycle: {
          label: "美洲操作时效：",
          formType: "a-input",
          value: '',
          placeholder: "请输入美洲操作时效",
          col: 6,
          rules: [
            {
              required: true,
              message: "请输入美洲操作时效",
              trigger: "blur",
            },
          ],
        },
        Europe_operation_cycle: {
          label: "欧洲操作时效：",
          formType: "a-input",
          value: '',
          placeholder: "请输入欧洲操作时效",
          col: 6,
          rules: [
            {
              required: true,
              message: "请输入欧洲操作时效",
              trigger: "blur",
            },
          ],
        },
        Japan_operation_cycle: {
          label: "日本操作时效：",
          formType: "a-input",
          value: '',
          placeholder: "请输入日本操作时效",
          col: 6,
          rules: [
            {
              required: true,
              message: "请输入日本操作时效",
              trigger: "blur",
            },
          ],
        },
        quality_explain: {
          label: "质保说明：",
          formType: "a-input",
          value: '',
          placeholder: "请输入质保说明",
          col: 6,
          rules: [
            {
              required: true,
              message: "请输入质保说明",
              trigger: "blur",
            },
          ],
        },
        platform_cost: {
          label: "平台费承担方：",
          formType: "a-select",
          value: "",
          props: {
            label: "name",
            value: "value"
        },
          api:"platformcost",
          placeholder: "请选择平台费承担方",
          options: [],
          col: 6,
          rules: [
            {
              required: true,
              message: "请选择平台费承担方",
              trigger: "change",
            },
          ],
        },
        explain: {
          label: "操作时效和要求说明：",
          formType: "a-textarea",
          value: '',
          placeholder: "请输入操作时效和要求说明",
          col: 6,
          rules: [
            {
              required: true,
              message: "请输入操作时效和要求说明",
              trigger: "blur",
            },
          ],
        },
        cost_explain: {
          label: "费用承担说明：",
          formType: "a-textarea",
          value: '',
          placeholder: "请输入费用承担说明",
          col: 6,
          rules: [
            {
              required: true,
              message: "请输入费用承担说明",
              trigger: "blur",
            },
          ],
        },
      }
};
const mutations = {
    // 获取列表
    GET_LIST(state, response) {
        state.waitTable = response.data.data;
        state.total = response.data.total;
    },
    GET_SEVER(state, res){
        setFormValue(res.data, state.serviceformData);
        state.item = res.data;
    },
    clearItem(){
        clearFormValue(state.serviceformData)
        clearObjValue(state.item)
    },
    //按钮
    GET_PRODUCT_BUTTON(state, res) {
        res.forEach(item => {
            state.showButtons[item.key] = true;
        });
    }
};
const actions = {

   // 新增
    serviceCreate({ dispatch }, data) {
        return new Promise((reslove, reject) => {
            serviceCreate(data).then(res => {
                if (res.code == 0) {
                    Message({
                        message: res.message,
                        type: "success"
                    });
                    // dispatch("GET_LIST", query);
                    router.push({ name: "ServiceItems" });
                }
            });
        });
    },
    // 更新 
    serviceUpdate({ commit, dispatch }, data) {
        return new Promise((resolve, reject) => {
            serviceUpdate(data).then(response => {
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
    // 详情 
    serviceRead({ commit, dispatch }, data) {
        return new Promise((resolve, reject) => {
            serviceRead(data).then(response => {
                // dispatch("getPurchaser", item);
                commit("GET_SEVER", response);

                resolve();
            });
        });
    },
    /* 获取按钮权限 */
    getButtonList({ commit }, query) {
        return new Promise((reslove, reject) => {
            getButtonList(query).then(res => {
                let list = [];
                res.data.buttonList.forEach(item => {
                    list.push({
                        key: item.key
                    });
                });
                commit("GET_PRODUCT_BUTTON", list);
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
