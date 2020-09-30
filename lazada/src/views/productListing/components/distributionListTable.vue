<template>
    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        border
        style="width: 100%"
    >
        <el-table-column
        type="selection"
        align="center"
        width="55"
      />
        <el-table-column
            label="SKU"
            align="center"
            prop="id"
        >
        </el-table-column>
        <el-table-column
            prop="word"
            align="center"
            label="标题"        
        >
        </el-table-column>
        <el-table-column
            prop="created_name"
            align="center"
            label="缩略图"     
        >
        </el-table-column>
        <el-table-column
            prop="created_at"
            align="center"
            label="产品线"
        >
        </el-table-column>
        <el-table-column
            prop="created_at"
            align="center"
            label="是否已刊登"
        >
        </el-table-column>
        <el-table-column
            prop="created_at"
            align="center"
            label="产品属性"
        >
        </el-table-column>
        <el-table-column
            prop="created_at"
            align="center"
            label="分配状态"
        >
        </el-table-column>
        <el-table-column
            prop="created_at"
            align="center"
            label="分配信息"
        >
        </el-table-column>
        <el-table-column
            prop="created_at"
            align="center"
            label="刊登店铺"
        >
        </el-table-column>
        <el-table-column
            prop="created_at"
            align="center"
            label="SKU生成时间"
        >
        </el-table-column>
        <el-table-column
            label="操作"
            align="center"
        >
            <template slot-scope="scope">
                <p class="text_fenpei" >编辑</p>
                <p class="text_fenpei" @click="distribution">组长分配</p>
                <p class="editor" @click="log">日志</p>
            </template>
      </el-table-column>
    </el-table>
</template>
<script>
export default {
    props: {
        tableData: Array,
        default: () => []
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