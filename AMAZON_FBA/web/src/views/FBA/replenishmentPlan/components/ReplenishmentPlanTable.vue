<template>
  <div>
    <el-table
      :data="tableData"
      style="width:100%"
      :header-cell-style="{background:'#F5F7FA',color:'#606266'}"
      :default-sort="{prop: 'date', order: 'ascending'}"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
    >
      >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column width="100" prop="virtual_warehouse" label="虚拟仓" align="center" />
      <el-table-column width="180" prop="shop_name" label="店铺" align="center" />
      <el-table-column width="180" prop="plan_code" label="补货计划" align="center" />
      <el-table-column
        sortable="custom"
        width="180"
        prop="plan_amount"
        label="计划金额"
        align="center"
      />
      <el-table-column width="180" prop="arrival_status" label="到货情况" align="center" />
      <el-table-column prop="created_time" sortable="custom" label="创建时间" align="center" />
      <el-table-column width="150" prop="money" label="操作" align="center">
        <template slot-scope="scope">
          <el-link
            :disabled="scope.row.arrival_status == '未到货'?true:false "
            :underline="false"
            type="primary"
            @click="NewShipmentsPlan(scope)"
          >生成发货计划</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  props: {
    tableData: {
      type: Array,
    },
  },
  computed: {},
  methods: {
    //change table批量选择
    ...mapMutations("FBAreplenishmentPlan", ["changeReplenishmentSelVal"]),
    //table checkbox选中状态
    handleSelectionChange(arg) {
      let data = [];
      arg.forEach((item) => {
        data.push(item.plan_id);
      });
      data = data.join(",");
      this.changeReplenishmentSelVal(data);
    },
    //生成发货计划
    NewShipmentsPlan(arg) {
      this.$router.push({
        name: "NewShipmentsPlan",
        query: { plan_id: arg.row.plan_id },
      });
    },
    //排序
    sortChange(arg) {
      let sort_by = arg.prop;
      let sort_rule = "";
      if (arg.order == "descending") {
        sort_rule = "desc";
      } else if (arg.order == "ascending") {
        sort_rule = "asc";
      } else {
        sort_rule = "";
      }
      this.$emit("sortable", { sort_by: sort_by, sort_rule: sort_rule });
    },
  },
  mounted() {
    // reqGetReplenishmentPlan({
    //   page_num: 1,
    //   page_size: 10,
    // }).then((data) => console.log(data));
  },
};
</script>

<style lang="scss" scoped>
.shipmentsBtn {
  outline: none;
  border: 0;
  background: white;
}
</style>