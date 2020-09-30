<template>
  <div class="transportation-policy">
    <el-dialog
      :title="transportTecordCurrent.title"
      :visible.sync="showModule"
      @close="handleClose(false)"
      top="1%"
      width="70%"
      :close-on-click-modal="false"
    >
      <div>
        <el-form :inline="true" :model="form" ref="form" :rules="rules">
          <div>
            <el-form-item label="选择运输政策模板：" prop="template_name" label-width="150px">
              <el-select
                v-model="form.template_name"
                placeholder="请选择运输政策模板"
                @change="templateNameChangeInfo"
              >
                <el-option
                  v-for="item in  templateList.list"
                  :key="item.tmp_id"
                  :label="item.tmp_name"
                  :value="item.tmp_id"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>

          <el-form-item label="物品所在地：" prop="itemLocation">
            <el-input placeholder size="mini" v-model="form.itemLocation"></el-input>
          </el-form-item>
          <el-form-item label="国家或区域：" label-width="120px" prop="countryArea">
            <el-select
              v-model="form.countryArea"
              size="mini"
              filterable
              clearable
              placeholder="请选择国家或区域"
            >
              <el-option
                v-for="item in countriesList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="邮编：" label-width="80px">
            <el-input placeholder size="mini" v-model="form.postcode"></el-input>
          </el-form-item>

          <div class="domestic-transport transport">
            <div class="title">国内运输：</div>
            <el-card class="mode-of-transport" shadow="hover">
              <el-form-item
                label="处理时间："
                :label-width="formLabelWidth"
                style="width:100%"
                prop="processingTime"
              >
                <el-select
                  class="processing-time"
                  v-model="form.processingTime"
                  placeholder="请选择"
                  style="width:100px"
                  size="mini"
                >
                  <el-option
                    v-for="item in processingTimeData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>天
                <span class="comment">
                  <span class="focus">说明！</span> 设置值为0，则表示当天24小时内处理
                </span>
              </el-form-item>
              <el-form-item
                :label="`运输方式${index + 1}：`"
                :label-width="formLabelWidth"
                prop="internalGroup"
                v-for="(transport,index) in form.internalGroup"
                :key="index"
              >
                <el-select
                  style="width:510px"
                  class="processing-time"
                  v-model="transport.shipping_type"
                  placeholder="请选择"
                  size="mini"
                >
                  <el-option
                    v-for="item in internalGroupData"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-form-item :label-width="formLabelWidth" prop="freeShipping">
                  <el-checkbox v-model="transport.free_shipping">免运费</el-checkbox>
                </el-form-item>
                <el-form-item style="margin-left:50px" v-if="form.internalGroup.length != 1">
                  <el-button type="text" @click="deleShipping(index,'in')">移除</el-button>
                </el-form-item>
                <div>
                  <el-form-item label="运费：" prop="freeShipping">
                    <el-input
                      v-model="transport.shipping_cost"
                      style="width:80px;"
                      size="mini"
                      placeholder="0.00"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="每件附加费用：" label-width="110px" prop="freeShipping">
                    <el-input
                      v-model="transport.add_shipping_cost"
                      style="width:80px;"
                      size="mini"
                      placeholder="0.00"
                    ></el-input>
                  </el-form-item>
                  <!-- <el-form-item label="AK、HI、PR额外费用：" label-width="170px" prop="freeShipping">
                    <el-input
                      v-model="transport.additional"
                      style="width:60px;"
                      size="mini"
                      placeholder="0.00"
                    ></el-input>
                  </el-form-item>-->
                </div>
              </el-form-item>
              <div>
                <el-button
                  type="primary"
                  style="margin:0  0 0  100px"
                  size="mini"
                  @click="addShipping"
                >添加一行</el-button>
              </div>
            </el-card>
          </div>
          <div class="foreign-transportation transport">
            <div class="title">国外运输：</div>
            <el-card class="mode-of-transport" shadow="hover">
              <div>
                <el-form-item
                  :label="`运输方式${index + 1}：`"
                  :label-width="formLabelWidth"
                  prop="internationalGroup"
                  style="width:100%"
                  v-for="(transport,index) in form.internationalGroup"
                  :key="index"
                >
                  <el-select
                    style="width:510px"
                    class="processing-time"
                    v-model="transport.shipping_type"
                    placeholder="请选择"
                    size="mini"
                  >
                    <el-option
                      v-for="item in internationalGroupData"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <!-- <el-form-item :label-width="formLabelWidth" prop="freeShipping"></el-form-item> -->
                  <!--  -->
                  <el-form-item>
                    <el-button type="text" @click="deleShipping(index,'out')">移除</el-button>
                  </el-form-item>
                  <div>
                    <el-form-item label="运费：" prop="freeShipping">
                      <el-input
                        v-model="transport.shipping_cost"
                        style="width:80px;"
                        size="mini"
                        placeholder="0.00"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="附加费用：" label-width="110px" prop="freeShipping">
                      <el-input
                        v-model="transport.add_shipping_cost"
                        style="width:80px;"
                        size="mini"
                        placeholder="0.00"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <el-form-item label="运输到：" prop="freeShipping" style="width:100%">
                    <el-checkbox
                      v-model="transport.global"
                      @change="foreignGlobalChange(transport,$event)"
                    >全球</el-checkbox>
                    <span class="margin-rf10">或</span>
                    <el-button
                      v-model="transport.checkAll"
                      type="text"
                      style="margin-left:25px"
                      @click="handleCheckAllChange(transport)"
                    >选中以下国家</el-button>
                  </el-form-item>

                  <el-form-item prop="freeShipping">
                    <el-checkbox
                      v-for="location in transport.shipping_location"
                      :key="location.name"
                      v-model="location.select"
                      :disabled="transport.global"
                      @change="handleCheckedCitiesChange(transport,location,$event)"
                    >{{location.name}}</el-checkbox>
                  </el-form-item>
                </el-form-item>
                <div>
                  <el-button
                    type="primary"
                    style="margin:0  0 0  100px"
                    size="mini"
                    @click="addInternationaShipping"
                  >添加一行</el-button>
                </div>
              </div>
            </el-card>

            <el-form-item prop="freeShipping" label="不运送地区：">
              <el-select
                class="processing-time"
                v-model="form.noTransportation"
                placeholder="请选择"
                size="mini"
              >
                <el-option
                  v-for="item in noTransportationData"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                type="text"
                @click="addRestrictedArea"
                v-if="form.noTransportation == 2"
              >添加不运送地区</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <RestrictedAreaPopup
        v-if="showAreaDialog"
        :showAreaDialog="showAreaDialog"
        :recordCurrent="recordCurrent"
        :unavailableLocation="unavailableLocation"
        :unavailableShippingLocation="form.unavailableShippingLocation"
        @on-open-sesion="areaPopupData"
      ></RestrictedAreaPopup>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose(false)">取 消</el-button>
        <el-button type="primary" @click="handleClose(true)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import RestrictedAreaPopup from "@/view/BasicConfig/components/tabs/components/RestrictedAreaPopup";

