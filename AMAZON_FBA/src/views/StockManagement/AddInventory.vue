<template>
    <div class="main"> 
        <Header>
            新增盘点
        </Header>
        <storage-content-head>
            <span>盘点单详情</span>
        </storage-content-head>
        <storage-content-body
        @change_remark="change_remark"
        :remark="remark"
        @change_warehouseId="change_warehouseId"
        :date="date"
        />
        <div class="search-sku">
            <el-input v-model="search.sku" clearable placeholder="输入SKU回车即可搜索" style="width: 30%" @keyup.enter.native="doFilterSku(search.sku)">
                <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
        </div>
        <table-content :tableData="detailItems" @handleSelectionChange="handleSelectionChange" @deleteData="deleteData" />
        <actions-group @handleClick="handleClick" @handleImageSuccess="handleImageSuccess" :uploaddUrl="uploaddUrl" :data="uploadContent" />
    </div>
</template>
<script>
import StorageContentHead from '@/views/ProcurementManagement/components/StorageContentHead'
import StorageContentBody from './components/addInventoryBody'
import { message, dateFormat, confirmMsg } from '@/utils/common'
import ActionsGroup from './components/ActionsGroup'
import TableContent from './components/AddInventoryTable'
import { mapState } from 'vuex'
import FileSaver from 'file-saver'
// import { export_json_to_excel } from '@/vendor/Export2Excel'
import XLSX from 'xlsx'
export default {
    components: {
        StorageContentHead,
        StorageContentBody,
        TableContent,
        ActionsGroup
    },
    computed: {
        ...mapState({
            detailItems: state => state.Inventory.detailItems,
            // skuDetail: state => state.Inventory.skuDetail
        }),
    },
    data() {
        return {
            search: {
                warehouse: '',
            },
            filename: '盘点单详情',
            bookType: 'xls',
            autoWidth: true,
            uploadContent: {
                warehouseId: ''
            },
            remark: '',
            warehouseId: '',
            date: dateFormat(new Date()),
            uploaddUrl: `${process.env.VUE_APP_ERP_JAVA_DOMAIN}/warehouseCheck/skuImport`,
            checkDataList: [],
        }
    },
    beforeRouteLeave(to, from ,next) {
        this.$store.commit('Inventory/change_detailItems', [])
        next()
    },
    methods: {
        async doFilterSku(sku) {
            if (!sku) {
                message('warning', '请先输入SKU')
                return
            }
            if (!this.warehouseId) {
                message('warning', '请先选择仓库')
                return
            }
            if (this.detailItems.find(item => item.sku === sku )) {
                message('warning', '当前的SKU已经存在')
                return
            }     
            let warehouseId = this.warehouseId
            this.$store.dispatch('Inventory/findSkuDetail', { warehouseId, sku })
            // if (JSON.stringify(this.skuDetail) !== '{}') {
            //     this.$store.commit('Inventory/ADD_SKU_DETAIL', this.skuDetail)
            // }
        },
        handleSelectionChange(val) {
            this.checkDataList = val
        },  
        change_remark(val) {
            this.remark = val
        },
        /* 删除 */
        deleteData(index) {
            this.detailItems.splice(index, 1)
        },
        /* handleClick操作 */
        handleClick(flag) {
            // if (flag === 1 || flag === 3 || flag === 4) {
            //     if (!this.checkDataList.length) {
            //         message('warning', '请先选择需要操作的数据')
            //         return
            //     }
            // }
            // let idList = this.checkDataList.map(item => item.id)
            this.actionsSelFunc(flag)
        },
        actionsSelFunc(num, list) {
            switch (num) {
                case 0: /* 返回 */
                    this.$router.go(-1)
                return
                case 1: /* 审核 */
                return
                case 2: /* 保存 */
                    this.saveData()
                return
                case 3: /* 作废 */
                return
                case 4: /* 导出 */
                    this.exportData()
                return
                case 5:
                    this.downloadTemplate()
            }
        },
        /* 导出 */
        exportData() {
            if (!this.detailItems.length) {
                message('warning', '当前没有可以导出的数据')
                return
            }
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
        },
        downloadTemplate() {
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
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        },
        /* 审核 */
        audit() {

        },
        /* 保存 */
        saveData() {
            if (!this.warehouseId) {
                message('warning', '仓库必须选择')
                return
            }
            let data = {
                remark: this.remark,
                warehouseId: this.warehouseId,
                skuList: this.detailItems.map(item => {
                    return {
                        checkCount: item.count,
                        sku: item.sku
                    }
                })
            }
            this.$store.dispatch('Inventory/addIninventory', data)
        },
        /* 导入成功 */
        handleImageSuccess(res) {
            let response = res.data
            let message = `总共导入${response.total}条,成功${response.succ}条,确定则将当前的内容覆盖`
            confirmMsg('warning', '提示', message, () => {
                if (response.succ) {
                    this.$store.commit('Inventory/change_detailItems', response.skuList)
                }
            })
           
        },
        /* 获取仓库编号 */
        change_warehouseId(id) {
            this.uploadContent.warehouseId = id
            this.warehouseId = id
            if (this.detailItems.length) {
                this.$store.commit('Inventory/change_detailItems', [])
            }
        }
    }
}
</script>
<style scoped lang="scss">
.main {
    width: 80% !important;
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