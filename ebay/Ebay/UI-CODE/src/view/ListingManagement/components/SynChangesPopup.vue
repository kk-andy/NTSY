<template>
  <div class="syn-changes-popup">
    <el-dialog
      :title="recordCurrent.title"
      :visible.sync="showModule"
      width="1160px"
      top="3%"
      @close="handleClose(false)"
      :close-on-click-modal="false"
    >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="变更前" name="first">
          <BeforesynChanges ref="before" :change_before="change_before"></BeforesynChanges>
        </el-tab-pane>
        <el-tab-pane label="变更后" name="second">
          <AftersynChanges ref="after" :recordCurrent="recordCurrent" :change_after="change_after"></AftersynChanges>
        </el-tab-pane>
      </el-tabs>

      <!-- <div slot="footer" class="dialog-footer" v-if="activeName !== 'first'">
        <el-button @click="handleClose(false)">取 消</el-button>
        <el-button type="primary" @click="handleClose(true)">确 定</el-button>
      </div>-->
    </el-dialog>
  </div>
</template>

<script>
import BeforesynChanges from "./BeforeSynChanges.vue";
import AftersynChanges from "./AfterSynChanges.vue";

export default {
  name: "SynChangesPopup",
  components: {
    AftersynChanges,
    BeforesynChanges
  },
  props: {
    showSynChangesPopup: {
      type: Boolean,
      default: false
    },
    recordCurrent: {
      type: Object
    }
  },
  data() {
    return {
      showModule: this.showSynChangesPopup,
      activeName: "first",
      change_before: "",
      change_after: ""
    };
  },
  created() {
    this.change_before = this.recordCurrent.res.change_before;
    this.change_after = this.recordCurrent.res.change_after;
  },
  methods: {
    handleClick(tab, event) {},
    handleClose(val) {
      if (!val) {
        this.$emit("on-open-sesion", false);
        return;
      }

      this.$emit("on-open-sesion", { form: this.$refs.after.form, val });
    }
  }
};
</script>


<style scoped>
.syn-changes-popup {
  width: 100%;
}
</style>