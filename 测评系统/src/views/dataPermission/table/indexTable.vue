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
      <el-table-column prop="staff_name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="department" label="部门" align="center"></el-table-column>
      <el-table-column prop="role_name" label="角色" align="center"></el-table-column>
      <el-table-column prop="dept_name" label="数据权限" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" width="170" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="showEdit"
            @click.native.prevent="editClick(scope.row)"
            type="text"
            size="small"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
    },
    showEdit: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    selectionChange(data) {
      this.$emit("selectionChange", data);
    },
    editClick(data) {
      this.$emit("editClick", data);
    },
  },
};
</script>