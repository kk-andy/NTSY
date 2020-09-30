<template>
  <div>
    <div class="main" id="form1">
      <div class="header">
        <div class="header1">
          <h2>发货计划详情</h2>
        </div>
        <div class="header2">
          <div>
            <span>计划单号：</span>
            <span>{{tableData.shipment_code}}</span>
          </div>
          <div>
            <span>创建者：</span>
            <span>{{tableData.creater_name}}</span>
          </div>
        </div>
        <div class="header3">
          <div>
            <span>虚拟仓：</span>
            <span style="fontWeight:bold">{{tableData.warehouse_name}}</span>
          </div>
          <div>
            <span>店铺：</span>
            <span style="fontWeight:bold">{{tableData.shop_name}}</span>
          </div>
          <div>
            <span>运输方式：</span>
            <span style="fontWeight:bold">{{tableData.shipping_type}}</span>
          </div>
          <div>
            <span>创建时间：</span>
            <span style="fontWeight:bold">{{tableData.created_time}}</span>
          </div>
          <div>
            <span>备注：</span>
            <span style="fontWeight:bold">{{tableData.remark}}</span>
            <!-- <el-input v-model="remark" style="width:80%" placeholder="请输入备注内容" /> -->
          </div>
        </div>
        <div class="header4">
          <span>商品明细</span>
          <!-- <span style="color:#0CAAF0;fontWeight:bold">+ 添加商品</span>
          <span style="color:#0CAAF0;fontWeight:bold">+ EXCEL导入</span>-->
        </div>
      </div>
      <div class="table">
        <ShipmentsPlanDetailTable :tableData="tableData.items" />
      </div>
      <div class="btn">
        <div>
          <el-button @click="close" plain>关闭</el-button>
          <el-popover v-if="showButtons.deletePlan" placement="top" width="160" v-model="isDelete">
            <p>确定要删除此条发货计划吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="isDelete = false">取消</el-button>
              <el-button type="primary" size="mini" @click="deletePlan">确定</el-button>
            </div>
            <el-button slot="reference">删除</el-button>
          </el-popover>
          <!-- <el-button @click="deletePlan" plain>删除</el-button> -->
          <!-- <el-button @click="print" plain>打印计划单</el-button> -->
          <!-- <el-button @click="printBrandLabel" plain>打印商品标签</el-button> -->
        </div>
        <div>
          <el-button v-if="showButtons.createData" @click="createShipments" plain>创建货件</el-button>
          <el-button v-if="showButtons.editPlan" @click="edit" type="primary">编辑</el-button>
        </div>
      </div>
    </div>
    <div class="pagination"></div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import ShipmentsPlanDetailTable from "@/views/FBA/shipmentsPlan/components/ShipmentsPlanDetailTable";
