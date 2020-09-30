<template>
  <div class="log-popup">
    <el-dialog
      :title="recordCurrent.titleLog"
      :visible.sync="showModule"
      @close="handleClose(false)"
      width="40%"
      :close-on-click-modal="false"
    >
      <el-table :data="recordCurrent.gridData">
        <el-table-column property="type" label="操作事项" width="150"></el-table-column>
        <el-table-column property="staff_name" label="操作人" width="200"></el-table-column>
        <el-table-column property="created_at" label="操作时间"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="handleClose(false)">取 消</el-button> -->
        <el-button type="primary" @click="handleClose(true)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "LogPopup",
  props: {
    showLogPopup: {
      type: Boolean,
      default: false
    },
    recordCurrent: {
      type: Object
    }
  },
  data() {
    return {
      showModule: this.showLogPopup,
      gridData: []
    };
  },
  created() {},
  methods: {
    handleClose(val) {
      this.$emit("on-open-sesion", false);
    }
  }
};
</script>


<style scoped>
</style>