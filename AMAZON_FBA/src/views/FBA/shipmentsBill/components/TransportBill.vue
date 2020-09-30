<template>
  <div class="main">
    <div class="table">
      <div style="textAlign:center">
        <h1 v-if="mainData.is_sea == 0">空运发票</h1>
        <h1 v-else>海运发票</h1>
      </div>
      <table border="1" cellspacing="0" cellpadding="0" width="800px" style="margin:0 auto">
        <tbody>
          <tr>
            <td colspan="12">
              <p>Amazon Shipping List</p>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <span>SHIPMENT ID</span>
            </td>
            <td colspan="2">
              <p>AMAZON</p>
              <p>REFERENCE</p>
              <p>ID</p>
            </td>
            <td colspan="2">
              <p>件重尺</p>
              <p>CTNS/KGS/CBM</p>
            </td>
            <td colspan="2">
              <p>FBA仓库编码</p>
              <p>FBA warehouse No</p>
            </td>
            <td colspan="3">
              <p>FBA仓库地址</p>
              <p>FBA address</p>
            </td>
          </tr>
          <tr>
            <td colspan="3">{{this.mainData.shipment_id}}</td>
            <td colspan="2">{{this.mainData.amazon_referenceid}}</td>
            <td colspan="2">
              {{this.mainData.ctns}}/
              {{this.mainData.kgs}}/
              {{this.mainData.cbm}}
            </td>
            <td colspan="2">{{this.mainData.fba_warehouse_code}}</td>
            <td colspan="3">{{this.mainData.fba_warehouse_address}}</td>
          </tr>
          <tr>
            <td>
              <p>Description of goods</p>
            </td>
            <td>
              <p>Description of goods</p>
            </td>
            <td>
              <p>Quantity</p>
            </td>
            <td>
              <p>Unit Price</p>
            </td>
            <td>
              <p>Amount</p>
            </td>
            <td>
              <p>Pkgs</p>
            </td>
            <td>
              <p>GW</p>
            </td>
            <td>
              <p>NW</p>
            </td>
            <td>
              <p>Measurement (cm)</p>
            </td>
            <td>
              <p>Measurement (cm)</p>
            </td>
            <td>
              <p>Measurement (cm)</p>
            </td>
            <td>
              <p>SIZE</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>中文品名</p>
            </td>
            <td>
              <p>英文品名</p>
            </td>
            <td>
              <p>PCS</p>
            </td>
            <td>
              <P>USD</P>
            </td>
            <td>
              <p>USD</p>
            </td>
            <td>
              <P>CTNS</P>
            </td>
            <td>
              <P>KGS</P>
            </td>
            <td>
              <P>KGS</P>
            </td>
            <td>
              <P>long</P>
            </td>
            <td>
              <p>wide</p>
            </td>

            <td>
              <P>high</P>
            </td>
            <td>
              <p>CBM</p>
            </td>
          </tr>
          <tr v-for="(item,key) in mainData.sku_info" :key="key">
            <td>{{item.title}}</td>
            <td>{{item.title_en}}</td>
            <td>{{item.sku_num}}</td>
            <td>{{item.buy_price}}</td>
            <td>{{item.amount}}</td>
            <td>{{item.ctns}}</td>
            <td></td>
            <td></td>
            <td>{{item.long}}</td>
            <td>{{item.wide}}</td>
            <td>{{item.high}}</td>
            <td>{{item.SIZE}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { reqGetBillInfo } from "@/api/FBA";
export default {
  data() {
    return {
      mainData: {},
    };
  },
  mounted() {
    if (this.$route.query.id) {
      // loading();
      reqGetBillInfo({ id: this.$route.query.id }).then((data) => {
        if (data.code == 0) {
          this.mainData = data.data;
        } else {
          this.$message.error("发票信息获取失败");
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  .table {
    width: 80%;
    tr {
      td {
        width: 50px;
        height: 50px;
        text-align: center;
        p {
          margin: 0;
        }
        .narmal {
          text-align: center;
        }
      }
    }
  }
}
</style>