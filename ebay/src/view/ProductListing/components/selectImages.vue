<template>
    <div class="">
        <el-checkbox v-model="checkAll" @change="checkAllBox">全选</el-checkbox>
        <div class="select-image-main">
            <div v-for="item in imgsList" :key="item.url">
                <img :src="item.url" alt="" @click="handlePictureCardPreview(item.url)">
                <el-checkbox v-model="item.select" @change="checkBOx"></el-checkbox>
            </div>
        </div>    
    </div>
</template>
<script>
export default {
    name: 'SelectImages',
    data() {
        return {
            checkAll: false
        }
    },
    props: {
        imgsList: {
            type: Array,
            default: []
        }
    },
    methods: {
        handlePictureCardPreview(src) {
            window.open(src)
        },
        checkBOx() {
            let flag = true
            this.imgsList.forEach(item => {
                if (!item.select) {
                    flag = false
                }
            })
            this.checkAll = flag
        },
        checkAllBox() {
            if (this.checkAll) {
               this.imgsList.forEach(item => {
                   item.select = true
               })
           } else {
               this.imgsList.forEach(item => {
                   item.select = false
               })
           }
        }
    }
}
</script>
<style scoped lang="scss">
.select-image-main {
    display: flex;
    flex-wrap: wrap;
    & > div {
        width: 150px;
        border: 1px solid #dedede;
        border-radius: 6px;
        min-height: 150px;
        position: relative;
        text-align: center;
        margin-bottom: 10px;
        margin-right: 10px;
        img {
            width: 99%;
            height: 150px;
            cursor: pointer;
        }
        .el-checkbox{
            position: absolute;
            right: 0;
            top: -2px;           
        }
    }
}
</style>
<style lang="scss">
.select-image-main {
    & > div {
        .el-checkbox{        
            & > span {
                span {
                    width: 18px;
                    height: 18px;
                }
            }
        }
    }
}
</style>