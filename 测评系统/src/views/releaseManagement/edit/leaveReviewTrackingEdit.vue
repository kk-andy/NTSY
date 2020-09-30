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
        <el-col :span="12">
          <el-form-item
            label="评论链接"
            prop="review_link"
            placeholder="请输入评论链接"
          >
            <el-col :span="12">
              <el-input
                v-model="form.review_link"
                :disabled="isEdit"
              ></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="评论日期" prop="review_date">
            <el-col :span="12">
              <el-date-picker
                placeholder="选择日期"
                v-model="form.review_date"
                value-format="yyyy-MM-dd"
                clearable
                style="width: 100%"
                :disabled="isEdit"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="评论星级" prop="review_rating">
            <el-col :span="12">
              <el-select
                v-model="form.review_rating"
                placeholder="请选择"
                :disabled="isEdit"
              >
                <el-option
                  v-for="item in reviewratings"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="评论截图">
            <oss-upload-img
              :limit="8"
              v-model="form.screenshot"
              :readOnly="isEdit"
              :headers="{ Authorization: token }"
            ></oss-upload-img>
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
              @click="submitForm('form')"
              >提交</el-button
            >
            <el-button @click="resetForm('form')">取消</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-col>
  </div>
</template>
<script>
import { mapState } from "vuex";
import ossUploadImg from "@/components/uploads/ossUpload";
import { setFormValue, GetFormValue } from "@/utils/common";
import formComponent from "@/components/formComponents/form-component.vue";
import { getSesstionToken } from "@/utils/auth";
export default {
  name: "AddDemand",
  components: { formComponent, ossUploadImg },
  computed: {
    ...mapState({
      assessreviewRead: (state) => state.releaseManagement.assessreviewRead,
      assessshipShipInfo: (state) => state.releaseManagement.assessshipShipInfo,
      reviewratings: (state) => state.commons.reviewrating,
    }),
  },
  watch: {
    assessreviewRead: {
      handler: function (newdata, olddata) {
        if (newdata) {
          setFormValue(newdata, this.formData1);
          setFormValue(newdata, this.formData2);
          let arr1 = [];
          let arr2 = [];
          if (newdata.pic) {
            newdata.pic.forEach((item) => {
              if (item.type == 1) {
                arr1.push(item);
              }
              if (item.type == 4) {
                arr2.push(item);
              }
            });
          }
          this.formData2.commentImg.value = arr1;
          this.formData2.orderImg.value = arr2;
        }
      },
    },
    deep: true,
    immediate: true,
    assessshipShipInfo: {
      handler: function (newdata, olddata) {
        if (newdata) {
          this.form.ship_type = newdata.shipType;
          this.form.shop_name = newdata.shopName;
          this.form.track_num = newdata.trackNo;
          this.form.receive_address = newdata.shipAddress;
          this.form.ship_status = newdata.shipStatus;
        }
      },
    },
  },
  created() {
    if (this.$route.query.id) {
      let query = {
        id: this.$route.query.id,
      };
      this.$store.dispatch("releaseManagement/assessreviewRead", query);
    }
    this.$store.dispatch("commons/getReviewrating");
  },
  data() {
    return {
      token: "",
      dialogImageUrl: "",
      dialogVisible: false,
      isEdit: true,
      form: {
        assess_id: "",
        review_date: "",
        review_rating: "",
        review_link: "",
        pic_url: [],
        screenshot: [],
      },
      rules: {
        review_link: [
          { required: true, message: "请输入评论链接", trigger: "blur" },
        ],
        review_rating: [
          { required: true, message: "请选择评论星级", trigger: "change" },
        ],
        review_date: [
          {
            type: "string",
            required: true,
            message: "请选择评论日期",
            trigger: "change",
          },
        ],
        pic_url: [
          {
            type: "array",
            required: true,
            message: "请至少上传一张评论图片",
            trigger: "change",
          },
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
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.form.assess_id = this.assessreviewRead.id;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let arr = [];
          this.form.screenshot.forEach((item) => {
            arr.push(item.url);
          });
          this.form.pic_url = arr;
          this.$store.dispatch("releaseManagement/assessreSubmit", this.form);
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted() {
    this.token = getSesstionToken();
  },
};
</script>