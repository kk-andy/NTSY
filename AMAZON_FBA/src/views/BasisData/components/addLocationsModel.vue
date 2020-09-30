<template>
    <el-dialog
        title="新增库位"
        :visible.sync="showModule"
        @close="handleSubmit(false)"
        width="40%"
        top="3%"
        :close-on-click-modal="false"
    >
        <div class="add-content">
            <div>
                <span>新增库位数量</span>
                <el-input type="text" v-model.number="num" oninput="value=value.replace(/[^\d]/g,'')" />
            </div>
            <div>
                <span>所属仓库</span>
                <span>{{ warehouseName }}</span>
            </div>
        </div>
        <div class="btn">
            <el-button @click="handleSubmit(false)">取消</el-button>
            <el-button class="btn_button_primary" type="primary" @click="handleSubmit(true)">保存</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { message } from '@/utils/common'
export default {
    name: 'AddLocaltionModal',
    props: {
        showModuleParent: {
            type: Boolean,
            default: false
        },
        locationNumber: {
            required: true,
        },
        warehouseName: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            // form: {
            //     num: ''
            // },
            num: this.locationNumber,
            showModule: this.showModuleParent
        }
    },
    watch: {
        num(val) {
            this.$emit('change_location_num', val)
        }
    },
    methods: {
        handleSubmit(flag) {
            if (!flag) {
                this.showModule = false
                this.$emit('handleSubmit', flag)
                return
            }
            if (!this.num) {
                message('warning', '请输入库位数')
                return
            }
            if (this.num > 500) {
                message('warning', '库位数不能超过500')
                return
            }
            this.$emit('handleSubmit', this.num)
        }
    },
}
</script>
<style scoped lang="scss">
.add-content {
    display: flex;
    justify-content: center;
    margin-bottom: 100px;
    & > div {
        display: flex;
        align-items: center;
        & > span:nth-child(1) {
            margin-right: 10px;
            min-width: 100px;
            text-align: right;
        }
        & > span:nth-child(2) {
            display: inline-block;
            min-width: 200px;
            height: 36px;
            line-height: 36px;
            text-align: center;
            background-color: #ccc;
            border-radius: 3px;
            color: #fff;
        }
    }
}
.btn {
    text-align: center;
}
</style>