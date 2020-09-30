<template>
    <div class="content" id="content">
        <div>
            <div>
                <span>出入库单据类型:</span>
                <span>{{ detail.kindName }}</span>
            </div>
            <div>
                <span>单据类型:</span>
                <span>{{ detail.typeName }}</span>
            </div>
            <div>
                <span>创建日期:</span>
                <span>{{ detail.createDate }}</span>
            </div>
        </div>
        <div>
            <div>
                <span>单号:</span>
                <span>{{ detail.ticketCode }}</span>
            </div>
            <div>
                <span>状态:</span>
                <span>{{ detail.stateName }}</span>
            </div>
            <div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        detail: {
            type: Object,
        }
    },
    data() {
        return {
            note: '',
            warehouseName: '',
        }
    },
    methods: {
        querySearchAsync() {

        },
        handleSelect() {

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
    & > div:nth-child(2) {
        & > div {
            display: flex;
            align-items: center;
        }
    }
}
</style>