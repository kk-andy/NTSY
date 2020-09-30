<template>
  <div style="padding: 15px">
    <div class="main">
      <div class="title">
        <h2>导入付款金额及时间</h2>
      </div>
      <div class="bill">
        <div class="bill1">
          <div>
            <p>发货单号：</p>
            <p>{{ importValue.invoice_code }}</p>
          </div>
          <div>
            <p>shipmentID：</p>
            <p>{{ importValue.shipment_id }}</p>
          </div>
        </div>
        <el-form
          :model="importValue"
          :inline="true"
          :rules="rules"
          ref="mainForm"
          label-width="110px"
          class="demo-ruleForm"
          style="margin-top: 20px"
        >
          <el-col :span="8">
            <el-form-item label="预计到货时间">
              <el-date-picker
                style="width: 200px"
                v-model="importValue.estimate_arrival_at"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions0"
                disabled
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="运费分摊方式">
              <el-select
                style="width: 200px"
                v-model="importValue.shipping_fee_assign"
                placeholder="选择类别"
                disabled
              >
                <el-option
                  v-for="(item, key) in freightAll"
                  :key="key"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="备注">
              <el-input
                style="width: 200px"
                placeholder="请输入备注内容"
                v-model="importValue.remark"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="物流承运商">
              <el-select
                style="width: 200px"
                v-model="importValue.logistics_carrier"
                placeholder="选择类别"
                filterable
                disabled
              >
                <el-option
                  v-for="(item, key) in LogisticsCarriers"
                  :key="key"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="物流单号">
              <el-input
                style="width: 200px"
                placeholder="请输入内容"
                v-model="importValue.tracking_id"
                disabled
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="物流费用">
              <el-input
                style="width: 200px"
                placeholder="请输入内容"
                v-model="importValue.logistics_fee"
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="付款金额" prop="pay_amost">
              <el-input
                style="width: 200px"
                placeholder="请输入付款金额"
                v-model="importValue.pay_amost"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="付款时间" prop="pay_time">
              <el-date-picker
                style="width: 200px"
                v-model="importValue.pay_time"
                type="date"
                placeholder="选择付款时间"
                @change="timeSet"
                :picker-options="pickerOptions0"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="付款备注" prop="region">
              <el-input
                style="width: 200px"
                placeholder="请输入付款备注"
                v-model="importValue.pay_remark"
                type="textarea"
                :rows="1"
                @input="payRemarkInput"
              />
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <ImportTable
        :tableData="importValue.sku_list"
        :logistics_fee="importValue.logistics_fee"
        :fee_avg_assign="importValue.shipping_fee_assign"
        :type="1"
        @changeSaveDisabled="changeSaveDisabled"
      />
      <div class="func">
        <el-button @click="cancel" plain>取消</el-button>
        <el-button :disabled="saveDisabled" @click="submit" type="primary"
          >确定</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Page from "@/components/page";
import ImportTable from "@/views/FBA/shipmentsBill/components/importTable";
import { mapState, mapMutations, mapActions } from "vuex";
import { reqGetTransport, reqUpdateTransport } from "@/api/FBA";
import { loading, loadingClose, dateFormat } from "@/utils/common";
export default {
  data() {
    return {
      //时间限制
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
        },
      },
      rules: {
        pay_time: [{ required: true, message: "请选择付款时间" }],
        pay_amost: [
          {
            required: true,
            message: "请输入付款金额",
          },
        ],
      },
      freightAll: [
        {
          label: "按计费重",
          value: 1,
        },
        {
          label: "按体积重",
          value: 2,
        },
        {
          label: "按实际重",
          value: 3,
        },
      ],
      ids: "",
      //确定禁用标识
      saveDisabled: false,
      pay_time: "",
      importValue: {
        invoice_id: "", //
        tracking_id: "", //物流单号
        logistics_fee: "", //运费
        logistics_carrier: "", //物流承运商
        shipping_fee_assign: "", //物流分摊方式
        estimate_arrival_at: "", //预计到货时间
        remark: "", //备注
        taxes: "", // 税费
        pay_time: "",
      },
    };
  },
  computed: {
    //物流承运商
    ...mapState({
      LogisticsCarriers: (state) => state.FBA.carriers,
      tableSel: (state) => state.FBAshipmentsBill.tableSel,
    }),
  },
  methods: {
    ...mapMutations("FBAshipmentsBill", [
      "changeTableSel", //改变table选中项
    ]),
    ...mapActions("FBA", ["getCarries"]),
    //获取物流信息
    getTransport(arg) {
      loading();

      reqGetTransport(arg)
        .then((data) => {
          if (data.code == 0) {
            // console.log(data);
            loadingClose();
            this.importValue = data.data;
          } else {
            loadingClose();
          }
        })
        .catch((err) => {
          loadingClose();
        });
    },
    //改变时间
    timeSet(val) {
      //   console.log(this.importValue);
      this.importValue.pay_time = dateFormat(val).split(" ")[0];
    },
    changeSaveDisabled(arg) {
      this.saveDisabled = arg;
    },
    //付款备注
    payRemarkInput() {
      //付款备注300字限制
      if (this.importValue.pay_remark) {
        if (this.importValue.pay_remark.length > 300) {
          this.importValue.pay_remark = this.importValue.pay_remark.substring(
            0,
            300
          );
        }
      }
    },

    //确定
    submit() {
      let valid = this.$refs.mainForm.validate((valid) => {
        if (valid) {
          loading();
          reqUpdateTransport({
            ...this.importValue,
            invoice_id: this.$route.query.id,
            import_pay_info: 1,
          })
            .then((data) => {
              if (data.code == 0) {
                loadingClose();
                this.$message.success("导入成功");
                this.$router.push({ name: "shipmentsBill" });
              } else {
                loadingClose();
              }
            })
            .catch((err) => {
              loadingClose();
            });
        }
      });
    },
    //取消
    cancel() {
      this.$router.push({ name: "shipmentsBill" });
    },
  },
  components: {
    ImportTable,
  },
  mounted() {
    this.getCarries();

    if (!this.$route.query.id) {
      this.$message.warning("请重新选择");
      this.$router.push({ name: "shipmentsBill" });
    } else {
      this.getTransport({ id: this.$route.query.id });
    }
    //获取

    // if (this.tableSel.length <= 0) {
    //   this.$message.warning("数据缺失");
    //   this.$router.push({ name: "shipmentsBill" });
    // } else {
    //   this.getTransport({ id: this.tableSel[0].id });
    // }
  },
  beforeDestroy() {
    //初始化
    this.changeTableSel([]);
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
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
  .bill {
    widows: 100%;
    padding: 0 5px 0 5px;
    // margin-bottom: 20px;
    .bill1 {
      height: 50px;
      width: 100%;
      border-bottom: 1px solid #ebebeb;
      background: #fafafa;
      padding: 0 33px 0 33px;
      display: flex;
      justify-content: flex-start;
      div {
        display: flex;
        justify-content: flex-start;
        p:nth-child(1) {
          font-weight: bold;
        }
      }
      div:nth-child(1) {
        margin-right: 100px;
      }
    }
  }
}
</style>