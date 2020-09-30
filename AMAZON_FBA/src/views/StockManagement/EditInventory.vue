<template>
    <div class="main"> 
        <Header>
            修改盘点
        </Header>
        <storage-content-head>
            <span>盘点单详情</span>
        </storage-content-head>
        <storage-content-body :show="show" :detail="detail" />
        <div class="search-sku">
            <el-input v-model="search.sku" clearable placeholder="输入SKU回车即可搜索" style="width: 30%" @keyup.enter.native="doFilterSku(search.sku)">
                <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
        </div>
        <table-content :tableData="detailItems" @handleSelectionChange="handleSelectionChange" @deleteData="deleteData" ref='table-child' />
        <actions-group  @handleClick="handleClick" @handleImageSuccess="handleImageSuccess" :data="uploadContent" :uploaddUrl="uploaddUrl" :state="detail.state" />
        <audit-modal 
        v-if="auditModal" 
        @handleSubmit="handleSubmit"
        :auditState="auditState" 
        :auditModal="auditModal"/>
    </div>
</template>
<script>
import StorageContentHead from '@/views/ProcurementManagement/components/StorageContentHead'
import AuditModal from './components/auditModal'
import StorageContentBody from './components/ContentBody'
import ActionsGroup from './components/ActionsGroup'
import { message, confirmMsg  } from '@/utils/common'
import TableContent from './components/AddInventoryTable'
import { mapState } from 'vuex'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
    components: {
        StorageContentHead,
        StorageContentBody,
        TableContent,
        AuditModal,
        ActionsGroup
    },
    computed: {
        ...mapState({
            detail: state => state.Inventory.detail,
            detailItems: state => state.Inventory.detailItems,
            auditModal: state => state.Inventory.auditModal,
            auditState: state => state.Inventory.auditState,
            // skuDetail: state => state.Inventory.skuDetail
        })
    },
    data() {
        return {
            search: {
                sku: '',
                warehouse: '',
                note: ''
            },
            filename: '盘点单详情',
            bookType: 'xls',
            autoWidth: true,
            uploaddUrl: `${process.env.VUE_APP_ERP_JAVA_DOMAIN}/warehouseCheck/skuImport`,
            uploadContent: {
                warehouseId: ''
            },
            checkCode: '',
            show: false,
            checkDataList: [],
            list: [],
        }
    },
    methods: {
        async doFilterSku(sku) {
            if (!sku) {
                message('warning', '请先输入SKU')
                return
            }
            if (this.detailItems.find(item => item.sku === sku )) {
                message('warning', '当前的SKU已经存在')
                return
            }       
            let warehouseId = this.uploadContent.warehouseId
            await this.$store.dispatch('Inventory/findSkuDetail', { warehouseId, sku })
            // if (JSON.stringify(this.skuDetail) !== '{}') {
            //     this.$store.commit('Inventory/ADD_SKU_DETAIL', this.skuDetail)
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
                    this.$router.push({ name: 'Inventory' })
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
        downloadTemplate() {
            if (!this.detailItems.length) {
                message('warning', '当前没有可以导出的数据')
                return
            }
            import("@/vendor/Export2Excel").then(excel => {
                // 设置导出表格的头部
                const tHeader = ['SKU', '盘点库存']
                excel.export_json_to_excel({
                // 导出的头部
                header: tHeader,
                // 导出的内容
                data: [],
                // 导出的文件名称
                filename: '盘点单库存导入模板',
                // 导出的表格宽度是否自动
                autoWidth: this.autoWidth,
                // 导出文件的后缀类型
                bookType: 'xls'
                });
            });
        },
        /* 作废 */
        invalid() {
            confirmMsg('warning', '提示', '你确定要作废吗?', () => {
                this.$store.dispatch('Inventory/invalidIninvetory', this.checkCode)
            })    
        },
        /* 审核 */
        audit() {
            this.$store.commit('Inventory/CLOSR_AUDIT_MODAL', true)
        },
        /* 确认审核 */
        handleSubmit(state) {
            let data = {
                checkCode: this.checkCode,
                remark: this.detail.remark,
                state
            }
            this.$store.dispatch('Inventory/auditIninvetory', data)
        },
        /* 保存 */
        saveData() {
            let data = {
                checkCode: this.checkCode,
                remark: this.detail.remark,
                skuList: this.detailItems.map(item => {
                    return {
                        checkCount: item.count,
                        sku: item.sku
                    }
                })
            }
            this.$store.dispatch('Inventory/updateIninventory', data)
            console.log(this.detail.remark)
        },
        /* 导出数据 */
        exportData() {
            import("@/vendor/Export2Excel").then(excel => {
                // 设置导出表格的头部
                const tHeader = ['产品图片', '库存SKU', '中文名称', '仓位', '盘点前库存', '盘点库存']
                // 设置要导出的属性
                const filterVal = ['skuImg', 'sku', 'skuName', 'spaceCode', 'currentCount', 'count']
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
            // /* generate workbook object from table */
            // var xlsxParam = { raw: true };//转换成excel时，使用原始的格式
            // var wb = XLSX.utils.table_to_book(document.querySelector('#export-child'), xlsxParam)
            // /* get binary string as output */
            // var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
            // try {
            //     FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '盘点单详情.xlsx')
            // } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
            // return wbout
            // console.log(document.querySelector('#export-child'))
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
                    this.$store.commit('Inventory/change_detailItems', response.skuList)
                    // this.detailItems = []
                    // this.detailItems.push(...response.skuList)
                }
                
            })
        },
        /* 删除 */
        deleteData(index) {
            this.detailItems.splice(index, 1)
        }
    },
    beforeRouteLeave(to, from ,next) {
        console.log(123)
        this.$store.commit('Inventory/change_detailItems', [])
        next()
    },
    created() {
        this.checkCode = this.$route.query.checkCode
        this.uploadContent.warehouseId = this.$route.query.warehouseId
        console.log(this.uploadContent)
        this.$store.dispatch('Inventory/getContent', this.checkCode)
    }
}
</script>
<style scoped lang="scss">
.main {
    width: 95% !important;
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