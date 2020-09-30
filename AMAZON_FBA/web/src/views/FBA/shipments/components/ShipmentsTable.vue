<template>
  <div>
    <el-table
      :data="tableData"
      @expand-change="expandChange"
      @selection-change="FselectionChange"
      max-height="600"
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
            @selection-change="SselectionChange"
          >
            <el-table-column width="55"></el-table-column>
            <el-table-column
              width="150"
              prop="city_name"
              label="图片"
              align="center"
            >
              <template slot-scope="scope">
                <div style="width: 120px; height: 50px">
                  <img
                    style="width: 100px; height: 50px"
                    :src="scope.row.main_image"
                    alt
                  />
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
              width="200"
              prop="SKU"
              label="品名/SKU"
              align="center"
            >
              <template slot-scope="scope"
                >{{ scope.row.title }}/{{ scope.row.product_sku }}</template
              >
            </el-table-column>
            <el-table-column
              width="200"
              prop="outbound_warehouse"
              label="出货仓库"
              align="center"
            ></el-table-column>
            <el-table-column
              width="100"
              prop="space_code"
              label="库位"
              align="center"
            ></el-table-column>
            <el-table-column
              width="100"
              prop="plan_num"
              label="申报量"
              align="center"
            ></el-table-column>
            <el-table-column
              width="100"
              prop="shipped_num"
              label="已发货"
              align="center"
            ></el-table-column>
            <el-table-column
              width="100"
              prop="received_num"
              label="签收量"
              align="center"
            ></el-table-column>
            <el-table-column
              width="100"
              prop="difference"
              label="差额"
              align="center"
            ></el-table-column>
            <el-table-column
              width="100"
              prop="attr"
              label="商品属性"
              align="center"
            />
            <!-- <template>22212</template> -->
            <!-- </el-table-column> -->
            <el-table-column></el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column width="55" type="selection"></el-table-column>
      <el-table-column width="150" label="图片" align="center">
        <template width="120" slot-scope="scope">
          <el-link
            @click="toShipmentsDetail(scope.row.id)"
            type="primary"
            :underline="false"
            >{{ scope.row.inbound_code }}</el-link
          >
        </template>
      </el-table-column>
      <el-table-column width="120" label="MSKU" align="center">
        <template slot-scope="scope">
          <span>虚拟仓：</span>
          {{ scope.row.warehouse_name }}
        </template>
      </el-table-column>
      <!-- <el-table-column width="120" label="实重" align="center">
        <template slot-scope="scope">
          <span>实重：</span>
          {{11111111}}
        </template>
      </el-table-column>-->
      <el-table-column width="120" label="FNSKU" align="center">
        <template slot-scope="scope">
          <span>配送地址：</span>
          {{ scope.row.delivery_address }}
        </template>
      </el-table-column>
      <el-table-column width="200" label="品名/SKU" align="center">
        <template slot-scope="scope">
          <span>创建人：</span>
          {{ scope.row.creater_name }}
        </template>
      </el-table-column>
      <el-table-column width="200" label="出货仓库" align="center">
        <template slot-scope="scope">
          <span>创建时间：</span>
          {{ scope.row.created_time }}
        </template>
      </el-table-column>
      <el-table-column width="100" label="库位" align="center">
        <template slot-scope="scope">
          <span>同步时间：</span>
          {{ scope.row.updated_time }}
        </template>
      </el-table-column>
      <el-table-column width="100" label="申报量" align="center">
        <template slot-scope="{ row }">{{ row.volumetric_weight }}</template>
      </el-table-column>

      <el-table-column width="100" label="已发货" align="center">
        <template slot-scope="{ row }">{{ row.gross_weight_total }}</template>
      </el-table-column>
      <el-table-column width="100" label="签收量" align="center">
        <template slot-scope="{ row }"
          >{{ row.volumetric_weight_rate }}%</template
        >
      </el-table-column>

      <el-table-column width="100" label="差额" align="center">
        <template slot-scope="{ row }">{{ row.taxes }}</template>
      </el-table-column>
      <el-table-column width="100" label="商品属性" align="center">
        <template slot-scope="{ row }">{{ row.logistics_fee }}</template>
      </el-table-column>
      <el-table-column width="80" label="抛重" align="center">
        <template slot-scope="scope">
          <p
            :style="{
              color: scope.row.shipment_status == 'WORKING' ? 'green' : '',
            }"
          >
            {{ scope.row.shipment_status }}
          </p>
        </template>
      </el-table-column>
      <el-table-column width="80" label="实重" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.pack_status == 1" style="color: green"
            >补充基础信息</span
          >
          <span v-if="scope.row.pack_status == 2" style="color: green"
            >上传物流状态</span
          >
          <span v-if="scope.row.pack_status == 3" style="color: green"
            >上传装箱信息</span
          >
          <span v-if="scope.row.pack_status == 4" style="color: green"
            >打印箱子标签</span
          >
          <span v-if="scope.row.pack_status == 5" style="color: deepSkyBlue"
            >标记发货</span
          >
          <span v-if="scope.row.pack_status == 6" style="color: red"
            >作废中</span
          >
          <span v-if="scope.row.pack_status == 7" style="color: red"
            >作废成功</span
          >
          <span v-if="scope.row.pack_status == 8" style="color: red"
            >作废失败</span
          >
        </template>
      </el-table-column>
      <el-table-column width="80" label="抛重比" align="center">
        <template slot-scope="scope">
          <el-popconfirm
            title="确定作废吗"
            @onConfirm="cancellation(scope.row, scope.$index)"
          >
            <el-button
              slot="reference"
              type="primary"
              size="small"
              :disabled="
                scope.row.pack_status == 6 || scope.row.pack_status == 5
              "
              v-if="showButtons.invalid"
              >作废</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
      <el-table-column width="80" label="税费" align="center"></el-table-column>
      <el-table-column width="80" label="运费" align="center"></el-table-column>
      <el-table-column
        width="120"
        label="后台状态"
        align="center"
      ></el-table-column>
      <el-table-column
        label="打包状态"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { reqCancellation } from "@/api/FBA";
