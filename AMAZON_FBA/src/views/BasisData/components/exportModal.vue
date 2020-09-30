<template>
    <el-dialog
        title="库位导出"
        :visible.sync="showModule"
        @close="handleSubmit(false)"
        width="25%"
        top="10%"
        :close-on-click-modal="false"
    >
        <div class="edit-sku-info">
            <div>
                <span>导出数量:</span>
                <el-input v-model.number="num"  placeholder="" oninput="value=value.replace(/[^\d]/g,'')" />
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
import { mapState } from 'vuex'
export default {
    name: 'ExportLocation',
    computed: {
        
    },
    watch: {
        num(val) {
            this.$store.commit('WarehouseManagement/CHANGE_EXPORT_NUM', val)
        }
    },
    props: {
        showExportModule: {
            type: Boolean,
            default: false
        },
        exportNum: {
            default: 0
        }
    },
    data() {
        return {
            num: this.exportNum,
            showModule: this.showExportModule,
            list: [
                {
                    num: 500
                },
                {
                    num: 1000
                },
                {
                    num: 1500
                },
                {
                    num: 2000
                },
            ]
        }
    },
    methods: {
        handleSubmit(flag) {
            if (!flag) {
                this.showModule = false
                this.num = 0
                this.$store.commit('WarehouseManagement/CHANGE_EXPORT_NUM', 0)
                this.$store.commit('WarehouseManagement/CLOSE_EXPORT_MODAL', false)
                return
            }
            if (this.num === 0) {
                message('warning', '导出数量不要为0')
                return
            }
            this.$emit('downloLocaltion', this.num)
        },
    },
}
</script>
<style scoped lang="scss">
.edit-sku-info {
    padding: 20px;
    & > div {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        // justify-content: space-around;
        span {
            height: 36px;
            line-height: 36px;
        }
        & > span:nth-child(1) {
            min-width: 100px;
            text-align: right;
            margin-right: 10px;
        }
        & > span:nth-child(2) {
            min-width: 300px;
            background-color: #dfe6ec;
            padding-left: 10px;
            border-radius: 5px;
            color: #333;
        }
        .el-select {
            min-width: 300px;
        }
    }
}
.btn{
    text-align: center;
}
</style>
