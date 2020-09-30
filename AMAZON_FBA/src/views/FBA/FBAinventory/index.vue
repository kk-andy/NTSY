<template>
  <div class="main">
    <el-row type="flex" class="row-bg search-head" justify="space-around">
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <span>店铺:</span>
          <el-select v-model="search.shop" filterable clearable placeholder="请选择">
            <el-option
              v-for="item in shopList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <span>虚拟仓:</span>
          <el-select v-model="search.virtualWarehouse" filterable clearable placeholder="请选择">
            <el-option
              v-for="item in warehouseList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <span>品名:</span>
          <el-input placeholder="搜索内容" v-model="search.productName" />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple min-select">
          <span></span>
          <el-select v-model="searchKey" placeholder="请选择">
            <el-option
              v-for="item in searchList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input v-model="search.searchWord" clearable placeholder="搜索内容">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <search-btn-group @doFilter="doFilter" @doReset="doReset" />
        </div>
      </el-col>
    </el-row>
    <Header>
      <el-button @click="exportData" v-if="showButtons.exportData">导出</el-button>
    </Header>
    <div v-if="tableData.length">
      <table-content :tableData="tableData" />
      <change-page
        :page="page"
        :total="total"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
      />
    </div>
    <no-data-content v-else />
  </div>
  <!-- </div> -->
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import TableContent from "./components/FBAinventoryTable";
// import NoDataContent from '@/components/NoDataImages'
import { getStaffIdSession, getStaffNameSession } from "@/utils/auth";
import NoDataContent from "@/components/NoDataImages";
import { mixin } from "@/mixins/common";
export default {
  computed: {
    ...mapState({
      searchList: (state) => state.FBAinventory.searchList,
      tableData: (state) => state.FBAinventory.tableData,
      showButtons: state => state.FBAinventory.showButtons,
      total: (state) => state.FBAinventory.total,
    }),
    ...mapGetters(["warehouseList", "shopList"]),
  },
  components: {
    TableContent,
    NoDataContent
  },
  // exportData() {
  //   this.$store.dispatch("FBAinventory/exportData");
  // },
  mixins: [mixin],
  data() {
    return {
      search: {
        virtualWarehouse: "",
        shop: "",
        productName: "",
        searchWord: "",
      },
      params: {},
      searchKey: "sku",
    };
  },
  methods: {
    getData() {
      let params = {
        page_num: this.page.currentPage,
        page_size: this.page.size,
        shop_id: this.search.shop,
        virt_id: this.search.virtualWarehouse,
        title: this.search.productName,
        [this.searchKey]: this.search.searchWord,
      };
      this.$store.dispatch("FBAinventory/getList", params);
    },
    exportData() {
      let params = {
        // page_num: this.page.currentPage,
        // page_size: this.page.size,
        shop_id: this.search.shop,
        virt_id: this.search.virtualWarehouse,
        title: this.search.productName,
        [this.searchKey]: this.search.searchWord,
      };
      this.$store.dispatch("FBAinventory/exportData", params);
    },
    getShopList() {
      let params = {
        staffId: getStaffIdSession(),
        staffName: getStaffNameSession(),
      };
      this.$store.dispatch("getShopList", params);
    },
    ...mapActions(["getWarehouseList"]),
  },
  async created() {
    let id = this.$getMenuId(sessionStorage.getItem("munuIdList"), this.$route.path);
    await this.$store.dispatch('FBAinventory/getButtonList', { id })
    this.getWarehouseList();
    this.getShopList();
    this.getData();
  },
};
</script>
<style scoped lang="scss">
.main {
  Header {
    display: flex;
    flex-direction: row-reverse;
    padding: 10px 0;
  }
}
</style>