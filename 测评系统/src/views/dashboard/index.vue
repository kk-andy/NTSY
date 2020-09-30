<template>
  <div>
    <el-table
      :data="dashboard"
      style="width: 100%"
      :header-cell-style="{ background: '#0070C0', color: 'white' }"
      :cell-style="cellStyle"
      :height="tableHeight"
      ref="topictable"
    >
      <el-table-column
        prop="item_name"
        label="项目"
        align="center"
      ></el-table-column>
      <el-table-column label="单价" align="center">
        <template slot-scope="scope"
          >{{ scope.row.currency | currency
          }}{{ scope.row.unit_price | moveDecimals }}</template
        >
      </el-table-column>
      <el-table-column
        prop="platform"
        label="平台"
        align="center"
      ></el-table-column>
      <el-table-column label="操作时效(天)" align="center">
        <el-table-column label="美洲" align="center">
          <template slot-scope="scope">{{
            scope.row.America_operation_cycle | moveDecimals
          }}</template>
        </el-table-column>
        <el-table-column label="欧洲" align="center">
          <template slot-scope="scope">{{
            scope.row.Europe_operation_cycle | moveDecimals
          }}</template>
        </el-table-column>
        <el-table-column label="日本" align="center">
          <template slot-scope="scope">{{
            scope.row.Europe_operation_cycle | moveDecimals
          }}</template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="quality_explain"
        label="质保"
        align="center"
        width="200px"
      ></el-table-column>
      <el-table-column label="平台费" align="center">
        <el-table-column label="运营" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.platform_cost == 1" class="el-icon-success"></i>
          </template>
        </el-table-column>
        <el-table-column label="测评" align="center">
          <template slot-scope="scope">
            <i v-if="scope.row.platform_cost == 2" class="el-icon-success"></i>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="explain"
        label="操作时效和要求说明"
        width="450px"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="cost_explain"
        label="费用承担说明"
        width="300px"
        align="center"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import dataList from "@/components/dataList/dataList";
import { mapState } from "vuex";
export default {
  components: { dataList },
  computed: {
    ...mapState({
      dashboard: (state) => state.supplementaryInformation.dashboard,
    }),
  },
  data() {
    return {
      tableHeight: window.innerHeight - 150,
    };
  },
  mounted() {
    this.$store.dispatch("supplementaryInformation/getdashboard");
    let _this = this;
    window.onresize = function () {
      _this.tableHeight = window.innerHeight - 150;
    };
  },
  filters: {
    currency(arg) {
      switch (arg) {
        case "CNY":
          return "¥";
        case "USD":
          return "$";
        case "GBP":
          return "￡";
        case "JPY":
          return "￥";
        case "EUR":
          return "€";
      }
    },
  },
  methods: {
    cellStyle(row, column, rowIndex, columnIndex) {
      if (
        row.columnIndex == 1 ||
        row.columnIndex == 7 ||
        row.columnIndex == 8
      ) {
        return "color:red";
      } else if (row.columnIndex == 6 || row.columnIndex == 9) {
        return "color:#00B0F0";
      }
    },
  },
  // mounted() {
  //   console.log(process.env.VUE_APP_ISTEST == "istest");
  // },
};
</script>

<style lang="scss" scoped>
.main {
  color: white;
  font-size: 32px;
}
</style>

