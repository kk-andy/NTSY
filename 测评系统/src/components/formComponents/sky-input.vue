<template>
  <div class="sky-input">
    <sky-suffix v-bind="$attrs">
      <el-input v-model="selfData" @change="change" v-bind="$attrs" ref="input">
        <template v-if="$attrs.after" slot="append">{{$attrs.after}}</template>
      </el-input>
    </sky-suffix>
  </div>
</template>
<script>
import formStore from "@/mixins/formStore.js";
export default {
  name: "sky-input",
  props: {},
  mixins: [formStore],
  data() {
    return {
      val: ""
    };
  },
  methods: {
    change(val) {
      this.selfData = val;
      this.setVal();
      this.$emit("change", val);
    }
  }
};
</script>
