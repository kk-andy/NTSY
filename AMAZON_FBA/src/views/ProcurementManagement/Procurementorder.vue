<template>
    <div class="main">
        <el-row type="flex" class="row-bg search-head" justify="space-around">
            <el-col :span="4" >
                <div class="grid-content bg-purple">
                    <span>仓库:</span>
                    <el-autocomplete
                        v-model="search.warehouseName"
                        clearable
                        :fetch-suggestions="querySearchAsync"
                        value-key="whouseName"
                        placeholder="请输入"
                        @select="handleSelect"
                    ></el-autocomplete>
                </div>
            </el-col>
            <el-col :span="5" >
                <div class="grid-content bg-purple">
                    <span>采购单状态:</span>
                    <el-select v-model="search.purchaseOrderStatus" filterable   placeholder="请选择">
                    <el-option
                        v-for="item in PurchaseorderList"
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
            <el-col :span="6" >
                <div class="grid-content bg-purple btn-no-span">
                    <search-btn-group @doFilter="doFilter" @doReset="doReset" />
                </div>
            </el-col>
        </el-row>  
        <div v-if="tableData.length">
            <procurementorder-table :tableData="tableData" :showButtons="showButtons"/>
            <change-page :page="page" :total="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"  />
        </div>
        <no-data-content v-else />
    </div>
</template>
<script>
import { mixin } from '@/mixins/common'
import procurementorderTable from './components/procurementorderTable'
import NoDataContent from '@/components/NoDataImages'
import { message, debounce } from '@/utils/common'
import { getSearchWarehourseList } from '@/api/WarehouseManagement'
import { mapState, mapGetters } from 'vuex'
export default {
    mixins: [ mixin ],
    components: {
        procurementorderTable,
        NoDataContent
    },
    computed: {
        ...mapState({
            tableData: state => state.Procurementorder.tableData,
            total: state => state.Procurementorder.total,
            showButtons: state => state.Procurementorder.showButtons,
            PurchaseorderList: state => state.Procurementorder.PurchaseorderList
        }),
        ...mapGetters(['warehouseList', 'purchaseOrderList', 'searchList'])
    },
    data() {
        return {
            search: {
                purchaseOrderStatus: '',
                warehouseId: '',
                warehouseName: '',         
                searchWord: ''
            },
            searchKey: 'shipNumber',
            params: {},
        }
    },
    watch: {
        'search.warehouseName': {
            handler(val, oldval) {
              if (!val) {
                  this.search.warehouseId = ''
              }
            }
        }
    },
    methods: {
       /* 获取数据 */
        handleSelect(item) {
            this.search.warehouseName = item.whouseName
            this.search.warehouseId = item.whouseId
        },
        querySearchAsync(queryString, cb) {
             if (queryString) {
                 debounce(() => {
                    getSearchWarehourseList({ whouseName: queryString }).then(res => {
                        let results = res.data
                        cb(results)
                    })
                }, 500)
            } else {
                cb([])
            } 
        },
        getData() {
           this.params = {
                warehouseId: this.search.warehouseId, /* 仓库编号 */
                state: this.search.purchaseOrderStatus,
                current_page: this.page.currentPage,
                per_page: this.page.size
            } 
            this.params[this.searchKey] = this.search.searchWord
            this.$store.dispatch('Procurementorder/getPurchaseOrderList', this.params)
        }
    },
    created() {
        let id = this.$getMenuId(sessionStorage.getItem("munuIdList"), this.$route.path);
        this.$store.dispatch('Procurementorder/getButtonList', { id })
        this.getData()
    }
}
</script>
<style scoped lang="scss">

</style>