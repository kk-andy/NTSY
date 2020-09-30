<template>
  <div class="main">
    <div>
      <el-form ref="form" :inline="true" :model="form" label-width="100px">
        <el-col :span="6">
          <el-form-item label="需求编号">
            <el-input v-model="form.ntcp_id" placeholder="需求编号" style="width: 107%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="评测人">
            <el-select v-model="form.staff_id" placeholder="评测人">
              <el-option
                v-for="(item,index) in followerlist"
                :key="index"
                :label="item.staff_name"
                :value="item.staff_id"
              ></el-option>
            </el-select>
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
          <el-form-item label="平台">
            <el-select v-model="form.platform" placeholder="平台">
              <el-option v-for="item in platformlist" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="站点">
            <el-select v-model="form.site" placeholder="站点">
              <el-option v-for="(item,index) in sitelist" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="text-align: center;">
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              v-if="showButtons.search"
              @click="getData(true)"
            >搜索</el-button>
            <el-button
              type="primary"
              v-if="showButtons.changeEvaluating"
              @click="changeDemander"
            >更改评测人</el-button>
            <el-button
              type="danger"
              v-if="showButtons.errorPigeonhole"
              @click="exceptionArchive"
            >异常归档</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <evaluationOrderTable
      :tableData="assessorderList.list"
      @selectionChange="selectionChange"
      @numberClick="numberClick"
    />
    <div class="change_page">
      <page-total :total="assessorderList.total" :size="form.size" :current-page="form.page" />
      <el-pagination
        :current-page="form.page"
        background
        :page-sizes="[10, 20, 30, 50]"
        :page-size="form.size"
        layout="sizes, prev, pager, next, jumper"
        :total="assessorderList.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <Modal
      v-model="modal_demander"
      title="请选择评测人"
      width="20%"
      footer-hide
      class-name="vertical-center-modal"
      @on-cancel="cancelFail"
    >
      <div class="modal_tontent">
        <el-select v-model="demander.follower" placeholder="评测人" @change="demanderChange">
          <el-option
            v-for="(item,index) in followerlist"
            :key="index"
            :label="item.staff_name"
            :value="item.staff_name"
          ></el-option>
        </el-select>
      </div>
      <div class="modal_tontent">
        <el-button type="primary" @click="submitDemander">确认</el-button>
        <el-button type="info" @click="cancelFail">取消</el-button>
      </div>
    </Modal>
    <Modal
      v-model="modal_fail"
      title="归档原因"
      width="30%"
      footer-hide
      class-name="vertical-center-modal"
      @on-cancel="cancelFail"
    >
      <div class="modal_tontent">
        <el-form ref="abnormal" :model="abnormal" :rules="rules" label-width="80px">
          <el-form-item label="归档原因" prop="reason">
            <el-input type="textarea" v-model="abnormal.reason" placeholder="输入归档原因"></el-input>
          </el-form-item>
          <el-form-item label="退款金额" prop="actual_amount">
            <el-col :span="11">
              <el-input v-model="abnormal.actual_amount" placeholder="输入退款金额"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="退款币种" prop="currency">
            <el-select v-model="abnormal.currency" placeholder="请选择退款币种">
              <el-option v-for="(item,index) in currency" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="退款原由" prop="refund_reason">
            <el-select v-model="abnormal.refund_reason" placeholder="请选择退款原由">
              <el-option
                v-for="item in refundreason"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('abnormal')">提交</el-button>
            <el-button @click="resetForm('abnormal')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </Modal>
  </div>
</template>
<script>
import evaluationOrderTable from "./table/evaluationOrderTable";
import { mapState } from "vuex";
export default {
  components: { evaluationOrderTable },
  computed: {
    ...mapState({
      assessorderList: (state) => state.releaseManagement.assessorderList,
      servicetype: (state) => state.commons.servicetype,
      serviceitem: (state) => state.commons.serviceitem,
      platformlist: (state) => state.commons.platformlist,
      sitelist: (state) => state.commons.sitelist,
      followerlist: (state) => state.commons.followerlist,
      currency: (state) => state.commons.currency,
      refundreason: (state) => state.commons.refundreason,
      showButtons: (state) => state.evaluationOrder.showButtons,
    }),
    modal_fail: {
      get() {
        return this.$store.state.releaseManagement.modal_fail;
      },
      set(val) {
        this.$store.state.releaseManagement.modal_fail = val;
      },
    },
    modal_demander: {
      get() {
        return this.$store.state.releaseManagement.modal_demander;
      },
      set(val) {
        this.$store.state.releaseManagement.modal_demander = val;
      },
    },
  },
  data() {
    return {
      radio: "",
      selectList: [],
      demander: {
        id: "",
        follower: "",
        follower_id: "",
      },
      form: {
        ntcp_id: "",
        server_id: "",
        type: "",
        staff_id: "",
        platform: "",
        site: "",
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
    this.$store.dispatch("evaluationOrder/getButtonList", { id });
  },
  mounted() {
    this.getData();
    this.$store.dispatch("commons/getServiceitem");
    this.$store.dispatch("commons/getPlatformlist");
    this.$store.dispatch("commons/getSitelist");
    this.$store.dispatch("commons/getFollowerlist");
    this.$store.dispatch("commons/getRefundreason");
    this.$store.dispatch("commons/getCurrency");
  },
  methods: {
    submitDemander() {
      let query = this.demander;
      let item = this.form;
      this.$store.dispatch("releaseManagement/assessorderChangeFollower", {
        query,
        item,
      });
    },
    demanderChange(data) {
      let that = this;
      let textData = that.followerlist.filter((item) => {
        return item.staff_name === data;
      });
      that.demander.follower_id = textData[0].staff_id;
    },
    changeDemander() {
      let that = this;
      if (that.selectList.length == 0) {
        that.$message({
          message: "请选择要更改的需求",
          type: "warning",
        });
        return;
      }
      that.modal_demander = true;
      that.demander.id = that.selectList.toString();
    },
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
      this.$store.dispatch("releaseManagement/getAssessorder", this.form);
    },
    numberClick(data) {
      this.$router.push({
        name: "EvaluationOrderEdit",
        query: { id: data.id },
      });
    },
    onSubmit(formName) {
      let query = this.abnormal;
      let item = this.form;
      let port = "getAssessorder";
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