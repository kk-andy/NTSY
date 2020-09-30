<template>
  <div class="popupsBox">
    <div class="popups">
      <div class="popupsTit">
        <h3>选择产品分类</h3>
        <i class="el-icon-close" style="font-size: 20px;" @click="cancelClick"></i>
      </div>
      <div class="btnBox">
        <el-button
          v-for="item in sites"
          :key="item.site_id"
          :type="item.site_id === selectedSite?'primary':''"
          size="small"
          @click="primaryClick(item)"
        >{{item.site}}</el-button>
      </div>
      <div class="main">
        <el-tree
          :data="checkList"
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
    product_cats_info: {
      type: Object,
    },
    goodsClass: {
      default: () => []
    },
    currentSelect: {
      type: Object,
    },
  },
  watch: {
    product_cats_info: {
      handler(newitem, olditem) {
        let that = this;
        newitem.site.forEach((item, index) => {
          // 新建空的选中数据
          if (that.goodsClass.length == 0) {
            that.selected.push({
              site_id: item.site_id,
              site: item.site,
              selectedArr: [],
              selected: [],
            });
          } else {
            that.selected = that.goodsClass;
            that.selectedSite = that.currentSelect.site_id;
            that.goodsClass.filter((item) => {
              if (item.site_id == that.currentSelect.site_id) {
                that.checked = item.selected;
                that.checkList = newitem.categories[item.site_id];
              }
            });
          }
        });
        // 所有站点信息
        this.sites = newitem.site;
        // 存储所有站点树形数据
        this.categories = newitem.categories;
        // 默认选中第一个站点
        // this.selectedSite = newitem.site[0].site_id;
        // 获取展示第一个站点树形数据
        // this.checkList = newitem.categories[newitem.site[0].site_id];
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
      selectedSite: "",
      selected: [],
      categories: {},
      sites: [],
      checked: [],
      checkList: [],
    };
  },
  methods: {
    handleNodeClick(item) {
      let that = this;
      let res = this.$refs.tree.getCheckedNodes(true);
      let checked = this.$refs.tree.getCheckedKeys(true);
      that.selected.forEach((item) => {
        if (item.site_id == that.selectedSite) {
          item.selectedArr = res;
          item.selected = checked;
        }
      });
    },

    primaryClick(item) {
      let that = this;
      that.selectedSite = item.site_id;
      that.checkList = that.categories[item.site_id];
      that.selected.forEach((item) => {
        if (item.site_id == that.selectedSite) {
          that.checked = item.selected;
        }
      });
    },
    confirmClick() {
      let that = this;
      let data = [];
      that.selected.forEach((item) => {
        if (item.selected.length != 0) {
          data = that.selected
        }
      });
      this.$emit("confirmClick", data);
      that.selectedSite = "";
      that.selected = [];
      that.categories = {};
      that.sites = [];
      that.checked = [];
      that.checkList = [];
    },
    cancelClick() {
      let that = this;
      that.selectedSite = "";
      that.selected = [];
      that.categories = {};
      that.sites = [];
      that.checked = [];
      that.checkList = [];
      that.$emit("cancelClick");
    },
  },
};
</script>
<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

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
.popups .btnBox {
  width: 100%;
  padding: 10px 0;
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