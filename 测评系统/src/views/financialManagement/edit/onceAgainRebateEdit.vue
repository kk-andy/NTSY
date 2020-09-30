<template>
  <div class="main">
    <h2 style="margin-left:10px;margin-bottom:10px;">返款审核</h2>
    <el-col :span="12">
      <form-component :form-data="formData1" ref="formData" label-width="120px"></form-component>
    </el-col>
    <el-col :span="12">
      <form-component :form-data="formData2" ref="formData" label-width="120px"></form-component>
    </el-col>
    <el-col :span="24">
      <el-form ref="form" :model="form" label-width="120px" :rules="rules">
        <el-col v-show="!isEdit">
          <el-divider></el-divider>
          <el-col :span="12">
            <el-form-item label="返款账号" prop="payment_account">
              <el-col :span="12">
                <el-input placeholder="返款账号" v-model="form.payment_account"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="返款日期" prop="refund_date">
              <el-date-picker
                v-model="form.refund_date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="实返金额" prop="real_amount">
              <el-col :span="12">
                <el-input placeholder="实返金额" v-model="form.real_amount"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="币种" prop="currency">
              <el-select v-model="form.currency" placeholder="请选择币种">
                <el-option
                  v-for="(item,index) in currency"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="返款截图" prop="pic_url">
              <oss-upload-img :limit="3" @on-before="beforeAvatarUpload" v-model="form.pic_url"></oss-upload-img>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="返款备注" prop="remark">
              <el-input placeholder="返款备注" type="textarea" v-model="form.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="24" style="text-align:center;">
          <el-form-item v-show="isEdit">
            <el-button type="primary" @click="isEdit=false">二次返款</el-button>
            <el-button type="danger" @click="modal_fail=true">异常归档</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
          <el-form-item v-show="!isEdit">
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-col>
    <Modal
      v-model="modal_fail"
      title="归档原因"
      width="30%"
      footer-hide
      class-name="vertical-center-modal"
      @on-cancel="resetForm"
    >
      <div class="modal_tontent">
        <el-form ref="abnormal" :model="abnormal" :rules="rules1" label-width="80px">
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
              <el-option v-for="(item,index) in currency" :key="index" :label="item" :value="item"></el-option>
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
import formComponent from "@/components/formComponents/form-component.vue";
import ossUploadImg from "@/components/uploads/ossUpload";
import { mapState } from "vuex";
import {
  assessrefundagainRead,
  assessrefundagainSubmit,
} from "@/api/financialManagement";
import { setFormValue } from "@/utils/common";
export default {
  name: "AddDemand",
  components: { formComponent, ossUploadImg },
  computed: {
    ...mapState({
      currency: (state) => state.commons.currency,
      refundreason: (state) => state.commons.refundreason,
      rules1: (state) => state.commons.rules,
    }),
    modal_fail: {
      get() {
        return this.$store.state.commons.modal_fail;
      },
      set(val) {
        this.$store.state.commons.modal_fail = val;
      },
    },
    abnormal: {
      get() {
        return this.$store.state.commons.abnormal;
      },
      set(val) {
        this.$store.state.commons.abnormal = val;
      },
    },
  },
  data() {
    return {
      isEdit: true,
      form: {
        assess_id: "",
        real_amount: "",
        currency: "",
        payment_account: "",
        refund_date: "",
        remark: "",
        pic_url: [],
      },
      rules: {
        refund_date: [
          {
            type: "string",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        real_amount: [{ required: true, message: "实际金额", trigger: "blur" }],
        payment_account: [
          { required: true, message: "返款账号", trigger: "blur" },
        ],
        currency: [{ required: true, message: "币种", trigger: "change" }],
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
  mounted() {
    this.$store.dispatch("commons/getRefundreason");
    this.$store.dispatch("commons/getCurrency");
    this.role = Object.keys(this.$route.query)[0]; // 获取进入当前进入的模块
    this.paramsId = this.$route.query[this.role]; // 根据键值获取参数对应的值
    this.getList();
  },
  methods: {
    async getList() {
      let res = await assessrefundagainRead({ id: this.paramsId });
      let form = {
        ...this.formData1,
        ...this.formData2,
      };
      setFormValue(res.data, form);
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
      this.formData1.screenshot.value = screenshot;
      this.formData2.commentImg.value = commentImg;
    },
    imgValid() {
      let url = [];
      this.form.pic_url.forEach((item) => {
        url.push(item.url);
      });
      return url;
    },
    submitForm() {
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          let data = {
            ...this.form,
          };
          data.pic_url = this.imgValid();
          data.assess_id = this.paramsId;
          let res = await assessrefundagainSubmit(data);
          if (res.code == 0) {
            this.$message({
              message: res.message,
              type: "success",
            });
            setTimeout(() => {
              this.$router.push({ name: "OnceAgainRebate" });
            }, 2000);
          }
        }
      });
    },
    beforeAvatarUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message({
          message: "上传文件大小不能超过 2MB!",
          type: "warning",
        });
      }
      return isLt2M;
    },
    onSubmit(formName) {
      this.abnormal.id = this.paramsId;
      let query = {
        data: this.abnormal,
        that: this,
        name: "OnceAgainRebate",
      };
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch("commons/assessorderAbnormalFile", query);
        }
      });
    },
    resetForm() {
      this.$store.commit("commons/CLEAR_LIST", this);
    },
    cancel() {
      this.$router.push({
        name: "OnceAgainRebate",
      });
    },
  },
};
</script>