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
            <el-select v-model="form.type" placeholder="请选择">
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
            <el-select v-model="form.server_id" placeholder="请选择">
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
          <el-form-item label="需求人组别">
            <el-select v-model="form.dept_id" placeholder="请选择">
              <el-option
                v-for="item in demanddept"
                :key="item.dept_id"
                :label="item.dept_name"
                :value="item.dept_id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="商品名称">
            <el-input
              v-model="form.product_name"
              placeholder="商品名称"
              style="width: 107%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="返款方式">
            <el-select v-model="form.changeType" placeholder="返款方式">
              <el-option
                v-for="item in paymenttype"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
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
        <el-col :span="5" style="text-align: center">
          <el-form-item>
            <el-button
              type="primary"
              @click="getData('data')"
              v-if="showButtons.search"
              icon="el-icon-search"
              >搜索</el-button
            >
            <!-- <el-button type="primary">批量提交</el-button> -->
            <el-button
              type="danger"
              v-if="showButtons.errorPigeonhole"
              @click="addDemand"
              >异常归档</el-button
            >
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <rebateOperationTable
      :tableData="assessrefundList.list"
      @selectionChange="selectionChange"
      @numberClick="numberClick"
    />
    <div class="change_page">
      <page-total
        :total="assessrefundList.total"
        :size="form.size"
        :current-page="form.page"
      />
      <el-pagination
        :current-page="form.page"
        background
        :page-sizes="[10, 20, 30, 50]"
        :page-size="form.size"
        layout="sizes, prev, pager, next, jumper"
        :total="assessrefundList.total"
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
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="归档原因">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item label="退款金额">
            <el-col :span="11">
              <el-input v-model="form.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="退款币种">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="退款原由">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </Modal>
  </div>
</template>
<script>
import rebateOperationTable from "./table/rebateOperationTable";
import { mapState } from "vuex";
export default {
  components: { rebateOperationTable },
  computed: {
    ...mapState({
      assessrefundList: (state) => state.financialManagement.assessrefundList,
      servicetype: (state) => state.commons.servicetype,
      serviceitem: (state) => state.commons.serviceitem,
      paymenttype: (state) => state.commons.paymenttype,
      demanddept: (state) => state.commons.demanddept,
      showButtons: (state) => state.rebateOperation.showButtons,
    }),
    key() {
      return this.$route.path;
    },
  },
  data() {
    return {
      radio: "",
      modal_fail: false,
      form: {
        ntcp_id: "",
        type: "",
        create_at: "",
        server_id: "",
        dept_id: "",
        product_name: "",
        changeType: "",
        size: 10,
        page: 1,
      },
    };
  },
  created() {
    let id = this.$getMenuId(
      sessionStorage.getItem("munuIdList"),
      this.$route.path
    );
    this.$store.dispatch("rebateOperation/getButtonList", { id });
  },
  mounted() {
    this.getData();
    this.$store.dispatch("commons/getServiceitem");
    this.$store.dispatch("commons/getPaymenttype");
    this.$store.dispatch("commons/getDemanddept");
  },
  methods: {
    getData(data) {
      data ? (this.form.page = 1) : "";
      this.$store.dispatch("financialManagement/getAssessrefund", this.form);
    },
    numberClick(data) {
      this.$router.push({
        name: "RebateOperationEdit",
        query: {
          rebateOperationId: data.id,
        },
      });
    },
    onSubmit() {},
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
      console.log(data);
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