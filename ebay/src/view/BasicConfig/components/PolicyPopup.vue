<template>
  <div class="policy-popup">
    <el-dialog
      :title="recordCurrent.title"
      :visible.sync="showModule"
      @close="handleClose(false)"
      width="70%"
      :close-on-click-modal="false"
      top="5%"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-row :gutter="24">
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <el-form-item label="模板名称：" prop="name" :label-width="formLabelWidth">
                <el-input placeholder="请输入模板名称" v-model.trim="form.name"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <!-- <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="店铺：" prop="store" :label-width="formLabelWidth">
                <el-select v-model="form.store" filterable placeholder="请选择店铺">
                  <el-option
                    v-for="item in storeNameData"
                    :key="item.shop_id"
                    :label="item.shop_name"
                    :value="item.shop_id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>-->
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="站点：" prop="site" :label-width="formLabelWidth">
                <el-select
                  v-model="form.site"
                  filterable
                  placeholder="请选择站点"
                  value-key="site_id"
                  @change="siteChange"
                >
                  <el-option
                    v-for="item in siteAreaData"
                    :key="item.site_id"
                    :label="item.site"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>

      <div class="policy-popup-tabs">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="付款信息" name="first">
            <PaymentInfo ref="payment" :payment_instructions="payment_instructions"></PaymentInfo>
          </el-tab-pane>
          <el-tab-pane label="退款政策" name="second">
            <RefundPolicy
              ref="refund"
              :domesticReturnsData="domesticReturnsData"
              :domesticUndertakerData="domesticUndertakerData"
              :refundForm="refundForm"
            ></RefundPolicy>
          </el-tab-pane>
          <el-tab-pane label="运输政策" name="third">
            <TransportationPolicy
              ref="transportation"
              :availableLocation="availableLocation"
              :unavailableLocation="unavailableLocation"
              :domesticShipping="domesticShipping"
              :foreignShipping="foreignShipping"
              :transportForm="transportForm"
              :countriesList="countriesList"
            ></TransportationPolicy>
          </el-tab-pane>
          <el-tab-pane label="其他" name="fourth">
            <Other ref="otherPolicy" :saleTaxData="saleTaxData" :otherForm="otherForm"></Other>
          </el-tab-pane>
        </el-tabs>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose(false)">取 消</el-button>
        <el-button type="primary" @click="handleClose(true)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PaymentInfo from "./tabs/PaymentInfo.vue"; //付款信息
import RefundPolicy from "./tabs/RefundPolicy.vue"; //退款政策
import TransportationPolicy from "./tabs/TransportationPolicy.vue"; //运输政策
import Other from "./tabs/PolicyTemplateOther.vue"; //其他

