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
            label="店铺/站点"
        >
        </el-table-column>
        <el-table-column
            prop="created_at"
            align="center"
            label="售卖形式"
        >
        </el-table-column>
        <el-table-column
            prop="created_at"
            align="center"
            label="类型"
        >
        </el-table-column>
        <el-table-column
            prop="created_at"
            align="center"
            label="创建人"
        >
        </el-table-column>
        <el-table-column
            prop="created_at"
            align="center"
            label="创建时间"
        >
        </el-table-column>
        <el-table-column
            label="操作"
            align="center"
        >
            <template slot-scope>
                <p type="primary" class="text_fenpei" @click="edit">编辑</p>
                <p class="text_fenpei" @click="release">发布</p>
                <p class="editor" @click="delete_pro">删除</p>
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
        delete_pro() {
            this.$emit('delete_pro')
        },
        release() {
            this.$emit('release')
        },
        edit() {
            this.$emit('edit')
        },
        log() {
            this.$emit('viewLog')
        }
    }
}
</script>