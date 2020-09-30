<template>
  <div class="account-popup">
    <el-dialog
      :title="recordCurrent.title"
      :visible.sync="showModule"
      @close="handleClose(false)"
      :close-on-click-modal="false"
      width="50%"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item
          label="规则名称："
          style="width:100%"
          :label-width="formLabelWidth"
          prop="rule_name"
        >
          <el-input placeholder="请输入规则名称" v-model.trim="form.rule_name" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="仓库："
          :label-width="formLabelWidth"
          style="width: 100%;"
          prop="warehouse"
        >
          <el-select
            v-model="form.warehouse"
            multiple
            filterable
            placeholder="请选择"
            style="width:100%"
          >
            <el-option
              v-for="item in storelist"
              :key="item.py_store_id"
              :label="item. store_name"
              :value="item.py_store_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="店铺：" :label-width="formLabelWidth" prop="shop_name">
          <el-select
            v-model="form.shop_name"
            value-key="shop_id"
            multiple
            filterable
            placeholder="请选择店铺"
            style="width: 100%;"
          >
            <el-option
              v-for="item in shopsList"
              :key="item.shop_id"
              :label="item.shop_name"
              :value="item.shop_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="国家和区域：" :label-width="formLabelWidth" prop="country">
          <el-select
            v-model="form.country"
            value-key="shop_id"
            filterable
            placeholder="请选择国家和区域"
            style="width: 100%;"
          >
            <el-option
              v-for="item in countriesList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实际库存区间：" required style="margin-left:30px">
          <el-col :span="5">
            <el-form-item prop="stock_min">
              <el-input placeholder="起始值" v-model.trim="form.stock_min" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="5">
            <el-form-item prop="stock_max">
              <el-input placeholder="结束值" v-model.trim="form.stock_max" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="线上库存区间：" required style="margin-left:30px">
          <el-col :span="5">
            <el-form-item prop="online_stock_min">
              <el-input placeholder="起始值" v-model.trim="form.online_stock_min" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="5">
            <el-form-item prop="online_stock_max">
              <el-input placeholder="结束值" v-model.trim="form.online_stock_max" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item
          label="线上库存修改结果："
          :label-width="formLabelWidth"
          style="width: 100%;"
          prop="stock_change"
        >
          <el-input placeholder v-model="form.stock_change"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose(false)">取 消</el-button>
        <el-button type="primary" @click="handleClose(true)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { CheckboxGroup } from "element-ui";
export default {
  name: "AccountPopup",
  props: {
    showRulePopup: {
      type: Boolean,
      default: false
    },
    recordCurrent: {
      type: Object,
      default() {
        return {};
      }
    },
    storelist: {
      type: Array
    },
    shopsList: {
      type: Array
    }
  },

  data() {
    var checkIsPositiveInteger = (rule, value, callback) => {
      if (!_g.validationRule.pureNumbers(value)) {
        callback(new Error("请输入合法数字"));
      } else if (value.length >= 50) {
        callback(new Error("长度在 1 到 50 个字符"));
      } else {
        callback();
      }
    };
    var checkIsPositiveIntegers = (rule, value, callback) => {
      if (!_g.validationRule.pureNumbers(value)) {
        callback(new Error("请输入合法数字"));
      } else {
        callback();
      }
    };
    return {
      showModule: this.showRulePopup,

      form: {
        rule_name: "", //规则名称
        warehouse: "", // 仓库
        shop_name: "", //店铺名称
        stock_min: null, //实际库存区间 => 起始值
        stock_max: null, //实际库存区间 => 尾值
        online_stock_min: null, //线上库存区间 =>  起始值
        online_stock_max: null, //线上库存区间 =>  尾值
        stock_change: null // 结果
      },
      countryList: [],
      rules: {
        rule_name: [
          { required: true, message: "规则名称未填写", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur"
          }
        ],
        warehouse: [{ required: true, message: "请选择仓库", trigger: "blur" }],
        shop_name: [{ required: true, message: "请选择店铺", trigger: "blur" }],
        stock_min: [
          { required: true, message: "请输入数值", trigger: "blur" },
          { validator: checkIsPositiveIntegers, trigger: "blur" }
        ],
        stock_max: [
          { required: true, message: "请输入数值", trigger: "blur" },
          { validator: checkIsPositiveIntegers, trigger: "blur" }
        ],
        online_stock_max: [
          { required: true, message: "请输入数值", trigger: "blur" },
          { validator: checkIsPositiveIntegers, trigger: "blur" }
        ],
        online_stock_min: [
          { required: true, message: "请输入数值", trigger: "blur" },
          { validator: checkIsPositiveIntegers, trigger: "blur" }
        ],
        stock_change: [
          {
            required: true,
            message: "请输入线上库存修改结果",
            trigger: "blur"
          },
          { validator: checkIsPositiveInteger, trigger: "blur" }
        ]
      },
      formLabelWidth: "150px",
      countriesList: []
    };
  },
  created() {
    if (this.recordCurrent.title == "编辑库存调整规则") {
      this.getInfo();
    }
    this.getCountries();
  },
  methods: {
    getInfo() {
      let params = {
        id: this.recordCurrent.id
      };
      this.$axios.get("/listing/config/stock/detail", { params }).then(res => {
        if (res.data.store_ids) {
          var storeIds = res.data.store_ids.split(",");
        }
        this.$set(res.data, "warehouse", []);
        this.$set(res.data, "shop_name", res.data.shop_ids.split(','));
        this.$set(res.data, "shop_name", [])
        this.shopsList.forEach(shop => {
          res.data.shop_ids.split(",").forEach(ele => {
            if (ele == shop.shop_id) {
              res.data.shop_name.push(shop.shop_id)
            }
          })
        });
        this.storelist.forEach(store => {
          storeIds.forEach(item => {
            if (store.py_store_id == item) {
              res.data.warehouse.push(store.py_store_id);
            }
          });
        });
        this.form = res.data;
      });
    },
    //  运输政策 -- 获取国家/区域
    getCountries() {
      this.$axios.get(`/listing/info/store/shippingCountryList`).then(res => {
        this.countriesList = res.data;
      });
    },
    handleClose(val) {
      if (!val) {
        this.$emit("on-open-sesion-btn", false);
        return;
      }
      console.log(this.form.shop_name)
      // return
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.recordCurrent.title == "编辑库存调整规则") {
            this.$emit("on-open-sesion-btn", { form: this.form, code: 0 });
          } else {
            this.$emit("on-open-sesion-btn", { form: this.form, code: 1 });
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.el-col-16 {
  padding: 0 !important;
}

.line {
  text-align: center;
}
</style>