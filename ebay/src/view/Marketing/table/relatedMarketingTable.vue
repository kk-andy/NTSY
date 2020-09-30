<template>
  <el-table :data="tableData" style="width: 100%;margin:20px 0" border max-height="600">
    <el-table-column prop="level" label="优先级" width="180" align="center"></el-table-column>
    <el-table-column prop="market_rule_name" label="规则名称" width="180" align="center"></el-table-column>
    <el-table-column label="显示数量" width="180" align="center">
      <template slot-scope="scope">
        <p v-if="scope.row.above">{{scope.row.above.row}}行{{scope.row.above.col}}列 【上方】</p>
        <p v-if="scope.row.below">{{scope.row.below.row}}行{{scope.row.below.col}}列 【下方】</p>
      </template>
    </el-table-column>
    <el-table-column label="关联产品数量" align="center">
      <template slot-scope="scope">
        <a @click="relatedProduct(scope.row)">{{scope.row.count}}</a>
      </template>
    </el-table-column>
    <el-table-column prop="shop_name" label="店铺账号" width="180" align="center"></el-table-column>
    <el-table-column prop="created_at" label="创建时间" width="180" align="center"></el-table-column>
    <el-table-column fixed="right" label="操作" width="100" align="center">
      <template slot-scope="scope">
        <el-button @click="editClick(scope.row)" type="text" size="small" v-if="btnClass.editClick">编辑</el-button>
        <el-button @click="delectClick(scope.row)" type="text" size="small" v-if="btnClass.delectClick">删除</el-button>
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
    btnClass: {
      type: Object,
      default: {}
    }
  },
  methods: {
    relatedProduct(item) {
      this.$emit("relatedProduct", item);
    },
    editClick(item) {
      this.$emit("editClick", item);
    },
    delectClick(item) {
      this.$confirm("删除后不可恢复, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$emit("delectClick", item);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      
    },
  },
};
</script>
<style scoped>
</style>