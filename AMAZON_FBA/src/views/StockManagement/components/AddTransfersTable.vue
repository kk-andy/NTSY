<template> 
    <el-table 
    :data="tableData" 
    id="export-child"
    max-height="400"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    >  
        <!-- <el-table-column type="selection" width="55" align="center"/> -->
        <el-table-column prop="shop" align="center" label="产品图片">
            <template slot-scope="{ row }">
                <el-popover placement="right" width="350" trigger="hover">
                    <img :src="row.skuImg" alt style="width:100%;" />
                    <div slot="reference" style="text-align: center">
                        <img
                            :src="row.skuImg"
                            alt
                            style="width: 60px"
                        />
                    </div>
                </el-popover>
            </template>    
        </el-table-column>
        <el-table-column prop="sku"  align="center" label="库存SKU"></el-table-column>
        <el-table-column prop="skuName" align="center" label="中文名称" width="200"></el-table-column>  
        <el-table-column   align="center" label="调出仓库库存数量/占用量/可用量">
            <template slot="header" v-if="show">
                <span>调出仓库库存数量/占用量/可用量</span>
            </template>
             <template slot="header" v-else>
                <span>调出仓库库存数量</span>
            </template>
            <!-- <template slot-scope="{ row }" v-if="show">
                <span>{{ row.sourceTotalCount }}/{{ row.sourceOccupyCount }}/{{ row.sourceCurrentCount }}</span>
            </template> -->
            <template slot-scope="{ row }" >
                <span v-if="show">{{ row.sourceTotalCount }}/{{ row.sourceOccupyCount }}/{{ row.sourceCurrentCount }}</span>
                <span v-else>{{ row.sourceCurrentCount }}</span>
            </template>
        </el-table-column>    
        <el-table-column prop="sourceSpaceCode"  align="center" label="调出库位" />
        <el-table-column prop="distCurrentCount"  align="center" label="调入仓库存数量" />
        <el-table-column prop="distSpaceCode"  align="center" label="调入库位" />
        <el-table-column prop="money" align="center" label="调拨数量">
            <template slot-scope="{ row }">
                <el-input v-model.number="row.count" clearable placeholder="请输入" oninput="value=value.replace(/[^\d]/g,'')" />
            </template>
        </el-table-column>
        <!-- <el-table-column prop="money" align="center" label="调拨单价">
            <template slot-scope="{ row }">
                <el-input v-model.number="row.count" clearable placeholder="请输入" oninput="value=value.replace(/[^0-9.]/g,'')" />
            </template>
        </el-table-column>
        <el-table-column prop="money" align="center" label="调拨总金额">
            <template slot-scope="{ row }">
                <el-input v-model.number="row.count" clearable placeholder="请输入" oninput="value=value.replace(/[^\d]/g,'')" />
            </template>
        </el-table-column> -->
        <el-table-column prop="money" align="center" label="操作">
            <template slot-scope="{ $index }">
                <el-button class="btn_button_delete" @click="deleteData($index)">删除</el-button>
            </template>
        </el-table-column>
  </el-table>
</template>
<script>
export default {
    name: 'TableContent',
    props: {
        tableData: {
            type: Array,
            default: () => [{}]
        },
        show: {
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
        handleSelectionChange(val) {
            this.$emit('handleSelectionChange', val)
        },
        deleteData(index) {
            this.$store.commit('Transfers/DELETE_ITEMS', index)
        }
    }
}
</script>