<template>
  <el-table
    :data="tableData"
    style="width: 100%;margin:20px 0"
    border
    max-height="600"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" align="center"></el-table-column>
    <el-table-column label="图片" width="180" align="center">
      <template slot-scope="scope">
        <img :src="scope.row.thumbnail" />
      </template>
    </el-table-column>
    <el-table-column prop="title" label="标题" align="center">
      <template slot-scope="scope">
        <h4>{{scope.row.title}}</h4>
        <el-link :href="scope.row.link" :underline="false" type="primary">{{scope.row.item_id}}</el-link>
        <h4>【{{scope.row.shop_name}}】 【{{scope.row.site}}】</h4>
      </template>
    </el-table-column>
    <el-table-column prop="sku" label="SKU" width="180" align="center"></el-table-column>
    <el-table-column prop="min_price" label="产品价格" width="180" align="center"></el-table-column>
    <el-table-column prop="name" label="时间" width="180" align="center">
      <template slot-scope="scope">
        <h4>创建</h4>
        {{scope.row.created_at}}
        <h4>更新</h4>
        {{scope.row.updated_at}}
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="100" align="center">
      <template slot-scope="scope">
        <el-button
          v-if="scope.row.status==0"
          @click="addClick(scope.row)"
          type="text"
          size="small"
        >添加</el-button>
        <el-button v-else @click="delectClick(scope.row)" type="text" size="small">移除</el-button>
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
    handleSelectionChange(item) {
      this.$emit("handleSelectionChange", item);
    },
    addClick(item) {
      this.$emit("addClick", item);
    },
    delectClick(item) {
      this.$emit("delectClick", item);
    },
  },
};
</script>
<style scoped>
img {
  width: 85px;
}
</style>