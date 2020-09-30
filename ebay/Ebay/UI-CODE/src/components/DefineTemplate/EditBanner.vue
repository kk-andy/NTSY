<template>
  <div class="edit-banner-popup">
    <el-dialog
      :title="recordCurrent.title"
      :visible.sync="showModule"
      @close="handleClose(false)"
      width="40%"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form :model="form" :rules="rules" ref="form" class="demo-ruleForm" v-loading="loading">
        <el-form-item prop="imageUrl">
          <el-upload
            class="avatar-uploader"
            :action="uploadImageUrl"
            :show-file-list="false"
            :on-success="onSuccess"
            :headers="getHeader"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
  name: "EditBanner",
  props: {
    showBanner: {
      type: Boolean,
      default: false
    },
    recordCurrent: {
      type: Object
    }
  },
  data() {
    return {
      uploadImageUrl: `${process.env.VUE_APP_AUTH_API_DOMAIN}/listing/tool/image/upload`,
      // imageBaeUrl: "https://file.ebay.nantang-tech.com",
      showModule: this.showBanner,
      loading: false,
      form: {
        imageUrl: this.recordCurrent.imageUrl
      },
      rules: {
        imageUrl: [
          { required: true, message: "请上传banner图", trigger: "change" }
        ]
      }
    };
  },
  computed: {
    getHeader() {
      return _g.getElUploadHeader();
    }
  },
  methods: {
    // 上传图片前操作
    beforeAvatarUpload(file) {
      this.loading = true;
    },
    // 上传图片成功操作
    // 图片上传之后的钩子
    onSuccess(response, file, fileList) {
      // this.form.imageUrl = `${this.imageBaeUrl}/${response.data.file}`;
      this.form.imageUrl = response.data.file;
      this.loading = false;
    },
    handleClose(val) {
      if (!val) {
        this.$emit("on-open-sesion", false);
        return;
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit("on-open-sesion", this.form.imageUrl);
        }
      });
    }
  }
};
</script>


<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100%;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 100%;
  display: block;
}
</style>