<template>
  <div class="table">
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      max-height="600"
      @selection-change="selectionChange"
    >
      <el-table-column type="selection" align="center" />
      <el-table-column label="需求编号" align="center">
        <template slot-scope="scope">
          <el-link
            type="primary"
            :underline="false"
            @click="numberClick(scope.row)"
          >{{scope.row.ntcp_id}}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="create_at" label="提交日期" align="center"></el-table-column>
      <el-table-column label="服务类型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.type==1">测评</span>
          <span v-if="scope.row.type==2">代购</span>
        </template>
      </el-table-column>
      <el-table-column prop="server_name" label="服务项目" align="center"></el-table-column>
      <el-table-column prop="staff_name" label="需求人" align="center"></el-table-column>
      <el-table-column prop="platform" label="平台" align="center"></el-table-column>
      <el-table-column prop="site" label="站点" align="center"></el-table-column>
      <el-table-column prop="ASIN" label="ASIN（itemid）" align="center"></el-table-column>
      <!-- <el-table-column prop="month_left_budget" label="买家姓名" align="center"></el-table-column> -->
      <el-table-column prop="keyword" label="关键词" align="center"></el-table-column>
      <el-table-column prop="remark" label="订单备注" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
    },
  },
  methods: {
    selectionChange(data) {
      this.$emit("selectionChange", data);
    },
    numberClick(data) {
      this.$emit("numberClick", data);
    },
  },
};
</script>