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
      <el-table-column label="项目名称" align="center">
        <template slot-scope="scope">
          <el-link
            @click="colClick(scope.row)"
            type="primary"
            :underline="false"
          >{{scope.row.item_name}}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="platform" label="所属平台" align="center"></el-table-column>
      <el-table-column label="单价" align="center">
        <template slot-scope="scope">{{scope.row.unit_price | moveDecimals}}</template>
      </el-table-column>
      <el-table-column prop="currency" label="币种" align="center"></el-table-column>
      <el-table-column label="美洲操作时效" align="center">
        <template slot-scope="scope">{{scope.row.America_operation_cycle | moveDecimals}}</template>
      </el-table-column>
      <el-table-column label="欧洲操作时效" align="center">
        <template slot-scope="scope">{{scope.row.Europe_operation_cycle | moveDecimals}}</template>
      </el-table-column>
      <el-table-column label="日本操作时效" align="center">
        <template slot-scope="scope">{{scope.row.Europe_operation_cycle | moveDecimals}}</template>
      </el-table-column>
      <el-table-column prop="quality_explain" label="质保说明" align="center"></el-table-column>
      <el-table-column label="平台费承担方" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.platform_cost == 1">运营</span>
          <span v-if="scope.row.platform_cost == 2">测评</span>
        </template>
      </el-table-column>
      <el-table-column prop="explain" label="操作时效和要求说明" align="center" width="150px"></el-table-column>
      <el-table-column prop="cost_explain" label="费用承担说明" align="center"></el-table-column>
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
    colClick(val) {
      this.$emit("colClick", val);
    },
  },
};
</script>