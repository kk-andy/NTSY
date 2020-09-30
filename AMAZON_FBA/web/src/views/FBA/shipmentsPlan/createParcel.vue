<template>
  <div>
    <div class="main">
      <div class="header">
        <div class="header1">
          <h2>创建货件</h2>
        </div>
        <div class="header2">
          <div>
            <span style="marginLeft:10px">店铺：</span>
            <span>{{shopName}}</span>
          </div>
          <div>
            <span style="color:red">*</span>
            <span>标签类型：</span>
            <span>
              <el-select
                style="width:150px"
                @change="selSortChange"
                v-model="submitValue.label_prep_type"
                slot="prepend"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item,key) in tagAll"
                  :key="key"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </span>
          </div>
          <div>
            <div>
              <span style="color:red">*</span>
              <span>货件名称：</span>
              <span>
                <el-input placeholder="请输入" v-model="submitValue.shipment_name" :maxlength="20" />
              </span>
            </div>
          </div>
        </div>
        <div class="header3">
          <span style="color:red">*</span>
          <span>包装类型：</span>
          <span>
            <el-radio v-model="submitValue.are_cases_required" label="0">混装商品</el-radio>
            <el-radio v-model="submitValue.are_cases_required" label="1">原厂包装商品</el-radio>
          </span>
        </div>
        <div class="header4">
          <span style="color:red">*</span>
          <span>发货地址：</span>
          <el-input
            placeholder="姓名"
            style="width:120px"
            :maxlength="50"
            v-model="address.name"
            :disabled="isEdit"
          />
          <el-input
            placeholder="电话"
            style="width:150px"
            v-model="address.phone"
            :disabled="isEdit"
            :maxlength="11"
            oninput="value=value.replace(/[^\d]/g,'')"
          />
          <el-input
            placeholder="邮编"
            style="width:100px"
            v-model="address.postal_code"
            :disabled="isEdit"
            :maxlength="6"
            oninput="value=value.replace(/[^\d]/g,'')"
          />
          <el-input placeholder="China(中国，内地)" style="width:150px" disabled />
          <el-input
            placeholder="城市"
            style="width:160px"
            v-model="address.city"
            :disabled="isEdit"
            :maxlength="50"
          />
          <el-input
            placeholder="详细地址"
            type="textarea"
            :rows="1"
            style="width:200px"
            v-model="address.address_line1"
            :disabled="isEdit"
            :maxlength="50"
          />
          <div style="fontSize:20px;float:right;marginRight:30px">
            <span
              class="el-icon-edit"
              @click="editAddress"
              :style="{display:isEdit?'block':'none',cursor:'pointer'}"
            />
            <span :style="{display:!isEdit?'block':'none'}">
              <el-button type="primary" @click="saveAddress">完成</el-button>
            </span>
          </div>
        </div>
        <div class="header5">
          <p style="marginLeft:9px">货件商品</p>
          <div v-if="submitValue.are_cases_required == 0" class="boxTotal">
            <span style="color:red">*</span>
            <span>总箱数：</span>
            <div class="boxInput">
              <el-input
                v-model="submitValue.boxes_total"
                oninput="value=value.replace(/[^\d]/g,'')"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="table">
        <CreateParcelTable
          v-if="hasTable"
          :tableData="tableData.items"
          :packingType="submitValue.are_cases_required"
          :isDeclare="isDeclare"
          @sendToCreateParecel="sendToCreateParecel"
        />
      </div>

      <div class="btn">
        <el-button @click="close" plain>关闭</el-button>
        <el-button @click="declare" type="primary">申报</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { loading, loadingClose } from "@/utils/common";
