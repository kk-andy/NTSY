<template>
    <div>
        <el-button @click="goBack">返回</el-button>
    </div>
</template>
<script>
export default {
    props: {
        routerName: {
            type: String,
            default: 'all'
        }
    },
    data() {
        return {

        }
    },
    methods: {
        goBack() {
            if (this.routerName === 'all') {
                this.$router.go(-1)
            } else {
                this.$router.push({
                    name: this.routerName
                })
            }
        }
    }
}
</script>
<style scoped lang="scss">
div {
    display: flex;
    flex-direction: row-reverse;
    margin-top: 15px;
}
</style>