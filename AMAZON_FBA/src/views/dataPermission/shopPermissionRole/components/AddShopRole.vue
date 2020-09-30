<template>
    <el-dialog
        title="新增店铺权限角色"
        :visible.sync="showModule"
        @close="handleSubmit(false)"
        width="40%"
        top="3%"
        :close-on-click-modal="false"
    >
        <div>
            <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="角色名称:" prop="roleName">
                    <el-input v-model="form.roleName" style="width: 200px" :disabled="disable" maxlength="30" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="备注:">
                    <el-input v-model="form.remark" type="textarea"  maxlength="300" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="店铺权限:" prop="shopModelList">
                    <el-select v-model="form.shopModelList" placeholder="请选店铺" clearable multiple filterable style="width: 100%">
                    <el-option v-for="item in shopList" :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
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
        parentForm: {
            type: Object,
            required: true
        },
        shopList: {
            type: Array,
            default: () => []
        },
        disable: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            form: this.parentForm,
            rules: {
                roleName: [
                    { required: true, message: '角色名称必须填写' }
                ],
                shopModelList: [
                    { required: true, trigger: 'change', message: '店铺必须绑定', type: 'array'}
                ]
            },
            showModule: this.showModuleParent
        }
    },
    watch: {
        form: {
            handler(val) {
                this.$store.commit('shopPermissionRole/CAHNGE_PARENT_FORM', val)
            },
            deep: true
        }
    },
    methods: {
        handleSubmit(flag) {
            if (!flag) {
                this.showModule = false
                this.$refs['ruleForm'].resetFields();
                this.$store.commit('shopPermissionRole/CHANGE_MODAL_TYPE', false)
                this.$store.commit('shopPermissionRole/CAHNGE_PARENT_FORM')
                return

            }
            this.$refs['ruleForm'].validate((valid) => {
                if (!valid) {
                    return false;
                }
                // this.form.shopModelList = this.shopList.filter(item => this.form.shopModelList.includes(item.value))
                let data = {
                    shopModelList: this.shopList.filter(item => this.form.shopModelList.includes(item.value)),
                    remark: this.form.remark
                }
                if (!this.disable) { /* 编辑 */
                    data.roleName = this.form.roleName
                }
                this.$emit('handleSubmit', data)
            });
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