export default {
  name: "PolicyPopup",
  components: {
    PaymentInfo,
    RefundPolicy,
    TransportationPolicy,
    Other
  },
  props: {
    showPolicyPopup: {
      type: Boolean,
      default: false
    },
    recordCurrent: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  data() {
    return {
      showModule: this.showPolicyPopup,
      form: {
        name: "", //模板名称
        // store: "", //店铺
        site: "" //站点
      },
      payment_instructions: "", //付款信息
      refundForm: {}, // 退款政策
      transportForm: {}, //运输政策
      otherForm: {}, //其他政策
      availableLocation: [],
      unavailableLocation: {},
      domesticShipping: [],
      foreignShipping: [],
      // storeNameData: [],
      countriesList: [],
      siteAreaData: [],
      saleTaxData: [], //销售税
      domesticReturnsData: [], // 国内退货天数
      domesticUndertakerData: [], //国内退货运费承担方
      rules: {
        name: [
          { required: true, message: "请输入模板名称", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur"
          }
        ],
        // store: [{ required: true, message: "请选择店铺", trigger: "blur" }],
        site: [{ required: true, message: "请选择站点", trigger: "blur" }]
      },
      activeName: "first",
      formLabelWidth: "100px"
    };
  },

  created() {
    this.getshopsitecurrency();
  },
  mounted() {},
  watch: {},
  methods: {
    siteChange(item) {
      this.getPolicy(item.site_id);
      this.getShippingType(item.site_id);
      this.getAvailableLocation(item.site_id);
      this.getTransportNoLocation(item.site_id);
      this.getOtherLocation(item.site_id);
      this.getCountries(item.site_id);
    },
    getshopsitecurrency() {
      this.$axios.get(`/listing/prepublish/shopsitecurrency`).then(res => {
        // this.storeNameData = res.data.shops;
        this.siteAreaData = res.data.sites;
        // this.getDomesticShippingType(this.form.site);
        // this.getForeignShippingType(this.form.site);
        this.form.site = res.data.sites[0];
        this.siteChange(this.form.site);

        if (
          this.recordCurrent.title == "编辑模板" ||
          this.recordCurrent.title == "复制模板"
        ) {
          let params = {
            tmp_id: this.recordCurrent.tmp_id
          };
          this.$axios
            .get(`/listing/config/policy/detail`, { params })
            .then(res => {
              // 模板字段
              if (this.recordCurrent.title == "编辑模板") {
                this.form.name = res.data.tmp_name;
                this.siteAreaData.forEach(site => {
                  if (site.site == res.data.site) {
                    this.form.site = site;
                    this.siteChange(this.form.site);
                  }
                });
              }
              // 付款信息字段
              this.payment_instructions = res.data.payment_instructions;

              // 退款政策
              this.refundForm = {
                domestic: res.data.returns_accepted, //是否接受国内退款
                foreign: res.data.internation_returns_accepted, //是否接受国外退款
                domesticDays: res.data.returns_with_in, //国内退货天数
                domesticUndertaker: res.data.shipping_cost_paid_by, // 国内运费承担方
                foreignDays: res.data.internation_returns_with_in, //国外退货天数
                foreignUndertaker: res.data.internation_shipping_cost_paid_by, // 国外运费承担方
                textarea: res.data.return_description
              };
              // 运输政策  =>运输方式框的值
              this.domesticShipping.forEach(domestic => {
                res.data.domestic_shipping.forEach(item => {
                  if (item.shipping_type == domestic.value) {
                    item.shipping_type = domestic.value;
                  }
                  if (item.free_shipping) {
                    item.free_shipping = true;
                  }
                });
              });
              // 运输政策  =>运输方式
              res.data.internation_shipping.forEach(internation => {
                this.$set(
                  internation,
                  "countryAll",
                  internation.shipping_location
                );
                this.$set(
                  internation,
                  "shipping_location",
                  _g.getJsonParse(this.availableLocation)
                );
                internation.shipping_location.forEach(item => {
                  internation.countryAll.forEach(country => {
                    if (item.value == country) {
                      item.select = true;
                      if (item.name === "Worldwide") {
                        this.$set(internation, "global", true);
                        item.select = false;
                      }
                    }
                  });
                });
              });
              this.transportForm = {
                processingTime: res.data.dispatch_time_max, //运输时间
                itemLocation: res.data.location, //物品所在地（必填）
                countryArea: res.data.country, //国家/区域
                postcode: res.data.postal_code, //邮编
                internalGroup: res.data.domestic_shipping, //国内运输
                internationalGroup: res.data.internation_shipping, // 国际运输
                noTransportation: res.data.ddl_exclusion_list_type, //不运送地区选框
                unavailableShippingLocation:
                  res.data.unavailable_shipping_location ////不运送地区
              };
              // 其他
              this.otherForm = {
                radio: res.data.disable_buyer_requirements, // 是否允许买家购买我的商品
                outOfRange: res.data.ship_to_registration_country, // 限制区域购买
                abandoned: res.data.max_unpaid_count_checkbox, //限制有弃标记录的用户购买
                discardBid: res.data.max_unpaid_count, //弃标个案
                discardDays: res.data.max_unpaid_period, //弃标天数
                violation: res.data.max_violations_count_checkbox, //违反政策检举复选框
                policyViolation: res.data.max_violations_count, //违反政策检举
                policyViolationDays: res.data.max_violations_period, //违反政策检举天数

                creditRating: res.data.min_feedback_score_checkbox, // 信誉等级复选框
                creditRatingNum: res.data.min_feedback_score, // 信誉等级选择
                selfSetting: res.data.require_item_count_checkbox, //10天内的自我设定复选框状态
                selfSettingNum: res.data.require_item_count, //10天内的自我设定数量
                restrictBuyerCredit: res.data.require_feedback_score_checkbox, // 限制买家信誉等级复选框
                restrictBuyerCreditNum: res.data.require_feedback_score, //限制买家信誉等级选择框

                saleTax: res.data.sales_tax_state, //销售税选择器
                percentage: res.data.sales_tax_percent, //销售税的百分比
                saleTaxRadio: res.data.shipping_included_in_tax, // 销售税单选框
                imageAd: res.data.gallery_type // 图片广告
                // boldTitle: res.data., //标题加粗
                // internationalSiteExposure:res.data. //国际站点曝光
              };
              // console.log(this.otherForm);
            });
        }
      });
    },
    // 其他政策 - 销售税下拉列表
    getOtherLocation(id) {
      this.$refs.otherPolicy.form.saleTax = "";
      let params = {
        site_id: id
      };
      this.$axios.get(`/listing/info/tax/location`, { params }).then(res => {
        this.saleTaxData = res.data;
      });
    },
    //  运输政策 -- 获取国家/区域
    getCountries(id) {
      let params = {
        site_id: id
      };
      this.$axios
        .get(`/listing/info/shipping/countries`, { params })
        .then(res => {
          this.countriesList = res.data;
        });
    },
    // 退款政策 - 国内、国际运输的 退货天数/运费承担方 下拉框取值相同
    getPolicy(id) {
      let params = {
        site_id: id
      };
      this.$axios.get(`/listing/info/refund/policy`, { params }).then(res => {
        this.domesticReturnsData = res.data.return_within;
        this.domesticUndertakerData = res.data.shipping_cost_paid_by;
      });
    },

    //  运输政策 - 国内/国际运输方式
    getShippingType(id) {
      let params = {
        site_id: id
      };
      this.$axios.get(`/listing/info/shipping/type`, { params }).then(res => {
        this.domesticShipping = res.data.domestic;
        this.foreignShipping = res.data.international;
      });
    },

    // 运输政策 - 可运送国家
    getAvailableLocation(id) {
      let params = {
        site_id: id
      };
      this.$axios
        .get(`/listing/info/shipping/available/location`, { params })
        .then(res => {
          res.data.forEach(country => {
            this.$set(country, "select", false);
          });
          this.availableLocation = res.data;
        });
    },
    // 运输政策 - 不可运送国家
    getTransportNoLocation(id) {
      let params = {
        site_id: id
      };
      this.$axios
        .get(`/listing/info/shipping/unavailable/location`, { params })
        .then(res => {
          for (const key in res.data) {
            if (res.data.hasOwnProperty(key)) {
              const item = res.data[key];
              if (item instanceof Array) {
                item.forEach(country => {
                  this.$set(country, "select", false);
                });
              } else {
                for (const key in item) {
                  if (item.hasOwnProperty(key)) {
                    const region = item[key];
                    region.forEach(country => {
                      this.$set(country, "select", false);
                    });
                  }
                }
              }
            }
          }
          this.unavailableLocation = res.data;
        });
    },
    handleClose(val) {
      if (!val) {
        this.$emit("on-open-sesion", false);
        return;
      }
      let {
        itemLocation,
        countryArea,
        noTransportation
      } = this.$refs.transportation.form;
      if (!itemLocation || !countryArea) {
        this.$message({
          type: "warning",
          message: "请填选所有必填选项!"
        });
      }
      this.$refs.form.validate(formVal => {
        this.$refs.transportation.$refs.form.validate(traVal => {
          this.$refs.otherPolicy.$refs.form.validate(otherVal => {
            this.$refs.refund.$refs.form.validate(refundVal => {
              if (formVal && traVal && otherVal && refundVal) {
                // if(this.$refs.transportation.$refs.itemLocation)

                if (
                  this.recordCurrent.title == "新增模板" ||
                  this.recordCurrent.title == "复制模板"
                ) {
                  this.$set(this.form, "code", 1);
                } else {
                  this.$set(this.form, "code", 0);
                }
                this.$set(this.form, "tmp_id", this.recordCurrent.tmp_id);
                this.$emit("on-open-sesion", this.form);
              } else {
                return false;
              }
            });
          });
        });
      });
    },
    handleClick(tab, event) {}
  }
};
</script>

<style scoped>
</style>