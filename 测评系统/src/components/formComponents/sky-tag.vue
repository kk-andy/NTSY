<template>
  <div class="sky-tag">
    <sky-suffix v-bind="$attrs">
      <el-tag :key="tag" v-for="tag in dynamicTags" closable @close="handleClose(tag)">{{tag}}</el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      ></el-input>
      <el-button
        v-else
        class="button-new-tag"
        size="small"
        @click="showInput"
        :disabled="disabled"
      >{{text}}</el-button>
    </sky-suffix>
  </div>
</template>
<script>
import formStore from "@/mixins/formStore.js";
export default {
  name: "sky-tag",
  props: {
    value: {
      default: null,
      required: true
    },
    text: {
      default: null
    },
    disabled: {
      default: null
    },
    validate: {
      default: null
    }
  },
  watch: {
    value: {
      handler: function(val, oldValue) {
        this.dynamicTags = val;
      }
    },
    immediate: true
  },
  mixins: [formStore],
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: ""
    };
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      this.setVal();
      this.$emit("change", this.dynamicTags);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        if (this.validate(inputValue)) {
          this.dynamicTags.push(inputValue);
          this.selfData = this.dynamicTags;
          this.setVal();
        }else {
        this.$message.warning("请输入正确的其他通知人联系方式");
      }
    } 
      this.$emit("change", this.dynamicTags);
      this.inputVisible = false;
      this.inputValue = "";
    }
  }
};
</script>
<style lang="scss" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag,
.el-tag {
  margin-right: 10px;
  height: 36px;
  line-height: 36px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 150px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
