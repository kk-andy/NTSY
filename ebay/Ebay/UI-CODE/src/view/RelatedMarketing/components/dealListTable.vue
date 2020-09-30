<template>
    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        maxheight="500"
        border
        style="width: 100%; marign-top: 35px"
    >
        <el-table-column 
        type="selection" 
        width="55" 
        align="center">
        </el-table-column>
        <el-table-column
            label="规则名称"
            align="center"
            prop="sku"
        >
        </el-table-column>
        <el-table-column
            prop="规则名称"
            align="center"
            label="Item ID"        
        >
        </el-table-column>
        <el-table-column
            align="center"
            label="显示数量"     
        >
        </el-table-column>
        <el-table-column
            prop="created_at"
            align="center"
            label="时间"
        >
        </el-table-column>
        <el-table-column
            prop="core_word"
            align="center"
            label="状态"
        >
        </el-table-column>    
    </el-table>
</template>
<script>
export default {
    props: {
        tableData: Array,
    },
    data() {
        return {
            value: null
        }
    },
    methods: {
        
    }
}
</script>
<style lang="scss">
.main {
    .el-card {
        margin-bottom: 35px;
    }
}
</style>