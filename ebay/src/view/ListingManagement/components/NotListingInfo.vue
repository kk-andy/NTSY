<template>
  <div class="not-Listing-info">
    <el-dialog
      :title="recordCurrent.title"
      :visible.sync="showModule"
      @close="handleClose(false)"
      width="40%"
      :close-on-click-modal="false"
    >
      <el-table :data="gridData">
        <el-table-column property="field_cn" label="字段名" width="150"></el-table-column>
        <el-table-column property="before" label="变更前" width="200"></el-table-column>
        <el-table-column property="after" label="变更后"></el-table-column>
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
  name: "NotListingInfo",
  props: {
    showNotInfoPopup: {
      type: Boolean,
      default: false
    },
    recordCurrent: {
      type: Object
    }
  },
  data() {
    return {
      showModule: this.showNotInfoPopup,
      gridData: []
    };
  },
  created() {
    this.recordCurrent.gridData.forEach(data => {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const { after, before, field_cn } = data[key];
          this.gridData.push({
            after,
            before,
            field_cn
          });
        }
      }
    });
  },
  methods: {
    handleClose(val) {
      this.$emit("on-open-sesion", false);
    }
  }
};
</script>


<style scoped>
</style>