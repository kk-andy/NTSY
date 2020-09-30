<template>
    <div class="content" id="content">
        <div>
            <div>
                <span>快递单号:</span>
                <span>{{ detail.shipOrder }}</span>
            </div>
            <div>
                <span v-html="flag ? '制单日期:' : '审核时间:'"></span>
                <span>{{ flag ? detail.createDate : detail.orderDate }}</span>
            </div>
        </div>
        <div>
            <div>
                <span>采购数量:</span>
                <span>{{ detail.purchaseCount }}</span>
            </div>
            <div>
                <span>已入库数量:</span>
                <span>{{ detail.inCount }}</span>
            </div>
        </div>
        <div>
            <div>
                <span>采购仓库:</span>
                <span>{{ detail.whouseName }}</span>
            </div>
            <div v-show="!flag">
                <span>总税费:</span>
                <span>{{ detail.taxAmount }}</span>
            </div>
            <div  v-show="flag">
                <span>已入库金额:</span>
                <span>{{ detail.inAmount }}</span>
            </div>
        </div>
        <div v-show="!flag">
            <div>
                <span>总运费:</span>
                <span>{{ detail.expressAmount }}</span>
            </div>
            <div>
                <span>总金额:</span>
                <span>{{ detail.totalAmount }}</span>
            </div>
            <!-- <div></div> -->
        </div>
        <div v-show="!flag">
            <div>
                <span>已入库金额:</span>
                <span>{{ detail.inAmount }}</span>
            </div>
            <div></div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: true
        },
        flag: {
            type: Boolean,
            default: false
        },
        detail: {
            type: Object,
            required: true
        }
    }
}
</script>
<style scoped lang="scss">
.content {
    & > div {
        display: flex;
        justify-content: space-around;
        align-items: center;
        min-height: 58px;
        align-items: center;
        // line-height: 58px;
        border-bottom: 1px solid #dfe6ec;
        color: #606266;
        & > div {
            width: 50%;
            padding-left: 100px;
        }
    }
}
</style>