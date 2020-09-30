<template>
  <div class="sky-cascader">
    <sky-suffix v-bind="$attrs">
      <el-cascader
        ref="cascader"
        v-model="selected"
        v-bind="$attrs"
        :placeholder="placeholder"
        :options="option"
        @change="handleChange"
        :props="props"
        clearable
      ></el-cascader>
    </sky-suffix>
  </div>
</template>
<script>
import formStore from "@/mixins/formStore.js";
import { Json2Tree } from "@/utils";
// import commonApi from "@api/common.js";
export default {
  name: "sky-cascader",
  mixins: [formStore],
  props: {
    value: {
      default: null,
      required: true
    },
    placeholder: {
      default: "请选择",
      required: false
    },
    props: {
      default() {
        return {
          label: "name",
          value: "id"
        };
      }
    },
    api: {
      default: null
    }
  },
  data() {
    return {
      selected: [],
      option: []
    };
  },
  mounted() {},
  watch: {
    value: {
      handler: function(val, oldValue) {
        if (val && val.length) {
          this.selected = val;
        }
      },
      deep: true,
      immediate: true
    },
    api: {
      handler: function(val, oldValue) {
        if (val) {
          this.getOptions(val);
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handleChange(val) {
      this.selfData = val;
      this.setVal();
      this.$emit("change", val);
    },
    async getOptions(val) {
      let res = await commonApi[val]();
      this.option = res.data;
    }
  }
};
</script>
<style scoped lang="scss">
.el-cascader {
  width: 100%;
}
</style>
