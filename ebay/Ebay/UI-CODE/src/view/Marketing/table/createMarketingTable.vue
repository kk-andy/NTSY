<template>
  <el-table :data="tableData" style="width: 60%;" border max-height="500">
    <el-table-column label="图片" width="180" align="center">
      <template slot-scope="scope">
        <img :src="scope.row.thumbnail" alt />
      </template>
    </el-table-column>
    <el-table-column prop="title" label="标题" align="center"></el-table-column>
    <el-table-column prop="sku" label="SKU" align="center"></el-table-column>
    <el-table-column prop="min_price" label="价格" align="center"></el-table-column>
    <el-table-column fixed="right" label="操作" align="center">
      <template slot-scope="scope">
        <el-button @click="delectClick(scope.row)" type="text" size="small">移除</el-button>
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
  methods: {
    delectClick(item) {
      this.$emit("delectClick", item);
    },
  },
};
</script>
<style scoped>
img {
  width: 60px;
}
</style>