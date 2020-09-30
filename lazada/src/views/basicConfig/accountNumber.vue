<template>
    <div class="main">
        <el-card>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="6" >
                    <div class="grid-content bg-purple">
                    <span>账号名:</span>
                    <el-select v-model="search.accountName" filterable clearable  placeholder="请选择">
                    <el-option
                        v-for="item in accountList"
                        :key="item"
                        :label="item"
                        :value="item"
                        ></el-option>
                    </el-select>
                    </div>
                </el-col>
                <el-col :span="6" >
                    <div class="grid-content bg-purple">
                    <span>店铺:</span>
                    <el-select v-model="search.shop" filterable multiple clearable  placeholder="请选择">
                    <el-option
                        v-for="item in noPermissonShops"
                        :key="item.id"
                        :label="item.shop_name"
                        :value="item.id"
                        ></el-option>
                    </el-select>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                    <span>状态:</span>
                    <el-select v-model="search.status" filterable clearable placeholder="请选择">
                    <el-option
                        v-for="item in statusList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        ></el-option>
                    </el-select>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                    <span>创建人:</span>
                    <el-select v-model="search.creator" filterable clearable placeholder="请选择">
                    <el-option
                        v-for="item in sellerList"
                        :key="item.staff_id"
                        :label="item.staff_name"
                        :value="item.staff_id"
                        ></el-option>
                    </el-select>
                    </div>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">              
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                    <span>创建时间:</span>
                    <el-date-picker
                            v-model="search.create_time"
                            type="datetimerange"
                            clearable
                            style="width: 375px"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </el-col>    
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>店铺运输方式</span>
                        <el-select v-model="search.shippingMethod" filterable clearable placeholder="请选择">
                        <el-option
                            v-for="item in shopMethodsList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="6">
                    <search-btn-group @doFilter="doFilter" @doReset="doReset" />
                </el-col>    
            </el-row>
    </el-card>
    <div class="btn_group">
        <!-- <el-button type="primary" class="btn_button_primary_lone" @click="createNewAccount">新增账号</el-button> -->
    </div>
    <table-list :tableData="tableData" @edit="edit" :showEdit="showButtons.edit" />
    <change-page :page="page" :total="total"  @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"  />
    <el-dialog
      :visible.sync="modal_basic"
      :title="modal_title"
      :close-on-click-modal="false"
      :before-close="() => resetForm('form')"
      footer-hide
      width="40%"
      class-name="vertical-center-modal"
    >
        <el-form :model="form" :rules="rules" ref="form" maxlength="50"  :label-width="formLabelWidth">
            <el-form-item
                label="账号名:"
                style="width:100%"           
                prop="accountName"
                >
                <el-input style="width: 300px" v-model="form.accountName" disabled placeholder="请输入账号名称" clearable></el-input>
            </el-form-item>
            <el-form-item
                label="站点:"
                style="width:100%"
                prop="site"
                >
                <el-select v-model="form.site" style="width: 300px" filterable disabled  placeholder="请选择">
                    <el-option
                        v-for="item in siteList"
                        :key="item"
                        :label="item"
                        :value="item"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                label="token:"
                style="width:100%"
                prop="token"
                >
                <el-input v-model="form.token" style="width: 300px" maxlength="200" placeholder="token" clearable></el-input>
            </el-form-item>
            <el-form-item
                label="refresh_token:"
                style="width:100%"
                prop="refresh_token"
                >
                <el-input v-model="form.refresh_token" style="width: 300px" maxlength="200" placeholder="refresh_token" clearable></el-input>
            </el-form-item>
            <el-form-item
                label="店铺名称:"
                style="width:100%"
                prop="shop"
                >
               <el-input v-model="form.shop" style="width: 300px" disabled placeholder="请输入店铺名称" clearable></el-input>
            </el-form-item>
            <el-form-item
                label="销售员:"
                style="width:100%"
                prop="saller"
                >
                <el-select v-model="form.saller" style="width: 300px" filterable clearable placeholder="请选择">
                    <el-option
                        v-for="item in sellerList"
                        :key="item.staff_id"
                        :label="item.staff_name"
                        :value="item.staff_id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                label="状态:"
                style="width:100%"
                prop="statusCode"
                >
                <el-radio-group v-model="form.statusCode">
                    <el-radio :label="1">启用</el-radio>
                    <el-radio :label="0">禁用</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item
                label="店铺运输方式:"
                style="width:100%"
                prop="shippingMethod"
                >
                <el-radio-group v-model="form.shippingMethod">
                    <el-radio label="LGS">普通</el-radio>
                    <el-radio label="LGS_TH">陆运</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label-width="0px" class="button_form_group">
                <el-button type="primary" class="btn_button_primary" @click="submitForm('form')">确定</el-button>
                <el-button type="primary" class="btn_button_primary" @click="resetForm('form')">取消</el-button>
            </el-form-item>
        </el-form>
        <!-- <span slot="footer" class="dialog-footer">
            <el-button type="primary" class="btn_button_primary" @click="modal_operationlog = false">确定</el-button>
            <el-button type="primary" class="btn_button_primary" @click="modal_operationlog = false">取消</el-button>
        </span> -->
    </el-dialog>
    </div>
