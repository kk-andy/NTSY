<template>
  <div class="account-popup">
    <el-dialog
      :title="recordCurrent.title"
      :visible.sync="showModule"
      @close="handleClose(false)"
      width="600px"
      top="3%"
      :close-on-click-modal="false"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item
          label="账号名："
          style="width:100%"
          :label-width="formLabelWidth"
          prop="account_name"
        >
          <el-input placeholder="请输入账号名称" v-model.trim="form.account_name" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="token："
          :label-width="formLabelWidth"
          class="button_position"
          style="width: 100%;"
          prop="token"
        >
          <el-input placeholder="请输入token" v-model.trim="form.token"></el-input>
          <el-button size="mini" type="primary" @click="getToken(form.account_name)">获取</el-button>
        </el-form-item>
        <el-form-item
          label="状态："
          :label-width="formLabelWidth"
          style="width: 100%;"
          prop="statusCode"
        >
          <el-radio-group v-model="form.statusCode">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="Paypal账号："
          :label-width="formLabelWidth"
          style="width: 100%;"
          prop="paypal"
        >
          <el-input placeholder="请输入Paypal账号" v-model="form.paypal" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="销售员："
          :label-width="formLabelWidth"
          style="width: 100%;"
          prop="seller_id"
        >
          <el-select v-model="form.seller_id" filterable placeholder="请选择销售员" style="width: 100%;">
            <el-option
              v-for="item in sellerlistData"
              :key="item.staff_id"
              :label="item.staff_name"
              :value="item.staff_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="店铺名称："
          :label-width="formLabelWidth"
          style="width: 100%;"
          prop="shop_name"
        >
          <el-input placeholder="请输入店铺名称" v-model="form.shop_name" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="应用ID："
          :label-width="formLabelWidth"
          style="width: 100%;"
          prop="app_id"
        >
          <el-input placeholder="请输入应用ID" v-model="form.app_id" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="开发者ID："
          :label-width="formLabelWidth"
          style="width: 100%;"
          prop="dev_id"
        >
          <el-input placeholder="请输入开发者ID" v-model="form.dev_id" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="证书ID："
          :label-width="formLabelWidth"
          style="width: 100%;"
          prop="cert_id"
        >
          <el-input placeholder="请输入证书ID" v-model="form.cert_id" clearable></el-input>
        </el-form-item>
        <el-form-item
          label="OSS地址："
          :label-width="formLabelWidth"
          style="width: 100%;"
          prop="oss_url"
        >
          <el-input placeholder="请输入OSS_URL:oss链接地址" v-model="form.oss_url" clearable></el-input>
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
import { getBaseSessionId, getBaseToken } from '@/api/accountNumber'
import { startLoading, endLoading } from '@/utils/common'
import axios from 'axios'
let timeer = null
export default {
  name: "AccountPopup",
  props: {
    showAccountPopup: {
      type: Boolean,
      default: false
    },
    recordCurrent: {
      type: Object,
      default() {
        return {};
      }
    },
    sellerlistData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      showModule: this.showAccountPopup,

      form: {
        account_name: "",
        token: "",
        statusCode: null,
        paypal: "",
        seller_id: "",
        shop_name: "",
        app_id: "",
        dev_id: "",
        cert_id: "",
        oss_url: ""
      },
      rules: {
        account_name: [
          { required: true, message: "请输入账号名称", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur"
          }
        ],
        token: [
          { required: true, message: "请输入token", trigger: "blur" },
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "blur"
          }
        ],
        statusCode: [
          { required: true, message: "请选择状态", trigger: "blur" }
        ],
        paypal: [
          { required: true, message: "请输入paypal账号", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur"
          }
        ],
        seller_id: [
          { required: true, message: "请选择销售员", trigger: "blur" }
        ],
        shop_name: [
          { required: true, message: "请输入店铺名称", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur"
          }
        ]
      },
      formLabelWidth: "120px"
    };
  },

  created() {
    if (this.recordCurrent.title == "编辑账号") {
      if (this.recordCurrent.status == 1) {
        this.$set(this.recordCurrent, "statusCode", 1);
        this.form = _g.getJsonParse(this.recordCurrent);
        this.$forceUpdate();
      } else {
        this.$set(this.recordCurrent, "statusCode", 0);
        this.form = _g.getJsonParse(this.recordCurrent);
        this.$forceUpdate();
      }
      return;
    }
  },
  methods: {
    handleClose(val) {
      if (!val) {
        this.$emit("on-open-sesion-btn", false);
        window.clearTimeout(timeer)
        return;
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.recordCurrent.title == "编辑账号") {
            this.$emit("on-open-sesion-btn", { form: this.form, code: 2 });
          } else {
            this.$emit("on-open-sesion-btn", { form: this.form, code: 1 });
          }
        } else {
          return false;
        }
      });
    },
    getToken(name) {
      if (!name) {
        return
      }    
      let timestamp = new Date().getTime()
      let params = { account_name: name}
      let params2 = { account_name: name, timestamp  }
      this.getBaseSessionId(params, params2) 
    },
    async getBaseSessionId(params, params2) {
      await getBaseSessionId(params).then(res => {
        window.open(res.data.auth_url)
      })
      await this.getEabyToken(params2)
    },
    getEabyToken(params) {
      let that  = this
      startLoading()
      axios.get(`${process.env.VUE_APP_AUTH_API_DOMAIN}/listing/base/token`, { params,  headers: { Authorization: sessionStorage.getItem('token')  } }).then(res => {
        if (res.data.code === 0) {
          if (!res.data.data.status) {
            timeer = setTimeout(() => {
                that.getEabyToken(params)
              }, 2000)
          } else {
              window.clearTimeout(timeer)
              this.form.token = res.data.data.token
              endLoading()
          }
        } else {
          endLoading()
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        }
        
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.el-col-16 {
  padding: 0 !important;
}
.button_position {
  position: relative;
  button {
    position: absolute;
    left: -130px;
    top: 4px;
  }
}
</style>