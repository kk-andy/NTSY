<template>
  <div class="main">
    <el-col :span="12">
      <form-component
        :form-data="formData1"
        ref="formData"
        label-width="120px"
      ></form-component>
    </el-col>
    <el-col :span="12">
      <form-component
        :form-data="formData2"
        ref="formData"
        label-width="120px"
      ></form-component>
    </el-col>
    <el-col :span="24">
      <el-divider></el-divider>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-col :span="12" v-show="isEdit">
          <el-form-item label="下单时间">
            <el-col :span="12">
              <el-input v-model="order_time" disabled></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收款账号">
            <el-col :span="12">
              <el-input
                v-show="isEdit"
                v-model="form.recipient_account"
                disabled
              ></el-input>
              <el-input
                v-show="!isEdit"
                v-model="form.recipient_account"
              ></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="采购单号" prop="order">
            <el-col :span="12">
              <el-input
                v-show="isEdit"
                v-model="form.order"
                disabled
              ></el-input>
              <el-input v-show="!isEdit" v-model="form.order"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手续费" prop="change_type">
            <el-col :span="12">
              <el-select
                v-model="form.change_type"
                placeholder="请选择"
                :disabled="isEdit"
              >
                <el-option
                  v-for="item in changetype"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="实付金额" prop="actual_amount">
            <el-col :span="12">
              <el-input
                v-show="isEdit"
                v-model="form.actual_amount"
                disabled
              ></el-input>
              <el-input
                v-show="!isEdit"
                v-model="form.actual_amount"
              ></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="测评人">
            <el-col :span="12">
              <el-select
                v-model="form.follower"
                placeholder="请选择"
                @change="followerChange"
                :disabled="isEdit"
              >
                <el-option
                  v-for="item in followerlist"
                  :key="item.staff_id"
                  :label="item.staff_name"
                  :value="item.staff_name"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="实付币种" prop="currency">
            <el-col :span="12">
              <el-select
                v-model="form.currency"
                placeholder="请选择"
                :disabled="isEdit"
              >
                <el-option
                  v-for="(item, index) in currencys"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="实发SKU">
            <el-col :span="12">
              <el-input
                v-show="isEdit"
                v-model="form.actual_sku"
                disabled
              ></el-input>
              <el-input v-show="!isEdit" v-model="form.actual_sku"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结算渠道" prop="payment_method">
            <el-col :span="12">
              <el-select
                v-model="form.payment_method"
                placeholder="请选择"
                :disabled="isEdit"
              >
                <el-option
                  v-for="item in paymenttype"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="客户类别">
            <el-col :span="12">
              <el-input
                v-show="isEdit"
                v-model="form.buyer_type"
                disabled
              ></el-input>
              <el-input v-show="!isEdit" v-model="form.buyer_type"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结算方式" prop="payment_type">
            <el-col :span="12">
              <el-select
                v-model="form.payment_type"
                placeholder="请选择"
                :disabled="isEdit"
              >
                <el-option
                  v-for="item in paymentmethod"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="平台佣金">
            <el-col :span="12">
              <el-input
                v-show="isEdit"
                v-model="form.commission"
                disabled
              ></el-input>
              <el-input v-show="!isEdit" v-model="form.commission"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="商品税费">
            <el-col :span="12">
              <el-input
                v-show="isEdit"
                v-model="form.product_tax"
                disabled
              ></el-input>
              <el-input v-show="!isEdit" v-model="form.product_tax"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="订单截图" prop="pic_url">
            <el-col :span="12">
              <el-upload
                v-show="!isEdit"
                class="upload-demo"
                ref="upload"
                multiple
                :action="orderImgAddress"
                :on-remove="orderImgRemove"
                :on-success="orderImgSuccess"
                :before-upload="beforeImgUpload"
                :headers="{
                  Authorization: token,
                }"
              >
                <el-button slot="trigger" size="small" type="primary"
                  >选取订单截图</el-button
                >
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，且不超过500kb
                </div>
              </el-upload>
              <el-button v-show="isEdit" size="small" type="primary" disabled
                >选取订单截图</el-button
              >
            </el-col>
          </el-form-item>
        </el-col>

        <el-col :span="24" style="text-align: center">
          <el-form-item>
            <el-button v-show="isEdit" type="primary" @click="isEdit = false"
              >编辑</el-button
            >
            <el-button
              v-show="!isEdit"
              type="primary"
              @click="submitForm('form', 2)"
              >提交</el-button
            >
            <el-button
              v-show="!isEdit"
              type="primary"
              @click="submitForm('form', 1)"
              >保存</el-button
            >
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-col>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { setFormValue, GetFormValue } from "@/utils/common";
import formComponent from "@/components/formComponents/form-component.vue";
import { getSesstionToken } from "@/utils/auth";
export default {
  name: "AddDemand",
  components: { formComponent },
  computed: {
    ...mapState({
      assessorderRead: (state) => state.releaseManagement.assessorderRead,
      changetype: (state) => state.commons.changetype,
      followerlist: (state) => state.commons.followerlist,
      currencys: (state) => state.commons.currency,
      paymenttype: (state) => state.commons.paymenttype,
      paymentmethod: (state) => state.commons.paymentmethod,
    }),
  },
  watch: {
    assessorderRead: {
      handler: function (newdata, olddata) {
        if (newdata) {
          setFormValue(newdata, this.formData1);
          setFormValue(newdata, this.formData2);
          Object.keys(this.form).forEach((item) => {
            this.form[item] = newdata[item];
          });
          this.form.order = newdata.order_id;
          this.order_time = newdata.order_time;
          let arr = [];
          if (newdata.pic) {
            newdata.pic.forEach((item) => {
              if (item.type == 1) {
                arr.push(item);
              }
            });
            this.formData2.commentImg.value = arr;
          }
        }
      },
      deep: true,
    },
  },
  created() {
    if (this.$route.query.id) {
      let query = {
        id: this.$route.query.id,
      };
      this.$store.dispatch("releaseManagement/assessorderRead", query);
    }
    this.$store.dispatch("commons/getCurrency");
    this.$store.dispatch("commons/getChangetype");
    this.$store.dispatch("commons/getFollowerlist");
    this.$store.dispatch("commons/getPaymenttype");
    this.$store.dispatch("commons/getPaymentmethod");
  },
  data() {
    return {
      token: "",
      order_time: "",
      isEdit: true,
      orderImg: [],
      orderImgAddress: `${process.env.VUE_APP_BASE_API}/index.php/api/v1/uploads/imageUploads`,
      form: {
        type: "",
        assess_id: "",
        order: "",
        actual_amount: "",
        currency: "",
        payment_type: "",
        payment_method: "",
        recipient_account: "",
        change_type: "",
        actual_sku: "",
        buyer_type: "",
        follower_id: "",
        follower: "",
        commission: "", //平台佣金
        product_tax: "", //商品税费
        pic_url: [], //订单截图
      },
      rules: {
        order: [{ required: true, message: "请输入采购单号", trigger: "blur" }],
        actual_amount: [
          { required: true, message: "请填写实付金额", trigger: "blur" },
        ],
        change_type: [
          { required: true, message: "请选择手续费", trigger: "change" },
        ],
        currency: [
          { required: true, message: "请选择实付币种", trigger: "change" },
        ],
        payment_type: [
          { required: true, message: "请选择结算方式", trigger: "change" },
        ],
        payment_method: [
          { required: true, message: "请选择返款渠道", trigger: "change" },
        ],
        pic_url: [
          { required: true, message: "请上传订单截图", trigger: "change" },
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
          label: "审核备注",
          formType: "a-textarea",
          rows: 4,
          value: 1,
          col: 12,
          disabled: true,
        },
      },
    };
  },
  methods: {
    followerChange(data) {
      let that = this;
      let testData = that.followerlist.filter((item) => {
        return item.staff_name === data;
      });
      // debugger;
      that.form.follower_id = testData[0].staff_id;
    },
    submitForm(formName, type) {
      this.form.type = type;
      this.form.assess_id = this.$route.query.id;
      this.$refs.form.validate((valid) => {
        console.log(this.form);
        if (valid) {
          this.$store.dispatch(
            "releaseManagement/assessorderSubmit",
            this.form
          );
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //验证上传图片格式
    beforeImgUpload(file) {
      var testmsg = /^image\/(jpeg|png|jpg)$/.test(file.type);
      if (!testmsg) {
        this.$message.error("上传图片格式不对!");
      }
      return testmsg;
    },
    //订单截图取消
    orderImgRemove(file, fileList) {
      if (file.response) {
        let i = this.form.pic_url.indexOf(file.response.data.url);
        if (i != -1) {
          this.form.pic_url.splice(i, 1);
        }
      }
    },
    //订单截图上传成功
    orderImgSuccess(response, file, fileList) {
      //初始化
      if (!this.form.pic_url) {
        this.form.pic_url = [];
      }
      if (response.code == 0) {
        this.form.pic_url.push(response.data.url);
      }
    },
  },
  mounted() {
    this.token = getSesstionToken();
  },
};
</script>