<template>
    <div class="barcode-table">
        <el-table
            :data="tableData"    
            border
            style="width: 100%">
            <el-table-column
            prop="date"
            width="300"
            align="center"
            label="SKU码">         
                <template slot-scope="{ row }">
                    <barcode :value="row.sku" :options="options" tag="img"/>          
                </template>
            </el-table-column>
            <el-table-column
            prop="skuName"
            label="商品名称"
            align="center">
            </el-table-column>
            <el-table-column
            prop="purchaseCount"
            align="center"
            width="60"
            label="采购数量">
            </el-table-column>
            <el-table-column
            prop="count"
            width="60"
            align="center"
            label="入库数量">
                <template slot-scope="{ row }">
                    <span>{{ row.count ? row.count : 0 }}</span>
                </template>
            </el-table-column>
            <el-table-column
            prop="address"
            width="60"
            align="center"
            label="包装事项">
            </el-table-column>
        </el-table>
    </div> 
</template>
<script>
import VueBarcode from 'vue-barcode';
export default {
    name:'BarcodeTable',
    components: {
        'barcode': VueBarcode
    },
    props: {
        tableData: {
            type: Array,
            default: () => []
        },
        options: {
            type: Object,
            required: true,
        }
    }
}
</script>
<style lang="scss">
.barcode-table {
    .el-table {
        td {
            padding: 0px !important;
            svg {
                    height: 100px;
                    width: 300px;
                    rect {
                        height: 58;
                        width: 2;
                    }
            }
        }
    }
}
</style>