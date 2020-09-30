<template>
    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        height="500"
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
            prop="product_sku"
        >
        </el-table-column>
        <el-table-column
            label="Llisting ID"
            align="center"
            prop="item_id"
        >
        </el-table-column>
        <el-table-column
            prop="pd_name"
            align="center"
            label="标题"        
        >
        </el-table-column>
        <el-table-column
            align="center"
            label="缩略图"     
        >
            <template slot-scope="{row}">
                <a :href="row.thumbnail" target="_blank" v-if="row.thumbnail">
                <el-popover placement="right" width="350" trigger="hover">
                    <img :src="row.thumbnail" alt style="width:100%;" />
                    <div slot="reference">
                    <img
                        :src="row.thumbnail"
                        alt
                        style="width:60%; text-align:center;margin-top:10px"
                    />
                    </div>
                </el-popover>
                </a>
            </template>
        </el-table-column>
        <el-table-column
            prop="pl_name"
            align="center"
            label="产品线"
        >
        </el-table-column>
        
        <el-table-column
            prop="is_global"
            align="center"
            label="是否六合一"
        >
        </el-table-column>
        <el-table-column
            prop="is_global"
            align="center"
            label="刊登来源"
        >
            <template slot-scope="{row}">
                {{ row.push_source ? '复制刊登' :  '选品刊登'}}
            </template>
        </el-table-column>
        <el-table-column
            prop="push_date"
            align="center"
            label="刊登时间"
        >
        </el-table-column>
        <el-table-column
            prop="shop"
            align="center"
            label="刊登店铺"
        >
        </el-table-column>
        <el-table-column
            prop="push_status"
            align="center"
            label="刊登状态"
        >
        </el-table-column>
        <el-table-column
            align="center"
            label="错误原因"
        >
            <template slot-scope="{row}">
              <el-popover
                placement="top-start"
                width="350"
                style="overflow:hidden"
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
                <!-- <span class="text_fenpei">编辑</span>
                <span class="editor">同步</span>
                <span class="editor">日志</span> -->
                <el-button
                type="text"
                class="editColor"
                v-if="row.push_status === '刊登失败' && showButtons.edit "
                @click="edit(row.id)"
              >编辑</el-button>
              <el-button
                type="text"
                @click="synchronous(row.id)"
                v-if="row.push_status === '刊登失败' && showButtons.synchronous "
                class="synColor"
              >同步</el-button>
              <el-button
                class="synColor"
                v-if="showButtons.log"
                type="text"
                @click="getLog(row.id)"
              >日志</el-button>
            </template>
      </el-table-column>
    </el-table>
</template>
<script>
export default {
    props: {
        tableData: Array,
        showButtons: {
            type: Object,
            required: true
        }
    },
    methods: {
        synchronous(id) {
            this.$emit('synchronous', id)
        },
        edit(id) {
            this.$emit('edit', id)
        },
        getLog(id) {
            this.$emit('viewLog', id)
        },
        handleSelectionChange(val) {
            this.$emit('handleSelectionChange', val)
        },
    }
}
</script>
<style scoped>
.editColor {
  color: #e6a23c;
}
.synColor {
  color: #67c23a;
}
.logColor {
  color: #909399;
}
</style>