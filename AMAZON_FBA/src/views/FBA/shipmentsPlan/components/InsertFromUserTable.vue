<template>
  <div>
    <el-table
      :data="tableData"
      style="width:100%"
      :header-cell-style="{background:'#F5F7FA',color:'#606266'}"
      @selection-change="handleSelectionChange"
    >
      >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column width="120" label="图片" align="center">
        <template slot-scope="scope">
          <div style="width:120px;height:50px;">
            <img style="width:100px;height:50px" :src="scope.row.main_image" alt />
          </div>
        </template>
      </el-table-column>
      <el-table-column width="180" label="MSKU/FNSKU" align="center">
        <template slot-scope="scope">{{scope.row.m_sku}}/{{scope.row.fn_sku}}</template>
      </el-table-column>
      <el-table-column width="180" prop="asin" label="ASIN" align="center" />
      <el-table-column prop="title_en" label="英文名称" align="center" />
      <el-table-column label="品名/SKU" align="center">
        <template slot-scope="scope">{{scope.row.title}}/{{scope.row.product_sku}}</template>
      </el-table-column>
      <el-table-column width="180" prop="available_num" label="可用量" align="center" />

      <!-- <el-table-column fixed="right" width="100" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>-->
    </el-table>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  props: {
    tableData: {
      type: Array,
    },
  },
  computed: {},
  methods: {
    //添加商品
    ...mapMutations("FBAshipmentsPlan", [
      "insertToShipmentsDetailTable", //添加商品
      "changeInsertFromUserValue", //改变选中项
    ]),
    //table checkbox选中状态
    handleSelectionChange(arg) {
      this.changeInsertFromUserValue(arg);
    },
    //删除
    remove() {},
  },
  mounted() {
    this.changeInsertFromUserValue([]);
  },
};
</script>

<style lang="scss" scoped>
.shipmentsBtn {
  outline: none;
  border: 0;
  background: white;
  color: #1890ff;
}
</style>