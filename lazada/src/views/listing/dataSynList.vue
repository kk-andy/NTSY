<template>
    <div class="main">
        <el-card>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="6" >
                    <div class="grid-content bg-purple">
                    <span>SKU:</span>
                    <!-- <el-input v-model.trim="search.sku" :placeholder="placeholder" /> -->
                    <el-input type="textarea" resize="none" v-model="search.sku" :placeholder="placeholder" @keyup.enter.native="doFilter" />
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                    <span>Listing id:</span>
                    <!-- <el-input v-model.trim="search.listingId" :placeholder="placeholder" /> -->
                    <el-input type="textarea" resize="none" v-model="search.listingId" :placeholder="placeholder" @keyup.enter.native="doFilter" />
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                    <span>店铺:</span>
                    <el-select v-model="search.shop" filterable clearable placeholder="请选择">
                    <el-option
                        v-for="item in shopList"
                        :key="item.shop_id"
                        :label="item.shop_name"
                        :value="item.shop_id"
                        ></el-option>
                    </el-select>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                    <span>平台状态:</span>
                    <el-select v-model="search.platformStatus" filterable clearable placeholder="请选择">
                    <el-option
                        v-for="item in lazadaStatusList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                        ></el-option>
                    </el-select>
                    </div>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">  
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                    <span>同步状态:</span>
                    <el-select v-model="search.synchronousStatus" filterable clearable placeholder="请选择">
                    <el-option
                        v-for="item in syncStatusList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                        ></el-option>
                    </el-select>
                    </div>
                </el-col>            
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                    <span>同步时间:</span>
                    <el-date-picker
                            v-model="search.synchronousTime"
                            type="datetimerange"
                            style="width: 350px"
                            :editable="false"
                            clearable
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </el-col>  
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                    <span>同步事项:</span>
                    <el-select v-model="search.synchronousMatters" filterable clearable placeholder="请选择">
                    <el-option
                        v-for="item in syncList"
                        :key="item.value"
                        :label="item.name"
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
        <el-button type="primary" class="btn_button_primary_lone" @click="allAgainSynchronous" v-if="showButtons.allAgainSynchronous">批量重新同步</el-button>
    </div>
    <table-list 
    :tableData="tableData" 
    @againSynchronous="againSynchronous" 
    @handleSelectionChange="handleSelectionChange"
    :showSyncChronous="showButtons.againSynchronous"
     />
    <change-page :page="page" :total="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"  />
    </div>
</template>
<script>
import TableList from './components/dataSynListTable'
import ChangePage from '@/components/page'
// import operationLog from '@/components/operationLog'
import { confirmMsg, message, dateFormatT, selectSyncList } from '@/utils/common'
import { clearObjValue } from '@/utils/common.js'
import { mapState, mapGetters, mapActions } from 'vuex'
import { mixin } from '@/mixins/common'
export default {
    components: { TableList, ChangePage },
    mixins: [mixin],
    computed: {
        ...mapGetters(['placeholder', 'synchronousMattersList', 'shopList', 'lazadaStatusList', 'syncList']),
        ...mapState({
            total: state => state.dataSynList.total,
            logTotal: state => state.dataSynList.logTotal,
            tableData: state => state.dataSynList.tableData,
            syncStatusList: state => state.dataSynList.syncStatusList,
            showButtons: state => state.dataSynList.showButtons,
        }),
    },
    data() {
        return {
            search: {
                sku: '',
                listingId: '',
                shop: '',
                platformStatus: '',
                synchronousStatus: '',
                synchronousTime: '',
                synchronousMatters: ''
            },
            multipleSelection: [],
            data: {},
            creatorList: [],
        }
    },
    methods: {
        /* 重新同步 */
        againSynchronous(id) {
            this.SynchronousFunc({ id: [ id ] })
        },
        SynchronousFunc(data) {
            let params = this.data
            this.$store.dispatch('dataSynList/batchSync',{ data, params })
        },
        /* 全选反选 */
        handleSelectionChange(val) {
            this.multipleSelection  = val
        },
        /* 批量重新同步 */
        allAgainSynchronous() {
            if (!selectSyncList(this.multipleSelection)) {
                return
            }
            let data = { id: selectSyncList(this.multipleSelection) }
            this.SynchronousFunc(data)
        },
        ...mapActions(['getShopList', 'getLazadaStatusList', 'getSyncList']),
        getData() {
            this.data = {
                sku: this.search.sku,
                item_id: this.search.listingId,
                shop_id: this.search.shop,
                push_status: this.search.synchronousStatus,
                online_status: this.search.platformStatus,
                push_date_start: this.search.synchronousTime  ? dateFormatT(this.search.synchronousTime).start : '',
                push_date_end: this.search.synchronousTime  ? dateFormatT(this.search.synchronousTime).end : '',
                push_type: this.search.synchronousMatters,
                page: this.page.currentPage,
                per_page_num: this.page.size
            }
            this.$store.dispatch('dataSynList/getData', this.data)
        }
    },
    mounted() {
        let id = this.$getMenuId(  sessionStorage.getItem("munuIdList"),this.$route.path);
        this.$store.dispatch('dataSynList/getButtonList', { id })
        this.getShopList()
        this.getLazadaStatusList()
        this.getSyncList()
        this.getData()
    }
}
</script>