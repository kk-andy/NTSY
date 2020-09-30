<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{ background: '#F5F7FA', color: '#606266' }"
    >
      <el-table-column width="120" label="图片" align="center">
        <template slot-scope="scope">
          <img
            style="width: 100px; height: 50px"
            :src="scope.row.main_image"
            alt=""
          />
        </template>
      </el-table-column>

      <el-table-column
        width="180"
        prop="site"
        label="MSKU/FNSKU"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.m_sku }}/{{ scope.row.fn_sku }}
        </template>
      </el-table-column>
      <el-table-column prop="attr" label="商品属性" align="center">
      </el-table-column>
      <el-table-column prop="site" label="品名/SKU" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}/{{ scope.row.product_sku }}
        </template>
      </el-table-column>
      <el-table-column
        width="100"
        prop="plan_num"
        label="申报量"
        align="center"
      />
      <el-table-column width="280" prop="site" label="包装规格" align="center">
        <template slot-scope="scope">
          <el-input
            style="width: 70px"
            :value="scope.row.inner_length"
            disabled
          />
          <span style="margin: 0 5px 0 5px">-</span>
          <el-input
            style="width: 70px"
            :value="scope.row.inner_width"
            disabled
          />
          <span style="margin: 0 5px 0 5px">-</span>
          <el-input
            style="width: 70px"
            :value="scope.row.inner_height"
            disabled
          />
        </template>
      </el-table-column>

      <el-table-column
        width="100"
        prop="product_gross_weight"
        label="单品毛重"
        align="center"
      />
      <el-table-column label="税费" align="center">
        <template slot="header">
          <span style="color: red">*</span>
          <span>税费</span>
        </template>
        <template slot-scope="scope">
          <el-input
            style="width: 80px"
            placeholder="请输入"
            v-model="scope.row.taxes"
            :disabled="type == 1 ? true : false"
            @input="countFirstCost(scope.row, scope.$index)"
          />
        </template>
      </el-table-column>

      <el-table-column
        width="100"
        prop="first_leg_fee"
        label="头程费用"
        align="center"
      >
        <!-- <template slot-scope="scope"> </template> -->
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { debounce } from "@/utils/common";
import { reqGetFirstFee } from "@/api/FBA";
export default {
  props: {
    tableData: {
      type: Array,
    },
    logistics_fee: {},
    fee_avg_assign: {},
    type: {},
  },
  methods: {
    //头程费用计算
    countFirstCost(arg, index) {
      if (arg.taxes < 1) {
      }
      if (!this.logistics_fee || !this.fee_avg_assign) {
        this.$message.error("请先完善运费和运费分摊方式");
        this.tableData[index].taxes = "";
      } else {
        debounce(() => {
          this.$emit("changeSaveDisabled", true);
          reqGetFirstFee({
            fee_avg_assign: this.fee_avg_assign,
            product_sku: arg.product_sku,
            logistics_fee: this.logistics_fee,
            taxes: arg.taxes,
            plan_num: arg.plan_num,
            sku_list: this.tableData,
          })
            .then((data) => {
              this.$emit("changeSaveDisabled", false);
              if (data.code == 0) {
                this.tableData[index].first_leg_fee = data.data.fee;
              }
            })
            .catch(() => {
              this.$emit("changeSaveDisabled", false);
            });
        }, 500);
      }
    },
  },
};
</script>

<style>
</style>