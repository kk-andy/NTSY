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
      <!-- <el-table-column prop="account_code" label="卡编号" align="center">
        <template slot-scope="scope">
          <el-link
            @click="colClick(scope.row)"
            type="primary"
            :underline="false"
          >{{scope.row.account_code}}</el-link>
        </template>
      </el-table-column>-->
      <el-table-column prop="creditcard" label="信用卡号" align="center">
        <template slot-scope="scope">
          <el-link
            @click="colClick(scope.row)"
            type="primary"
            :underline="false"
          >{{scope.row.creditcard}}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="到期日" align="center">
        <template slot-scope="scope">{{scope.row.due_date | changeDueDate}}</template>
      </el-table-column>
      <el-table-column prop="security_code" label="安全码" align="center"></el-table-column>
      <el-table-column label="卡渠道" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.card_channel == 1">福卡</span>
          <span v-if="scope.row.card_channel == 2">全球通</span>
        </template>
      </el-table-column>
      <el-table-column prop="account_code" label="匹配买家号" align="center"></el-table-column>
      <el-table-column label="卡状态" align="center">
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
  filters: {
    changeDueDate(arg) {
      let data1 = arg.substring(2, 4);
      let data2 = arg.substring(5, 7);
      return data2 + "/" + data1;
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