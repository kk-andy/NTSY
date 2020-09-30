<template>
  <div style="padding:15px">
    <div class="main">
      <div class="title">
        <h2>添加商品</h2>
      </div>
      <div class="search">
        <div>
          <el-input v-model="searchValue.title" placeholder="品名"></el-input>
          <!-- <el-autocomplete
              v-model="title"
              :fetch-suggestions="querySearchAsync"
              placeholder="品名"
              @select="handleSelect"
          ></el-autocomplete>-->
        </div>
        <div>
          <el-input style="width:200px" v-model="searchValue.skus" placeholder="MSKU/FNSKU/SKU" />
        </div>
        <div>
          <el-button @click="search" type="primary">搜索</el-button>
        </div>
      </div>
      <div class="table">
        <InsertFromUserTable :tableData="tableList" />
      </div>
      <!-- <div class="pagination" v-show="total*1>10">
        <Page
          :page="{size:searchValue.page_size,currentPage:searchValue.page_num}"
          :total="total*1"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
        />
      </div>-->
      <div class="func">
        <el-button @click="cancel" plain>取消</el-button>
        <el-button @click="submit" type="primary">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Page from "@/components/page";
import InsertFromUserTable from "@/views/FBA/shipmentsPlan/components/InsertFromUserTable";
import { mapState, mapMutations, mapActions } from "vuex";
import { loading, loadingClose } from "@/utils/common";
import { reqGetSku } from "@/api/FBA";
export default {
  data() {
    return {
      tableList: [],
      total: "",
      searchVal: "",
      searchValue: {
        title: "",
        skus: "",
        page_num: 1,
        page_size: 1000,
      },
    };
  },
  computed: {
    ...mapState({
      //批量选择的id
      shipment_id: (state) => state.FBAshipmentsPlan.shipmentsPlanVal,
      //发货计划想请数据
      tableData: (state) => state.FBAshipmentsPlan.shipmentsDetailTableData,
      //table选中项
      insertFromUserValue: (state) =>
        state.FBAshipmentsPlan.insertFromUserValue,
    }),
  },
  methods: {
    ...mapActions("FBAshipmentsPlan", ["insertToShipmentsDetailTable"]),
    search() {
      if (this.searchValue.title || this.searchValue.skus) {
        loading();

        reqGetSku({
          shop_id: this.tableData.shop_id,
          warehouse_id: this.tableData.warehouse_id,
          ...this.searchValue,
        }).then((data) => {
          loadingClose();
          if (data.code == 0) {
            if (data.data.total > 0) {
              if (this.tableList.length > 0) {
                data.data.list.forEach((item) => {
                  let addCan = true; //重复性验证
                  this.tableList.forEach((i) => {
                    if (i.sku_id == item.sku_id) {
                      addCan = false;
                    }
                  });
                  if (addCan) {
                    this.tableList.unshift(item);
                  }
                });
              } else {
                this.tableList = data.data.list;
              }
            } else {
              this.$message.error("未搜索到有关商品");
            }
          }
        });
      } else {
        this.$message.warning("请输入搜索内容");
      }
    },
    //取消
    cancel() {
      this.$router.push({ name: "EditShipmentsPlan" });
    },
    //确定
    submit() {
      let hasMessage = false; //是否弹窗已过滤
      if (this.insertFromUserValue.length <= 0) {
        this.$message.warning("请先进行选中");
      } else {
        let temporaryData = []; //临时数据 过滤掉为0的
        this.insertFromUserValue.forEach((item) => {
          if (item.available_num > 0) {
            temporaryData.unshift(item);
          } else {
            hasMessage = true;
          }
        });
        //过滤掉重复数据
        if (temporaryData.length > 0) {
          for (let index = temporaryData.length - 1; index >= 0; index--) {
            this.tableData.items.forEach((i, key) => {
              //防止裁剪掉无数据
              if (temporaryData.length > 0) {
                if (temporaryData[index].sku_id == i.sku_id) {
                  temporaryData.splice(index, 1);
                  hasMessage = true;
                }
              }
            });
          }
        }
        this.insertToShipmentsDetailTable(temporaryData);
        if (hasMessage) {
          this.$message.warning("已为您过滤掉重复和可用量为0的数据");
        }
        this.$router.push({
          name: "EditShipmentsPlan",
        });
      }
    },
    //分页
    handleSizeChange(arg) {
      this.searchValue.page_size = arg;
      this.search();
    },
    handleCurrentChange(arg) {
      this.searchValue.page_num = arg;
      this.search();
    },
  },
  components: {
    InsertFromUserTable,
    Page,
  },
  mounted() {
    //初始id验证
    // if (!this.shipment_id) {
    //   this.$message.warning("网络波动，请先进行选择");
    //   this.$router.push({ name: "shipmentsPlan" });
    // } else
    // console.log(this.tableData);
    this.tableList = []; //初始化table数据
    if (!this.tableData) {
      this.$message.warning("网络波动，请先进行选择");
      this.$router.push({ name: "shipmentsPlan" });
    } else {
      // console.log(this.tableData);
    }
  },
};
</script>

<style lang="scss" scoped>
.main {
  padding: 10px;
  background: #f2f2f2;
  width: 100%;
  .title {
    width: 100%;
    border-bottom: 1px solid #dfdfdf;
    margin-bottom: 25px;
  }
  .search {
    margin-bottom: 25px;
    white-space: nowrap;
    div {
      display: inline-block;
    }
    div:nth-child(1) {
      margin-right: 10px;
    }
    div:nth-child(2) {
      margin-right: 50px;
    }
  }
  .pagination {
    display: flex;
    justify-content: center;
  }
  .func {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>