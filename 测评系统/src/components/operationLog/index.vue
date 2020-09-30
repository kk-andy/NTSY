<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%"
  >
    <el-table-column
      prop="index"
      align="center"
      label="编号"
    />
    <el-table-column
      prop="create_name"
      align="center"
      label="操作人"
    />
    <el-table-column
      prop="action"
      align="center"
      label="动作"
    />
    <el-table-column
      prop="page"
      align="center"
      label="模块"
    />
    <el-table-column
      prop="create_at"
      align="center"
      label="操作时间"
    />
  </el-table>
</template>
<script>
export default {
    name: 'OperationLog',
    props: {
        tableData: {
            type: Array,
            default: []
        }
    }
}
</script>
