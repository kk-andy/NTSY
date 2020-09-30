<template>
  <div class="edit-title-popup">
    <el-dialog
      :title="recordCurrent.title"
      :visible.sync="showModule"
      @close="handleClose(false)"
      width="50%"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form :model="form" :rules="rules" ref="form" class="demo-ruleForm">
        <el-form-item style="width:100%" class="img-form-item">
          <div class="drag">
            <ul class="el-upload-list el-upload-list--picture-card img-list">
              <draggable v-model="form.images" class="dragArea">
                <li
                  :tabindex="index"
                  class="el-upload-list__item is-success animated"
                  v-for="(element, index) in form.images"
                  :class="{flash: element.to_del}"
                  :key="index"
                >
                  <img :src="element.value" alt class="el-upload-list__item-thumbnail" />
                  <a class="el-upload-list__item-name">
                    <i class="el-icon-document"></i>
                  </a>
                  <label class="el-upload-list__item-status-label">
                    <i class="el-icon-upload-success el-icon-check"></i>
                  </label>
                  <i class="el-icon-close"></i>
                  <span class="el-upload-list__item-actions">
                    <!---->
                    <span class="el-upload-list__item-delete">
                      <i class="el-icon-delete" @click="productInfoRemove(index)"></i>
                    </span>
                  </span>
                </li>
              </draggable>

              <li>
                <el-upload
                  v-show="form.images.length != 12"
                  :action="uploadImageUrl"
                  list-type="picture-card"
                  multiple
                  :on-preview="handlePictureCardPreview"
                  :show-file-list="false"
                  :headers="getHeader"
                  :on-success="onSuccess"
                  :before-upload="beforeUpload"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </li>
            </ul>
          </div>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer" :class="{'modal_footer': showMainFigureBUtton}">
        <el-button @click="referenceMainFigure" v-if="showMainFigureBUtton">引用主图</el-button>
        <div>
          <el-button @click="handleClose(false)">取 消</el-button>
          <el-button type="primary" @click="handleClose(true)">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import sortable from "sortablejs";
import { Loading } from "element-ui";
import { getImagePath } from "@/api/listing";
export default {
  name: "EditBanner",
  components: {
    draggable,
    sortable,
  },
  props: {
    showCarousel: {
      type: Boolean,
      default: false,
    },
    recordCurrent: {
      type: Object,
    },
    showMainFigureBUtton: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      uploadImageUrl: `${process.env.VUE_APP_AUTH_API_DOMAIN}/listing/tool/image/upload`,
      // imageBaeUrl: "https://file.ebay.nantang-tech.com",
      showModule: this.showCarousel,
      dialogVisible: false,
      form: {
        images: this.recordCurrent.carouselImages,
      },
      rules: {
        dialogImageUrl: {
          required: true,
          message: "请上传图片",
          trigger: "blur",
        },
      },
    };
  },
  created() {},
  computed: {
    getHeader() {
      return _g.getElUploadHeader();
    },
  },
  methods: {
    // 图片上传之前的钩子
    beforeUpload(file) {
      if (this.form.images.length === 12) {
        Loading.service({ fullscreen: true }).close();
        return false;
      }
      let type_arr = ["image/jpeg", "image/png"];
      let type = file.type;
      if (!type_arr.includes(type)) {
        this.$message({
          message: "图片格式不正确，只支持 jpg 和 png 类型图片",
          type: "error",
        });
        return false;
      }
      Loading.service({ fullscreen: true, text: "图片上传中，请稍后" });
    },
    // 图片上传之后的钩子
    onSuccess(response, file, fileList) {
      this.form.images.push({
        value: response.data.file,
        // value: `${this.imageBaeUrl}/${response.data.file}`
      });
      if (this.form.images.length > 12) {
        this.form.images.splice(11, this.form.images.length - 12);
      }
      Loading.service({ fullscreen: true }).close();
    },
    // 引用主图
    referenceMainFigure() {
      if (!this.$parent.$parent.$parent.form.images.length) {
        this.$message({
          message: "暂时没有主图",
          type: "warning",
        });
        return;
      }
      let imageArray = [];
      imageArray = this.$parent.$parent.$parent.form.images;
      let imgArr = [];
      imgArr = imageArray.map((item) => {
        if (typeof item !== "string") {
          return item.img_path;
        }
      });
      let params = {};
      if (typeof imageArray[0] !== "string") {
        params.image_url = imgArr;
      } else {
        params.image_url = imageArray;
      }
      getImagePath(params).then((res) => {
        let list = [];
        res.data.forEach((item) => {
          list.push({ value: item });
        });
        this.form.images = list;
      });
    },
    handlePictureCardPreview(e) {},
    // 上传失败的钩子
    onError(response, file) {
      Loading.service({ fullscreen: true }).close();
      this.$message({
        message: `${file.name}上传失败，请重试`,
        type: response.type,
      });
    },
    // 删除图片
    productInfoRemove(index) {
      var that = this;
      // _g.confirmMsg("warning", "提示", "确认删除?", () => {
      that.form.images[index].to_del = true;
      // setTimeout(function() {
      that.form.images.splice(index, 1);
      that.$message({
        type: "success",
        message: "删除成功!",
      });
      // }, 1000);
      // });
    },
    handleClose(val) {
      if (!val) {
        this.$emit("on-open-sesion", false);
        return;
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit("on-open-sesion", this.form.images);
        }
      });
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