<template>
  <div style="padding:35px">
    <h2>添加发货计划</h2>
    <hr />
    <div class="func">
      <div class="func1">
        <span>店铺：</span>
        <div>
          <el-input v-model="shop_name" disabled />
        </div>
      </div>
      <div class="func2">
        <span>预计发货时间：</span>
        <el-date-picker
          v-model="shipmentsSendArg.estimate_at"
          type="date"
          placeholder="选择日期"
          @change="timeSet"
          :picker-options="pickerOptions0"
        ></el-date-picker>
      </div>
      <div class="func2">
        <span style="color:red">*</span>
        <span>运输方式：</span>
        <el-select
          style="width:200px"
          v-model="shipmentsSendArg.shipping_type"
          slot="prepend"
          placeholder="请选择运输方式"
          filterable
        >
          <el-option
            v-for="item in Logistics"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="func3">
        <p style="float:left">备注：</p>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          style="width:350px"
          v-model="shipmentsSendArg.remark"
        ></el-input>
      </div>
    </div>
    <div class="table">
      <NewShipmentsPlanTable :tableData="tableData" />
    </div>
    <div class="btn">
      <el-button style="float:right;marginLeft:20px" @click="issue" type="primary">发布</el-button>
      <el-button style="float:right" plain @click="cancel">取消</el-button>
    </div>
    <!-- <div class="pagination">
      <Page :page="{size:10,currentPage:1}" :total="20" />
    </div>-->
  </div>
</template>

<script>
import NewShipmentsPlanTable from "@/views/FBA/replenishmentPlan/components/NewShipmentsPlanTable";
import Page from "@/components/page";
import { mapState, mapMutations, mapActions } from "vuex";
import { loading, loadingClose, dateFormat } from "@/utils/common";
import { reqSendShipmentsShip } from "@/api/FBA";
export default {
  data() {
    return {
      //发布参数
      shipmentsSendArg: {
        estimate_at: "", //发货时间选择
        shipping_type: "", //物流选择
        remark: "", //备注
      },
      tableList: [],
      pickerOptions0: {
        //时间限制
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
        },
      },
    };
  },
  computed: {
    ...mapState({
      tableData: (state) => state.FBAreplenishmentPlan.shipmentsInfo,
      //店铺列表
      // shopList: (state) => state.common.shopList,
      shopList: (state) => state.FBA.shop,
      //运输方式
      Logistics: (state) => state.FBAreplenishmentPlan.Logistics,
      //发货计划ID
      plan_id: (state) => state.FBAreplenishmentPlan.plan_id,
      //批量选择
      newShipmentsSelVal: (state) =>
        state.FBAreplenishmentPlan.newShipmentsSelVal,
      shop_id: (state) => state.FBAreplenishmentPlan.shop_id,
      shop_name: (state) => state.FBAreplenishmentPlan.shop_name,
    }),
  },
  methods: {
    ...mapActions([
      "getWarehouseList", //获取虚拟仓列表
      // "getShopList", //获取店铺列表
    ]),
    ...mapActions("FBAreplenishmentPlan", [
      "getShipmentsInfo", //获取发货详情
      "getLogistics", //获取运输方式
    ]),
    ...mapActions("FBA", ["getShop"]),
    ...mapMutations("FBAreplenishmentPlan", ["changeNewShipmentsSelVal"]),

    cancel() {
      //取消
      this.$router.push({ name: "replenishmentPlan" });
    },
    timeSet(val) {
      this.shipmentsSendArg.estimate_at = dateFormat(val).split(" ")[0];
    },
    issue() {
      //发布

      if (this.shipmentsSendArg.shop_id == "") {
        this.$message.warning("请选择店铺和运输方式");
      } else if (this.shipmentsSendArg.shipping_type == "") {
        this.$message.warning("请选择店铺和运输方式");
      } else if (this.newShipmentsSelVal.length == 0) {
        this.$message.warning("请勾选要发布的SKU");
      } else {
        loading();
        reqSendShipmentsShip({
          plan_id: this.plan_id,
          sku_list: this.newShipmentsSelVal,
          shop_id: this.shop_id,
          ...this.shipmentsSendArg,
        }).then((data) => {
          if (data.code == 0) {
            loadingClose();
            this.$message.success("发布成功");
            this.$router.push({ name: "replenishmentPlan" });
          } else {
            loadingClose();
            // this.$message.error("发布失败");
            // this.$router.push({ name: "replenishmentPlan" });
          }
        });
        // this.$router.push({ name: "shipmentsPlan" });
      }
    },
  },
  components: {
    NewShipmentsPlanTable,
    Page,
  },
  mounted() {
    if (!this.$route.query.plan_id) {
      this.$message.error("数据缺失，请重新进入");
      this.$router.push({ name: "replenishmentPlan" });
    } else {
      //初始化选中的SKU
      this.changeNewShipmentsSelVal([]);
      loading();
      // this.getShopList();
      this.getShop();
      this.getLogistics();
      this.getShipmentsInfo(this.$route.query.plan_id).then(() => {
        loadingClose();
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.func {
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
  .func1 {
    display: flex;
    span {
      line-height: 36px;
    }
  }
}
.btn {
  overflow: hidden;
  margin-top: 30px;
  margin-bottom: 30px;
}
.pagination {
  display: flex;
  justify-content: center;
}
</style>