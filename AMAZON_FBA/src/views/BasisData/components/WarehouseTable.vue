<template>
    <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        max-height="550"
        row-key="whouseId"
        @selection-change="handleSelectionChange"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column type="selection" width="55" align="center"/>
        <el-table-column
        prop="whouseName"
        label="仓库名称"
        >
        <template slot-scope="{ row }">
            <router-link :to="{ name: 'WarehouseData', query: { type: 'edit', whouseId: row.whouseId } }">
                <span class="blue-color">{{ row.whouseName }}</span>
            </router-link>
        </template>
        </el-table-column>
        <el-table-column
        prop="spaceCount"
        align="center"
        label="库位总数"/> 
        <el-table-column
        prop="freeSpaceCount"
        align="center"
        label="空闲库位数"/> 
        <el-table-column
        prop="spaceValidCount"
        align="center"
        label="占用库位数"/> 
        <el-table-column
        prop="skuCount"
        width="100px"
        align="center"
        label="库存总数量"/>
        <el-table-column
        prop="state"
        align="center"
        label="仓库状态">
            <template slot-scope="{ row }">
                <span :class="row.state ? 'red-color' : 'blue-color' ">{{ row.state ? '停用' : '启用' }}</span>
            </template>
        </el-table-column>
        <el-table-column
        prop="purchaseCount"
        align="center"
        label="采购在途数量"/>
        <el-table-column
        width="280"
        align="center"
        label="操作">
            <template slot-scope="{ row }">
                <router-link :to="{ name: 'EdittheLocation', query: { whouseId: row.whouseId, warehouseName: row.whouseName  } }">
                    <el-button  type="primary"  size="small" v-if="showButtons.edit">编辑库位</el-button>
                </router-link>    
                <el-button  type="primary" size="small" @click="addLocation(row.whouseId, row.whouseName)" v-if="showButtons.add">新增库位</el-button>
                <el-button  type="primary" size="small" v-if="row.state && showButtons.start" @click="changeWhouseStatus(row.whouseId, 0)">启用</el-button>
                <el-button  type="danger" v-if="!row.state && showButtons.stop"  :disabled="row.skuCount !== 0" size="small" @click="changeWhouseStatus(row.whouseId, 1)">停用</el-button>
            </template>
        </el-table-column>
  </el-table>
</template>
<script>
export default {
    name: 'WarehouseTable',
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
    methods: {
        handleSelectionChange(val) {
            this.$emit('handleSelectionChange', val)
        },
        /* 新增库位 */
        addLocation(id, name) {
            this.$emit('addLocation', id, name)
        },
        /* 改变仓库的状态 */
        changeWhouseStatus(id, type) {
            this.$emit('changeWhouseStatus', id, type)
        }
    }
}
</script>
<style  lang="scss">
// .main {
    .el-table {
        .cell {
            .el-table__expand-icon {
                i {
                    font-weight: bold !important;
                    font-size: 16px;
                }
            }
        }
    }
// }
</style>