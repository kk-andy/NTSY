<template> 
    <el-table 
    :data="tableData" 
    max-height="600"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    >  
        <!-- <el-table-column type="selection" width="55" align="center"/> -->
        <el-table-column prop="transferCode" label="单据编号" align="center">
            <template slot-scope="{ row }">
                <router-link :to="{ name: 'EditTransfers', query: { transferCode: row.transferCode, sourceWhouseId: row.sourceWhouseId, distWhouseId: row.distWhouseId }}">
                    <span class="blue-color">{{ row.transferCode }}</span>
                </router-link>
            </template>
        </el-table-column>
        <el-table-column prop="site" label="单据状态" align="center">
            <template slot-scope="{ row }">
                <span :style="{ color: colorList[row.state].color }">{{ colorList[row.state].type }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="createDate" label="创建时间" align="center"></el-table-column>  
        <el-table-column prop="sourceWhouseName" label="调出仓库" align="center"></el-table-column>    
        <el-table-column prop="distWhouseName" label="调入仓库" align="center" />
        <el-table-column prop="createUser" label="调拨人" align="center" />
        <!-- <el-table-column prop="createUser" label="调拨单价" align="center" />
        <el-table-column prop="createUser" label="调拨总金额" align="center" /> -->
        <el-table-column prop="remark" label="备注" />
        <el-table-column label="操作" align="center">
            <template slot-scope="{ row }">
                <el-button size="mini" type="warning" @click="handleClick(row)" v-if="showButtons.audit" :disabled="row.state === 2 || row.state === 4">审核</el-button>
            </template>
        </el-table-column>
  </el-table>
</template>
<script>
import { array } from 'jszip/lib/support'
import { mapState } from 'vuex'
export default {
    name: 'TableContent',
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
    computed: {
         ...mapState({
            colorList: state => state.common.colorList
        }),
    },
    methods: {
        handleSelectionChange() {

        },
        handleClick(item) {
            this.$emit('audit', item.transferCode)
        }
    }
}
</script>