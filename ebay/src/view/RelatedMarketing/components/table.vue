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
            label="优先级"
            align="center"
            prop="sku"
        >
        <template slot-scope="{ row }">
              <el-input type="text" @blur="changeNum(row, row.quantity)" @focus="focusNum(row, row.quantity)" v-model.number="row.quantity" oninput="value=value.replace(/[^\d]/g,'')" />
        </template>
        </el-table-column>
        <el-table-column
            prop="规则名称"
            align="center"
            label="规则名称"        
        >
        </el-table-column>
        <el-table-column
            align="center"
            label="显示数量"     
        >
        </el-table-column>
        <el-table-column
            prop="cat_id_one_name"
            align="center"
            label="关联产品"
        >
        <template slot-scope="{ row }">
              <el-button type="text" @click="queryProduct(row)">{{ row.quantity }}</el-button>
        </template>
        </el-table-column>
        <el-table-column
            prop="created_at"
            align="center"
            label="店铺账号"
        >
        </el-table-column>
        <el-table-column
            prop="core_word"
            align="center"
            label="创建时间"
        >
        </el-table-column>    
        <el-table-column
            label="操作"
            align="center"
        >
            <template slot-scope="scope">
                <!-- <p class="text_fenpei" @click="distribution">主管分配</p> -->
                <!-- <p class="editor" @click="log">日志</p> -->
                <p class="editor" @click="edit(scope.row.spu)">编辑</p>
            </template>
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
        changeNum(item, value) {
            if (value === 0) {
                this.$message({
                    type: 'warning',
                    message: '优先级最低为1'
                })
                item.quantity = this.value
                return
            }
        },
        /* 查看关联产品 */
        queryProduct(item) {

        },
        focusNum(item, value) {
            this.value = value
        },
        edit(spu) {
            // this.$emit('edit', spu)
        }
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