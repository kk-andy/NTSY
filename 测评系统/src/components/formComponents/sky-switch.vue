<template>
  <div class="sky-switch">
    <sky-suffix v-bind="$attrs">
      <el-switch v-model="selfData" v-bind="$attrs" @change="change"></el-switch>
    </sky-suffix>
  </div>
</template>
<script>
import formStore from "@/mixins/formStore.js";
export default {
  mixins: [formStore],
  name: "sky-switch",
  props: ["value"],
  data() {
    return {
      val: this.value,
    };
  },
  methods: {
    change(val) {
      debugger;
      this.selfData = val;
      this.setVal();
      this.$emit("change", val);
    },
  },
};
</script>
<style scoped lang="scss">
.el-switch {
  height: 36px;
  line-height: 36px;
}
</style>
