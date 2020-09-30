<template>
  <div class="main">
    <el-col :span="12">
      <form-component :form-data="formData1" ref="formData" label-width="120px"></form-component>
    </el-col>
    <el-col :span="12">
      <form-component :form-data="formData2" ref="formData" label-width="120px"></form-component>
    </el-col>
    <el-col :span="24" style="text-align:center;padding:0 0 20px 0;">
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button type="danger" @click="abnormalClick">异常</el-button>
      <el-button>取消</el-button>
    </el-col>
    <Modal
      v-model="modal_fail"
      title="归档原因"
      width="30%"
      footer-hide
      class-name="vertical-center-modal"
      @on-cancel="cancelFail"
    >
      <div class="modal_tontent">
        <el-form ref="abnormal" :model="abnormal" :rules="rules" label-width="80px">
          <el-form-item label="归档原因" prop="reason">
            <el-input type="textarea" v-model="abnormal.reason" placeholder="输入归档原因"></el-input>
          </el-form-item>
          <el-form-item label="退款金额" prop="actual_amount">
            <el-col :span="11">
              <el-input v-model="abnormal.actual_amount" placeholder="输入退款金额"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="退款币种" prop="currency">
            <el-select v-model="abnormal.currency" placeholder="请选择退款币种">
              <el-option v-for="(item,index) in currencys" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="退款原由" prop="refund_reason">
            <el-select v-model="abnormal.refund_reason" placeholder="请选择退款原由">
              <el-option
                v-for="item in refundreason"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('abnormal')">提交</el-button>
            <el-button @click="resetForm('abnormal')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { setFormValue, GetFormValue } from "@/utils/common";
