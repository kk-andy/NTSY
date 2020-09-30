<template> 
    <el-table 
    :data="tableData" 
    style="width: 100%"
    @selection-change="handleSelectionChange"
    >  
        <el-table-column type="selection" width="55" align="center"/>
        <el-table-column prop="roleName"  align="center" label="角色名称"></el-table-column>
        <el-table-column prop="createUserName" align="center" label="创建人"></el-table-column>  
        <el-table-column prop="createDate"  align="center" label="创建时间"></el-table-column>    
        <el-table-column prop="currentCount"  align="center" label="角色所属店铺">
            <template slot-scope="{ row }">
                <!-- <div></div> -->
                <p>{{ row.shopNameStr }}</p>
            </template>
        </el-table-column>
        <el-table-column prop="remark" align="center" label="备注"/>
        <el-table-column prop="money" align="center" label="操作">
            <template slot-scope="{ row }">
                <el-button type="danger" @click="deleteData(row.recordId)">删除</el-button>
                <el-button type="primary"  @click="editShop(row)">编辑</el-button>
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