export default {
  name: "TransportationPolicy",
  components: {
    RestrictedAreaPopup,
  },
  props: {
    showTransportPopup: {
      type: Boolean,
      default: false,
    },
    transportTecordCurrent: {
      type: Object,
    },
    templateList: {
      type: Object,
    },
  },
  data() {
    return {
      showModule: this.showTransportPopup,
      showAreaDialog: false,
      // 对话框数据缓存区
      recordCurrent: {},
      form: {
        template_name: "", //选择的运输模板
        processingTime: "",
        itemLocation: "", //物品所在地
        countryArea: "", //国家或区域
        postcode: "", //邮编
        //国内运输
        internalGroup: [
          {
            shipping_type: "", //运输方式
            free_shipping: false, //免运费
            shipping_cost: "", //运费
            add_shipping_cost: "", //附加费用
          },
        ],
        // 国际运输
        internationalGroup: [],
        noTransportation: "", //不运送地区
        unavailable_shipping_location: "", //不运送国家
        unavailableShippingLocation: [],
      },
      availableLocation: [], // 可运送国家
      unavailableLocation: {}, //不可运送国家
      processingTimeData: [
        {
          id: 1,
          value: 0,
        },
        {
          id: 2,
          value: 1,
        },
        {
          id: 3,
          value: 2,
        },
        {
          id: 4,
          value: 3,
        },
        {
          id: 5,
          value: 4,
        },
        {
          id: 6,
          value: 5,
        },
        {
          id: 7,
          value: 6,
        },
        {
          id: 8,
          value: 7,
        },
        {
          id: 9,
          value: 8,
        },
        {
          id: 10,
          value: 9,
        },
        {
          id: 11,
          value: 10,
        },
        {
          id: 12,
          value: 15,
        },
        {
          id: 13,
          value: 20,
        },
        {
          id: 14,
          value: 30,
        },
        {
          id: 15,
          value: 40,
        },
      ],
      internalGroupData: [],
      internationalGroupData: [],
      noTransportationData: [
        {
          id: 0,
          value: "运送至所有国家",
        },
        {
          id: 2,
          value: "选择不运送地区",
        },
      ],

      transportTemplateData: [],
      countriesList: [],
      rules: {
        // template_name: [
        //   { required: true, message: "请选择运输政策模板", trigger: "change" }
        // ],
        countryArea: [
          { required: true, message: "请选择国家或区域", trigger: "change" },
        ],
        itemLocation: [
          { required: true, message: "请输入物品所在地", trigger: "blur" },
        ],
      },
      id: 1,
      formLabelWidth: "100px",
    };
  },
  created() {
    this.getShippingType();
    this.getCountries();
    this.getTransportNoLocation();
    this.getAvailableLocation();
  },
  watch: {
    templateList(val) {
      this.templateList = val;
      this.getShippingType();
      this.getAvailableLocation();
      this.getTransportNoLocation();
      this.getCountries();
    },
  },
  mounted() {
    this.form.internationalGroup.forEach((transit) => {
      transit.country.forEach((location) => {
        this.$set(location, "selected", false);
      });
    });
  },
  methods: {
    // 国内运输方式
    getShippingType() {
      let params = {
        site_id: this.templateList.site_id,
      };
      this.$axios.get(`/listing/info/shipping/type`, { params }).then((res) => {
        this.internalGroupData = res.data.domestic;
        this.internationalGroupData = res.data.international;
      });
    },
    //  运输政策 -- 获取国家/区域
    getCountries() {
      let params = {
        site_id: this.templateList.site_id,
      };
      this.$axios
        .get(`/listing/info/shipping/countries`, { params })
        .then((res) => {
          this.countriesList = res.data;
        });
    },
    // 运输政策 - 国际运输方式信息
    templateNameChangeInfo() {
      this.getAvailableLocation();
      let params = {
        tmp_id: this.form.template_name,
      };
      this.$axios
        .get("/listing/config/policy/detail", { params })
        .then((res) => {
          // 国内运输数据处理
          res.data.domestic_shipping.forEach((dom) => {
            if (dom.free_shipping) {
              dom.free_shipping = true;
            }

            this.$delete(dom, "other_shipping_cost");
          });
          // 国外运输数据处理
          res.data.internation_shipping.forEach((internation) => {
            this.$set(internation, "countryAll", internation.shipping_location);

            this.$set(
              internation,
              "shipping_location",
              _g.getJsonParse(this.availableLocation)
            );
            internation.shipping_location.forEach((item) => {
              internation.countryAll.forEach((country) => {
                if (item.value == country) {
                  item.select = true;
                  //判断是否选择全球
                  if (item.name == "Worldwide") {
                    this.$set(internation, "global", true);
                    item.select = false;
                  }
                }
                if (item.name == country) {
                  item.select = true;
                  //判断是否选择全球
                  if (item.name == "Worldwide") {
                    this.$set(internation, "global", true);
                    item.select = false;
                  }
                }
              });
            });
          });

          this.form.processingTime = res.data.dispatch_time_max; //运输时间
          this.form.itemLocation = res.data.location; //物品所在地（必填）
          this.form.countryArea = res.data.country; //国家/区域
          this.form.postcode = res.data.postal_code; //邮编
          this.form.internalGroup = res.data.domestic_shipping; //国内运输
          this.form.internationalGroup = res.data.internation_shipping; // 国际运输
          this.form.noTransportation = res.data.ddl_exclusion_list_type; //不运送地区选框
          this.form.unavailableShippingLocation =
            res.data.unavailable_shipping_location; ////不运送地区
        });
    },
    // 运输政策 - 可运送国家
    getAvailableLocation() {
      let params = {
        site_id: this.templateList.site_id,
      };
      this.$axios
        .get(`/listing/info/shipping/available/location`, { params })
        .then((res) => {
          res.data.forEach((country) => {
            this.$set(country, "select", false);
          });
          this.availableLocation = res.data;
        });
    },

    // 运输政策 - 不可运送国家
    getTransportNoLocation() {
      let params = {
        site_id: this.templateList.site_id,
      };
      this.$axios
        .get(`/listing/info/shipping/unavailable/location`, { params })
        .then((res) => {
          for (const key in res.data) {
            if (res.data.hasOwnProperty(key)) {
              const item = res.data[key];
              if (item instanceof Array) {
                item.forEach((country) => {
                  this.$set(country, "select", false);
                });
              } else {
                for (const key in item) {
                  if (item.hasOwnProperty(key)) {
                    const region = item[key];
                    region.forEach((country) => {
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

    // 移除运输方式
    deleShipping(index, str) {
      if (str === "in") {
        this.form.internalGroup.splice(index, 1);
      } else {
        this.form.internationalGroup.splice(index, 1);
      }
    },
    // 添加运输方式
    addShipping() {
      let that = this;
      this.form.internalGroup.push({
        shipping_type: "", //运输方式 transport
        shipping_cost: "", //运费 postage
        add_shipping_cost: "", //附加费用 attach
        global: false, //全球勾选
        isDeleteId: true, // 删除id
      });
    },

    //添加国外一行
    addInternationaShipping() {
      this.form.internationalGroup.push({
        shipping_type: "", //运输方式 transport
        shipping_cost: "", //运费 postage
        add_shipping_cost: "", //附加费用 attach
        global: false, //全球勾选
        shipping_location: _g.getJsonParse(this.availableLocation), //运送范围 country
      });
    },
    // 全选国家
    handleCheckAllChange(item) {
      item.shipping_location.forEach((location) => {
        location.select = true;
      });
    },
    // 选择国家
    handleCheckedCitiesChange(transport, location, e) {},
    // 添加不运送地区
    addRestrictedArea() {
      this.$set(this.recordCurrent, "title", "添加不运送地区");
      this.showAreaDialog = true;
    },
    // 不运送地区弹窗回调
    areaPopupData(data) {
      this.showAreaDialog = false;
      if (!data) {
        return false;
      }
      let arr = [];
      data.forEach((item) => {
        arr.push(item.value);
      });
      this.form.unavailable_shipping_location = arr.join("|");
    },
    handleClose(val) {
      if (!val) {
        this.$emit("on-open-sesion", false);
        return false;
      }

      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit("on-open-sesion", {
            form: this.form,
            itemIds: this.templateList,
          });
        }
      });
    },
    // 国外全球选择
    foreignGlobalChange(item, e) {
      item.global = e;
      if (item.global) {
        item.shipping_location.forEach((c) => {
          this.$set(c, "select", false);
        });
      }
    },
  },
};
</script>

<style  >
.foreign-transportation {
  margin: 10px 0;
}
.mode-of-transport {
  width: 100%;
  height: 100%;
  margin: 10px 0;
  background-color: #f9f9f9;
}
.processing-time {
  margin-right: 8px;
}
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