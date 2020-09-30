<template>
    <el-dialog
        title="新增店铺仓库绑定关系"
        :visible.sync="showModule"
        class='shopAndwarhourse'
        @close="handleSubmit(false)"
        width="600px"
        top="5%"
        :close-on-click-modal="false"
    >   
        <div>
            <el-form :model="form" ref="form" :rules="rules"  label-width="100px" class="demo-ruleForm" >
                <el-form-item label="店铺:" prop="shopId">
                    <el-select v-model="form.shopId" :placeholder="placeholder" filterable clearable disabled>
                        <el-option v-for="item in shopList" :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="站点:" prop="site">
                    <el-select v-model="form.site" :placeholder="placeholder" filterable clearable disabled>
                        <el-option v-for="item in siteCodeList" :label="item.dicName" :value="item.dicValue" :key="item.dicValue"></el-option>
                    </el-select>
                </el-form-item>        
                <el-form-item label="虚拟仓:" prop="virtId">
                    <el-select v-model="form.virtId" :placeholder="placeholder" filterable clearable >
                        <el-option v-for="item in warehouseList" :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="中转仓:" prop="transferId">
                    <el-select v-model="form.transferId" :placeholder="placeholder" filterable clearable >
                        <el-option v-for="item in transitWarehoureList" :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="空运过渡仓:" prop="airTransitionId">
                    <el-select v-model="form.airTransitionId" :placeholder="placeholder" filterable clearable >
                        <el-option v-for="item in airTransition" :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="海运过渡仓:" prop="seaTransitionId">
                    <el-select v-model="form.seaTransitionId" :placeholder="placeholder" filterable clearable >
                        <el-option v-for="item in seaTransition" :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>    
            </el-form>
        </div>
        <div class="btn">
            <el-button @click="handleSubmit(false)">取消</el-button>
            <el-button class="btn_button_primary" type="primary" @click="handleSubmit('form')">保存</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
    props: {
        showBandingModal: {
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
        warehouseList: {
            type: Array,
            default: () => []
        },
        transitWarehoureList: {
            type: Array,
            default: () => []
        },
        seaTransition: {
            type: Array,
            default: () => []
        },
        airTransition: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        ...mapGetters(['siteCodeList'])
    },
    watch: {
        form: {
            handler(val) {
                this.$store.commit('WerhourseAndShop/CAHNGE_PARENT_FORM', val)
            },
            deep: true
        }
    },
    data() {
        return {
            showModule: this.showBandingModal,
            placeholder: '请选择, 单选',
            form: this.parentForm,
            rules: {
                virtId: [
                    { required: true, message: '请选择虚拟仓', trigger: 'change' }
                ],
                transferId: [
                    { required: true, message: '请选择中转仓', trigger: 'change' }
                ],
                airTransitionId: [
                    { required: true, message: '请选择空运过渡仓', trigger: 'change' }
                ],
                seaTransitionId: [
                    { required: true, message: '请选择海运过渡仓', trigger: 'change' }
                ],
                site: [
                    { required: true, message: '请选择站点', trigger: 'change' }
                ],
                shopId: [
                    { required: true, message: '请选择店铺', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        handleSubmit(flag) {
            if (!flag) {
                this.showModule = false
                this.$refs['form'].resetFields();
                this.$store.commit('WerhourseAndShop/CHANGE_MODAL_TYPE', false)
                this.$store.commit('WerhourseAndShop/CAHNGE_PARENT_FORM')
                return
            }
            this.$refs[flag].validate((valid) => {
                if (!valid) {
                    return false;
                }
                let shopName = this.shopList.find(item => item.value === this.form.shopId).label
                this.form.shopName = shopName
                this.$emit('chandleSubmit', this.form)
            });
        },
        
    },
    created() {
        
    }
}
</script>
<style lang="scss" scoped>
.btn {
    text-align: center;
}
.shopAndwarhourse{
    .el-form >>> .el-select {
        width: 320px;
    }
}
</style>