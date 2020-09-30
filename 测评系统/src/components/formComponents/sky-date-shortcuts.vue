<template>
  <div class="sky-more-date-picker">
    <sky-suffix v-bind="$attrs">
      <el-date-picker
        v-model="timeValue"
        @change="change"
        v-bind="$attrs"
        value-format="yyyy-MM-dd"
        :unlink-panels="true"
        :placeholder="placeholder"
        :start-placeholder="startPlaceholder"
        :end-placeholder="endPlaceholder"
        :pickerOptions="pickerOptions"
      ></el-date-picker>
    </sky-suffix>
  </div>
</template>
<script>
import SkySuffix from "../formComponents/SkySuffix.vue";
import formStore from "@/mixins/formStore.js";
// import { dateShortcuts } from "@/common/dictionary";
export default {
  name: "sky-date-shortcuts",
  props: [
    "value",
    "placeholder",
    "startPlaceholder",
    "endPlaceholder",
    "shortcuts"
  ],
  mixins: [formStore],
  inheritAttrs: false,
  data() {
    return {
      // dateShortcuts: dateShortcuts,
      dateShortcuts: [],
      pickerOptions: {
        shortcuts: []
      },
      timeValue: ""
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
        if (val && val.length == 2) {
          this.timeValue = val;
        } else {
          this.timeValue = "";
        }
      },
      immediate: true
    },
    shortcuts: {
      handler: function(val, oldVal) {
        if (val) {
          this.pickerOptions.shortcuts = val.map(key => {
            return {
              text: dateShortcuts[key].text,
              onClick(picker) {
                picker.$emit("pick", [
                  dateShortcuts[key].start,
                  dateShortcuts[key].end
                ]);
              }
            };
          });
        } else {
          this.pickerOptions.shortcuts = [];
        }
      },
      deep: true,
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
