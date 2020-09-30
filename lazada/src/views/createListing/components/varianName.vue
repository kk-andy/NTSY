<template>
    <div>
        <p>
            <span  v-for="(ele, index) in lazadaTableHead" :key="index">{{ ele.label }}: {{ getName(ele, item) }}</span>
        </p>
        <span>支持png、jpg格式，最多上传8张图</span>
    </div>
</template> 
<script>
export default {
    name: 'VarantName',
    props: {
        item: {
            type: Object,
            required: true
        },
        lazadaTableHead: {
            type: Array,
            default: () => []
        }
    },
    watch: {
        item:(value) => {
            console.log(this.item)
        }
    },
    computed: {
        getName() {
            return function(ele, item) {
                // console.log(item[label])
                return item[ele.label]
            }
        }
    },
    data() {
        return {
            
        }
    },
    
}
</script>
<style lang="scss" scoped>
div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    P {
        span:nth-child(1) {
            margin-right: 40px;
        }
    }
        & > span:nth-child(2) {
            color: #ccc;
        }
}
</style>