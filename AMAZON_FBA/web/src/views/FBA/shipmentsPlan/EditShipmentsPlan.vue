<template>
  <div>
    <div class="main">
      <div class="header">
        <div class="header1">
          <h2 v-if="editType == 0">添加发货计划</h2>
          <h2 v-if="editType == 1">编辑发货计划</h2>
        </div>
        <div class="header2">
          <template v-if="editType == 0">
            <div>
              <span style="marginLeft:10px">时间：</span>
              <el-date-picker
                style="width:250px"
                v-model="estimate_at"
                @change="timeSet"
                type="date"
                placeholder="预计发货时间"
                :picker-options="pickerOptions0"
              ></el-date-picker>
            </div>
          </template>
          <template v-if="editType == 1">
            <div>
              <span>计划单号</span>
              <span>{{tableData.shipment_code}}</span>
            </div>
            <div>
              <span>创建人：</span>
              <span style="fontWeight:bold">{{tableData.creater_name}}</span>
            </div>
            <div>
              <span>创建时间：</span>
              <span style="fontWeight:bold">{{tableData.created_time}}</span>
            </div>
          </template>
        </div>
        <div class="header3">
          <el-row>
            <el-col :span="5">
              <span style="color:red">*</span>
              <span>店铺：</span>
              <span>
                <el-select
                  style="width:250px"
                  v-model="shop_id"
                  filterable
                  placeholder="请选择"
                  @change="changeShop"
                  :disabled="shipment_id !== ''"
                >
                  <el-option
                    v-for="item in shopList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </span>
            </el-col>
            <el-col :span="6" :offset="1">
              <span>虚拟仓：</span>
              <span>
                <el-input disabled :value="warehouse" style="width:250px" />
              </span>
            </el-col>

            <el-col :span="4" :offset="1">
              <span style="color:red">*</span>
              <span>运输方式：</span>
              <el-select style="width:200px" v-model="shipping_type_id" placeholder="请选择">
                <el-option
                  v-for="item in logisticsModeVal"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="4" :offset="1">
              <p style="float:left">备注：</p>
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入备注内容"
                style="width:100%"
                v-model="remark"
                :maxlength="300"
              ></el-input>
            </el-col>
          </el-row>
        </div>
        <div class="header4">
          <span>商品明细</span>
          <span style="color:#0CAAF0;fontWeight:bold;cursor:pointer" @click="insertFromUser">+ 添加商品</span>
          <span
            style="color:#0CAAF0;fontWeight:bold;cursor:pointer"
            @click="insertFromExcel"
          >+ EXCEL导入</span>
        </div>
      </div>
      <div class="table">
        <CreateShipmentsPlanTable :tableData="tableData.items" />
      </div>
      <div class="btn">
        <el-button @click="cancel" plain>取消</el-button>
        <el-button @click="save" type="primary">保存</el-button>
      </div>
    </div>
    <div class="pagination"></div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import CreateShipmentsPlanTable from "@/views/FBA/shipmentsPlan/components/CreateShipmentsPlanTable";
