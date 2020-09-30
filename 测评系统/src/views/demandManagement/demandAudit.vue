<template>
  <div class="main">
    <div>
      <el-form ref="form" :inline="true" :model="form" label-width="100px">
        <el-col :span="6">
          <el-form-item label="需求编号">
            <el-input v-model="form.ntcp_id" placeholder="需求编号" style="width: 107%;" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="服务类型">
            <el-select v-model="form.type" placeholder="服务类型" clearable>
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
            <el-select v-model="form.server_id" placeholder="服务项目" clearable>
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
            <el-select v-model="form.staff_id" placeholder="平台" clearable>
              <el-option v-for="item in platformlist" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="站点">
            <el-select v-model="form.site" placeholder="站点" clearable>
              <el-option v-for="(item,index) in sitelist" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
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
        <el-col :span="6" style="text-align: center;">
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              v-if="showButtons.search"
              @click="getData(true)"
            >搜索</el-button>
            <!-- <el-button type="primary" @click="releaseClick">批量发布</el-button> -->
            <el-button type="primary" v-if="showButtons.batchRejected" @click="overrule">批量驳回</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <demandAuditTable
      :tableData="assessreleaseList.list"
      @selectionChange="selectionChange"
      @numberClick="numberClick"
    />
    <div class="change_page">
      <page-total :total="assessreleaseList.total" :size="form.size" :current-page="form.page" />
      <el-pagination
        :current-page="form.page"
        background
        :page-sizes="[10, 20, 30, 50]"
        :page-size="form.size"
        layout="sizes, prev, pager, next, jumper"
        :total="assessreleaseList.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import demandAuditTable from "./table/demandAuditTable";
import { mapState } from "vuex";
export default {
  components: { demandAuditTable },
  computed: {
    ...mapState({
      assessreleaseList: (state) => state.demandManagement.assessreleaseList,
      servicetype: (state) => state.commons.servicetype,
      serviceitem: (state) => state.commons.serviceitem,
      platformlist: (state) => state.commons.platformlist,
      sitelist: (state) => state.commons.sitelist,
      followerlist: (state) => state.commons.followerlist,
      showButtons: (state) => state.demandAudit.showButtons,
    }),
    key() {
      return this.$route.path;
    },
  },
  data() {
    return {
      selectList: [],
      demander: "",
      modal_fail: false,
      form: {
        ntcp_id: "",
        server_id: "",
        type: "",
        staff_id: "",
        create_at: "",
        site: "",
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
    this.$store.dispatch("demandAudit/getButtonList", { id });
  },
  mounted() {
    this.getData();
    this.$store.dispatch("commons/getServiceitem");
    this.$store.dispatch("commons/getPlatformlist");
    this.$store.dispatch("commons/getSitelist");
    this.$store.dispatch("commons/getFollowerlist");
  },
  methods: {
    releaseClick() {},
    overrule() {
      let that = this;
      if (that.selectList.length == 0) {
        this.$message({
          message: "请选择要驳回的需求",
          type: "warning",
        });
        return;
      }
      let query = { id: that.selectList.toString() };
      let item = that.form;
      this.$store.dispatch("demandManagement/assessreleaseReject", {
        query,
        item,
      });
    },
    getData(data) {
      data ? (this.form.page = 1) : "";
      this.$store.dispatch("demandManagement/getAssessrelease", this.form);
    },
    numberClick(data) {
      this.$router.push({ name: "AuditDetail", query: { id: data.id } });
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
    // overrule() {
    //   let query = this.selectList;
    //   let item = this.form;
    //   this.$store.dispatch("demandManagement/purchaserCopy", { query, item });
    // },
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