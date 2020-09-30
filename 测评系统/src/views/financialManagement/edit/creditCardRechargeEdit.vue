<template>
  <div class="main">
    <el-col :span="12">
      <form-component :form-data="formData1" ref="formData" label-width="150px"></form-component>
    </el-col>
    <el-col :span="24">
      <el-col :span="12" style="text-align: center" v-show="isEdit">
        <el-button type="primary" @click="isEdit=false">编辑</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-col>
      <el-col :span="12" style="text-align: center" v-show="!isEdit">
        <el-button type="primary" @click="submitForm">充值</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-col>
    </el-col>
  </div>
</template>
<script>
import formComponent from "@/components/formComponents/form-component.vue";
import {
  setFormValue,
} from "@/utils/common";
import { creditcardrechangeRead,creditcardrechangeCreate } from "@/api/financialManagement";
export default {
  name: "AddDemand",
  components: { formComponent },
  data() {
    let that = this;
    return {
      isEdit: true,
      formData1: {
        account_code: {
          label: "卡编号",
          formType: "a-input",
          value: "",
          col: 12,
          disabled: true,
          // placeholder: "请输入站点名称",
        },
        creditcard: {
          label: "信用卡号",
          formType: "a-input",
          value: "",
          col: 12,
          disabled: true,
          // placeholder: "请输入站点名称",
        },
        due_date: {
          label: "到期日",
          formType: "a-input",
          value: "",
          col: 12,
          disabled: true,
          // placeholder: "请输入站点名称",
        },
        security_code: {
          label: "安全码",
          formType: "a-input",
          value: "",
          col: 12,
          disabled: true,
          // placeholder: "请输入站点名称",
        },
        card_channel: {
          label: "卡渠道：",
          formType: "a-select",
          value: "",
          placeholder: "请选择卡渠道",
          options: [],
          props: {
            label: "name",
            value: "value",
          },
          api: "getCreditcardchannel",
          col: 12,
          disabled: true,
          // placeholder: "请输入站点名称",
        },
        create_by: {
          label: "匹配买家号",
          formType: "a-input",
          value: "",
          col: 12,
          disabled: true,
          // placeholder: "请输入站点名称",
        },
        status: {
          label: "卡状态",
          formType: "a-select",
          value: "",
          api: "getBuyerstatus",
          props: {
            label: "name",
            value: "value",
          },
          placeholder: "请选择卡状态",
          options: [],
          col: 12,
          disabled: true,
          // placeholder: "请输入站点名称",
        },
        recharge_amount: {
          label: "历史充值金额",
          formType: "a-input",
          value: "",
          col: 12,
          disabled: true,
          // placeholder: "请输入站点名称",
        },
        consumption_amount: {
          label: "历史消费金额",
          formType: "a-input",
          value: "",
          col: 12,
          disabled: true,
          // placeholder: "请输入站点名称",
        },
        balance: {
          label: "当前卡余额",
          formType: "a-input",
          value: "",
          col: 12,
          disabled: true,
        },
        title: {
          //sky-aDivider
          col: 24,
          formType: "a-divider",
          displayWith: function (a, b) {
            return !that.isEdit;
          },
        },
        unpaid_amount: {
          label: "尚未充值消费金额",
          formType: "a-input",
          value: "",
          col: 12,
          disabled: true,
          displayWith: function (a, b) {
            return !that.isEdit;
          },
        },
        amount: {
          label: "确认充值金额",
          formType: "a-input",
          value: "",
          col: 12,
          rules: [
            {
              required: true,
              message: "请输入充值金额",
              trigger: "blur",
            },
          ],
          placeholder: "请输入确认充值金额",
          displayWith: function (a, b) {
            return !that.isEdit;
          },
        },
      },
    };
  },
  mounted() {
    this.role = Object.keys(this.$route.query)[0]; // 获取进入当前进入的模块
    this.paramsId = this.$route.query[this.role]; // 根据键值获取参数对应的值
    this.getList();
  },
  methods: {
    async getList() {
      let res = await creditcardrechangeRead({ id: this.paramsId });
      setFormValue(res.data, this.formData1);
    },
    submitForm() {
      this.$refs["formData"].validate(async( valid) => {
        if (valid) {
          let data = {
            card_id:this.paramsId,
            amount:this.formData1.amount.value,
          }
          let res = await creditcardrechangeCreate(data)
          if (res.code == 0) {
            this.$message({
               message: res.message,
               type: "success"
            })
            setTimeout(() => {
              this.$router.push({name:'CreditCardRecharge'})
            }, 2000);
          }
        }
      });
    },
    cancel(){
      this.$router.push({
        name:'CreditCardRecharge'
      })
    }
  },
};
</script>