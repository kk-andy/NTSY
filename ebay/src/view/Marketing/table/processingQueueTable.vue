<template>
  <el-table :data="tableData" style="width: 100%;margin:20px 0" border max-height="650">
    <el-table-column prop="rule_name" label="规则名称" width="180" align="center"></el-table-column>
    <el-table-column label="item ID" width="180" align="center">
      <template slot-scope="scope">
        <el-link type="primary" :underline="false" :href="scope.row.link">{{scope.row.item_id}}</el-link>
      </template>
    </el-table-column>
    <el-table-column prop="error_msg" label="失败原因" align="center"></el-table-column>
    <el-table-column prop="updated_at" label="时间" width="180" align="center"></el-table-column>
    <el-table-column prop="data_type" label="状态" width="180" align="center">
      <template slot-scope="scope">
        <span v-if="scope.row.data_type==0">处理中</span>
        <span v-else-if="scope.row.data_type==1">处理成功</span>
        <span v-else-if="scope.row.data_type==2">处理失败</span>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Array,
    },
  },
  methods: {},
};
</script>
<style scoped>
</style>