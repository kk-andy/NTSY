<template>
    <div>
        <el-button @click="handleClick(0)">返回</el-button>
        <!-- <el-button class="btn_button_primary" type="primary" @click="handleClick(1)" v-if="state === 1 || state ===3">审核</el-button>  -->
        <el-button @click="handleClick(2)" v-if="state === 1 || state === 0 || state ===3 ">保存</el-button>    
        <el-button @click="handleClick(3)" v-if="state === 1 || state ===3">作废</el-button>
        <el-button @click="handleClick(4)">导出</el-button>
        <el-button @click="handleClick(5)" v-if="state === 1 || state === 0 || state ===3 ">下载导入模板</el-button>
        <upload-excel @handleImageSuccess="handleImageSuccess" :uploaddUrl="uploaddUrl" :data="data"  :transfer="transfer" v-if="state === 1 || state === 0 || state ===3 " />
    </div>
</template>
<script>
import UploadExcel from '@/components/Upload/uplaodExcel' 
export default {
    name: 'ActionsGroup',
    props: {
        uploaddUrl: {
            type: String,
            default: ''
        },
        data: {
            type: Object,
        },
        state: {
            type: Number,
            default: 0
        },
        transfer: {
            type: Boolean,
            default: false
        }
    },
    components: {
        UploadExcel
    },
    methods: {
        handleClick(flag) {
            this.$emit('handleClick', flag)
        },
        handleImageSuccess(res) {
            this.$emit('handleImageSuccess', res)
        }
    }
}
</script>
<style scoped lang="scss">
    div {
        display: flex;
        // margin-top: 25px;
        flex-direction: row-reverse;
        padding: 20px 0;
        align-items: center;
        button {
            margin-right: 5px;
        }
         div {
            display: flex;
            align-items: center;
         }
        .btn_button_primary {
            margin-right: 5px;
        }
    }
</style>