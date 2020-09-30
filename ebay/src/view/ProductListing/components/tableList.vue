<template>
    <div>
        <ul v-if="status">
            <li v-for="item in feeResults" :key="item.name">   
                <p>{{item.Name}}</p>   
                <p>{{item.Fee}}</p>     
            </li>       
        </ul>
        <p>警告信息：</p>
        <div class="content" :class="{'overflow-scroll': Warnings.length + Errors.length > 10}">
            <p v-for="item in Warnings" :key="item">{{item}}</p>
            <p v-for="item in Errors" :key="item">{{item}}</p>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        status: {
            type: Boolean,
            default: () => false
        },
        feeResults: {
            type: Array,
            default: () => []
        },
        Warnings: {
            type: Array,
            default: () => []
        },
        Errors: {
            type: Array,
            default: () => []
        }
    }
}
</script>
<style lang="scss" scoped>
div {
    ul {
        width: 100%;
        li {
            border: 1px solid #ccc;
            height: 36px;
            line-height: 36px;
            display: flex;
            align-items: center;
            p {
                width: 50%;
                text-align: center;
            }
            & > p:nth-child(1) {
                border-right: 1px solid #ccc;
            }
        }
    }
    & > p {
        margin: 15px 0
    }
    & > div.content {
        border: 1px solid #ccc;
        min-height: 86px;
        margin-bottom: 15px;
        text-align: center;
    }
    & > div.overflow-scroll{
        height: 320px;
        overflow-y: scroll;
    }
}

</style>