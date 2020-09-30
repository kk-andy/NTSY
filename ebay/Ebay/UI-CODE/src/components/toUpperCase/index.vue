<template>
    <el-form-item class="icon_font_upper">
        <span @click="toUpper">A</span>
        <el-popover
        placement="top-start"
        width="250"
        trigger="hover"
        content="点击“A”可将首字母转化为大写">
        <img :src="mark" alt="" slot="reference">
    </el-popover>
    </el-form-item>
</template>
<script>
import mark from '@/icons/mark.png'
export default {
    data() {
        return {
            mark
        }
    },
    methods: {
        toUpper() {
            this.$emit('toUpper')
        }
    }
}
</script>
<style  lang="scss">
.icon_font_upper {
    .el-form-item__content {
        min-height: 96px;
        line-height: 96px;
        display: flex;
        align-items: center;
        & > span:nth-child(1) {
            font-weight: bold;
            font-size: 16px;
            margin-right: 10px;
            padding-top: 2px;
            cursor: pointer;
        }
        & > span:nth-child(2) {
            display: inherit;
        }
    }
}
</style>