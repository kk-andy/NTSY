<template>
    <div class="main">
        <el-row type="flex" class="row-bg search-head" justify="space-around">
            <el-col :span="5" >
                <div class="grid-content bg-purple">
                    <span>站点:</span>
                    <el-select v-model="search.siteCode" filterable multiple clearable collapse-tags placeholder="请选择">
                    <el-option
                        v-for="item in siteCodeList"
                        :key="item.dicValue"
                        :label="item.dicValue"
                        :value="item.dicValue"
                        ></el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="5" >
                <div class="grid-content bg-purple">
                    <span>店铺:</span>
                    <el-select v-model="search.shop" filterable clearable multiple collapse-tags placeholder="请选择">
                    <el-option
                        v-for="item in shopList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        ></el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="5" >
                <div class="grid-content bg-purple">
                    <span>状态:</span>
                    <el-select v-model="search.state" clearable  placeholder="请选择">
                    <el-option
                        v-for="item in typeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        ></el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="8" >
                <div class="grid-content bg-purple min-select">
                    <span></span>
                    <el-select v-model="searchKey"    placeholder="请选择">
                    <el-option
                        v-for="item in searchList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-input v-model="search.searchWord" clearable placeholder="搜索内容">
                        <i slot="suffix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <Header>
            <el-button @click="exportData" v-if="showButtons.exportData">导出</el-button>
            <el-button type="primary" class="btn_button_primary" @click="doReset" >重置</el-button>        
            <el-button type="primary" class="btn_button_primary" @click="doFilter">搜索</el-button>   
        </Header>
        <div v-if="tableData.length">
            <table-content :tableData="tableData" @sortChange="sortChange"/>
            <change-page :page="page" :total="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"  />
        </div>
        <no-data-content v-else />
  </div>
</template>
<script>
import TableContent from "./components/TableContent";
import NoDataContent from "@/components/NoDataImages";
import { getStaffIdSession, getStaffNameSession } from '@/utils/auth'
import { mixin } from "@/mixins/common";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
    mixins: [ mixin ],
    components: {
        TableContent,
        NoDataContent
    },
    computed: {
        ...mapState({
            tableData: state => state.DeliveryManagement.tableData,
            total: state => state.DeliveryManagement.total,
            searchList: state => state.DeliveryManagement.searchList,
            showButtons: state => state.DeliveryManagement.showButtons,
            typeList: state => state.DeliveryManagement.typeList
        }),
        ...mapGetters(['siteCodeList', 'shopList'])
    },
    data() {
        return {
            search: {
                siteCode: '',
                state: '',
                shop: '',    
                searchWord: ''
            },
            orderSort: 'asc',
            searchKey: 'orderNid',
            params: {},
        }
    },
    methods: {
        // ...mapActions(['getShopList']),
        getData() {
            this.params = {
                current_page: this.page.currentPage,
                per_page: this.page.size,
                site: this.search.siteCode ? this.search.siteCode.join(',') : '',
                shopId: this.search.shop ? this.search.shop.join(',') : '',
                state: this.search.state,
                sort: this.orderSort
            }
            if (this.searchKey) {
                this.params[this.searchKey] = this.search.searchWord
            }  
            this.$store.dispatch('DeliveryManagement/getData', this.params)
        },
        sortChange(item) {
            console.log(111111)
            this.orderSort = item.order === 'ascending' ? 'asc' : 'desc'
            this.page.currentPage = 1
            this.getData()
        },
        getShopList() {
            let params = {
                staffId: getStaffIdSession(),
                staffName: getStaffNameSession()
            }
            this.$store.dispatch('getShopList', params)
        },
        /* 导出 */
        exportData() {
            let params = {
                site: this.search.siteCode ? this.search.siteCode.join(',') : '',
                shopId: this.search.shop ? this.search.shop.join(',') : '',
                state: this.search.state
            }
            if (this.searchKey) {
                params[this.searchKey] = this.search.searchWord
            }  
            this.$store.dispatch('DeliveryManagement/exportData', params)
        },
    },
    created() {
        let id = this.$getMenuId(sessionStorage.getItem("munuIdList"), this.$route.path);
        this.$store.dispatch('DeliveryManagement/getButtonList', { id })
        this.getShopList()
        this.getData()
    }
}
</script>
<style lang="scss" scoped>
.main {
    Header {
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        padding: 10px 0;
        button {
            margin-left: 5px;
        }
    }
}
</style>