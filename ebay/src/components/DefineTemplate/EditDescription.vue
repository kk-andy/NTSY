<template>
  <div class="edit-description-popup">
    <el-dialog
      :title="recordCurrent.title"
      :visible.sync="showModule"
      @close="handleClose(false)"
      width="60%"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form :model="form" :rules="rules" ref="form" class="demo-ruleForm">
        <el-form-item prop="richTextContent" label="描述：" label-width="65px">
          <tinymce v-model="form.richTextContent" :height="300" />
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
import Tinymce from "@/components/Tinymce";
export default {
  name: "EditDescription",
  components: {
    Tinymce,
  },
  props: {
    showDescription: {
      type: Boolean,
      default: false,
    },
    recordCurrent: {
      type: Object,
    },
  },
  data() {
    return {
      showModule: this.showDescription,
      form: {
        richTextContent: this.recordCurrent.description,
      },
      rules: {
        // richTextContent: {
        //   required: true,
        //   message: "请输入描述内容",
        //   trigger: "blur"
        // }
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
          var num = this.removeHTMLTag(this.form.richTextContent);
          if (num.length > 6000) {
            this.$message({
              type: "warning",
              message: "字符已超出上限，请修改后重新输入！",
            });
            return;
          }

          // console.log( this.form.richTextContent.length < 6000);
          this.$emit("on-open-sesion", this.form);
        }
      });
    },
    removeHTMLTag(str) {
      str = str.replace(/<\/?[^>]*>/g, "");
      str = str.replace(/[ | ]*\n/g, "\n");
      str = str.replace(/&nbsp;/gi, "");
      str = str.replace(/\s/g, "");
      return str;
    },
  },
};
</script>