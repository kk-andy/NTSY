<template> 
    <el-table 
    :data="tableData" 
    :height="height"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    >  
        <el-table-column prop="sku" label="SKU" align="center" />
        <el-table-column prop="skuName" label="品名" align="center" width="350" >
        </el-table-column>
        <el-table-column prop="whouseName" label="仓库" align="center" width="350" >
        </el-table-column>
        <el-table-column prop="skuPrice" label="单价" align="center" ></el-table-column>  
        <el-table-column prop="skuCount" label="数量" align="center" ></el-table-column>    
        <el-table-column prop="skuCostAmt" label="采购成本" align="center" />
        <el-table-column prop="skuHeadAmt" label="头程费用" align="center" />
        <el-table-column prop="skuFbaAmt" label="FBA费用" align="center" />
        <el-table-column prop="skuGrossAmt" label="毛利润" align="center" />
  </el-table>
</template>
<script>
export default {
    name: 'TableContent',
    props: {
        tableData: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        height() {
            if (!this.tableData.length) {
                return '500px'
            }
        }
    },
    methods: {
        handleSelectionChange() {

        }
    }
}
</script>