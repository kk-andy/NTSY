<template> 
    <el-table 
    :data="tableData" 
    max-height="600"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    >  
        <!-- <el-table-column type="selection" width="55" align="center"/> -->
        <el-table-column prop="shop" label="单号" align="center">
            <template slot-scope="{ row }">
                <router-link :to="{ name: 'OutboundContent', query: { ticketCode: row.ticketCode, type: row.kind } }">
                    <span class="blue-color">{{ row.ticketCode }}</span>
                </router-link>
            </template>
        </el-table-column>
        <el-table-column prop="site" label="出入库单据类型" align="center">
            <template slot-scope="{ row }">
                <!-- <router-link :to="{ name: 'Editinventory' }"> -->
                    <span :class="row.kind ? 'blue-color' : 'green-color'" >{{ row.kind ? '入库' : '出库' }}</span>
                <!-- </router-link> -->
            </template>
        </el-table-column>
        <!-- <el-table-column prop="typeName" label="单据类型" align="center"/> -->
        <el-table-column prop="order" label="单据类型" align="center">
            <template slot-scope="{ row }">
                <p>{{ row.typeName }}</p>
            </template>
        </el-table-column>  
        <el-table-column prop="skuCount" label="数量" align="center" /> 
        <el-table-column prop="outWhouseName" label="出库仓库" align="center" />
        <el-table-column prop="inWhouseName" label="入库仓库" align="center" />
        <!-- <el-table-column prop="inWhouseName" label="出入库总金额" align="center" />
        <el-table-column prop="inWhouseName" label="出入库平均单价" align="center" /> -->
        <el-table-column prop="createDate" label="制单时间" align="center" />
        <!-- <el-table-column prop="money" label="状态" align="center">
            <template slot-scope="{ row }">
                <span :style="{ color: colorList[row.state].color }">{{ colorList[row.state].type }}</span>
            </template>
        </el-table-column> -->
  </el-table>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'TableContent',
    props: {
        tableData: {
            type: Array,
            default: () => []
        }
    },
    // computed: {
        
    // },
    computed: {
        ...mapState({
            colorList: state => state.common.colorList,
        }),
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