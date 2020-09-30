<template>
  <div class="policy-template margin10">
    <el-card class="inventory-adjustment-rules-form">
      <el-form ref="form" :inline="true" :model="form" label-width="100px">
        <el-form-item label="模板名称：" prop="name">
          <el-input placeholder="请输入模板名称" v-model="form.name" clearable></el-input>
        </el-form-item>

        <el-form-item label="站点：" prop="site">
          <el-select v-model="form.site" filterable clearable placeholder="请选择站点">
            <el-option
              v-for="item in sites"
              :key="item.site_id"
              :label="item.site"
              :value="item.site"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="创建人：" prop="creator">
          <el-select v-model="form.creator" filterable clearable placeholder="请选择创建人">
            <el-option
              v-for="item in sellerlistData"
              :key="item.staff_id"
              :label="item.staff_name"
              :value="item.staff_id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="创建时间：" label-width="100px" prop="date">
          <el-date-picker
            v-model="form.date"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>

        <div class="search-reset-btn">
          <el-form-item>
            <el-button size="small" type="primary" @click="submitForm()">搜索</el-button>
            <el-button size="small" @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
    <div class="add-template-btn">
      <el-button size="small" type="primary" v-if="btnClass.new" @click="addTemplate">新增模板</el-button>
    </div>

    <div class="account-tab">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        ref="table"
        :height="tableHeight"
        :row-style="{height:'40px'}"
        :cell-style=" {padding:'0px'}"
        :default-sort="{prop: 'updatedTime', order: 'descending'}"
      >
        <el-table-column prop="tmp_name" label="模板名称" align="center"></el-table-column>
        <el-table-column prop="site" label="站点" align="center"></el-table-column>
        <el-table-column prop="create_user" label="创建人" align="center"></el-table-column>
        <el-table-column prop="created_at" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="update_user" label="修改人" align="center"></el-table-column>
        <el-table-column prop="updated_at" label="修改时间" align="center" sortable></el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="text" v-if="btnClass.edit" @click="editTemplate(scope.row)">编辑</el-button>
            <el-button
              type="text"
              v-if="btnClass.copy"
              style="color:#67C23A"
              @click="copyTemplate(scope.row)"
            >复制</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-bottom">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes=" [10, 20, 50, 100]"
        :current-page.sync="page.cureentPage"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
    </div>
    <PolicyPopup
      v-if="showPolicyPopup"
      :showPolicyPopup="showPolicyPopup"
      :recordCurrent="recordCurrent"
      @on-open-sesion="callbackPolicyPopup"
      ref="parent"
    ></PolicyPopup>
  </div>
</template>

<script>
import PolicyPopup from "./components/PolicyPopup.vue";

