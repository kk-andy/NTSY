<template>
  <div>
    <el-table
      :data="tableData"
      :header-cell-style="{background:'#F5F7FA',color:'#606266'}"
      :default-sort="{prop: 'date', order: 'ascending'}"
      :style="{width:isPrint?'1175px':'100%'}"
    >
      <!-- @selection-change="handleSelectionChange" -->
      >
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column width="120" prop="address" label="图片" align="center">
        <template slot-scope="scope">
          <div style="width:120px;height:50px;">
            <img style="width:100px;height:50px" :src="scope.row.main_image" alt />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="site" label="MSKU/FNSKU" align="center">
        <template slot-scope="scope">{{scope.row.m_sku}}/{{scope.row.fn_sku}}</template>
      </el-table-column>

      <el-table-column prop="plan" label="品名/SKU" align="center">
        <template slot-scope="scope">{{scope.row.title}}/{{scope.row.product_sku}}</template>
      </el-table-column>
      <el-table-column width="120" prop="available_num" label="可用量" align="center" />
      <el-table-column width="150" prop="plan_num" label="计划发货量" align="center" />
      <el-table-column width="120" prop="attr" label="商品属性" align="center" />
      <el-table-column width="150" prop="" label="是否可退税" align="center">
        <template slot-scope="{ row }">
          {{ row.can_tax_refund ? '是' : '否' }}
        </template>
      </el-table-column>
      <!-- 
      <el-table-column width="120" prop="quantity_per_box" label="单箱数量" align="center" />

      <el-table-column width="120" prop="boxes_num" label="箱数" align="center" />-->

      <el-table-column prop="remark" label="备注" align="center" />
    </el-table>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  props: {
    tableData: {
      type: Array,
    },
    isPrint: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    //table checkbox选中状态
    handleSelectionChange(arg) {
      // console.log(arg);
    },
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