import { loading, loadingClose, dateFormat } from "@/utils/common";
import { getWarehouseFromShop, reqGetShop } from "@/api/FBA";
export default {
  name: "EditShipmentsPlan",
  data() {
    return {
      // virtualSel: "", //虚拟仓下拉选择
      remark: "", //备注
      shop_id: "", //店铺下拉选择
      shipping_type_id: "", //物流选择
      estimate_at: "", //预计发货时间
      warehouse: "", //虚拟仓
      warehouse_id: "", //虚拟仓id
      shopList: [],
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
      warehouseList: (state) => state.common.warehouseList,
      //店铺列表
      // shopList: (state) => state.common.shopList,
      // shopList: (state) => state.FBA.shop,
      //批量选择的id
      shipment_id: (state) => state.FBAshipmentsPlan.shipmentsPlanVal,
      //数据
      tableData: (state) => state.FBAshipmentsPlan.shipmentsDetailTableData,
      //物流总数据
      logisticsModeVal: (state) => state.FBAshipmentsPlan.transportType,
      //判断是 新增 or 编辑
      editType: (state) => state.FBAshipmentsPlan.editType,
      //新增时缓存的状态
      insertShipmentPlanArg: (state) =>
        state.FBAshipmentsPlan.insertShipmentPlanArg,
    }),
  },
  methods: {
    ...mapMutations("FBAshipmentsPlan", [
      "changeShipmentsDetailTableData",
      "changeTableShop",
      "saveInsertStatus", //保存状态
    ]),
    ...mapActions([
      "getWarehouseList", //获取虚拟仓列表
      // "getShopList", //获取店铺列表
    ]),
    ...mapActions("FBA", ["getShop"]),
    ...mapActions("FBAshipmentsPlan", [
      //获取发货方式
      "getTransportType",
      "changeShipmentsDetailEdit", //编辑
    ]),
    //取消
    cancel() {
      if (this.editType == 0) {
        this.$router.push({ name: "shipmentsPlan" });
      } else {
        this.$router.push({ name: "ShipmentsPlanDetail" });
      }
    },
    // 用户手动添加商品
    insertFromUser() {
      // console.log(this.shop_id, 1);
      if (this.editType == 0) {
        if (!this.tableData.shop_id) {
          this.$message.warning("请先选择店铺");
        } else {
          this.saveInsertStatus({
            shop_id: this.shop_id,
            warehouse_id: this.warehouse_id,
            warehouse: this.warehouse,
            shipping_type_id: this.shipping_type_id,
            remark: this.remark,
            estimate_at: this.estimate_at,
          });
          this.$router.push({ name: "InsertFromUser" });
        }
      } else {
        this.$router.push({ name: "InsertFromUser" });
      }
    },
    //通过EXCEL添加商品
    insertFromExcel() {
      if (this.editType == 0) {
        if (!this.tableData.shop_id) {
          this.$message.warning("请先选择店铺");
        } else {
          this.saveInsertStatus({
            shop_id: this.shop_id,
            warehouse_id: this.warehouse_id,
            warehouse: this.warehouse,
            shipping_type_id: this.shipping_type_id,
            remark: this.remark,
            estimate_at: this.estimate_at,
          });
          this.$router.push({ name: "InsertFromExcel" });
        }
      } else {
        this.$router.push({ name: "InsertFromExcel" });
      }
    },
    //改变时间
    timeSet(val) {
      this.estimate_at = dateFormat(val).split(" ")[0];
    },
    //改变店铺 更改虚拟仓
    changeShop(arg) {
      loading();
      this.changeTableShop(arg);
      getWarehouseFromShop({ shop_id: arg }).then((data) => {
        loadingClose();
        if (data.code == 0) {
          // this.changeWarehouse(data.data.label);
          this.warehouse = data.data.label;
          this.warehouse_id = data.data.value;
        }
      });
      //临时数据 每次更改店铺清楚掉之前的sku列表
      let temporaryData = [];
      temporaryData = this.tableData;
      delete temporaryData.items;
      temporaryData.items = [];
      this.changeShipmentsDetailTableData(temporaryData);
    },
    //保存按钮
    save() {
      //提示table组件 并将table改动信息拉取回来
      if (this.tableData.items.length == 0) {
        // if (!this.tableData.items) {
        this.$message.error("发货计划中未存在商品，无法保存");
      } else {
        if (!this.shop_id) {
          this.$message.error("请选择店铺");
        } else if (!this.shipping_type_id) {
          this.$message.error("请选择运输方式");
        } else {
          this.$bus.$emit("save");
        }
      }
    },
  },
  components: {
    CreateShipmentsPlanTable,
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.name == "shipmentsPlan") {
        vm.changeShipmentsDetailTableData({ items: [] });
      }
    });
  },

  mounted() {
    if (this.editType == 0) {
      // console.log(this.insertShipmentPlanArg);
      this.shop_id = this.insertShipmentPlanArg.shop_id;
      this.warehouse_id = this.insertShipmentPlanArg.warehouse_id;
      this.warehouse = this.insertShipmentPlanArg.warehouse;
      this.shipping_type_id = this.insertShipmentPlanArg.shipping_type_id;
      this.remark = this.insertShipmentPlanArg.remark;
      this.estimate_at = this.insertShipmentPlanArg.estimate_at;
    } else if (this.editType == 1) {
      //判断为编辑发货计划
      //初始id验证
      if (!this.shipment_id) {
        this.$message.warning("网络波动，请先进行选择");
        this.$router.push({ name: "shipmentsPlan" });
      } else if (!this.tableData) {
        this.$message.warning("网络波动，请先进行选择");
        this.$router.push({ name: "shipmentsPlan" });
      } else {
        //给定默认值
        // console.log(this.tableData);
        this.warehouse = this.tableData.warehouse_name || "";
        this.warehouse_id = this.tableData.warehouse_id;
        this.shop_id = this.tableData.shop_id || "";
        this.shipping_type_id =
          this.tableData.shipping_type_id.toString() || "";
        this.remark = this.tableData.remark || "";
      }
    } else {
      this.$message.warning("当前状态异常，请重新操作");
      this.$router.push({ name: "shipmentsPlan" });
    }
    this.getWarehouseList();
    this.getTransportType();
    reqGetShop().then((data) => {
      if (data.code == 0) {
        this.shopList = data.data;
      }
    });
    // this.getShopList();
    // this.getShop();

    //接受table传来的table编辑信息并调用vuex进行数据整合 并调取接口
    this.$bus.$on("saveToF", (arg) => {
      //保存时验证是否所有计划发货量都小于可用量

      let planIsLessAvai = false;
      arg.forEach((item, key) => {
        if (item["0"] > this.tableData.items[key].available_num) {
          planIsLessAvai = true;
        }
      });
      if (planIsLessAvai) {
        this.$message.error("存在部分计划发货量大于可用量的情况");
        return false;
      }

      // ------------------
      let saveInfo = {};
      if (this.editType == 1) {
        saveInfo.shipment_id = this.shipment_id;
      }
      if (this.editType == 0) {
        saveInfo.estimate_at = this.estimate_at;
      }
      saveInfo.warehouse_id = this.warehouse_id;
      saveInfo.shop_id = this.shop_id;
      saveInfo.shipping_type_id = this.shipping_type_id;
      saveInfo.remark = this.remark;
      saveInfo.items = arg;
      // console.log(saveInfo);
      loading();
      this.changeShipmentsDetailEdit({ arg: saveInfo, type: 1 })
        .then(() => {
          loadingClose();
          if (this.editType == 0) {
            this.$message.success("添加成功");
            this.$router.push({ name: "shipmentsPlan" });
          } else {
            this.$message.success("保存成功");
            this.$router.push({ name: "ShipmentsPlanDetail" });
          }
        })
        .catch(() => {
          loadingClose();
          if (this.editType == 0) {
            this.$message.error("添加失败");
          } else {
            this.$message.error("保存失败");
          }
          this.$router.push({ name: "ShipmentsPlanDetail" });
        });
    });
  },
  beforeDestroy() {
    this.$bus.$off("saveToF");
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  min-height: 600px;
}
.header {
  width: 100%;
  padding: 20px;
  background: #f2f2f2;
  .header1 {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #ebebeb;
    margin-bottom: 10px;
  }
  .header2 {
    width: 100%;
    height: 60px;
    line-height: 60px;
    white-space: nowrap;

    div {
      margin-right: 30px;
      display: inline-block;
    }
    span:nth-child(2) {
      font-weight: bold;
    }
  }
  .header3 {
    white-space: nowrap;
    margin-bottom: 30px;
  }
  .header4 {
    span {
      margin-right: 20px;
    }
  }
}
.table {
  margin-bottom: 20px;
}
.btn {
  float: right;
}
</style>