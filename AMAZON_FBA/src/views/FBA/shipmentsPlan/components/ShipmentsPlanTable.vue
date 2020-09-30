<template>
  <div>
    <el-table
      :data="tableData"
      @selection-change="selectionChange"
      style="width: 100%"
      :span-method="arraySpanMethod"
      :header-cell-style="{background:'#F5F7FA',color:'#606266'}"
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-table
            :data="scope.row.items"
            :show-header="false"
            style="width: 100%"
            class="two-list"
          >
            <el-table-column width="50"></el-table-column>
            <el-table-column align="center" width="150" prop="city_name" label="图片">
              <template slot-scope="scope">
                <div style="width:120px;height:50px">
                  <img style="width:100px;height:50px" :src="scope.row.main_image" alt />
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" width="150" prop="m_sku" label="MSKU/FNSKU">
              <template slot-scope="scope">{{scope.row.m_sku}}/{{scope.row.fn_sku}}</template>
            </el-table-column>
            <el-table-column align="center" width="250" prop="SKU" label="品名/SKU">
              <template slot-scope="scope">{{scope.row.title}}/{{scope.row.product_sku}}</template>
            </el-table-column>
            <el-table-column align="center" width="250" prop="plan_num" label="计划发货量"></el-table-column>
            <!-- <el-table-column align="center" width="150" label="单箱数量/箱数">
              <template slot-scope="scope">{{scope.row.quantity_per_box}}/{{scope.row.boxes_num}}</template>
            </el-table-column>-->
            <el-table-column align="center" width="150" prop="available_num" label="可用量"></el-table-column>
            <el-table-column align="center" width="120" prop="attr" label="商品属性"></el-table-column>
            <el-table-column align="center" width="150" prop="can_tax_refund" label="是否可退税">
              <template slot-scope="{ row }">{{ row.can_tax_refund ? '是' : '否' }}</template>
            </el-table-column>
            <el-table-column align="center" prop="remark" label="备注"></el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column width="55" type="selection"></el-table-column>
      <el-table-column align="center" width="150" label="图片">
        <template width="150" slot-scope="scope">
          <span>计划单号：</span>
          <el-link
            @click="toShipmentsDetail(scope.row.id)"
            type="primary"
            :underline="false"
          >{{scope.row.shipment_code}}</el-link>
        </template>
      </el-table-column>
      <el-table-column align="center" width="150" label="MSKU/FNSKU">
        <template slot-scope="scope">
          <span>虚拟仓：</span>
          <span style="fontWeight:bold">{{scope.row.warehouse_name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="250" label="品名/SKU">
        <template slot-scope="scope">
          <span>发货方式：</span>
          <span style="fontWeight:bold">{{scope.row.shipping_type}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="250" label="计划发货量">
        <template slot-scope="scope">
          <span>创建人：</span>
          <span style="fontWeight:bold">{{scope.row.creater_name}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" width="150" label="单箱数量/箱数">
       
      </el-table-column>-->
      <el-table-column align="center" width="150" label="可用量">
        <template slot-scope="scope">
          <span>创建时间：</span>
          <span style="fontWeight:bold">{{scope.row.created_time}}</span>
        </template>
      </el-table-column>
      <el-table-column width="120" prop="attr" label="商品属性" align="center">
        <template slot-scope="{ row }">{{ row.remark }}</template>
      </el-table-column>
      <el-table-column width="150" prop="can_tax_refund" label="是否可退税" align="center"></el-table-column>
      <el-table-column align="center" label="备注"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      //   tableData: [
      //     {
      //       img: "1278787878",
      //       xun: "亚马逊1号",
      //       address: "所加进昆仑决",
      //       people: "丹妮老师",
      //       time: "2020-09-7",
      //       ntime: "2020-03-4",
      //       children: [
      //         {
      //           MSKU: "YDHH83HH",
      //           FNSKU: "SKK89",
      //           SKU: "002/002",
      //           CHCK: "装转仓2",
      //           CK: "MK-202",
      //           CW: "酷酷的",
      //           SBL: "200",
      //           YFH: "399",
      //           QSL: "0",
      //           CE: "298",
      //         },
      //       ],
      //     },
      //     {
      //       product_id: "12",
      //       children: [
      //         {
      //           city_name: "122",
      //         },
      //       ],
      //     },
      //   ],
    };
  },

  props: {
    tableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },

  methods: {
    //批量选中
    ...mapMutations("FBAshipmentsPlan", ["changeShipmentsPlanVal"]),
    handleSelectionChange() {
      this.$emit("handleCheckAll", this.checkAll);
    },
    //table批量选择
    selectionChange(arg) {
      let data = "";
      arg.forEach((item) => {
        data = data + item.id.toString() + ",";
      });
      data = data.substr(0, data.length - 1);
      this.changeShipmentsPlanVal(data);
    },
    //跳转shipments详情
    toShipmentsDetail(arg) {
      this.changeShipmentsPlanVal(arg);

      this.$router.push({ name: "ShipmentsPlanDetail" });
    },
    //合并
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 2) {
        return [1, 2];
      } else if (columnIndex === 3) {
        return [1, 1];
      } else if (columnIndex === 4) {
        return [1, 1];
      } else if (columnIndex === 5) {
        return [1, 1];
      } else if (columnIndex === 6) {
        return [1, 2];
      }
    },
  },
  components: {
    // TableInfo,
  },
  mounted() {
    //初始化批量选择
    this.changeShipmentsPlanVal("");
  },
};
</script>
<style scoped lang="scss">
</style>