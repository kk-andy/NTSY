<template>
    <div class="main"> 
        <Header>
            新增调拨单
        </Header>
        <storage-content-head>
            <span>调拨单详情</span>
        </storage-content-head>
        <StorageContentBody 
        @change_bringup_warehouseId="changeBringup"
        @change_callin_warehouseId="changeCallin"
        @change_remark="change_remark"
        :date="date"
        :remark="remark"/>
        <div class="search-sku">
            <el-input v-model="search.sku" clearable placeholder="输入SKU回车即可搜索" style="width: 30%" @keyup.enter.native="doFilterSku(search.sku)">
                <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
        </div>
        <table-content :tableData="detailItems" @handleSelectionChange="handleSelectionChange" :show="false" />
        <actions-group 
        :uploaddUrl="uploaddUrl"
        @handleClick="handleClick" 
        @handleImageSuccess="handleImageSuccess" 
        :transfer="true" 
        :data="uploadContent" />
    </div>
</template>
<script>
import StorageContentHead from '@/views/ProcurementManagement/components/StorageContentHead'
import StorageContentBody from './components/addTransferBody'
import { message, dateFormat, confirmMsg  } from '@/utils/common'
import ActionsGroup from './components/ActionsGroup'
import TableContent from './components/AddTransfersTable'
import { export_json_to_excel } from '@/vendor/Export2Excel'
import { mapState } from 'vuex'
import FileSaver from 'file-saver'
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
            detailItems: state => state.Transfers.detailItems,
            // skuDetail: state => state.Transfers.skuDetail
        })
    },
    data() {
        return {
            search: {
                sku: '',
            },
            uploadContent: {
                sourceWhouseId: '',
                distWhouseId: ''
            },
            remark: '',
            filename: '调拨单详情',
            bookType: 'xls',
            autoWidth: true,
            uploaddUrl: `${process.env.VUE_APP_ERP_JAVA_DOMAIN}/warehouseTransfer/skuImport`,
            date: dateFormat(new Date()),
            callinWhouseId: '',
            bringupWhouseId: '',
            checkDataList: [],
        }
    },
    beforeRouteLeave(to, from, next) {
        this.$store.commit('Transfers/change_detailItems', [])
        next()
    },
    methods: {
        async  doFilterSku(sku) {
            if (!sku) {
                message('warning', '请先输入SKU')
                return
            }
            if (!this.callinWhouseId || !this.bringupWhouseId) {
                message('warning', '请先选择仓库')
                return
            }
            if (this.callinWhouseId === this.bringupWhouseId) {
                message('warning', '调入仓和调出仓两个仓库不能相同')
                return
            }
            if (this.detailItems.find(item => item.sku === sku)) {
                message('warning', '当前已有重复的sku，请不要重复添加')
                return
            }
            let params = {
                sourceWhouseId: this.bringupWhouseId,
                distWhouseId: this.callinWhouseId,
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
                return
                case 2: /* 保存 */
                    this.saveData()
                return
                case 3: /* 作废 */
                return
                case 4: /* 导出 */
                    this.exportData()
                return
                case 5: /* 下载模板 */
                    this.downloadTemplate()
                return
            }
        },
        /* 保存 */
        saveData() {
            if (!this.callinWhouseId || !this.bringupWhouseId) {
                message('warning', '请先选择仓库')
                return
            }
            if (this.callinWhouseId === this.bringupWhouseId) {
                message('warning', '调入仓和调出仓两个仓库不能相同')
                return
            }
            let data = {
                remark: this.remark,
                sourceWhouseId: this.bringupWhouseId,
                distWhouseId: this.callinWhouseId,
                skuList: this.detailItems.map(item => {
                    return {
                        transferCount: item.count,
                        sku: item.sku
                    }
                })
            }
            this.$store.dispatch('Transfers/createTransfer', data)
        },
        /* 导出 */
        exportData() {
            if (!this.detailItems.length) {
                message('warning', '当前没有可以导出的数据')
                return
            }
            import("@/vendor/Export2Excel").then(excel => {sourceCurrentCount
                // 设置导出表格的头部
                const tHeader = ['产品图片', '库存SKU', '中文名称', '调出仓库库存数量', '调出库位', '调入仓库存数量', '调入库位', '调拨数量']
                // 设置要导出的属性
                const filterVal = ['skuImg', 'sku', 'skuName', 'sourceTotalCount', 'sourceSpaceCode', 'distCurrentCount', 'distSpaceCode', 'count']
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
        downloadTemplate() {
            import("@/vendor/Export2Excel").then(excel => {
                // 设置导出表格的头部
                const tHeader = ['SKU', '调拨数量']
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
        /* 修改调出仓 */
        changeBringup(val) {
            this.uploadContent.sourceWhouseId = val
            this.$store.commit('Transfers/change_detailItems', [])
            this.bringupWhouseId = val
        },
        /* 修改调入仓 */
        changeCallin(val) {
            this.uploadContent.distWhouseId = val
            this.$store.commit('Transfers/change_detailItems', [])
            this.callinWhouseId = val
        },
        /* 修改备注 */
        change_remark(val) {
            this.remark = val
        }
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
    .content-body > div {
        display: flex;
        // justify-content: space-around;
        align-items: center;
        min-height: 58px;
        align-items: center;
        // line-height: 58px;
        border-bottom: 1px solid #dfe6ec;
        color: #ccc;
        & > div {
            display: flex;
            align-items: center;
            // justify-content: center;
            width: 33.33%;
            span {
                margin-right: 5px;
            }
        }
    }
    .content-body {
        & > div:nth-child(2) {
            // & > div:nth-child(1) {
            //     width: 60%;
            // }
            & > div:nth-child(2) {
                width: 60%;
                span {
                    width: 40px;
                }
            }
        }
    }
}
</style>