<template>
    <el-dialog
      :visible.sync="modal_bool"
      title="更多信息"
      :close-on-click-modal="false"
      :before-close="() => confirm(false)"
      width="40%"
      class-name="vertical-center-modal"
    >
        
        <el-form :inline="true"  ref="form" :model="form" class="demo-form-inline" label-width="100px">
            <div>
                <div>
                    <el-form-item label="产品尺寸:" >
                        <el-input  placeholder="长" style="width: 100px;" maxlength="255" v-model="form.length" oninput="value=value.replace(/[^0-9.]/g,'')" />
                    </el-form-item>
                    <el-form-item label=""  label-width="0">
                        <el-input  placeholder="宽" style="width: 100px;" maxlength="255" v-model="form.width" oninput="value=value.replace(/[^0-9.]/g,'')" />
                    </el-form-item>
                    <el-form-item label="" label-width="0">
                        <el-input  placeholder="高" style="width: 100px;" maxlength="255" v-model="form.height" oninput="value=value.replace(/[^0-9.]/g,'')" />
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="产品重量:" prop="classCategory">
                        <el-input  placeholder="" style="width: 320px;" maxlength="255" v-model="form.weight" oninput="value=value.replace(/[^0-9.]/g,'')" />
                        <span>Kg</span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="bracode:" prop="classCategory">
                        <el-input  placeholder="" style="width: 320px;" maxlength="255" v-model="form.bracode" />
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="备注:" prop="classCategory">
                        <el-input  placeholder="" style="width: 320px;" maxlength="255" v-model="form.note" />
                    </el-form-item>
                </div>
            </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" class="btn_button_primary" @click="confirm(true)">确定</el-button>
            <el-button type="primary" class="btn_button_primary" @click="confirm(false)">取消</el-button>
        </span>
    </el-dialog>
</template>
<script>
export default {
    name: 'settingInfoModal',
    props: {
        modal_info: {
            type: Boolean,
            default: false
        },
        form: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            modal_bool: this.modal_info,            
        }
    },
    methods: {
        confirm(bool=false) {
            if (!bool) {
                this.form.price = ''
                this.form.salePrice = ''
                this.$emit('action-modal-content',bool)
                return
            }
            this.$emit('action-modal-content',this.form)
        }
    }
}
</script>
<style lang="scss" scoped>
.el-dialog__wrapper {
    .first_content{
        border-bottom: 1px solid #ededed;
        padding-bottom: 5px;
    }
    .row-bg{
        margin-bottom: 10px;
    }
    .grid-content{
        text-align: center;
        line-height: 36px;
        .title{
            font-weight: bold;
            color: #333;
        }
    }
}
</style>