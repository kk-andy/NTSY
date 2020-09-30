<template>
  <div class="sky-select-input">
    <sky-suffix v-bind="$attrs">
      <el-input
        v-model="inputValue"
        @change="change(selectValue,inputValue)"
        v-bind="$attrs"
        ref="input"
      >
        <el-select
          v-model="selectValue"
          slot="prepend"
          placeholder="请选择"
          @change="change(selectValue,inputValue)"
        >
          <el-option
            v-for="(item,index) in options"
            :key="index"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
        <template v-if="$attrs.after" slot="append">{{$attrs.after}}</template>
      </el-input>
    </sky-suffix>
  </div>
</template>
<script>
import formStore from "@/mixins/formStore.js";
export default {
  name: "sky-select-input",
  props: {
    value: {
      default: null,
      required: true,
    },
    options: {
      default: null,
    },
  },
  mixins: [formStore],
  data() {
    return {
      val: "",
      inputValue: "",
      selectValue: "",
    };
  },
  watch: {
    value: {
      handler(val, old) {
        if (val && val.length) {
          this.selectValue = val[0];
          this.inputValue = val[1];
        }
      },
      immediate: true,
    },
  },
  methods: {
    change(selectValue, inputValue) {
      debugger;
      this.selfData = [selectValue, inputValue];
      this.setVal();
      this.$emit("change", [selectValue, inputValue]);
    },
  },
};
</script>
<style lang="scss">
.sky-select-input {
  .el-input-group__prepend {
    background-color: #fff;
    width: 100px;
    color: #606266;
  }
}
</style>
