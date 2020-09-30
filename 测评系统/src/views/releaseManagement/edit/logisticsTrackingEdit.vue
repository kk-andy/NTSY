<template>
  <div class="main">
    <el-col :span="12">
      <form-component :form-data="formData1" ref="formData" label-width="120px"></form-component>
    </el-col>
    <el-col :span="12">
      <form-component :form-data="formData2" ref="formData" label-width="120px"></form-component>
    </el-col>
    <el-col :span="24">
      <el-divider></el-divider>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-col :span="12">
          <el-form-item label="物流方式" prop="ship_type">
            <el-col :span="12">
              <el-input v-model="form.ship_type" :disabled="isEdit"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发货店铺">
            <el-col :span="12">
              <el-input v-model="form.shop_name" :disabled="isEdit"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="物流单号" prop="track_num">
            <el-col :span="12">
              <el-input v-model="form.track_num" :disabled="isEdit"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="收货地址">
            <el-col :span="12">
              <el-input v-model="form.receive_address" :disabled="isEdit"></el-input>
            </el-col>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="物流状态" prop="ship_status">
            <el-col :span="12">
              <el-select v-model="form.ship_status" placeholder="请选择" :disabled="isEdit">
                <el-option label="未发货" value="1"></el-option>
                <el-option label="已发货" value="2"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="配送运费">
            <el-col :span="12">
              <el-input v-model="form.ship_fee" :disabled="isEdit"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预计到达时间" prop="es_arrival_date">
            <el-col :span="12">
              <el-date-picker
                v-model="form.es_arrival_date"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                clearable
                :disabled="isEdit"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-show="!isEdit">
          <el-form-item>
            <el-button type="primary" @click="logistics">同步物流信息</el-button>
          </el-form-item>
        </el-col>

        <el-col :span="24" style="text-align: center;">
          <el-form-item>
            <el-button v-show="isEdit" type="primary" @click="isEdit = false">编辑</el-button>
            <el-button v-show="!isEdit" type="primary" @click="submitForm('form')">提交</el-button>
            <el-button @click="resetForm('form')">取消</el-button>
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
export default {
  name: "AddDemand",
  components: { formComponent },
  computed: {
    ...mapState({
      assessshipRead: (state) => state.releaseManagement.assessshipRead,
      assessshipShipInfo: (state) => state.releaseManagement.assessshipShipInfo,
    }),
  },
  watch: {
    assessshipRead: {
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
      this.$store.dispatch("releaseManagement/assessshipRead", query);
    }
  },
  data() {
    return {
      isEdit: true,
      form: {
        assess_id: "",
        track_num: "",
        ship_status: "",
        es_arrival_date: "",
        shop_name: "",
        receive_address: "",
        ship_type: "",
        ship_fee: "",
      },
      rules: {
        track_num: [
          { required: true, message: "请输入物流单号", trigger: "blur" },
        ],
        ship_status: [
          { required: true, message: "请选择物流状态", trigger: "change" },
        ],
        ship_type: [
          { required: true, message: "请填写发货方式", trigger: "blur" },
        ],
        es_arrival_date: [
          { required: true, message: "请填写预计到达时间", trigger: "blur" },
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
      },
    };
  },
  methods: {
    logistics() {
      this.$store.dispatch("releaseManagement/assessshipShipInfo", {
        order_id: this.assessshipRead.order_id,
      });
    },
    submitForm(formName) {
      this.form.assess_id = this.assessshipRead.id;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch("releaseManagement/assessshipSubmit", this.form);
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
  },
};
</script>