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
      <el-table-column prop="ntcp_id" label="需求编号" align="center">
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
      <el-table-column prop="dept_name" label="需求人组别" align="center"></el-table-column>
      <el-table-column prop="sku" label="SKU" align="center"></el-table-column>
      <el-table-column prop="order_id" label="采购单号" align="center"></el-table-column>
      <el-table-column prop="payment_type" label="返款方式" align="center">
        <!-- <template slot-scope="scope">
          <span v-if="scope.row.payment_type==1">PayPal</span>
          <span v-if="scope.row.payment_type==2">支付宝</span>
          <span v-if="scope.row.payment_type==3">微信</span>
          <span v-if="scope.row.payment_type==4">银行卡</span>
          <span v-if="scope.row.payment_type==5">内部结转</span>
          <span v-if="scope.row.payment_type==6">后台退款</span>
        </template>-->
      </el-table-column>
      <el-table-column prop="recipient_account" label="返款账号" align="center"></el-table-column>
      <el-table-column prop="actual_amount" label="实付金额" align="center"></el-table-column>
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