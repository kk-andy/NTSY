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
                <el-form-item label="用户名称:">
                    <span class="user-name">{{ form.staffName }}</span>
                    <!-- <el-select v-model="form.staffId" filterable clearable  placeholder="请选择" disabled>
                    <el-option
                        v-for="item in OAUserList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        ></el-option>
                    </el-select> -->
                </el-form-item>
                <!-- <el-form-item label="角色名称:" prop="roleName">
                    <el-select v-model="form.roleName" filterable clearable  placeholder="请选择">
                    <el-option
                        v-for="item in roleList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="备注:">
                    <el-input v-model="form.remark" type="textarea"  maxlength="300" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="店铺权限:" prop="shopModelList">
                    <el-select v-model="form.shopModelList" placeholder="请选店铺" clearable multiple collapse-tags filterable style="width: 100%">
                        <el-option  label="全选" value="all"></el-option>
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
        roleList: {
            type: Array,
            default: () => []
        },
        OAUserList: {
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
            idList: [],
            rules: {
                // staffId: [
                //     { required: true, trigger: 'change', message: '用户名称必须填写' }
                // ],
                // roleName: [
                //     { required: true, trigger: 'change', message: '角色名称必须填写' }
                // ],
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
                this.$store.commit('shopPermissionSetting/CAHNGE_PARENT_FORM', val)
            },
            deep: true
        },
        'form.shopModelList': {
            handler(val, oldVal) {
                console.log(oldVal, val)
                let allIdArr = []
                for (const argumentId of this.shopList) {
                    allIdArr.push(argumentId.value)
                }
                // 当前选中的有'全选'
                if (val.includes('all')) {
                    this.form.shopModelList = allIdArr
                    this.idList = allIdArr
                }
                console.log(val)
                // 旧数据包含'全选'，当前选中数据不包含全选
                if (oldVal.includes('all') && !val.includes('all')) {
                    this.idList = []
                }
                // 旧数据包含'全选'，当前选中数据包含全选
                if (oldVal.includes('all') && val.includes('all')) {
                    const index = val.indexOf('all')
                    this.idList.splice(index, 1) // 排除全选选项
                    console.log(val)
                }
                // 旧数据不包含'全选'，当前选中数据不包含'全选'
                if (!oldVal.includes('all') && !val.includes('all')) {
                    console.log(11)
                    // 除了全选外 其他全部选中时
                    if (val.length === val.length - 1) {
                        this.idList = ['all'].concat(valArr)
                    }
                }
                // 数据发生变化时保存数据，作为下次对比的旧数据                                                                    
            }
        }
    },
    methods: {
        handleSubmit(flag) {
            if (!flag) {
                this.showModule = false
                this.$refs['ruleForm'].resetFields();
                this.$store.commit('shopPermissionSetting/CHANGE_MODAL_TYPE', false)
                this.$store.commit('shopPermissionSetting/CAHNGE_PARENT_FORM')
                return

            }
            this.$refs['ruleForm'].validate((valid) => {
                if (!valid) {
                    return false;
                }
                // this.form.shopModelList = this.shopList.filter(item => this.form.shopModelList.includes(item.value))
                let data = {
                    shopModelList: this.shopList.filter(item => this.form.shopModelList.includes(item.value)),
                    remark: this.form.remark,
                    // roleName: this.roleList.find(item => item.value === this.form.roleName ).label
                }
                // if (!this.disable) { /* 编辑 */
                //     data.staffId = this.form.staffId
                //     data.staffName = this.OAUserList.find(item => item.id === this.form.staffId).name
                // }
                // console.log(data)
                // return
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
.user-name{
    display: inline-block;
    min-width: 250px;
    text-align: center;
    height: 36px;
    line-height: 36px;
    border-radius: 3px;
    background-color: #C0C4CC;
}
.btn {
    text-align: center;
}
</style>