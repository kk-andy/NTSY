<template>
  <div class="edit-description-template">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
      <el-form-item label="模板名称：" prop="name">
        <el-input v-model="form.name" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="店铺：" prop="shop">
        <el-select v-model="form.shop" placeholder="请选择店铺" style="width:300px">
          <el-option
            v-for="(shop,index) in shopList"
            :key="index"
            :label="shop.shop_name"
            :value="shop.shop_id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-card shadow="never" class="box-card">
      <div slot="header" class="clearfix">
        <h3>模板选择</h3>
      </div>
      <div
        class="templateOut"
        :class="form.radio ? 'page-modal-single-hover' :'page-modal-single'"
        v-for=" template in templateList"
        :key="template.template_id"
      >
        <div class="page-modal-single-con">
          <el-radio
            style="width:200px"
            v-model="form.radio"
            class="isOverflow"
            :label="template.template_id"
          >
            <span>{{template.template_name}}</span>
            <div class="page-modal-single-img">
              <img :src="template.template_icon" />
            </div>
          </el-radio>
        </div>
      </div>
    </el-card>

    <div class="btn-group">
      <el-button type="primary" @click="onSubmit()">确定</el-button>
      <el-button @click="onCancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "EditTemplate",

  data() {
    return {
      form: {
        name: "",
        shop: "",
        radio: null,
      },
      shopList: [],
      templateList: [],
      rules: {
        name: [{ required: true, message: "请输入模板名称", trigger: "blur" }],
        shop: [{ required: true, message: "请选择店铺", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getshopsitecurrency();
    this.getTemplateInfo();
  },
  methods: {
    getshopsitecurrency() {
      this.$axios.get(`/listing/prepublish/shopsitecurrency`).then((res) => {
        this.shopList = res.data.shops;
      });
    },
    getTemplateInfo() {
      let params = {
        id: this.$route.query.templateId,
      };
      this.$axios
        .get("/listing/config/template/get_edit", { params })
        .then((res) => {
          this.form.name = res.data.template_name;
          this.form.shop = res.data.shop_id;
          this.form.radio = res.data.template_id;
          this.templateList = res.data.list;
        });
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (!this.form.radio) {
            this.$message({
              message: "请选择模板",
              type: "warning",
            });
            return;
          }
          let formdata = new FormData();
          formdata.append("template_name", this.form.name);
          formdata.append("template_id", this.form.radio);
          formdata.append("shop_id", this.form.shop);
          formdata.append("id", this.$route.query.templateId);
          this.$axios
            .post("/listing/config/template/edit", formdata)
            .then((res) => {
              this.$message({
                message: res.msg,
                type: "success",
              });
            });
          this.$router.go(-1);
        } else {
          return false;
        }
      });
    },
    onCancel() {
      this.$router.go(-1);
      this.$refs.form.resetFields();
    },
  },
};
</script>

<style  scoped>
.clearfix {
  color: #606266;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
  margin-top: 50px;
  box-sizing: border-box;
}
.templateOut {
  position: relative;
  top: 0;
  left: 0;
}
.templateOut:hover {
  top: -2px;
  transition: 0.3s;
}
.page-modal-single:hover {
  box-shadow: 2px 2px 10px 0 rgba(0, 34, 77, 0.3);
}
.page-modal-single-hover {
  display: inline-block;
  overflow: hidden;
  margin: 0 20px 20px 20px;
  border: 1px solid rgb(233, 233, 235);
  width: 220px;
  background-color: #fff;
  box-shadow: 2px 2px 10px 0 #909399;

  transition: 0.3s;
}
.page-modal-single {
  display: inline-block;
  overflow: hidden;
  margin: 0 20px 20px 20px;
  border: 1px solid #ccc;
  width: 220px;
  background-color: #fff;
  box-shadow: 1px 1px 5px 0 rgba(0, 34, 77, 0.3);
  transition: 0.3s;
}
.page-modal-single-img {
  position: relative;
  width: 220px;
  height: 320px;
  margin-top: 8px;
  border-bottom: 1px solid #e8e8e8;
  cursor: pointer;
}
.page-modal-single-img img {
  width: 220px;
  height: 320px;
}
.page-modal-single-title {
  overflow: hidden;
  padding: 5px;
  height: 50px;
  max-height: 50px;
  line-height: 20px;
  text-align: center;
  color: #737679;
}
.page-modal-single-con {
  margin: 20px 0;
  box-sizing: border-box;
  text-align: center;
}
.page-modal-single-time {
  display: inline-block;
  padding-left: 10px;
  height: 32px;
  width: 150px;
  max-height: 32px;
  line-height: 32px;
  text-align: left;
  vertical-align: top;
  overflow: hidden;
  color: #a0a3a6;
}
.page-modal-single-btn {
  display: inline-block;
  text-align: center;
  vertical-align: top;
}
.btn-primary {
  padding: 0 10px;
  color: #fff;
  border: none;
  outline: none;
  line-height: 30px;
  cursor: pointer;
  border-radius: 5px;
  background-color: #337ab7;
  border-color: #2e6da4;
}
.btn-group {
  margin: 0 40px;
  position: absolute;
  bottom: -1vh;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.el-button {
  margin-right: 20%;
}
</style>


