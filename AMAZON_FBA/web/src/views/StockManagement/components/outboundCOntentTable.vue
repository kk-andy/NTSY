<template> 
    <el-table 
    :data="tableData" 
    max-height="600"
    style="width: 100%"
    >  
        <!-- <el-table-column type="selection" width="55" align="center"/> -->
        <el-table-column prop="sku" label="SKU" align="center"></el-table-column>  
        <el-table-column prop="skuCount" label="数量" align="center"></el-table-column>  
        <!-- <el-table-column prop="sku" label="出入库总金额" align="center"></el-table-column>  
        <el-table-column prop="sku" label="出入库平均单价" align="center"></el-table-column>   -->
  </el-table>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'TableContent',
    props: {
        tableData: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        ...mapState({
            colorList: state => state.common.colorList
        }),
        height() {
            if (!this.tableData.length) {
                return '500px'
            }
        }
    },
    methods: {
        handleSelectionChange(val) {
            this.$emit('handleSelectionChange', val)
        }
    }
}
</script>