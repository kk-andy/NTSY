<template> 
    <el-table 
    :data="tableData" 
    id="export-child"
    max-height="400"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    >  
        <!-- <el-table-column type="selection" width="55" align="center"/> -->
        <el-table-column prop="skuImg" align="center" label="产品图片">
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
        <el-table-column prop="skuName" align="center" label="中文名称"></el-table-column>  
        <el-table-column prop="spaceCode"  align="center" label="仓位"></el-table-column>    
        <el-table-column prop="currentCount"  align="center" label="盘点前库存" />
        <el-table-column prop="count" align="center" label="盘点库存">
            <template slot-scope="{ row }">
                <el-input v-model.number="row.count" clearable placeholder="请输入"  oninput="value=value.replace(/[^\d]/g,'')" />
            </template>
        </el-table-column>
        <!-- <el-table-column prop="count" align="center" label="盘点数量">
            <template slot-scope="{ row }">
                <el-input v-model.number="row.count" clearable placeholder="请输入"  oninput="value=value.replace(/[^\d]/g,'')" />
            </template>
        </el-table-column>
        <el-table-column prop="count" align="center" label="盘点单价">
            <template slot-scope="{ row }">
                <el-input v-model.number="row.count" clearable placeholder="请输入"  oninput="value=value.replace(/[^0-9.]/g,'')"  />
            </template>
        </el-table-column>
        <el-table-column prop="count" align="center" label="盘点总金额">
            <template slot-scope="{ row }">
                <el-input v-model.number="row.count" clearable placeholder="请输入"  oninput="value=value.replace(/[^0-9.]/g,'')"  />
            </template>
        </el-table-column> -->
        <el-table-column prop="money" align="center" label="差值">
            <template slot-scope="{ row }">
                <span :class="row.count >= row.currentCount ? 'green-color' : 'red-color'">
                    <span v-if="row.count >= row.currentCount">+</span>
                    {{ row.count - row.currentCount }}
                </span>
            </template>
        </el-table-column>
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
        deleteData(index) {
            this.$emit('deleteData', index)
        }
    }
}
</script>