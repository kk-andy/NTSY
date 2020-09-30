<template>
    <div class="main">
        <el-row type="flex" class="row-bg search-head" justify="space-around">
            <el-col :span="6" >
                <div class="grid-content bg-purple">
                    <span>商品名称:</span>
                    <el-input v-model="search.skuName" clearable placeholder="模糊搜索" />
                </div>
            </el-col>
            <el-col :span="6" >
                <div class="grid-content bg-purple">
                    <span> SKU:</span>
                    <el-input v-model="search.sku" clearable placeholder="请输入" />
                    <!-- <span>商品状态:</span>
                    <el-select v-model="search.productType" filterable clearable  placeholder="全部仓库">
                    <el-option
                        v-for="item in productTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        ></el-option>
                    </el-select> -->
                </div>
            </el-col>
            <el-col :span="6" >
                <div class="grid-content bg-purple">
                    <span>供应商名称:</span>
                    <el-input v-model="search.supplierName" clearable placeholder="搜索内容" />
                </div>
            </el-col>        
            <el-col :span="6" >
                <div class="grid-content bg-purple">
                    <span>仓库:</span>
                    <el-autocomplete
                        v-model="search.warehouseName"
                        :fetch-suggestions="querySearchAsync"
                        value-key="whouseName"
                        placeholder="请输入内容"
                        @select="handleSelect"
                    ></el-autocomplete>
                </div>
            </el-col>
        </el-row>
        <el-row type="flex" class="row-bg search-head" justify="space-around">
            <!-- <el-col :span="6">
                <div class="grid-content bg-purple">
                    <span> SKU:</span>
                    <el-input v-model="search.sku" clearable placeholder="请输入" />
                </div>
            </el-col> -->
            <el-col :span="6" v-for="item in 3" :key="item">
                <!-- <div class="grid-content bg-purple">
                    <span>SKU:</span>
                    <el-input v-model="search.sku" clearable placeholder="" />
                </div> -->
            </el-col>
            <el-col :span="6" >
                <div class="grid-content bg-purple btn-no-span">
                    <search-btn-group @doFilter="doFilter" @doReset="doReset" />
                </div>
            </el-col>
        </el-row>
        <div v-if="tableData.length">
           <table-conent :tableData="tableData" />
            <change-page :page="page" :total="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"  />
        </div>
        <no-data-content v-else />
    </div>
</template>
<script>
import TableConent from './components/StockDataTable'
import NoDataContent from '@/components/NoDataImages'
import { getSearchWarehourseList } from '@/api/WarehouseManagement'
import { debounce } from '@/utils/common'
import { mixin } from '@/mixins/common'
import { mapState, mapGetters } from 'vuex'
export default {
    mixins: [ mixin ],
    components: {
        TableConent,
        NoDataContent
    },
    computed: {
        ...mapState({
            tableData: state => state.StockData.tableData,
            total: state => state.StockData.total,
            seatchTyleList: state => state.StockData.seatchTyleList,
            productTypeList: state => state.StockData.productTypeList
        }),
        ...mapGetters(['warehouseList'])
    },
    data() {
        return {
            search: {
                productType: '',
                supplierName: '',
                warehouseName: '',
                warehouseId: '',
                sku: '',
                skuName: '',
                searchWord: ''
            },
            list: [],
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
        getData() {
            this.params = {
                current_page: this.page.currentPage,
                per_page: this.page.size,
                supplier: this.search.supplierName,
                sku: this.search.sku,
                skuName: this.search.skuName,
                warehouseId: this.search.warehouseId
            } 
            this.$store.dispatch('StockData/getData', this.params)
        },
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
        }
    },
    created() {
        this.getData()
    }
}
</script>
<style scoped lang="scss">
.main {
    Header {
        display: flex;
        flex-direction: row-reverse;
        margin: 15px 0;
        button {
            margin-left: 15px;
        }
    }
}
</style>