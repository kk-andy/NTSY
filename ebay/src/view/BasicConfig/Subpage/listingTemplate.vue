<template>
  <div class="attr-template">
    <div class="description-template-edit">
      <div class="desc-temp-header margin-b10">
        <div class="banner-module">
          <div class="description" v-if="!banner">Banner</div>
          <img :src="banner" alt />
        </div>
        <div class="desc-temp-edit descTempEdit" data-type="banner" @click="editBanner">
          <i class="el-icon-edit"></i>编辑
        </div>
      </div>
      <div class="desc-temp-body">
        <div class="desc-temp-body-left">
          <div class="store-categories margin-b10">
            <div class="store-categories-title">Store Categories</div>
            <div :class="!shopList.length ? 'store-categories-content':'store-categories-shopList'">
              <span v-if="!shopList.length">
                自动获取店铺分类
                <span v-if="!showTemplateBtn">
                  (
                  <el-button type="text" @click="updatShopBtn">更新</el-button>)
                </span>
              </span>
              <ul v-else class="shop-list">
                <li
                  class="shop-list-li isOverflow"
                  v-for="shop in shopList"
                  :key="shop.template_id"
                >
                  <a
                    class="template_icon-link"
                    :href="shop.url"
                    target="_blank"
                  >{{shop.category_name}}</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="repeat-bg"></div>
        </div>

        <div class="desc-temp-body-right">
          <div class="desc-temp-title margin-b10">
            {{templateTitle || '【标题】'}}
            <div class="desc-temp-edit descTempEdit" data-type="banner" @click="editTitle">
              <i class="el-icon-edit"></i>编辑
            </div>
          </div>
          <div class="desc-temp-switch margin-b10">
            <div class="desc-temp-switch-top">
              <div class="desc-temp-switch-top-left">
                <i class="el-icon-arrow-left"></i>
              </div>
              <div class="desc-temp-switch-top-center">
                <img
                  style="width: 200%; position: absolute; left: -50%;"
                  :src="imgLength.length ? imgLength[0].value : ''"
                  alt
                />
              </div>
              <div class="desc-temp-switch-top-right">
                <i class="el-icon-arrow-right"></i>
              </div>
            </div>
            <div class="desc-temp-switch-bottom">
              <div
                class="desc-temp-switch-bottom-single special"
                style="position: relative;"
                v-for="img in imgLength"
                :key="img.id"
              >
                <img
                  style="width: 200%; position: absolute; left: -50%;"
                  :src="img.value || ''"
                  alt
                />
              </div>
            </div>
            <div class="desc-temp-edit descTempEdit" data-type="banner" @click="editCarousel">
              <i class="el-icon-edit"></i>编辑
            </div>
          </div>
          <div class="desc-temp-desc">
            <div class="desc-temp-desc-title">
              Product Description
              <div class="desc-temp-edit descTempEdit" data-type="banner" @click="editDescription">
                <i class="el-icon-edit"></i>编辑
              </div>
            </div>
            <div class="desc-temp-edit-text" v-html="description"></div>
          </div>
          <div class="desc-temp-tab" style="margin-bottom: 100px;">
            <div class="container">
              <div class="tab-wrapper">
                <!--tab section 1-->
                <div v-for="tab in tabBarData" :key="tab.num">
                  <input
                    type="radio"
                    name="tab-radios"
                    class="tab-radios"
                    :id="`tab-radios-${tab.num}`"
                    checked
                  />
                  <label
                    :for="`tab-radios-${tab.num}`"
                    class="tab-handler"
                    :class="`tab-handler-${tab.num}`"
                  >{{tab.name}}</label>
                  <div class="tab-content" :class="`tab-content-${tab.num}`" v-html="tab.value"></div>
                </div>
              </div>
            </div>
            <div class="desc-temp-edit descTempEdit" data-type="banner" @click="editTab">
              <i class="el-icon-edit"></i>编辑
            </div>
          </div>
        </div>

        <div class="desc-temp-footer">
          <div class="desc-temp-in">
            <span class="desc-temp-copy">Copyright © 2020 Nantang</span>
          </div>
        </div>
      </div>
    </div>

    <div class="btn-group" v-if="showTemplateBtn">
      <el-button type="primary" v-if="false" @click="getTemplateCode">预览</el-button>
      <el-button type="primary" @click="saveTemplate('openMsg','')">保存</el-button>
      <el-button @click="goBack">关闭</el-button>
    </div>

    <EditBanner
      v-if="showBanner"
      :showBanner="showBanner"
      :recordCurrent="recordCurrent"
      @on-open-sesion="bannerCallback"
    />
    <EditTitle
      v-if="showTitle"
      :showTitle="showTitle"
      :recordCurrent="recordCurrent"
      @on-open-sesion="titleCallback"
      :showMainTitleButton="showMainTitleButton"
    />
    <EditCarousel
      v-if="showCarousel"
      :showCarousel="showCarousel"
      :recordCurrent="recordCurrent"
      @on-open-sesion="carouselCallback"
      :showMainFigureBUtton="showMainFigureBUtton"
    />
    <EditDescription
      v-if="showDescription"
      :showDescription="showDescription"
      :recordCurrent="recordCurrent"
      @on-open-sesion="descriptionCallback"
    />
    <EditTabBar
      v-if="showTab"
      :showTab="showTab"
      :recordCurrent="recordCurrent"
      @on-open-sesion="tabCallback"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import EditBanner from "@/components/DefineTemplate/EditBanner";
