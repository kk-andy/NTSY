<template>
  <div class="main">
    <div>
      <el-form ref="form" :inline="true" :model="form" label-width="100px">
        <el-col :span="6">
          <el-form-item label="信用卡号">
            <el-input
              v-model="form.creditcard"
              placeholder="信用卡号"
              style="width: 107%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="卡状态">
            <el-select v-model="form.status" placeholder="请选择">
              <el-option
                v-for="(item, index) in creditcardstatus"
                :key="index"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="历史充值金额" class="numRange">
            <el-col :span="11" style="display: flex">
              <el-input
                v-model="form.history_amount_min"
                placeholder="最小值"
              ></el-input
              >&nbsp;至&nbsp;
            </el-col>
            <el-col :span="10">
              <el-input
                v-model="form.history_amount_max"
                placeholder="最大值"
              ></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="当前卡余额" class="numRange">
            <el-col :span="11" style="display: flex">
              <el-input
                v-model="form.balance_min"
                placeholder="最小值"
              ></el-input
              >&nbsp;至&nbsp;
            </el-col>
            <el-col :span="10">
              <el-input
                v-model="form.balance_max"
                placeholder="最大值"
              ></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="提交日期">
            <el-date-picker
              v-model="form.create_at"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              clearable
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="text-align: center">
          <el-form-item>
            <el-button
              @click="getData('data')"
              type="primary"
              v-if="showButtons.search"
              icon="el-icon-search"
              >搜索</el-button
            >
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <creditCardRechargeTable
      :tableData="creditcardrechange.list"
      @selectionChange="selectionChange"
      @numberClick="numberClick"
    />
    <div class="change_page">
      <page-total
        :total="creditcardrechange.total"
        :size="form.size"
        :current-page="form.page"
      />
      <el-pagination
        :current-page="form.page"
        background
        :page-sizes="[10, 20, 30, 50]"
        :page-size="form.size"
        layout="sizes, prev, pager, next, jumper"
        :total="creditcardrechange.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <Modal
      v-model="modal_fail"
      title="归档原因"
      width="30%"
      footer-hide
      class-name="vertical-center-modal"
      @on-cancel="cancelFail"
    >
      <div class="modal_tontent">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="归档原因">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item label="退款金额">
            <el-col :span="11">
              <el-input v-model="form.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="退款币种">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="退款原由">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </Modal>
  </div>
</template>
<script>
import creditCardRechargeTable from "./table/creditCardRechargeTable";
import { mapState } from "vuex";
export default {
  components: { creditCardRechargeTable },
  computed: {
    ...mapState({
      creditcardrechange: (state) =>
        state.financialManagement.creditcardrechange,
      creditcardstatus: (state) => state.commons.creditcardstatus,
      showButtons: (state) => state.creditCardRecharge.showButtons,
    }),
    key() {
      return this.$route.path;
    },
  },
  data() {
    return {
      radio: "",
      modal_fail: false,
      form: {
        creditcard: "",
        status: "",
        history_amount_max: "",
        history_amount_min: "",
        balance_max: "",
        balance_min: "",
        create_at: "",
        size: 10,
        page: 1,
      },
    };
  },
  created() {
    let id = this.$getMenuId(
      sessionStorage.getItem("munuIdList"),
      this.$route.path
    );
    this.$store.dispatch("creditCardRecharge/getButtonList", { id });
  },
  mounted() {
    this.getData();
    this.$store.dispatch("commons/getCreditcardstatus");
  },
  methods: {
    getData(data) {
      data ? (this.form.page = 1) : "";
      this.$store.dispatch(
        "financialManagement/getCreditcardrechange",
        this.form
      );
    },
    numberClick(data) {
      this.$router.push({
        name: "CreditCardRechargeEdit",
        query: {
          creditCardRechargeId: data.id,
        },
      });
    },
    onSubmit() {},
    addDemand() {
      this.modal_fail = true;
    },
    cancelFail() {
      this.modal_fail = false;
    },
    submitFail() {
      this.$router.push({ name: "AddDemand", query: "" });
    },
    selectionChange(data) {
      console.log(data);
    },
    submit() {},
    handleSizeChange(size) {
      let that = this;
      that.form.page = 1;
      that.form.size = size;
      that.getData();
    },
    handleCurrentChange(nowpage) {
      let that = this;
      that.form.page = nowpage;
      that.getData();
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/.numRange {
  display: flex;
}
/deep/.numRange > label {
  width: 136px !important;
}
</style>