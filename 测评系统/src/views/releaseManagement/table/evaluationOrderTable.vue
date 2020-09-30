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
            >{{ scope.row.ntcp_id }}</el-link
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="create_at"
        label="提交日期"
        align="center"
      ></el-table-column>
      <el-table-column label="服务类型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 1">测评</span>
          <span v-if="scope.row.type == 2">代购</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="server_name"
        label="服务项目"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="staff_name"
        label="需求人"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="follower"
        label="评测人"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="platform"
        label="平台"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="site"
        label="站点"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="ASIN"
        label="ASIN（itemid）"
        align="center"
        width="150px"
      >
        <template slot-scope="scope">
          <el-link type="primary" @click="toAsinDetail(scope.row)">{{
            scope.row.ASIN
          }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="keyword" label="关键词" align="center">
        <template slot-scope="scope">
          <span
            style="cursor: pointer"
            v-clipboard:success="onCopy"
            v-clipboard:copy="scope.row.keyword"
          >
            {{ scope.row.keyword }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="amount"
        label="下单价格"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="currency"
        label="币种"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="remark"
        label="订单备注"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="buyer_account"
        label="买家账号"
        align="center"
      ></el-table-column>
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
    selectionChange(data) {
      this.$emit("selectionChange", data);
    },
    addNum(data) {
      // this.$emit("addNum", data);
    },
    onCopy() {
      this.$message.success("复制成功");
    },
    toAsinDetail(arg) {
      if (arg.platform.toLowerCase() == "amazon") {
        let data = "";
        switch (arg.site) {
          case "US":
            data = "https://www.amazon.com/dp/" + arg.ASIN;
            break;
          case "CA":
            data = "https://www.amazon.ca/dp/" + arg.ASIN;
            break;
          case "UK":
            data = "https://www.amazon.co.uk/dp/" + arg.ASIN;
            break;
          case "DE":
            data = "https://www.amazon.de/dp/" + arg.ASIN;
            break;
          case "FR":
            data = "https://www.amazon.fr/dp/" + arg.ASIN;
            break;
          case "IT":
            data = "https://www.amazon.it/dp/" + arg.ASIN;
            break;
          case "ES":
            data = "https://www.amazon.es/dp/" + arg.ASIN;
            break;
          case "JP":
            data = "https://www.amazon.co.jp/dp/" + arg.ASIN;
            break;
        }
        let tempwindow = window.open("_blank");
        tempwindow.location = data;
      }
    },
  },
};
</script>