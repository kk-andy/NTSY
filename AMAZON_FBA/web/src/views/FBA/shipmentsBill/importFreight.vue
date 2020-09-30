<template>
  <div style="padding: 15px">
    <div class="main">
      <div class="title">
        <h2>导入运费及跟踪号</h2>
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
            <el-form-item label="预计到货时间" prop="estimate_arrival_at">
              <el-date-picker
                style="width: 200px"
                v-model="importValue.estimate_arrival_at"
                type="date"
                placeholder="选择日期"
                @change="timeSet"
                :picker-options="pickerOptions0"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="运费分摊方式" prop="shipping_fee_assign">
              <el-select
                style="width: 200px"
                v-model="importValue.shipping_fee_assign"
                placeholder="选择类别"
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
            <el-form-item label="备注" prop="remark">
              <el-input
                style="width: 200px"
                placeholder="请输入备注内容"
                v-model="importValue.remark"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="物流承运商" prop="logistics_carrier">
              <el-select
                style="width: 200px"
                v-model="importValue.logistics_carrier"
                placeholder="选择类别"
                filterable
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
            <el-form-item label="物流单号" prop="tracking_id">
              <el-input
                style="width: 200px"
                placeholder="请输入内容"
                v-model="importValue.tracking_id"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="物流费用" prop="logistics_fee">
              <el-input
                style="width: 200px"
                placeholder="请输入内容"
                v-model="importValue.logistics_fee"
              />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="付款金额" prop="name"> </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="付款时间" prop="region"> </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="付款备注" prop="region"> </el-form-item>
          </el-col> -->
        </el-form>

        <!-- <div class="bill2">
          <div class="bill2-item">
            <p>预计到货时间：</p>
            <p>
              <el-date-picker
                style="width: 200px"
                v-model="importValue.estimate_arrival_at"
                type="date"
                placeholder="选择日期"
                @change="timeSet"
                :picker-options="pickerOptions0"
              ></el-date-picker>
            </p>
          </div>
          <div class="bill2-item">
            <p>
              <span style="color: red; marginright: 2px">*</span>
              运费分摊方式：
            </p>
            <p>
              <el-select
                style="width: 200px"
                v-model="importValue.shipping_fee_assign"
                slot="prepend"
                placeholder="选择类别"
              >
                <el-option
                  v-for="(item, key) in freightAll"
                  :key="key"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </p>
          </div>
          <div class="bill2-item">
            <p style="marginleft: 38px">备注：</p>
            <p>
              <el-input
                style="width: 200px"
                placeholder="请输入备注内容"
                v-model="importValue.remark"
              />
            </p>
          </div>
        </div>

        <div class="bill2">
          <div class="bill2-item">
            <p style="marginleft: 3px">
              <span style="color: red; marginright: 2px">*</span>
              物流承运商：
            </p>
            <p>
              <el-select
                style="width: 200px"
                v-model="importValue.logistics_carrier"
                slot="prepend"
                placeholder="选择类别"
                filterable
              >
                <el-option
                  v-for="(item, key) in LogisticsCarriers"
                  :key="key"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </p>
          </div>
          <div class="bill2-item">
            <p style="marginleft: 32px">
              <span style="color: red; marginright: 2px">*</span>物流单号：
            </p>
            <el-input
              style="width: 200px"
              placeholder="请输入内容"
              v-model="importValue.tracking_id"
            />
          </div>
          <div class="bill2-item">
            <p>
              <span style="color: red; marginright: 2px">*</span>
              物流费用：
            </p>
            <el-input
              style="width: 200px"
              placeholder="请输入内容"
              v-model="importValue.logistics_fee"
            />
          </div>
        </div>
        <div class="bill2">
          <div class="bill2-item">
            <p style="marginleft: 55px">税费：</p>
            <p>
              <el-input
                style="width: 200px"
                placeholder="请输入内容"
                v-model="importValue.taxes"
              />
            </p>
          </div>
        </div> -->
      </div>
      <ImportTable
        :tableData="importValue.sku_list"
        :logistics_fee="importValue.logistics_fee"
        :fee_avg_assign="importValue.shipping_fee_assign"
        :type="0"
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
        estimate_arrival_at: [],
        shipping_fee_assign: [{ required: true }],
        remark: [],
        logistics_carrier: [{ required: true }],
        tracking_id: [{ required: true, message: "请填写物流单号" }],
        logistics_fee: [{ required: true, message: "请填写物流费用" }],
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
      importValue: {
        invoice_id: "", //
        tracking_id: "", //物流单号
        logistics_fee: "", //运费
        logistics_carrier: "", //物流承运商
        shipping_fee_assign: "", //物流分摊方式
        estimate_arrival_at: "", //预计到货时间
        remark: "", //备注
        taxes: "", // 税费
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
      this.importValue.estimate_arrival_at = dateFormat(val).split(" ")[0];
    },
    changeSaveDisabled(arg) {
      this.saveDisabled = arg;
    },

    //确定
    submit() {
      // let priceReg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
      // if (this.importValue.taxes) {
      //   if (!priceReg.test(this.importValue.taxes)) {
      //     this.$message.warning("税费只能是两位数以内的小数或整数");
      //     return;
      //   }
      // }
      //先验证必填
      if (!this.importValue.logistics_carrier) {
        this.$message.error("请选择物流承运商");
      } else if (!this.importValue.shipping_fee_assign) {
        this.$message.error("请选择运费分摊方式");
      } else if (!this.importValue.tracking_id) {
        this.$message.error("请输入物流单号");
      } else if (
        !this.importValue.logistics_fee ||
        this.importValue.logistics_fee == 0
      ) {
        this.$message.error("请输入不为0的物流费用");
      } else {
        //税费和头程缺失检测
        let taxesMiss = false;
        let firstCostMiss = false;
        this.importValue.sku_list.forEach((item) => {
          if (!item.taxes) {
            taxesMiss = true;
          }
          if (!item.first_leg_fee) {
            firstCostMiss = true;
          }
        });
        if (taxesMiss) {
          this.$message.error("请填写完整商品税费");
          return false;
        }
        if (firstCostMiss) {
          this.$message.error(
            "存在头程费用缺失的情况，请重新录入与之相对应的税费来重新获取头程费用"
          );
          return false;
        }

        loading();
        reqUpdateTransport({
          ...this.importValue,
          import_pay_info: 0,
          invoice_id: this.$route.query.id,
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