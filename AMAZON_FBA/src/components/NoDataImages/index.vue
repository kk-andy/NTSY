<template>
    <div class="no-data">
        <div>
            <img :src="img" alt="">
            <p>{{msg}}！！！</p>
        </div>  
    </div>
</template>
<script>
import noData from '@/assets/noData-images/nodata.png'
export default {
    props: {
        msg: {
            type: String,
            default: '当前未找到任何数据'
        }
    },
    data() {
        return {
            img: noData
        }
    }
}
</script>
<style scoped lang="scss">
.no-data {
    min-height: 550px;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
        img {
            width: 50%;
        }
        text-align: center;
        color: #ccc;
    }
}
</style>