export default {
  name: "PolicyTemplate",
  components: {
    PolicyPopup
  },
  data() {
    return {
      showPolicyPopup: false,
      form: {
        name: "",
        store: "",
        creator: "",
        date: ""
      },
      storeNameData: [],
      sellerlistData: [],

      nameData: [],
      tableData: [],
      sites: [],
      page: {
        cureentPage: 1,
        size: 20,
        total: 0
      },
      tableHeight: null,
      // 暂存区
      recordCurrent: {},
      btnClass: {
        new: false,
        edit: false,
        copy: false
      }
    };
  },
  created() {
    let id = this.$getMenuId(
      sessionStorage.getItem("munuIdList"),
      this.$route.path
    );
    this.getList();
    this.getshopsitecurrency();
    this.getSellerlist();
    this.getControlBtn(id);
  },
  mounted() {
    this.tableHeight = _g.getAdaptiveHeight(
      this.tableHeight,
      this.$refs.table.$el,
      160
    );
  },
  methods: {
    getList() {
      if (this.form.date) {
        var createTimeStart = this.form.date[0];
        var createTimeEnd = this.form.date[1];
      }
      let params = {
        page: this.page.cureentPage,
        per_page_num: this.page.size,
        tmp_name: this.form.name,
        site: this.form.site,
        create_user: this.form.creator,
        start_time: createTimeStart,
        end_time: createTimeEnd
      };
      this.$axios.get(`/listing/config/policy/list`, { params }).then(res => {
        this.page.total = res.data.list.total;
        this.tableData = res.data.list.data;
        this.sites = res.data.select.sites;
        _g.scrollTop();
      });
    },
    // 获取下拉销售员
    getSellerlist() {
      this.$axios.get(`/listing/info/staff/sellerlist`).then(res => {
        this.sellerlistData = res.data;
      });
    },
    getshopsitecurrency() {
      this.$axios.get(`/listing/prepublish/shopsitecurrency`).then(res => {
        this.storeNameData = res.data.shops;
        this.currencyData = res.data.currency;
      });
    },
    // 搜索表单
    submitForm() {
      this.page.cureentPage = 1;
      this.getList();
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 新增模板
    addTemplate() {
      this.$set(this.recordCurrent, "title", "新增模板");
      this.showPolicyPopup = true;
    },
    // 编辑模板
    editTemplate(data) {
      this.$set(data, "title", "编辑模板");
      this.recordCurrent = data;
      this.showPolicyPopup = true;
    },
    // 复制模板
    copyTemplate(data) {
      this.$set(data, "title", "复制模板");
      this.recordCurrent = data;
      this.showPolicyPopup = true;
    },
    // 获取分页size
    handleSizeChange(size) {
      this.page.size = size;
      this.page.cureentPage = 1;
      this.getList();
    },
    // 获取分页请求的page的值
    handleCurrentChange(nowpage) {
      this.page.cureentPage = nowpage;
      this.getList();
    },

    // 政策模板回调
    callbackPolicyPopup(from) {
      if (!from) {
        this.showPolicyPopup = false;
        return false;
      }
      //站点对应的货币（隐藏字段）
      let currency = "";
      let domesticTransport, internationalTransport; //国内国际运输
      //模板信息
      let { name, site, store, code, tmp_id } = from;

      //付款信息
      let { payment_instructions } = this.$refs.parent.$refs.payment.form;
      //退款政策
      let {
        domestic,
        foreign,
        domesticDays,
        domesticUndertaker,
        foreignDays,
        foreignUndertaker,
        textarea
      } = this.$refs.parent.$refs.refund.form;
      //运输政策
      let {
        processingTime,
        itemLocation,
        countryArea,
        postcode,
        internalGroup,
        internationalGroup,
        noTransportation,
        unavailable_shipping_location,
        unavailableShippingLocation
      } = this.$refs.parent.$refs.transportation.form;
      //其他政策
      let {
        radio,
        outOfRange,
        abandoned,
        violation,
        creditRating,
        selfSetting,
        restrictBuyerCredit,
        discardBid,
        discardDays,
        policyViolation,
        policyViolationDays,
        creditRatingNum,
        selfSettingNum,
        restrictBuyerCreditNum,
        saleTax,
        percentage,
        saleTaxRadio,
        imageAd,
        boldTitle,
        internationalSiteExposure
      } = this.$refs.parent.$refs.otherPolicy.form;
      domestic = this.convertNum(domestic);
      foreign = this.convertNum(foreign);
      outOfRange = this.convertNum(outOfRange);
      abandoned = this.convertNum(abandoned);
      violation = this.convertNum(violation);
      creditRating = this.convertNum(creditRating);
      selfSetting = this.convertNum(selfSetting);
      restrictBuyerCredit = this.convertNum(restrictBuyerCredit);

      if (!domestic || !foreign) {
        this.$message({
          message: "请勾选所有必填项!",
          type: "warning"
        });
        return;
      }
      let formdata = new FormData();
      //模板信息
      formdata.append("tmp_name", name);
      formdata.append("site", site.site);
      // formdata.append("shop_id", store);
      this.currencyData.forEach(item => {
        if (item.site == site.site) {
          currency = item.currency;
          internalGroup.forEach(internal => {
            internal.currency = currency;
            // if (
            //   !_g.validationRule.pureNumbers(internal.shipping_cost) ||
            //   !_g.validationRule.pureNumbers(internal.add_shipping_cost)
            // ) {
            //   this.$message({
            //     message: "请输入合法数值",
            //     type: "warning"
            //   });
            //   return;
            // }
          });
          internationalGroup.forEach(internal => {
            internal.currency = currency;
          });
        }
      });
      //付款信息
      if (payment_instructions) {
        formdata.append("payment_instructions", payment_instructions);
      }
      //退款政策
      formdata.append("returns_accepted", domestic); //接受国内退款
      if (domesticDays) {
        formdata.append("returns_with_in", domesticDays); //国内退款天数
      }
      if (domesticUndertaker) {
        formdata.append("shipping_cost_paid_by", domesticUndertaker); //国内退货运费承担方
      }
      formdata.append("internation_returns_accepted", foreign); //接受国外退款
      if (foreignDays) {
        formdata.append("internation_returns_with_in", foreignDays); //国外退款天数
      }
      if (foreignUndertaker) {
        formdata.append("internation_shipping_cost_paid_by", foreignUndertaker); //国外退货运费承担方
      }
      if (textarea) {
        formdata.append("return_description", textarea);
      }
      // ...
      // 其他
      formdata.append("disable_buyer_requirements", radio); //买家购买限制
      formdata.append("ship_to_registration_country", outOfRange); //限制购买区域
      formdata.append("max_unpaid_count_checkbox", abandoned); //是否制有弃标记录的用户购买
      formdata.append("max_unpaid_count", discardBid); //单位时间弃标次数
      formdata.append("max_unpaid_period", discardDays); //弃标天数
      formdata.append("max_violations_count_checkbox", violation); //是否限制违反政策用户购买
      formdata.append("max_violations_count", policyViolation); //单位时间违反政策次数
      formdata.append("max_violations_period", policyViolationDays); //违反政策时间
      formdata.append("min_feedback_score_checkbox", creditRating); //是否限制信用等级过低的用户购买
      formdata.append("min_feedback_score", creditRatingNum); //信用等级
      formdata.append("require_item_count_checkbox", selfSetting); //是否限制10天内购买数量
      formdata.append("require_item_count", selfSettingNum); //10天内购买的限制数量
      formdata.append("require_feedback_score_checkbox", restrictBuyerCredit); //是否在数量限购的基础上，限制信用等级
      formdata.append("require_feedback_score", restrictBuyerCreditNum); //数量限购后，信用限购的值
      formdata.append("sales_tax_state", saleTax); //	销售税国家
      formdata.append("shipping_included_in_tax", saleTaxRadio); //运费是否包括销售税
      formdata.append("gallery_type", imageAd); //图片广告
      if (saleTax) {
        if (!percentage) {
          this.$message({
            message: " 销售税比例不能为空",
            type: "warning"
          });
          return;
        } else if (!_g.validationRule.pureNumbers(percentage)) {
          this.$message({
            message: "销售税比例为不合法数值",
            type: "warning"
          });
          return;
        } else {
          formdata.append("sales_tax_percent", percentage); //销售税比例
        }
      } else {
        formdata.append("sales_tax_percent", ""); //销售税比例
      }
      //运输政策
      // //  =>国内 //移除id 后端控制
      internalGroup.forEach((area, index) => {
        area.free_shipping = this.convertNum(area.free_shipping);
        this.$set(area, "priority", index + 1);
        this.$delete(area, "other_shipping_cost");
        if (area.free_shipping) {
          this.$delete(area, "shipping_cost");
          this.$delete(area, "add_shipping_cost");
        }
      });

      // //  =>国际  //移除id 后端控制
      internationalGroup.forEach((area, index) => {
        this.$set(area, "priority", index + 1);
        this.$set(area, "transportationRange", []);
        if (area.global) {
          this.$set(area, "shipping_location", "Worldwide");
        } else {
          area.shipping_location.forEach(location => {
            if (location.select) {
              area.transportationRange.push(location.value);
              area.shipping_location = area.transportationRange.join("|");
            }
          });

          if (!area.transportationRange.length) {
            area.shipping_location = "Worldwide";
          }
        }
        this.$delete(area, "countryAll");
        this.$delete(area, "global");
        this.$delete(area, "transportationRange");
      });
      if (processingTime) {
        formdata.append("dispatch_time_max", processingTime); //处理时间
      }
      formdata.append("location", itemLocation); //物品所在地（必填）
      formdata.append("country", countryArea); //国家/区域
      formdata.append("postal_code", postcode); //邮编

      domesticTransport = JSON.stringify(internalGroup);
      internationalTransport = JSON.stringify(internationalGroup);

      formdata.append("ddl_exclusion_list_type", noTransportation); //不运送地区类型
      if (noTransportation) {
        if (unavailable_shipping_location) {
          formdata.append(
            "unavailable_shipping_location",
            unavailable_shipping_location
          ); //不运送地区
        } else if (unavailableShippingLocation) {
          formdata.append(
            "unavailable_shipping_location",
            unavailableShippingLocation.join("|")
          );
        } else {
          formdata.append("unavailable_shipping_location", " "); //不运送地区
        }
      }
      formdata.append("domestic_shipping", domesticTransport); //国内运输
      formdata.append("international_shipping", internationalTransport); //国际运输

      if (code) {
        this.$axios
          .post("/listing/config/policy/create", formdata, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
          })
          .then(res => {
            this.$message({
              message: res.msg,
              type: "success"
            });
            this.showPolicyPopup = false;
            this.getList();
          });
      } else {
        formdata.append("tmp_id", tmp_id); //政策模板ID
        this.$axios
          .post("/listing/config/policy/update", formdata, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
          })
          .then(res => {
            this.$message({
              message: res.msg,
              type: "success"
            });
            this.showPolicyPopup = false;
            this.getList();
          });
      }
    },
    convertNum(val) {
      if (val) {
        val = 1;
      } else {
        val = 0;
      }
      return val;
    },
    getControlBtn(id) {
      let params = {
        id
      };
      this.$authHttp
        .get("/rest/auth/user/perms/buttons", { params })
        .then(res => {
          res.data.buttonList.forEach(btn => {
            this.btnClass[btn.key] = true;
          });
        });
    }
  }
};
</script>

<style >
.inventory-adjustment-rules-form:after {
  content: "";
  display: block;
  clear: both;
}
</style>