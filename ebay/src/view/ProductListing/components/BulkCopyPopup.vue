<template>
  <div class="bulk-copy-popup">
    <el-dialog
      title="批量复制"
      :visible.sync="showModule"
      :close-on-click-modal="false"
      @close="handleClose(false)"
      width="35%"
      top="15%"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="110px">
        <el-form-item label="请选择店铺：" prop="mode">
          <el-select v-model="form.mode " filterable placeholder style="width:70%">
            <el-option
              v-for="item in storeNameData"
              :key="item.shop_id"
              :label="item.shop_name"
              :value="item.shop_id"
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
  name: "BulkCopyPopup",
  props: {
    showCopyPopup: {
      type: Boolean,
      default: false
    },
    storeNameData: {
      type: Array
    }
  },
  data() {
    return {
      showModule: this.showCopyPopup,
      form: {
        mode: ""
      },
      rules: {
        mode: [{ required: true, message: "请选择店铺", trigger: "change" }]
      }
    };
  },
  created() {
    // console.log(this.recordCurrent);
  },
  methods: {
    handleClose(val) {
      if (!val) {
        this.$emit("on-open-sesion", false);
        return;
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
</style>