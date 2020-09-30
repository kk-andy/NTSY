<template>
    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        border
        style="width: 100%"
    >
        <el-table-column
            label="账号负责人"
            align="center"
            prop="id"
        >
        </el-table-column>
        <el-table-column
            prop="word"
            align="center"
            label="目标值"        
        >
        </el-table-column>
        <el-table-column
            prop="created_name"
            align="center"
            label="目标情况"     
        >
        </el-table-column>
        <el-table-column
            prop="created_at"
            align="center"
            label="店铺"
        >
        </el-table-column>
        <el-table-column
            prop="created_at"
            align="center"
            label="销售额"
        >
        </el-table-column>
        <el-table-column
            :prop="item.time"
            width="70"
            align="center"
            :label="item.date"
            v-for="(item, index) in list"
            :key="index"
        >
        </el-table-column>
    </el-table>
</template>
<script>
export default {
    props: {
        tableData: {
            type: Array,
            default: () => []
        },
        list: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        log() {
            this.$emit('viewLog')
        },
        distribution() {
            this.$emit('distribution')
        }
    }
}
</script>