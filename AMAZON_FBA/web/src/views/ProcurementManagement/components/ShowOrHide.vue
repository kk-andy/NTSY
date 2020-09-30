<template>
    <div>
        <i class="el-icon-arrow-right" v-show="!item.check" @click="handeleChange(true, item)"></i>
        <i class="el-icon-arrow-down" v-show="item.check" @click="handeleChange(false, item)"></i>
    </div>
</template>
<script>
export default {
    props: {
        item: {
            type: Object,
            rquired: true
        }
    },
    methods: {
        handeleChange(flag, item) {
            this.$emit('handeleChange', flag, item)
        },
    }
}
</script>
<style scoped lang='scss'>
div {
    font-weight: bold;
    font-size: 16px;
    color: #333;
    i {
        font-weight: bold;
        cursor: pointer;
    }
}
</style>