<template>
  <div class="table">
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      height="550"
      border
      style="width: 100%"
    >
      <el-table-column label="序号" type="index" align="center" width="50" />
      <el-table-column label="用户名" align="center" prop="staff_name" />
      <el-table-column prop="shop_id" align="center" label="店铺"  />
      <el-table-column prop="edit_user" align="center" label="修改人" />
      <el-table-column prop="updated_at" align="center" label="修改时间" />
      <el-table-column align="center" width="120" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            class="btn_button_primary"
            size="mini"
            @click="edit(scope.row.staff_id)"
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