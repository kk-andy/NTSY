<template>
    <el-table 
    :data="tableData" 
    max-height="600"
    style="width: 100%"
    >  
        <el-table-column prop="purchaseId" label="入库单号" align="center">
            <template slot-scope="{row}">
                <router-link :to="{ name: 'PutInStorageConent', query: { inCode: row.inCode, whouseId: row.whouseId, type: 1 } }">
                    <span class="blue-color">{{ row.inCode }}</span>
                </router-link>       
            </template>    
        </el-table-column>
        <el-table-column prop="purchaseId" label="关联采购单号" align="center">
            <!-- <template slot-scope="{ row }">
                <span class="green-color">【供应商：{{ row.supplierName }}】</span>
            </template> -->
        </el-table-column>  
        <el-table-column prop="purchaseCount" label="入库单状态" align="center">
            <template slot-scope="{row}">
                <span :style="{ color: colorList[row.state].color }">{{ row.state === 1 ? '待入库' : row.state === 2 ? '已作废' : '已入库' }}</span>
            </template>
        </el-table-column>    
        <el-table-column prop="whouseName" label="仓库" align="center" />
        <el-table-column prop="purchaser" label="采购员" align="center">
            <!-- <template slot-scope="{row}">
                <span>{{ row.inCount }}/{{ row.purchaseCount }}</span>
            </template> -->
        </el-table-column>
        <el-table-column prop="money" label="实际入库/计划入库/采购量" align="center">
            <template slot-scope="{row}">
                <span>{{ row.inCount }}/{{ row.planCount }}/{{ row.purchaseCount}}</span>
                <!-- <router-link :to="{ name: 'StorageContent', query: { purchaserId: row.purchaseId } }">
                    <el-button type="text">生成入库单</el-button>
                </router-link>     -->
            </template>
        </el-table-column>
        <el-table-column prop="totalAmount" label="实际入库金额" align="center" />
        <el-table-column prop="createDate" label="计划入库金额" align="center" />
        <el-table-column prop="createDate" label="制单时间" align="center" />
        <el-table-column prop="money" label="操作" align="center">
            <template slot-scope="{row}">
                <el-button type="text" v-if="row.state === 1 && showButtons.invalid " @click="invalid(row.inCode)">作废</el-button>
                <router-link :to="{ name: 'PutInStorageConent', query: { inCode: row.inCode, whouseId: row.whouseId, type: 0 } }">
                    <el-button type="text" v-if="row.state === 1 && showButtons.checkOrder">质检入库</el-button>
                </router-link>    
            </template>
        </el-table-column>
  </el-table>
</template>
<script>
import { mapState } from 'vuex'
export default {
    components: {
        // TableInfo,
    },
    computed: {
        ...mapState({
            colorList: state => state.common.colorList
        })
    },
    props: {
        tableData: {
            type: Array,
            default: () => []
        },
        showButtons: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            checkAll: false
        }
    },
    methods: {
        handleSelectionChange() {
            this.$emit('handleCheckAll', this.checkAll)
        },
        invalid(inCode) {
            this.$emit('invalid', inCode)
        }
    }
}
</script>
<style scoped lang="scss">
.info {
    .head-info {
       .ul-head {
           padding: 15px 0;
           border: 1px solid #dfe6ec;
           margin: 0px;
           background-color: #f5f7fa;
           display: flex;
           font-weight: bold;
           color: #333;
       } 
    }
    ul {
        display: flex;
        padding: 15px 0;
        width: 100%;
        li {
            display: flex;
            justify-content: center;
            width: 20%;        
        }
        // li:nth-child(2), li:nth-child(3) {
        //     width: 15%;
        // }
        li:first-child{
            width: 5%;
        }
        // li:nth-child(5){
        //     width: 15%;
        // }
    }
}
</style>