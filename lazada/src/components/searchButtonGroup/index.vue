<template>
    <div class="grid-content bg-purple">
        <span></span>
        <el-button type="primary" class="btn_button_primary" @click="doFilter">搜索</el-button>
        <el-button type="primary" class="btn_button_primary" @click="doReset">重置</el-button>
    </div>
</template>
<script>
export default {
    methods: {
        doFilter() {
            this.$scrollTop()
            this.$emit('doFilter')
        },
        doReset() {
            this.$scrollTop()
            this.$emit('doReset')
        }
    }
}
</script>