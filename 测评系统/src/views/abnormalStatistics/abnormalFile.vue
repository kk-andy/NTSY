<template>
  <div class="main">
    <div>
      <el-form ref="form" :inline="true" :model="form" label-width="100px">
        <el-col :span="5">
          <el-form-item label="需求编号">
            <el-input v-model="form.ntcp_id" placeholder="需求编号" style="width: 107%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
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
        <el-col :span="5">
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
        <el-col :span="7">
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
        <el-col :span="5">
          <el-form-item label="商品名称">
            <el-input v-model="form.product_name" placeholder="需求编号" style="width: 107%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="返款方式">
            <el-select v-model="form.payment_type" placeholder="请选择">
              <el-option
                v-for="item in paymenttype"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="订单号">
            <el-input v-model="form.order_id" placeholder="历史充值金额" style="width: 107%;"></el-input>
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
      </el-form>
    </div>
    <div style="text-align: right;padding: 0 5.5% 20px 0;">
      <el-button
        type="primary"
        v-if="showButtons.search"
        icon="el-icon-search"
        @click="getData(true)"
      >搜索</el-button>
      <el-button type="primary" v-if="showButtons.exportBtn" @click="exportClick">导出记录</el-button>
    </div>
    <abnormalFileTable
      :tableData="assessabnormal.list"
      :showRecover="showButtons.recover"
      @colClick="colClick"
      @deleteRow="deleteRow"
      @selectionChange="selectionChange"
    />
    <div class="change_page">
      <page-total :total="assessabnormal.total" :size="form.size" :current-page="form.page" />
      <el-pagination
        :current-page="form.page"
        background
        :page-sizes="[10, 20, 30, 50]"
        :page-size="form.size"
        layout="sizes, prev, pager, next, jumper"
        :total="assessabnormal.total"
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
import abnormalFileTable from "./table/abnormalFileTable";
import { mapState } from "vuex";
export default {
  components: { abnormalFileTable },
  computed: {
    ...mapState({
      assessabnormal: (state) => state.abnormalStatistics.assessabnormal,
      servicetype: (state) => state.commons.servicetype,
      serviceitem: (state) => state.commons.serviceitem,
      paymenttype: (state) => state.commons.paymenttype,
      demanddept: (state) => state.commons.demanddept,
      showButtons: (state) => state.abnormalStatistics.showButtons,
    }),
  },
  data() {
    return {
      radio: "",
      modal_fail: false,
      selectList: [],
      form: {
        ntcp_id: "",
        type: "",
        server_id: "",
        product_name: "",
        dept_id: "",
        payment_type: "",
        create_at: "",
        order_id: "",
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
    this.$store.dispatch("abnormalStatistics/getButtonList", { id });
  },
  mounted() {
    this.getData();
    this.$store.dispatch("commons/getServiceitem");
    this.$store.dispatch("commons/getPaymenttype");
    this.$store.dispatch("commons/getDemanddept");
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
      this.$store.dispatch("abnormalStatistics/exportRecord", {
        ids: this.selectList.toString(),
      });
    },
    getData(data) {
      data ? (this.form.page = 1) : "";
      this.$store.dispatch("abnormalStatistics/getAssessabnormal", this.form);
    },
    deleteRow(row) {
      this.$confirm("此操作将恢复原环节, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let data = {
            id: row.id,
            query: this.form,
          };
          this.$store.dispatch("abnormalStatistics/restore", data);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    onSubmit() {},
    getList() {
      this.query = {};
      // this.$store.dispatch('abnormalFile/getList', this.query)
    },
    search() {
      this.getList();
      this.page.currentPage = 1;
    },
    addDemand() {
      // this.modal_fail = true;
      // this.$router.push({name:'Addbuyer'})
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
        name: "Refundaudit",
        query: {
          abnormalEdit: val.id,
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
  },
};
</script>