<template>
  <div>
    <div class="title">
      <h2>shipmentID：</h2>
      <h2>{{shipmentId}}</h2>
    </div>
    <div class="main">
      <el-tabs v-model="activeName" @tab-click="selTags">
        <el-tab-pane label="FBA报关信息" name="FBAInfo">
          <FBAInfo />
        </el-tab-pane>
        <el-tab-pane label="拣货单" name="pickingList">
          <PickingList @getShipmentId="getShipmentId" />
        </el-tab-pane>
        <el-tab-pane label="空海运发票" name="transportBill">
          <TransportBill />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import FBAInfo from "@/views/FBA/shipmentsBill/components/FBAInfo";
import PickingList from "@/views/FBA/shipmentsBill/components/PickingList";
import TransportBill from "@/views/FBA/shipmentsBill/components/TransportBill";
import {
  reqGetClearanceInfo,
  reqGetPickingList,
  reqGetBillInfo,
} from "@/api/FBA";
export default {
  data() {
    return {
      activeName: "FBAInfo", //TAB ACTIVE
      id: "",
      shipmentId: "",
      FBAInfo: {}, //报关信息
      pickiingInfo: {}, //拣货单信息
      transportBillInfo: {}, //海空运发票信息
    };
  },
  methods: {
    selTags(a, b, c) {},
    getShipmentId(arg) {
      this.shipmentId = arg;
    },
  },
  components: {
    FBAInfo,
    PickingList,
    TransportBill,
  },
  mounted() {
    if (!this.$route.query.id) {
      this.$message.warning("请重新选择");
      this.$router.push({ name: "shipmentsBill" });
    }
    //  {
    //   this.id = this.$route.params.id;
    //   reqGetClearanceInfo({ id: this.$route.params.id }).then((data) => {
    //     if (data.code == 0) {
    //       this.FBAInfo = data.data;
    //     } else {
    //       this.$message.error("报关信息获取失败");
    //     }
    //   });
    //   reqGetPickingList({ id: this.id }).then((data) => {
    //     if (data.code == 0) {
    //       this.PickingList = data.data;
    //     } else {
    //       this.$message.error("拣货单信息获取失败");
    //     }
    //   });
    //   reqGetBillInfo({ id: this.id }).then((data) => {
    //     if (data.code == 0) {
    //       this.TransportBill = data.data;
    //     } else {
    //       this.$message.error("还空运信息获取失败");
    //     }
    //   });
    // }
  },
};
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: flex-start;
  padding-left: 50px;
}
</style>