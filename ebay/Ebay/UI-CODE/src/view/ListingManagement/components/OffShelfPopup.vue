<template>
  <div class="freight-popup">
    <el-dialog
      :title="recordCurrent.title"
      :visible.sync="showModule"
      @close="handleClose(false)"
      width="40%"
      :close-on-click-modal="false"
    >
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="下架原因" prop="reason">
          <el-select v-model="form.reason" filterable placeholder="请选择">
            <el-option
              v-for="item in recordCurrent.endListReason"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
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
  name: "OffShelfPopup",
  props: {
    showOffShelfPopup: {
      type: Boolean,
      default: false
    },
    recordCurrent: {
      type: Object
    }
  },
  data() {
    return {
      showModule: this.showOffShelfPopup,
      form: {
        reason: "",
        item_id: this.recordCurrent.item_id
      },
      options: [],
      rules: {
        reason: [
          { required: true, message: "请选择下架原因", trigger: "change" }
        ]
      }
    };
  },
  created() {},
  methods: {
    handleClose(val) {
      if (!val) {
        this.$emit("on-open-sesion", false);
        return;
      }

      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.recordCurrent.title == "下架") {
            this.$emit("on-open-sesion", { form: this.form, str: "single" });
          } else {
            this.$emit("on-open-sesion", { form: this.form, str: "multiple" });
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>


<style scoped>
</style>