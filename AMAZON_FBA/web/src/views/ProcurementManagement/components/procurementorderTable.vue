<template>
    <el-table 
    :data="tableData" 
    max-height="650"
    style="width: 100%"
    >  
        <el-table-column prop="purchaseId" label="采购单号" align="center">
            <template slot-scope="{row}">
                <span class="blue-color">{{ row.purchaseId }}</span>
            </template>    
        </el-table-column>
        <el-table-column prop="order" label="采购单信息" width="300" align="center">
            <template slot-scope="{ row }">
                <span class="green-color">【供应商：{{ row.supplierName }}】</span>
            </template>
        </el-table-column>  
        <el-table-column prop="order" label="采购单状态" align="center">
            <template slot-scope="{ row }">
                <span :style="{ color: colorList[row.state].color }">{{ row.state === 1 ? '尚未入库' : row.state === 2 ? '部分到货' : '完全到货'}}</span>
            </template>
        </el-table-column>  
        <el-table-column prop="purchaseCount" label="数量" align="center"></el-table-column>   
        <el-table-column prop="purchaser" label="采购员" align="center"></el-table-column> 
        <el-table-column prop="shipOrder" label="快递单号" align="center"></el-table-column>  
        <el-table-column prop="whouseName" label="仓库" align="center" />
        <el-table-column prop="totalAmount" label="采购总金额" align="center"></el-table-column>  
        <el-table-column prop="expressAmount" label="总运费" align="center" />
        <el-table-column prop="taxAmount" label="总税费" align="center"></el-table-column>  
        <el-table-column prop="money" label="签收量/采购量" align="center">
            <template slot-scope="{row}">
                <span>{{ row.inCount }}/{{ row.purchaseCount }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="money" label="操作" align="center">
            <template slot-scope="{row}">
                <router-link :to="{ name: 'StorageContent', query: { purchaserId: row.purchaseId } }">
                    <el-button type="text" v-if="row.state !== 3 && showButtons.generateorder ">生成入库单</el-button>
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
            checkAll: false,
            
        }
    },
    methods: {
        handleSelectionChange() {
            this.$emit('handleCheckAll', this.checkAll)
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