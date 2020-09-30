<template>
  <div>
    <template>
      <panel
        v-for="(group,index) in getGroups"
        :key="index"
        :title="group.title"
        :btns="group.headerBtns"
        :show-require-label="group.showRequireLabel"
        @click="headerBtnClick(group,$event)"
      >
        <template>
          <form-row :group="group" :index="index" @on-change="onChange" @on-input="onInput"></form-row>
        </template>
      </panel>
    </template>
  </div>
</template>
<script>
// import { clearObjValue, } from '@/common'
// import supplierListTab from './supplierTabList'
import { panel } from "@/components/panel/index";
import { formRow } from "./formRow";
import { mapState } from "vuex";
export default {
  name: "",
  props: ["root", "tag", "exclude"],
  computed: {
    ...mapState({}),
    getGroups() {
      let keys = Object.keys(this.root).filter(f => f.indexOf("$_s_") != 0);
      let newGroups = {};
      for (let key in keys) {
        let prop = keys[key];
        let tag = this.tag ? this.tag : "";
        let exclude = this.exclude ? this.exclude : undefined;
        if (prop.indexOf(tag) == 0 && prop.indexOf(exclude) != 0) {
          newGroups[prop] = this.root[prop];
        }
      }
      return newGroups;
    }
  },
  components: { panel,formRow },
  watch: {},
  data() {
    return {};
  },
  methods: {
    onChange(group, item) {
      this.$emit("on-change", group, item);
    },
    btnClick(group, item, value) {
      this.$emit("on-btn-click", group, item, value);
    },
    headerBtnClick(group, btn) {
      this.$emit("header-btn-click", { group: group, btn: btn });
    },

    onInput(traget) {
      this.$emit("on-input", traget);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
