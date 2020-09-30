<template>
  <div style="padding:15px">
    <div class="main">
      <div class="title">
        <h2>导入文件</h2>
      </div>
      <div class="func">
        <span @click="importFile" style="marginRight:30px">
          <el-upload
            class="upload-demo"
            :action="url"
            :limit="1"
            :on-exceed="handleExceed"
            :before-upload="handleBeforeUpload"
            :data="{shop_id:tableData.shop_id}"
            :on-success="importSuccess"
            :on-error="importError"
            :headers="{staffId:staffId,staffName:staffName}"
          >
            <el-button size="small" type="primary">导入文件</el-button>
          </el-upload>
        </span>
        <el-button @click="cancel" plain>取消</el-button>
      </div>
      <div class="download">
        <span @click="downloadTemplate">下载导入模板</span>
      </div>
      <div class="tips">
        <p style="fontWeight:bold">注意事项</p>
        <p>支持导入格式为xlsx的文件</p>
        <p>模板中的表头不可更改，不可删除</p>
        <p>数据记录不可超过5000条</p>
        <p>SKU不存在，无法导入；SKU重复，取第一条记录</p>
      </div>
    </div>
  </div>
</template>

<script>
import Page from "@/components/page";
import InsertFromUserTable from "@/views/FBA/shipmentsPlan/components/InsertFromUserTable";
import { mapState, mapMutations, mapActions } from "vuex";
import { downLoadSkuTemplate } from "@/api/FBA";
import { downlaod } from "@/utils/common";
import {
  getSesstionToken,
  getStaffIdSession,
  getStaffNameSession,
} from "@/utils/auth";
export default {
  data() {
    return {
      importData: [],
      url: `${process.env.VUE_APP_AMAZON_PHP}/api/fba/upload_products_excel`,
    };
  },
  computed: {
    ...mapState({
      //批量选择的id
      shipment_id: (state) => state.FBAshipmentsPlan.shipmentsPlanVal,
      //数据
      tableData: (state) => state.FBAshipmentsPlan.shipmentsDetailTableData,
      staffId: sessionStorage.StaffId,
      staffName: sessionStorage.StaffName,
    }),
  },
  methods: {
    ...mapActions("FBAshipmentsPlan", ["insertToShipmentsDetailTable"]),
    //取消
    cancel() {
      this.$router.push({ name: "EditShipmentsPlan" });
    },
    //导入文件
    importFile() {},
    //超出上传限制的钩子
    handleExceed() {
      this.$message.warning("每次只能导入一个文件呦");
    },
    //上传前验证
    handleBeforeUpload(file) {
      const typeList = ["xls", "xlsx"];
      const errMsg = "请上传excel文件";
      const fileName = file.name;
      const extension = fileName.substr(fileName.lastIndexOf(".") + 1);
      const isRT = typeList.includes(extension);
      if (!isRT) {
        this.$message.error(errMsg);
      }
      return isRT;
    },
    //导入成功钩子
    importSuccess(res) {
      if (res.code == 0) {
        if (res.data.success.length > 0) {
          let hasMessage = false; //是否弹窗已过滤
          let temporaryData = res.data.success;
          //过滤接口重复数据
          // for (let index = temporaryData1.length - 1; index >= 0; index--) {
          //   this.tableData.items.forEach((i, key) => {
          //     if (temporaryData1[index].sku_id == i.sku_id) {
          //       temporaryData1.splice(index, 1);
          //       hasMessage = true;
          //     }
          //   });
          // }

          //过滤之前页面重复数据

          // for (let index = temporaryData.length - 1; index >= 0; index--) {
          //   this.tableData.items.forEach((i, key) => {
          //     // console.log(temporaryData[index].sku_id, i.sku_id);
          //     // console.log(temporaryData, i);

          //     if (temporaryData.length > 0) {
          //       // console.log(temporaryData.length, index);
          //       console.log(temporaryData[index].sku_id, i.sku_id);
          //       if (temporaryData[index].sku_id == i.sku_id) {
          //         temporaryData.splice(index, 1);
          //         hasMessage = true;
          //         return;
          //       }
          //     }
          //   });
          // }

          for (let index = temporaryData.length - 1; index >= 0; index--) {
            // this.tableData.items.forEach((i, key) => {
            for (let i = 0; i < this.tableData.items.length; i++) {
              // console.log(temporaryData.length, index);
              if (temporaryData.length > 0) {
                if (
                  temporaryData[index].sku_id == this.tableData.items[i].sku_id
                ) {
                  temporaryData.splice(index, 1);
                  hasMessage = true;
                  break;
                }
              }
            }
          }

          //----
          this.insertToShipmentsDetailTable(temporaryData);
          if (hasMessage) {
            this.$message.warning("已为您过滤掉重复的数据");
          } else {
            this.$message.success("导入成功" + temporaryData.length + "条");
          }

          //----------------------------------------------------------------------
        } else {
          this.$message.error("导入失败" + res.data.failed.length + "条");
        }
        // this.insertToShipmentsDetailTable(res.data.success);
        this.$router.push({
          name: "EditShipmentsPlan",
        });
      } else {
        this.$message.warning(res.msg);
      }
    },
    //导入失败钩子
    importError(err) {
      this.$message.error("导入失败");
    },
    //下载导入模板
    downloadTemplate() {
      downLoadSkuTemplate().then((data) => {
        let url = `${process.env.VUE_APP_AMAZON_PHP}/public/template/ShipmentPlan.xlsx`;
        let a = document.createElement("a");
        a.style.display = "none";
        document.body.appendChild(a);
        a.href = url;
        a.setAttribute("download", "link"); // 指示浏览器下载url,而不是导航到它
        a.click();
        document.body.removeChild(a);
      });
    },
  },
  mounted() {
    //初始id验证
    // if (!this.shipment_id) {
    //   this.$message.warning("网络波动，请先进行选择");
    //   this.$router.push({ name: "shipmentsPlan" });
    // } else
    if (!this.tableData) {
      this.$message.warning("网络波动，请先进行选择");
      this.$router.push({ name: "shipmentsPlan" });
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
  .func {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
  }
  .download {
    color: #02aef1;
    font-size: 16px;
    cursor: pointer;
    margin-bottom: 20px;
  }
  .tips {
    width: 70%;
    margin-left: 10px;
    border: 1px solid #02aef1;
    border-radius: 5px;
    padding: 5px;
  }
}
</style>