import EditTitle from "@/components/DefineTemplate/EditTitle";
import EditCarousel from "@/components/DefineTemplate/EditCarousel";
import EditDescription from "@/components/DefineTemplate/EditDescription";
import EditTabBar from "@/components/DefineTemplate/EditTabBar";
import ViewTemplate from "@/components/DefineTemplate/ViewTemplate";
import { CheckboxGroup } from "element-ui";

export default {
  name: "AttrTemplate",
  components: {
    EditBanner,
    EditTitle,
    EditCarousel,
    EditTabBar,
    EditDescription
  },
  props: {
    templateData: {
      tyle: Object
    },
    showTemplateBtn: {
      type: Boolean,
      default: true
    },
    shopId: {
      // type: Number,
      default: 0
    },
    showMainTitleButton: {
      type: Boolean,
      default: () => false
    },
    showMainFigureBUtton: {
      type: Boolean,
      default: () => false
    },
    templateId: {
      type: Number,
      dufault: () => {
        return 0;
      }
    },
    desc_tpl_id: {
      type: Number
    }
  },
  watch: {
    templateId() {
      this.getArrTemplateData();
    }
  },

  data() {
    return {
      showBanner: false,
      showTitle: false,
      showCarousel: false,
      showTab: false,
      showDescription: false,
      banner: "",
      description: "",
      templateTitle: "",
      shopList: [],
      carouselImages: [],
      imgLength: [],
      tabBarData: [
        {
          name: "Add tab",
          value: ``
        }
      ],
      templateCode: "",
      recordCurrent: {}
    };
  },
  created() {
    this.getArrTemplateData();
  },

  updated() {},
  methods: {
    updatShopBtn() {
      if (this.shopId) {
        var params = {
          shop_id: this.shopId
        };
        this.$axios
          .get(`/listing/config/template/get/category`, { params })
          .then(res => {
            this.shopList = res.data.list;
          });
      } else {
        return false;
      }
    },

    getArrTemplateData() {
      if (this.templateId == this.desc_tpl_id && this.templateData) {
        let {
          banner,
          carouselImages,
          description,
          tabBarData,
          templateTitle
        } = JSON.parse(this.templateData);
        this.banner = banner;
        this.carouselImages = carouselImages;
        this.description = description;
        this.tabBarData = tabBarData;
        this.templateTitle = templateTitle;

        this.imgLength = [];
        this.carouselImages.forEach((e, index) => {
          if (index < 5) {
            this.imgLength.push({ id: index + 1, value: e.value });
          }
        });
      } else {
        let params = {
          id: this.templateId || this.$route.query.id
        };
        this.$axios
          .get(`/listing/config/template/attr`, {
            params
          })
          .then(res => {
            if (res.data) {
              this.banner = res.data.banner;
              this.templateTitle = res.data.title;
              this.carouselImages = res.data.carousel;
              this.description = res.data.description;
              this.tabBarData = res.data.tab;

              if (!this.tabBarData.length) {
                this.tabBarData.push({
                  name: "Add tab",
                  value: ``
                });
              }
              this.imgLength = [];
              this.carouselImages.forEach((e, index) => {
                if (index < 5) {
                  this.imgLength.push({ id: index + 1, value: e.value });
                }
              });
            }
          });
      }
    },

    // 保存模板
    saveTemplate(status, tmpId) {
      let formdata = new FormData();
      let carousel = JSON.stringify(this.carouselImages);
      let tab = JSON.stringify(this.tabBarData);
      formdata.append("title", this.templateTitle);
      formdata.append("banner", this.banner);
      formdata.append("description", this.description);
      formdata.append("template_id", tmpId || this.$route.query.id);
      formdata.append("carousel", carousel);
      formdata.append("tab", tab);
      this.$axios
        .post("/listing/config/template/attr/save", formdata)
        .then(res => {
          if (status === "openMsg") {
            this.$message({
              message: "保存成功!",
              type: "success"
            });
            this.$router.go(-1);
          }
        });
    },
    goBack() {
      this.$router.go(-1);
    },
    // banner编辑
    editBanner() {
      this.showBanner = true;
      this.$set(this.recordCurrent, "title", "Banner设置");
      this.$set(this.recordCurrent, "imageUrl", this.banner);
    },
    // banner回调
    bannerCallback(imgUrl) {
      this.showBanner = false;
      if (!imgUrl) {
        return false;
      }
      this.banner = imgUrl;
    },
    //title编辑
    editTitle() {
      this.showTitle = true;
      this.$set(this.recordCurrent, "title", "标题设置");
      this.$set(this.recordCurrent, "templateTitle", this.templateTitle);
    },
    //title回调
    titleCallback(title) {
      this.showTitle = false;
      if (!title) {
        return false;
      }
      this.templateTitle = title;
    },
    // carousel编辑
    editCarousel() {
      this.showCarousel = true;
      this.$set(this.recordCurrent, "title", "模板图片");
      this.$set(this.recordCurrent, "carouselImages", this.carouselImages);
    },
    // carousel回调
    carouselCallback(imgs) {
      this.showCarousel = false;
      if (!imgs) {
        return false;
      }
      this.carouselImages = [];
      this.imgLength = [];
      let arr = [];
      imgs.forEach((e, index) => {
        if (index < 5) {
          this.imgLength.push({ id: index + 1, value: e.value });
        }
        arr.push({ id: index + 1, value: e.value });
      });
      this.carouselImages = arr;
    },

    // description编辑
    editDescription() {
      this.showDescription = true;
      this.$set(this.recordCurrent, "title", "描述设置");
      this.$set(this.recordCurrent, "description", this.description);
    },
    // description回调
    descriptionCallback(text) {
      this.showDescription = false;
      if (!text) {
        return false;
      }
      this.description = text.richTextContent;
    },
    //tab编辑
    editTab() {
      this.showTab = true;
      this.$set(this.recordCurrent, "title", "描述设置");
      this.$set(this.recordCurrent, "tabBarData", this.tabBarData);
    },
    //tab回调
    tabCallback(tab) {
      this.showTab = false;

      if (!tab) {
        return false;
      }
      tab.tabBarData.forEach((item, index) => {
        item.num = index + 1;
      });
      this.tabBarData = tab.tabBarData;
    },

    getTemplateCode() {
      let templateCSS = `
      <style scoped> 
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .attr-template {
          width: 100%;
          height: 100%;
        }
        .btn-group {
          margin-top: 20px;
          text-align: center;
          width: 30%;
          margin: 20px auto;
          display: flex;
          justify-content: space-between;
        }
        .description-template-edit {
          min-width: 1060px;
          max-width: 1060px;
          background: #ccdfe6
          url("https://file.ebay.nantang-tech.com/uploads/qPWEfqTl0yUzn4maKqxd1svur9NcKd8gab2yWQP2.jpeg")
          no-repeat;
          margin: 0 auto;
          padding: 30px 50px;
        }
        .desc-temp-header {
          position: relative;
          width: 100%;
        }
        .desc-temp-header .banner-module {
          min-width: 960px;
          min-height: 300px;
          background-color: #fff;
          position: relative;
          color: rgb(187, 187, 187);
          z-index: 0;
        }
        .desc-temp-header .banner-module .description {
          font-size: 30px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 0;
        }
        .desc-temp-header .banner-module img {
          position: relative;
          width: 100%;
          z-index: 2;
        }
        .desc-temp-edit {
          position: absolute;
          top: 0;
          right: 0;
          left: auto;
          padding: 0 10px;
          height: 30px;
          line-height: 30px;
          font-size: 15px;
          text-align: center;
          cursor: pointer;
          color: #e8e8e8;
          background-color: #7DABBB;
          z-index: 1;
        }
        .desc-temp-desc {
          position: relative;
          margin-bottom: 10px;
          width: 100%;
          min-height: 220px;
          background-color: #fff;
        }
        .desc-temp-desc-title {
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          padding-left: 10px;
          width: 100%;
          height: 40px;
          line-height: 40px;
          box-sizing: border-box;
          background-color: #7DABBB;
        }
        .desc-temp-edit-text {
          padding: 10px;
          color: #000;
          z-index: 19;
        }
        .desc-temp-edit i {
          margin: 0 5px;
        }
        .desc-temp-body {
          position: relative;
          display: flex;
          width: 100%;
        }
        .desc-temp-body-left {
          width: 220px;
        }
        .desc-temp-body-right {
          width: calc(100% - 230px);
          margin-left: 10px;
        }

        .store-categories {
          width: 100%;
          min-height: 300px;
          background-color: #133;
        }
        .store-categories-title,
        .store-categories-content {
          width: 100%;
          box-sizing: border-box;
        }
        .store-categories-title {
          height: 40px;
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          background-color: #7DABBB;
          padding-left: 10px;
          line-height: 40px;
          overflow: hidden;
        }
        .store-categories-content {
          width: 100%;
          height: 260px;
          line-height: 260px;
          font-size: 13px;
          text-align: center;
          color: #737679;
          background-color: #fff;
        }
        .repeat-bg {
          height: 240px;
          background: url("https://file.ebay.nantang-tech.com/lALPGoU8dBVTkSDM8Mzc_220_240.png")
           no-repeat center/cover;
        }

        .desc-temp-title {
          padding: 20px 50px;
          vertical-align: middle;
          max-height: 100px;
          overflow: hidden;
          font-size: 24px;
          text-align: center;
          line-height: 30px;
          color: #121212;
          background-color: #fff;
        }
        .desc-temp-switch {
          position: relative;
          margin-bottom: 10px;
          padding: 20px;
          width: 100%;
          height: 660px;
          box-sizing: border-box;
          background-color: #fff;
        }
        .desc-temp-switch-top {
          display: flex;
          width: 100%;
          height: 500px;
          line-height: 500px;
          text-align: center;
          margin-bottom: 20px;
        }
        .desc-temp-switch-top-left {
          flex: 0.3;
        }
        .desc-temp-switch-top-center {
          flex: 1;
          width: 450px;
          height: 450px;
          border: 1px solid #737679;
        }
        .desc-temp-switch-top-right {
          flex: 0.3;
        }

        .desc-temp-switch-bottom {
          margin: 0 auto;
          text-align: center;
        }
        .desc-temp-switch-bottom-single.special {
          border: 1px solid #737679;
          background-color: #fff;
        }
        .desc-temp-switch-bottom-single {
          display: inline-block;
          overflow: hidden;
          margin: 0 5px;
          border: 1px solid #d0d3d6;
          width: 100px;
          height: 100px;
          background-color: #f5f5f5;
          word-wrap: break-word;
        }

        .desc-temp-footer {
          position: absolute;
          bottom: -30px;
          left: -50px;
          width: 1060px;
          z-index: 1;
          height: 50px;
          background-color: #59869D;
        }
        .desc-temp-in {
          width: 940px;
          margin: 0 auto;
        }
        .desc-temp-copy {
          line-height: 50px;
          font-size: 16px;
          color: #fff;
        }

        .desc-temp-tab {
          position: relative;
          margin-bottom: 10px;
          width: 100%;
          background-color: #fff;
        }
        .container-tab {
          width: 100%;
          min-height: 400px;
          margin: 5px auto;
          display: flex;
          background-color: #fff;
        }
        .tab-wrapper {
          position: relative;
          width: 100%;
          height: 40px;
          background-color: #7DABBB;
        }
        .tab-wrapper .tab-radio {
          display: none;
        }
        .tab-handler {
          position: relative;
          z-index: 2;
          display: block;
          float: left;
          height: 40px;
          padding: 0 15px;
          color: #fff;
          font-size: 16px;
          line-height: 40px;
          transition: 0.3s;
          transform: scale(0.9);
        }
        .tab-radio:checked + .tab-handler {
          color: #fff;
          background-color: #59869d;
          transform: scale(1);
        }
        .tab-radio:checked + .tab-handler + .tab-content {
          visibility: visible;
          opacity: 1;
        }
        .tab-wrapper .tab-content {
          position: absolute;
          top: 40px;
          left: 0;
          width: 100%;
          padding: 10px;
          color: #999;
          font-size: 14px;
          line-height: 2.5em;
          background-color: #fff;
          opacity: 0;
          box-sizing: border-box;
          transition: transform 0.5s, opacity 0.7s;
        }

        .margin-b10 {
          margin-bottom: 10px;
        }
        .margin-l10 {
          margin-left: 10px;
        }
        .el-icon-arrow-left,
        .el-icon-arrow-right {
          font-weight: 700;
          font-size: 20px;
          color: #ccc;
        }

        /* 每次点击按钮 重置当前焦点按钮的样式 */
        input[type="radio"]:checked ~ .count label {
          background: #447fff;
        }
        /* 重置当前显示的左右按钮 */
        input[type="radio"]:checked ~ .dir_box label {
          display: none;
        }

        /* 下方按钮1 */
        #btn1:checked ~ .pic .box {
          margin-left: 0;
        }
        /* 下方按钮2 */
        #btn2:checked ~ .pic .box {
          margin-left: -100%;
        }
        /* 下方按钮3 */
        #btn3:checked ~ .pic .box {
          margin-left: -200%;
        }
        /* 下方按钮4 */
        #btn4:checked ~ .pic .box {
          margin-left: -300%;
        }
        /* 下方按钮5 */
        #btn5:checked ~ .pic .box {
          margin-left: -400%;
        }
        /* 下方按钮6 */
        #btn6:checked ~ .pic .box {
          margin-left: -500%;
        }
        /* 下方按钮7 */
        #btn7:checked ~ .pic .box {
          margin-left: -600%;
        }
        /* 下方按钮8 */
        #btn8:checked ~ .pic .box {
          margin-left: -700%;
        } /* 下方按钮9 */
        #btn9:checked ~ .pic .box {
          margin-left: -800%;
        } /* 下方按钮10 */
        #btn10:checked ~ .pic .box {
          margin-left: -900%;
        } /* 下方按钮11 */
        #btn11:checked ~ .pic .box {
          margin-left: -1000%;
        } /* 下方按钮12 */
        #btn12:checked ~ .pic .box {
          margin-left: -1100%;
        }
        #btn1:checked ~ .count .btn_1,
        #btn2:checked ~ .count .btn_2,
        #btn3:checked ~ .count .btn_3,
        #btn4:checked ~ .count .btn_4,
        #btn5:checked ~ .count .btn_5,
        #btn6:checked ~ .count .btn_6,
        #btn7:checked ~ .count .btn_7,
        #btn8:checked ~ .count .btn_8,
        #btn9:checked ~ .count .btn_9,
        #btn10:checked ~ .count .btn_10,
        #btn11:checked ~ .count .btn_11,
        #btn12:checked ~ .count .btn_12 {
          background: white;
        }


        #btn1:checked ~ .dir_box .btn_btn_1,
        #btn2:checked ~ .dir_box .btn_btn_2,
        #btn3:checked ~ .dir_box .btn_btn_3,
        #btn4:checked ~ .dir_box .btn_btn_4,
        #btn5:checked ~ .dir_box .btn_btn_5,
        #btn6:checked ~ .dir_box .btn_btn_6,
        #btn7:checked ~ .dir_box .btn_btn_7,
        #btn8:checked ~ .dir_box .btn_btn_8,
        #btn9:checked ~ .dir_box .btn_btn_9,
        #btn10:checked ~ .dir_box .btn_btn_10,
        #btn11:checked ~ .dir_box .btn_btn_11,
        #btn12:checked ~ .dir_box .btn_btn_12 {
          display: flex;
        }

        /* 左边第一个按钮 */
        #left_btn1:checked ~ .pic .box {
          margin-left: -${(this.carouselImages.length - 1) * 100}%;
        }
        #left_btn1:checked ~ .count .btn_${this.carouselImages.length} {
          background: white;
        }
        #left_btn1:checked ~ .pic .before_box {
          transition: right 0.8s;
          opacity: 1;
          right: -100%;
        }
        #left_btn1:checked ~ .dir_box .btn_btn_${this.carouselImages.length} {
          display: flex;
        }

        /* 左边第二个按钮 */
        #left_btn2:checked ~ .pic .box {
          margin-left: 0;
        }
        #left_btn2:checked ~ .count .btn_1 {
          background: white;
        }
        #left_btn2:checked ~ .dir_box .btn_btn_1 {
          display: flex;
        }

        /* 左边第三个按钮 */
        #left_btn3:checked ~ .pic .box {
          margin-left: -100%;
        }
        #left_btn3:checked ~ .count .btn_2 {
          background: white;
        }
        #left_btn3:checked ~ .dir_box .btn_btn_2 {
          display: flex;
        }

        /* 左边第四个按钮 */

        #left_btn4:checked ~ .pic .box {
          margin-left: -200%;
        }
        #left_btn4:checked ~ .count .btn_3 {
          background: white;
        }
        #left_btn4:checked ~ .dir_box .btn_btn_3 {
          display: flex;
        }

        /* 左边第五个按钮 */

        #left_btn5:checked ~ .pic .box {
          margin-left: -300%;
        }
        #left_btn5:checked ~ .count .btn_4 {
          background: white;
        }
        #left_btn5:checked ~ .dir_box .btn_btn_4 {
          display: flex;
        }

        /* 左边第六个按钮 */

        #left_btn6:checked ~ .pic .box {
          margin-left: -400%;
        }
        #left_btn6:checked ~ .count .btn_5 {
          background: white;
        }
        #left_btn6:checked ~ .dir_box .btn_btn_5 {
          display: flex;
        }
        /* 左边第七个按钮 */
        #left_btn7:checked ~ .pic .box {
          margin-left: -500%;
        }
        #left_btn7:checked ~ .count .btn_6 {
          background: white;
        }
        #left_btn7:checked ~ .dir_box .btn_btn_6 {
          display: flex;
        }
        /* 左边第八个按钮 */

        #left_btn8:checked ~ .pic .box {
          margin-left: -600%;
        }
        #left_btn8:checked ~ .count .btn_7 {
          background: white;
        }
        #left_btn8:checked ~ .dir_box .btn_btn_7 {
          display: flex;
        }
        /* 左边第九个按钮 */

        #left_btn9:checked ~ .pic .box {
          margin-left: -700%;
        }
        #left_btn9:checked ~ .count .btn_8 {
          background: white;
        }
        #left_btn9:checked ~ .dir_box .btn_btn_8 {
          display: flex;
        }

        /* 左边第十个按钮 */

        #left_btn10:checked ~ .pic .box {
          margin-left: -800%;
        }
        #left_btn10:checked ~ .count .btn_9 {
          background: white;
        }
        #left_btn10:checked ~ .dir_box .btn_btn_9 {
          display: flex;
        }

        /* 左边第十一个按钮 */

        #left_btn11:checked ~ .pic .box {
          margin-left: -900%;
        }
        #left_btn11:checked ~ .count .btn_10 {
          background: white;
        }
        #left_btn11:checked ~ .dir_box .btn_btn_10 {
          display: flex;
        }

        /* 左边第十二个按钮 */

        #left_btn12:checked ~ .pic .box {
          margin-left: -1000%;
        }
        #left_btn12:checked ~ .count .btn_11 {
          background: white;
        }
        #left_btn12:checked ~ .dir_box .btn_btn_11 {
          display: flex;
        }


        /* html,
        body {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          overflow: hidden;
        } */
        input[type="radio"] {
          display: none;
        }
        li {
          list-style-type: none;
        }
        .container {
          position: relative;
          width: 100%;
          height: 100%;
          background: #7DABBB;
          overflow: hidden;
        }
        .pic {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .pic .box {
          position: relative;
          height: 100%;
          transition: margin 0.8s;
        }
        .pic .box > img {
          float: left;
          height: 100%;
          color: white;
        }
        .pic .before_box,
        .pic .after_box {
          position: absolute;
          top: 0;
          width: 200%;
          height: 100%;
          opacity: 0;
        }
        .pic .after_box {
          left: 0;
        }
        .pic .before_box {
          right: 0;
        }
        .pic .after_box img,
        .pic .before_box img {
          width: 50%;
          height: 100%;
          float: left;
        }
        .count {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 10%;
          background: rgba(255, 255, 255, 0.3);
          transition:  0.3s;
          transform: scale(.7);
          border-radius: 10px;

        }
        .count:hover{
          background: rgba(255, 255, 255, 0.7);
          transition:  0.3s;
          transform: scale(1);
          border-radius: 0;
        }
        .count > ul {
          display: flex;
          align-items: center;
          justify-content: space-around;
          width: 30%;
          height: 100%;
        }
        .count li {
          float: left;
          width: 1.2vmax;
          height: 1.2vmax;
          border-radius: 50%;
        }

        .count li label {
          display: block;
          width: 14px;
          height: 14px;
          background: #447fff;
          border-radius: 50%;
          cursor: pointer;
          transition: 0.8s;
        }
        .count li .btn_1 {
          background: white;
        }

        .dir_box {
          position: absolute;
          /* top: calc((100% - 100px) / 2); */
          top: 50%;
          transform: translate(0,-50%);
          display: flex;
          width: 50px;
          height: 50px;
          background: rgba(245, 245, 245, 0.3);
          border-radius: 50%;

        }
        .dir_box:hover{
          background: rgba(245, 245, 245, 0.6);

        }
        .left_box {
          left: 10px;
        }
        .right_box {
          right: 10px;
        }

        .dir_box label {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          width: 100%;
          height: 100%;
          color: #ccc;
          cursor: pointer;
        }
        /* .left_box label::after {
          content: "<";
        }
        .right_box label::after {
          content: ">";
        } */

        .dir_box label {
          display: none;
        }
        .left_box .left_btn_1 {
          display: flex;
        }
        .right_box .right_btn_1 {
          display: flex;
        }
      
      `;
      let arrCSS = [];
      this.carouselImages.forEach((img, index) => {
        if (!(index == this.carouselImages.length - 1)) {
          arrCSS.push(`
                  /* 右边第${img.id}个按钮 */
                #right_btn${img.id}:checked ~ .pic .box {
                  margin-left: -${img.id}00%;
                  transition: margin 0.8s 0s;
                }
                #right_btn${img.id}:checked ~ .count .btn_${index + 2} {
                  background: white;
                }
                #right_btn${img.id}:checked ~ .dir_box .btn_btn_${index + 2} {
                  display: flex;
                }
          `);
        }
        if (index == this.carouselImages.length - 1) {
          arrCSS.push(
            `
                /* 右边第${img.id}个按钮 */
              #right_btn${img.id}:checked ~ .pic .box {
                margin-left: -${img.id}00%;
                transition: margin 0.8s 0s;
              }
              #right_btn${img.id}:checked ~ .count .btn_1 {
                background: white;
              }
              #right_btn${img.id}:checked ~ .dir_box .btn_btn_1 {
                display: flex;
              }
                /* 右边跳转到一 */
              #right_btn${this.carouselImages.length}:checked ~ .pic .after_box {
                transition: left 0.8s;
                opacity: 1;
                left: -100%;
              }
              #right_btn${this.carouselImages.length}:checked ~ .pic .box {
                margin-left: 0;
                transition: margin 0.8s 0s;
              }
              </style>
          `
          );
        }
      });
      let arrHTMLradio_center = [];
      let arrHTMLradio_right = [];
      let arrHTMLradio_left = []; //左边控制
      let arrHTMLpic = []; //图片渲染
      let arrHTMLlet_btn = []; //左边按钮渲染
      let arrHTMLrig_btn = []; //右边按钮渲染
      let arrHTMLabb_btn = []; //缩略图渲染
      let arrHTML_tab = []; //tab栏渲染

      this.tabBarData.forEach((tab, index) => {
        arrHTML_tab.push(`
           <li>
            <input type="radio" name="tab-radio"  class="tab-radio" id="tab-radio-${index}" checked />
            <label  for="tab-radio-${index}"  class="tab-handler" class="tab-handler-${index}" >${tab.name}</label>
            <div class="tab-content" class="tab-content-${index}">${tab.value}</div> 
          </li>
        
        `);
      });
      this.carouselImages.forEach(img => {
        arrHTMLabb_btn.push(` 
                        <li class="current" style="margin:0 20px" >
                          <label class="btn_${img.id}" for="btn${img.id}">
                            <img style="width:40px; " src="${img.value}" alt />
                          </label>
                        </li>`);
        arrHTMLrig_btn.push(`
                     <label class="right_btn_${img.id}  btn_btn_${img.id}" for="right_btn${img.id}" > 
                        <svg t="1591240992256" class="icon" viewBox="0 0 1024 1024" version="1.1"
                          xmlns="http://www.w3.org/2000/svg" p-id="1055" width="18" height="18">
                          <path
                            d="M740.894 445.741l-427.67-427.67c-24.095-24.095-60.236-24.095-84.33 0-24.094 24.094-24.094 60.235 0 84.329L614.4 487.906 228.894 873.412c-24.094 24.094-24.094 60.235 0 84.33 24.094 24.093 60.235 24.093 84.33 0l427.67-427.671c12.047-12.047 18.07-30.118 18.07-42.165 0-18.07-6.023-30.118-18.07-42.165z"
                            p-id="1056" fill="#cdcdcd"></path>
                        </svg>
                      </label>`);
        arrHTMLlet_btn.push(`
                      <label class="left_btn_${img.id}  btn_btn_${img.id}" for="left_btn${img.id}" > 
                        <svg t="1591241321307" class="icon" viewBox="0 0 1024 1024" version="1.1"
                          xmlns="http://www.w3.org/2000/svg" p-id="2410" width="18" height="18">
                          <path
                            d="M228.894 445.741l427.67-427.67c24.095-24.095 60.236-24.095 84.33 0 24.094 24.094 24.094 60.235 0 84.329L355.388 487.906l385.506 385.506c24.094 24.094 24.094 60.235 0 84.33-24.094 24.093-60.235 24.093-84.33 0L228.895 530.07c-12.047-12.047-18.07-30.118-18.07-42.165 0-18.07 6.023-30.118 18.07-42.165z"
                            p-id="2411" fill="#cdcdcd"></path>
                        </svg>
                      </label>`);
        arrHTMLpic.push(
          `<img style="width: calc(100% / ${this.carouselImages.length});" src="${img.value}" />`
        );

        arrHTMLradio_center.push(`

        <!--控制转到第${img.id}张按钮-->
               <input
                id="btn${img.id}"
                name="dir"
                type="radio"
              />
        `);
        arrHTMLradio_left.push(`
        <!--控制左边转到第${img.id}张按钮-->
                <input
                id="left_btn${img.id}"
                class="dir_btn"
                name="dir"
                type="radio"
              />
 `);
        arrHTMLradio_right.push(`
        <!--控制右边转到第${img.id}张按钮-->
              <input
                id="right_btn${img.id}"
                class="dir_btn"
                name="dir"
                type="radio"
              />`);
      });

      let templateHTML = `
      <div class="view-template" ref="templateHTML">
        <div class="description-template-edit">
          <div class="desc-temp-header margin-b10">
          <!--  主图  -->
            <div class="banner-module">
              <div class="description">Banner</div>
              <img id="bannerImg" src="${this.banner}" alt />
            </div>
          </div>
          <div class="desc-temp-body">
          <!--  左边  -->
            <div class="desc-temp-body-left">
              <div class="store-categories margin-b10">
                <div class="store-categories-title">Store Categories</div>
                <div class="store-categories-content">自动获取店铺分类</div>
              </div>
              <div class="repeat-bg"></div>
            </div>
          <!--  右边  -->
            <div class="desc-temp-body-right">
          <!--  标题  -->  
              <div class="desc-temp-title margin-b10">${
                this.templateTitle
              }</div>
          <!--  轮播  -->  
              <div class="desc-temp-switch margin-b10">
                 <div class="container">
                    ${arrHTMLradio_center.join("")}
                    ${arrHTMLradio_left.join("")}
                    ${arrHTMLradio_right.join("")}
                   <!--存放图片-->
                 <div class="pic">
                  <div class="box" style="width:${this.carouselImages.length *
                    100}%">
                    ${arrHTMLpic.join("")}
                  </div>
                 </div>
          <!--左边的按钮 每次点击都会根据当前是第几张决定显示的按钮-->
                    <div class="left_box dir_box">
                    ${arrHTMLlet_btn.join("")}    
                       
                    </div>
          <!--右边的按钮 每次点击都会根据当前是第几张决定显示的按钮-->
                    <div class="right_box dir_box">
                          ${arrHTMLrig_btn.join("")}    
                    </div>
                    <!--下方按钮 点击各个按钮 决定跳转到第几张-->
                    <div class="count">
                      <ul>
                        ${arrHTMLabb_btn.join("")}   
                      </ul>
                    </div>                  
                 </div>
              </div>
              <div class="desc-temp-desc">
                <div class="desc-temp-desc-title">Product Description</div>
                <div class="desc-temp-edit-text">${this.description}</div>
              </div>
            <div class="desc-temp-tab" style="margin-bottom: 100px;">
              <div class="container-tab">
                <ul class="tab-wrapper">
                   ${arrHTML_tab.join("")}
                </ul>
              </div>
            </div>
            <div class="desc-temp-footer">
              <div class="desc-temp-in">
                <span class="desc-temp-copy">Copyright © 2020 Nangtang</span>
              </div>
            </div>
          </div>
        </div>
      </div>`;

      templateCSS += arrCSS.join("");
      this.templateCode = templateCSS + templateHTML;
      return this.templateCode;
    }
  }
};
</script>

