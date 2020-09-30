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
      <el-table-column prop="account_code" label="账号编码" align="center">
        <template slot-scope="scope">
          <el-link
            @click="colClick(scope.row)"
            type="primary"
            :underline="false"
          >{{scope.row.account_code}}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="platform" label="平台" align="center"></el-table-column>
      <el-table-column prop="site" label="站点" align="center"></el-table-column>
      <el-table-column prop="email" label="账号邮箱" align="center"></el-table-column>
      <el-table-column prop="password" label="登录密码" align="center"></el-table-column>
      <el-table-column prop="email_password" label="邮箱密码" align="center"></el-table-column>
      <el-table-column prop="secondary_email" label="辅助邮箱" align="center"></el-table-column>
      <el-table-column label="账号状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1">正常</span>
          <span v-if="scope.row.status == 2">封号</span>
          <span v-if="scope.row.status == 3">其他</span>
        </template>
      </el-table-column>
      <el-table-column prop="ip" label="绑定IP" align="center"></el-table-column>
      <el-table-column prop="ip_server" label="IP渠道" align="center"></el-table-column>
      <el-table-column prop="creditcard" label="信用卡" align="center"></el-table-column>
      <el-table-column prop="consumption_amount" label="消费总额" align="center"></el-table-column>
      <el-table-column prop="currency" label="消费币种" align="center"></el-table-column>
      <el-table-column prop="remark" label="账号备注" align="center"></el-table-column>
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