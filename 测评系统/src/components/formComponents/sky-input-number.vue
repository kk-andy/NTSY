<template>
  <div class="sky-input-number">
    <sky-suffix v-bind="$attrs">
      <el-input type="number" v-model="selfData" @change="change" v-bind="$attrs" ref="input">
        <template v-if="$attrs.after" slot="append">{{$attrs.after}}</template>
      </el-input>
    </sky-suffix>
  </div>
</template>
<script>
import formStore from "@/mixins/formStore.js";
export default {
  name: "sky-input-number",
  props: {},
  mixins: [formStore],
  data() {
    return {
      val: ""
    };
  },
  methods: {
    change(val) {
      this.selfData = Number(val);
      this.setVal();
      this.$emit("change", val);
    }
  }
};
</script>
<style scoped lang="scss">
</style>
