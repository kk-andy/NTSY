<template>
  <div style="padding: 35px">
    <div :key="1">
      <div class="func">
        <p>店铺:</p>
        <p>
          <el-select
            multiple
            v-model="criteria.shop_id"
            filterable
            placeholder="全部店铺"
          >
            <el-option
              v-for="(item, key) in [...shopList]"
              :key="key"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </p>
        <p>虚拟仓:</p>
        <p>
          <el-select
            multiple
            v-model="criteria.warehouse_id"
            filterable
            placeholder="全部虚拟仓"
          >
            <el-option
              v-for="(item, key) in virtualWarehouse"
              :key="key"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </p>
        <!-- <p>到货情况:</p>
        <p>
          <el-select multiple v-model="criteria.arrival_status" placeholder="请选择">
            <el-option
              v-for="(item,key) in arriveStatus"
              :key="key"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </p>-->
        <!-- 搜索类别+内容 -->
        <p v-if="hasFuzzy">
          <el-autocomplete
            placeholder="搜索内容"
            v-model="searchValue"
            :fetch-suggestions="querySearchAsync"
            class="input-with-select"
          >
            <el-select
              style="width: 110px"
              @change="selSortChange"
              v-model="selSearchSort"
              slot="prepend"
              placeholder="选择类别"
            >
              <el-option
                v-for="(item, key) in searchSort"
                :key="key"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="find"
            ></el-button>
          </el-autocomplete>
        </p>
        <p v-else>
          <el-input
            placeholder="搜索内容"
            v-model="searchValue"
            class="input-with-select"
          >
            <el-select
              style="width: 110px"
              @change="selSortChange"
              v-model="selSearchSort"
              slot="prepend"
              placeholder="选择类别"
            >
              <el-option
                v-for="(item, key) in searchSort"
                :key="key"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="find"
            ></el-button>
          </el-input>
        </p>
        <!-- ------- -->
        <p>
          <el-button
            type="primary"
            v-if="showButtons.exportData"
            @click="exportExcel"
            >导出</el-button
          >
        </p>
      </div>
      <div class="table">
        <ReplenishmentPlanTable :tableData="tableData" @sortable="sort" />
      </div>
      <div class="pagination">
        <Page
          :page="{
            size: 10,
            currentPage: 1,
          }"
          :total="total"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { loading, loadingClose } from "@/utils/common";
