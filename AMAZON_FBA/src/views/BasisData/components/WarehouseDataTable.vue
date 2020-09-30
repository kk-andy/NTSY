<template> 
    <el-table 
    :data="tableData" 
    style="width: 100%"
    max-height="550"
    @selection-change="handleSelectionChange"
    >  
        <el-table-column type="selection" width="55" align="center"/>
        <el-table-column prop="spaceCode"  align="center" label="库位号"></el-table-column>
        <el-table-column prop="order" align="center" label="状态">
            <template slot-scope="{ row }">
                <span :class="row.state ? 'red-color' : 'blue-color' ">{{ row.state ? '占用' : '空闲' }}</span>
            </template>
        </el-table-column>  
        <el-table-column prop="skuCount" align="center"  label="绑定SKU">
            <template slot-scope="{ row }">
                <!-- <p size="mini" v-for="item in row.skuStr" :key="item">{{ item }}</p> -->
                <p v-for="item in row.skuStr" :key="item" class="sku-id">{{ item }}</p>
            </template>
        </el-table-column>    
        <el-table-column prop="pickingUser"  align="center" label="拣货负责人">
        </el-table-column>
        <el-table-column props="action" align="center" label="操作">
            <template slot-scope="{row}">
                <el-button type="primary" @click="bindingSKuInfo(row)" size="small">绑定SKU</el-button>
            </template>
        </el-table-column>
  </el-table>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'TableContent',
    props: {
        tableData: {
            type: Array,
            default: () => [{}]
        },
    },
    computed: {
         ...mapState({
            OAUserList: state => state.common.OAUserList
        })
    },
    data() {
        return {
            num: 10,
            list: []
        }
    },
    methods: {
        handleSelectionChange(val) {
            this.$emit('handleSelectionChange', val)
        },
        bindingSKuInfo(item) {
            this.$emit('bindingSKuInfo', item)
        },
        ...mapActions(['getOAUserList']),
        deleteData() {
            
        }
    },
    created() {
        this.getOAUserList()
    }
}
</script>
<style scoped lang="scss">
.sku-id {
    line-height: 0;
    min-width: 120px;
    height: 36px;
    line-height: 36px;
    background-color: #dfe6ec;
    border-radius: 5px;
    margin-bottom: 5px;
    text-align: center;
}
</style>