<template>
  <div class="before-syn-changes">
    <el-form :inline="true" :model="form" ref="form" class="demo-form-inline" label-width="115px">
      <el-form-item
        label="SKU："
        style="width:650px;margin-right: 60px"
        label-width="115px"
        prop="productTitle"
      >
        <h4>{{form.sku}}</h4>
      </el-form-item>
      <div>
        <el-form-item
          label="产品标题："
          style="width:650px;margin-right: 60px"
          label-width="115px"
          prop="productTitle"
        >
          <el-input
            v-model.trim="form.title"
            maxlength="80"
            show-word-limit
            placeholder="请输入产品标题"
            style="width:300%"
            resize="none"
            :disabled="disable"
            :autosize="{ minRows: 4 }"
            type="textarea"
          ></el-input>
        </el-form-item>
      </div>
      <el-form-item label="图片：" label-width="115px" style="width:100%" class="img-form-item">
        <div class="drag">
          <ul class="el-upload-list el-upload-list--picture-card img-list">
            <draggable v-model="form.design_image" class="dragArea">
              <li
                :tabindex="index"
                class="el-upload-list__item is-success animated"
                v-for="(src, index) in form.design_image"
                :class="{flash: src.to_del}"
                :key="index"
              >
                <img :src="src" alt class="el-upload-list__item-thumbnail" />
                <!-- <a class="el-upload-list__item-name">
                      <i class="el-icon-document"></i>
                      @{{element.name}}
                </a>-->
                <label class="el-upload-list__item-status-label">
                  <i class="el-icon-upload-success el-icon-check"></i>
                </label>
                <i class="el-icon-close"></i>
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-delete">
                    <i class="el-icon-delete" @click="productInfoRemove(index)"></i>
                  </span>
                </span>
              </li>
            </draggable>

            <!-- <li>
              <el-upload
                v-show="form.design_image.length != 12"
                :action="uploadImageUrl"
                list-type="picture-card"
                multiple
                :disabled="disable"
                :on-preview="handlePictureCardPreview"
                :show-file-list="false"
                :on-success="onSuccess"
                :before-upload="beforeUpload"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </li>-->
          </ul>
        </div>
      </el-form-item>

      <!-- <el-form-item style="width:580px;margin-left:80px">
        <el-input v-model="picturePasteInput" placeholder style="width:300%" :disabled="disable"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="confirmPastePath" :disabled="disable">确认</el-button>
      </el-form-item>-->

      <div>
        <el-form-item label="描述类型：">
          <el-radio-group v-model="form.descriptionType" :disabled="disable">
            <el-radio label="HTML" @change="descriptionChange">HTML</el-radio>
            <el-radio label="template" @change="descriptionChange">使用描述模板</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="form.chooseTemplate"
            size="mini"
            filterable
            clearable
            :disabled="disable"
            placeholder="请选择描述模板"
          >
            <el-option
              v-for="item in DescriptionTemplateDrop"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <div class="template-editing" v-if="showTemplateEditing && !form.chooseTemplate">
          <h1>请选择描述模板</h1>
        </div>
        <div v-if="showTemplateEditing && form.chooseTemplate">
          <description-template />
        </div>
        <div class="HTML-template" v-if="showHTMLtemplate">
          <tinymce v-model="form.richTextContent" :readonly="1" :height="300" width="1060px" />
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import sortable from "sortablejs";
import { Loading } from "element-ui";
import Tinymce from "@/components/Tinymce";
import { getMutiData } from "@/utils/getMutiData";
import { mapState } from "vuex";
export default {
  name: "BeforesynChanges",
  props: {
    change_before: Object
  },
  components: {
    draggable,
    sortable,
    Tinymce
  },
  data() {
    return {
      picturePasteInput: "", //图片粘贴文本框
      disable: true,
      showHTMLtemplate: false,
      showTemplateEditing: false,
      modal_attr: false,
      recordValue: "", // 记录自定义属性进入input框的值
      testMutiData: {},
      uploadList: [],
      tableHeadList: [],
      defineAttr: "",

      DescriptionTemplateDrop: [],
      form: {
        descriptionType: "HTML",
        richTextContent: "",
        sku: "",
        title: "",
        design_image: []
      }
    };
  },
  computed: {},
  created() {
    // this.form = _g.getJsonParse(this.change_before);
    let arr = [];
    this.form.sku = this.change_before.sku;
    this.form.title = this.change_before.title;
    this.form.design_image = this.change_before.design_image;
    let imgHtml = [];
    arr.push(this.change_before.description);
    this.change_before.design_image.forEach(img => {
      imgHtml.push(`<br /><img style="width:30%" src="${img}">`);
    });
    arr.push(imgHtml.join(""));
    this.form.richTextContent = arr.join("");
    this.descriptionChange();
  },
  mounted() {},
  methods: {
    handlePictureCardPreview(file) {},
    // 图片上传之后的钩子
    onSuccess(response, file, fileList) {
      this.form.design_image.push(`${this.imageBaeUrl}/${response.data.file}`);
      if (this.form.design_image.length > 12) {
        this.form.design_image.splice(11, this.form.design_image.length - 12);
      }
      Loading.service({ fullscreen: true }).close();
    },
    // 图片上传之前的钩子
    beforeUpload(file) {
      if (this.form.design_image.length === 12) {
        Loading.service({ fullscreen: true }).close();
        return false;
      }
      let type_arr = ["image/jpeg", "image/png"];
      let type = file.type;
      if (!type_arr.includes(type)) {
        this.$message({
          message: "图片格式不正确，只支持 jpg 和 png 类型图片",
          type: "error"
        });
        return false;
      }
      Loading.service({ fullscreen: true, text: "图片上传中，请稍后" });
    },
    // 删除图片
    productInfoRemove(index) {
      var that = this;
      _g.confirmMsg("warning", "提示", "确认删除?", () => {
        that.form.design_image[index].to_del = true;
        // setTimeout(function() {
        that.form.design_image.splice(index, 1);
        that.$message({
          type: "success",
          message: "删除成功!"
        });
        // }, 1000);
      });
    },
    confirmPastePath() {
      this.form.design_image.push(this.picturePasteInput);
    },
    descriptionChange() {
      this.showHTMLtemplate = false;
      this.showTemplateEditing = false;

      if (this.form.descriptionType == "HTML") {
        this.showHTMLtemplate = true;
      }
      if (this.form.descriptionType == "template") {
        this.showTemplateEditing = true;
      }
    }
  }
};
</script>


<style >
.before-syn-changes .img-form-item .el-form-item__content {
  width: 100%;
  margin-left: 80px;
}
.before-syn-changes .dragArea {
  float: left;
}
.img-list .dragArea li {
  width: 100px;
  height: 100px;
}
.attr-num {
  display: inline-block;
  margin-right: 5px;
}
.before-syn-changes .img-list li div .el-upload--picture-card {
  width: 100px;
  height: 100px;
  line-height: 100px;
}
.before-syn-changes h3 {
  margin: 15px 0;
}
.before-syn-changes .template-editing,
.before-syn-changes .HTML-template {
  width: 100%;
  color: rgb(148, 148, 148);
  min-height: 400px;
  position: relative;
}

.before-syn-changes .template-editing h1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.attr-variant {
  display: inline-block;
  margin-right: 20px;
}

.attr-item,
.add-attr {
  margin: 10px 15px;
}
.attr-item .el-icon-circle-plus {
  font-size: 18px;
  color: #409eff;
  cursor: pointer;
}
.attr-variant i {
  font-size: 18px;
  color: #f56c6c;
  cursor: pointer;
}
.variant-picture-notes {
  font-size: 12px;
  color: #909399;
}
</style>