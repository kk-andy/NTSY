<template>
  <el-card :class="{'panel':true,'hasHeader':title}" style="margin-bottom: 10px;">
    <div v-if="title" slot="header" class="title clearfix">
      <span class="textLabel">{{title}}</span>
      <el-popover placement="top" trigger="hover">
        <p>{{help}}</p>
        <i
          v-if="help"
          class="el-icon-question"
          slot="reference"
          style="color:#606266;margin-left:5px;"
        ></i>
      </el-popover>
      <span v-if="showRequireLabel" class="requireLabel">* 为必填项</span>
      <el-button
        v-for="btn in btns"
        :key="btn.text"
        :testId="btn.text"
        @click="click(btn)"
        class="panelRightBtn"
        type="text"
      >{{btn.text}}</el-button>
    </div>
    <slot></slot>
  </el-card>
</template>

<script>
import { scrollTo } from "@/utils/scroll-to";

export default {
  name: "Pagination",
  props: ["title", "btns", "showRequireLabel", "help"],
  methods: {
    click(btn) {
      this.$emit("click", btn);
    }
  }
};
</script>

<style scoped>
</style>
