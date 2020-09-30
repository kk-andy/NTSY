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
      <el-table-column label="信用卡号" align="center">
        <template slot-scope="scope">
          <el-link
            type="primary"
            :underline="false"
            @click="numberClick(scope.row)"
          >{{scope.row.creditcard}}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="due_date" label="到期日" align="center"></el-table-column>
      <el-table-column prop="security_code" label="安全码" align="center"></el-table-column>
      <el-table-column prop="card_channel" label="卡渠道" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.card_channel == 1">福卡</span>
          <span v-if="scope.row.card_channel == 2">全球通</span>
        </template>
      </el-table-column>
      <el-table-column prop="account_code" label="匹配买家号" align="center"></el-table-column>
      <el-table-column prop="status" label="卡状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1">正常</span>
          <span v-if="scope.row.status == 2">封号</span>
          <span v-if="scope.row.status == 3">其他</span>
        </template>
      </el-table-column>
      <el-table-column prop="recharge_amount" label="历史充值金额" align="center"></el-table-column>
      <el-table-column prop="consumption_amount" label="历史消费金额" align="center"></el-table-column>
      <el-table-column prop="balance" label="当前卡余额" align="center"></el-table-column>
      <el-table-column prop="currency" label="币种" align="center"></el-table-column>
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
    numberClick(data) {
      this.$emit("numberClick", data);
    },
    deleteRow(data) {
      // this.$emit("settingNum", data.id, 0);
    },
    selectionChange(data) {},
    addNum(data) {
      // this.$emit("addNum", data);
    },
  },
};
</script>