import { reqCreateShipmentsPlan, reqDetectionName } from "@/api/FBA";
import CreateParcelTable from "@/views/FBA/shipmentsPlan/components/CreateParcelTable";
export default {
  data() {
    return {
      tagAll: [
        {
          label: "卖家自己贴标签",
          value: "SELLER_LABEL",
        },
        {
          label: "亚马逊贴标签",
          value: "AMAZON_LABEL_ONLY",
        },
      ],
      isDeclare: 1, //申报按钮
      hasTable: false,
      shopName: "",
      isEdit: true, //编辑禁用
      submitValue: {
        shipment_id: "",
        shop_id: "",
        site: "",
        shipment_name: "", //货件名称
        are_cases_required: "0", //包装类型 0混装  1原厂包装
        label_prep_type: "SELLER_LABEL", //标签类型，
        boxes_total: "", //总箱数
        items: [],
      },
      address: {
        name: "",
        phone: "",
        address_line1: "", //街道地址1
        // address_line2: "", //街道地址2
        city: "",
        // district: "", //区
        // province: "", //省，州
        country_code: "CN",
        postal_code: "", //邮编
      },
    };
  },
  computed: {
    ...mapState({
      //数据
      tableData: (state) => state.FBAshipmentsPlan.shipmentsDetailTableData,
    }),
  },
  methods: {
    ...mapActions("FBAshipmentsPlan", [
      //获取tabledata
      "getShipmentsDetail",
    ]),
    //获取主要数据
    getData(arg) {
      loading();
      this.getShipmentsDetail(arg).then(() => {
        this.shopName = this.tableData.shop_name;
        this.submitValue.shipment_id = this.tableData.id;
        this.submitValue.shop_id = this.tableData.shop_id;
        this.submitValue.site = this.tableData.site;

        if (this.tableData.address) {
          this.address.name = this.tableData.address.name;
          this.address.address_line1 = this.tableData.address.address_line1;
          this.address.city = this.tableData.address.city;
          this.address.phone = this.tableData.address.phone;
          this.address.country_code = this.tableData.address.country_code;
          this.address.postal_code = this.tableData.address.postal_code;
        }

        this.hasTable = true;
        loadingClose();
      });
    },
    //关闭
    close() {
      this.$router.push({ name: "shipmentsPlan" });
    },
    //申报
    declare() {
      //发货地址完整性验证
      for (let key in this.address) {
        if (this.address[key] == "") {
          this.$message.warning("请完善发货地址");

          return false;
        }
      }
      if (!this.submitValue.shipment_name) {
        this.$message.warning("请填写货件名称");
        return false;
      }
      this.submitValue.address = this.address;
      //货件名称重复性验证
      reqDetectionName({ inbound_name: this.submitValue.shipment_name }).then(
        (data) => {
          if (data.code == 0) {
            this.isDeclare++; //点击申报按钮 发送给子组件
          }
        }
      );
    },
    //申报末段
    sendToCreateParecel(arg) {
      //混装总箱数验证
      if (this.submitValue.are_cases_required == 0) {
        if (!this.submitValue.boxes_total) {
          this.$message.warning("请填写总箱数");
          return false;
        } else if (this.submitValue.boxes_total > 500) {
          this.$message.error("总箱数不能超过500");
          this.submitValue.boxes_total = 500;
          return false;
        } else {
          let total = 0;
          arg.forEach((item) => {
            total += item.plan_num * 1;
          });
          if (this.submitValue.boxes_total > total) {
            this.$message.error("总箱数不可大于申报总量" + total);
            this.submitValue.boxes_total = total;
            return false;
          }
        }
      }

      loading();
      this.submitValue.items = arg;
      reqCreateShipmentsPlan(this.submitValue).then((data) => {
        if (data.code == 0) {
          loadingClose();
          this.$message.success("添加成功");
          this.$router.push({ name: "shipmentsPlan" });
        } else {
          loadingClose();
        }
      });
    },
    //标签选择
    selSortChange() {},
    //发货地址编辑
    editAddress() {
      this.isEdit = false;
    },

    //保存地址
    saveAddress() {
      this.isEdit = true;
    },
  },
  components: {
    CreateParcelTable,
  },
  mounted() {
    //验证shipmentsid
    if (!this.$route.query.id) {
      this.$message.warning("请重新进行选择");
      this.$router.push({ name: "shipmentsPlan" });
    } else {
      this.getData(this.$route.query.id);
    }
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
    margin-bottom: 10px;
  }
  .header2 {
    margin-bottom: 20px;
    div {
      display: inline-block;
      margin-right: 30px;
    }
    div:nth-child(3) {
      div {
        display: flex;
        align-items: center;
      }
    }
  }
  .header3 {
    margin-bottom: 20px;
  }
  .header4 {
    div {
      display: inline-block;
      margin-right: 30px;
    }
  }
  .header5 {
    display: flex;
    justify-content: space-between;
    .boxTotal {
      display: inline-block;
      .boxInput {
        display: inline-block;
      }
    }
  }
}
.table {
  margin-bottom: 20px;
}
.btn {
  display: flex;
  justify-content: flex-end;
  padding-right: 30px;
}
</style>