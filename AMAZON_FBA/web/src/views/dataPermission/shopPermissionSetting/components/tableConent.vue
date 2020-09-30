<template> 
    <el-table 
    :data="tableData" 
    style="width: 100%"
    max-height="600"
    @selection-change="handleSelectionChange"
    >  
        <!-- <el-table-column type="selection" width="55" align="center"/> -->
        <el-table-column prop="staffName"  align="center" label="用户名称"></el-table-column>
        <!-- <el-table-column prop="roleName" align="center" label="用户角色"></el-table-column>   -->
        <el-table-column prop="modifyDate"  align="center" label="修改时间"></el-table-column>    
        <el-table-column prop="currentCount"  align="center" label="用户所属店铺">
            <template slot-scope="{ row }">
                <!-- <div></div> -->
                <p :class="{ 'overflow-hidden': row.shopNameStr.length > 5 }">{{ row.shopNameStr }}</p>
            </template>
        </el-table-column>
        <el-table-column prop="remark" align="center" label="备注"/>
        <el-table-column prop="money" align="center" label="操作">
            <template slot-scope="{ row }">
                <!-- <el-button type="danger" @click="deleteData(row.recordId)">删除</el-button> -->
                <el-button type="primary"  @click="editShop(row)" v-if="showEdit">编辑</el-button>
            </template>
        </el-table-column>
  </el-table>
</template>
<script>
import { confirmMsg } from '@/utils/common'
export default {
    name: 'TableContent',
    props: {
        tableData: {
            type: Array,
            default: () => []
        },
        showEdit: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            num: 10
        }
    },
    methods: {
        handleSelectionChange() {

        },
        deleteData(id) {
            confirmMsg('warning', '提示', '你确定要删除吗?', () => {
                this.$emit('deleteData', id)
            })    
        },
        editShop(item) {
            this.$emit('editShop', item)
        }
    }
}
</script>
<style scoped lang="scss">
.overflow-hidden {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}
</style>