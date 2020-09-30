<template>
  <div>
    <el-table
      :data="tableData"
      style="width:100%"
      :header-cell-style="{background:'#F5F7FA',color:'#606266'}"
      :default-sort="{prop: 'date', order: 'ascending'}"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="product_sku" label="SKU" align="center" />
      <el-table-column prop="title" label="产品名称" align="center" />
      <el-table-column prop="plan_num" label="计划发货量" align="center" />

      <el-table-column prop="remark" label="备注" align="center" />
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
  methods: {
    ...mapMutations("FBAreplenishmentPlan", ["changeNewShipmentsSelVal"]), //新发货计划table批量选择
    //新发货计划table批量选择
    handleSelectionChange(val) {
      this.changeNewShipmentsSelVal(val);
    },
  },
  mounted() {},
};
</script>

<style>
</style>