<template>
  <el-row class="main">
    <el-col>
      <h2>信用卡库</h2>
      <form-component :form-data="formData" ref="formData" label-width="180px"></form-component>
    </el-col>
    <el-col style="margin-top:10px" :span="6" :offset="4">
      <el-button @click="submit" type="primary">{{title}}</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-col>
  </el-row>
</template>
<script>
import formComponent from "@/components/formComponents/form-component.vue";
import { getIfo } from "@/api/information";
import { mapState } from "vuex";
import { GetFormValue } from "@/utils/common";
export default {
  components: { formComponent },
  computed: {
    ...mapState({
      formData: (state) => state.supplementaryInformation.cardformData,
      item: (state) => state.supplementaryInformation.item1,
    }),
  },
  data() {
    return {
      role: "",
      paramsId: "",
      disabled: false,
      title: "保存",
    };
  },
  mounted() {
    this.role = Object.keys(this.$route.query)[0]; // 获取进入当前进入的模块
    this.paramsId = this.$route.query[this.role]; // 根据键值获取参数对应的值
    if (this.role) {
      // this.title = "编辑";
      this.disabled = true;
      this.$store.dispatch("supplementaryInformation/creditcardRead", {
        id: this.paramsId,
      });
    } else {
      this.$refs["formData"].$children[0].resetFields();
      this.$store.commit("supplementaryInformation/clearItem1");
    }
  },
  methods: {
    submit() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          if (this.title == "编辑") {
            let data = GetFormValue(this.formData);
            data.id = this.item.id;
            this.$store.dispatch(
              "supplementaryInformation/creditcardUpdate",
              data
            );
          } else {
            let data = GetFormValue(this.formData);
            this.$store.dispatch(
              "supplementaryInformation/creditcardCreate",
              data
            );
          }
        }
      });
    },
    cancel() {
      this.$router.push({ name: "CreditCard" });
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