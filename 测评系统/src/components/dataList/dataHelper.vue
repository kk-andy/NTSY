<template>
 <div style="line-height:0px;">
    <span>{{title}}</span>
    <el-popover placement="top" width="200" trigger="hover">
        <div style="margin-top:10px;">
            {{helpText}}
        </div>
        <i class="el-icon-question" slot="reference"></i>
    </el-popover>
</div>
</template>
<script>
export default {
  props: ['title', 'helpText'],
  data() {
    return {
    };
  },
};
</script>
<style lang="scss" scoped>

</style>
