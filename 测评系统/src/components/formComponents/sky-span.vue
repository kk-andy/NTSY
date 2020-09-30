<template>
  <div class="sky-span">
    <span>{{value}}</span>
    <!-- <el-tooltip v-if="isEllipsis" :content="value">
      <span class="pointer">{{value}}</span>
    </el-tooltip> -->
  </div>
</template>
<script>
export default {
  name: "sky-span",
  props: ["value"],
  data() {
    return {
      isEllipsis: true
    };
  },
  methods: {},
  watch: {
    value: {
      handler: function(val, oldValue) {
        if (val && val != "-") {
        }
      },
      immediate: true
    }
  }
};
</script>
<style scoped lang="scss">
.sky-span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
