<template>
    <div class="main">
        <el-row type="flex" class="row-bg search-head" justify="space-around">
            <el-col :span="6" >
                <div class="grid-content bg-purple">
                    <span>角色名称:</span>
                    <el-input suffix-icon="el-icon-search" v-model="search.roleName" />
                </div>
            </el-col>
            <el-col :span="6" >
                <div class="grid-content bg-purple btn-no-span">
                    <search-btn-group @doFilter="doFilter" @doReset="doReset" />
                </div>
            </el-col>
            <el-col :span="6" v-for="item in 2" :key="item">     
            </el-col>
        </el-row>
        <Header>
            <el-button @click="addRole" type="primary">新增角色</el-button>
        </Header>
        <div v-if="tableData.length">
           <table-content 
           @editShop="editShop"
           @deleteData="deleteData"
           :tableData="tableData"
            />
            <change-page :page="page" :total="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"  />
        </div>
        <no-data-content v-else />
        <transition name="fade-transform" mode="out-in"> 
            <add-shop-role 
            @handleSubmit="handleSubmit"
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
import { mapState, mapActions, mapGetters } from 'vuex'
import { getStaffIdSession, getStaffNameSession } from '@/utils/auth'
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
               roleName: '' 
            },
            disable: false,
            recordId: '',
            params: {},
        }
    },
    computed: {
        ...mapState({
            tableData: state => state.shopPermissionRole.tableData,
            shopRoleModal: state => state.shopPermissionRole.shopRoleModal,
            parentForm: state => state.shopPermissionRole.parentForm,
            total: state => state.shopPermissionRole.total,
            allShopList: state => state.common.allShopList
        }),
    },
    methods: {
        getData() {
            this.params = {
                current_page: this.page.currentPage,
                per_page: this.page.size,
                roleName: this.search.roleName
            }
            this.$store.dispatch('shopPermissionRole/getData', this.params)
        },
        ...mapActions(['getAllShop']),
        deleteData(relationId) {
            let params = this.params
            this.$store.dispatch('shopPermissionRole/delShopRole', { relationId, params })
        },
        addRole() {
            this.disable = false
            this.$store.commit('shopPermissionRole/CHANGE_MODAL_TYPE', true)
        },
        /* 添加店铺 */
        handleSubmit(data) {
            let params = this.params
            if (!this.disable) { /* 新增 */
                this.$store.dispatch('shopPermissionRole/addShopRole', { data, params })
            } else { /* 编辑 */
                data.recordId = this.recordId
                this.$store.dispatch('shopPermissionRole/updateShopRole', { data, params })
            }
            
        },
        /* 编辑店铺 */
        editShop(item) {
            this.disable = true
            this.recordId = item.recordId
            let data = {
                remark: item.remark,
                roleName: item.roleName,
                shopModelList: item.shopModelList.map(item => item.value)
            }
            this.$store.commit('shopPermissionRole/CAHNGE_PARENT_FORM', data)
            this.$store.commit('shopPermissionRole/CHANGE_MODAL_TYPE', true)
        }
    },
    created() {
        this.getData()
        this.getAllShop()
    }
}
</script>
<style lang="scss" scoped>
.main {
    Header {
        padding: 15px 0;
    }
}
</style>