import ReplenishmentPlanTable from "@/views/FBA/replenishmentPlan/components/ReplenishmentPlanTable";
import Page from "@/components/page";
import { downlaod } from "@/utils/common";
import { mapState, mapMutations, mapActions } from "vuex";
import { getStaffIdSession, getStaffNameSession } from "@/utils/auth";
export default {
  data() {
    return {
      // selSite: "", //站点下拉
      // selVirtual: "", //虚拟仓下拉
      // arrive: "", //到货情况下拉

      //搜索类别下拉
      selSearchSort: "1",
      //搜索内容
      searchValue: "",
      //搜索类型
      searchSort: [
        {
          value: "1",
          label: "SKU",
        },
        {
          value: "2",
          label: "商品名称",
        },
        {
          value: "3",
          label: "创建人",
        },
      ],
      hasFuzzy: false, //是否为人员类型带模糊搜索
      //搜索条件
      criteria: {
        page_num: 1,
        page_size: 10,
        shop_id: "",
        warehouse_id: "",
        // arrival_status: false,
        sku: "",
        product_name: "",
        creater: "",
        sort_by: "",
        sort_rule: "",
      },
    };
  },
  computed: {
    ...mapState({
      site: (state) => state.common.siteCodeList,
      virtualWarehouse: (state) => state.common.warehouseList,
      tableData: (state) =>
        state.FBAreplenishmentPlan.replenishmentPlanTableData,
      //补货单总条数
      total: (state) => state.FBAreplenishmentPlan.replenishmentTotal,
      //批量选择
      tableSel: (state) => state.FBAreplenishmentPlan.replenishmintSelVal,
      //补货单文件流
      replenishmentPlanFlow: (state) =>
        state.FBAreplenishmentPlan.replenishmentPlanFlow,
      //到货情况
      // arriveStatus: (state) => state.common.arriveStatus,
      //店铺列表
      // shopList: (state) => state.common.shopList,
      shopList: (state) => state.FBA.shop,
      //OA 人员列表
      OAUserList: (state) => state.FBA.OAUserList,
      showButtons: (state) => state.FBAreplenishmentPlan.showButtons,
    }),
  },
  methods: {
    ...mapActions([
      "getWarehouseList", //获取虚拟仓列表
      // "getShopList", //获取店铺列表
      // "getArriveStatus", //获取到货情况
    ]),
    ...mapActions("FBAreplenishmentPlan", [
      "getReplenishmentPlan", //获取补货单
      "getReplenishmentFlow", //获取文件流
    ]),
    ...mapActions("FBA", [
      "getShop",
      "getOAUserList", //获取OA人员列表
    ]),
    //获取补货计划单
    getReplenishmentTableDate() {
      loading();
      this.getReplenishmentPlan(this.criteria).then(() => {
        loadingClose();
      });
    },

    //导出补货单
    exportExcel() {
      if (this.tableSel.length !== 0) {
        this.getReplenishmentFlow({ plan_id: this.tableSel }).then(() => {
          downlaod(this.replenishmentPlanFlow, "补货单");
        });
      } else {
        this.$message.warning("请先勾选要导出的部分");
      }
    },
    //限制条数变动
    handleSizeChange(arg) {
      this.criteria.page_size = arg;
      this.getReplenishmentTableDate();
    },
    //当前页变动
    handleCurrentChange(arg) {
      this.criteria.page_num = arg;
      this.getReplenishmentTableDate();
    },
    //排序
    sort(arg) {
      this.criteria.sort_by = arg.sort_by;
      this.criteria.sort_rule = arg.sort_rule;
      this.getReplenishmentTableDate();
    },
    //类别下拉初始化
    selSortChange(arg) {
      //搜索内容初始化
      this.criteria.sku = "";
      this.criteria.product_name = "";
      this.criteria.creater = "";
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
    //查找按钮
    find() {
      switch (this.selSearchSort) {
        case "1":
          this.criteria.sku = this.searchValue;

          break;
        case "2":
          this.criteria.product_name = this.searchValue;
          break;
        case "3":
          this.criteria.creater = this.searchValue;
          break;
      }
      this.criteria.page_num = 1;
      this.getReplenishmentTableDate();
    },
    //获取员工列表
    // getShopList() {
    //   let params = {
    //     staffId: getStaffIdSession(),
    //     staffName: getStaffNameSession(),
    //   };
    //   console.log(params);
    //   this.$store.dispatch("getShopList", params);
    // },
  },
  components: {
    ReplenishmentPlanTable,
    Page,
  },
  async mounted() {
    //初始补货单
    this.getShop();
    this.getReplenishmentTableDate();
    this.getWarehouseList();
    let id = this.$getMenuId(
      sessionStorage.getItem("munuIdList"),
      this.$route.path
    );

    this.$store.dispatch("FBAreplenishmentPlan/getButtonList", { id });
    // this.getArriveStatus();
    // this.getShopList();
  },
};
</script>

<style lang="scss" scoped>
.func {
  width: 100%;
  // height: 36px;
  margin-bottom: 50px;
  white-space: nowrap;
  p {
    // float: left;
    display: inline-block;
    line-height: 36px;
    margin: 0;
    margin-right: 30px;
  }
  p:nth-child(1) {
    margin-right: 10px;
  }
  p:nth-child(3) {
    margin-right: 10px;
  }
  p:nth-child(5) {
    margin-right: 10px;
  }
}
.shipmentsBtn {
  border: 0;
  background: white;
}
.pagination {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
</style>