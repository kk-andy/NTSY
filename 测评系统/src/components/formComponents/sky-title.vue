<template>
  <div class="sky-title">
    <div>
      <span class="pay-type">{{title}}</span>
    </div>
    <!-- <hr class="line"> -->
  </div>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {};
  }
};
</script>

<style>
.sky-title {
  margin-left: -175px;
}
</style>
