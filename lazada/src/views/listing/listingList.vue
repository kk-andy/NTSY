<template>
    <div class="main">
        <el-card>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="6" >
                    <div class="grid-content bg-purple">
                    <span>ListingID:</span>
                    <!-- <el-input v-model.trim="search.listingId" clearable :placeholder="placeholder" /> -->
                    <el-input type="textarea" resize="none" v-model="search.listingId" :placeholder="placeholder" @keyup.enter.native="doFilter" />
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                    <span>SKU:</span>
                    <!-- <el-input v-model.trim="search.sku" clearable :placeholder="placeholder" /> -->
                    <el-input type="textarea" resize="none" v-model="search.sku" :placeholder="placeholder" @keyup.enter.native="doFilter" />
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                    <span>站点:</span>
                    <el-select v-model="search.site" filterable clearable placeholder="请选择">
                    <el-option
                        v-for="item in siteList"
                        :key="item"
                        :label="item"
                        :value="item"
                        ></el-option>
                    </el-select>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                    <span>刊登人:</span>
                    <el-select v-model="search.published" clearable filterable  placeholder="请选择">
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
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                    <span>店铺:</span>
                    <el-select v-model="search.shop" clearable filterable  placeholder="请选择">
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
                    <el-select v-model="search.status" filterable clearable  placeholder="请选择">
                    <el-option
                        v-for="item in lazadaStatusList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                        ></el-option>
                    </el-select>
                    </div>
                </el-col>    
                 <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>账号名:</span>
                        <el-select v-model="search.accountName" filterable multiple clearable  placeholder="请选择">
                        <el-option
                            v-for="item in accountList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                </el-col> 
                <el-col :span="6">

                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                    <!-- <el-select v-model="search.timeType"  placeholder="请选择" style="width:120px;margin-right: 15px">
                    <el-option
                        v-for="item in timeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        ></el-option>
                    </el-select> -->
                    <span>拉取时间:</span>
                    <el-date-picker
                        v-model="search.create_time"
                        style="width: 375px"
                        type="datetimerange"
                        
                            clearable
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"

                         
                    />
                    </div>
                </el-col>
                <el-col :span="6">
                    <search-btn-group @doFilter="doFilter" @doReset="doReset" />
                </el-col>
            </el-row>
    </el-card>
    <div class="btn_group">
        <el-button type="primary" class="btn_button_primary_lone" @click="allShelves" v-if="showButtons.allShelves">批量上架</el-button>
        <el-button type="primary" class="btn_button_primary_lone" @click="allOffShelf" v-if="showButtons.allOffShelf">批量下架</el-button>
        <el-button type="primary" class="btn_button_primary_lone" @click="allDelete" v-if="showButtons.allDelete">批量删除</el-button>
        <el-button type="primary" class="btn_button_primary_lone" @click="Allchange(0)" v-if="showButtons.allChangePrice">批量修改价格</el-button>
        <el-button type="primary" class="btn_button_primary_lone" @click="Allchange(1)" v-if="showButtons.allChangeStock">批量修改库存</el-button>
        <el-button type="primary" class="btn_button_primary_lone" @click="Allchange(2)" v-if="showButtons.allChangeSalesPrice">批量修改促销价</el-button>
        <el-button type="primary" class="btn_button_primary_lone" @click="Allchange(3)" v-if="showButtons.allChangeSalesPrice">批量复制</el-button>
        <el-checkbox  v-model="checkAll" v-if="showButtons.showCheckAll">全量数据处理</el-checkbox>
    </div>
    <table-list 
        :tableData="tableData" 
        @changeData="changeData"
        @deleteContent="deleteContent"
        @viewLog="viewLog"  
        @edit="edit"
        @offShelf="offShelf"
        @copyOperation="copyOperation"
        @singleChangeSku="singleChangeSku"
        :showButtons="showButtons"
        @handleSelectionChange="handleSelectionChange"
        @shelves="shelves"
    />
    <change-page :page="page" :total="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" />
    <el-dialog
      :visible.sync="modal_operationlog"
      :title="operationLogTitle"
      :close-on-click-modal="false"
      width="40%"
      class-name="vertical-center-modal"
    >
      <operation-log :table-data="operationLogList"  />
      <!-- <change-page :page="logPage" :total="logTotal" @handleCurrentChange="handleLogCurrentChange" @handleSizeChange="handleLogSizeChange" /> -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="btn_button_primary" @click="modal_operationlog = false">取消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="modal_offShelf"
      :title="offShelfTitle"
      :close-on-click-modal="false"
      :before-close="cancelOffShelf"
      width="40%"
      class-name="vertical-center-modal"
    >
        <div class="select" style="text-align: center">
            <el-select v-model="offShelfReason" filterable  placeholder="请选择">
                <el-option
                v-for="item in creatorList"
                :key="item.staff_id"
                :label="item.staff_name"
                :value="item.staff_id"
                ></el-option>
            </el-select>
        </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" class="btn_button_primary" @click="confirnOffShelf">确定</el-button>
        <el-button type="primary" class="btn_button_primary" @click="cancelOffShelf">取消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="modal_copyShop"
      title="批量复制"
      :close-on-click-modal="false"
      :before-close="cancelCopy"
      width="50%"
      class-name="vertical-center-modal"
      class="modal-copy"
    >
        <div class="select copy_modal" style="text-align: center">
            <div>
                !复制到listing后会将listing进行刊登,可在刊登记录列表查看
            </div>
            <div>
                <span><span>*</span>复制到店铺:</span>
                <el-select v-model="copyShop" filterable  placeholder="请选择" style="width: 250px">
                    <el-option
                    v-for="item in shopList"
                    :key="item.shop_id"
                    :label="item.shop_name"
                    :value="item.shop_id"
                    ></el-option>
                </el-select>
            </div>
            <div>
                <span>是否使用六合一刊登:</span>
                <div>
                    <el-radio v-model="is_global" :label="1">是</el-radio>
                    <el-radio v-model="is_global" :label="0">否</el-radio>
                </div>
            </div>
        </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" class="btn_button_primary" @click="confirmCopy">确定</el-button>
        <el-button type="primary" class="btn_button_primary" @click="cancelCopy">取消</el-button>
      </span>
    </el-dialog>
    <transition name="el-fade-in-linear">
        <change-price 
            @on-open-sesion="changePriceNumber" 
            :showBatchEditPopup="showBatchEditPopup"
            :multipleSelection="multipleSelection"
            :recordCurrent="recordCurrent"
            v-if="showBatchEditPopup"
        />
    </transition>
    </div>