import { loading, loadingClose, dateFormat } from "@/utils/common";
export default {
  data() {
    return {
      tableSel: "",
    };
  },

  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    showButtons: {
      type: Object,
      required: true,
    },
    isPrintLabel: {
      type: Number,
    },
    isPrintBill: {
      type: Number,
    },
    isSync: {
      type: Number,
    },
  },
  watch: {
    isPrintLabel() {
      //打印商品标签标识
      if (!this.tableSel) {
        this.$message.error("请先进行选择");
      } else {
        this.$emit("printLabelSendToF", this.tableSel);
      }
    },
    isSync() {
      //
      if (!this.tableSel) {
        this.$message.error("请先进行选择");
      } else {
        this.$emit("syncSendToF", this.tableSel);
      }
    },
    isPrintBill() {
      //打印拣货单

      if (!this.tableSel) {
        this.$message.error("请先进行选择");
      } else if (this.tableSel.indexOf(",") != -1) {
        this.$message.error("仅可选择一条");
      } else {
        this.$emit("printBillSendToF", this.tableSel);
      }
    },
  },
  methods: {
    handleSelectionChange() {
      this.$emit("handleCheckAll", this.checkAll);
    },
    expandChange(a, b, c) {
      console.log(a, b, c);
    },
    FselectionChange(arg) {
      let data = "";
      arg.forEach((item, key) => {
        data += item.shipment_plan_id + ",";
      });
      data = data.substring(0, data.length - 1);
      this.tableSel = data;
    },
    SselectionChange(a, b, c) {
      console.log(a, b, c);
    },
    //跳转shipments详情
    toShipmentsDetail(arg) {
      this.$router.push({ name: "shipmentsDetail", query: { id: arg } });
    },
    //合并
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 2) {
        return [1, 1];
      } else if (columnIndex === 3) {
        return [1, 2];
      } else if (columnIndex === 4) {
        return [1, 1];
      } else if (columnIndex === 5) {
        return [1, 1];
      } else if (columnIndex === 6) {
        return [1, 3];
      } else if (columnIndex === 7) {
        return [1, 3];
      } else if (columnIndex === 8) {
        return [1, 1];
      } else if (columnIndex === 9) {
        return [1, 1];
      }
    },
    //作废
    cancellation(arg, index) {
      if (arg.pack_status < 5) {
        reqCancellation({ inbound_id: arg.id }).then((data) => {
          if (data.code == 0) {
            this.$message.success("成功同步亚马逊进行作废");
            this.tableData[index].pack_status = 6;
          }
        });
      } else {
        this.$message.error("无法作废");
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