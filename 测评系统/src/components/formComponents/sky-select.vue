<template>
  <sky-suffix v-bind="$attrs" @search-click="search">
    <el-select
      @change="handleChange"
      v-model="selected"
      v-bind="$attrs"
      :placeholder="placeholder"
      :multiple="multiple ? multiple : false"
      :collapse-tags="collapseTags ? collapseTags : false"
      filterable
      clearable
    >
      <el-option
        v-for="(item, index) in option"
        :key="index"
        :label="item[prop.label]"
        :value="item[prop.value]"
      ></el-option>
    </el-select>
  </sky-suffix>
</template>
<script>
import formStore from "@/mixins/formStore.js";
import commonApi from "@/api/commons.js";
export default {
  name: "sky-select",
  mixins: [formStore],
  props: {
    value: {
      default: null,
      required: true,
    },
    code: {
      default: null,
    },
    api: {
      default: null,
    },
    placeholder: {
      default: "请选择",
      required: false,
    },
    options: {
      default: function () {
        return [];
      },
    },
    props: {
      default() {
        return {
          label: "name",
          value: "id",
        };
      },
    },
    multiple: {
      default: false,
    },
    collapseTags: {
      default: false,
    },
    format: {
      default: null,
    },
  },
  created() {},
  data() {
    return {
      selected: this.value,
      option: this.options,
      prop: this.props,
    };
  },
  watch: {
    value: {
      handler: function (val, oldValue) {
        this.selected = val;
      },
    },
    // code: {
    //   handler: function(val, oldValue) {
    //     if (val) {
    //       this.getDictionary();
    //     }
    //   },
    //   deep: true,
    //   immediate: true
    // },
    api: {
      handler: function (val, oldValue) {
        if (val) {
          this.getOptions(val);
        }
      },
      deep: true,
      immediate: true,
    },
    options: {
      handler: function (val, oldValue) {
        if (val && val.length) {
          this.option = val;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    search(e) {
      this.$emit("search-click", e);
    },
    handleChange(val) {
      this.selfData = val;
      this.setVal();
      this.$emit("change", val);
    },
    // async getDictionary() {
    //   let res = await commonApi.getDictionary({ type: this.code });
    //   if (typeof this.format == "function") {
    //     this.option = this.format(res.data.data);
    //   } else {
    //     this.option = res.data.data;
    //   }
    //   this.prop = {
    //     label: "name",
    //     value: "code"
    //   };
    // },
    async getOptions(val) {
      let res;
      if (typeof val == "string") {
        res = await commonApi[val]();
      } else {
        res = await commonApi[val.url](val.projectId);
      }

      if (typeof this.format == "function") {
        this.option = this.format(res.data);
      } else {
        this.option = Object.values(res.data);
      }
    },
  },
  mounted() {},
};
</script>
<style scoped lang='scss'>
.el-select {
  width: 100%;
}
</style>
