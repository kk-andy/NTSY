<template>
  <sky-suffix v-bind="$attrs" @search-click="search">
    <el-radio-group v-model="radio" :value="radio" @change="handleChange" v-bind="$attrs">
      <el-radio
        v-for="(item) in options"
        :label="item[props.value]"
        :key="item[props.value]"
        :border="border"
      >{{item[props.label]}}</el-radio>
    </el-radio-group>
    <slot name="toolTips" slot="toolTips"></slot>
  </sky-suffix>
</template>
<script>
import SkySuffix from "../formComponents/SkySuffix.vue";
export default {
  name: "sky-radio",
  componentName: "sky-radio",
  components: {
    SkySuffix
  },
  props: {
    name: {},
    value: {},
    options: {},
    border: Boolean,
    props: {
      default() {
        return {
          label: "name",
          value: "code"
        };
      }
    }
  },
  created() {},
  watch: {
    value: {
      handler(val) {
        this.radio = val;
      },
      immediate: true
    }
  },
  data() {
    return {
      radio: this.value
    };
  },
  methods: {
    search(e) {
      this.$emit("search-click", e);
    },
    handleChange(e) {
      this.$emit("input", e);
      this.$emit("change", e);
    }
  }
};
</script>
<style lang="scss" scoped>
.el-radio-group {
  line-height: 36px;
  font-size: inherit;
}
</style>

