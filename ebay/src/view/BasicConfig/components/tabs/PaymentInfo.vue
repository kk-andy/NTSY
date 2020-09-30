<template>
  <div class="payment-info">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="付款说明：" prop="name">
        <el-input
          type="textarea"
          placeholder="请输入付款说明"
          v-model="form.payment_instructions"
          maxlength="500"
          :rows="10"
          show-word-limit
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="remarks">不支持HTML</div>
  </div>
</template>

<script>
export default {
  name: "PaymentInfo",
  components: {},
  props: {
    payment_instructions: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      form: {
        payment_instructions: this.payment_instructions
      }
    };
  },
  watch: {
    payment_instructions(val) {
      this.form.payment_instructions = val;
    }
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style >
.remarks {
  color: rgb(192, 196, 204);
  margin-left: 100px;
}
</style>