<template>
  <div class="table">
    <el-table
      ref="multipleTable"
      :data="tableData"
      height="500"
      tooltip-effect="dark"
      border
      style="width: 100%"
    >
      <el-table-column label="序号" type="index" align="center" width="50" />
      <el-table-column label="模板名称" align="center" prop="template_name" />
      <el-table-column prop="shop" align="center" label="店铺"  />
      <el-table-column prop="stock_max" align="center" label="创建人" />
      <el-table-column prop="create_at" align="center" label="创建时间" />
      <el-table-column prop="modify_user" align="center" label="修改人" />
      <el-table-column prop="update_at" align="center" label="修改时间" />
      <el-table-column align="center" width="120" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            class="btn_button_primary"
            size="mini"
            @click="edit(scope.row.template_id)"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "TableList",
  props: {
    tableData: {
      type: Array,
      required: true
    },
  },
  methods: {
    edit(val) {
      this.$emit("edit", val);
    }
  }
};
</script>