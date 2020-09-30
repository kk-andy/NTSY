<template>
    <div class="target-modal">
        <div :class="{'overscoll': targetValueList.length > 2}">
            <div v-for="(item, index) in targetValueList" :key="index">
                <div class="content-head">
                    <span>负责人:</span>
                    <span>{{item.name}}</span>
                    <el-input style="width:100px" v-model="item.target" maxlength="5" oninput="value=value.replace(/[^\d]/g,'')" ></el-input>
                </div>
                <div class="conent-center">
                    <div v-for="(ele, i) in item.list" :key="i">
                        <span>{{ele.name}}</span>
                        <el-input style="width:80px" v-model="ele.value" maxlength="5" oninput="value=value.replace(/[^\d]/g,'')" ></el-input>
                    </div>
                </div>
            </div>         
        </div>
    </div>
</template>
<script>
export default {
    props: {
        targetValueList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            
        }
    }
}
</script>
<style lang="scss" scoped>
.target-modal{
    & > div {
        & > div {
            border-bottom: 1px solid #ddd;
        }
    }
    .overscoll{
        height: 400px;
        overflow-y: scroll;
    }
    .content-head {
        margin: 10px 0;
        span:nth-child(2) {
            margin-right: 15px;
        }
    }
    .conent-center {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-left: 45px;
        & > div {
            display: flex;
            align-items: center;
            margin-right: 15px;
            margin-bottom: 15px;
            & > span {
                width: fit-content;
                min-width: 100px;
                margin-right: 10px;
            }
        }
    }
}
</style>