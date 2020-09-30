<template>
  <sky-suffix v-bind="$attrs" @search-click="search">
    <el-checkbox
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleCheckAllChange"
      :class="{noCheckClass:isNoCheck}"
      class="checkAllClass"
      v-if="isCheckAll"
    >全部</el-checkbox>
    <el-checkbox-group
      v-model="checkbox"
      :value="checkbox"
      @change="handleChange"
      v-bind="$attrs"
      :class="{noCheckClass:isNoCheck}"
    >
      <el-checkbox
        v-for="(item) in list"
        :label="item[props.value]"
        :key="item[props.value]"
        :border="border"
      >{{item[props.label]}}</el-checkbox>
      <span class="moreClass" v-if="isMore && moreShow" @click="more">展开更多</span>
      <span class="moreClass" v-if="isMore && packShow" @click="packup">收起</span>
    </el-checkbox-group>
  </sky-suffix>
</template>
<script>
import formStore from "@/mixins/formStore.js";
export default {
  name: "sky-checkbox",
  componentName: "sky-checkbox",
  mixins: [formStore],
  props: {
    name: {},
    value: {},
    border: {
      default() {
        return false;
      }
    },
    isNoCheck: {
      default() {
        return false;
      }
    },
    isCheckAll: {
      default() {
        return false;
      }
    },
    isMore: {
      default() {
        return false;
      }
    },
    options: {
      default() {
        return [];
      }
    },
    props: {
      default() {
        return {
          label: "label",
          value: "value"
        };
      }
    }
  },
  created() {},
  watch: {
    value: {
      handler(val) {
        this.checkbox = _.compact(val);
      },
      immediate: true
    },
    list: {
      handler(val) {
        if (this.options.length < 9) {
          return;
        }
        if (val.length < 9) {
          this.moreShow = true;
          this.packShow = false;
        } else {
          this.moreShow = false;
          this.packShow = true;
        }
      },
      immediate: true
    },
    options: {
      handler(val) {
        if (val.length > 0 && this.isMore) {
          this.packup();
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      selfData: this.value,
      checkbox: this.value,
      list: this.options || [],
      checkAll: false,
      isIndeterminate: true,
      moreShow: false,
      packShow: false
    };
  },
  methods: {
    search(e) {
      this.$emit("search-click", e);
    },
    handleChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.checkboxAll.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.checkboxAll.length;
      this.$emit("input", value);
    },
    handleCheckAllChange(val) {
      this.checkbox = val ? this.checkboxAll : [];
      this.isIndeterminate = false;
      this.$emit("input", this.checkbox);
    },
    more() {
      this.list = this.options;
    },
    packup() {
      this.list = _.filter(this.options, (item, index) => {
        return index < 8;
      });
    }
  },
  computed: {
    checkboxAll() {
      return _.map(this.options, item => {
        return item[this.props.value];
      });
    }
  }
};
</script>

<style lang="scss">
.noCheckClass {
  .el-checkbox__input {
    display: none;
  }
  .el-checkbox__label {
    padding-left: 0;
  }
  .el-checkbox + .el-checkbox {
    margin-left: 0;
    margin-right: 25px;
  }
  .el-checkbox {
    margin-right: 25px;
  }
}
.checkAllClass {
  align-self: flex-start;
  height: 41px;
  margin-right: 15px;
  .el-checkbox__label {
    padding-left: 0;
  }
}
.moreClass {
  font-size: 14px;
  color: #409eff;
  display: inline-block;
  cursor: pointer;
}
</style>