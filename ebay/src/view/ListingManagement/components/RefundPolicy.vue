<template>
  <div class="refund-policy">
    <el-dialog
      :title="refundRecordCurrent.title"
      :visible.sync="showModule"
      @close="handleClose(false)"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <div class="refund domestic-refund">
          <el-form-item label="选择退款政策模板：" prop="template_name" :label-width="formLabelWidth">
            <el-select
              v-model="form.template_name"
              placeholder="请选择退款政策模板"
              @change="templateNameChangeInfo"
            >
              <el-option
                v-for="item in templateList.list"
                :key="item.tmp_id"
                :label="item.tmp_name"
                :value="item.tmp_id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-checkbox v-model="form.domestic" @change="domesticChange">接受国内退款</el-checkbox>
          <el-row :gutter="24" v-if="form.domestic">
            <el-col :span="10">
              <div class="grid-content margin-tb20">
                <el-form-item label="退货天数：" prop="domesticDays" :label-width="formLabelWidth">
                  <el-select v-model="form.domesticDays" placeholder="请选择退货天数">
                    <el-option
                      v-for="item in returnsDays"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="grid-content margin-tb20">
                <el-form-item
                  label="退货运费承担方："
                  prop="domesticUndertaker"
                  :label-width="formLabelWidth"
                >
                  <el-select v-model="form.domesticUndertaker" placeholder="请选择退货运费承担方">
                    <el-option
                      v-for="item in undertaker"
                      :key="item.value"
                      :label="item.value"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="refund foreign-refund">
          <el-checkbox v-model="form.foreign" @change="foreignChange">接受国外退款</el-checkbox>
          <el-row :gutter="24" v-if="form.foreign">
            <el-col :span="10">
              <div class="grid-content margin-tb20">
                <el-form-item label="退货天数：" prop="foreignDays" :label-width="formLabelWidth">
                  <el-select v-model="form.foreignDays" placeholder="请选择退货天数">
                    <el-option
                      v-for="item in returnsDays"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="grid-content margin-tb20">
                <el-form-item
                  label="退货运费承担方："
                  prop="foreignUndertaker"
                  :label-width="formLabelWidth"
                >
                  <el-select v-model="form.foreignUndertaker" placeholder="请选择退货运费承担方">
                    <el-option
                      v-for="item in undertaker"
                      :key="item.value"
                      :label="item.value"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose(false)">取 消</el-button>
        <el-button type="primary" @click="handleClose(true)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "RefundPolicy",
  components: {},
  props: {
    showRefundPopup: {
      type: Boolean,
      default: false
    },
    refundRecordCurrent: {
      type: Object
    },
    templateList: {
      type: Object
    }
  },
  data() {
    return {
      showModule: this.showRefundPopup,
      form: {
        domestic: false,
        foreign: false,
        template_name: "",
        domesticDays: "", //国内退货天数
        domesticUndertaker: "", // 国内运费承担方
        foreignDays: "", //国外退货天数
        foreignUndertaker: "" // 国外运费承担方
      },
      returnsDays: [],
      undertaker: [],

      rules: {
        // template_name: [
        //   { required: true, message: "请选择退款政策模板", trigger: "change" }
        // ]
      },
      formLabelWidth: "150px"
    };
  },
  created() {
    this.getPolicy();
  },
  watch: {
    templateList(val) {
      this.templateList = val;
      this.getPolicy();
    }
  },
  methods: {
    templateNameChangeInfo() {
      let params = {
        tmp_id: this.form.template_name
      };

      this.$axios.get("/listing/manage/temp_info", { params }).then(res => {
        res.data.returns_accepted //是否接受国内退款
          ? (this.form.domestic = true)
          : (this.form.domestic = false);
        res.data.internation_returns_accepted //是否接受国外退款
          ? (this.form.foreign = true)
          : (this.form.foreign = false);
        this.form.domesticDays = res.data.returns_with_in; //国内退货天数
        this.form.domesticUndertaker = res.data.shipping_cost_paid_by; // 国内运费承担方
        this.form.foreignDays = res.data.internation_returns_with_in; //国外退货天数
        this.form.foreignUndertaker =
          res.data.internation_shipping_cost_paid_by; // 国外运费承担方
      });
    },

    // 退款政策 - 国内、国际运输的 退货天数/运费承担方 下拉框取值相同
    getPolicy() {
      let params = {
        site_id: this.templateList.site_id
      };
      this.$axios.get(`/listing/info/refund/policy`, { params }).then(res => {
        this.returnsDays = res.data.return_within;
        this.undertaker = res.data.shipping_cost_paid_by;
      });
    },

    domesticChange(e) {
      if (this.form.domestic) {
        this.form.domesticDays = "";
        this.form.domesticUndertaker = "";
      }
    },
    foreignChange(e) {
      if (this.form.foreign) {
        this.form.foreignDays = "";
        this.form.foreignUndertaker = "";
      }
    },
    handleClose(val) {
      if (!val) {
        this.$emit("on-open-sesion", false);
        return false;
      }

      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit("on-open-sesion", {
            form: this.form,
            itemId: this.refundRecordCurrent.item_id
          });
        }
      });
    }
  }
};
</script>

<style>
.refund {
  margin: 10px 0;
}
.textarea {
  margin: 20px 0 0 0;
}
.remarks {
  color: rgb(192, 196, 204);
  margin-left: 100px;
}
</style>