<template>
  <div class="policy-template-other">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="买家要求：" :label-width="formLabelWidth">
        <div>
          <el-radio v-model="form.radio" label="0">允许所有买家购买我的商品</el-radio>
        </div>
        <div>
          <el-radio v-model="form.radio" label="1">不允许以下买家购买我的商品</el-radio>
          <ul v-if="form.radio == 1">
            <li>
              <el-checkbox v-model="form.outOfRange">主要运送地址在我的运送范围之外</el-checkbox>
              <span class="comment">
                <span class="focus">说明！</span> 国际运输中存在不运送国家时，需要勾选
              </span>
            </li>
            <li>
              <el-checkbox v-model="form.abandoned">
                曾收到
                <el-select size="mini" v-model="form.discardBid" style="width:70px;margin:0 5px;">
                  <el-option
                    v-for="item in discardBidData"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  ></el-option>
                </el-select>个弃标个案，在过去
                <el-select size="mini" v-model="form.discardDays" style="width:70px;margin:0 5px;">
                  <el-option
                    v-for="item in discardDaysData"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  ></el-option>
                </el-select>天
              </el-checkbox>
            </li>
            <li>
              <el-checkbox v-model="form.violation">
                曾收到
                <el-select
                  size="mini"
                  v-model="form.policyViolation"
                  style="width:70px;margin:0 5px;"
                >
                  <el-option
                    v-for="item in policyViolation"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  ></el-option>
                </el-select>个违反政策检举，在过去
                <el-select
                  size="mini"
                  v-model="form.policyViolationDays"
                  style="width:70px;margin:0 5px;"
                >
                  <el-option
                    v-for="item in policyViolationDays"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  ></el-option>
                </el-select>天
              </el-checkbox>
            </li>
            <li>
              <el-checkbox v-model="form.creditRating">
                信用指标等于或低于：
                <el-select
                  size="mini"
                  v-model="form.creditRatingNum"
                  style="width:70px;margin:0 5px;"
                >
                  <el-option
                    v-for="item in creditRatingNumData"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-checkbox>
            </li>
            <li>
              <el-checkbox v-model="form.selfSetting">
                在过去10天内内曾出价或购买我的物品，已达到我所设定的限制
                <el-select
                  size="mini"
                  v-model="form.selfSettingNum"
                  style="width:70px;margin:0 5px;"
                  placeholder
                >
                  <el-option
                    v-for="item in selfSettingNumData"
                    :key="item.id"
                    :label="item.value"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-checkbox>
              <div v-if="form.selfSetting" style="margin-left:20px">
                <el-checkbox v-model="form.restrictBuyerCredit">
                  这项限制只选用于买家信用指数等于或低于
                  <el-select
                    size="mini"
                    v-model="form.restrictBuyerCreditNum"
                    style="width:70px;margin:0 5px;"
                    placeholder
                  >
                    <el-option
                      v-for="item in restrictBuyerCreditNumData"
                      :key="item.id"
                      :label="item.value"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-checkbox>
              </div>
            </li>
          </ul>
        </div>
      </el-form-item>
      <el-row>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <el-form-item label="销售税：" label-width="80px" prop="saleTax">
              <el-select
                v-model="form.saleTax"
                filterable
                clearable
                placeholder="请选择销售税"
                size="mini"
              >
                <el-option
                  v-for="item in saleTaxData"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-form-item prop="percentage" label-width="10px" style="width:140px">
              <el-input size="mini" v-model.number.trim="form.percentage">
                <svg-icon slot="suffix" style="font-weight:700" icon-class="percentage" />
              </el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="5">
          <el-radio style="margin:12px 0" v-model="form.saleTaxRadio" :label="1">运费包括销售税</el-radio>
        </el-col>
      </el-row>
      <el-form-item label="图片广告：" prop="imageAd" :label-width="formLabelWidth">
        <el-select v-model="form.imageAd" filterable size="mini">
          <el-option
            v-for="item in imageAdData"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
        <svg-icon icon-class="USdollar" style="font-size:20px" />
      </el-form-item>
      <!-- <el-form-item label="广告特色：" prop="features" :label-width="formLabelWidth">
        <el-checkbox v-model="form.boldTitle">标题粗体</el-checkbox>
        <el-checkbox v-model="form.internationalSiteExposure">国际站点曝光</el-checkbox>
        <svg-icon icon-class="USdollar" style="font-size:20px" />
      </el-form-item>-->
    </el-form>
  </div>
</template>

