<template>
  <div class="batch-edit-popup">
    <el-dialog
      :title="recordCurrent.title"
      :visible.sync="showModule"
      @close="handleClose(false)"
      width="35%"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="修改方式：" prop="mode">
          <el-select v-model="form.mode" placeholder="请选择修改方式">
            <el-option
              :label="item.val"
              v-for="item in recordCurrent.options"
              :key="item.id"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="修改值：" prop="val">
          <el-input v-model="form.val" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label-width="15px" prop="status">
          <el-checkbox v-model="form.status">是否同步至同站点其他店铺相同sku对应listing</el-checkbox>
        </el-form-item>
      </el-form>
      <ul class="explanation">
        说明：
        <li v-for="(text,index) in recordCurrent.explanation" :key="index">{{index + 1}}.{{text}}</li>
      </ul>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose(false)">取 消</el-button>
        <el-button type="primary" @click="handleClose(true)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "BatchEditPopup",
  props: {
    showBatchEditPopup: {
      type: Boolean,
      default: false
    },
    recordCurrent: {
      type: Object
    }
  },
  data() {
    return {
      showModule: this.showBatchEditPopup,
      form: {
        mode: "",
        val: "",
        status: false
      },
      rules: {
        mode: [
          { required: true, message: "请输入修改方式", trigger: "change" }
        ],
        val: [{ required: true, message: "请输入修改值", trigger: "blur" }]
      }
    };
  },
  created() {},
  methods: {
    handleClose(val) {
      if (!val) {
        this.$emit("on-open-sesion", false);
        return false;
      }

      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.recordCurrent.bulkChangesId == 1) {
            this.$emit("on-open-sesion", {
              form: this.form,
              code: 1
            });
          }
          if (this.recordCurrent.bulkChangesId == 2) {
            this.$emit("on-open-sesion", {
              form: this.form,
              code: 0
            });
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
.explanation {
  margin-left: 15px;
  color: #f56c6c;
}
.explanation li {
  margin: 5px 0;
  text-indent: 2em;
}
</style>