<template>
    <div class="content" id="content">
        <div>
            <div>
                <span>调拨单号:</span>
                <span>{{ detail.transferCode }}</span>
            </div>
            <div>
                <span>调拨日期:</span>
                <span>{{ detail.createDate }}</span>
            </div>
            <div>
                <span>调出仓库:</span>
                <span>{{ detail.sourceWhouseName }}</span>
            </div>
        </div>
        <div>
            <div>
                <span>调入仓库:</span>
                <span>{{ detail.distWhouseName }}</span>
            </div>
            <div>
                <span>备注:</span>
                <el-input v-model="detail.remark" clearable placeholder="请输入" maxlength="300"  show-word-limit type="textarea" />
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