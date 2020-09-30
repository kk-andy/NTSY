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
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="选择评测人" prop="follower">
          <el-col :span="12">
            <el-select
              v-model="form.follower"
              placeholder="选择评测人"
              @change="followerChange"
            >
              <el-option
                v-for="(item, index) in followerlist"
                :key="index"
                :label="item.staff_name"
                :value="item.staff_name"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="买家账号" prop="buyer_account">
          <el-col :span="12" style="display: flex">
            <el-input v-model="form.buyer_account"></el-input>&nbsp;&nbsp;
            <el-button type="primary" @click="buyerAccount"
              >自动匹配买家账号</el-button
            >
          </el-col>
        </el-form-item>
        <el-form-item label="审核备注" prop="follower_remark">
          <el-col :span="12">
            <el-input type="textarea" v-model="form.follower_remark"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')"
            >发布需求</el-button
          >
          <el-button type="primary" @click="overrule">驳回需求</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>
<script>
import formComponent from "@/components/formComponents/form-component.vue";
import { setFormValue, GetFormValue } from "@/utils/common";
import { mapState } from "vuex";
export default {
  name: "AddDemand",
  components: { formComponent },
  computed: {
    ...mapState({
      assessreleaseRead: (state) => state.demandManagement.assessreleaseRead,
      autoassign: (state) => state.demandManagement.autoassign,
      followerlist: (state) => state.commons.followerlist,
    }),
  },
  created() {
    if (this.$route.query.id) {
      this.form.id = this.$route.query.id;
      this.$store.dispatch("demandManagement/assessreleaseRead", {
        id: this.$route.query.id,
      });
    }
  },
  watch: {
    assessreleaseRead: {
      handler: function (newdata, olddata) {
        if (newdata) {
          setFormValue(newdata, this.formData1);
          setFormValue(newdata, this.formData2);
          let arr = [];
          if (newdata.pic) {
            newdata.pic.forEach((item) => {
              if (item.type == 1) {
                arr.push(item);
              }
            });
          }

          this.formData2.commentImg.value = arr;
        }
      },
    },
    deep: true,
    immediate: true,
    autoassign: {
      handler: function (newdata, olddata) {
        if (newdata) {
          this.form.buyer_account = newdata;
        }
      },
    },
    deep: true,
    immediate: true,
  },
  data() {
    return {
      form: {
        id: "",
        follower: "",
        follower_id: "",
        buyer_account: "",
        follower_remark: "",
      },
      rules: {
        follower: [
          { required: true, message: "请选择评测人", trigger: "change" },
        ],
        buyer_account: [
          { required: true, message: "请填写评测人账号", trigger: "blur" },
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
      },
    };
  },
  mounted() {
    this.$store.dispatch("commons/getFollowerlist");
  },
  methods: {
    buyerAccount() {
      let query = {
        platform: this.assessreleaseRead.platform,
        site: this.assessreleaseRead.site,
        server_id: this.assessreleaseRead.server_id,
      };
      this.$store.dispatch("demandManagement/autoassign", query).then(() => {
        this.form.buyer_account = this.autoassign.buyer_account;
      });
    },
    followerChange(data) {
      let that = this;
      let testData = that.followerlist.filter((item) => {
        return item.staff_name === data;
      });
      that.form.follower_id = testData[0].staff_id;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch(
            "demandManagement/assessreleaseSubmit",
            this.form
          );
        }
      });
    },
    overrule() {
      let query = { id: this.form.id };
      this.$store.dispatch("demandManagement/assessreleaseReject", {
        query,
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