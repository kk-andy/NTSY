<template>
    <el-card v-if="tags.length">
            <el-tag
                :key="tag.address"
                v-for="tag in tags"
                closable
                :disable-transitions="false"
                @close="handleClose(tag.address)">
                {{tag.value}}
            </el-tag>
    </el-card>
</template>
<script>
export default {
    props: {
        tags: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {

        }
    },
    methods: {
        handleClose(id) {
            this.$emit('handleClose', id)
        }
    }
}
</script>
<style lang="scss" scoped>
.el-card__body {
    & > span {
        margin-right: 10px;
        margin-bottom: 10px;
    }
}
</style>