<template>
    <div class="main">
        <el-card>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="6" >
                    <div class="grid-content bg-purple">
                    <span>SKU:</span>
                    <!-- <el-input v-model="search.sku" :placeholder="placeholder" /> -->
                    <el-input type="textarea" resize="none" v-model="search.sku" clearable :placeholder="placeholder" @keyup.enter.native="doFilter" />
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                    <span>标题:</span>
                    <el-input v-model="search.title" clearable placeholder="请输入(模糊搜索)" @keyup.enter.native="doFilter" />
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                    <span>产品线:</span>
                    <el-select v-model="search.product_line" filterable clearable  placeholder="请选择">
                    <el-option
                        v-for="item in productLineList"
                        :key="item.id"
                        :label="item.category_name"
                        :value="item.id"
                        ></el-option>
                    </el-select>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                    <span>刊登店铺:</span>
                    <el-select v-model="search.listingShop" filterable clearable placeholder="请选择">
                    <el-option
                        v-for="item in shopList"
                        :key="item.shop_id"
                        :label="item.shop_name"
                        :value="item.shop_id"
                        ></el-option>
                    </el-select>
                    </div>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                    <span>刊登状态:</span>
                    <el-select v-model="search.status" filterable clearable placeholder="请选择">
                    <el-option
                        v-for="item in ListingTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        ></el-option>
                    </el-select>
                    </div>
                </el-col>  
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                    <span>是否六合一:</span>
                    <el-select v-model="search.isStopSale" filterable clearable placeholder="请选择">
                    <el-option
                        v-for="item in isList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        ></el-option>
                    </el-select>
                    </div>
                </el-col>  
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                    <span>刊登时间:</span>
                    <el-date-picker
                            v-model="search.create_time"
                            type="datetimerange"
                            style="width: 380px"
                            clearable
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                    </div>
                </el-col>            
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>刊登来源:</span>
                        <el-select v-model="search.push_source" filterable clearable placeholder="请选择">
                        <el-option
                            v-for="item in push_sourceList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                </el-col>  
                <el-col :span="6" v-for="item in [1, 2]" :key="item">
                    <div class="grid-content bg-purple">
                    </div>
                </el-col>       
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <search-btn-group @doFilter="doFilter" @doReset="doReset" />
                    </div>
                </el-col>       
            </el-row>
    </el-card>
    <div class="btn_group">
        <el-button type="primary" class="btn_button_primary_lone" @click="allSynchronous" v-if="showButtons.allSynchronous">批量重新同步</el-button>
    </div>
    <table-list 
    :tableData="tableData" 
    @viewLog="viewLog"
    @synchronous="synchronous"
    @handleSelectionChange="handleSelectionChange"
    :showButtons="showButtons"
    @edit="edit"/>
    <change-page :page="page" :total="total"  @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" />
    <el-dialog
      :visible.sync="modal_operationlog"
      :title="operationLogTitle"
      :close-on-click-modal="false"
      width="40%"
      class-name="vertical-center-modal"
    >
      <operation-log :table-data="operationLogList" />
      <!-- <change-page :page="logPage" :total="logTotal"  @handleCurrentChange="handleLogCurrentChange" @handleSizeChange="handleLogSizeChange" /> -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="btn_button_primary" @click="modal_operationlog = false">取消</el-button>
      </span>
    </el-dialog>
    </div>
</template>
<script>
import TableList from './components/listOfPublicationRecordsTable'
import ChangePage from '@/components/page'
import operationLog from '@/components/operationLog'
import { clearObjValue, dateFormatT, selectProductId } from '@/utils/common.js'
import { mapState, mapGetters, mapActions } from 'vuex'
import { getSesstionToken, getAppID } from '@/utils/auth'
import { mixin  } from '@/mixins/common'
export default {
    components: { TableList, operationLog, ChangePage },
    mixins: [mixin],
    computed: {
        ...mapGetters(['operationLogTitle', 'ListingTypeList', 'placeholder', 'isList', 'productLineList', 'shopList', 'lazadaURL']),
        ...mapState({
            total: state => state.listOfPublicationRecords.total,
            logTotal: state => state.listOfPublicationRecords.logTotal,
            tableData: state => state.listOfPublicationRecords.tableData,
            operationLogList: state => state.listOfPublicationRecords.operationLogList,
            showButtons: state => state.listOfPublicationRecords.showButtons,
            push_sourceList: state => state.listOfPublicationRecords.push_sourceList
        }),
        modal_operationlog: {
            get() {
                return this.$store.state.listOfPublicationRecords.modal_operationlog
            },
            set(val) {
                this.$store.state.listOfPublicationRecords.modal_operationlog = val
            }
        },
    },
    data() {
        return {
            search: {
                sku: '',
                title: '',
                listingShop: '',
                isStopSale: '',
                status: '',
                create_time: '',
                product_line: ''
            },
            multipleSelection: [],
            creatorList: [],     
            params: {},
        }
    },
    methods: {
        /* 查看日志 */
        viewLog(listing_id) {
            this.$store.dispatch('listOfPublicationRecords/getLogList', { listing_id })
        },
        /* 批量重新同步 */
        allSynchronous() {
            if (!selectProductId(this.multipleSelection, '请选择需要同步的商品')) {
                return false
            }
            let data = { listing_id: selectProductId(this.multipleSelection) }
            this.synchronousFunc(data)
        },
        /* 同步方法 */
        synchronousFunc(data) {
            let params = this.params
            this.$store.dispatch('listOfPublicationRecords/updateSynchronous', { data, params })
        },
        /* 单个同步 */
        synchronous(id) {
            let data = { listing_id: [ id ] }
            this.synchronousFunc(data)
        },
        /* 编辑 */
        edit(id) {
            // this.$router.push({
            //     name: 'ListOfPublicationRecordsEdit',
            //     query: {
            //         spu: id
            //     }
            // })
            let url = `${this.lazadaURL}/productListing/listOfPublicationRecordsEdit?spu=${id}&token=${getSesstionToken()}&id=${getAppID()}`
            window.open(url)
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        ...mapActions(['getProductLine', 'getShopList']),
        /* 获取列表数据 */
        getData() {
            this.params = {
                sku: this.search.sku,
                title: this.search.title,
                cat_id: this.search.product_line,
                push_status: this.search.status,
                shop_id: this.search.listingShop,
                is_global: this.search.isStopSale,
                push_date_start: this.search.create_time  ? dateFormatT(this.search.create_time).start : '',
                push_date_end: this.search.create_time  ? dateFormatT(this.search.create_time).end : '',
                page: this.page.currentPage,
                push_source: this.search.push_source,
                per_page_num: this.page.size
            }
            this.$store.dispatch('listOfPublicationRecords/getData', this.params)
        }
    },
    mounted() {
        let id = this.$getMenuId(  sessionStorage.getItem("munuIdList"),this.$route.path);
        this.$store.dispatch('listOfPublicationRecords/getButtonList', { id })
        this.getProductLine()
        this.getShopList()
        this.getData()
    },
}
</script>