</template>
<script>
import TableList from './components/accountNumberTable'
import ChangePage from '@/components/page'
import {  message, dateFormatT, clearObjValue } from '@/utils/common'
import { mapState, mapGetters, mapActions } from 'vuex'
import { mixin } from '@/mixins/common'
export default {
    components: { TableList, ChangePage },
    mixins: [mixin],
    computed: {
        ...mapGetters(['operationLogList', 'distributionTitle', 'operationLogTitle','statusList', 'sellerList', 'noPermissonShops', 'siteList', 'shopMethodsList']),
        ...mapState({
            total: state => state.accountNumber.total,
            tableData: state => state.accountNumber.tableData,
            rules: state => state.accountNumber.rules,
            accountList: state => state.accountNumber.accountList,
            showButtons: state => state.accountNumber.showButtons
        }),
        modal_basic: {
            get() {
                return this.$store.state.accountNumber.modal_basic
            },
            set(val) {
                this.$store.state.accountNumber.modal_basic = val
            }
        },
        form: {
            get() {
                return this.$store.state.accountNumber.form
            },
            set(val) {
                this.$store.state.accountNumber.form = val
            },
            deep: true
        },
        modal_title: {
            get() {
                return this.$store.state.accountNumber.modal_title
            },
            set(val) {
                this.$store.state.accountNumber.modal_title = val
            }
        },
        account_id: {
            get() {
                return this.$store.state.accountNumber.account_id
            },
            set(val) {
                this.$store.state.accountNumber.account_id = val
            }
        }
    },
    data() {
        return {
            search: {
                accountName: '',
                creator: '',
                status: '',
                create_time: '',
                shippingMethod: '',
                shop: ''
            },
            params: {},
            creatorList: [],
            formLabelWidth: '125px',
        }
    },
    methods: {
        edit(account_id) {
            this.modal_title = '编辑账号'
            this.account_id = account_id
            this.$store.dispatch('accountNumber/getAccountInfo', { account_id })
        },
        /* 新增账号 */
        // createNewAccount() {
        //     this.modal_basic = true
        //     this.modal_title = '新增账号'
        // },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {           
                let data = {
                    account_id: this.account_id,
                    account_name: this.form.accountName,
                    access_token: this.form.token,
                    status: this.form.statusCode,
                    refresh_token: this.form.refresh_token,
                    seller_id: this.form.saller,
                    shop_name: this.form.shop,
                    site_code: this.form.site,
                    shipping_method: this.form.shippingMethod
                }
                let params = this.params
                this.$store.dispatch('accountNumber/editAccountInfo', { data, params })
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.modal_basic = false
            this.$refs[formName].resetFields();
        },
        getData() {
            this.params = {
                account_name: this.search.accountName,
                account_status: this.search.status,
                creator_id: this.search.creator,
                created_at_start: this.search.create_time  ? dateFormatT(this.search.create_time).start : '',
                created_at_end: this.search.create_time  ? dateFormatT(this.search.create_time).end : '',
                page: this.page.currentPage,
                per_page_num: this.page.size,
                shipping_method: this.search.shippingMethod,
                shop_id: this.search.shop
            }
            this.$store.dispatch('accountNumber/getData', this.params)
        },
        ...mapActions(['getSellerlist', 'getNoPermissionsShops', 'getSiteList', 'getShopMethod'])
    },
    created() {
        let id = this.$getMenuId(  sessionStorage.getItem("munuIdList"),this.$route.path);
        this.$store.dispatch('accountNumber/getButtonList', { id })
        this.getNoPermissionsShops()
        this.getSellerlist()
        this.getSiteList()
        this.getData()
        this.getShopMethod()
    }
}
</script>
<style lang="scss" >
.button_form_group{
    text-align: center;
    
}
</style>