<style scoped>
.attr-template {
  width: 100%;
  height: 100%;
}
.attr-template .btn-group {
  margin-top: 20px;
  text-align: center;
  width: 30%;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
}
.attr-template .description-template-edit {
  min-width: 1060px;
  max-width: 1060px;
  /* min-height: 1838px; */
  background: #ccdfe6
    url("https://file.ebay.nantang-tech.com/uploads/qPWEfqTl0yUzn4maKqxd1svur9NcKd8gab2yWQP2.jpeg")
    no-repeat;
  margin: 0 auto;
  padding: 30px 50px;
}
.attr-template .desc-temp-header {
  position: relative;
  width: 100%;
}
.desc-temp-header .banner-module {
  min-width: 960px;
  min-height: 300px;
  background-color: #fff;
  position: relative;
  color: rgb(187, 187, 187);
  z-index: 1;
}
.attr-template .desc-temp-header .banner-module .description {
  font-size: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
}
.attr-template .desc-temp-header .banner-module img {
  width: 100%;
}
.attr-template .desc-temp-edit {
  position: absolute;
  top: 0;
  right: 0;
  left: auto;
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
  font-size: 15px;
  text-align: center;
  cursor: pointer;
  color: #e8e8e8;
  background-color: #7dabbb;
  z-index: 1;
}
.attr-template .desc-temp-desc {
  position: relative;
  margin-bottom: 10px;
  width: 100%;
  min-height: 220px;
  background-color: #fff;
}
.attr-template .desc-temp-desc-title {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  padding-left: 10px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
  background-color: #7dabbb;
}
.attr-template .desc-temp-edit-text {
  padding: 10px;
  color: #000;
  z-index: 19;
}
.attr-template .desc-temp-edit i {
  margin: 0 5px;
}
.attr-template .desc-temp-body {
  position: relative;
  display: flex;
  width: 100%;
  /* min-height: 1310px; */
}
.attr-template .desc-temp-body-left {
  width: 220px;
}
.attr-template .desc-temp-body-right {
  width: calc(100% - 230px);
  margin-left: 10px;
  /* position: absolute;
  top: 0;
  right: 0;
  z-index: 1; */
}

