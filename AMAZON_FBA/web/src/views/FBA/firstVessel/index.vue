<template>
  <div style="padding: 35px">
    <div class="func">
      <div class="funcTop">
        <ul>
          <li>
            <p>发货时间：</p>
            <el-date-picker
              v-model="searchValue.shipping_time"
              type="date"
              placeholder="选择日期"
              @change="timeSet"
            ></el-date-picker>
          </li>
          <li>
            <p>品名：</p>
            <div>
              <el-input placeholder="请输入" v-model="searchValue.title" />
            </div>
          </li>
          <li>
            <span>运输方式：</span>
            <el-select
              v-model="searchValue.shipping_type"
              slot="prepend"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="(item, key) in logisticsModeVal"
                :key="key"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </li>
          <li>
            <el-input
              placeholder="请输入"
              v-model="searchVal"
              class="input-with-select"
            >
              <el-select
                style="width: 120px"
                @change="selSortChange"
                slot="prepend"
                placeholder="选择类别"
                v-model="selSort"
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
          </li>
        </ul>
      </div>
      <div class="funcBottom">
        <el-button @click="exportVessel" plain v-if="showButtons.exportData"
          >导出</el-button
        >
      </div>
    </div>
    <div class="table">
      <FirstVesselTable :tableData="tableData" />
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
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import FirstVesselTable from "@/views/FBA/firstVessel/components/FirstVesselTable";
import Page from "@/components/page";
import { loading, loadingClose, dateFormat } from "@/utils/common";
import { downlaod } from "@/utils/common";
import { exportFirstVessel } from "@/api/FBA";
export default {
  data() {
    return {
      searchValue: {
        page_num: 1,
        page_size: 10,
        shipping_time: "", //发货时间
        title: "", //品名
        shipping_type: "", //运输方式
        asin: "",
        sku: "", //sku和msku
        tracking_code: "",
        inbound_code: "",
        invoice_code: "",
      },

      //搜索类别绑定
      selSort: 1,
      //搜索类别
      searchSort: [
        {
          label: "ASIN",
          value: 1,
        },
        {
          label: "MSKU",
          value: 2,
        },
        {
          label: "SKU",
          value: 3,
        },
        {
          label: "物流单号",
          value: 4,
        },
        {
          label: "货件单号",
          value: 5,
        },
      ],
      searchVal: "", //输入内容
    };
  },
  computed: {
    ...mapState({
      //物流总数据
      logisticsModeVal: (state) => state.FBAshipmentsPlan.transportType,
      tableData: (state) => state.FBAfirstVessel.firstVesselTableData,
      showButtons: (state) => state.FBAfirstVessel.showButtons,
      total: (state) => state.FBAfirstVessel.total * 1,
      tableSel: (state) => state.FBAfirstVessel.tableSel,
    }),
  },
  methods: {
    ...mapActions("FBAshipmentsPlan", [
      //获取发货方式
      "getTransportType",
    ]),
    ...mapActions("FBAfirstVessel", [
      "getFirstVesselTableData", //获取列表
    ]),
    //获取主数据
    getData() {
      loading();
      this.getFirstVesselTableData(this.searchValue).then(() => {
        loadingClose();
      });
    },
    //改变时间
    timeSet(val) {
      this.searchValue.shipping_time = dateFormat(val).split(" ")[0];
    },
    //搜索类别改变
    selSortChange(arg) {
      this.searchValue.asin = "";
      this.searchValue.sku = "";
      this.searchValue.tracking_code = "";
      this.searchValue.inbound_code = "";
      this.searchValue.invoice_code = "";
    },
    //查找
    find() {
      switch (this.selSort) {
        case 1:
          this.searchValue.asin = this.searchVal;
          break;
        case 2:
          this.searchValue.sku = this.searchVal;
          break;
        case 3:
          this.searchValue.sku = this.searchVal;
          break;
        case 4:
          this.searchValue.tracking_code = this.searchVal;
          break;
        case 5:
          this.searchValue.inbound_code = this.searchVal;
          break;
        case 6:
          this.searchValue.invoice_code = this.searchVal;
          break;
      }
      this.searchValue.page_num = 1;
      this.getData();
    },
    //导出
    exportVessel() {
      if (this.tableSel.length !== 0) {
        let ids = "";
        this.tableSel.forEach((item) => {
          if (ids == "") {
            ids = item.id.toString();
          } else {
            ids += "," + item.id;
          }
        });
        loading();
        exportFirstVessel({ id: ids })
          .then((data) => {
            loadingClose();
            downlaod(data, "头程跟踪");
          })
          .catch((err) => {
            loadingClose();
            this.$message.error(err);
          });
      } else {
        this.$message.warning("请先勾选要导出的部分");
      }
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
    FirstVesselTable,
    Page,
  },
  mounted() {
    let id = this.$getMenuId(
      sessionStorage.getItem("munuIdList"),
      this.$route.path
    );
    this.$store.dispatch("FBAfirstVessel/getButtonList", { id });
    this.getTransportType();
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.func {
  margin-bottom: 30px;
  width: 100%;
  .funcTop {
    white-space: nowrap;
    ul {
      display: flex;
      justify-content: space-between;

      align-items: center;
      li {
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
      li:nth-child(2) {
        display: flex;
        justify-content: flex-start;
      }
    }
  }
  .funcBottom {
    display: flex;
    justify-content: flex-end;
  }
}
.table {
  margin-bottom: 30px;
}
.pagination {
  display: flex;
  justify-content: center;
}
</style>