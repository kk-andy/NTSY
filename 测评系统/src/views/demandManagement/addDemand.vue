<template>
  <div class="main">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="服务项目" prop="server_name">
        <el-select v-model="ruleForm.server_name" placeholder="请选择" @change="serverChange">
          <el-option
            v-for="item in serviceitem"
            :key="item.id"
            :label="item.item_name"
            :value="item.item_name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="需求人" prop="staff_name">
        <el-col :span="6">
          <el-select
            filterable
            v-model="ruleForm.staff_name"
            placeholder="请选择"
            @change="staffChange"
          >
            <el-option
              v-for="item in demanderlist"
              :key="item.staff_id"
              :label="item.staff_name"
              :value="item.staff_name"
            ></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="需求组别">
        <el-col :span="6">
          <el-input style="width:218px" v-model="ruleForm.dept_name" disabled></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="店铺名称" prop="name">
        <el-col :span="6">
          <el-select
            filterable
            v-model="ruleForm.store_name"
            placeholder="请选择"
            @change="storeChang"
          >
            <el-option
              v-for="item in shoplist"
              :key="item.id"
              :label="item.shopName"
              :value="item.shopName"
            ></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="平台" prop="platform">
        <el-select v-model="ruleForm.platform" placeholder="请选择">
          <el-option v-for="item in platformlist" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="站点" prop="site">
        <el-select v-model="ruleForm.site" placeholder="请选择">
          <el-option v-for="(item,index) in sitelist" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SKU" prop="sku">
        <el-col :span="6">
          <el-input v-model="ruleForm.sku" @change="skublur"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-col :span="6">
          <el-input v-model="ruleForm.product_name" disabled></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="ASIN" prop="ASIN">
        <el-col :span="6">
          <el-input v-model="ruleForm.ASIN"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="关键词" prop="keyword">
        <el-col :span="6">
          <el-input type="textarea" v-model="ruleForm.keyword"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="关键词位置" prop="keyword_position">
        <el-col :span="6">
          <el-input type="textarea" v-model="ruleForm.keyword_position"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="销售价格" prop="amount">
        <el-col :span="6">
          <el-input v-model="ruleForm.amount"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="下单币种" prop="currency">
        <el-select v-model="ruleForm.currency" placeholder="请选择">
          <el-option v-for="(item,index) in currency" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="评论标题" prop="comment_title">
        <el-col :span="6">
          <el-input type="textarea" v-model="ruleForm.comment_title"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="评论内容" prop="comment_content">
        <el-col :span="6">
          <el-input type="textarea" v-model="ruleForm.comment_content"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="评论图片">
        <oss-upload-img :limit="8" v-model="ruleForm.commentImg"></oss-upload-img>
      </el-form-item>
      <el-form-item label="服务费用">
        <el-col :span="6">
          <el-input v-model="ruleForm.server_fee" disabled></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-col :span="6">
          <el-input
            type="textarea"
            :placeholder="this.ruleForm.type == 1?'1.产品目前日销量 2.目前的评论数量 3.产品目前的评分':this.ruleForm.type == 2?'请输入需要采购的数量':'请按需完善信息'"
            v-model="ruleForm.remark"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm',2)">提交</el-button>
        <el-button type="primary" @click="submitForm('ruleForm',1)">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState } from "vuex";
