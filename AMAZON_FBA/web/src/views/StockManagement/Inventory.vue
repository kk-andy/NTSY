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
                    <span>盘点单号:</span>
                    <el-input v-model="search.orderNo" clearable placeholder="搜索内容" />
                </div>
            </el-col>
            <el-col :span="5" >
                <div class="grid-content bg-purple">
                    <span>盘点负责人</span>
                    <el-input v-model="search.head" clearable placeholder="搜索内容" />
                </div>
            </el-col>
            <el-col :span="5" >
                <div class="grid-content bg-purple">
                    <span>状态</span>
                    <el-select v-model="search.state" filterable clearable  placeholder="请选择">
                    <el-option
                        v-for="item in stateList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        ></el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="4" >
                <div class="grid-content bg-purple btn-no-span">
                    <search-btn-group @doFilter="doFilter" @doReset="doReset" />
                </div>
            </el-col>
        </el-row>
        <Header>
            <router-link :to="{ name: 'AddInventory' }">
                <el-button type="primary" class="btn_button_primary" v-if="showButtons.addOrder">新增盘点单</el-button>
            </router-link>    
            <el-button @click="exportData" v-if="showButtons.exportData">导出</el-button>   
        </Header>
        <div v-if="tableData.length">
           <table-conent :tableData="tableData" @audit="audit" :showButtons="showButtons" />
            <change-page :page="page" :total="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"  />
        </div>
        <no-data-content v-else />
        <audit-modal 
        v-if="auditModal" 
        @handleSubmit="handleSubmit"
        :auditRemark="auditRemark"
        :auditState="auditState" 
        :auditModal="auditModal"/>
    </div>
</template>
<script>
import TableConent from './components/InventoryTable'
import AuditModal from './components/auditModal'
import NoDataContent from '@/components/NoDataImages'
import { getSearchWarehourseList } from '@/api/WarehouseManagement'
import { mixin } from '@/mixins/common'
import { debounce } from '@/utils/common'
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
            tableData: state => state.Inventory.tableData,
            stateList: state => state.Inventory.stateList,
            total: state => state.Inventory.total,
            auditModal: state => state.Inventory.auditModal,
            showButtons: state => state.Inventory.showButtons,
            auditState: state => state.Inventory.auditState,
            auditRemark: state => state.Inventory.auditRemark
        }),
        ...mapGetters(['warehouseList'])
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
    data() {
        return {
            search: {
                orderNo: '',
                warehouse: '',
                head: '',
                warehouseId: '',
                warehouseName: '',
                state: ''
            },
            transferCode: '',
            params: {}
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
        audit(code) {
            this.transferCode = code
            this.$store.commit('Inventory/CLOSR_AUDIT_MODAL', true)
        },
        /* 确定审核 */
        handleSubmit(state) {
            let data = {
                checkCode: this.transferCode,
                // remark,
                state
            }
            let params = this.params
            this.$store.dispatch('Inventory/auditIninvetory', { data, params })
            // this.$store.dispatch('Inventory/auditTransfer', { data, params })
        },
        handleSelect(item) {
            this.search.warehouseName = item.whouseName
            this.search.warehouseId = item.whouseId
        },
        getData() {
            this.params = {
                current_page: this.page.currentPage,
                per_page: this.page.size,
                warehouseId: this.search.warehouseId,
                createUser: this.search.head,
                checkCode: this.search.orderNo,
                state: this.search.state
            }
            this.$store.dispatch('Inventory/getData', this.params)
        },
        /* 导出 */
        exportData() {
            let params = {
                warehouseId: this.search.warehouseId,
                createUser: this.search.head,
                checkCode: this.search.orderNo,
                state: this.search.state
            }
            this.$store.dispatch('Inventory/exportData', params)
        }
    },
    created() {
        let id = this.$getMenuId(sessionStorage.getItem("munuIdList"), this.$route.path);
        this.$store.dispatch('Inventory/getButtonList', { id })
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