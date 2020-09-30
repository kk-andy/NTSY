<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{ background: '#F5F7FA', color: '#606266' }"
      :default-sort="{ prop: 'date', order: 'ascending' }"
      @selection-change="handleSelectionChange"
      @sort-change="sortChange"
    >
      >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column width="180" label="发货单号" align="center">
        <template slot-scope="scope">
          <el-link
            type="primary"
            :underline="false"
            @click="toShipmentsPlanDetail(scope.row.id)"
            >{{ scope.row.invoice_code }}</el-link
          >
        </template>
      </el-table-column>

      <el-table-column prop="site" label="站点" align="center" />

      <el-table-column
        width="100"
        prop="shipment_id"
        label="shipmentID"
        align="center"
      />
      <el-table-column prop="creater_name" label="创建人" align="center" />

      <el-table-column
        width="120"
        prop="invoice_amount"
        sortable="custom"
        label="发货金额"
        align="center"
      />

      <el-table-column
        width="150"
        prop="created_time"
        sortable="custom"
        label="创建时间"
        align="center"
      />

      <el-table-column prop="shipping_fee" label="运费" align="center" />
      <el-table-column prop="taxes" label="税费" align="center" />
      <el-table-column prop="pay_amost" label="付款金额" align="center" />
      <el-table-column
        width="150"
        prop="pay_time"
        label="付款时间"
        align="center"
      />
      <el-table-column prop="pay_remark" label="付款备注" align="center" />

      <el-table-column prop="tracking_id" label="跟踪号" align="center" />
    </el-table>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  props: {
    tableData: {
      type: Array,
    },
  },
  computed: {
    ...mapState({
      tableSel: (state) => state.FBAshipmentsBill.tableSel,
    }),
  },
  methods: {
    ...mapMutations("FBAshipmentsBill", [
      "changeTableSel", //改变table选中项
    ]),
    //table checkbox选中状态
    handleSelectionChange(arg) {
      this.changeTableSel(arg);
    },
    //发货单详情
    toShipmentsPlanDetail(arg) {
      this.$router.push({ name: "shipmentsBillDetail", query: { id: arg } });
    },
    //排序
    sortChange(arg) {
      let sort_by = arg.prop;
      let sort_rule = "";
      if (arg.order == "descending") {
        sort_rule = "desc";
      } else if (arg.order == "ascending") {
        sort_rule = "asc";
      } else {
        sort_rule = "";
      }
      this.$emit("sortable", { sort_by: sort_by, sort_rule: sort_rule });
    },
  },
  mounted() {
    this.changeTableSel([]);
    console.log(this.tableSel);
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