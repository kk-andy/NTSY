<template>
  <div class="sky-date-picker">
    <sky-suffix v-bind="$attrs">
      <el-date-picker
        v-model="timeValue"
        @change="change"
        v-bind="$attrs"
        :type='type'
        :value-format="valueFormat || 'yyyy-MM-dd'"
        :unlink-panels="true"
        :placeholder="placeholder"
        :start-placeholder="startPlaceholder"
        :end-placeholder="endPlaceholder"
      ></el-date-picker>
    </sky-suffix>
  </div>
</template>
<script>
import SkySuffix from "../formComponents/SkySuffix.vue";
import formStore from "@/mixins/formStore.js";
export default {
  name: "sky-date-picker",
  props: ["value", "placeholder", "startPlaceholder", "endPlaceholder",'valueFormat','type'],
  mixins: [formStore],
  inheritAttrs: false,
  data() {
    return {
      timeValue: "",
    };
  },
  methods: {
    setVal() {
      this.$emit("input", this.timeValue);
    },
    getVal() {
      this.timeValue = this.value;
    },
    change(val) {
      this.timeValue = val;
      this.$emit("input", val);
      this.$emit("change", val);
    }
  },
  watch: {
    value: {
      handler: function(val, oldVal) {
        if (val) {
          this.timeValue = val;
        } else {
          this.timeValue = "";
        }
      },
      deep:true,
      immediate: true
    }
  },
  computed: {},
  created() {}
};
</script>
<style scoped lang="scss">
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>