</template>
<script>
import TableList from './components/listingListTable'
import ChangePage from '@/components/page'
import operationLog from '@/components/operationLog'
import ChangePrice from './components/changePrice'
import { confirmMsg, message, dateFormatT, clearObjValue, selectListingID } from '@/utils/common'
import { mapState, mapGetters, mapActions } from 'vuex'
import { getSesstionToken, getAppID } from '@/utils/auth'
import { getGloalTotal } from '@/api/listingList'
import { mixin  } from '@/mixins/common'
export default {
    components: { 
        TableList, 
        ChangePage, 
        operationLog,
        ChangePrice: () => import('./components/changePrice')
     },
    mixins: [mixin],
    computed: {
        ...mapGetters(['operationLogTitle', 
            'offShelfTitle', 
            'siteList', 
            'placeholder', 
            'shopList', 
            'sellerList', 
            'lazadaStatusList', 
            'accountList',
            'lazadaURL'
        ]),
        ...mapState({
            total: state => state.listingList.total,
            logTotal: state => state.listingList.logTotal,
            tableData: state => state.listingList.tableData,
            timeList: state => state.listingList.timeList,
            recordCurrent: state => state.listingList.recordCurrent,
            priceOptions: state => state.listingList.priceOptions,
            inStockOptions: state => state.listingList.inStockOptions,
            operationLogList: state => state.listingList.operationLogList,
            showButtons: state => state.listingList.showButtons,
        }),
        copyShop: {
            get() {
                return this.$store.state.listingList.copyShop
            },
            set(val) {
                this.$store.state.listingList.copyShop = val
            }
        },
        is_global: {
            get() {
                return this.$store.state.listingList.is_global
            },
            set(val) {
                this.$store.state.listingList.is_global = val
            }
        },
        modal_operationlog: {
            get() {
                return this.$store.state.listingList.modal_operationlog
            },
            set(val) {
                this.$store.state.listingList.modal_operationlog = val
            }
        },
        showBatchEditPopup: {
            get() {
                return this.$store.state.listingList.showBatchEditPopup
            },
            set(val) {
                this.$store.state.listingList.showBatchEditPopup = val
            }
        },
        offShelfReason: {
            get() {
                return this.$store.state.listingList.offShelfReason
            },
            set(val) {
                this.$store.state.listingList.offShelfReason = val
            }
        },
        modal_offShelf: {
            get() {
                return this.$store.state.listingList.modal_offShelf
            },
            set(val) {
                this.$store.state.listingList.modal_offShelf = val
            }
        },
        modal_copyShop: {
            get() {
                return this.$store.state.listingList.modal_copyShop
            },
            set(val) {
                this.$store.state.listingList.modal_copyShop = val
            }
        }
    },
    data() {
        return {
            search: {
                listingId: '',
                sku: '',
                site: '',
                published: '',
                status: '',
                create_time: '',
                shop: '',
                accountName: '',
                timeType: 'updated_at'
            },
            multipleSelection: [],
            params: {},
            checkAll: false,
            creatorList: [],    
            page: {
                size: 50,
                currentPage: 1
            },
            logPage: {
                size: 10,
                currentPage: 1
            },     
        }
    },
    methods: {
        /* 查看日志 */
        viewLog(params) {
            this.$store.dispatch('listingList/getLog', params)
        },
        /* 编辑 */
        edit(online_listing_id) {
            // this.$router.push({
            //     name: 'ListingEdit',
            //     query: {
            //         online_listing_id
            //     }
            // })
            let url = `${this.lazadaURL}/listingManagement/listingEdit?online_listing_id=${online_listing_id}&token=${getSesstionToken()}&id=${getAppID()}`
            window.open(url)
        },
        /* 单个修改价格，促销价，库存 */
        changeData(data, status) {
            if (status === 'price') { /* 修改价格 */
                this.$store.dispatch('listingList/changePrice', data)
            } else if (status === 'isStoc') { /* 修改库存 */
                this.$store.dispatch('listingList/changeStock', data)
            } else { /* 修改促销价 */
                this.$store.dispatch('listingList/changeSpecialPrice', data)
            }
        },
        /* 全选拿到id */
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        /* 修改库存或者价格 */
        changePriceNumber(item) {
            /* 如果直接点的取消 */
            if (typeof item === 'boolean') {
                this.showBatchEditPopup = false
                return
            }
            let params
            let { form } = item
            if (!this.checkAll) {          
                let data = {
                    item_id: selectListingID(this.multipleSelection),
                    change_type: form.mode,
                    change_value: form.val,
                    is_sync: form.status ? 1 : 0
                }
                params = this.params
                this.changeFunc(item.code, { data, params })
            } else {
                params = {
                    item_id: this.search.listingId,
                    sku: this.search.sku,
                    shop_id: this.search.shop,
                    start_time: this.search.create_time  ? dateFormatT(this.search.create_time).start : '',
                    end_time: this.search.create_time  ? dateFormatT(this.search.create_time).end : '',
                    publisher: this.search.published,
                    online_status: this.search.status,
                    site_code: this.search.site,
                    account_name: this.search.accountName,
                    time_type: this.search.timeType ? this.search.timeType : 'created_at' ,
                }
                let paramsAll = {
                    change_type: form.mode,
                    change_value: form.val,
                    is_sync: form.status ? 1 : 0
                }
                let dataAll = Object.assign({}, params, paramsAll)
                this.changeFunc(item.code, { params }, dataAll)
            }

        },
        changeFunc(num, { data = undefined, params }, dataAll = undefined) {
            switch(num) {
                case 0: /* 修改价格 */
                if (!this.checkAll) {
                    this.$store.dispatch('listingList/allChangePrice', { data, params })
                } else {
                    dataAll.batch_type = 4
                    this.gloabUpdateSave(params, dataAll)
                }           
                return
                case 1:
                if (!this.checkAll) {
                    this.$store.dispatch('listingList/allChangeStock', { data, params })
                } else {
                    dataAll.batch_type = 5
                    this.gloabUpdateSave(params, dataAll)
                }           
                return
                case 2:
                if (!this.checkAll) {
                    this.$store.dispatch('listingList/allChangeSpecialPrice', { data, params })
                } else {
                    dataAll.batch_type = 6
                    this.gloabUpdateSave(params, dataAll)
                }          
                return
                case 3:
                if (!this.checkAll) {
                    this.$store.dispatch('listingList/batchCopy', { data, params })
                } else {
                    dataAll.batch_type = 7
                    this.gloabUpdateSave(params, dataAll)
                }
            }   
        },
        /* 全量处理提交 */
        gloabUpdateSave(paramsAll, data) {
            getGloalTotal(paramsAll).then(res => {
                if (res.code === 0) {
                    confirmMsg('warning', '提示', `已经选中${res.data.count}条数据,是否进行全量数据处理?`, () => {
                        let params = this.params
                        this.$store.dispatch('listingList/gloabUpdateSave', { data, params })
                    })
                }
            })
        },
        /* 批量修改价格，库存， 促销价 */
        Allchange(num, flag = false) {
            if (!this.checkAll) {
                if (!selectListingID(this.multipleSelection)) {
                    return 
                }
            }
            // if (num === 3) {
            //     if (!this.checkAll) {
            //         if (!selectListingID(this.multipleSelection).length) {
            //             message('warning', '当前没有符合条件的数据')
            //             return
            //         }
            //     }
            // }
            // if (!selectListingID(this.multipleSelection) && !this.checkAll) {
            //     return
            // }
            switch(num) {
                case 0:
                this.$set(this.recordCurrent, "title", "批量修改价格");
                this.$set(this.recordCurrent, "options", this.priceOptions);
                this.$set(this.recordCurrent, "id", num);
                this.showBatchEditPopup = true
                return
                case 1:
                this.$set(this.recordCurrent, "title", "批量修改库存");
                this.$set(this.recordCurrent, "options", this.inStockOptions);
                this.$set(this.recordCurrent, "id", num);
                this.showBatchEditPopup = true
                return
                case 2:
                this.$set(this.recordCurrent, "title", "批量修改促销价");
                this.$set(this.recordCurrent, "options", this.priceOptions);
                this.$set(this.recordCurrent, "id", num);
                this.showBatchEditPopup = true
                return
                case 3:
                this.modal_copyShop = true
                return
            }
        },
        /* 取消复制 */
        cancelCopy() {
            this.$store.commit('listingList/CloseCopyModal')
        },
        /* 确定复制 */
        confirmCopy() {
            if (!this.copyShop) {
                message('warning', '请选择需要复制的店铺')
                return
            }
            let params
            if (!this.checkAll) {
                let data = {
                    item_id: selectListingID(this.multipleSelection),
                    is_global: this.is_global,
                    target_shop_id: this.copyShop,
                }
                params = this.params
                this.changeFunc(3, { data, params })
            } else {
                params = {
                    item_id: this.search.listingId,
                    sku: this.search.sku,
                    shop_id: this.search.shop,
                    start_time: this.search.create_time  ? dateFormatT(this.search.create_time).start : '',
                    end_time: this.search.create_time  ? dateFormatT(this.search.create_time).end : '',
                    publisher: this.search.published,
                    online_status: this.search.status,
                    site_code: this.search.site,
                    account_name: this.search.accountName,
                    time_type: this.search.timeType ? this.search.timeType : 'updated_at' ,
                }
                let paramsAll = {
                    is_global: this.is_global,
                    target_shop_id: this.copyShop,
                }
                let dataAll = Object.assign({}, params, paramsAll)
                this.changeFunc(3, { params }, dataAll)
            }
        },
        /* 批量删除 */
        allDelete() {
            if (!this.checkAll) {
                if (!selectListingID(this.multipleSelection)) {
                    return
                }
            }       
            confirmMsg('warning', '删除', '你确定要删除吗？', ()=> {
                let data = { item_id: this.checkAll ? [] : selectListingID(this.multipleSelection)}
                this.deleteFunc(data, true)
            })
        },
        /* 单个删除 */
        deleteContent(id) {
            confirmMsg('warning', '删除', '你确定要删除吗？', ()=> {
                let data = { item_id: [ String(id) ] }
                this.deleteFunc(data, false)
            })
        },
        deleteFunc(data, flag) {
            let params = this.params
            if (flag && this.checkAll) {
                this.allDelShelvesOffShelfFunc(3)
            } else {
                this.$store.dispatch('listingList/listingDelete', { data, params })
            }    
        },
        /* 单个操作sku */
        singleChangeSku(item_id, sku, status) {
            let params = this.params
            let data = {
                item_id: [ item_id ],
                sku
            }
            if (status === 'Shelves') {
                this.$store.dispatch('listingList/singleSkuShelves', { data, params })
            } else if (status === 'offShelf') {
                this.$store.dispatch('listingList/singleSkuOffShelf', { data, params })
            } else {
                confirmMsg('warning', '删除', '你确定要删除吗？', ()=> {
                this.$store.dispatch('listingList/singleSkuDelete', { data, params })
            })
            }
        },
        /* 批量下架 */
        allOffShelf() {
            if (!this.checkAll) {
                if (!selectListingID(this.multipleSelection)) {
                    return
                }
            }    
            confirmMsg('warning', '下架', '你确定要下架吗？', ()=> {
                let data = { item_id: this.checkAll ? [] : selectListingID(this.multipleSelection)}
                this.offShelfFunc(data, true)
            })
        },
        /* 单个下架 */
        offShelf(id) {
            confirmMsg('warning', '下架', '你确定要下架吗？', ()=> {
                let data = { item_id: [ String(id) ] }
                this.offShelfFunc(data, false)
            })
        },
        offShelfFunc(data, flag) {
            let params = this.params
            if (flag && this.checkAll) {
                this.allDelShelvesOffShelfFunc(2)
            } else {
                this.$store.dispatch('listingList/listingInactive', { data, params })
            }      
        },
        /* 批量上架 */
        allShelves() {
            if (!this.checkAll) {
                if (!selectListingID(this.multipleSelection)) {
                    return
                }
            }
            let data = { item_id: this.checkAll ? [] : selectListingID(this.multipleSelection)}
            this.shelvesFunc(data, true)
        },
        /* 上架函数 */
        shelvesFunc(data, flag) {
            let params = this.params
            if (flag && this.checkAll) {
                this.allDelShelvesOffShelfFunc(1)
            } else {
                this.$store.dispatch('listingList/listingActive', { data, params })
            }        
        },
        allDelShelvesOffShelfFunc(num) {
            let paramsAll = {
                item_id: this.search.listingId,
                sku: this.search.sku,
                shop_id: this.search.shop,
                start_time: this.search.create_time  ? dateFormatT(this.search.create_time).start : '',
                end_time: this.search.create_time  ? dateFormatT(this.search.create_time).end : '',
                publisher: this.search.published,
                online_status: this.search.status,
                site_code: this.search.site,
                time_type: this.search.timeType ? this.search.timeType : 'updated_at',
            }
            let data = JSON.parse(JSON.stringify(paramsAll))
            data.batch_type = num
            this.gloabUpdateSave(paramsAll, data)
        },
        /* 复制 */
        copyOperation(id) {
            // this.$router.push({
            //     name: 'CopyListing',
            //     query: {
            //         listing_id: id
            //     }
            // })
            let url = `${this.lazadaURL}/listingManagement/copyListing?listing_id=${id}&token=${getSesstionToken()}&id=${getAppID()}`
            window.open(url)
        },
        /* 单个上架 */
        shelves(id) {
            let data = { item_id: [ String(id) ] }
            this.shelvesFunc(data, false)
        },
        /* 搜索 */
        /* 确定下架 */
        confirnOffShelf() {

        },
        /* 取消下架 */
        cancelOffShelf() {
            this.modal_offShelf = false
        },
        ...mapActions(['getShopList', 'getSellerlist', 'getSiteList', 'getLazadaStatusList', 'getLazadaAccountList']),
        getData() {
            this.params = {
                item_id: this.search.listingId,
                sku: this.search.sku,
                shop_id: this.search.shop,
                start_time: this.search.create_time  ? dateFormatT(this.search.create_time).start : '',
                end_time: this.search.create_time  ? dateFormatT(this.search.create_time).end : '',
                publisher: this.search.published,
                online_status: this.search.status,
                page: this.page.currentPage,
                per_page_num: this.page.size,
                site_code: this.search.site,
                account_name: this.search.accountName,
                time_type: this.search.timeType ? this.search.timeType : 'updated_at',
            }
            this.$store.dispatch('listingList/getData', this.params)
        }
    },
    created() {
        let id = this.$getMenuId(  sessionStorage.getItem("munuIdList"),this.$route.path);
        this.$store.dispatch('listingList/getButtonList', { id })
        this.getShopList()
        this.getSellerlist()
        this.getLazadaAccountList()
        this.getLazadaStatusList()
        this.getSiteList()
        this.getData()
    }
}
</script>
<style scoped lang="scss">
.copy_modal {
    // display: flex;
    // justify-content: center;
    // flex-direction: column;
    & > div {
        display: flex;
        align-items: center;
        // justify-content: center;
        line-height: 60px;
        & > span:nth-child(1) {
            margin-right: 10px;
            // min-width: 60px;
            & > span {
                color: #ff0000;
            }
        }
    }
}
</style>
<style lang="scss">
.modal-copy {
    .el-dialog__body {
        display: flex;
        justify-content: center;
    }
}
</style>