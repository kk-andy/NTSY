<template>
  <el-row class="main">
    <el-col>
      <h2>服务项目价卡</h2>
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
import { mapState } from "vuex";
import { GetFormValue } from "@/utils/common";
export default {
  components: { formComponent },
  computed: {  
    ...mapState({
      formData: (state) => state.addservice.serviceformData,
        item: (state) => state.addservice.item,
    }),
  },
  data() {
    return {
      role: "",
      paramsId: "",
      title: "保存",
    };
  },
  mounted() {
    this.role = Object.keys(this.$route.query)[0]; // 获取进入当前进入的模块
    this.paramsId = this.$route.query[this.role]; // 根据键值获取参数对应的值
    if (this.role) {
      this.title = "编辑";
      this.$store.dispatch('addservice/serviceRead',{id: this.paramsId,})
    }else {
      
      this.$refs['formData'].$children[0].resetFields();
        this.$store.commit("addservice/clearItem");
    }
  },
  methods: {
    submit() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          if (this.title == "编辑") {
             let data = GetFormValue(this.formData);
             data.id = this.item.id
            this.$store.dispatch(
              "addservice/serviceUpdate",
              data
            );
          } else {
            let data = GetFormValue(this.formData);
            this.$store.dispatch(
              "addservice/serviceCreate",
              data
            );
          }
        }
      });
    },
    cancel() {
      this.$router.push({ name: "ServiceItems" });
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