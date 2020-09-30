<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%"
    :header-cell-style="{background:'white',color:'black'}"
  >
    <el-table-column prop="product_sku" label="SKU" width="180"></el-table-column>
    <el-table-column prop="title" label="产品中文名称" width="180"></el-table-column>
    <el-table-column prop="attr" label="商品属性"></el-table-column>
    <el-table-column label="是否报关退税">
      <template slot-scope="scope">
        <el-select v-model="scope.row.is_customs_tax_refund">
          <el-option
            v-for="(item,key) in refund"
            :key="key"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column prop="asin" label="ASIN"></el-table-column>
    <el-table-column prop="fn_sku" label="FNSKU"></el-table-column>
    <el-table-column prop="estimated_daily_sales" label="预计日销量">
      <template slot-scope="scope">
        <el-input v-model="scope.row.estimated_daily_sales" />
      </template>
    </el-table-column>
    <el-table-column prop="verdor_name" label="verdorname"></el-table-column>
    <el-table-column prop="plan_num" label="数量"></el-table-column>
    <el-table-column prop="declared_value" label="单间申报价值"></el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      refund: [
        {
          label: "是",
          value: 1,
        },
        {
          label: "否",
          value: 0,
        },
      ],
    };
  },
  props: ["tableData"],
  mounted() {},
};
</script>

<style>
</style>