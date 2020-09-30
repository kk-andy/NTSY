<template>
  <div class="edit-title-popup">
    <el-dialog
      :title="recordCurrent.title"
      :visible.sync="showModule"
      @close="handleClose(false)"
      width="40%"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form :model="form" :rules="rules" ref="form" class="demo-ruleForm">
        <el-form-item prop="title" label="标题：" label-width="65px">
          <el-input placeholder="请输入标题" v-model.trim="form.title" clearable></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer" :class="{'modal_footer': showMainTitleButton}">
        <el-button @click="referenceMainTitle" v-if="showMainTitleButton">引用标题</el-button>
        <div>
          <el-button @click="handleClose(false)">取 消</el-button>
          <el-button type="primary" @click="handleClose(true)">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "EditBanner",

  props: {
    showTitle: {
      type: Boolean,
      default: false,
    },
    recordCurrent: {
      type: Object,
    },
    showMainTitleButton: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      showModule: this.showTitle,
      form: {
        title: this.recordCurrent.templateTitle,
      },
      rules: {
        // title: [
        //   { required: true, message: "请输入标题", trigger: "blur" },
        //    { min: 1, max: 150, message: '长度在 1 到 150 个字符', trigger: 'blur' }
        // ]
      },
    };
  },
  created() {},
  methods: {
    handleClose(val) {
      if (!val) {
        this.$emit("on-open-sesion", false);
        return;
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit("on-open-sesion", this.form.title);
        }
      });
    },
    // 引用标题
    referenceMainTitle() {
      if (!this.$parent.$parent.$parent.form.productTitle) {
        this.$message({
          message: "暂时没有产品标题",
          type: "warning",
        });
        return;
      }
      this.form.title = JSON.parse(
        JSON.stringify(this.$parent.$parent.$parent.form.productTitle)
      );
    },
  },
};
</script>
<style lang="scss">
// .edit-title-popup {
.el-dialog__footer {
  .modal_footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
// }
</style>