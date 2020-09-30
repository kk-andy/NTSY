<template>
    <div class="batch-edit-popup">
      <el-dialog
        :title="recordCurrent.title"
        :visible.sync="showModule"
        @close="handleClose(false)"
        width="35%"
        :close-on-click-modal="false"
      >
        <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="left">
          <el-form-item label="修改方式：" prop="mode">
            <el-select v-model="form.mode" placeholder="请选择修改方式" tyle="width:217px">
              <el-option
                :label="item.val"
                v-for="item in recordCurrent.options"
                :key="item.id"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="修改值：" prop="val" v-if="recordCurrent.id === 1">
            <el-input v-model.number="form.val" style="width:217px" maxlength="5" oninput="value=value.replace(/[^\d]/g,'')" ></el-input>
          </el-form-item>
          <el-form-item label="修改值：" prop="val" v-if="recordCurrent.id !== 1 && form.mode !== 3">
            <el-input v-model="form.val" style="width:217px" oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </el-form-item>
          <el-form-item label="修改值：" prop="val" v-if="recordCurrent.id !== 1 && form.mode === 3">
            <el-input v-model="form.val" style="width:217px" oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>%
          </el-form-item>
          <el-form-item label-width="15px" prop="status">
            <el-checkbox v-model="form.status">是否同步至同站点其他店铺相同sku对应listing</el-checkbox>
          </el-form-item>
        </el-form>
        <ul class="explanation">    
          说明： 
          <li v-if="recordCurrent.id === 0">修改为固定价格仅限同一站点内listing</li>  
          <li>多属性改变所有变种价格</li>
          <li v-if="recordCurrent.id === 2">仅支持修改促销价</li>
        </ul>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleClose(false)">取 消</el-button>
          <el-button type="primary" @click="handleClose(true)">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import { message } from '@/utils/common'
export default {
  name: "BatchEditPopup",
  props: {
    showBatchEditPopup: {
      type: Boolean,
      default: false
    },
    recordCurrent: {
      type: Object
    },
    multipleSelection: {
      type: Array,
      default: []
    }
  },
  data() {
    var priceValidate = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入修改值'));
        } else {
          let priceReg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
          if (!priceReg.test(value)) {
            callback(new Error('请输入正确的修改值,整数或者保留两位小数'));
          } else {
            callback()
          }
        }
    };
    return {
      showModule: this.showBatchEditPopup,
      form: {
        mode: "",
        val: "",
        status: false
      },
      rules: {
        mode: [
          { required: true, message: "请选择修改方式", trigger: "change" }
        ],
        val: [{ validator: priceValidate, trigger: "blur" }]
      }
    };
  },
  created() {},
  methods: {
    handleClose(val) {
      if (!val) {
        this.$emit("on-open-sesion", false);
        return false;
      }

      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.recordCurrent.id === 0) { /* 修改价格 */          
            if (this.form.mode === 0) {
              let list = this.multipleSelection.map(item => item.site_code)
              if (new Set(list).size > 1) {
                message('warning', '所勾选listing内含多个站点')
                return
              }
            }
            this.$emit("on-open-sesion", {
              form: this.form,
              code: 0,
              bool: true
            });
          }
          if (this.recordCurrent.id === 1) { /* 修改库存 */
            this.$emit("on-open-sesion", {
              form: this.form,
              code: 1,
              bool: true
            });
          }
          if (this.recordCurrent.id === 2) {  /* 修改销售价格 */
            this.$emit("on-open-sesion", {
              form: this.form,
              code: 2,
              bool: true
            });
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
.explanation {
  margin-left: 15px;
  color: #f56c6c;
}
.explanation li {
  margin: 5px 0;
  text-indent: 2em;
  list-style: none;
}
</style>