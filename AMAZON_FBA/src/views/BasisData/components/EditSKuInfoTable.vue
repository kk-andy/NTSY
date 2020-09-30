<template>
    <el-table
        :data="tableData"
        max-height="350"
        stripe
        style="width: 100%">
        <!-- <el-table-column
        prop="SKU"
        align="center"
        label="图片">
        </el-table-column> -->
        <el-table-column
        prop="sku"
        align="center"
        label="SKU">
        </el-table-column>
        <el-table-column
        prop="skuName"
        align="center"
        label="商品名称">
        </el-table-column>
        <el-table-column
        prop="address"
        align="center"
        label="操作">
            <template slot-scope="{ $index }">
                <el-button type="danger" @click="deleteSingleSku($index)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
export default {
    name: 'EditSkuInfoTable',
    props: {
        tableData: {
            type: Array,
            default: () => []
        },
    },
    methods: {
        deleteSingleSku(index) {
            this.$store.commit('WarehouseManagement/DEL_SINGLE_POSITIONS_SKU_INFO', index)
        }
    }
}
</script>