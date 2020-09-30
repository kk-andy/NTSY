<template>
  <div class="transportation-policy">
    <el-form :inline="true" :model="form" ref="form" :rules="rules">
      <el-form-item label="物品所在地：" prop="itemLocation">
        <el-input placeholder size="mini" v-model="form.itemLocation"></el-input>
      </el-form-item>
      <el-form-item label="国家或区域：" label-width="110px" prop="countryArea">
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
      <el-form-item label="邮编：" label-width="80px" prop="postcode">
        <el-input placeholder size="mini" v-model="form.postcode"></el-input>
      </el-form-item>
      <div class="domestic-transport transport">
        <div class="title">国内运输：</div>
        <el-card class="mode-of-transport">
          <div style="width:100% background:#000">
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
                filterable
                class="processing-time"
                v-model="transport.shipping_type"
                placeholder="请选择"
                style="width: 300px"
                size="mini"
              >
                <el-option
                  v-for="item in domesticShipping"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
              <!-- <div>{{transport.shipping_type}}</div> -->
              <el-form-item :label-width="formLabelWidth" prop="freeShipping">
                <el-checkbox v-model="transport.free_shipping">免运费</el-checkbox>
              </el-form-item>
              <el-form-item style="margin-left:50px" v-if="form.internalGroup.length != 1">
                <el-button type="text" @click="deleShipping(index,'in')">移除</el-button>
              </el-form-item>
              <div>
                <el-form-item
                  label="运费："
                  :prop="`internalGroup.${index}.shipping_cost`"
                  :rules="rules.shipping_cost"
                >
                  <el-input
                    v-model.trim="transport.shipping_cost"
                    style="width:100px;"
                    @blur="verifyVal(transport.shipping_cost)"
                    size="mini"
                    placeholder="0.00"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="每件附加费用："
                  label-width="110px"
                  :prop="`internalGroup.${index}.add_shipping_cost`"
                  :rules="rules.add_shipping_cost"
                >
                  <el-input
                    v-model.trim="transport.add_shipping_cost"
                    @blur="verifyVal(transport.add_shipping_cost)"
                    style="width:100px;"
                    size="mini"
                    placeholder="0.00"
                  ></el-input>
                </el-form-item>
                <!-- <el-form-item
                label="AK、HI、PR额外费用："
                label-width="170px"
                :prop="`internalGroup.${index}.other_shipping_cost`"
                :rules="rules.other_shipping_cost"
              >
                <el-input
                  v-model="transport.other_shipping_cost"
                  style="width:100px;"
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
          </div>
        </el-card>
      </div>
      <div class="foreign-transportation transport">
        <div class="title">国外运输：</div>
        <el-card class="mode-of-transport">
          <div>
            <el-form-item
              :label="`运输方式${index + 1}：`"
              prop="internationalGroup"
              v-for="(transport,index) in form.internationalGroup"
              :key="index"
              :rules="rules.shipping_type"
            >
              <el-select
                filterable
                class="processing-time"
                v-model="transport.shipping_type"
                placeholder="请选择"
                style="width: 300px"
                size="mini"
              >
                <el-option
                  v-for="item in foreignShipping"
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
              <div style="margin-bottom:10px">
                <el-form-item
                  label="运费："
                  :prop="`internationalGroup.${index}.shipping_cost`"
                  :rules="rules.shipping_cost"
                >
                  <el-input
                    @blur="verifyVal(transport.shipping_cost)"
                    v-model="transport.shipping_cost"
                    style="width:100px;"
                    size="mini"
                    placeholder="0.00"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="附加费用："
                  label-width="110px"
                  :prop="`internationalGroup.${index}.add_shipping_cost`"
                  :rules="rules.add_shipping_cost"
                >
                  <el-input
                    @blur="verifyVal(transport.add_shipping_cost)"
                    v-model="transport.add_shipping_cost"
                    style="width:100px;"
                    size="mini"
                    placeholder="0.00"
                  ></el-input>
                </el-form-item>
              </div>
              <el-form-item label="运输到：" prop="global" style="width:100%">
                <el-checkbox
                  v-model="transport.global"
                  @change="foreignGlobalChange(transport,$event)"
                >全球</el-checkbox>
                <span class="margin-rf10">或</span>
                <el-button
                  v-model="transport.checkAll"
                  type="text"
                  style="margin-left:25px"
                  :disabled="transport.global"
                  @click="handleCheckAllChange(transport)"
                >选中以下国家</el-button>
              </el-form-item>

              <div>
                <el-form-item style="margin-left:68px">
                  <el-checkbox
                    v-for="location in transport.shipping_location"
                    :key="location.name"
                    v-model="location.select"
                    :disabled="transport.global"
                    @change="handleCheckedCitiesChange(transport,location,$event)"
                  >{{location.name}}</el-checkbox>
                </el-form-item>
              </div>
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

          <div>
            <el-form-item prop="noTransportation" label="不运送地区：" style="margin-top:20px">
              <el-select
                class="processing-time"
                v-model="form.noTransportation"
                placeholder="请选择"
                size="mini"
              >
                <el-option
                  v-for="item in noTransportationData"
                  :key="item.value"
                  :label="item.value"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-top:20px">
              <el-button
                type="text"
                v-if="form.noTransportation == 2"
                @click="addRestrictedArea"
              >添加不运送地区</el-button>
            </el-form-item>
          </div>
        </el-card>
      </div>
    </el-form>
    <RestrictedAreaPopup
      v-if="showAreaDialog"
      :showAreaDialog="showAreaDialog"
      :recordCurrent="recordCurrent"
      :unavailableLocation="unavailableLocation"
      @on-open-sesion="areaPopupData"
      :unavailableShippingLocation="form.unavailableShippingLocation"
      ref="noAreaPopup"
    ></RestrictedAreaPopup>
  </div>
