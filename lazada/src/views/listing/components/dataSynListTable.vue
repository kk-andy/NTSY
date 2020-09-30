<template>
    <el-table
        ref="multipleTable"
        :data="tableData"
        height="500"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        border
        style="width: 100%"
    >
            <el-table-column
            type="selection"
            align="center"
            width="55"
        />
        <el-table-column
            label="Listing id"
            align="center"
            prop="item_id"
        >
        </el-table-column>
        <el-table-column
            prop="sku"
            align="center"
            label="刊登SKU"        
        >
        </el-table-column>
        <el-table-column
            prop="shop_name"
            align="center"
            label="店铺"     
        >
        </el-table-column>
        <el-table-column
            prop="online_status"
            align="center"
            label="产品状态"
        >
        </el-table-column>
        <el-table-column
            prop="type"
            align="center"
            label="同步事项"
        >
        </el-table-column>
        <el-table-column
            prop="created_at"
            align="center"
            label="修改前/修改后"
        >
            <template slot-scope="{ row }">
                <p>{{ row.change_before }}</p>
                <p>{{ row.change_after }}</p>            
            </template>
        </el-table-column>
        <el-table-column
            prop="push_date"
            align="center"
            label="同步时间"
        >
        </el-table-column>
        <el-table-column
            prop="push_status"
            align="center"
            label="同步状态"
        >
        </el-table-column>
        <el-table-column
            prop="error_msg"
            align="center"
            label="失败原因"
        >
        <template slot-scope="{row}">
            <el-popover
                placement="top-start"
                width="350"
                trigger="hover"
                :content="row.error_msg"
            >
            <span slot="reference" style="color:#46a6ff" class="isOverflow Overflow">{{row.error_msg}}</span>
            </el-popover>
        </template>
        </el-table-column>
        <el-table-column
            label="操作"
            align="center"
        >
            <template slot-scope="{ row }">
                <p type="primary" class="text_fenpei" v-if="row.push_status === '同步失败' && showSyncChronous " @click="againSynchronous(row.id)">重新同步</p>
            </template>
      </el-table-column>
    </el-table>
</template>
<script>
export default {
    props: {
        tableData: Array,
        showSyncChronous: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        againSynchronous(id) {
            this.$emit('againSynchronous', id)
        },
        handleSelectionChange(val) {
            this.$emit('handleSelectionChange', val)
        }
    }
}
</script>