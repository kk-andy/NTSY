<template>
  <div>
    <div class="main">
      <div class="title">
        <h2>打印商品标签</h2>
      </div>
      <!-- <div class="func">
        <h4>FNSKU标签打印设置</h4>
        <div class="funcSel">
          <div>
            <span>打印纸张类型</span>
            <el-select
              style="width:230px"
              class="print"
              v-model="paperTypeSel"
              placeholder="选择纸张类型"
            >
              <el-option
                v-for="item in paperTypeVal"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div>
            <span>打印内容</span>
            <el-select class="print" v-model="printValSel" placeholder="选择打印内容">
              <el-option
                v-for="item in printVal"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>-->
      <h4>打印FNSKU标签</h4>
      <div class="table">
        <printBrandLabelTable :tableData="tableData" :isPrint="isPrint" @sendToF="sendToF" />
      </div>
    </div>
    <div class="btns">
      <el-button @click="cancel" plain>取消</el-button>
      <el-button @click="print" type="primary">打印</el-button>
    </div>
    <div class="dialog">
      <el-dialog title="标签打印" :visible.sync="dialogFormVisible">
        <div class="printF">
          <div id="print">
            <div v-for="(item,key) in skuSel" :key="key" class="printItem">
              <div v-for="(i,index) in item.plan_num*1" :key="index" style="marginBottom:25px">
                <barcode :value="item.product_sku" :options="options" tag="img" />
                <p style="margin:0;" class="productTitle">{{item.title_en}}</p>
                <p style="margin:0">{{item.condition_type}}</p>
              </div>
            </div>
          </div>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" v-print="printObj" @click="sure">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import printBrandLabelTable from "@/views/FBA/shipmentsPlan/components/printBrandLabelTable";
import { mapState, mapMutations, mapActions } from "vuex";
import { loading, loadingClose } from "@/utils/common";
import { reqGetShipmentDetail } from "@/api/FBA";
import JsBarcode from "@/components/JsBarcode";
import VueBarcode from "vue-barcode";

export default {
  data() {
    return {
      dialogFormVisible: false,
      tableData: [],
      isPrint: 1, //判断打印
      skuSel: [], //选择的sku
      printObj: {
        id: "print",
        popTitle: "产品标签",
        extraCss: "www.nantang.erp.com",
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
      },
      paperTypeVal: [
        {
          value: 1,
          label: "热敏纸（50*30）单排",
        },
        {
          value: 2,
          label: "热敏纸（100*30）双排",
        },
        {
          value: 3,
          label: "A4纸（每页40个标签） 四排",
        },
        {
          value: 4,
          label: "A4纸（每页44个标签） 四排",
        },
      ],
      paperTypeSel: "",
      printVal: [
        {
          value: 1,
          label: "打印SKU",
        },
        {
          value: 2,
          label: "打印品名",
        },
      ],
      printValSel: "",
      options: {
        format: "barcode-format",
        height: 48,
        width: "1px",
        textMargin: 25,
        textAlign: "left",
      },
    };
  },
  computed: {
    // ...mapState({
    //   tableData: (state) => state.FBAshipmentsPlan.shipmentsDetailTableData,
    // }),
  },
  methods: {
    // ...mapMutations("FBAshipmentsPlan", ["changeShipmentsDetailTableData"]),
    // ...mapActions("FBAshipmentsPlan", [
    //   //获取tabledata
    //   "getShipmentsDetail",
    // ]),
    sure() {
      this.dialogFormVisible = false;
    },
    cancel() {
      this.$router.push("shipmentsPlan");
    },
    // dialogFormVisible(arg) {},
    print() {
      this.isPrint++;
    },
    sendToF({ type, data }) {
      if (type == 0) {
        this.$message.error("请选择需要打印的商品");
      } else if (type == 1) {
        this.skuSel = data;
        this.dialogFormVisible = true;
      }
    },
  },
  components: {
    printBrandLabelTable,
    JsBarcode,
    barcode: VueBarcode,
  },
  mounted() {
    loading();

    reqGetShipmentDetail({ shipment_id: this.$route.query.id }).then((data) => {
      if (!data.data.length) {
        this.tableData = data.data.items;
        loadingClose();
      } else {
        data.data.forEach((item) => {
          item.items.forEach((i) => [this.tableData.push(i)]);
        });
        loadingClose();
      }
    });
  },
  //初始化数据
  // beforeDestroy() {
  //   this.changeShipmentsDetailTableData([]);
  // },
};
</script>

<style lang="scss" scoped>
.printItem {
  width: 100%;
  height: 30%;
  // margin-bottom: 10px;
  svg {
    height: 58px;
    rect {
      height: 58;
    }
  }
  .productTitle {
    width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 15px;
  }
}
.printF {
  height: 400px;
  overflow-y: scroll;
}
.main {
  width: 100%;
  min-height: 650px;
  padding: 20px;
  background: #f2f2f2;
  margin-bottom: 20px;
  .title {
    height: 40px;
    align-items: center;
    border-bottom: 1px solid #ebebeb;
  }
  .func {
    .funcSel {
      width: 100%;
      height: 70px;
      border: solid black 1px;
      background: white;
      display: flex;
      align-items: center;

      div {
        display: inline-block;
        white-space: nowrap;
      }
      div:nth-child(1) {
        margin: 0 20px 0 30px;
      }
    }
  }
  .table {
    min-height: 400px;
  }
}
.btns {
  float: right;
  margin-bottom: 50px;
}
</style>