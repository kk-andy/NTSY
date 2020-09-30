<template>
  <div class="sky-textarea">
    <sky-suffix v-bind="$attrs">
      <el-input type="textarea" v-model="selfData" @change="change" v-bind="$attrs" ref="textarea"></el-input>
    </sky-suffix>
  </div>
</template>
<script>
import formStore from "@/mixins/formStore.js";
export default {
  mixins: [formStore],
  name: "sky-textarea",
  props: ["value"],
  created() {},
  data() {
    return {};
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