.attr-template .store-categories {
  width: 100%;
  min-height: 300px;
  background-color: #fff;
}
.attr-template .store-categories-title,
.attr-template .store-categories-content {
  width: 100%;
  box-sizing: border-box;
}
.store-categories-title {
  height: 40px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background-color: #7dabbb;
  padding-left: 10px;
  line-height: 40px;
  overflow: hidden;
}
.attr-template .store-categories-content {
  width: 100%;
  height: 260px;
  line-height: 260px;
  font-size: 13px;
  text-align: center;
  color: #737679;
  background-color: #fff;
  overflow: hidden;
}

.attr-template .store-categories-shopList {
  width: 100%;
  height: 260px;
  overflow: hidden;
}
.attr-template .shop-list {
  height: 100%;
  overflow-y: auto;
}
.attr-template .shop-list-li {
  width: 100%;
  padding-left: 5px;
  line-height: 3em;
  transition: 0.3s;
}
.attr-template .shop-list-li:hover {
  transition: 0.3s;
  background-color: #7dabbb;
}
.attr-template .shop-list-li:hover a {
  color: #f5f5f5;
}

.attr-template .shop-list-li .template_icon-link {
  color: #000;
}
.attr-template .repeat-bg {
  height: 240px;
  background: url("https://file.ebay.nantang-tech.com/lALPGoU8dBVTkSDM8Mzc_220_240.png")
    no-repeat center/cover;
}

