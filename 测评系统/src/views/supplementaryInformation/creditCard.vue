<template>
  <div class="main">
    <div>
      <el-form ref="form" :inline="true" :model="form" label-width="100px">
        <!-- <el-col :span="6">
          <el-form-item label="卡编号">
            <el-input
              v-model="form.num"
              placeholder="需求编号"
              style="width: 107%"
            ></el-input>
          </el-form-item>
        </el-col> -->
        <el-col :span="6">
          <el-form-item label="信用卡号">
            <el-input
              v-model="form.creditcard"
              placeholder="需求编号"
              style="width: 107%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="卡状态">
            <el-select v-model="form.status" placeholder="站点">
              <el-option
                v-for="(item, index) in creditcardstatus"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="历史充值金额" class="numRange">
            <el-col :span="11" style="display: flex">
              <el-input
                v-model="form.history_amount_min"
                placeholder="最小值"
              ></el-input
              >&nbsp;至&nbsp;
            </el-col>
            <el-col :span="10">
              <el-input
                v-model="form.history_amount_max"
                placeholder="最大值"
              ></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="当前卡余额" class="numRange">
            <el-col :span="11" style="display: flex">
              <el-input
                v-model="form.balance_min"
                placeholder="最小值"
              ></el-input
              >&nbsp;至&nbsp;
            </el-col>
            <el-col :span="10">
              <el-input
                v-model="form.balance_max"
                placeholder="最大值"
              ></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="提交日期">
            <el-date-picker
              v-model="form.create_at"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              clearable
            ></el-date-picker>
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
    <creditCardTable
      @colClick="colClick"
      :tableData="creditcardList.list"
      @selectionChange="selectionChange"
    />
    <div class="change_page">
      <page-total
        :total="creditcardList.total"
        :size="form.size"
        :current-page="form.page"
      />
      <el-pagination
        :current-page="form.page"
        background
        :page-sizes="[10, 20, 30, 50]"
        :page-size="form.size"
        layout="sizes, prev, pager, next, jumper"
        :total="creditcardList.total"
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
import creditCardTable from "./table/creditCardTable";
import { mapState } from "vuex";
import { Upload } from "view-design";
import { Loading } from "element-ui";
let loadingInstance;
export default {
  components: { creditCardTable, Upload },
  computed: {
    ...mapState({
      creditcardList: (state) => state.supplementaryInformation.creditcardList,
      creditcardstatus: (state) => state.commons.creditcardstatus,
      showButtons: (state) => state.creditCard.showButtons,
    }),
    key() {
      return this.$route.path;
    },
  },
  data() {
    return {
      radio: "",
      selectList: [],
      modal_fail: false,
      form: {
        creditcard: "",
        status: "",
        history_amount_max: "",
        history_amount_min: "",
        balance_max: "",
        balance_min: "",
        create_at: "",
        size: 10,
        page: 1,
      },
      importExcel: `${process.env.VUE_APP_BASE_API}/index.php/api/v1/uploads/uploadcreditcardexcel`,
    };
  },
  created() {
    let id = this.$getMenuId(
      sessionStorage.getItem("munuIdList"),
      this.$route.path
    );
    this.$store.dispatch("creditCard/getButtonList", { id });
  },
  mounted() {
    this.getData();
    this.$store.dispatch("commons/getCreditcardstatus");
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
      this.$store.dispatch("supplementaryInformation/creditcardExport", {
        ids: this.selectList.toString(),
      });
    },
    getData(data) {
      data ? (this.form.page = 1) : "";
      this.$store.dispatch("supplementaryInformation/getCreditcard", this.form);
    },
    addDemand() {
      // this.modal_fail = true;
      this.$router.push({ name: "AddCreditCard" });
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
        name: "AddCreditCard",
        query: {
          creditCardEdit: val.id,
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
      let url = process.env.VUE_APP_BASE_API + "/storage/xinyongkaku.xlsx";
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