import ossUploadImg from "@/components/uploads/ossUpload";
import { Getstaffdept, Getserverfee, GetproductName } from "@/utils/devoption";
export default {
  name: "AddDemand",
  components: { ossUploadImg },
  computed: {
    ...mapState({
      purchaserRead: (state) => state.demandManagement.purchaserRead,
      serviceitem: (state) => state.commons.serviceitem,
      platformlist: (state) => state.commons.platformlist,
      demanderlist: (state) => state.commons.demanderlist,
      currency: (state) => state.commons.currency,
      sitelist: (state) => state.commons.sitelist,
      shoplist: (state) => state.commons.shoplist,
      name: (state) => state.user.name,
    }),
  },
  watch: {
    purchaserRead: {
      handler: function (newdata, olddata) {
        if (newdata) {
          this.ruleForm = newdata;
          let arr = [];
          if (newdata.pic) {
            newdata.pic.forEach((item) => {
              if (item.type == 1) {
                arr.push(item);
              }
            });
          }
          this.ruleForm.commentImg = arr;
        }
      },
    },
    deep: true,
    immediate: true,
  },
  data() {
    return {
      isEdit: false,
      dialogImageUrl: "",
      dialogVisible: false,
      ruleForm: {
        server_id: "",
        server_name: "",
        staff_id: "",
        staff_name: "",
        dept_id: "",
        dept_name: "",
        store_id: "",
        store_name: "",
        platform: "",
        site: "",
        product_name: "",
        sku: "",
        ASIN: "",
        keyword: "",
        keyword_position: "",
        amount: "",
        currency: "",
        comment_content: "",
        comment_title: "",
        server_fee: "",
        status: "",
        type: "",
        pic_url: [],
        commentImg: [],
        remark: "",
      },
      rules: {
        server_name: [
          { required: true, message: "请选择服务项目", trigger: "change" },
        ],
        staff_name: [
          { required: true, message: "请选择需求人", trigger: "change" },
        ],
        platform: [
          { required: true, message: "请选择平台", trigger: "change" },
        ],
        site: [{ required: true, message: "请选择站点", trigger: "change" }],
        product_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        sku: [{ required: true, message: "请输入SKU", trigger: "blur" }],
        ASIN: [{ required: true, message: "请输入ASIN", trigger: "blur" }],
        keyword: [{ required: true, message: "请输入关键词", trigger: "blur" }],
        keyword_position: [
          { required: true, message: "请输入关键词位置", trigger: "blur" },
        ],
        amount: [
          { required: true, message: "请输入下单价格", trigger: "blur" },
        ],
        currency: [
          { required: true, message: "请选择货币类型", trigger: "change" },
        ],
        comment_content: [
          { required: true, message: "请输入评论内容", trigger: "blur" },
        ],
        comment_title: [
          { required: true, message: "请输入标题内容", trigger: "blur" },
          { max: 3000, message: "长度1000以内", trigger: "blur" },
        ],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
    };
  },
  created() {
    if (this.$route.query.server_id) {
      this.ruleForm.type = this.$route.query.server_id;
    }
    if (this.$route.query.id) {
      let query = {
        id: this.$route.query.id,
      };
      this.$store.dispatch("demandManagement/purchaserRead", query);
      this.isEdit = true;
    }
  },
  mounted() {
    if (!this.$route.query.id) {
      this.ruleForm.staff_name = sessionStorage.userName;
    }
    this.$store.dispatch("commons/getPlatformlist");
    this.$store.dispatch("commons/getCurrency");
    this.$store.dispatch("commons/getshoplist");
    //加token可用
    // this.$store.dispatch("user/getInfo").then(() => {
    //   this.ruleForm.staff_name = this.name;
    // });
  },
  methods: {
    serverChange(data) {
      let that = this;
      let testData = that.serviceitem.filter((item) => {
        return item.item_name === data;
      });
      that.ruleForm.server_id = testData[0].id;
      Getserverfee({ server_id: testData[0].id }).then((item) => {
        if (item.code == 0) {
          that.ruleForm.server_fee = item.data.unit_price;
        }
      });
    },
    staffChange(data) {
      let that = this;
      let testData = that.demanderlist.filter((item) => {
        return item.staff_name === data;
      });
      that.ruleForm.staff_id = testData[0].staff_id;
      Getstaffdept({ staff_id: testData[0].staff_id }).then((item) => {
        if (item.code == 0) {
          that.ruleForm.dept_id = item.data.department;
          that.ruleForm.dept_name = item.data.dept_name;
        }
      });
    },
    storeChang(data) {
      let that = this;
      let testData = that.shoplist.filter((item) => {
        return item.shopName === data;
      });
      that.ruleForm.store_id = testData[0].id;
    },
    skublur(data) {
      let that = this;
      GetproductName({ sku: data }).then((item) => {
        if (item.code == 0) {
          that.ruleForm.product_name = item.data.sku_name;
        }
      });
    },
    submitForm(formName, type) {
      this.ruleForm.status = type;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let arr = [];
          this.ruleForm.commentImg.forEach((item) => {
            arr.push(item.url);
          });
          this.ruleForm.pic_url = arr;
          if (this.isEdit) {
            this.$store.dispatch(
              "demandManagement/purchaserUpdate",
              this.ruleForm
            );
          } else {
            this.$store.dispatch(
              "demandManagement/purchaserCreate",
              this.ruleForm
            );
          }
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
  // beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     console.log(from);
  //   });
  // },
};
</script>