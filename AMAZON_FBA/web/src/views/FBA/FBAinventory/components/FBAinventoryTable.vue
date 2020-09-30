<template>
  <div>
	<el-table
		:data="tableData"
		max-height="600"
		style="width:100%"
		@selection-change="handleSelectionChange"
		>
		>
		<el-table-column type="selection" width="55"></el-table-column>
		<el-table-column  prop="shop_name" label="店铺" align="center" />
		<el-table-column  prop="whouse_name" label="虚拟仓" align="center" />
		<el-table-column  prop="address" label="图片" align="center">
			<template slot-scope="{ row }">
				<el-popover placement="right" width="350" trigger="hover">
                    <img :src="row.main_image" alt style="width:100%;" />
                    <div slot="reference" style="text-align: center">
                        <img
                            :src="row.main_image"
                            alt
                            style="width: 60px"
                        />
                    </div>
                </el-popover>
			</template>
		</el-table-column>
		<el-table-column prop="asin" label="ASIN" align="center" />
		<el-table-column prop="m_sku" label="MSKU" align="center" />
		<el-table-column prop="fn_sku" label="FNSKU" align="center" />
		<el-table-column prop="sku" label="SKU" align="center">
		</el-table-column>
		<el-table-column prop="title" label="品名" align="center" width="180" />
		<el-table-column prop="stock_cost" label="库存成本" align="center" />

		<el-table-column prop="sku_value" label="货值" align="center" />
		<el-table-column prop="sellable_stock" label="可售" align="center" />
		<el-table-column prop="no_shipped_stock" label="待发货" align="center" />
		<el-table-column prop="plan_to_purchase" label="计划入库" align="center" />
		<el-table-column prop="in_transit_stock" label="在途" align="center" />
		<el-table-column prop="inbound_working_stock" label="入库中" align="center" />
		<el-table-column prop="unsellable_stock" label="不可售" align="center" />
		</el-table>
  </div>
</template>

<script>
export default {
  data() {
	return {};
  },
  props: {
	tableData: {
	  type: Array,
	},
  },
  methods: {
	//table checkbox选中状态
	handleSelectionChange(arg) {
	  console.log(arg);
	},
  },
};
</script>

<style lang="scss" scoped>
.shipmentsBtn {
  outline: none;
  border: 0;
  background: white;
  color: #1890ff;
}
</style>