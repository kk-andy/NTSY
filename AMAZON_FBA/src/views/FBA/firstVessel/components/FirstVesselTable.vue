<template>
  <div>
    <el-table
      :data="tableData"
      @selection-change="selectionChange"
      style="width: 100%"
      :span-method="arraySpanMethod"
      :header-cell-style="{ background: '#F5F7FA', color: '#606266' }"
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-table
            :data="scope.row.items"
            :show-header="false"
            style="width: 100%"
            class="two-list"
          >
            <el-table-column width="55"></el-table-column>
            <el-table-column
              width="120"
              prop="city_name"
              label="图片"
              align="center"
            >
              <template slot-scope="scope">
                <div style="width: 100%; height: 50px; background: red">
                  <img :src="scope.row.main_image" width="100%" alt />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              width="120"
              prop="m_sku"
              label="MSKU"
              align="center"
            ></el-table-column>
            <el-table-column
              width="120"
              prop="fn_sku"
              label="FNSKU"
              align="center"
            ></el-table-column>
            <el-table-column
              width="120"
              prop="asin"
              label="ASIN"
              align="center"
            ></el-table-column>
            <el-table-column
              width="200"
              prop="title"
              label="品名"
              align="center"
            ></el-table-column>
            <el-table-column
              width="200"
              prop="product_sku"
              label="SKU"
              align="center"
            ></el-table-column>
            <el-table-column
              width="120"
              prop="shipped_num"
              label="发货量"
              align="center"
            ></el-table-column>
            <el-table-column
              width="120"
              prop="received_num"
              label="签收量"
              align="center"
            ></el-table-column>
            <el-table-column width="100" label="头程费用" align="center">
              <template slot-scope="scope">
                {{ scope.row.first_leg_amount ? "￥" : ""
                }}{{ scope.row.first_leg_amount }}
              </template>
            </el-table-column>
            <el-table-column />
          </el-table>
        </template>
      </el-table-column>
      <el-table-column width="55" type="selection"></el-table-column>
      <el-table-column width="120" label="图片" align="center">
        <template width="120" slot-scope="scope">
          <el-link type="primary" :underline="false">
            <span>货件单号：</span>
            {{ scope.row.inbound_code }}
          </el-link>
        </template>
      </el-table-column>
      <el-table-column width="120" label="MSKU" align="center">
        <template slot-scope="scope">
          <span>虚拟仓：</span>
          {{ scope.row.warehouse_name }}
        </template>
      </el-table-column>
      <el-table-column width="120" label="FNSKU" align="center">
        <template slot-scope="scope">
          <span>发货时间：</span>
          {{ scope.row.shipping_time }}
        </template>
      </el-table-column>
      <el-table-column width="120" label="ASIN" align="center">
        <template slot-scope="scope">
          <span>物流商单号：</span>
          {{ scope.row.tracking_code }}
        </template>
      </el-table-column>

      <el-table-column width="200" label="品名" align="center">
        <template slot-scope="scope">
          {{ scope.row.first_leg_amount ? "￥" : ""
          }}{{ scope.row.first_leg_amount }}</template
        >
      </el-table-column>
      <el-table-column width="200" label="SKU" align="center">
        <template slot-scope="scope">
          {{ scope.row.pay_amost ? "￥" : "" }}{{ scope.row.pay_amost }}
        </template>
      </el-table-column>
      <el-table-column width="120" label="发货量" align="center">
        <template slot-scope="scope">
          {{ scope.row.deliver_status }}
        </template>
      </el-table-column>
      <el-table-column width="120" label="签收量" align="center" />
      <el-table-column width="100" label="头程费用" align="center" />
      <el-table-column width="100" label="付款金额" align="center" />
      <el-table-column label="物流状态" align="center" />
      <!-- <el-table-column /> -->
    </el-table>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {};
  },

  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    // total: {
    //   type: Number,
    //   default: 0,
    // },
  },

  methods: {
    ...mapMutations("FBAfirstVessel", ["changeTableSel"]),
    //多选
    selectionChange(arg) {
      this.changeTableSel(arg);
    },
    //合并
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 2) {
        return [1, 2];
      } else if (columnIndex === 3) {
        return [1, 2];
      } else if (columnIndex === 4) {
        return [1, 2];
      } else if (columnIndex === 5) {
        return [1, 2];
      } else if (columnIndex === 6) {
        return [1, 1];
      } else if (columnIndex === 7) {
        return [1, 1];
      }
    },
  },
  components: {
    // TableInfo,
  },
};
</script>
<style scoped lang="scss">
</style>