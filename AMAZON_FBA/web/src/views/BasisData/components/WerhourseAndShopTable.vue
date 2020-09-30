<template>
    <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        max-height="500"
        row-key="id"
        @selection-change="handleSelectionChange">
        <el-table-column
        prop="shopName"
        align="center"
        label="店铺"/>
        <el-table-column
        prop="virtName"
        align="center"
        label="虚拟仓"
        >
        </el-table-column>
        <el-table-column
        prop="transferName"
        align="center"
        label="中转仓"/> 
        <el-table-column
        prop="airTransitionName"
        align="center"
        label="空运过度仓"/>
        <el-table-column
        prop="seaTransitionName"
        align="center"
        label="海运过度仓"/>
        <el-table-column
        prop="site"
        align="center"
        label="站点"/>
        <el-table-column
        align="center"
        width="220"
        label="操作">
            <template slot-scope="{ row }">
                <el-button type="danger" size="small"  @click="removeShop(row.relationId)" v-if="showButtons.del">删除</el-button>
                <el-button class="btn_button_primary" type="primary" size="small" @click="edit(row)" v-if="showButtons.edit">编辑</el-button>
            </template>
        </el-table-column>
  </el-table>
</template>
<script>
import { confirmMsg } from '@/utils/common'
export default {
    name: 'WarehouseBindingShopTable',
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
            warehous: '',
            list: []
        }
    },
    methods: {
        handleSelectionChange(val) {
            this.$emit('handleSelectionChange', val)
        },
        /* 编辑 */
        edit(item) {
            this.$emit('edit', item)
        },
        /* 删除 */
        removeShop(id) {
            confirmMsg('warning', '提示', '你确定要删除吗？', () => {
                this.$emit('deleteContent', id)
            })
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