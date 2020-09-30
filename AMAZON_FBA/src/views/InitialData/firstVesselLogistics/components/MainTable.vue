<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{ background: '#F5F7FA', color: '#606266' }"
      @selection-change="handleSelectionChange"
    >
      >
      <el-table-column type="selection" width="55" />
      <el-table-column width="180" label="运输方式" align="center" />
      <el-table-column prop="site" label="物流方式" align="center" />
      <el-table-column width="100" prop="" label="物流商" align="center" />
      <el-table-column prop="" label="运费分摊方式" align="center" />
      <el-table-column width="120" prop="" label="记泡系数" align="center" />
      <el-table-column width="150" prop="" label="分泡比" align="center" />
      <el-table-column prop="" label="起送量" align="center" />
      <el-table-column prop="" label="单价" align="center" />
      <el-table-column prop="" label="备注" align="center" />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button>编辑</el-button>
          <el-button>删除</el-button>
        </template>
      </el-table-column>
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