import formComponent from "@/components/formComponents/form-component.vue";
export default {
  name: "AddDemand",
  components: { formComponent },
  computed: {
    ...mapState({
      assesssellerauditRead: (state) =>
        state.releaseManagement.assesssellerauditRead,
      currencys: (state) => state.commons.currency,
      refundreason: (state) => state.commons.refundreason,
    }),
    modal_fail: {
      get() {
        return this.$store.state.releaseManagement.modal_fail;
      },
      set(val) {
        this.$store.state.releaseManagement.modal_fail = val;
      },
    },
  },
  watch: {
    assesssellerauditRead: {
      handler: function (newdata, olddata) {
        if (newdata) {
          setFormValue(newdata, this.formData1);
          setFormValue(newdata, this.formData2);
          let commentImg = [];
          let screenshot = [];
          let orderImg = [];
          if (newdata.pic) {
            newdata.pic.forEach((item) => {
              if (item.type == 1) {
                commentImg.push(item);
              } else if (item.type == 2) {
                screenshot.push(item);
              } else if (item.type == 4) {
                orderImg.push(item);
              }
            });
          }
          this.formData1.screenshot.value = screenshot;
          this.formData2.commentImg.value = commentImg;
          this.formData2.orderImg.value = orderImg;
        }
      },
    },
    deep: true,
    immediate: true,
  },
  created() {
    if (this.$route.query.id) {
      let query = {
        id: this.$route.query.id,
      };
      this.$store.dispatch("releaseManagement/assesssellerauditRead", query);
    }
    this.$store.dispatch("commons/getRefundreason");
    this.$store.dispatch("commons/getCurrency");
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      isEdit: true,
      abnormal: {
        id: "",
        reason: "",
        currency: "",
        actual_amount: "",
        refund_reason: "",
      },
      rules: {
        reason: [
          { required: true, message: "请输入归档原因", trigger: "blur" },
        ],
        currency: [
          {
            type: "string",
            required: true,
            message: "请输入退款币种",
            trigger: "blur",
          },
        ],
        actual_amount: [
          { required: true, message: "请选择退款金额", trigger: "change" },
        ],
        refund_reason: [
          { required: true, message: "请选择退款原由", trigger: "change" },
        ],
      },
      formData1: {
        ntcp_id: {
          label: "需求编号",
          formType: "a-input",
          value: 1,
          col: 12,
          disabled: true,
        },
        create_at: {
          label: "提交日期",
          formType: "a-input",
          value: 1,
          col: 12,
          disabled: true,
        },
        type: {
          label: "服务类型",
          formType: "a-input",
          value: 1,
          col: 12,
          disabled: true,
        },
        server_name: {
          label: "服务项目",
          formType: "a-input",
          value: 1,
          col: 12,
          disabled: true,
        },
        staff_name: {
          label: "需求人",
          formType: "a-input",
          value: 1,
          col: 12,
          disabled: true,
        },
        store_name: {
          label: "店铺简称",
          formType: "a-input",
          value: 1,
          col: 12,
          disabled: true,
        },
        platform: {
          label: "平台",
          formType: "a-input",
          value: 1,
          col: 12,
          disabled: true,
        },
        site: {
          label: "站点",
          formType: "a-input",
          value: 1,
          col: 12,
          disabled: true,
        },
        sku: {
          label: "SKU",
          formType: "a-input",
          value: 1,
          col: 12,
          disabled: true,
        },
        ASIN: {
          label: "ASIN",
          formType: "a-input",
          value: 1,
          col: 12,
          disabled: true,
        },
        keyword: {
          label: "关键词",
          formType: "a-textarea",
          rows: 2,
          value: 1,
          col: 12,
          disabled: true,
        },
        keyword_position: {
          label: "关键词位置",
          formType: "a-textarea",
          rows: 3,
          value: 1,
          col: 12,
          disabled: true,
        },
        order_time: {
          label: "下单时间",
          formType: "a-input",
          value: 1,
          col: 12,
          disabled: true,
        },
        order_id: {
          label: "采购单号",
          formType: "a-input",
          value: 1,
          col: 12,
          disabled: true,
        },
        actual_amount: {
          label: "实付金额",
          formType: "a-input",
          value: 1,
          col: 12,
          disabled: true,
        },
        currency: {
          label: "实付币种",
          formType: "a-input",
          value: 1,
          col: 12,
          disabled: true,
        },
        payment_type: {
          label: "结算渠道",
          formType: "a-input",
          value: 1,
          col: 12,
          disabled: true,
        },
        payment_method: {
          label: "结算方式",
          formType: "a-input",
          value: 1,
          col: 12,
          disabled: true,
        },
        ship_type: {
          label: "物流方式",
          formType: "a-input",
          value: 1,
          col: 12,
          disabled: true,
        },
        track_num: {
          label: "物流单号",
          formType: "a-input",
          value: 1,
          col: 12,
          disabled: true,
        },
        ship_status: {
          label: "物流状态",
          formType: "a-input",
          value: 1,
          col: 12,
          disabled: true,
        },
        es_arrival_date: {
          label: "预计到达时间",
          formType: "a-input",
          value: 1,
          col: 12,
          disabled: true,
        },
        review_date: {
          label: "评论日期",
          formType: "a-input",
          value: 1,
          col: 12,
          disabled: true,
        },
        screenshot: {
          label: "评论截图",
          formType: "a-img",
          value: [],
          readOnly: true,
        },
      },
      formData2: {
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
        orderImg: {
          label: "订单截图",
          formType: "a-img",
          value: [],
          readOnly: true,
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
    };
  },
  methods: {
    onSubmit(formName) {
      let query = this.abnormal;
      let item = this.form;
      let port = "getAssessreview";
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch("releaseManagement/assessorderAbnormalFile", {
            query,
            item,
            port,
          });
        }
      });
    },
    submitForm() {
      this.$store.dispatch("releaseManagement/assesssellerauditRelease", {
        id: this.assesssellerauditRead.id,
      });
    },
    abnormalClick() {
      this.abnormal.id = this.assesssellerauditRead.id;
      this.modal_fail = true;
    },
    cancelFail() {
      this.modal_fail = false;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>