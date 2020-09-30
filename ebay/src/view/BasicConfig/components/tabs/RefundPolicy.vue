<template>
  <div class="refund-policy">
    <el-form :model="form" ref="form" :rules="rules" class="demo-form-inline" label-width="135px">
      <div class="refund domestic-refund">
        <el-form-item label=" " prop="domestic" label-width="0px">
          <el-checkbox v-model="form.domestic">接受国内退款</el-checkbox>
        </el-form-item>
        <el-row :gutter="24" v-if="form.domestic">
          <el-col :span="10">
            <div class="grid-content margin-tb20">
              <el-form-item label="退货天数：" prop="domesticDays" :label-width="formLabelWidth">
                <el-select v-model="form.domesticDays" placeholder="请选择退货天数">
                  <el-option
                    v-for="item in domesticReturnsData"
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
                    v-for="item in domesticUndertakerData"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="refund foreign-refund">
        <el-form-item label=" " prop="foreign" label-width="0px">
          <el-checkbox v-model="form.foreign" @change="foreignChange">接受国外退款</el-checkbox>
        </el-form-item>

        <el-row :gutter="24" v-if="form.foreign">
          <el-col :span="10">
            <div class="grid-content margin-tb20">
              <el-form-item label="退货天数：" prop="foreignDays" :label-width="formLabelWidth">
                <el-select v-model="form.foreignDays" placeholder="请选择退货天数">
                  <el-option
                    v-for="item in domesticReturnsData"
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
              <el-form-item label="退货运费承担方：" prop="foreignUndertaker" :label-width="formLabelWidth">
                <el-select v-model="form.foreignUndertaker" placeholder="请选择退货运费承担方">
                  <el-option
                    v-for="item in domesticUndertakerData"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="textarea">
        <el-form-item label="退款说明：" prop="name">
          <el-input
            type="textarea"
            placeholder="请输入退款说明"
            v-model="form.textarea"
            maxlength="4000"
            :rows="10"
            show-word-limit
          ></el-input>
        </el-form-item>
        <div class="remarks">不支持HTML</div>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "RefundPolicy",
  components: {},
  props: {
    domesticReturnsData: {
      type: Array
    },
    domesticUndertakerData: {
      type: Array
    },
    refundForm: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      form: {
        domestic: true,
        foreign: true,
        domesticDays: "", //国内退货天数
        domesticUndertaker: "", // 国内运费承担方
        foreignDays: "", //国外退货天数
        foreignUndertaker: "", // 国外运费承担方
        textarea: ""
      },
      formLabelWidth: "130px",
      rules: {
        foreign: [
          {
            type: "boolean",
            required: true,
            message: "请选择退款政策",
            trigger: "change"
          }
        ],
        domestic: [
          {
            type: "boolean",
            required: true,
            message: "请选择退款政策",
            trigger: "change"
          }
        ]
      }
    };
  },
  watch: {
    refundForm(val) {
      if (val) {
        val.domestic = true;
      }
      if (val.foreign) {
        val.foreign = true;
      }
      this.form = val;
    },
    domesticReturnsData(val) {
      if (Object.keys(this.refundForm).length !== 0) {
        return false; // 如果为空,返回false
      }
      this.form.domesticDays = val[0].value;
      this.form.foreignDays = val[0].value;
    },
    domesticUndertakerData(val) {
      if (Object.keys(this.refundForm).length !== 0) {
        return false; // 如果为空,返回false
      }
      this.form.domesticUndertaker = val[0].value;
      this.form.foreignUndertaker = val[0].value;
    }
  },
  created() {},
  mounted() {},
  methods: {
    domesticChange(e) {
      // if (this.domestic) {
      //   this.form.domesticDays = "";
      //   this.form.domesticUndertaker = "";
      // }
    },
    foreignChange(e) {
      // if (this.foreign) {
      //   this.form.foreignDays = "";
      //   this.form.foreignUndertaker = "";
      // }
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