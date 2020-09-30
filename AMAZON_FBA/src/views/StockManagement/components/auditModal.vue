<template>
    <el-dialog
        title="审核盘点单"
        :visible.sync="showModule"
        @close="handleSubmit(false)"
        width="40%"
        top="3%"
        :close-on-click-modal="false"
    >
        <div class="add-content">
            <div>
                <el-radio-group v-model="state">
                    <el-radio :label="0">审核成功</el-radio>
                    <el-radio :label="1">审核失败</el-radio>
                </el-radio-group>
            </div>
        </div>
        <!-- <div class="remake">
            <span>备注:</span>
            <el-input type="textarea" v-model="remark" :rows="3"/>
        </div> -->
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
    name: 'AddLocaltionModal',
    props: {
        auditModal: {
            type: Boolean,
            default: false
        },
        auditRemark: {
            type: String,
            default: ''
        },
        auditState: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            state: this.auditState,
            remark: this.auditRemark,
            showModule: this.auditModal
        }
    },
    watch: {
        state(val) {
            this.$emit('Inventory/CHANGE_AUDIT_STATE', val)
        },
        remark(val) {
            this.$emit('Transfers/CHANGE_AUDIT_REMARK', val)
        }
    },
    methods: {
        handleSubmit(flag) {
            if (!flag) {
                this.showModule = false
                this.$store.commit('Inventory/CLOSR_AUDIT_MODAL', flag)
                this.state = 0
                return false
            }
            // if (!this.remark) {
            //     message('warning', '请填写备注')
            //     return
            // }
            this.$emit('handleSubmit', this.state)
        }
    },
}
</script>
<style scoped lang="scss">
.add-content {
    display: flex;
    justify-content: center;
    height:160px;
    align-items: center;
    // margin-bottom: 100px;
    & > div {
        display: flex;
        align-items: center;
    }
}
.remake {
    display: flex;
    margin-bottom: 15px;
    span {
        width: 80px;
        text-align: right;
        padding-right: 15px;
    }
}
.btn {
    text-align: center;
}
</style>