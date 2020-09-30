<template>
  <div class="main">
    <div>
      <el-form ref="form" :inline="true" :model="form" label-width="100px">
        <el-col :span="5">
          <el-form-item label="账号编码">
            <el-input
              v-model="form.account_code"
              placeholder="需求编号"
              style="width: 107%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="平台">
            <el-select v-model="form.platform" placeholder="服务类型">
              <el-option
                v-for="(item, index) in platformlist"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="站点">
            <el-select v-model="form.site" placeholder="站点">
              <el-option
                v-for="(item, index) in sitelist"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="账号状态">
            <el-select v-model="form.status" placeholder="账号状态">
              <el-option
                v-for="(item, index) in buyerstatus"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="账号邮箱">
            <el-input
              v-model="form.email"
              placeholder="需求编号"
              style="width: 107%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="信用卡号">
            <el-input
              v-model="form.creditcard"
              placeholder="需求编号"
              style="width: 107%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="消费总额范围" class="numRange">
            <el-col :span="11" style="display: flex">
              <el-input
                v-model="form.amount_min"
                placeholder="最小值"
              ></el-input
              >&nbsp;至&nbsp;
            </el-col>
            <el-col :span="10">
              <el-input
                v-model="form.amount_max"
                placeholder="最大值"
              ></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="7" class="btnBox" style="text-align: center">
          <el-form-item>
            <el-button
              type="primary"
              v-if="showButtons.search"
              @click="getData('data')"
              icon="el-icon-search"
              >搜索</el-button
            >
            <el-button
              type="primary"
              v-if="showButtons.insert"
              @click="addDemand"
              >新增</el-button
            >
            <el-button
              type="primary"
              v-if="showButtons.exportBtn"
              @click="exportClick"
              >导出</el-button
            >
            <Upload
              class="upload-demo"
              :action="importExcel"
              :before-upload="beforeUolaod"
              :format="['xls', 'xlsx']"
              :on-format-error="handleFormatError"
              :on-error="handleError"
              :on-success="uploadSuccessExcel"
              :show-upload-list="false"
            >
              <el-popover placement="top-start" width="200" trigger="hover">
                <div style="color: #003b80">
                  <h4>注意</h4>
                  <p>1.仅支持导入xls、xlsx格式</p>
                  <p>2.模板中的表头不可更改，不可删除</p>
                  <p>3.数据记录不要超过5000条</p>
                  <p>4.同一个SKU存在多条记录，以第一条为准</p>
                </div>
                <el-button
                  icon="el-icon-plus"
                  v-if="showButtons.importBtn"
                  slot="reference"
                  type="primary"
                  >导入</el-button
                >
              </el-popover> </Upload
            >&nbsp;
            <span style="cursor: pointer" @click="downloadTemplate"
              >下载模板</span
            >
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <buyerAccountTable
      @colClick="colClick"
      :tableData="purchaserList.list"
      @selectionChange="selectionChange"
    />
    <div class="change_page">
      <page-total
        :total="purchaserList.total"
        :size="form.size"
        :current-page="form.page"
      />
      <el-pagination
        :current-page="form.page"
        background
        :page-sizes="[10, 20, 30, 50]"
        :page-size="form.size"
        layout="sizes, prev, pager, next, jumper"
        :total="purchaserList.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <Modal
      v-model="modal_fail"
      title="请选择服务类型"
      width="30%"
      footer-hide
      class-name="vertical-center-modal"
      @on-cancel="cancelFail"
    >
      <div style="text-align: center; padding: 20px 0 30px 0">
        <el-radio-group v-model="radio">
          <el-radio :label="3">备选项3</el-radio>
          <el-radio :label="6">备选项6</el-radio>
        </el-radio-group>
      </div>
      <div class="modal_tontent">
        <el-button type="primary" @click="submitFail">确认</el-button>
        <el-button type="info" @click="cancelFail">取消</el-button>
      </div>
    </Modal>
  </div>
