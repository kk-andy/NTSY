<template>
  <div class="form_combination">
    <el-form
      ref="formData"
      :model="formData"
      size="medium"
      :inline="inline ? true : false"
      :label-width="labelWidth ? labelWidth : '120px'"
    >
      <el-col
        v-for="(item, index) in formData"
        v-if="
          typeof item.displayWith == 'function'
            ? item.displayWith(formData, item)
            : !item.displayWith
        "
        :key="index"
        :span="item.outCol ? item.outCol : 24"
      >
        <el-form-item v-bind="item" :prop="getProp(item, index)">
          <el-col :span="item.col">
            <component
              :is="item.formType"
              v-model="item.value"
              v-bind="item"
              @change="
                typeof item.change == 'function'
                  ? item.change(formData, item)
                  : function () {}
              "
            ></component>
          </el-col>
        </el-form-item>
      </el-col>
      <slot></slot>
      <el-col style="margin-left: 100px" v-if="showBtn">
        <el-button type="primary" @click="sure()" :loading="loading"
          >确定</el-button
        >
        <el-button @click="reset('formData')">重置</el-button>
      </el-col>
    </el-form>
  </div>
</template>
<script>
import formComponent from "@/components/formComponents/index.js";
export default {
  name: "form_combination",
  props: ["formData", "showBtn", "labelWidth", "inline"],
  components: { ...formComponent },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    getProp(item, idx) {
      return `${idx}.value`;
    },
    validate(cb) {
      this.$refs.formData.validate((valid) => {
        cb && cb(valid);
      });
    },
    sure() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          this.$emit("submit");
        }
      });
    },
    reset(val) {
      this.$refs[val].resetFields();
    },
  },
};
</script>
<style lang="scss">
.form_combination {
  .el-form {
    overflow: hidden;
    .el-form-item {
      margin-bottom: 20px;
    }
    .el-form-item__label {
      padding-right: 20px;
    }
  }
}
</style>

