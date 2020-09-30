<template>
  <div style="padding: 30px; overflow: hidden">
    <div>
      <el-form :inline="true" :model="searchValue">
        <el-form-item label="发货时间">
          <el-date-picker
            v-model="searchValue.shipping_time"
            @change="timeSet"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="货件单号">
          <el-input
            placeholder="请输入单号"
            v-model="searchValue.inbound_code"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getData('data')">搜索</el-button>
          <el-button plain @click="exportData">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <MainTable :tableData="tableData" />
    </div>
    <div class="pagination">
      <page
        :page="{
          currentPage: searchValue.page_num,
          page_size: searchValue.page_size,
        }"
        :total="total"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      />
    </div>
    <!-- <div style="display: flex; justify-content: flex-end"></div> -->
  </div>
</template>

<script>
import { loading, loadingClose, dateFormat } from "@/utils/common";
import { mapState, mapMutations, mapActions } from "vuex";
import MainTable from "@/views/Statement/signDiffStatement/components/MainTable";
import Page from "@/components/page";
export default {
  data() {
    return {
      searchValue: {
        shipping_time: "",
        inbound_code: "",
        page_num: 1,
        page_size: 10,
      },
    };
  },
  computed: {
    ...mapState({
      tableData: (state) => state.StatementDiff.tableData,
      total: (state) => state.StatementDiff.tableTotal,
    }),
  },
  methods: {
    ...mapActions("StatementDiff", [
      "getSignDiffList", //获取列表
      "getExportData", //导出
    ]),

    getData(arg) {
      console.log(this.total);
      arg ? (this.searchValue.page_num = 1) : "";
      this.getSignDiffList(this.searchValue);
    },
    //改变时间
    timeSet(val) {
      this.searchValue.shipping_time = dateFormat(val).split(" ")[0];
    },
    //导出
    exportData() {
      this.getExportData();
    },
    //分页
    handleSizeChange(arg) {
      this.searchValue.page_size = arg;
      this.getData();
    },
    handleCurrentChange(arg) {
      this.searchValue.page_num = arg;
      this.getData();
    },
  },
  components: {
    MainTable,
    Page,
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
}
</style>