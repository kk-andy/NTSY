<template>
  <div class="after-syn-changes" style="width:100%;">
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
        <el-form-item label="同步item id：">
          <div v-for="item in form.item_ids" :key="item.id">
            <el-checkbox
              v-model="item.ischeckAll"
              @change="handleItemIdChange(item,$event)"
            >{{item.shop_name}}</el-checkbox>

            <div class="margin-L40">
              <el-checkbox
                v-for="(child,index) in item.list"
                :key="index"
                v-model="child.selected"
                @change="handleChildrenChange(item,child,$event)"
              >{{child.value}}</el-checkbox>
            </div>
            <el-divider></el-divider>
          </div>
        </el-form-item>
      </div>
      <div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="change_after_title">产品标题：</span>
            <el-button style="float: right;" type="primary" size="mini" @click="postTitle">发布标题</el-button>
          </div>
          <div>
            <el-input
              v-model.trim="form.title"
              maxlength="80"
              show-word-limit
              placeholder="请输入产品标题"
              resize="none"
              :autosize="{ minRows: 4 }"
              type="textarea"
            ></el-input>
          </div>
        </el-card>
      </div>
      <div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="change_after_title">图片：</span>
            <el-button style="float: right;" type="primary" size="mini" @click="postImg">发布图片</el-button>
          </div>
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

              <li>
                <el-upload
                  v-show="form.design_image.length != 12"
                  :action="uploadImageUrl"
                  list-type="picture-card"
                  multiple
                  :headers="getHeader"
                  :on-preview="handlePictureCardPreview"
                  :show-file-list="false"
                  :on-success="onSuccess"
                  :before-upload="beforeUpload"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </li>
            </ul>
            <div class="link-area">
              <el-input v-model.trim="picturePasteInput" placeholder="请输入图片链接" style="width:92%"></el-input>
              <el-button
                type="primary"
                class="link-button"
                :disabled="!Boolean(picturePasteInput.length)"
                size="mini"
                @click="confirmPastePath"
              >确认</el-button>
            </div>
          </div>
        </el-card>
      </div>

      <div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="change_after_title">选择描述类型：</span>
            <el-radio-group v-model="form.descriptionType">
              <el-radio label="HTML" @change="descriptionChange">HTML</el-radio>
              <el-radio label="template" @change="descriptionChange">使用描述模板</el-radio>
            </el-radio-group>
            <el-select
              v-model="form.chooseTemplate"
              size="mini"
              filterable
              clearable
              placeholder="请选择描述模板"
              @change="changeTemplate"
            >
              <el-option
                v-for="item in descriptionTemplateDrop"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-button
              style="float: right;"
              type="primary"
              size="mini"
              @click="releaseDescription"
            >发布描述</el-button>
          </div>
          <div>
            <div class="template-editing" v-if="showTemplateEditing && !form.chooseTemplate">
              <h1>请选择描述模板</h1>
            </div>
            <div v-if="showTemplateEditing && form.chooseTemplate">
              <component
                :is="componentsName"
                :templateId="form.chooseTemplate"
                :showTemplateBtn="false"
                :shopId="form.shop"
                v-if="strongBrush"
                ref="templateData"
              ></component>
            </div>
            <div class="HTML-template" v-if="showHTMLtemplate">
              <tinymce v-model.trim="form.richTextContent" :height="300" />
            </div>
          </div>
        </el-card>
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
import DescriptionTemplate from "@/view/BasicConfig/DescriptionTemplate.vue";
import { mapState } from "vuex";
export default {
  name: "AfterSynChanges",
  props: {
    change_after: Object,
    recordCurrent: Object
  },
  components: {
    draggable,
    sortable,
    Tinymce,
    AttrTemplate: () => import("@/view/BasicConfig/Subpage/AttrTemplate")
  },
  data() {
    return {
      uploadImageUrl: `${process.env.VUE_APP_AUTH_API_DOMAIN}/listing/tool/image/upload`,
      componentsName: "AttrTemplate",
      imageBaeUrl: "https://file.ebay.nantang-tech.com",
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
      descriptionTemplateDrop: [],
      strongBrush: false,
      form: {
        descriptionType: "HTML",
        richTextContent: "",
        sku: "",
        title: "",
        design_image: [],
        chooseTemplate: ""
      }
    };
  },
  computed: {},
  watch: {},
  computed: {
    getHeader() {
      return _g.getElUploadHeader();
    }
  },
  created() {
    let arr = [];
    this.form.richTextContent = this.change_after.description;
    this.form.sku = this.change_after.sku;
    this.form.title = this.change_after.title;
    this.form.design_image = this.change_after.design_image;
    this.change_after.item_ids.forEach(item => {
      this.$set(item, "list", []);
      this.$set(item, "ischeckAll", false);

      item.item_ids.forEach(id => {
        item.list.push({ selected: false, value: id });
      });
    });
    let imgHtml = [];
    arr.push(this.change_after.description);
    this.change_after.design_image.forEach(img => {
      imgHtml.push(`<br /><img style="width:30%" src="${img}">`);
    });
    arr.push(imgHtml.join(""));
    this.form.richTextContent = arr.join("");
    this.form.item_ids = this.change_after.item_ids;
    this.descriptionChange();
  },
  methods: {
    getTemplate() {
      this.$axios.get(`/listing/config/template/listing_list`).then(res => {
        this.descriptionTemplateDrop = res.data.list;
      });
    },
    // 更新组件内HTML/CSS片段数据
    changeTemplate() {
      this.strongBrush = false;
      this.$nextTick(() => {
        this.strongBrush = true;
      });
    },

    // 发布标题
    postTitle() {
      let item_id = [];
      this.form.item_ids.forEach(item => {
        item.list.forEach(child => {
          if (child.selected) {
            item_id.push(child.value);
          }
        });
      });
      if (!item_id.length) {
        this.$message({
          type: "warning",
          message: "请至少勾选一条itemid数据!"
        });
        return false;
      }
      if (!this.form.title) {
        this.$message({
          type: "warning",
          message: "请输入产品标题!"
        });
        return false;
      }
      let formdata = new FormData();
      formdata.append("product_sku", this.recordCurrent.product_sku);
      item_id.forEach(id => {
        formdata.append("item_id[]", id);
      });
      formdata.append("batch_no", this.recordCurrent.batch_no);
      formdata.append("title", this.form.title);
      this.$axios.post("/listing/sku/modify/confirm", formdata).then(res => {
        this.$message({
          type: "success",
          message: "标题发布成功!"
        });
      });
    },
    // 发布图片
    postImg() {
      let item_id = [];
      this.form.item_ids.forEach(item => {
        item.list.forEach(child => {
          if (child.selected) {
            item_id.push(child.value);
          }
        });
      });
      if (!item_id.length) {
        this.$message({
          type: "warning",
          message: "请至少勾选一条itemid数据!"
        });
        return false;
      }
      if (!this.form.design_image.length) {
        this.$message({
          type: "warning",
          message: "图片不能为空!"
        });
        return false;
      }
      let formdata = new FormData();
      formdata.append("product_sku", this.recordCurrent.product_sku);
      item_id.forEach(id => {
        formdata.append("item_id[]", id);
      });
      formdata.append("batch_no", this.recordCurrent.batch_no);
      this.form.design_image.forEach(img => {
        formdata.append("base_imgs[]", img);
      });
      this.$axios.post("/listing/sku/modify/confirm", formdata).then(res => {
        this.$message({
          type: "success",
          message: "图片发布成功!"
        });
      });
    },
    // 发布描述
    releaseDescription() {
      let item_id = [];
      this.form.item_ids.forEach(item => {
        item.list.forEach(child => {
          if (child.selected) {
            item_id.push(child.value);
          }
        });
      });
      if (!item_id.length) {
        this.$message({
          type: "warning",
          message: "请至少勾选一条itemid数据!"
        });
        return false;
      }
      if (!this.form.richTextContent) {
        this.$message({
          type: "warning",
          message: "描述不能为空!"
        });
        return false;
      }
      let formdata = new FormData();
      formdata.append("product_sku", this.recordCurrent.product_sku);
      item_id.forEach(id => {
        formdata.append("item_id[]", id);
      });
      formdata.append("batch_no", this.recordCurrent.batch_no);

      if (this.form.chooseTemplate) {
        formdata.append(
          "description",
          this.$refs.templateData.getTemplateCode()
        );
      } else {
        formdata.append("description", this.form.richTextContent);
      }
      this.$axios.post("/listing/sku/modify/confirm", formdata).then(res => {
        this.$message({
          type: "success",
          message: "描述发布成功!"
        });
      });
    },
    handlePictureCardPreview(file) {},
    // 图片上传之后的钩子
    onSuccess(response, file, fileList) {
      this.form.design_image.push(response.data.file);
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
        that.form.design_image.splice(index, 1);
        that.$message({
          type: "success",
          message: "删除成功!"
        });
        // }, 1000);
      });
    },
    confirmPastePath() {
      if (!_g.validationRule.checkIsImg(this.picturePasteInput)) {
        this.$message({
          message: "图片格式不正确，只支持 jpg、png 和 jpeg 类型图片",
          type: "warning"
        });
        return false;
      }
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
        this.getTemplate();
      }
    },

    handleItemIdChange(item, e) {
      item.ischeckAll = e;
      if (item.ischeckAll) {
        item.list.forEach(child => {
          this.$set(child, "selected", true);
        });
      } else {
        item.list.forEach(child => {
          this.$set(child, "selected", false);
        });
      }
    },
    // itemid
    handleChildrenChange(item, child, e) {
      child.selected = e;
      let childArr = item.list.filter(item => item.selected == true);
      childArr.length == 0
        ? (item.ischeckAll = false)
        : (item.ischeckAll = true);
    }
  }
};
</script>


<style >
.after-syn-changes .img-form-item .el-form-item__content {
  width: 100%;
  margin-left: 80px;
}
.after-syn-changes .dragArea {
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
.after-syn-changes .img-list li div .el-upload--picture-card {
  width: 100px;
  height: 100px;
  line-height: 100px;
}
.after-syn-changes h3 {
  margin: 15px 0;
}
.after-syn-changes .template-editing,
.after-syn-changes .HTML-template {
  width: 100%;
  color: rgb(148, 148, 148);
  min-height: 400px;
  position: relative;
}

.after-syn-changes .template-editing h1 {
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
.margin-L40 {
  margin-left: 40px;
}
.el-divider {
  margin: 10px 0;
}
.box-card {
  margin: 10px 0;
}
.link-area {
  display: flex;
  width: 100%;
}
.link-button {
  width: 80px;
  height: 28px;
  margin: 4px 0 0 10px;
}
.change_after_title {
  font-size: 16px;
  font-weight: 700;
}
</style>