import { loading, loadingClose } from "@/utils/common";
import { deleteShipmentsPlan } from "@/api/FBA";
// import { getLodop } from "@/components/Lodop/LodopFuncs";
export default {
  data() {
    return {
      remark: "", //备注
      selVirtual: "", //虚拟仓选择的值
      isDelete: false, //删除弹出框
    };
  },
  computed: {
    ...mapState({
      //批量选择
      shipment_id: (state) => state.FBAshipmentsPlan.shipmentsPlanVal,
      //数据
      tableData: (state) => state.FBAshipmentsPlan.shipmentsDetailTableData,
      showButtons: (state) => state.FBAshipmentsPlan.showButtons,
    }),
  },
  methods: {
    ...mapMutations("FBAshipmentsPlan", ["changeEditType"]),
    ...mapActions("FBAshipmentsPlan", [
      //获取tabledata
      "getShipmentsDetail",
    ]),
    //创建货件
    createShipments() {
      this.$router.push({
        name: "createParcel",
        query: { id: this.shipment_id },
      });
    },
    //编辑
    edit() {
      this.changeEditType(1);
      this.$router.push({ name: "EditShipmentsPlan" });
    },
    close() {
      this.$router.push({ name: "shipmentsPlan" });
    },
    //打印商品标签
    // printBrandLabel() {
    //   this.$router.push({ name: "PrintBrandLabel" });
    // },
    //删除发货计划
    deletePlan() {
      this.isDelete = false;
      deleteShipmentsPlan({
        shipment_id: this.shipment_id,
      }).then((data) => {
        if (data.code == 0) {
          this.$message.success("删除成功");
          this.$router.push({ name: "shipmentsPlan" });
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    // print() {
    //   this.printPreview(1);
    // },
    // //获取页面信息
    // getDetail() {},
    //-----
    // CreateOneFormPage() {
    //   LODOP = getLodop();
    //   //样式
    //   var olstyle1 =
    //     "<style>" + document.getElementById("olstyle1") + "</style>";
    //   var body =
    //     olstyle1 +
    //     "<body>" +
    //     document.getElementById("form1").innerHTML +
    //     "</body>";
    //   LODOP.PRINT_INIT("订单"); //打印初始化
    //   LODOP.SET_PRINT_STYLE("FontSize", 18); //设置对象风格
    //   LODOP.SET_PRINT_STYLE("Bold", 1); //设置对象风格
    //   LODOP.SET_PRINTER_INDEX("ZDesigner GK888t");
    //   LODOP.ADD_PRINT_TEXT(50, 521, 130, 39, this.description); //增加纯文本项
    //   LODOP.SET_PRINT_PAGESIZE(0, 100, 30, ""); //设定纸张大小
    //   LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", "55%"); //设置缩放
    //   LODOP.SET_PREVIEW_WINDOW(2, 2, 0, 0, 0, ""); //设置窗口
    //   // 打印二维码
    //   // LODOP.ADD_PRINT_BARCODE(23,23,233,233,"QRCode","https://blog.csdn.net/qq_43652509");
    //   //打印网址
    //   // LODOP.ADD_PRINT_URL(222,2000,2000,233,"https://blog.csdn.net/qq_43652509");
    //   //打印图片
    //   // LODOP.ADD_PRINT_IMAGE(100,100,400,400,"<img border='0' src='http://s1.sinaimg.cn/middle/4fe4ba17hb5afe2caa990&690' width='345' height='250'>");
    //   LODOP.ADD_PRINT_HTML(88, 20, 100, 30, body); //增加超文本项
    // },
    // printPreview(s) {
    //   this.CreateOneFormPage();
    //   if (s == 0) {
    //     LODOP.PRINT(); //直接打印
    //   }
    //   if (s == 1) {
    //     LODOP.PREVIEW(); //打印预览
    //   }
    //   if (s == 2) {
    //     LODOP.PRINT_SETUP(); //打印维护
    //   }
    //   if (s == 3) {
    //     LODOP.PRINT_DESIGN(); //打印设计
    //   }
    // },
  },
  components: {
    ShipmentsPlanDetailTable,
  },
  mounted() {
    //初始id验证
    if (!this.shipment_id) {
      this.$message.warning("请先进行选择");
      this.$router.push({ name: "shipmentsPlan" });
    } else {
      loading();
      this.getShipmentsDetail(this.shipment_id).then(() => {
        loadingClose();
      });
    }
    //
    let id = this.$getMenuId(
      sessionStorage.getItem("munuIdList"),
      "/FBA/shipmentsPlan"
    );
    this.$store.dispatch("FBAshipmentsPlan/getButtonList", { id });
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
  }
  .header2 {
    width: 100%;
    height: 60px;
    line-height: 60px;
    div {
      display: inline-block;
      // span:nth-child(1) {
      //   margin-right: 20px;
      // }
      span:nth-child(2) {
        font-weight: bold;
      }
    }
    div:nth-child(1) {
      margin-right: 30px;
    }
  }
  .header3 {
    white-space: nowrap;
    margin-bottom: 50px;
    display: flex;
    justify-content: space-between;
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
  div {
    display: inline-block;
  }
  div:nth-child(2) {
    margin-left: 150px;
  }
}
</style>