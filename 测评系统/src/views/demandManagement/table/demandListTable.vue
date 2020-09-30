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
      <el-table-column label="需求编号" align="center" width="150px">
        <template slot-scope="scope">
          <el-link
            type="primary"
            :underline="false"
            @click="numberClick(scope.row)"
            >{{ scope.row.ntcp_id }}</el-link
          >
        </template>
      </el-table-column>
      <el-table-column width="160" label="提交日期" align="center">
        <template slot-scope="scope">{{
          scope.row.create_at | changeTime
        }}</template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <span style="color: green" v-if="scope.row.status == 1">草稿</span>
          <span style="color: red" v-if="scope.row.status == 3">驳回</span>
        </template>
      </el-table-column>
      <el-table-column label="服务类型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 1">测评</span>
          <span v-if="scope.row.type == 2">代购</span>
        </template>
      </el-table-column>
      <el-table-column
        width="160"
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
        width="130"
        prop="store_name"
        label="店铺简称"
        align="center"
      ></el-table-column>
      <el-table-column
        width="100"
        prop="platform"
        label="平台"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="site"
        label="站点"
        align="center"
      ></el-table-column>
      <el-table-column label="ASIN（itemid" prop="ASIN" align="center">
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
            >{{ scope.row.keyword }}</span
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="amount"
        label="销售价格"
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
      <el-table-column fixed="right" label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="copyClick(scope.row)"
            type="text"
            v-if="showCopy"
            size="small"
            >复制</el-button
          >
          <el-button
            @click.native.prevent="submitClick(scope.row)"
            type="text"
            v-if="showSubmitCheck"
            size="small"
            >提交审核</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  filters: {
    changeTime(arg) {
      return arg.toString().substr(0, 16);
    },
  },
  props: {
    tableData: {
      type: Array,
    },
    showCopy: {
      type: Boolean,
      default: false,
    },
    showSubmitCheck: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    selectionChange(data) {
      this.$emit("selectionChange", data);
    },
    numberClick(data) {
      this.$emit("numberClick", data);
    },
    editClisk(data) {
      this.$emit("editClisk", data);
    },
    copyClick(data) {
      this.$emit("copyClick", data);
    },
    submitClick(data) {
      this.$emit("submitClick", data);
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
    onCopy() {
      this.$message.success("复制成功");
    },
  },
};
</script>