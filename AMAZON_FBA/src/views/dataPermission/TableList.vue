<template>
  <div style="width:100%">
    <el-table
      :data="tableData"
      :height="height"
      :border="border"
      style="width: 100%"
      :header-cell-style="{background:'#F5F7FA',color:'#606266'}"
    >
      <!-- checkBox -->
      <template v-if="operate && operate.checkBox">
        <el-table-column type="selection" width="55"></el-table-column>
      </template>
      <!-- 主表格 -->
      <template>
        <el-table-column
          v-for="(item,key) in header"
          :key="key"
          :prop="item.prop"
          :label="item.label"
          :align="item.align || 'left'"
          :width="item.width?item.width:''"
        />
      </template>
      <!-- 操作按钮 -->
      <template v-if="operate && operate.func">
        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button plain @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    //主数据
    tableData: {
      type: Object,
    },
    //初高度
    height: {
      type: Number,
    },
    //竖向边框
    border: {
      type: Boolean,
      default: false,
    },
    //表头配置
    header: {
      type: Array,
    },
    //各操作
    operate: {
      type: Object,
    },
  },
  mounted() {
    // console.log(this.$props);
  },
};
</script>

<style>
</style>