</template>

<script>
import RestrictedAreaPopup from "@/view/BasicConfig/components/tabs/components/RestrictedAreaPopup";

export default {
  name: "TransportationPolicy",
  components: {
    RestrictedAreaPopup
  },
  props: {
    availableLocation: {
      type: Array
    },
    unavailableLocation: {
      type: Object
    },
    domesticShipping: {
      type: Array
    },
    foreignShipping: {
      type: Array
    },
    transportForm: {
      type: Object,
      default() {
        return {};
      }
    },
    countriesList: {
      type: Array
    }
  },

  data() {
    var verifyInventory = (rule, value, callback) => {
      if (!_g.validationRule.greaterThanZero(value)) {
        callback(new Error("请输入合法数字"));
      } else {
        callback();
      }
    };
    return {
      showAreaDialog: false,
      // 对话框数据缓存区
      recordCurrent: {},
      form: {
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
            add_shipping_cost: "" //附加费用
          }
        ],
        // 国际运输
        internationalGroup: [],
        noTransportation: 0, //不运送地区多选框
        unavailable_shipping_location: "", // 不运送地区数组
        unavailableShippingLocation: "" // 不运送地区数组
      },
      rules: {
        shipping_cost: [],
        add_shipping_cost: [],
        itemLocation: [
          { required: true, message: "请输入物品所在地", trigger: "blur" }
        ],
        countryArea: [
          { required: true, message: "请选择国家或区域", trigger: "blur" }
        ],
        noTransportation: [
          { required: true, message: "请选择不运送地区", trigger: "blur" }
        ],
        processingTime: [
          { required: true, message: "请选择处理时间", trigger: "blur" }
        ],
        internalGroup: [
          { required: true, message: "请选择运输方式", trigger: "blur" }
        ]
      },

      processingTimeData: [
        {
          id: 1,
          value: "0"
        },
        {
          id: 2,
          value: "1"
        },
        {
          id: 3,
          value: "2"
        },
        {
          id: 4,
          value: "3"
        },
        {
          id: 5,
          value: "4"
        },
        {
          id: 6,
          value: "5"
        },
        {
          id: 7,
          value: "6"
        },
        {
          id: 8,
          value: "7"
        },
        {
          id: 9,
          value: "8"
        },
        {
          id: 10,
          value: "9"
        },
        {
          id: 11,
          value: 10
        },
        {
          id: 12,
          value: 15
        },
        {
          id: 13,
          value: 20
        },
        {
          id: 14,
          value: 30
        },
        {
          id: 15,
          value: 40
        }
      ],
      internalGroupData: [],
      internationalGroupData: [],
      noTransportationData: [
        {
          id: 0,
          value: "运送至所有国家"
        },
        {
          id: 2,
          value: "选择不运送地区"
        }
      ],

      formLabelWidth: "100px"
    };
  },
  watch: {
    transportForm(val) {
      //不运送地去选择框选择
      this.noTransportationData.forEach(select => {
        if (val.noTransportation == select.id) {
          val.noTransportation = select.id;
        }
      });

      this.form = val;
      // this.form.internalGroup = val.internalGroup;
      // this.form.internationalGroup = val.internationalGroup;
    }
  },
  created() {},
  methods: {
    // 添加运输方式
    addShipping() {
      let that = this;
      this.form.internalGroup.push({
        shipping_type: "", //运输方式
        free_shipping: false, //免运费
        shipping_cost: "", //运费
        add_shipping_cost: "" //附加费用
      });
    },
    //添加国外一行
    addInternationaShipping() {
      this.form.internationalGroup.push({
        shipping_type: "", //运输方式 transport
        shipping_cost: "", //运费 postage
        add_shipping_cost: "", //附加费用 attach
        global: false, //全球勾选
        shipping_location: _g.getJsonParse(this.availableLocation) //运送范围 country
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
    // 全选国家
    handleCheckAllChange(item) {
      item.shipping_location.forEach(location => {
        location.select = true;
      });
    },
    // 选择可运送国家
    handleCheckedCitiesChange(transport, location, e) {},
    // 添加不运送地区
    addRestrictedArea() {
      this.$set(this.recordCurrent, "title", "添加不运送地区");
      this.$set(
        this.recordCurrent,
        "noShipping",
        this.form.unavailable_shipping_location
      );
      this.showAreaDialog = true;
    },
    // 不运送地区弹窗回调
    areaPopupData(data) {
      this.showAreaDialog = false;
      if (!data) {
        return false;
      }
      let arr = [];
      data.forEach(item => {
        arr.push(item.value);
      });
      this.form.unavailable_shipping_location = arr.join("|");
    },
    // 国外全球选择
    foreignGlobalChange(item, e) {
      item.global = e;
      if (item.global) {
        item.shipping_location.forEach(c => {
          this.$set(c, "select", false);
        });
      }
    },
    verifyVal(val) {
      if (!val) return;
      if (!_g.validationRule.pureNumbers(val)) {
        this.$message({
          message: "请输入合法数值",
          type: "warning"
        });
        val = "";
        return false;
      }
    }
  }
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