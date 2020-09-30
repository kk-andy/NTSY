<template>
  <div style="padding: 30px; overflow: hidden">
    <!-- <div style="padding:10px;border:1px solid black">
      <JsBarcode :content="['andy','danny']" />
    </div>-->

    <div>
      <div class="func">
        <ul>
          <!-- 站点 -->
          <li>
            <p>站点：</p>
            <p>
              <el-select
                multiple
                v-model="searchArg.site"
                filterable
                placeholder="全部站点"
              >
                <el-option
                  v-for="item in site"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </p>
          </li>
          <!-- 虚拟仓 -->
          <li>
            <p>虚拟仓：</p>
            <p>
              <el-select
                multiple
                v-model="searchArg.warehouse_id"
                filterable
                placeholder="全部虚拟仓"
              >
                <el-option
                  v-for="item in virtualWarehouse"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </p>
          </li>
          <!-- 创建时间 -->
          <li>
            <p>创建时间：</p>
            <p>
              <el-date-picker
                v-model="searchArg.createTime"
                @change="timeSet"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </p>
          </li>
          <!-- 计划单号 -->
          <li>
            <!-- ----- -->
            <p v-if="hasFuzzy" style="marginright: 0">
              <el-autocomplete
                placeholder="搜索内容"
                v-model="searchValue"
                :fetch-suggestions="querySearchAsync"
                class="input-with-select"
              >
                <el-select
                  style="width: 120px"
                  @change="selSortChange"
                  v-model="planNum.planNumSel"
                  slot="prepend"
                  placeholder="选择类别"
                  filterable
                >
                  <el-option
                    v-for="(item, key) in planNum.planNumAll"
                    :key="key"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="getShipmentsPlan"
                ></el-button>
              </el-autocomplete>
            </p>
            <p v-else style="marginright: 0">
              <el-input
                placeholder="搜索内容"
                v-model="searchValue"
                class="input-with-select"
              >
                <el-select
                  style="width: 120px"
                  @change="selSortChange"
                  v-model="planNum.planNumSel"
                  slot="prepend"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in planNum.planNumAll"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-button
                  @click="search"
                  slot="append"
                  icon="el-icon-search"
                ></el-button>
              </el-input>
            </p>
            <!-- ----- -->
            <p></p>
          </li>
        </ul>
        <div class="btn">
          <el-button
            type="primary"
            @click="insertShipmentsPlan"
            style="marginright: 100px"
            v-if="showButtons.addPlan"
            >添加发货计划</el-button
          >
          <el-button @click="createPackage" plain v-if="showButtons.createData"
            >创建货件</el-button
          >
          <el-button
            @click="printShipmentsPlan"
            plain
            v-if="showButtons.printPlan"
            >打印发货计划</el-button
          >
          <el-button
            @click="printBrandLabel"
            plain
            v-if="showButtons.printLabel"
            >打印商品标签</el-button
          >
          <!-- <el-button @click="printBill" plain v-if="showButtons.printBill"
            >打印拣货单</el-button
          > -->
        </div>
      </div>
      <div class="table">
        <ShipmentsPlanTable :tableData="tableData" />
      </div>
      <div class="pagination">
        <Page
          :page="{
            size: searchArg.page_size,
            currentPage: searchArg.page_num,
          }"
          :total="total"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
        />
      </div>
      <div class="dialog">
        <el-dialog title="拣货单打印" :visible.sync="dialogFormVisible">
          <div class="printF">
            <div id="print">
              <PickingList
                :tableData="printBillData"
                :isEditCode="isEditCode"
              />
            </div>
          </div>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button @click="isEditCode = !isEditCode">{{
              isEditCode ? "完成" : "编辑"
            }}</el-button>
            <el-button
              type="primary"
              :disabled="isEditCode ? true : false"
              v-print="printObj"
              @click="sure"
              >打印</el-button
            >
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import JsBarcode from "@/components/JsBarcode";
import ShipmentsPlanTable from "@/views/FBA/shipmentsPlan/components/ShipmentsPlanTable";
import EditShipmentsPlan from "@/views/FBA/shipmentsPlan/EditShipmentsPlan";
import InsertFromExcel from "@/views/FBA/shipmentsPlan/InsertFromExcel";
import InsertFromUser from "@/views/FBA/shipmentsPlan/InsertFromUser";
import PrintBrandLabel from "@/views/FBA/shipmentsPlan/PrintBrandLabel";
import PrintShipmentsPlan from "@/views/FBA/shipmentsPlan/PrintShipmentsPlan";
import ShipmentsPlanDetail from "@/views/FBA/shipmentsPlan/ShipmentsPlanDetail";
import PickingList from "@/views/FBA/shipmentsPlan/components/PickingList";
import Page from "@/components/page";
import { mapState, mapMutations, mapActions } from "vuex";
import { loading, loadingClose, dateFormat } from "@/utils/common";
import { reqCreateShipmentsPlan, reqGetBill } from "@/api/FBA";
export default {
  data() {
    return {
      planNum: {
        planNumSel: "1",
        planNumAll: [
          {
            value: "1",
            label: "计划单号",
          },
          {
            value: "2",
            label: "SKU",
          },
          {
            value: "3",
            label: "创建人",
          },
        ],
      },
      searchValue: "", //搜索内容
      hasFuzzy: false, //是否有模糊
      searchArg: {
        page_num: 1, //页码数
        page_size: 10, //
        site: [],
        shipment_code: "", //计划单号，多个用逗号分隔
        warehouse_id: [], //虚拟仓
        created_time: "", //创建时间
        sku: "",
        product_name: "", //品名
        creator: "", //创建者
      },
      dialogFormVisible: false,
      printObj: {
        id: "print",
        popTitle: "拣货单",
        extraCss: "www.nantang.erp.com",
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
      },
      printBillData: {}, //打印发货单数据
      isEditCode: false, //拣货单编辑\
    };
  },
  computed: {
    ...mapState({
      tableData: (state) => state.FBAshipmentsPlan.shipmentsPlanTableData,
      total: (state) => state.FBAshipmentsPlan.shipmentsPlanTableDataTotal * 1,
      // site: (state) => state.common.siteCodeList,
      site: (state) => state.FBA.site,
      virtualWarehouse: (state) => state.common.warehouseList,
      showButtons: (state) => state.FBAshipmentsPlan.showButtons,
      //OA 人员列表
      OAUserList: (state) => state.FBA.OAUserList,
      //多选
      shipmentsPlanVal: (state) => state.FBAshipmentsPlan.shipmentsPlanVal,
    }),
  },
  methods: {
    ...mapMutations("FBAshipmentsPlan", [
      "changeShipmentsPlanVal",
      "changeEditType",
      "saveInsertStatus", //保存状态
    ]),
    ...mapActions("FBAshipmentsPlan", ["getShipmentsPlanTable"]),
    ...mapActions([
      "getWarehouseList", //获取虚拟仓列表
      // "getCommonData", //站点
    ]),
    ...mapActions("FBA", [
      "getSite",
      "getOAUserList", //获取OA人员列表
    ]),

    //获取发货计划单
    getShipmentsPlan() {
      loading();
      switch (this.planNum.planNumSel) {
        case "1":
          this.searchArg.shipment_code = this.searchValue;

          break;
        case "2":
          this.searchArg.sku = this.searchValue;
          break;
        case "3":
          this.searchArg.creator = this.searchValue;
          break;
        case "4":
          this.searchArg.product_name = this.searchValue;
          break;
      }

      this.getShipmentsPlanTable(this.searchArg).then(() => {
        loadingClose();
      });
    },
    //搜索按钮
    search() {
      this.searchArg.page_num = 1;
      this.getShipmentsPlan();
    },
    handleSelectionChange(arg) {
      console.log(arg);
    },
    changeActive(index) {
      this.current = index;
    },
    //添加发货计划
    insertShipmentsPlan() {
      this.changeEditType(0);
      this.$router.push({ name: "EditShipmentsPlan" });
    },
    //创建货件
    createPackage() {
      // console.log(this.shipmentsPlanVal, 111);
      if (!this.shipmentsPlanVal) {
        this.$message.warning("请先进行选择");
      } else if (this.shipmentsPlanVal.split(",").length > 1) {
        this.$message.warning("每次仅可创建一个计划单的货件");
      } else {
        this.$router.push({
          name: "createParcel",
          query: { id: this.shipmentsPlanVal },
        });
      }
    },
    //打印发货计划
    printShipmentsPlan() {
      if (!this.shipmentsPlanVal) {
        this.$message.warning("请先进行选择");
      } else if (this.shipmentsPlanVal.indexOf(",") != -1) {
        this.$message.warning("请选择一条发货计划进行打印");
      } else {
        this.$router.push({
          name: "PrintShipmentsPlan",
          query: { id: this.shipmentsPlanVal },
        });
      }
    },
    //改变时间
    timeSet(val) {
      this.searchArg.created_time = dateFormat(val).split(" ")[0];
    },
    //查找
    // find() {
    //   console.log(this.searchArg);
    // },
    //打印商品标签
    printBrandLabel() {
      if (!this.shipmentsPlanVal) {
        this.$message.warning("请先进行选择");
      } else {
        this.$router.push({
          name: "PrintBrandLabel",
          query: { id: this.shipmentsPlanVal },
        });
      }
      // this.$router.push({ name: "PrintBrandLabel" });
    },
    //搜索类别变化
    selSortChange(arg) {
      this.searchArg.shipment_code = "";
      this.searchArg.sku = "";
      this.searchArg.creator = "";
      this.searchArg.product_name = "";
      this.searchValue = "";
      //---
      if (arg == 3) {
        this.hasFuzzy = true;
      } else {
        this.hasFuzzy = false;
      }
    },
    //下拉搜索建议
    querySearchAsync(val, cb) {
      if (val) {
        this.getOAUserList({ name: val }).then(() => {
          let suggestions = [];
          this.OAUserList.forEach((item) => {
            suggestions.push({ value: item.label, val: item.value });
          });
          cb(suggestions);
        });
      } else {
        cb([]);
      }
    },
    //分页
    handleSizeChange(arg) {
      this.searchArg.page_size = arg;
      this.getShipmentsPlan();
    },
    handleCurrentChange(arg) {
      this.searchArg.page_num = arg;
      this.getShipmentsPlan();
    },
    //打印拣货单
    printBill() {
      if (!this.shipmentsPlanVal) {
        this.$message.error("请先进行选择");
      } else if (this.shipmentsPlanVal.split(",").length > 1) {
        this.$message.error("每次仅可打印一条发货计划的拣货单");
      } else {
        loading();
        reqGetBill({ shipment_id: this.shipmentsPlanVal })
          .then((data) => {
            loadingClose();
            if (data.code == 0) {
              this.printBillData = data.data;
              this.dialogFormVisible = true;
            }
          })
          .catch((err) => {
            loadingClose();
          });
      }
    },
    sure() {
      //打印拣货单
      this.dialogFormVisible = false;
    },
    //拣货单编辑
    // editBoxCode() {

    // },
  },
  components: {
    Page,
    JsBarcode,
    ShipmentsPlanTable,
    EditShipmentsPlan,
    InsertFromExcel,
    InsertFromUser,
    PrintBrandLabel,
    PrintShipmentsPlan,
    ShipmentsPlanDetail,
    PickingList,
  },
  mounted() {
    this.getShipmentsPlan();
    this.getWarehouseList();
    // this.getCommonData();
    this.getSite();
    let id = this.$getMenuId(
      sessionStorage.getItem("munuIdList"),
      this.$route.path
    );
    this.$store.dispatch("FBAshipmentsPlan/getButtonList", { id });
    this.saveInsertStatus({
      shop_id: "",
      warehouse_id: "",
      shipping_type_id: "",
      remark: "",
      estimate_at: "",
    });
    // this.changeShipmentsPlanVal([]);
  },
};
</script>

<style lang="scss" scoped>
.func {
  width: 100%;
  white-space: nowrap;
  margin-bottom: 60px;
  ul {
    padding: 0;
  }
  li {
    // height: 36px;
    list-style: none;
    display: inline-block;
    margin-right: 20px;
    p {
      float: left;
    }
    p:nth-child(1) {
      margin-right: 10px;
      line-height: 36px;
    }
  }
}
.table {
  width: 100%;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}
.printF {
  height: 400px;
  overflow-y: scroll;
  display: flex;
  justify-content: flex-start;
}
</style>