<template>
  <div>
    <!-- 条形码容器，可选svg、canvas，或img标签 -->
    <div class="main" v-for="(item,key) in content" :key="key">
      <svg :id="'_'+key" />
      <!-- or -->
      <!-- <canvas :id="item"></canvas> -->
      <!-- or -->
      <!-- <img :id="item" /> -->
    </div>
  </div>
</template>

<script>
import jsbarcode from "jsbarcode";

export default {
  props: {
    content: {
      type: Array,
      // default: ["danny"],
    },
    options: {
      default: function () {
        return {
          format: "CODE128",
          displayValue: true,
          fontSize: 18,
          height: 50,
          width: 1,
        };
      },
    },
  },

  mounted() {
    // 生成条形码
    this.$props.content.forEach((item, key) => {
      jsbarcode("#_" + key, item, this.$props.options);
    });

    // this.$nextTick(() => {
    //   console.log(this.$props, 11);
    // });
  },
};
</script>
<style scoped>
.main {
  width: 80%;
}
</style>