<template>
  <div class="main">
    <div>
      <el-form ref="form" :inline="true" :model="form" label-width="100px">
        <el-col :span="6">
          <el-form-item label="项目名称">
            <el-input
              v-model="form.service_item"
              placeholder="需求编号"
              style="width: 107%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="所属平台">
            <el-select v-model="form.platform" placeholder="站点">
              <el-option
                v-for="(item, index) in platformlist"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="text-align: center">
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
            <!-- <el-button type="primary" @click="addDemand">导入</el-button> -->
            <el-button
              type="primary"
              v-if="showButtons.exportBtn"
              @click="exportClick"
              >导出</el-button
            >
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <serviceItemsTable
      :tableData="serviceitem.list"
      @selectionChange="selectionChange"
      @colClick="colClick"
    />
    <!-- <div class="change_page">
      <page-total :total="serviceitem.total" :size="form.size" :current-page="form.page" />
      <el-pagination
        :current-page="form.page"
        background
        :page-sizes="[10, 20, 30, 50]"
        :page-size="form.size"
        layout="sizes, prev, pager, next, jumper"
        :total="serviceitem.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>-->
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
import serviceItemsTable from "./table/serviceItemsTable";
import { mapState } from "vuex";
export default {
  components: { serviceItemsTable },
  computed: {
    ...mapState({
      serviceitem: (state) => state.supplementaryInformation.serviceitem,
      platformlist: (state) => state.commons.platformlist,
      showButtons: (state) => state.serviceItems.showButtons,
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
        service_item: "",
        platform: "",
        size: 50,
        page: 1,
      },
    };
  },
  created() {
    let id = this.$getMenuId(
      sessionStorage.getItem("munuIdList"),
      this.$route.path
    );
    this.$store.dispatch("serviceItems/getButtonList", { id });
  },
  mounted() {
    this.getData();
    this.$store.dispatch("commons/getPlatformlist");
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
      this.$store.dispatch("supplementaryInformation/serviceitemExport", {
        ids: this.selectList.toString(),
      });
    },
    getData(data) {
      data ? (this.form.page = 1) : "";
      this.$store.dispatch(
        "supplementaryInformation/getServiceitem",
        this.form
      );
    },
    addDemand() {
      // this.modal_fail = true;
      this.$router.push({ name: "AddService" });
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
        name: "AddService",
        query: {
          serviceEdit: val.id,
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