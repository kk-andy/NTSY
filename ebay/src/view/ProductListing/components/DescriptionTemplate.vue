<template>
  <div class="description-template-edit">
    <div class="desc-temp-header margin-b10">
      <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1589179032123&di=b0cc562d065179bba28ed9ed00ff4142&imgtype=0&src=http%3A%2F%2Fa3.att.hudong.com%2F14%2F75%2F01300000164186121366756803686.jpg" alt />
      <div class="desc-temp-edit descTempEdit" data-type="banner">
        <i class="el-icon-edit"></i>编辑
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
        <div class="desc-temp-title margin-b10">
          【标题】
          <div class="desc-temp-edit descTempEdit" data-type="banner">
            <i class="el-icon-edit"></i>编辑
          </div>
        </div>
        <div class="desc-temp-switch margin-b10">
          <div class="desc-temp-switch-top">
            <div class="desc-temp-switch-top-left">
              <i class="el-icon-arrow-left"></i>
            </div>
            <div class="desc-temp-switch-top-center"></div>
            <div class="desc-temp-switch-top-right">
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
          <div class="desc-temp-switch-bottom">
            <div class="desc-temp-switch-bottom-single special"></div>
            <div class="desc-temp-switch-bottom-single"></div>
            <div class="desc-temp-switch-bottom-single"></div>
            <div class="desc-temp-switch-bottom-single"></div>
            <div class="desc-temp-switch-bottom-single"></div>
          </div>
          <div class="desc-temp-edit descTempEdit" data-type="banner">
            <i class="el-icon-edit"></i>编辑
          </div>
        </div>
        <div class="desc-temp-desc">
          <div class="desc-temp-desc-title">
            Product Description
            <div class="desc-temp-edit descTempEdit" data-type="banner">
              <i class="el-icon-edit"></i>编辑
            </div>
          </div>
        </div>
        <div class="desc-temp-tab" style="margin-bottom: 100px;">
          <ul class="temp-tabs-all">
            <li class="tabs">
              <input id="tab1" type="radio" name="tab" checked />
              <label for="tab1">Payment Policy</label>
              <div class="content">选项一内容</div>
            </li>
            <li class="tabs">
              <input id="tab2" type="radio" name="tab" />
              <label for="tab2">Shipping Policy</label>
              <div class="content">选项二内容</div>
            </li>
            <li class="tabs">
              <input id="tab3" type="radio" name="tab" />
              <label for="tab3">Returns Policy</label>
              <div class="content">选项三内容</div>
            </li>
          </ul>
          <div class="desc-temp-edit descTempEdit" data-type="banner">
            <i class="el-icon-edit"></i>编辑
          </div>
        </div>
      </div>

      <div class="desc-temp-footer">
        <div class="desc-temp-in">
          <span class="desc-temp-copy">Copyright © 2018 Dianxiaomi</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "DescriptionTemplate",
  components: {}
};
</script>

<style>
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
.desc-temp-header img {
  width: 100%;
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
}
.desc-temp-edit i {
  margin: 0 5px;
}
.desc-temp-body {
  position: relative;
  display: flex;
  width: 100%;
  /* min-height: 1310px; */
}
.desc-temp-body-left {
  width: 220px;
}
.desc-temp-body-right {
  width: calc(100% - 230px);
  margin-left: 10px;
  /* position: absolute;
  top: 0;
  right: 0;
  z-index: 1; */
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
  /* background: url("~@/assets/images/repeat_bg.png") no-repeat center/cover; */
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
  overflow: hidden;
  box-sizing: border-box;
  background-color: #333;
}
.desc-temp-footer {
  position: absolute;
  bottom: -30px;
  left: -50px;
  width: 1160px;
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
  min-height: 220px;
  background-color: #fff;
}

.desc-temp-tab .temp-tabs-all {
  position: absolute;
  width: 100%;
  display: flex;
  background-color: #333;
}
.desc-temp-tab .temp-tabs-all .tabs {
  list-style: none;
}
.desc-temp-tab .temp-tabs-all .tabs input {
  display: none;
}
.desc-temp-tab .temp-tabs-all .tabs label {
  float: left;
  width: 100px;
  text-align: center;
  line-height: 32px;
  color: #fff;
  background-color: #333;
  border-right: 0;
  box-sizing: border-box;
  cursor: pointer;
  /* transition: all 0.3s; */
}
.desc-temp-tab .temp-tabs-all .tabs input:checked + label {
  color: #000;
  background-color: #fff;
}

.desc-temp-tab .temp-tabs-all .tabs .content {
  opacity: 0;
  visibility: hidden;
  position: absolute;
  left: 0;
  top: 31px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  color: #000;
  background-color: #fff;
  /* transition: all 0.3s; */
}

.desc-temp-tab .temp-tabs-all .tabs input:checked ~ .content {
  opacity: 1;
  visibility: visible;
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
</style>