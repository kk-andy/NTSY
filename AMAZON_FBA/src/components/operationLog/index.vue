<template>
  <el-table
    :data="tableData"
    max-height="250"
    border
    style="width: 100%"
  >
    <el-table-column
      prop="type"
      align="center"
      label="操作事项"
    />
    <el-table-column
      prop="staff_name"
      align="center"
      label="操作人"
    />
    <el-table-column
      prop="created_at"
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
