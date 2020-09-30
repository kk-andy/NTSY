<template>
  <el-row class="main">
    <h2>返款审核</h2>
    <el-col :span="12">
      <form-component :form-data="formData" ref="formData" label-width="180px"></form-component>
    </el-col>
    <el-col :span="12">
      <form-component :form-data="formData1" ref="formData1" label-width="180px"></form-component>
    </el-col>
    <el-col :span="24" v-if="!isshow">
      <el-divider></el-divider>
      <el-col :span="12">
        <form-component :form-data="formData3" ref="formData3" label-width="180px"></form-component>
      </el-col>
      <el-col :span="12">
        <form-component :form-data="formData4" ref="formData4" label-width="180px"></form-component>
      </el-col>
    </el-col>

    <el-col v-if="isshow" style="margin-top:20px;margin-bottom:20px" :span="12" :offset="12">
      <el-button
        v-if="role !== 'evaluationCompletedEdit'"
        @click="secondRefund()"
        type="primary"
      >二次返款</el-button>
      <el-button @click="refundAbnormal()" type="danger">异常归档</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-col>
    <el-col v-else style="margin-top:20px;margin-bottom:20px" :span="12" :offset="12">
      <el-button @click="submit" type="primary">提交</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-col>
    <Modal
      v-model="modal_fail"
      title="归档原因"
      width="30%"
      footer-hide
      class-name="vertical-center-modal"
      @on-cancel="resetForm"
    >
      <div class="modal_tontent">
        <el-form ref="abnormal" :model="abnormal" :rules="rules" label-width="80px">
          <el-form-item label="归档原因" prop="reason">
            <el-input type="textarea" v-model="abnormal.reason" placeholder="输入归档原因"></el-input>
          </el-form-item>
          <el-form-item label="退款金额" prop="actual_amount">
            <el-col :span="11">
              <el-input v-model="abnormal.actual_amount" placeholder="输入退款金额"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="退款币种" prop="currency">
            <el-select v-model="abnormal.currency" placeholder="请选择退款币种">
              <el-option v-for="(item,index) in currency" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="退款原由" prop="refund_reason">
            <el-select v-model="abnormal.refund_reason" placeholder="请选择退款原由">
              <el-option
                v-for="item in refundreason"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('abnormal')">提交</el-button>
            <el-button @click="resetForm('abnormal')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </Modal>
  </el-row>
</template>
<script>
import formComponent from "@/components/formComponents/form-component.vue";
import { getIfo } from "@/api/information";
import { tagEmail } from "@/common/validate";
import { mapState } from "vuex";
import { GetFormValue } from "@/utils/common";
export default {
  components: { formComponent },
  computed: {
    ...mapState({
        formData1: (state) => state.abnormalStatistics.formData1,
        formData: (state) => state.abnormalStatistics.formData,
        formData3: (state) => state.abnormalStatistics.formData3,
        formData4: (state) => state.abnormalStatistics.formData4,
        rules: (state) => state.abnormalStatistics.rules,
        refundreason: (state) => state.commons.refundreason,
        currency: (state) => state.commons.currency,
    }),
    modal_fail: {
      get() {
        return this.$store.state.abnormalStatistics.modal_fail;
      },
      set(val) {
        this.$store.state.abnormalStatistics.modal_fail = val;
      }
    },
    abnormal: {
      get() {
        return this.$store.state.abnormalStatistics.abnormal;
      },
      set(val) {
        this.$store.state.abnormalStatistics.abnormal = val;
      }
    },
  },
  data() {
    return {
      role: "",
      isshow: true,
      paramsId: "", 
    };
  },
  mounted() {
    this.role = Object.keys(this.$route.query)[0]; // 获取进入当前进入的模块
    this.paramsId = this.$route.query[this.role]; // 根据键值获取参数对应的值
    let data = {id:this.paramsId}
    this.$store.dispatch("commons/getRefundreason");
    this.$store.dispatch("commons/getCurrency");
    if (this.role == 'evaluationCompletedEdit') { //测评详情
      this.$store.dispatch("abnormalStatistics/checkRead", data);
    }else if (this.role == 'abnormalEdit') { //异常归档详情
      
    this.$store.dispatch("abnormalStatistics/read", data);
    }
  },
  methods: {
    submit() {
      let flag4;
      let flag3;
      this.$refs.formData4.validate((valid) => {
        flag4 = valid;
      });
      this.$refs.formData3.validate((valid) => {
        flag3 = valid;
      });
      if (flag4 && flag3) {
        let form = {
          ...this.formData3,
          ...this.formData4
        }
        let query = {
          data: GetFormValue(form),
          this:this,
          name:"AbnormalFile"
        }
       
        //  this.$store.dispatch("abnormalStatistics/submit", query);
      }
    },
    secondRefund() {
      this.isshow = false;
    },
    cancel() {
      // this.$router.push({ name: "BuyerAccount" });
      this.$router.go(-1);
    },
    refundAbnormal(){
      this.modal_fail = true
    },
    onSubmit(formName) {
      this.abnormal.id = this.paramsId
      let query= {
        data:this.abnormal,
        that:this,
        name:'AbnormalFile'
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch("abnormalStatistics/assessorderAbnormalFile", query);
        }
      });
    },
    resetForm(formName) {
      this.$store.commit("abnormalStatistics/CLEAR_LIST",this);
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  h2 {
    margin-bottom: 20px;
    margin-left: 10px;
  }
}
</style>