<template>
  <div>
    <div id="pdfCentent">
      <div class="title">
        <h1 style="textAlign:center">发货计划</h1>
        <p>
          <span>打印时间：</span>
          <span>{{nowTime}}</span>
        </p>
      </div>
      <div class="head">
        <p>
          <span>计划单号：</span>
          <span>{{tableData.shipment_code}}</span>
        </p>
        <p>
          <span>虚拟仓：</span>
          <span>{{tableData.warehouse_name}}</span>
        </p>
        <p>
          <span>店铺：</span>
          <span>{{tableData.shop_name}}</span>
        </p>
        <p>
          <span>运输方式：</span>
          <span>{{tableData.shipping_type}}</span>
        </p>
      </div>
      <div class="head" style="marginBottom:50px">
        <p>
          <span>创建人：</span>
          <span>{{tableData.creater_name}}</span>
        </p>
        <p>
          <span>创建时间：</span>
          <span>{{tableData.created_time}}</span>
        </p>
        <p>
          <span>备注：</span>
          <span>{{tableData.remark}}</span>
        </p>
      </div>
      <div class="table">
        <ShipmentsPlanDetailTable :tableData="tableData.items" :isPrint="isPrint" />
      </div>
    </div>

    <div class="btn">
      <!-- @click="ExportSavePdf(htmlTitle,nowTime)" -->
      <el-button @click="print" v-print="printObj" type="primary">打印</el-button>
      <el-button @click="close" plain>关闭</el-button>
    </div>
    <!-- <div class="pagination">
      <Page :page="{size:10,currentPage:1}" :total="20" />
    </div>-->
  </div>
</template>

<script>
import Page from "@/components/page";
import ShipmentsPlanDetailTable from "@/views/FBA/shipmentsPlan/components/ShipmentsPlanDetailTable";
import { mapState, mapMutations, mapActions } from "vuex";
import { loading, loadingClose } from "@/utils/common";
export default {
  data() {
    return {
      htmlTitle: "PDF名称",
      nowTime: "",
      test: [
        {
          site: 121,
        },
      ],
      printObj: {
        id: "pdfCentent",
        popTitle: "发货计划",
        extraCss: "www.nantang.erp.com",
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
      },
      isPrint: true,
    };
  },
  computed: {
    ...mapState({
      tableData: (state) => state.FBAshipmentsPlan.shipmentsDetailTableData,
    }),
  },
  methods: {
    ...mapMutations("FBAshipmentsPlan", ["changeShipmentsDetailTableData"]),
    ...mapActions("FBAshipmentsPlan", [
      //获取tabledata
      "getShipmentsDetail",
    ]),
    print() {},
    close() {
      this.$router.push({ name: "shipmentsPlan" });
    },
  },
  components: {
    Page,
    ShipmentsPlanDetailTable,
  },
  mounted() {
    // console.log(this.$route);
    this.nowTime = new Date().toLocaleDateString();
    loading();
    this.getShipmentsDetail(this.$route.query.id).then(() => {
      loadingClose();
    });
  },
  beforeDestroy() {
    this.changeShipmentsDetailTableData([]);
  },
};
</script>
<style scoped media="print">
@page {
  /* size: landscape; */
}
@media print {
  #pdfCentent {
    width: 1175px;
    margin: 0 auto;
  }
}
</style>
<style lang="scss" scoped>
#pdfCentent {
  background: #f2f2f2;
  width: 1175px;
  // padding-bottom: 50px;
  // margin-bottom: 10px;
  .title {
    border-bottom: 1px solid #ebebeb;
    overflow: hidden;
    padding-bottom: 10px;
    h1 {
      // width: 100px;
      margin: 0 auto;
      margin-top: 10px;
    }
    p {
      float: right;
      margin: 0;
      margin-right: 10px;
    }
  }
  .head {
    width: 100%;
    white-space: nowrap;
    display: flex;
    justify-content: space-around;
    // margin-bottom: 50px;
    // font-size: 18px;
    p {
      display: flex;
      justify-content: center;
      float: left;
      font-size: 15px;
      span:nth-child(2) {
        font-weight: bold;
        margin-left: 5px;
      }
    }
  }
  // @media print {
  //   .table {
  //     width: 1175px;
  //   }
  // }

  .table {
    margin-bottom: 50px;
    // width: 1175px;
  }
}

.btn {
  margin-left: 500px;
  // display: flex;
  // justify-content: center;
  // margin-bottom: 100px;
}
.pagination {
  display: flex;
  justify-content: center;
}
</style>