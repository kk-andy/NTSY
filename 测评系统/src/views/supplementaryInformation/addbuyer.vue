<template>
  <el-row class="main">
    <el-col>
      <h2>买家号库</h2>
      <form-component
        :form-data="formData"
        ref="formData"
        label-width="180px"
      ></form-component>
      <!-- <el-form>
        <el-form-item></el-form-item>
      </el-form> -->
    </el-col>
    <el-col style="margin-top: 10px" :span="6" :offset="4">
      <el-button @click="submit" type="primary">保存</el-button>
      <el-button @click="reset">重置</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-col>
  </el-row>
</template>
<script>
import formComponent from "@/components/formComponents/form-component.vue";
import { getIfo } from "@/api/information";
import { tagEmail } from "@/common/validate";
import { mapState } from "vuex";
import { GetFormValue, clearFormValue } from "@/utils/common";
export default {
  components: { formComponent },
  computed: {
    ...mapState({
      formData: (state) => state.supplementaryInformation.formData,
      item: (state) => state.supplementaryInformation.item,
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
    //平台 站点 账号邮箱的动态禁用
    if (this.$route.query.buyerEdit) {
      this.$store.commit("supplementaryInformation/CHANGE_DISABLED", true);
    } else {
      this.$store.commit("supplementaryInformation/CHANGE_DISABLED", false);
    }

    this.role = Object.keys(this.$route.query)[0]; // 获取进入当前进入的模块
    this.paramsId = this.$route.query[this.role]; // 根据键值获取参数对应的值
    if (this.role) {
      // this.title = "编辑";
      this.$store.dispatch("supplementaryInformation/purchaserRead", {
        id: this.paramsId,
      });
    } else {
      this.$refs["formData"].$children[0].resetFields();
      this.$store.commit("supplementaryInformation/clearItem");
    }
  },
  methods: {
    submit() {
      this.$refs.formData.validate((valid, obj) => {
        if (valid) {
          // if (this.title == "编辑") {
          let data = GetFormValue(this.formData);
          data.id = this.item.id;
          //shopping_habits 转格式
          let str = "";
          data.shopping_habits.forEach((i) => {
            str += i + ",";
          });
          str = str.substring(0, str.length - 1);
          data.shopping_habits = str;
          //空值保存为空字符串
          for (let key in data) {
            if (!data[key]) {
              data[key] = "";
            }
          }
          console.log(data);
          if (data.id) {
            this.$store.dispatch(
              "supplementaryInformation/purchaserUpdate",
              data
            );
          } else {
            this.$store.dispatch(
              "supplementaryInformation/purchaserCreate",
              data
            );
          }

          // } else {
          //   // console.log(111);
          //   let data = GetFormValue(this.formData);
          //   this.$store.dispatch(
          //     "supplementaryInformation/purchaserCreate",
          //     data
          //   );
          // }
        } else {
          // console.log("fafaaf1");
        }
      });
    },
    cancel() {
      this.$router.push({ name: "BuyerAccount" });
    },
    reset() {
      this.$refs["formData"].$children[0].resetFields();
      // clearFormValue(this.formData);
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