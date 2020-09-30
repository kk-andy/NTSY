<template> 
    <el-table 
    :data="tableData" 
    :height="height"
    max-height="600"
    style="width: 100%"
    @sort-change="sortChange"
    >  
        <!-- <el-table-column type="selection" width="55" /> -->
        <el-table-column prop="shopName" label="店铺" align="center" />
        <el-table-column prop="site" label="站点" align="center" ></el-table-column>
        <el-table-column prop="orderId" label="订单编号" align="center">
            <!-- <template slot-scope="{ row }">       
                    <span class="blue-color">{{ row.orderId }}</span>              
            </template> -->
        </el-table-column>
        <el-table-column prop="orderNid" label="普源订单编号" align="center">
            <template slot-scope="{ row }">
                <router-link tag="span" :to="{ name: 'Ordercontent', query: { orderID: row.orderNid} }">
                    <span class="blue-color">{{ row.orderNid }}</span>   
                </router-link>  
            </template>
        </el-table-column>
        <el-table-column prop="asin" label="订单状态" align="center">
            <template slot-scope="{ row }">
                <span :class="row.state ? 'blue-color' : 'red-color' ">{{ row.state ? '正常' : '异常' }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="orderDate" label="订单交易时间" align="center" />
        <el-table-column prop="orderAmount" sortable="custom" label="订单金额" align="center" />
        <el-table-column prop="currency" label="货币" align="center" />  
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
        sortChange(item) {
            this.$emit('sortChange', item)
        }
    }
}
</script>