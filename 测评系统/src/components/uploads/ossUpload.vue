<template>
  <div
    :class="getClass()"
    class="showimglabel"
    testid="upload_img"
    style="display: flex"
  >
    <ul
      v-if="!readOnly || (fileList && fileList.length != 0)"
      class="el-upload-list el-upload-list--picture-card upload-ul"
    >
      <li
        v-for="(file, index) in fileList"
        :key="index"
        tabindex="0"
        class="el-upload-list__item is-success"
      >
        <!-- :src="fileType(file,index)" -->
        <!-- <img  alt="" class="el-upload-list__item-thumbnail"> -->
        <img :src="fileType(file)" class="el-upload-list__item-thumbnail" />
        <a class="el-upload-list__item-name" v-if="imgLabel">{{ file.name }}</a>
        <span class="el-upload-list__item-actions">
          <span
            @click="preview(fileList, index)"
            class="el-upload-list__item-preview"
            v-if="!hidePreview"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span
            @click="remove(file, index)"
            class="el-upload-list__item-delete"
            v-if="!readOnly"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </li>
    </ul>
    <el-upload
      :accept="accept || 'image/gif,image/jpeg,image/png,.pdf,.zip,.rar'"
      :action="action"
      name="multipartFile"
      multiple
      :limit="limit"
      list-type="picture-card"
      v-if="!readOnly"
      :on-success="success"
      :show-file-list="false"
      :file-list="fileList"
      class="upload"
      :before-upload="beforeAvatarUpload"
      :headers="headers"
    >
      <i class="el-icon-plus"></i>
    </el-upload>

    <div v-if="readOnly && fileList && fileList.length == 0">
      <span>暂无附件</span>
    </div>

    <img-rotate
      :visible.sync="dialogVisible"
      title="查看图片"
      :img-url="dialogImageUrl"
      :index="index"
      :fileList="fileList"
      @on-cancel="cancel"
      :append="true"
    ></img-rotate>
  </div>
</template>
<script>
import imgRotate from "./imgRotate";
export default {
  props: [
    "value",
    "readOnly",
    "limit",
    "imgLabel",
    "append",
    "sign",
    "accept",
    "hidePreview",
    "headers",
  ],
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: "",
      imageNum: 0,
      index: 0,
      // headers: {
      //   'Authorization': 'Bearer ' + localStorage.Authorization
      // },
      action: `${process.env.VUE_APP_BASE_API}/index.php/api/v1/uploads/imageUploads`,
    };
  },
  components: { imgRotate },
  methods: {
    beforeAvatarUpload(file) {
      this.$emit("on-before", file);
    },
    getClass() {
      let count = this.value ? this.value.length : 0;
      if (this.limit && this.limit == count)
        return ["hide-add-btn", "uploadImg"];
      else return ["uploadImg"];
    },
    fileType(file) {
      if (file.url.indexOf("pdf") != -1) {
        return require("@/assets/images/pdf.png");
      } else if (file.url.indexOf("zip") != -1) {
        return require("@/assets/images/zip.png");
      } else if (file.url.indexOf("rar") != -1) {
        return require("@/assets/images/rar.png");
      } else {
        return file.url;
      }
    },
    success(response, file, fileList) {
      if (response.code == 0) {
        file.url = response.data.url;
        file.name = response.data.filename;
        this.$emit("input", fileList);
      } else {
        this.$message.warning(response.msg);
      }
    },
    preview(file, index) {
      this.dialogImageUrl = file;
      this.index = index;
      this.dialogVisible = true;
    },
    remove(file, index) {
      var valueCopy = this.value.slice(0);
      valueCopy.splice(index, 1);
      this.$emit("input", valueCopy);
    },
    cancel() {
      this.dialogVisible = false;
      //   this.fileList = []
    },
  },
  computed: {
    //   data() {
    //     return { sign: this.sign }
    //   },
    //   action() {
    //     return EnumerationAPI.ossUpload
    //   },
    //   fileList() {
    //     return this.value;
    //   },
    fileList: {
      get() {
        return this.value;
      },
      set(val) {
        this.value = val;
      },
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
