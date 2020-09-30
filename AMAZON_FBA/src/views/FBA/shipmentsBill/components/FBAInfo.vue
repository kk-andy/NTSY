<template>
  <div class="main">
    <div class="left">
      <div>
        <p>
          <span>制单时间：</span>
        </p>
        <p>
          <span>组别：</span>
        </p>
        <p>
          <span>最晚到货日期：</span>
        </p>
        <p>
          <span>SHIPMENTID：</span>
        </p>
        <p>
          <span>FBA仓库地址：</span>
        </p>

        <p>
          <span>总体积：</span>
        </p>
      </div>
      <div>
        <p>{{mainData.created_time}}</p>
        <p>{{mainData.gorup_name}}</p>
        <p>{{mainData.estimate_arrival_at}}</p>
        <p>{{mainData.shipment_id}}</p>
        <p
          class="fbaAddress"
          :title="mainData.fba_warehouse_address"
        >{{mainData.fba_warehouse_address}}</p>
        <p>{{mainData.bulk}}</p>
      </div>
    </div>
    <div class="middle">
      <div>
        <p>
          <span>负责人：</span>
        </p>
        <p>
          <span>发货方式：</span>
        </p>
        <p>
          <span>建议发货方式：</span>
        </p>
        <p>
          <span>AMAZONREFERENCEID：</span>
        </p>
        <p>
          <span>箱数：</span>
        </p>
        <p>
          <span>商品价值：</span>
        </p>
      </div>
      <div>
        <p>{{mainData.creater_name}}</p>
        <p>{{mainData.shipping_type}}</p>
        <p>{{mainData.suggest_shipping_type}}</p>
        <p>{{mainData.amazon_referenceid}}</p>
        <p>{{mainData.boxes_num}}</p>
        <p>{{mainData.product_amount}}</p>
      </div>
    </div>
    <div class="right">
      <div>
        <p>
          <span>目的地：</span>
        </p>
        <p>
          <span>亚马逊站点仓库：</span>
        </p>
        <p>
          <span>发货中转仓：</span>
        </p>
        <p>
          <span>FBA仓库编码：</span>
        </p>
        <p>
          <span>实重：</span>
        </p>
      </div>
      <div>
        <p>{{mainData.site}}</p>
        <p>{{mainData.virtual_warehouse}}</p>
        <p>{{mainData.transit_warehouse}}</p>
        <p>{{mainData.fba_warehouse_code}}</p>
        <p>{{mainData.gross_weight}}</p>
      </div>
    </div>
    <div class="table">
      <FBAInfoTable :tableData="tableData" />
    </div>
    <div class="btn">
      <el-button plain @click="cancel">取消</el-button>
      <el-button v-if="showButtons.saveFBAinfo" type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
import FBAInfoTable from "@/views/FBA/shipmentsBill/components/FBAInfoTable";
import { mapState, mapMutations, mapActions } from "vuex";
import { loading, loadingClose, dateFormat } from "@/utils/common";
import { reqGetClearanceInfo, reqSaveClearanceInfo } from "@/api/FBA";
export default {
  data() {
    return {
      mainData: {},
      tableData: [],
      items: {
        sku_info: [],
      },
    };
  },
  computed: {
    ...mapState({
      showButtons: (state) => state.FBAshipmentsBill.showButtons,
    }),
  },
  methods: {
    cancel() {
      this.$router.push({ name: "shipmentsBill" });
    },
    save() {
      this.saveData = {
        items: [],
      };
      this.saveData.shipment_plan_id = this.mainData.shipment_plan_id;
      this.mainData.sku_info.forEach((item) => {
        this.saveData.items.push({
          sku_id: item.sku_id,
          is_customs_tax_refund: item.is_customs_tax_refund,
          estimated_daily_sales: item.estimated_daily_sales,
        });
      });
      loading();
      reqSaveClearanceInfo(this.saveData).then((data) => {
        loadingClose();
        if (data.code == 0) {
          this.$message.success("保存成功");
        }
      });
    },
  },
  components: {
    FBAInfoTable,
  },
  mounted() {
    if (this.$route.query.id) {
      loading();
      reqGetClearanceInfo({ id: this.$route.query.id }).then((data) => {
        if (data.code == 0) {
          this.mainData = data.data;
          this.tableData = data.data.sku_info;
          loadingClose();
        } else {
          loadingClose();
          this.$message.error("报关信息获取失败");
        }
      });
    }
    //
    let id = this.$getMenuId(
      sessionStorage.getItem("munuIdList"),
      "/FBA/shipmentsBill"
    );
    this.$store.dispatch("FBAshipmentsBill/getButtonList", { id });
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  white-space: nowrap;
  .left,
  .middle,
  .right {
    display: inline-block;
    width: 33%;
    margin-bottom: 50px;
    div {
      display: inline-block;

      p {
        line-height: 30px;
        font-size: 15px;
      }
    }
    div:nth-child(1) {
      width: 50%;
      p {
        display: flex;
        justify-content: flex-end;
      }
    }
    div:nth-child(2) {
      font-weight: bold;
      p {
        min-height: 30px;
      }
    }
    .fbaAddress {
      width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .table {
    width: 90%;
    margin: 0 auto;
  }
  .btn {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    padding-right: 10%;
  }
}
</style>