<script>
export default {
  name: "PolicyTemplateOther",
  components: {},
  props: {
    saleTaxData: {
      type: Array
    },
    otherForm: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    let checkPercentage = (rule, value, callback) => {
      if (!_g.validationRule.pureNumbers(value)) {
        callback(new Error("请输入合法数字"));
      } else {
        callback();
      }
    };
    return {
      form: {
        radio: "0",
        outOfRange: false, // 范围之外的复选框
        abandoned: false, //弃标复选框
        violation: false, //违反政策检举复选框
        creditRating: false, // 信誉等级复选框
        selfSetting: false, //10天内的自我设定复选框
        restrictBuyerCredit: false, // 限制买家信誉等级复选框
        discardBid: null, //弃标个案
        discardDays: null, //弃标天数
        policyViolation: null, //违反政策检举
        policyViolationDays: null, //违反政策检举天数
        creditRatingNum: -1, // 信誉等级复选框
        selfSettingNum: "1", //10天内的自我设定复选框
        restrictBuyerCreditNum: 0, //限制买家信誉等级选择器
        saleTax: "", //销售税选择器
        percentage: "", //销售税的百分比
        saleTaxRadio: 0, // 销售税单选框
        imageAd: null // 图片广告
        // boldTitle: false, //标题加粗
        // internationalSiteExposure: false //国际站点曝光
      },

      discardBidData: [
        {
          id: 2,
          value: 2
        },
        {
          id: 3,
          value: 3
        },
        {
          id: 4,
          value: 4
        },
        {
          id: 5,
          value: 5
        }
      ],
      discardDaysData: [
        {
          id: "Days_30",
          value: 30
        },
        {
          id: "Days_180",
          value: 180
        },
        {
          id: "Days_360",
          value: 360
        }
      ],
      policyViolation: [
        {
          id: 4,
          value: 4
        },
        {
          id: 5,
          value: 5
        },
        {
          id: 6,
          value: 6
        },
        {
          id: 7,
          value: 7
        }
      ],
      policyViolationDays: [
        {
          id: "Days_30",
          value: 30
        },
        {
          id: "Days_180",
          value: 180
        }
      ],
      creditRatingNumData: [
        {
          id: -1,
          value: -1
        },
        {
          id: -2,
          value: -2
        },
        {
          id: -3,
          value: -3
        }
      ],
      selfSettingNumData: [
        {
          id: 1,
          value: 1
        },
        {
          id: 2,
          value: 2
        },
        {
          id: 3,
          value: 3
        },
        {
          id: 4,
          value: 4
        },
        {
          id: 5,
          value: 5
        },
        {
          id: 6,
          value: 6
        },
        {
          id: 7,
          value: 7
        },
        {
          id: 8,
          value: 8
        },
        {
          id: 9,
          value: 9
        },
        {
          id: 10,
          value: 10
        },
        {
          id: 25,
          value: 25
        },
        {
          id: 50,
          value: 50
        },
        {
          id: 75,
          value: 75
        },
        {
          id: 100,
          value: 100
        }
      ],
      restrictBuyerCreditNumData: [
        {
          id: 0,
          value: 0
        },
        {
          id: 1,
          value: 1
        },
        {
          id: 2,
          value: 2
        },
        {
          id: 3,
          value: 3
        },
        {
          id: 4,
          value: 4
        },
        {
          id: 5,
          value: 5
        }
      ],
      imageAdData: [
        {
          id: "None",
          value: "无"
        },
        {
          id: "Gallery",
          value: "小图"
        },
        {
          id: "Plus",
          value: "橱窗展示"
        }
      ],
      rules: {
        // percentage: [{ validator: checkPercentage, trigger: "blur" }]
      },
      formLabelWidth: "100px"
    };
  },
  watch: {
    otherForm(val) {
      if (val.radio) {
        val.radio = "1";
      } else {
        val.radio = "0";
      }
      if (val.outOfRange) {
        val.outOfRange = true;
      }
      if (val.abandoned) {
        val.abandoned = true;
      }
      if (val.creditRating) {
        val.creditRating = true;
      }
      if (val.selfSetting) {
        val.selfSetting = true;
      }
      if (val.violation) {
        val.violation = true;
      }
      if (val.restrictBuyerCredit) {
        val.restrictBuyerCredit = true;
      }
      if (val.saleTaxRadio) {
        val.saleTaxRadio = 1;
      }
      this.discardBidData.forEach(data => {
        if (val.discardBid == data.value) {
          val.discardBid = data.id;
        }
      });
      this.discardDaysData.forEach(day => {
        if (val.discardDays == day.value) {
          val.discardDays = day.id;
        }
      });
      this.policyViolation.forEach(data => {
        if (val.policyViolation == data.value) {
          val.policyViolation = data.id;
        }
      });
      this.policyViolationDays.forEach(day => {
        if (val.policyViolationDays == day.value) {
          val.policyViolationDays = day.id;
        }
      });
      this.creditRatingNumData.forEach(grade => {
        if (val.creditRatingNum == grade.value) {
          val.creditRatingNum = grade.id;
        }
      });
      this.selfSettingNumData.forEach(setUp => {
        if (val.selfSettingNum == setUp.value) {
          val.selfSettingNum = setUp.id;
        }
      });
      this.restrictBuyerCreditNumData.forEach(setUp => {
        if (val.restrictBuyerCreditNum == setUp.value) {
          val.restrictBuyerCreditNum = setUp.id;
        }
      });
      this.imageAdData.forEach(img => {
        if (val.imageAd == img.value) {
          val.imageAd = img.id;
        }
      });
      this.form = val;

      // console.log(val);
    }
  },
  created() {
    this.form.discardBid = this.discardBidData[0].id;
    this.form.discardDays = this.discardDaysData[0].id;
    this.form.policyViolation = this.policyViolation[0].id;
    this.form.policyViolationDays = this.policyViolationDays[0].id;
    this.form.imageAd = this.imageAdData[0].id;
  },
  methods: {}
};
</script>

<style scoped>
.comment {
  color: rgb(176, 176, 176);
}
.focus {
  color: #ffffff;
  background-color: rgb(64, 154, 154);
  padding: 0 3px;
  margin: 0 8px;
  text-align: center;
}
</style>