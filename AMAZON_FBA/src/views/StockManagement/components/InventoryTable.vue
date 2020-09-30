<template> 
    <el-table 
    :data="tableData" 
    max-height="600"
    :height="height"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    >  
        <!-- <el-table-column type="selection" width="55" align="center"/> -->
        <el-table-column prop="checkCode" label="单据编号" align="center">
            <template slot-scope="{ row }">
                <router-link :to="{ name: 'Editinventory', query: { checkCode: row.checkCode, warehouseId: row.whouseId } }">
                    <span class="blue-color">{{ row.checkCode }}</span>
                </router-link>
            </template>
        </el-table-column>
        <el-table-column prop="site" label="单据状态" align="center">
            <template slot-scope="{ row }">
                <span :style="{ color: colorList[row.state].color }">{{ colorList[row.state].type }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="createDate" label="制单日期" align="center"></el-table-column>  
        <el-table-column prop="whouseName" label="仓库" align="center"></el-table-column>    
        <el-table-column prop="createUser" label="盘点人" align="center" />
        <!-- <el-table-column prop="createUser" label="盘点数量" align="center" />
        <el-table-column prop="createUser" label="盘点单价" align="center" />
        <el-table-column prop="createUser" label="盘点总金额" align="center" /> -->
        <el-table-column prop="remark" label="备注" />
        <el-table-column label="操作" align="center">
            <template slot-scope="{ row }">
                <el-button size="mini" type="warning" @click="handleClick(row)" v-if="showButtons.audit" :disabled="row.state === 2 || row.state === 4">审核</el-button>
            </template>
        </el-table-column>
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
        },
        showButtons: {
            type: Object,
            required: true
        },
    },
    computed: {
        ...mapState({
            colorList: state => state.common.colorList
        }),
        height() {
            if (!this.tableData.length) {
                return '500px'
            }
        }
    },
    methods: {
        handleSelectionChange(val) {
            this.$emit('handleSelectionChange', val)
        },
        handleClick(item) {
            this.$emit('audit', item.checkCode)
        }
    }
}
</script>