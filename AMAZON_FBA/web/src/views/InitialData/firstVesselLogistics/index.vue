<template>
  <div style="padding: 30px; overflow: hidden">
    <div>
      <el-form :inline="true" :model="searchValue">
        <el-form-item label="运输方式">
          <el-select placeholder="请选择运输方式" filterable>
            <el-option />
          </el-select>
        </el-form-item>
        <el-form-item label="物流商">
          <el-select placeholder="请选择物流商" filterable>
            <el-option />
          </el-select>
        </el-form-item>
        <el-form-item label="单号">
          <el-input placeholder="请输入单号" v-model="searchValue.bill" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getData('data')">搜索</el-button>
          <el-button plain>新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <MainTable />
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
import MainTable from "@/views/InitialData/firstVesselLogistics/components/MainTable";
import Page from "@/components/page";
export default {
  data() {
    return {
      searchValue: {
        shipmentsTime: "",
        bill: "",
        page_num: 1,
        page_size: 10,
      },
    };
  },
  computed: {
    ...mapState({
      total: (state) => state.StatementDiff.total,
    }),
  },
  methods: {
    ...mapActions("StatementDiff", [
      "getSignDiffList", //获取列表
    ]),

    getData(arg) {
      arg ? (this.searchValue.page_num = 1) : "";
      this.getSignDiffList(this.searchValue);
    },
    //改变时间
    timeSet(val) {
      this.searchValue.shipmentsTime = dateFormat(val).split(" ")[0];
    },

    //分页
    handleSizeChange(arg) {
      this.searchValue.page_size = arg;
      this.getShipmentsPlan();
    },
    handleCurrentChange(arg) {
      this.searchValue.page_num = arg;
      this.getShipmentsPlan();
    },
  },
  components: {
    MainTable,
    Page,
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
}
</style>