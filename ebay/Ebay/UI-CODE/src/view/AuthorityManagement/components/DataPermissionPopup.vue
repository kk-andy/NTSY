<template>
  <div class="data-permission-popup">
    <el-dialog
      :title="recordCurrent.title"
      :visible.sync="showModule"
      @close="handleClose(false)"
      width="30%"
      top="5%"
      :close-on-click-modal="false"
    >
      <div class="shop-container">
        <el-checkbox v-model="checkedAll" @change="checkedAllChange">全选</el-checkbox>
        <ul class="shop-list margin-l20">
          <li v-for="shop in recordCurrent.shopList" :key="shop.id" class="shop">
            <el-checkbox v-model="shop.select" @change="shopChange(shop,$event)">{{shop.shop_name}}</el-checkbox>
          </li>
        </ul>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose(false)">取 消</el-button>
        <el-button type="primary" @click="handleClose(true)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "DataPermissionPopup",
  components: {},
  props: {
    showPermissionPopup: {
      type: Boolean,
      default: false
    },
    recordCurrent: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  data() {
    return {
      showModule: this.showPermissionPopup,
      checkedAll: false,
      permissionHeight: null
    };
  },

  created() {
    this.isActiveCheckedAll();
  },

  methods: {
    shopChange(item, e) {
      item.select = e;
      this.isActiveCheckedAll();
    },
    checkedAllChange(e) {
      this.checkedAll = e;
      this.recordCurrent.shopList.forEach(item => {
        if (this.checkedAll) {
          item.select = true;
        } else {
          item.select = false;
        }
      });
    },
    isActiveCheckedAll() {
      let checkeds = this.recordCurrent.shopList.filter(e => e.select == true);
      if (!checkeds.length) {
        this.checkedAll = false;
      } else {
        this.checkedAll = true;
      }
    },
    handleClose(val) {
      if (!val) {
        this.$emit("on-open-sesion", false);
        return false;
      }

      this.$emit("on-open-sesion", this.recordCurrent);
    }
  }
};
</script>

<style scoped>
.data-permission-popup {
  height: 100%;
}
.shop-container {
  height: 500px;
  overflow: hidden;
}
.shop-list {
  height: 100%;
  overflow-y: auto;
  padding-bottom: 20px;
}
.shop {
  margin: 15px 0;
}
</style>