.attr-template .desc-temp-title {
  padding: 20px 50px;
  vertical-align: middle;
  max-height: 100px;
  overflow: hidden;
  font-size: 24px;
  text-align: center;
  line-height: 30px;
  color: #121212;
  background-color: #fff;
}
.attr-template .desc-temp-switch {
  position: relative;
  margin-bottom: 10px;
  padding: 20px;
  width: 100%;
  height: 660px;
  box-sizing: border-box;
  background-color: #fff;
}
.attr-template .desc-temp-switch-top {
  display: flex;
  width: 100%;
  height: 500px;
  line-height: 500px;
  text-align: center;
  margin-bottom: 20px;
}
.attr-template .desc-temp-switch-top-left {
  flex: 0.3;
}
.attr-template .desc-temp-switch-top-center {
  flex: 1;
  width: 450px;
  height: 450px;
  border: 1px solid #737679;
  position: relative;
  overflow: hidden;
}
.attr-template .desc-temp-switch-top-right {
  flex: 0.3;
}

.attr-template .desc-temp-switch-bottom {
  margin: 0 auto;
  text-align: center;
}
.attr-template .desc-temp-switch-bottom-single.special {
  border: 1px solid #737679;
  background-color: #fff;
}
.attr-template .desc-temp-switch-bottom-single {
  display: inline-block;
  overflow: hidden;
  margin: 0 5px;
  border: 1px solid #d0d3d6;
  width: 100px;
  height: 100px;
  background-color: #f5f5f5;
  word-wrap: break-word;
}

