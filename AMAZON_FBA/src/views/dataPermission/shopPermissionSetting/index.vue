<template>
    <div class="main">
        <el-row type="flex" class="row-bg search-head" justify="space-around">
            <el-col :span="6" >
                <div class="grid-content bg-purple">
                    <span>用户名称:</span>
                    <el-input suffix-icon="el-icon-search" v-model="search.userName" />
                </div>
            </el-col>
			<el-col :span="6" >
                <div class="grid-content bg-purple">
                    <span>店铺名称:</span>
                    <el-input suffix-icon="el-icon-search" v-model="search.shopName" />
                </div>
            </el-col>
			<!-- <el-col :span="6" >
                <div class="grid-content bg-purple">
                    <span>用户店铺权限:</span>
                    <el-select v-model="search.userPermission" placeholder="请选择" clearable>
                        <el-option
                        v-for="(item, index) in options"
                        :key="item.value"
                        :label="item.value"
                        :value="index">
                        </el-option>
                    </el-select>
                </div>
            </el-col> -->
            <el-col :span="6" >
                <!-- <div class="grid-content bg-purple btn-no-span">
                    <search-btn-group @doFilter="doFilter" @doReset="doReset" />
                </div> -->
            </el-col>
            <!-- <el-col :span="6" v-for="item in 2" :key="item">     
            </el-col> -->
        </el-row>
        <Header>
            <!-- <el-button @click="addRole" type="primary">新增店铺权限</el-button> -->
            <div>
                <search-btn-group @doFilter="doFilter" @doReset="doReset" />
            </div>
        </Header>
        <div v-if="tableData.length">
           <table-content 
           @editShop="editShop"
           :showEdit="showButtons.edit"
           @deleteData="deleteData"
           :tableData="tableData"
            />
            <change-page :page="page" :total="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"  />
        </div>
        <no-data-content v-else />
        <transition name="fade-transform" mode="out-in"> 
            <add-shop-role 
            @handleSubmit="handleSubmit"
            :OAUserList="OAUserList"
            :roleList="roleList"
            :disable="disable"
            :showModuleParent="shopRoleModal" 
            v-if="shopRoleModal" 
            :parentForm="parentForm" 
            :shopList="allShopList" />
        </transition>
    </div>
</template>
<script>
import { mixin } from '@/mixins/common'
import TableContent from './components/tableConent'
import NoDataContent from '@/components/NoDataImages'
import AddShopRole from './components/AddShopRole'
import { getStaffIdSession, getStaffNameSession } from '@/utils/auth'
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
    mixins: [ mixin ],
    components: {
        TableContent,
        NoDataContent,
        AddShopRole
    },
    data() {
        return {
            search: {
               userName: '',
               shopName: '',
               userPermission: '全部数据'
            },
            staffId: '',
            disable: false,
            recordId: '',
            params: {},
        }
    },
    computed: {
        ...mapState({
            options: state => state.shopPermissionSetting.options,
            OAUserList: state => state.common.OAUserList,
            tableData: state => state.shopPermissionSetting.tableData,
            showButtons: state => state.shopPermissionSetting.showButtons,
            shopRoleModal: state => state.shopPermissionSetting.shopRoleModal,
            parentForm: state => state.shopPermissionSetting.parentForm,
            roleList: state => state.shopPermissionSetting.roleList,
            total: state => state.shopPermissionSetting.total,
            allShopList: state => state.common.allShopList
        }),
        // ...mapGetters(['allShopList']),
    },
    methods: {
        getData() {
            this.params = {
                current_page: this.page.currentPage,
                per_page: this.page.size,
                staffName: this.search.userName,
                shopName: this.search.shopName,
                // isEmpty: this.search.userPermission
            }
            this.$store.dispatch('shopPermissionSetting/getData', this.params)
        },
        ...mapActions(['getOAUserList', 'getAllShop']),
        deleteData(relationId) {
            let params = this.params
            this.$store.dispatch('shopPermissionSetting/delShopRole', { relationId, params })
        },
        addRole() {
            this.disable = false
            this.$store.commit('shopPermissionSetting/CHANGE_MODAL_TYPE', true)
        },
        /* 添加店铺 */
        handleSubmit(data) {
            let params = this.params
            // if (!this.disable) { /* 新增 */
            //     this.$store.dispatch('shopPermissionSetting/addShopRole', { data, params })
            // } else { /* 编辑 */
                data.relationId = this.recordId
                data.staffId = this.staffId
                this.$store.dispatch('shopPermissionSetting/updateShopRole', { data, params })
            // }
            
        },
        /* 编辑店铺 */
        editShop(item) {
            this.disable = true
            this.staffId  = item.staffId
            this.recordId = item.relationId
            let data = {
                remark: item.remark,
                shopModelList: item.shopModelList.map(item => item.value),
                staffName: item.staffName
            }
            this.$store.commit('shopPermissionSetting/CAHNGE_PARENT_FORM', data)
            this.$store.commit('shopPermissionSetting/CHANGE_MODAL_TYPE', true)
        }
    },
    async created() {
        await this.getData()
        let id = this.$getMenuId(sessionStorage.getItem("munuIdList"), this.$route.path);
        await this.$store.dispatch('shopPermissionSetting/getButtonList', { id })
        // this['shopPermissionSetting/getRoleList']()
        this.getAllShop()
        this.getOAUserList()
        
    }
}
</script>
<style lang="scss" scoped>
.main {
    Header {
        padding: 15px 0;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
    }
}
</style>