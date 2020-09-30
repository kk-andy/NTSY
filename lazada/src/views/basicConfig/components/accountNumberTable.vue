<template>
    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        height="550px"
        border
        style="width: 100%;margin-top: 30px"
    >
        <el-table-column
            label="账号名"
            align="center"
            prop="account_name"
        >
        </el-table-column>
        <el-table-column
            prop="access_token"
            align="center"
            label="token"        
        >
        </el-table-column>
        <el-table-column
            prop="status"
            align="center"
            label="状态"     
        >
            <template slot-scope="scope">
                {{scope.row.status ? '启用' : '禁用'}}
            </template>
        </el-table-column>
        <el-table-column
            prop="site_code"
            align="center"
            label="站点"
        >
        </el-table-column>
        <el-table-column
            prop="seller_name"
            align="center"
            label="销售员"
        >
        </el-table-column>
        <el-table-column
            prop="shop_name"
            align="center"
            label="店铺名"
        >
        </el-table-column>
        <el-table-column
            prop="creator_name"
            align="center"
            label="创建人"
        >
        </el-table-column>
        <el-table-column
            prop="shipping_method"
            align="center"
            label="店铺运输方式"
        >
            <template slot-scope="{ row }">
                {{ row.shipping_method === 'LGS' ? '普通' : '陆运' }}
            </template>
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
            <template slot-scope="scope">
                <p type="primary" class="text_fenpei" @click="edit(scope.row.id)" v-if="showEdit">编辑</p>
            </template>
      </el-table-column>
    </el-table>
</template>
<script>
export default {
    props: {
        tableData: Array,
        showEdit: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        edit(account_id) {
            this.$emit('edit', account_id)
        },
    }
}
</script>