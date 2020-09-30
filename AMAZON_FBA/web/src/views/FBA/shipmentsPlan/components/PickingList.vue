<template>
  <div class="main">
    <div class="table">
      <table border="1" cellspacing="0" cellpadding="0" width="800px">
        <tbody>
          <tr>
            <td colspan="4">
              <p class="title">汇总拣货单</p>
            </td>
            <td style>
              <p class="title">日期</p>
            </td>

            <td colspan="2"></td>
          </tr>
          <tr>
            <td rowspan="2">
              <p class="title">FBAID</p>
            </td>
            <td></td>
            <td>
              <p class="title">目的国</p>
            </td>
            <td>{{tableData.site}}</td>
            <td>
              <p class="title">运输方式</p>
            </td>
            <td colspan="2">{{tableData.shipping_type}}</td>
          </tr>
          <tr>
            <!-- <td></td> -->
            <td>
              <div style="width:100%;">
                <!-- <JsBarcode v-if="hasCode" :content="[mainData.shipment_id]" /> -->
              </div>
            </td>
            <td>
              <p class="title">FBA中转仓</p>
              <p class="title">（发出仓）</p>
            </td>
            <td>{{tableData.transit_warehouse}}</td>
            <td>
              <p class="title">FBA仓库编码</p>
              <p class="title">入库仓</p>
            </td>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td>
              <p class="title">运营人员</p>
            </td>
            <td>{{tableData.creater_name}}</td>
            <td>
              <p class="title">制单人</p>
            </td>
            <td></td>
            <td>
              <p class="title">拣货人</p>
            </td>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td>
              <p class="title">下单时间</p>
            </td>
            <td></td>
            <td>
              <p class="title">制单时间</p>
            </td>
            <td></td>
            <td>
              <p class="title">拣货时间</p>
            </td>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td>
              <p class="title">打包人</p>
            </td>
            <td></td>
            <td>
              <p class="title">复核人</p>
            </td>
            <td></td>
            <td>
              <p class="title">计费重量</p>
            </td>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td>
              <p class="title">打包时间</p>
            </td>
            <td></td>
            <td>
              <p class="title">复核时间</p>
            </td>
            <td></td>
            <td>
              <p class="title">计费体积</p>
            </td>
            <td colspan="2"></td>
          </tr>
          <tr>
            <td>
              <p class="title">备注：</p>
            </td>
            <td colspan="6"></td>
          </tr>
          <tr>
            <td colspan="7">
              <p
                style="color:red;textAlign:left;fontWeight:bold;margin:3px"
              >1.所有发往亚马逊的货件，单箱限重23KG，单边不超过63.5cm---硬性要求</p>
              <p
                style="color:red;textAlign:left;fontWeight:bold;margin:3px"
              >2.超过15KG需要贴对应国家语言的超重标签，套箱贴MADE IN CHINA标签</p>
              <p style="color:red;textAlign:left;fontWeight:bold;margin:3px">3.接单员需要复核产品SKU个数及数量</p>
            </td>
          </tr>
          <tr>
            <td style="width:15%">
              <p class="title">拼箱编码</p>
            </td>
            <td style="width:20%">
              <p class="title">产品中文品名</p>
              <p class="title">（总的类别）</p>
            </td>
            <td style="width:15%">
              <p class="title">SKU</p>
            </td>
            <td style="width:15%">
              <p class="title">库位</p>
            </td>
            <td style="width:15%">
              <p class="title">FNSKU</p>
            </td>
            <td style="width:10%">
              <p class="title">产品属性</p>
            </td>
            <td style="width:10%">
              <p class="title">数量</p>
            </td>
          </tr>
          <tr v-for="(item,key) in tableData.sku_list" :key="key">
            <td>
              <el-input v-if="isEditCode" v-model="item.box_code" :disabled="!isEditCode" />
              <p v-else>{{item.box_code}}</p>
            </td>
            <td>{{item.title}}</td>
            <td>{{item.product_sku}}</td>
            <td>{{item.space_code}}</td>
            <td>{{item.fn_sku}}</td>
            <td>{{item.attr}}</td>
            <td>{{item.plan_num}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// import { reqGetBill } from "@/api/FBA";
import { loading, loadingClose, dateFormat } from "@/utils/common";
import { mapState, mapMutations, mapActions } from "vuex";
import { reqSaveBoxCode } from "@/api/FBA";
export default {
  data() {
    return {
      mainData: "",
      content: [],
      hasCode: false,
    };
  },
  computed: {
    ...mapState({
      //多选
      shipmentsPlanVal: (state) => state.FBAshipmentsPlan.shipmentsPlanVal,
    }),
  },
  props: {
    tableData: {
      type: Object,
    },
    isEditCode: {
      type: Boolean,
    },
  },
  watch: {
    isEditCode(newData, oldData) {
      if (!newData) {
        loading();
        reqSaveBoxCode(this.tableData)
          .then((data) => {
            loadingClose();
            if (data.code == 0) {
              this.$message.success("保存成功");
            }
          })
          .catch((err) => {
            loadingClose;
          });
      }
    },
  },
  mounted() {
    // if (this.$route.query.id) {
    //   // loading();
    //   reqGetPickingList({ id: this.$route.query.id }).then((data) => {
    //     if (data.code == 0) {
    //       this.mainData = data.data;
    //       this.hasCode = true;
    //       this.$emit("getShipmentId", data.data.shipment_id);
    //       // loadingClose();
    //     } else {
    //       // loadingClose();
    //       this.$message.error("拣货单获取失败");
    //     }
    //   });
    // }
  },
};
</script>
<style scoped media="print">
@page {
  /* size: portrait; */
}
</style>

<style lang="scss" scoped>
.main {
  width: 100%;
  .table {
    width: 80%;
    // margin: 0 auto;

    tr {
      td {
        width: 50px;
        height: 50px;
        text-align: center;
        .title {
          font-weight: bold;
          text-align: center;
        }
      }
    }
  }
}
</style>