</template>
<script>
import buyerAccountTable from "./table/buyerAccountTable";
import { mapState } from "vuex";
import { Upload } from "view-design";
import { Loading } from "element-ui";
let loadingInstance;
export default {
  components: { buyerAccountTable, Upload },
  computed: {
    ...mapState({
      purchaserList: (state) => state.supplementaryInformation.purchaserList,
      platformlist: (state) => state.commons.platformlist,
      sitelist: (state) => state.commons.sitelist,
      buyerstatus: (state) => state.commons.buyerstatus,
      showButtons: (state) => state.buyerAccount.showButtons,
    }),
  },
  data() {
    return {
      radio: "",
      selectList: [],
      modal_fail: false,
      form: {
        account_code: "",
        creditcard: "",
        platform: "",
        status: "",
        email: "",
        site: "",
        amount_min: "",
        amount_max: "",
        size: 10,
        page: 1,
      },
      importExcel: `${process.env.VUE_APP_BASE_API}/index.php/api/v1/uploads/uploadbuyerexcel`,
    };
  },
  created() {
    let id = this.$getMenuId(
      sessionStorage.getItem("munuIdList"),
      this.$route.path
    );
    this.$store.dispatch("buyerAccount/getButtonList", { id });
  },
  mounted() {
    this.getData();
    this.$store.dispatch("commons/getPlatformlist");
    this.$store.dispatch("commons/getSitelist");
    this.$store.dispatch("commons/getBuyerstatus");
  },
  methods: {
    exportClick() {
      let that = this;
      if (that.selectList.length == 0) {
        this.$message({
          message: "请选择要导出的记录",
          type: "warning",
        });
        return;
      }
      this.$store.dispatch("supplementaryInformation/purchaserExport", {
        ids: this.selectList.toString(),
      });
    },
    getData(data) {
      data ? (this.form.page = 1) : "";
      this.$store.dispatch("supplementaryInformation/getPurchaser", this.form);
    },
    addDemand() {
      // this.modal_fail = true;
      this.$router.push({ name: "Addbuyer" });
    },
    cancelFail() {
      this.modal_fail = false;
    },
    submitFail() {
      this.$router.push({ name: "AddDemand", query: "" });
    },
    selectionChange(data) {
      let selectList = [];
      data.forEach((item) => {
        selectList.push(item.id);
      });
      this.selectList = selectList;
    },
    colClick(val) {
      this.$router.push({
        name: "Addbuyer",
        query: {
          buyerEdit: val.id,
        },
      });
    },
    submit() {},
    handleSizeChange(size) {
      let that = this;
      that.form.page = 1;
      that.form.size = size;
      that.getData();
    },
    handleCurrentChange(nowpage) {
      let that = this;
      that.form.page = nowpage;
      that.getData();
    },
    // 上传之前
    beforeUolaod(file) {
      loadingInstance = Loading.service({
        fullscreen: true,
        text: "拼命上传中",
        spinner: "el-icon-loading",
        target: ".main-container",
      });
    },
    //导入格式不正确
    handleFormatError(file) {
      this.$message({
        type: "waring",
        message:
          "文件 " + file.name + " 格式不正确，请上传 xls 或者 是 xlsx 的文件。",
      });
      loadingInstance.close();
    },
    // 上传失败
    handleError(error, file, fileList) {
      this.$message({
        type: "error",
        message: error,
      });
      loadingInstance.close();
    },
    // 上传成功
    uploadSuccessExcel(response, file, fileList) {
      if (response.code !== 0) {
        this.$message({
          type: "warning",
          message: response.message,
        });
      }
      if (response.code == 0) {
        this.$message({
          type: "success",
          message: response.message,
        });
      }
      this.form.page = 1;
      this.getData();
      loadingInstance.close();
    },

    //下载模板
    downloadTemplate() {
      let url = process.env.VUE_APP_BASE_API + "/storage/maijiahao.xlsx";
      let a = document.createElement("a");
      a.style.display = "none";
      document.body.appendChild(a);
      a.href = url;
      a.setAttribute("download", "link"); // 指示浏览器下载url,而不是导航到它
      a.click();
      document.body.removeChild(a);
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/.numRange {
  display: flex;
}
/deep/.numRange > label {
  width: 136px !important;
}
/deep/.btnBox .el-form-item__content {
  display: flex;
}
/deep/.upload-demo {
  margin-left: 10px;
}
</style>