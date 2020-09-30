<template> 
    <el-table 
    :data="tableData" 
    max-height="600"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    >  
        <!-- <el-table-column type="selection" width="55" align="center"/> -->
        <el-table-column prop="warehouseName" label="仓库名称">
            <!-- <template>
                <router-link :to="{ name: 'Editinventory' }">
                    <span>编号</span>
                </router-link>
            </template> -->
        </el-table-column>
        <el-table-column prop="sku" label="SKU码" align="center"></el-table-column>
        <el-table-column prop="skuName" label="商品名称" align="center"></el-table-column>  
        <!-- <el-table-column prop="asin" label="商品状态"></el-table-column>     -->
        <!-- <el-table-column prop="time" label="商品成本价￥" /> -->
        <el-table-column prop="skuCount" label="库存总数量" align="center" />
        <!-- <el-table-column prop="money" label="库存总金额" /> -->
        <el-table-column prop="purchaseCount" label="采购在途数量" align="center" />

        <!-- <el-table-column prop="purchaseCount" label="库存总金额" align="center" />
        <el-table-column prop="purchaseCount" label="库存平均单价" align="center" />
        <el-table-column prop="purchaseCount" label="头程总金额" align="center" />
        <el-table-column prop="purchaseCount" label="头程平均价" align="center" />
        <el-table-column prop="purchaseCount" label="采购在途总金额" align="center" /> -->
        <el-table-column prop="supplier" label="供应商名称" align="center">
            <template slot-scope="{ row }">
                <span class="green-color">【{{ row.supplier }}】</span>
            </template>
        </el-table-column>
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