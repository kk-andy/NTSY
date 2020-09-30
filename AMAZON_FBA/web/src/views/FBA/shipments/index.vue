<template>
  <div style="padding: 30px">
    <div class="func">
      <ul>
        <!-- 站点 -->
        <li>
          <p>站点：</p>
          <p>
            <el-select
              filterable
              v-model="searchValue.site"
              multiple
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
              filterable
              v-model="searchValue.warehouse_id"
              multiple
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
              v-model="searchValue.created_time"
              @change="timeSet"
              type="date"
              placeholder="选择日期"
            ></el-date-picker>
          </p>
        </li>
        <li>
          <p>配送地址：</p>
          <p>
            <el-input
              placeholder="搜索内容"
              v-model="searchValue.delivery_address"
            />
          </p>
        </li>
        <!-- 计划单号 -->
        <li>
          <p style="marginright: 0">
            <el-input
              placeholder="搜索内容"
              v-model="searchVal"
              class="input-with-select"
            >
              <el-select
                @change="searchSortChange"
                style="width: 120px"
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
              <!-- <el-button slot="append" icon="el-icon-search" @click="search"></el-button> -->
            </el-input>
          </p>
          <p></p>
        </li>
      </ul>
      <div class="search-btn">
        <div>
          <span>实重:</span>
          <el-input
            placeholder=""
            v-model.number="minWeight"
            style="width: 100px"
            oninput="value=value.replace(/[^\d]/g,'')"
            @blur="changeWeight"
          ></el-input>
          -
          <el-input
            placeholder=""
            v-model.number="maxWeight"
            style="width: 100px"
            oninput="value=value.replace(/[^\d]/g,'')"
            @blur="changeWeight"
          ></el-input>
        </div>
        <el-button @click="search" plain type="primary">查询</el-button>
        <el-button @click="syncFromUser" plain v-if="showButtons.manualSync"
          >手动同步货件</el-button
        >
        <el-button @click="printLabel" plain v-if="showButtons.printPlan"
          >打印商品标签</el-button
        >
        <el-button @click="printBill" plain v-if="showButtons.printPlan"
          >打印拣货单</el-button
        >
        <!-- <el-button @click="printBox" plain>打印箱子标签</el-button> -->
      </div>
    </div>
    <div class="table">
      <ShipmentsTable
        :showButtons="showButtons"
        :tableData="tableData"
        :isPrintLabel="isPrintLabel"
        :isSync="isSync"
        :isPrintBill="isPrintBill"
        @printLabelSendToF="printLabelSendToF"
        @syncSendToF="syncSendToF"
        @printBillSendToF="printBillSendToF"
      />
    </div>
    <div class="pagination">
      <Page
        :page="{
          size: searchValue.page_size,
          currentPage: searchValue.page_num,
        }"
        :total="total"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      />
    </div>
    <div class="dialog">
      <el-dialog
        title="拣货单打印"
        :visible.sync="dialogFormVisible"
        @close="closeDialog"
      >
        <div class="printF">
          <div id="print">
            <PickingList
              :tableData="printBillData"
              :isEditCode="isEditCode"
              :hasCode="hasCode"
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
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import Page from "@/components/page";
import ShipmentsTable from "@/views/FBA/shipments/components/ShipmentsTable";
import PickingList from "@/views/FBA/shipments/components/PickingList";
import { loading, loadingClose, dateFormat } from "@/utils/common";
import { reqSyncFromUser, reqGetBill } from "@/api/FBA";
export default {
  data() {
    return {
      planNum: {
        planNumSel: "1",
        planNumAll: [
          {
            value: "1",
            label: "货件单号",
          },
          {
            value: "2",
            label: "SKU",
          },
          {
            value: "3",
            label: "MSKU",
          },
          {
            value: "4",
            label: "FNSKU",
          },
          {
            value: "5",
            label: "创建人",
          },
          {
            value: "6",
            label: "品名",
          },
        ],
      },
      isPrintLabel: 1, //打印商品标签标识
      isSync: 1, //手动同步货件标识
      isPrintBill: 1, //打印拣货单
      searchVal: "", //搜索内容
      searchValue: {
        page_num: 1,
        delivery_address: "",
        page_size: 10,
        site: [], //选择的站点
        warehouse_id: [], //选择的虚拟仓
        created_time: "", //创建时间
        inbound_code: "", //货件单号
        sku: "", //sku
        product_name: "", //品名
        creator: "", //创建者
        gross_weight_total: [],
      },
      minWeight: "",
      maxWeight: "",
      dialogFormVisible: false,
      printObj: {
        id: "print",
        popTitle: "拣货单",
        extraCss: "www.nantang.erp.com",
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
      },
      printBillData: {}, //打印发货单数据
      isEditCode: false, //拣货单编辑\
      hasCode: false,
    };
  },
  computed: {
    ...mapState({
      // site: (state) => state.common.siteCodeList,
      virtualWarehouse: (state) => state.common.warehouseList,
      showButtons: (state) => state.FBAshipments.showButtons,
      site: (state) => state.FBA.site,
      tableData: (state) => state.FBAshipments.shipmentsTable,
      total: (state) => state.FBAshipments.shipmentsTableTotal * 1,
    }),
  },
  methods: {
    ...mapActions([
      "getWarehouseList", //获取虚拟仓列表
    ]),
    ...mapActions("FBAshipments", ["getShipmentsTable"]),
    ...mapActions("FBA", ["getSite"]),
    //获取数据
    getShipmentsData() {
      loading();
      if (this.minWeight && this.maxWeight) {
        this.searchValue.gross_weight_total = [this.minWeight, this.maxWeight];
      } else {
        this.searchValue.gross_weight_total = [];
      }
      this.getShipmentsTable(this.searchValue)
        .then(() => {
          loadingClose();
        })
        .catch((data) => {
          loadingClose();
          this.$message.error(data);
        });
    },
    //打印箱子标签
    printBox() {},
    //打印商品标签
    printLabel() {
      this.isPrintLabel++;
    },
    printLabelSendToF(arg) {
      this.$router.push({ name: "PrintBrandLabel", query: { id: arg } });
    },
    //打印拣货单
    printBill() {
      this.isPrintBill++;
    },
    printBillSendToF(arg) {
      loading();
      reqGetBill({ shipment_id: arg })
        .then((data) => {
          loadingClose();
          if (data.code == 0) {
            this.printBillData = data.data;
            this.hasCode = true;
            this.dialogFormVisible = true;
          }
        })
        .catch((err) => {
          loadingClose();
        });
    },
    //关闭拣货单dialog
    closeDialog() {
      this.hasCode = false;
    },
    sure() {
      //打印拣货单
      this.dialogFormVisible = false;
    },
    //改变时间
    timeSet(val) {
      this.searchValue.created_time = dateFormat(val).split(" ")[0];
    },
    //搜索品类变化
    searchSortChange(arg) {
      this.searchValue.inbound_code = "";
      this.searchValue.sku = "";
      this.searchValue.creator = "";
      this.searchValue.product_name = "";
    },
    /* 改变实重 */
    changeWeight() {
      if (this.minWeight && this.maxWeight) {
        if (this.minWeight > this.maxWeight) {
          let value = this.maxWeight;
          this.maxWeight = this.minWeight;
          this.minWeight = value;
        }
      }
    },
    search() {
      switch (this.planNum.planNumSel * 1) {
        case 1:
          this.searchValue.inbound_code = this.searchVal;
          break;
        case 2:
          this.searchValue.sku = this.searchVal;
          break;
        case 3:
          this.searchValue.sku = this.searchVal;
          break;
        case 4:
          this.searchValue.sku = this.searchVal;
          break;
        case 5:
          this.searchValue.creator = this.searchVal;
          break;
        case 6:
          this.searchValue.product_name = this.searchVal;
          break;
      }
      this.searchValue.page_num = 1;
      this.getShipmentsData();
    },
    //手动同步货件
    syncFromUser() {
      this.isSync++;
    },
    syncSendToF(arg) {
      loading();
      reqSyncFromUser({ id: arg })
        .then((data) => {
          if (data.code == 0) {
            this.getShipmentsTable(this.searchValue)
              .then(() => {
                loadingClose();
                this.$message.success("更新成功");
              })
              .catch((err) => {
                loadingClose();
                this.$message.error(err);
              });
          } else {
            this.$message.error(data.msg);
            loadingClose();
          }
        })
        .catch((err) => {
          loadingClose();
          this.$message.error(err);
        });
    },
    //翻页
    handleSizeChange(arg) {
      this.searchValue.page_size = arg;
      this.getShipmentsData();
    },
    handleCurrentChange(arg) {
      this.searchValue.page_num = arg;
      this.getShipmentsData();
    },
  },
  components: {
    ShipmentsTable,
    Page,
    PickingList,
  },
  mounted() {
    let id = this.$getMenuId(
      sessionStorage.getItem("munuIdList"),
      this.$route.path
    );
    this.$store.dispatch("FBAshipments/getButtonList", { id });
    this.getWarehouseList();
    //初始化shipments table
    this.getShipmentsData();
    this.getSite();
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
  .search-btn {
    display: flex;
    align-items: center;
    & > button:nth-child(2) {
      margin-left: 15px;
    }
  }
}
.pagination {
  display: flex;
  justify-content: center;
}
</style>