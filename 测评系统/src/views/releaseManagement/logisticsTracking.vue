<template>
  <div class="main">
    <div>
      <el-form ref="form" :inline="true" :model="form" label-width="100px">
        <el-col :span="6">
          <el-form-item label="需求编号">
            <el-input
              v-model="form.ntcp_id"
              placeholder="需求编号"
              style="width: 107%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="服务类型">
            <el-select v-model="form.type" placeholder="服务类型">
              <el-option
                v-for="item in servicetype"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="服务项目">
            <el-select v-model="form.server_id" placeholder="服务项目">
              <el-option
                v-for="item in serviceitem"
                :key="item.id"
                :label="item.item_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="跟踪号">
            <el-input
              v-model="form.track_num"
              placeholder="跟踪号"
              style="width: 107%"
            ></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="6">
          <el-form-item label="发货状态">
            <el-select v-model="form.ship_status" placeholder="发货状态">
              <el-option label="未发货" value="1"></el-option>
              <el-option label="已发货" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
        <el-col :span="10">
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
        <el-col :span="6" style="text-align: center">
          <el-form-item>
            <el-button
              type="primary"
              @click="getData('data')"
              v-if="showButtons.search"
              icon="el-icon-search"
              >搜索</el-button
            >
            <!-- <el-button type="primary">批量转留评</el-button> -->
            <el-button
              type="danger"
              v-if="showButtons.errorPigeonhole"
              @click="exceptionArchive"
              >异常归档</el-button
            >
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <logisticsTrackingTable
      :tableData="assessshipList.list"
      @selectionChange="selectionChange"
      @numberClick="numberClick"
    />
    <div class="change_page">
      <page-total
        :total="assessshipList.total"
        :size="form.size"
        :current-page="form.page"
      />
      <el-pagination
        :current-page="form.page"
        background
        :page-sizes="[10, 20, 30, 50]"
        :page-size="form.size"
        layout="sizes, prev, pager, next, jumper"
        :total="assessshipList.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <Modal
      v-model="modal_fail"
      title="归档原因"
      width="30%"
      footer-hide
      class-name="vertical-center-modal"
      @on-cancel="cancelFail"
    >
      <div class="modal_tontent">
        <el-form
          ref="abnormal"
          :model="abnormal"
          :rules="rules"
          label-width="80px"
        >
          <el-form-item label="归档原因" prop="reason">
            <el-input
              type="textarea"
              v-model="abnormal.reason"
              placeholder="输入归档原因"
            ></el-input>
          </el-form-item>
          <el-form-item label="退款金额" prop="actual_amount">
            <el-col :span="11">
              <el-input
                v-model="abnormal.actual_amount"
                placeholder="输入退款金额"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="退款币种" prop="currency">
            <el-select v-model="abnormal.currency" placeholder="请选择退款币种">
              <el-option
                v-for="(item, index) in currencys"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="退款原由" prop="refund_reason">
            <el-select
              v-model="abnormal.refund_reason"
              placeholder="请选择退款原由"
            >
              <el-option
                v-for="item in refundreason"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('abnormal')"
              >提交</el-button
            >
            <el-button @click="resetForm('abnormal')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </Modal>
  </div>
</template>
<script>
import logisticsTrackingTable from "./table/logisticsTrackingTable";
import { mapState } from "vuex";
export default {
  components: { logisticsTrackingTable },
  computed: {
    ...mapState({
      assessshipList: (state) => state.releaseManagement.assessshipList,
      servicetype: (state) => state.commons.servicetype,
      serviceitem: (state) => state.commons.serviceitem,
      currencys: (state) => state.commons.currency,
      refundreason: (state) => state.commons.refundreason,
      showButtons: (state) => state.logisticsTracking.showButtons,
    }),
    modal_fail: {
      get() {
        return this.$store.state.releaseManagement.modal_fail;
      },
      set(val) {
        this.$store.state.releaseManagement.modal_fail = val;
      },
    },
  },
  data() {
    return {
      selectList: [],
      radio: "",
      form: {
        ntcp_id: "",
        type: "",
        server_id: "",
        track_num: "",
        // ship_status: "",
        create_at: "",
        size: 10,
        page: 1,
      },
      abnormal: {
        id: "",
        reason: "",
        currency: "",
        actual_amount: "",
        refund_reason: "",
      },
      rules: {
        reason: [
          { required: true, message: "请输入归档原因", trigger: "blur" },
        ],
        currency: [
          { required: true, message: "请输入退款金额", trigger: "blur" },
        ],
        actual_amount: [
          { required: true, message: "请选择退款币种", trigger: "change" },
        ],
        refund_reason: [
          { required: true, message: "请选择退款原由", trigger: "change" },
        ],
      },
    };
  },
  created() {
    let id = this.$getMenuId(
      sessionStorage.getItem("munuIdList"),
      this.$route.path
    );
    this.$store.dispatch("logisticsTracking/getButtonList", { id });
  },
  mounted() {
    this.getData();
    this.$store.dispatch("commons/getServiceitem");
    this.$store.dispatch("commons/getSitelist");
    this.$store.dispatch("commons/getRefundreason");
    this.$store.dispatch("commons/getCurrency");
  },
  methods: {
    exceptionArchive() {
      let that = this;
      if (that.selectList.length == 0) {
        that.$message({
          message: "请选择要归档的需求",
          type: "warning",
        });
        return;
      } else if (that.selectList.length > 1) {
        that.$message({
          message: "每次只能操作单个需求",
          type: "warning",
        });
        return;
      }
      that.abnormal.id = that.selectList.toString();
      that.modal_fail = true;
    },
    getData(data) {
      data ? (this.form.page = 1) : "";
      this.$store.dispatch("releaseManagement/getAssessship", this.form);
    },
    numberClick(data) {
      this.$router.push({
        name: "LogisticsTrackingEdit",
        query: { id: data.id },
      });
    },
    onSubmit(formName) {
      let query = this.abnormal;
      let item = this.form;
      let port = "getAssessship";
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch("releaseManagement/assessorderAbnormalFile", {
            query,
            item,
            port,
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    addDemand() {
      this.modal_fail = true;
    },
    cancelFail() {
      this.modal_fail = false;
    },
    submitFail() {
      this.$router.push({ name: "AddDemand", query: "" });
    },
    selectionChange(data) {
      let selects = [];
      data.forEach((item) => {
        selects.push(item.id);
      });
      this.selectList = selects;
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
  },
};
</script>