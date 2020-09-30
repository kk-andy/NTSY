<template>
    <div class="main"> 
        <Header>
            修改调拨单
        </Header>
        <storage-content-head>
            <span>调拨单详情</span>
        </storage-content-head>
        <storage-content-body  
        :detail="detail" />
        <div class="search-sku">
            <el-input v-model="search.sku" clearable placeholder="输入SKU回车即可搜索" style="width: 30%" @keyup.enter.native="doFilterSku(search.sku)">
                <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
        </div>
        <table-content :tableData="detailItems" @handleSelectionChange="handleSelectionChange" :show="true"  />
        <actions-group 
        @handleClick="handleClick" 
        @handleImageSuccess="handleImageSuccess" 
        :state="detail.state"
        :data="uploadContent" 
        :uploaddUrl="uploaddUrl" 
        :transfer="true"  />
        <audit-modal
        v-if="auditModal" 
        @handleSubmit="handleSubmit"
        :auditState="auditState" 
        :auditModal="auditModal"
         />
    </div>
</template>
<script>
import StorageContentHead from '@/views/ProcurementManagement/components/StorageContentHead'
import StorageContentBody from './components/transfersContentBody'
import AuditModal from './components/auditModalTransfer'
import { message, confirmMsg } from '@/utils/common'
import { mapState } from 'vuex'
import ActionsGroup from './components/ActionsGroup'
import TableContent from './components/AddTransfersTable'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
    components: {
        StorageContentHead,
        StorageContentBody,
        TableContent,
        ActionsGroup,
        AuditModal
    },
    computed: {
       ...mapState({
           detail: state => state.Transfers.detail,
           detailItems: state => state.Transfers.detailItems,
           auditState: state => state.Transfers.auditState,
           auditModal: state => state.Transfers.auditModal,
        //    skuDetail: state => state.Transfers.skuDetail
       })
    },
    data() {
        return {
            search: {
                sku: '',
                warehouse: '',
                note: ''
            },
            filename: '调拨单详情',
            bookType: 'xls',
            autoWidth: true,
            uploadContent: {
                sourceWhouseId: '',
                distWhouseId: ''
            },
            uploaddUrl:`${process.env.VUE_APP_ERP_JAVA_DOMAIN}/warehouseTransfer/skuImport`,
            list: [],
            checkDataList: [],
            transferCode: ''
        }
    },
    beforeRouteLeave(to, from, next) {
        this.$store.commit('Transfers/change_detailItems', [])
        next()
    },
    methods: {
        async doFilterSku(sku) {
            if (!sku) {
                message('warning', '请先输入SKU')
                return
            }
            if (this.detailItems.find(item => item.sku === sku)) {
                message('warning', '当前已有重复的sku，请不要重复添加')
                return
            }
            let params = {
                sourceWhouseId: this.uploadContent.sourceWhouseId,
                distWhouseId: this.uploadContent.distWhouseId,
                sku
            }
            await this.$store.dispatch('Transfers/findSkuDetail', params)
            // if (JSON.stringify(this.skuDetail) !== '{}') {
            //     this.$store.commit('Transfers/ADD_SKU_DETAIL', this.skuDetail)
            // }
        },
        handleSelectionChange(val) {
            this.checkDataList = val
        }, 
        /* handleClick操作 */
        handleClick(flag) {
            this.actionsSelFunc(flag)
        },
         actionsSelFunc(num) {
            switch (num) {
                case 0: /* 返回 */
                    this.$router.push({ name: 'Transfers' })
                return
                case 1: /* 审核 */
                    this.audit()
                return
                case 2: /* 保存 */
                    this.saveData()
                return
                case 3: /* 作废 */
                    this.invalid()
                return
                case 4: /* 导出 */
                    this.exportData()
                return
                case 5:
                    this.downloadTemplate()
            }
        },
        /* 作废 */
        invalid() {
            confirmMsg('warning', '提示', '你确定要作废吗?', () => {
                this.$store.dispatch('Transfers/invalidTransfer', this.transferCode)
            })    
        },
        /* 保存 */
        saveData() {
            let data = {
                remark: this.detail.remark,
                transferCode: this.transferCode,
                skuList: this.detailItems.map(item => {
                    return {
                        sku: item.sku,
                        transferCount: item.count
                    }
                })
            }
            this.$store.dispatch('Transfers/updateTransfers', data)
        },
        downloadTemplate() {
            import("@/vendor/Export2Excel").then(excel => {
                // 设置导出表格的头部
                const tHeader = ['SKU', '调出库位', '调入库位', '调拨数量']
                excel.export_json_to_excel({
                // 导出的头部
                header: tHeader,
                // 导出的内容
                data: [],
                // 导出的文件名称
                filename: '调拨单导入模板',
                // 导出的表格宽度是否自动
                autoWidth: this.autoWidth,
                // 导出文件的后缀类型
                bookType: 'xls'
                });
            });
        },
        /* 导出数据 */
        exportData() {
            if (!this.detailItems.length) {
                message('warning', '当前没有可以导出的数据')
                return
            }
            import("@/vendor/Export2Excel").then(excel => {
                // 设置导出表格的头部
                 const tHeader = ['产品图片', '库存SKU', '中文名称', '调出仓库库存数量', '占用量', '可用量', '调出库位', '调入仓库存数量', '调入库位', '调拨数量']
                // 设置要导出的属性
                const filterVal = ['skuImg', 'sku', 'skuName', 'sourceTotalCount', 'sourceOccupyCount', 'sourceCurrentCount',  'sourceSpaceCode', 'distCurrentCount', 'distSpaceCode', 'count']
                // 获取当前展示的表格数据
                const list = this.detailItems;
                // 将要导出的数据进行一个过滤
                const data = this.formatJson(filterVal, list);
                // 调用我们封装好的方法进行导出Excel
                excel.export_json_to_excel({
                // 导出的头部
                header: tHeader,
                // 导出的内容
                data,
                // 导出的文件名称
                filename: this.filename,
                // 导出的表格宽度是否自动
                autoWidth: this.autoWidth,
                // 导出文件的后缀类型
                bookType: this.bookType
                });
            });
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        },
        /* 导入成功 */
        handleImageSuccess(res) {
            let response = res.data
            let message = `总共导入${response.total}条,成功${response.succ}条,确定则将覆盖当前的内容`
            confirmMsg('warning', '提示', message, () => {
                if (response.succ) {
                    this.$store.commit('Transfers/change_detailItems', response.skuList)
                }
                
            })
        },
        /* 审核 */
        audit() {
            this.$store.commit('Transfers/CLOSR_AUDIT_MODAL', true)
        },
        /* 确定审核 */
        handleSubmit(state) {
            let data = {
                transferCode: this.transferCode,
                remark: this.detail.remark,
                state
            }
            this.$store.dispatch('Transfers/auditTransfer', data)
        }
    },
    created() {
        this.uploadContent.sourceWhouseId = this.$route.query.sourceWhouseId
        this.uploadContent.distWhouseId = this.$route.query.distWhouseId
        this.transferCode = this.$route.query.transferCode
        this.$store.dispatch('Transfers/getContent', this.transferCode)
    }
}
</script>
<style scoped lang="scss">
.main {
    width: 90% !important;
    margin: 0 auto;
    Header {
        font-weight: bold;
        font-size: 16px;
        color: #333;
        padding: 15px 0;
        border-bottom: 1px solid #dfe6ec;
        input {
            width: 60%;
        }
    }
    .search-sku {
        padding: 15px 0;
    }
}
</style>