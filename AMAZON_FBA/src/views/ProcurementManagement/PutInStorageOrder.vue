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
                    <span>入库单状态:</span>
                    <el-select v-model="search.purchaseOrderStatus" filterable clearable  placeholder="请选择">
                    <el-option
                        v-for="item in GRNStatus"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        ></el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="5" >
                <div class="grid-content bg-purple">
                    <span>制单时间:</span>
                    <el-date-picker
                    v-model="search.date"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                    </el-date-picker>
                    <!-- <el-select v-model="search.purchaseOrderStatus" filterable clearable  placeholder="请选择">
                    <el-option
                        v-for="item in GRNStatus"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        ></el-option>
                    </el-select> -->
                </div>
            </el-col>
            <el-col :span="8" >
                <div class="grid-content bg-purple min-select">
                    <span></span>
                    <el-select v-model="searchKey" filterable   placeholder="请选择">
                    <el-option
                        v-for="item in searchList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-input v-model="search.searchWord" clearable placeholder="部分类型支持自动搜索和扫描搜索">
                        <i slot="suffix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </div>
            </el-col>
            
        </el-row> 
        <el-row>
            <el-col :span="6" v-for="item in 3" :key="item">
                <div class="grid-content bg-purple btn-no-span">
                    
                </div>
            </el-col>
            <el-col :span="6" >
                <div class="grid-content bg-purple btn-no-span">
                    <search-btn-group @doFilter="doFilter" @doReset="doReset" />
                </div>
            </el-col>
        </el-row>
        <div v-if="tableData.length">
            <put-in-storage-order-table :tableData="tableData" @invalid="invalid" :showButtons="showButtons"/>
            <change-page :page="page" :total="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"  />
        </div>
        <no-data-content v-else />
    </div>
</template>
<script>
import { mixin } from '@/mixins/common'
import PutInStorageOrderTable from './components/PutInStorageOrderTable'
import NoDataContent from '@/components/NoDataImages'
import { getSearchWarehourseList } from '@/api/WarehouseManagement'
import { message, debounce, confirmMsg, dateFormatT } from '@/utils/common'
import { mapState, mapGetters } from 'vuex'
export default {
    mixins: [ mixin ],
    components: {
        PutInStorageOrderTable,
        NoDataContent
    },
    computed: {
        ...mapState({
            tableData: state => state.PutInStorageOrder.tableData,
            total: state => state.PutInStorageOrder.total,
            GRNStatus: state => state.PutInStorageOrder.GRNStatus,
            showButtons: state => state.PutInStorageOrder.showButtons,
            searchList: state => state.PutInStorageOrder.searchList
        }),
    },
    data() {
        return {
            search: {
                purchaseOrderStatus: '',
                warehouseId: '',
                date: '',
                warehouseName: '',
                searchWord: ''
            },
            searchKey: 'purchaseId',
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
        },
        'search.searchWord': {
            handler(val) {
                if (this.searchKey !== 'inCode' && this.searchKey !== 'purchaser') {
                    this.page.currentPage = 1
                    this.getData()
                }
            }
        }
    },
    methods: {
       /* 获取仓库数据 */
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
        handleSelect(item) {
            this.search.warehouseName = item.whouseName
            this.search.warehouseId = item.whouseId
        },
        /* 获取数据 */
         getData() {
            this.params = {
                warehouseId: this.search.warehouseId, /* 仓库编号 */
                state: this.search.purchaseOrderStatus,
                current_page: this.page.currentPage,
                per_page: this.page.size,
            }
            if (this.search.date) {
                this.params.startDate = dateFormatT(this.search.date).start
                this.params.endDate = dateFormatT(this.search.date).end
            }
            this.params[this.searchKey] = this.search.searchWord
            this.$store.dispatch('PutInStorageOrder/getPurchaseInList', this.params)
        },
        /* 作废 */
        invalid(code) {
            let data = this.params
            confirmMsg('warning', '提示', '确认作废吗?', () => {
                this.$store.dispatch('PutInStorageOrder/dropPurchaseIn', { code, data })
            })
        }
    },
    async created() {
        let id = this.$getMenuId(sessionStorage.getItem("munuIdList"), this.$route.path);
        await this.$store.dispatch('PutInStorageOrder/getButtonList', { id })
        console.log(this.showButtons)
        this.getData()
    }
}
</script>
<style scoped lang="scss">

</style>