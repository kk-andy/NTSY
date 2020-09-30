<template>
  <div class="bulk-copy-popup">
    <el-dialog :title="recordCurrent.title" :visible.sync="showModule" :close-on-click-modal="false" @close="handleClose(false)">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="请选择店铺：">
          <el-select v-model="form.mode " multiple filterable placeholder style="width:50%">
            <el-option :label="item.val" v-for="item in options" :key="item.id" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请选择站点：">
          <el-select v-model="form.mode" multiple filterable placeholder style="width:50%">
            <el-option :label="item.val" v-for="item in options" :key="item.id" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose(false)">取 消</el-button>
        <el-button type="primary" @click="handleClose(true)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "BulkCopyPopup",
  props: {
    showCopyPopup: {
      type: Boolean,
      default: false
    },
    recordCurrent: {
      type: Object
    }
  },
  data() {
    return {
      showModule: this.showCopyPopup,
      form: {
        mode: "",
        val: "",
        status: false
      },
      options: [
        {
          id: 1,
          val: "华南"
        }
      ]
    };
  },
  created() {
    // console.log(this.recordCurrent);
  },
  methods: {
    handleClose(val) {
      this.$emit("on-open-sesion", false);
    }
  }
};
</script>


<style scoped>
.explanation {
  margin-left: 15px;
  color: #f56c6c;
}
.explanation li {
  margin: 5px 0;
  text-indent: 2em;
}
</style>