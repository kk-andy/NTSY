<template>
  <div class="view-template" ref="templateHTML">
    <div class="description-template-edit">
      <div class="desc-temp-header margin-b10">
        <div class="banner-module">
          <div class="description">Banner</div>
          <img id="bannerImg" :src="banner" alt />
        </div>
      </div>
      <div class="desc-temp-body">
        <div class="desc-temp-body-left">
          <div class="store-categories margin-b10">
            <div class="store-categories-title">Store Categories</div>
            <div class="store-categories-content">自动获取店铺分类</div>
          </div>
          <div class="repeat-bg"></div>
        </div>

        <div class="desc-temp-body-right">
          <div class="desc-temp-title margin-b10">{{templateTitleAttr || '【标题】'}}</div>
          <div class="desc-temp-switch margin-b10">
            <!--主容器-->
            <div class="container">
              <!--控制转到第几张按钮-->
              <input
                v-for="img in carouselImages"
                :key="img.id+'y'"
                :id="'btn'+img.id"
                name="dir"
                type="radio"
              />

              <!--控制往左边轮播-->
              <input
                v-for="img in carouselImages"
                :key="img.id+'x'"
                :id="'left_btn' + img.id"
                class="dir_btn"
                name="dir"
                type="radio"
              />
              <!--控制往右边轮播-->
              <input
                v-for="img in carouselImages"
                :key="img.id + 'z'"
                :id="'right_btn' + img.id"
                class="dir_btn"
                name="dir"
                type="radio"
              />

              <!--存放图片-->
              <div class="pic">
                <!--给所有图片套一个盒子 通过左边距进行轮播-->

                <div class="box" :style="'width:'+ carouselImages.length  * 100 +'%'">
                  <img
                    :style="'width: calc(100% / ' + carouselImages.length+ ');'"
                    v-for="img in carouselImages"
                    :key="img.id+ 's'"
                    :src="img.value"
                  />
                </div>
              </div>

              <!--左边的按钮 每次点击都会根据当前是第几张决定显示的按钮-->
              <div class="left_box dir_box">
                <label
                  v-for="img in carouselImages"
                  :key="img.id+ 't'"
                  :class="'left_btn_'+ img.id +' '+ 'btn_btn_' + img.id"
                  :for="'left_btn' + img.id"
                >
                  <i class="el-icon-arrow-left"></i>
                </label>
              </div>

              <!--右边的按钮 每次点击都会根据当前是第几张决定显示的按钮-->
              <div class="right_box dir_box">
                <label
                  v-for="img in carouselImages"
                  :key="img.id+ 'f'"
                  :class="'right_btn_' + img.id + ' ' + 'btn_btn_' + img.id"
                  :for="'right_btn' + img.id"
                >
                  <i class="el-icon-arrow-right"></i>
                </label>
              </div>

              <!--下方按钮 点击各个按钮 决定跳转到第几张-->
              <div class="count">
                <ul>
                  <li
                    class="current"
                    style="margin:0 20px"
                    v-for="img in carouselImages"
                    :key="img.id+ 'c'"
                  >
                    <label :class="'btn_ ' + img.id" :for="'btn' + img.id">
                      <img style="width:40px; " :src="img.value" alt />
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="desc-temp-desc">
            <div class="desc-temp-desc-title">Product Description</div>
            <div class="desc-temp-edit-text" v-html="description"></div>
          </div>
          <div class="desc-temp-tab" style="margin-bottom: 100px;">
            <div class="container-tab">
              <ul class="tab-wrapper">
                <!--tab section 1-->
                <li v-for="(tab,index) in tabBarData" :key="index+ 'r'">
                  <input
                    type="radio"
                    name="tab-radio"
                    class="tab-radio"
                    :id="`tab-radio-${index}`"
                    checked
                  />
                  <label
                    :for="`tab-radio-${index}`"
                    class="tab-handler"
                    :class="`tab-handler-${index}`"
                  >{{tab.name}}</label>
                  <div class="tab-content" :class="`tab-content-${index}`" v-html="tab.value"></div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="desc-temp-footer">
          <div class="desc-temp-in">
            <span class="desc-temp-copy">Copyright © 2020 Nangtang</span>
          </div>
        </div>
      </div>
    </div>
    {{templateCode}}
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "ViewTemplate",
  components: {},
  props: {
    id: [String, Number],
    bannerAttr: {
      type: String
    },
    templateTitleAttr: {
      type: String
    },
    descriptionAttr: {
      type: String
    },
    carouselImagesAttr: {
      type: Array
    },
    tabBarDataAttr: {
      type: Array
    }
  },
  watch: {
    bannerAttr(val) {
      this.banner = val;
    },
    templateTitleAttr(val) {
      // console.log(val);
      this.templateTitle = val;
    },
    descriptionAttr(val) {
      this.description = val;
    },
    carouselImagesAttr(val) {
      this.carouselImages = val;
    },
    tabBarDataAttr(val) {
      this.tabBarData = val;
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
      carouselImages: [],
      tabBarData: [],
      previewTemplate: "",
      recordCurrent: {},
      templateCode: ""
    };
  },
  created() {
    this.previewTemplate = "";
    this.getArrTemplateData();
  },

  methods: {
    getArrTemplateData() {
      let params = {
        id: this.id
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
          }
        });
    }
  },
  updated() {
    let templateCode = `
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
  /* min-height: 1838px; */
  background-color: #f5f5f5;
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
  background-color: rgba(0, 0, 0, 1);
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
  background-color: #333;
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
  background-color: #333;
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
  background: url("https://file.ebay.nantang-tech.com/1590378483254_repeat_bg.png") no-repeat center/cover;
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
  background-color: #333;
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
  background-color: #333;
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
  color: #000;
  background-color: #fff;
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
  background: #333;
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
  transform: translate(-50%，-50%);
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
    this.carouselImages.forEach((element, index) => {
      if (!(index == this.carouselImages.length - 1)) {
        arrCSS.push(`
                  /* 右边第${index + 1}个按钮 */
                #right_btn${index + 1}:checked ~ .pic .box {
                  margin-left: -${index + 1}00%;
                  transition: margin 0.8s 0s;
                }
                #right_btn${index + 1}:checked ~ .count .btn_${index + 2} {
                  background: white;
                }
                #right_btn${index + 1}:checked ~ .dir_box .btn_btn_${index +
          2} {
                  display: flex;
                }
  `);
      }
      if (index == this.carouselImages.length - 1) {
        arrCSS.push(
          `
                /* 右边第${index + 1}个按钮 */
              #right_btn${index + 1}:checked ~ .pic .box {
                margin-left: -${index + 1}00%;
                transition: margin 0.8s 0s;
              }
              #right_btn${index + 1}:checked ~ .count .btn_1 {
                background: white;
              }
              #right_btn${index + 1}:checked ~ .dir_box .btn_btn_1 {
                display: flex;
              }
                /* 右边跳转到一 */
              #right_btn${
                this.carouselImages.length
              }:checked ~ .pic .after_box {
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

    templateCode += arrCSS.join("");
    this.previewTemplate = this.$refs.templateHTML.innerHTML += templateCode;
    this.templateCode = templateCode;
    // console.log(this.templateCode);
  }
};
</script>
