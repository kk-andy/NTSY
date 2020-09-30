<template>
    <div class="main">
        <el-row type="flex" class="row-bg search-head" justify="space-around">
            <el-col :span="4" >
                <div class="grid-content bg-purple">
                    <span>调出仓:</span>
                    <el-autocomplete
                        v-model="search.bringupWarehouseName"
                        clearable
                        :fetch-suggestions="querySearchAsyncBringup"
                        value-key="whouseName"
                        placeholder="请输入"
                        @select="handleSelectBringup"
                    ></el-autocomplete>
                </div>
            </el-col>
            <el-col :span="4" >
                <div class="grid-content bg-purple">
                    <span>调入仓:</span>
                    <el-autocomplete
                        v-model="search.callinWarehouseName"
                        clearable
                        :fetch-suggestions="querySearchAsyncCallin"
                        value-key="whouseName"
                        placeholder="请输入"
                        @select="handleSelectCallin"
                    ></el-autocomplete>
                </div>
            </el-col>
            <el-col :span="5" >
                <div class="grid-content bg-purple">
                    <span>调拨单号:</span>
                    <el-input v-model="search.orderNo" clearable placeholder="搜索内容" />
                </div>
            </el-col>
            <el-col :span="5" >
                <div class="grid-content bg-purple">
                    <span>调拨负责人</span>
                    <el-input v-model="search.head" clearable placeholder="搜索内容" />
                </div>
            </el-col>
            <el-col :span="5" >
                <div class="grid-content bg-purple no-span">
                    <span>单据状态</span>
                    <el-select v-model="search.state" filterable clearable  placeholder="状态">
                        <el-option
                            v-for="item in stateList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            ></el-option>
                    </el-select>
                </div>
            </el-col>          
        </el-row>
        <Header>
            <router-link :to="{ name: 'AddTransfers' }">
                <el-button type="primary" class="btn_button_primary" v-if="showButtons.addOrder">新增调拨单</el-button>
            </router-link>    
            <el-button @click="exportData" v-if="showButtons.exportData">导出</el-button>   
            <el-button @click="doReset">重置</el-button>
            <el-button @click="doFilter" type="primary" class="btn_button_primary">搜索</el-button>
        </Header>
        <div v-if="tableData.length">
           <table-conent :tableData="tableData" @audit="audit" :showButtons="showButtons"/>
            <change-page :page="page" :total="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"  />
        </div>
        <no-data-content v-else />
        <audit-modal
        v-if="auditModal" 
        @handleSubmit="handleSubmit"
        :auditState="auditState" 
        :auditRemark="auditRemark"
        :auditModal="auditModal"
         />
    </div>
</template>
<script>
import TableConent from './components/TransfersTable'
import NoDataContent from '@/components/NoDataImages'
import AuditModal from './components/auditModalTransfer'
import { mixin } from '@/mixins/common'
import { debounce } from '@/utils/common'
import { getSearchWarehourseList } from '@/api/WarehouseManagement'
import { mapState, mapGetters } from 'vuex'
export default {
    mixins: [ mixin ],
    components: {
        TableConent,
        NoDataContent,
        AuditModal
    },
    computed: {
        ...mapState({
            tableData: state => state.Transfers.tableData,
            stateList: state => state.Transfers.stateList,
            total: state => state.Transfers.total,
            showButtons: state => state.Transfers.showButtons,
            auditState: state => state.Transfers.auditState,
            auditRemark: state => state.Transfers.auditRemark,
            auditModal: state => state.Transfers.auditModal
        }),
        ...mapGetters(['warehouseList'])
    },
    watch: {
        'search.bringupWarehouseName': {
            handler(val) {
                if (!val) {
                    this.search.bringupWarehouseID = ''
                }
            }
        },
        'search.callinWarehouseName': {
            handler(val) {
                if (!val) {
                    this.search.callinWarehouseID = ''
                }
            }
        },
    },
    data() {
        return {
            search: {
                orderNo: '',
                bringupWarehouseID: '',
                bringupWarehouseName: '',
                callinWarehouseID: '',
                callinWarehouseName: '',
                head: '',
                state: ''
            },
            transferCode: '',
            params: {},
            list: [],
        }
    },
    methods: {
        querySearchAsyncBringup(queryString, cb) {
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
        audit(code) {
            this.transferCode = code
            this.$store.commit('Transfers/CLOSR_AUDIT_MODAL', true)
        },
        /* 确定审核 */
        handleSubmit(state) {
            let data = {
                transferCode: this.transferCode,
                // remark,
                state
            }
            let params = this.params
            this.$store.dispatch('Transfers/auditTransfer', { data, params })
        },
        querySearchAsyncCallin(queryString, cb) {
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
        handleSelectBringup(item) {
            this.search.bringupWarehouseName = item.whouseName
            this.search.bringupWarehouseID = item.whouseId
        },
        handleSelectCallin(item) {
            this.search.callinWarehouseName = item.whouseName
            this.search.callinWarehouseID = item.whouseId
        },
        /* 获取数据 */
        getData() {
            this.params = {
                current_page: this.page.currentPage,
                per_page: this.page.size,
                sourceWhouseId: this.search.bringupWarehouseID,
                distWhouseId: this.search.callinWarehouseID,
                createUser: this.search.head,
                transferCode: this.search.orderNo,
                state: this.search.state
            }
            this.$store.dispatch('Transfers/getData', this.params)
        },
        /* 导出 */
        exportData() {
            let params = {
                sourceWhouseId: this.search.bringupWarehouseID,
                distWhouseId: this.search.callinWarehouseID,
                createUser: this.search.head,
                transferCode: this.search.orderNo,
                state: this.search.state
            }
            this.$store.dispatch('Transfers/exportData', params)
        }
    },
    created() {
        let id = this.$getMenuId(sessionStorage.getItem("munuIdList"), this.$route.path);
        this.$store.dispatch('Transfers/getButtonList', { id })
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