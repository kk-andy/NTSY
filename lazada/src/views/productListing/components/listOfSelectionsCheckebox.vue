<template>
    <el-popover placement="bottom" width="100" trigger="click" class="popover" offset="">
        <i class="el-icon-s-fold" slot="reference" aria-setsize="60" />
        <el-checkbox-group v-model="colOptions"  >
            <el-checkbox v-for="item in colSelect" :label="item" :key="item" ></el-checkbox>
        </el-checkbox-group>
    </el-popover>
</template>
<script>
export default {
    data() {
        return {
            cloData: [
                "SKU",
                "SPU",
                "标题",
                "缩略图",
                "产品线",
                "二级品类",
                "采购价",
                "重量",
                "采购链接",
                "反向链接",
                "开发人",
                "是否在售",
                "是否侵权",
                "关键词",
                "推荐平台",
                "调研平台",
                "是否已刊登",
                "刊登店铺",
                "SKU生成时间",
            ],
            colOptions:[],
            colSelect:[],
        };
    },
    methods: {},
    watch: {
        colOptions: {
            handler(val) {
                this.$emit("passClo", this.colOptions);   
            },
        },
    },
    mounted() {

    },
    created() {
        this.colOptions = this.cloData.filter(item => item !== '推荐平台' && item !== '调研平台')
        this.colSelect = [...this.cloData]
        this.$emit("passClo", this.colOptions);
    },
};
</script>
<style scoped>
.popover{
    display: block;
    height: 25px;
    text-align: right;
}
.el-icon-s-fold {
    font-size: x-large;
    /* float: right; */
    margin-right: 20px;
}
</style>