.attr-template .desc-temp-footer {
  position: absolute;
  bottom: -30px;
  left: -50px;
  width: 1060px;
  z-index: 1;
  height: 50px;
  background-color: #59869d;
}
.attr-template .desc-temp-in {
  width: 940px;
  margin: 0 auto;
}
.desc-temp-copy {
  line-height: 50px;
  font-size: 16px;
  color: #fff;
}

.attr-template .desc-temp-tab {
  position: relative;
  margin-bottom: 10px;
  width: 100%;
  background-color: #fff;
}
.attr-template .container {
  width: 100%;
  min-height: 400px;
  margin: 5px auto;
  display: flex;
  overflow: hidden;
  background-color: #fff;
}
.attr-template .tab-wrapper {
  position: relative;
  width: 100%;
  height: 40px;
  background-color: #7dabbb;
}
.attr-template .tab-wrapper .tab-radios {
  display: none;
}
.attr-template .tab-handler {
  position: relative;
  z-index: 2;
  display: block;
  float: left;
  height: 40px;
  padding: 0 15px;
  color: #fff;
  font-size: 16px;
  line-height: 40px;
  transition: 0.3s;
  transform: scale(0.9);
}
.attr-template .tab-radios:checked + .tab-handler {
  color: #fff;
  background-color: #59869d;
  transform: scale(1);
}

.attr-template .tab-radios:checked + .tab-handler + .tab-content {
  visibility: visible;
  opacity: 1;
}
.attr-template .tab-wrapper .tab-content {
  visibility: hidden;
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  padding: 10px;
  color: #999;
  font-size: 14px;
  line-height: 2.5em;
  background-color: #fff;
  opacity: 0;
  transition: transform 0.5s, opacity 0.7s;
}

.attr-template .margin-b10 {
  margin-bottom: 10px;
}
.attr-template .margin-l10 {
  margin-left: 10px;
}
.attr-template .el-icon-arrow-left,
.attr-template .el-icon-arrow-right {
  font-weight: 700;
  font-size: 20px;
  color: #ccc;
}
</style>