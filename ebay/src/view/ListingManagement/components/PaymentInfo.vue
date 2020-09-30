<template>
  <div class="batch-edit-popup">
    <el-dialog
      :title="recordCurrent.title"
      :visible.sync="showModule"
      @close="handleClose(false)"
      width="50%"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="选择付款信息模板：" prop="template_name" :label-width="formLabelWidth">
          <el-select
            v-model="form.template_name"
            placeholder="请选择付款信息模板"
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
        <!-- <div style="width:100%">
       <el-row>
        <el-col :span="18">
       <el-form-item label="PayPal：">
          <el-select v-model="form.mode" placeholder="请选择payPal" style="width:95%">
            <el-option :label="item.val" v-for="item in options" :key="item.id" :value="item.id"></el-option>
          </el-select>
        </el-form-item> 
        </el-col>
            <el-col :span="5">
              <div class="pay">
                <el-checkbox v-model="form.status">立即支付</el-checkbox>
              </div>
            </el-col>
        </el-row>
        </div> 
        <el-form-item>
          <el-checkbox-group v-model="form.checkList">
            <ul>
              <li>
                <el-checkbox label="Nachnahme"></el-checkbox>
              </li>
              <li>
                <el-checkbox label="Uberweisung"></el-checkbox>
              </li>
            </ul>
          </el-checkbox-group>
        </el-form-item>-->
        <el-form-item label="付款说明：" prop="textarea">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="form.textarea"
            :autosize="{ minRows: 6, maxRows: 4}"
            maxlength="500"
            show-word-limit
          ></el-input>
        </el-form-item>
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
  name: "PaymentInfo",
  props: {
    showPaymentPopup: {
      type: Boolean,
      default: false
    },
    recordCurrent: {
      type: Object
    },
    templateList: {
      type: Object
    }
  },
  watch: {
    templateList(val) {
      this.templateList = val;
    }
  },
  data() {
    return {
      showModule: this.showPaymentPopup,
      form: {
        template_name: "",
        // payPal: "",
        // status: false,
        // checkList: [],
        textarea: ""
      },
      formLabelWidth: "150px",
      rules: {
        textarea: [
          { required: true, message: "请输入付款说明", trigger: "blur" }
        ]
      }
    };
  },

  created() {
    console.log(this.templateList);
  },
  methods: {
    templateNameChangeInfo() {
      let params = {
        tmp_id: this.form.template_name
      };

      this.$axios.get("/listing/manage/temp_info", { params }).then(res => {
        this.form.textarea = res.data.payment_instructions;
      });
    },
    handleClose(val) {
      if (!val) {
        this.$emit("on-open-sesion", false);
        return false;
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit("on-open-sesion", this.form);
        }
      });
    }
  }
};
</script>


<style scoped>
.explanation {
  margin-left: 15px;
  color: #f56c6c;
}
.explanation li {
  margin: 5px 0;
  text-indent: 2em;
}
.pay {
  height: 36px;
  line-height: 36px;
}
</style>