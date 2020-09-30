<template>
  <div class="account-number">
    <el-card class="account-form">
      <el-form :inline="true" :model="form">
        <el-form-item label="规则状态:">
          <el-select v-model="form.data_type" filterable clearable placeholder="请选择">
            <el-option v-for="item in accounts" :key="item.id" :label="item.value" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="搜索类型:">
          <el-radio-group v-model="form.type">
            <el-radio label="item_id">item ID</el-radio>
            <el-radio label="title">规则名称</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="搜索内容:">
          <el-input v-model="form.keywords" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <processingQueueTable :tableData="task_list.data"></processingQueueTable>
    <div class="pagination-bottom">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes=" [10, 20, 50, 100]"
        :page-size="form.per_page_num"
        :current-page.sync="form.page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="task_list.total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import processingQueueTable from "./table/processingQueueTable";
import { mapState } from "vuex";
export default {
  components: { processingQueueTable },
  computed: {
    ...mapState({
      task_list: (state) => state.marketing.task_list,
    }),
  },
  data() {
    return {
      form: {
        rule_id: "",
        data_type: "",
        type: "",
        keywords: "",
        page: 1,
        per_page_num: 10,
      },
      radio: "1",
      accounts: [
        { id: "", value: "全部" },
        { id: "0", value: "处理中" },
        { id: "1", value: "处理成功" },
        { id: "2", value: "处理失败" },
      ],
    };
  },
  mounted() {
    let that = this;
    if(that.$route.query.rule_id){
      that.form.rule_id = that.$route.query.rule_id;
    }
    this.getData();
  },
  methods: {
    getData() {
      this.$store.dispatch("marketing/gettask_list", this.form);
    },
    // 获取分页size
    handleSizeChange(size) {
      this.form.per_page_num = size;
      this.getData();
    },
    // 获取分页请求的page的值
    handleCurrentChange(nowpage) {
      this.form.page = nowpage;
      this.getData();
    },
    onSubmit() {
      this.form.page = 1
      this.getData()
    },
  },
};
</script>
<style scoped>
.el-form-item {
  margin-bottom: 0px;
}
</style>