<template>
  <div class="popupsBox">
    <div class="popups">
      <div class="popupsTit">
        <h3>选择店铺分类</h3>
        <i class="el-icon-close" style="font-size: 20px;" @click="cancelClick"></i>
      </div>
      <div class="main">
        <el-tree
          :data="shop_cats_info"
          show-checkbox
          node-key="category_id"
          ref="tree"
          auto-expand-parent
          :default-expanded-keys="checked"
          :default-checked-keys="checked"
          @check-change="handleNodeClick"
          :props="defaultProps"
        ></el-tree>
      </div>
      <div>
        <el-button type="primary" @click="confirmClick">确定</el-button>
        <el-button @click="cancelClick">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    shop_cats_info: {
      type: Array,
    },
    shopClass: {
      default: () => []
    },
  },
  watch: {
    shop_cats_info: {
      handler(newitem, olditem) {
        let checked = [];
        console.log(this.shopClass);
        this.shopClass.forEach((item) => {
          checked.push(item.category_id);
        });
        this.checked = checked;
        this.selected = this.shopClass;
      },
      deep: true,
    },
  },
  data() {
    return {
      defaultProps: {
        children: "son",
        label: "category_name",
      },
      checked: [],
      checkList: [],
    };
  },
  methods: {
    handleNodeClick(item) {
      let that = this;
      let res = this.$refs.tree.getCheckedNodes(true);
      // let checked = this.$refs.tree.getCheckedKeys(true);
      that.selected = res;
    },
    confirmClick() {
      this.$emit("confirmClick", this.selected);
      this.checked = [];
      this.checkList = [];
    },
    cancelClick() {
      this.checked = [];
      this.checkList = [];
      this.$emit("cancelClick");
    },
  },
};
</script>
<style scoped>
.popupsBox {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.popups {
  width: 50%;
  padding: 10px;
  border-radius: 5px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.popups .popupsTit {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.popups .main {
  width: 100%;
  padding: 0 30px;
}
.popups .main .el-checkbox-group {
  display: flex;
  flex-direction: column;
}
.popups .main .el-checkbox-group .el-checkbox {
  margin-bottom: 10px;
}
</style>