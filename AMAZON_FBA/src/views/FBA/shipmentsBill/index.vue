<template>
  <div style="padding: 35px">
    <div class="func">
      <div class="func1">
        <p v-if="hasFuzzy" style="marginright: 0">
          <el-autocomplete
            placeholder="搜索内容"
            v-model="searchVal"
            :fetch-suggestions="querySearchAsync"
            class="input-with-select"
            style="width: 450px"
          >
            <el-select
              style="width: 150px"
              @change="selSortChange"
              v-model="searchSortSel"
              slot="prepend"
              placeholder="选择类别"
            >
              <el-option
                v-for="(item, key) in searchSortAll"
                :key="key"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="search"
            ></el-button>
          </el-autocomplete>
        </p>
        <p v-else style="marginright: 0">
          <el-input
            placeholder="搜索内容"
            v-model="searchVal"
            class="input-with-select"
            style="width: 450px"
          >
            <el-select
              style="width: 150px"
              @change="selSortChange"
              v-model="searchSortSel"
              slot="prepend"
              placeholder="请选择"
            >
              <el-option
                v-for="item in searchSortAll"
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
      </div>
      <div class="func2">
        <el-button @click="exportFreight" plain v-if="showButtons.exportData"
          >导出</el-button
        >
        <el-button
          @click="importFreight"
          type="primary"
          v-if="showButtons.importData"
          >导入运费及跟踪号</el-button
        >
        <el-button
          @click="importPayAmountTime"
          type="primary"
          v-if="showButtons.importData"
          >导入付款金额及时间</el-button
        >
      </div>
    </div>
    <div class="table">
      <ShipmentsBillTable :tableData="tableData" @sortable="sort" />
    </div>
    <div class="pagination">
      <Page
        :page="{
          currentPage: searchValue.page_num,
          size: searchValue.page_size,
        }"
        :total="tableTotal"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import ShipmentsBillTable from "@/views/FBA/shipmentsBill/components/ShipmentsBillTable";
import { mapState, mapMutations, mapActions } from "vuex";
import Page from "@/components/page";
import { reqGetShipmentsBill, reqExportFreight } from "@/api/FBA";
import { loading, loadingClose } from "@/utils/common";
import { downlaod } from "@/utils/common";
export default {
  data() {
    return {
      searchSortAll: [
        {
          label: "发货单号",
          value: "1",
        },
        {
          label: "创建人",
          value: "2",
        },
        {
          label: "SKU",
          value: "3",
        },
        {
          label: "shipmentID",
          value: "4",
        },
      ],
      searchSortSel: "1", //搜索类别的下拉
      searchVal: "",
      hasFuzzy: false, //是否模糊搜索
      searchValue: {
        page_num: 1,
        page_size: 10,
        inbound_code: "", //shipmentid
        invoice_code: "", //发货单号
        sku: "", //sku
        creater: "",
        sort_by: "",
        sort_rule: "",
      },
    };
  },
  computed: {
    ...mapState({
      //OA 人员列表
      OAUserList: (state) => state.FBA.OAUserList,
      tableData: (state) => state.FBAshipmentsBill.tableData,
      tableSel: (state) => state.FBAshipmentsBill.tableSel, //table选中项
      showButtons: (state) => state.FBAshipmentsBill.showButtons,
      tableTotal: (state) => state.FBAshipmentsBill.tableTotal * 1,
    }),
  },
  methods: {
    ...mapActions("FBA", [
      "getOAUserList", //获取OA人员列表
    ]),
    ...mapActions("FBAshipmentsBill", ["getTableData"]),
    //获取主要数据
    getData() {
      loading();
      this.getTableData(this.searchValue)
        .then((data) => {
          loadingClose();
        })
        .catch((err) => {
          loadingClose();
          this.$message.warning(err || "请求失败");
        });
    },
    selSortChange(arg) {
      this.searchValue.inbound_code = "";
      this.searchValue.invoice_code = "";
      this.searchValue.sku = "";
      this.searchValue.creater = "";
      if (arg == 2) {
        this.hasFuzzy = true;
      } else {
        this.hasFuzzy = false;
      }
    }, //搜索内容下拉change
    search() {
      // console.log(this.searchSortSel);
      switch (this.searchSortSel * 1) {
        case 1:
          this.searchValue.invoice_code = this.searchVal;

          break;
        case 2:
          this.searchValue.creater = this.searchVal;
          break;
        case 3:
          this.searchValue.sku = this.searchVal;
          break;
        case 4:
          this.searchValue.inbound_code = this.searchVal;
          break;
      }
      this.searchValue.page_num = 1;
      this.getData();
    }, //查找
    //导入
    importFreight() {
      if (this.tableSel.length <= 0) {
        this.$message.warning("请先进行导入勾选");
      } else if (this.tableSel.length > 1) {
        this.$message.warning("只能导入单条");
      } else {
        this.$router.push({
          name: "importFreight",
          query: { id: this.tableSel[0].id },
        });
      }
    },
    //导入金额时间
    importPayAmountTime() {
      if (this.tableSel.length <= 0) {
        this.$message.warning("请先进行导入勾选");
      } else if (this.tableSel.length > 1) {
        this.$message.warning("只能导入单条");
      } else {
        this.$router.push({
          name: "importPayAmountTime",
          query: { id: this.tableSel[0].id },
        });
      }
    },
    //导出
    exportFreight() {
      if (this.tableSel.length <= 0) {
        this.$message.warning("请先进行导出勾选");
      } else {
        let ids = "";
        this.tableSel.forEach((item) => {
          if (ids == "") {
            ids = item.id.toString();
          } else {
            ids += "," + item.id;
          }
        });
        loading();
        reqExportFreight({ id: ids })
          .then((data) => {
            loadingClose();
            downlaod(data, "发货单");
          })
          .catch((err) => {
            loadingClose();
            this.$message.error(err);
          });
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
    //排序
    sort(arg) {
      this.searchValue.sort_by = arg.sort_by;
      this.searchValue.sort_rule = arg.sort_rule;
      this.getData();
    },
    //限制条数变动
    handleSizeChange(arg) {
      this.searchValue.page_size = arg;
      this.getData();
    },
    //当前页变动
    handleCurrentChange(arg) {
      this.searchValue.page_num = arg;
      this.getData();
    },
  },
  components: {
    Page,
    ShipmentsBillTable,
  },
  mounted() {
    let id = this.$getMenuId(
      sessionStorage.getItem("munuIdList"),
      this.$route.path
    );
    this.$store.dispatch("FBAshipmentsBill/getButtonList", { id });
    this.getData();
    // this.getTableData
  },
};
</script>

<style lang="scss" scoped>
.func {
  margin-bottom: 20px;
  .func1 {
    width: 400px;
    margin-bottom: 20px;
  }
  .func2 {
    display: flex;
    justify-content: flex-end;
  }
}
.pagination {
  display: flex;
  justify-content: center;
}
</style>