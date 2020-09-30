<template>
    <div class="main">
        <el-row type="flex" class="row-bg search-head" justify="space-around">
            <el-col :span="6" >
                <div class="grid-content bg-purple">
                    <span style="">出入库单据类型:</span>
                    <el-select v-model="search.documentType" filterable   placeholder="请选择">
                    <el-option
                        v-for="item in kindList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        ></el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="5" >
                <div class="grid-content bg-purple">
                    <span>单据类型:</span>
                    <el-select v-model="search.purchaseOrderStatus" filterable clearable  placeholder="请选择" v-if="search.documentType === 1">
                    <el-option
                        v-for="item in itypeList1"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-select v-model="search.purchaseOrderStatus" filterable clearable  placeholder="请选择" v-if="search.documentType === 0">
                    <el-option
                        v-for="item in itypeList0"
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
                </div>
            </el-col>
            <el-col :span="5" >
                <div class="grid-content bg-purple">
                    <span>单号:</span>
                    <el-input v-model="search.searchWord" clearable placeholder="搜索内容">
                        <i slot="suffix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                    <!-- <el-select v-model="search.searchKey" filterable   placeholder="请选择">
                    <el-option
                        v-for="item in searchTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-input v-model="search.searchWord" clearable placeholder="搜索内容">
                        <i slot="suffix" class="el-input__icon el-icon-search"></i>
                    </el-input> -->
                </div>
            </el-col>
            
        </el-row>
        <Header>
            <el-button @click="exportData" v-if="showButtons.exportData">导出</el-button>
            <el-button type="primary" @click="doFilter">搜索</el-button>
            <el-button type="primary" @click="doReset">重置</el-button>
            <!-- <div class="grid-content bg-purple btn-no-span">
                
                <search-btn-group @doFilter="doFilter" @doReset="doReset" />
            </div> -->
        </Header>
        <div v-if="tableData.length">
           <table-conent :tableData="tableData" />
            <change-page :page="page" :total="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"  />
        </div>
        <no-data-content v-else />
    </div>
</template>
<script>
import TableConent from './components/OutboundTable'
import NoDataContent from '@/components/NoDataImages'
import { dateFormatT } from '@/utils/common'
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
            tableData: state => state.Outbound.tableData,
            stateList: state => state.Outbound.stateList,
            kindList: state => state.Outbound.kindList,
            itypeList1: state => state.Outbound.itypeList1,
            itypeList0: state => state.Outbound.itypeList0,
            showButtons: state => state.Outbound.showButtons,
            total: state => state.Outbound.total,
            searchTypeList: state => state.Outbound.searchTypeList
        }),
        ...mapState(['documentsTypeList', 'purchaseOrderList'])
    },
    watch: {
        'search.documentType': {
            handler(val) {
                this.search.purchaseOrderStatus = ''
            }
        }
    },
    data() {
        return {
            search: {
                documentType: 1,
                date: '',
                purchaseOrderStatus: '',
                searchKey: 'ticketCode',
                searchWord: '',
                state: ''
            },
            params: {}
        }
    },
    methods: {
        /* 获取数据 */
        getData() {
            this.params = {
                current_page: this.page.currentPage,
                per_page: this.page.size,
                kind: this.search.documentType,
                state: this.search.state
            }
            this.params[this.search.searchKey] = this.search.searchWord
            if (this.search.date) {
                this.params.startDate = dateFormatT(this.search.date).start
                this.params.endDate = dateFormatT(this.search.date).end
            }
            if (this.search.documentType) {
                this.params['itype'] = this.search.purchaseOrderStatus
            } else {
                this.params['otype'] = this.search.purchaseOrderStatus
            }
            this.$store.dispatch('Outbound/getData', this.params)
        },
        exportData() {
            let params = {
                kind: this.search.documentType,
                state: this.search.state
            }
            params[this.search.searchKey] = this.search.searchWord
            if (this.search.documentType) {
                params['itype'] = this.search.purchaseOrderStatus
            } else {
                params['otype'] = this.search.purchaseOrderStatus
            }
            this.$store.dispatch('Outbound/exportData', params)
        },
        doReset() {
            this.search.documentType = 1
            this.search.date = ''
            this.search.searchWord = ''
            this.search.purchaseOrderStatus = ''
            this.search.state = ''
        }
    },
    created() {
        let id = this.$getMenuId(sessionStorage.getItem("munuIdList"), this.$route.path);
        this.$store.dispatch('Outbound/getButtonList', { id })
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