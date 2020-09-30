<template>
  <div class="toolFormItem">
    <slot></slot>
    <a href="#" class="search" v-if="showSearch" @click="search">{{searchName}}</a>
    <el-tooltip popper-class="toolTip" v-if="showToolTip" effect="light" placement="right">
      <div slot="content" class="selectToolTip" width="152px">
        <span v-if="content">{{content}}</span>
        <slot v-else name="toolTips"></slot>
      </div>
      <i class="el-icon-question toolIcon"></i>
    </el-tooltip>
  </div>
</template>
<script>
export default {
  name: "SkySuffix",
  componentName: "SkySuffix",
  props: {
    content: null,
    showToolTip: {
      default: false,
      type: Boolean
    },
    showSearch: {
      default: false,
      type: Boolean
    },
    searchName: {
      default: "查询",
      type: String
    },
    size: {
      default: ""
    }
  },
  data() {
    return {};
  },
  methods: {
    search(e) {
      this.$emit("search-click", e);
    }
  }
};
</script>
<style lang="scss">
.toolFormItem {
  // height: 36px;
  width: 100%;
  display: flex;
  align-items: center;
}
.el-tooltip__popper.toolTip {
  border-color: #fff;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
}
.el-tooltip__popper.toolTip.popper__arrow {
  border-right-color: #fff;
}
.toolTip .popper__arrow {
  border-right-color: #fff !important;
}
.toolIcon {
  color: #337df6;
  margin-left: 7px;
}
.search {
  text-align: center;
  font-size: 12px;
  color: #337df6;
  margin-left: 7px;
}
.toolIcon,
.search {
  text-align: left;
}
</style>
