<template>
  <el-row :type="group.type" :justify="group.justify">
    <template v-if="!group.categorys || !group.categorys.length">
      <form-input
        @on-btn-click="btnClick"
        @on-change="onChange"
        :key="itemIndex"
        v-if="!item.displayWith || item.$_show"
        @on-input="onInput"
        v-for="(item,itemIndex) in group.items"
        :item="item"
        :group="group"
        :item-index="itemIndex"
        :group-index="index"
      ></form-input>
    </template>
    <template v-if="group.categorys && group.categorys.length">
      <panel
        :class="{'panel-category':true,[categoryWarp.category.key]:true}"
        :key="cindex"
        v-for="(categoryWarp,cindex) in getCategorys"
        v-if="!categoryWarp.category.hidden"
        :title="categoryWarp.category.title"
      >
        <el-row v-for="(row,rowIndex) in categoryWarp.rows" :key="rowIndex">
          <form-input
            :data-test="!group.items[itemKey].displayWith || group.items[itemKey].$_show"
            @on-btn-click="btnClick"
            @on-change="onChange"
            :key="index+itemKey"
            v-if="!group.items[itemKey].displayWith || group.items[itemKey].$_show"
            @on-input="onInput"
            v-for="(itemKey,itemIndex) in row"
            :item="group.items[itemKey]"
            :group="group"
            :item-index="itemKey"
            :group-index="index"
          ></form-input>
        </el-row>
      </panel>
    </template>
  </el-row>
</template>
<script>
// import { clearObjValue, } from '@/common'
// import supplierListTab from './supplierTabList'
import { panel } from "@/components/panel/index";
import { formInput } from "./formInput";
import { mapState } from "vuex";
let createCategroyWarp = category => {
  if (category.rows) {
    return {
      category: category,
      rows: category.rows
    };
  } else {
    return {
      category: category,
      rows: [category.items]
    };
  }
};
export default {
  name: "",
  props: ["group", "index"],
  components: { panel, formRow },
  watch: {},
  data() {
    return {};
  },
  methods: {
    onChange(group, item) {
      this.$emit("on-change", group, item);
    },
    btnClick(group, item, value) {
      this.$emit("btn-click", group, item, value);
    },
    onInput(traget) {
      this.$emit("on-input", traget);
    }
  },
  computed: {
    getCategorys() {
      if (this.group && this.group.categorys && this.group.categorys.length) {
        let categoryWarps = this.group.categorys.map(c =>
          createCategroyWarp(c)
        );
        let showCategoryWarps = categoryWarps.filter(warp => {
          let showRows = [];
          warp.rows.forEach(row => {
            let itemFilters = row.filter(f => {
              let item = this.group.items[f];
              return item.$_show || !item.displayWith;
            });
            if (itemFilters && itemFilters.length) {
              showRows.push(row);
            }
          });
          if (showRows && showRows.length) {
            categoryWarps.rows = showRows;
            return true;
          } else {
            return false;
          }
        });
        return showCategoryWarps;
      } else {
        return [];
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
