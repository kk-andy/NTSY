<template>
  <el-dialog
    class="imgrotate"
    width="600px"
    :show-close="false"
    :title="title"
    :append-to-body="append"
    :visible.sync="visibleImg"
    :close-on-click-modal="false"
    :lock-scroll="false"
  >
    <el-button @click="handleClose" class="imgclose" type="info" icon="el-icon-close" circle></el-button>
    <el-carousel
      width="500px"
      height="500px"
      trigger="click"
      :indicator-position="imgList.length!=1?'outside':'none'"
      :arrow="imgList.length!=1?'hover':'never'"
      :autoplay="false"
      :initial-index="index"
    >
      <el-carousel-item
        v-for="item in imgList"
        :key="item.url"
        :style="{transform:'rotate('+rotate+'deg)'}"
      >
        <el-image
          :src="fileType(item)"
          style="width:500px;height:500px;margin:0 auto;display:block;"
        ></el-image>
        <!-- <a
          :href="downurl"
          :style="{background: 'url(' + item.url +') no-repeat center center/contain'}"
          style="width:500px;height:500px;margin:0 auto;display:block;"
          target="_blank"
        ></a>-->
      </el-carousel-item>
    </el-carousel>
    <div slot="footer" class="dialog-footer">
      <!-- <img src="../../assets/images/left.png" @click="rotateLeft" style="margin:0 20px;" alt />
      <img src="../../assets/images/180.png" @click="rotateimg" style="margin:0 20px;" alt />
      <img src="../../assets/images/right.png" @click="rotateRight" style="margin:0 20px;" alt />-->
      <img src="../../assets/images/down.png" @click="download" alt />
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      rotate: 0,
      visibleImg: false,
      //   index: 0,
      downurl: "",
      initialindex: 0,
      imgList: [],
    };
  },
  props: ["visible", "imgUrl", "title", "append", "fileList", "index"],
  watch: {
    visible: {
      handler: function (val, oldValue) {
        this.visibleImg = val;
        this.rotate = 0;
        if (val) {
          this.imgList = this.fileList;
        }
      },
      immediate: true,
    },
  },
  methods: {
    download() {
      let href = this.fileList[this.index].url;
      let a = document.createElement("a");
      a.style.display = "none";
      a.target = "_blank";
      document.body.appendChild(a);
      a.href = href;
      a.setAttribute("download", "link"); // 指示浏览器下载url,而不是导航到它
      a.click();
      document.body.removeChild(a);
    },
    getData(data) {
      let array = this.fileList;
      return array;
    },
    // getChange(val) {
    //   this.rotate = 0;
    // },
    fileType(file) {
      debugger;
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
    rotateRight() {
      this.rotate += 90;
    },
    rotateLeft() {
      this.rotate += -90;
    },
    rotateimg() {
      this.rotate += 180;
    },
    onCancel() {
      this.$emit("on-cancel");
    },
    handleClose() {
      this.imgList = [];
      this.$emit("on-cancel");
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
