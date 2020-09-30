<template>
  <div class="account-number">
    <el-card class="account-form">
      <el-form ref="accountForm" :inline="true" :model="form">
        <el-form-item label="店铺账号:" prop="name">
          <el-select
            v-model="form.shop_id"
            placeholder="请选择"
            @change="shopChange"
          >
            <el-option
              v-for="item in shop_list"
              :key="item.shop_id"
              :label="item.shop_name"
              :value="item.shop_id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="btnBox">
        <div>说明！ 当一个产品同时属于多个规则时，优先执行级别较高的规则</div>
        <el-button type="primary" @click="createMarketing"  v-if="btnClass.createMarketing">创建关联营销</el-button>
      </div>
    </el-card>
    <relatedMarketingTable
      :tableData="rule_list.data"
      :btnClass="btnClass"
      @editClick="editClick"
      @delectClick="delectClick"
      @relatedProduct="relatedProduct"
    ></relatedMarketingTable>
    <div class="pagination-bottom">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes=" [10, 20, 50, 100]"
        :current-page.sync="form.page"
        :page-size="form.per_page_num"
        layout="total, sizes, prev, pager, next, jumper"
        :total="rule_list.total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import relatedMarketingTable from "./table/relatedMarketingTable";
import { mapState } from "vuex";
export default {
  name: "RelatedMarketing",
  computed: {
    ...mapState({
      shop_list: (state) => state.marketing.shop_list,
      rule_list: (state) => state.marketing.rule_list,
    }),
    form: {
      get() {
        return this.$store.state.marketing.form;
      },
      set(val) {
        this.$store.state.marketing.form = val;
      },
    },
  },
  components: { relatedMarketingTable },
  data() {
    return {
      accounts: [],
      page: {
        cureentPage: 1,
        size: 10,
        total: 10,
      },
      btnClass: {
        createMarketing: false,
        editClick: false,
        delectClick: false
      }
    };
  },
  watch: {
    "form.shop_id": {
      handler(val) {
        if (val) {
          this.shopChange();
        }
      },
      immediate: true,
    },
  },
  created() {
    let id = this.$getMenuId(
      sessionStorage.getItem("munuIdList"),
      this.$route.path
    );
    this.getControlBtn(id)
  },
  mounted() {
    this.$store.dispatch("marketing/getshop_list");
  },
  activated() {
    if (this.form.shop_id) {
      this.$store.dispatch("marketing/getrule_list", this.form);
    }
  },
  methods: {
    // 店铺选择
    shopChange(item) {
      this.$store.dispatch("marketing/getrule_list", this.form);
    },
    getControlBtn(id) {
      let params = {
        id
      };
      this.$authHttp
        .get("/rest/auth/user/perms/buttons", { params })
        .then(res => {
          res.data.buttonList.forEach(btn => {
            this.btnClass[btn.key] = true;
          });
        });
    },
    // 创建关联营销
    createMarketing() {
      this.$router.push({
        name: "CreateMarketing",
        query: {
          create: 0,
        },
      });
    },
    // 点击关联产品数量
    relatedProduct(item) {
      this.$router.push({
        name: "ProcessingQueue",
        query: {
          rule_id: item.rule_id,
          // shop_id:item.shop_id,
        },
      });
    },
    // 表格编辑
    editClick(item) {
      this.$router.push({
        name: "CreateMarketing",
        query: {
          rule_id: item.rule_id,
          shop_id: item.shop_id,
          create: 1,
        },
      });
    },
    // 表格删除
    delectClick(item) {
      let data = {
        shop_id: item.shop_id,
        rule_id: item.rule_id,
      };
      let query = this.form;
      this.$store.dispatch("marketing/deleteRule", { data, query });
    },
    // 获取分页size
    handleSizeChange(size) {
      this.form.per_page_num = size;
      this.shopChange();
    },
    // 获取分页请求的page的值
    handleCurrentChange(nowpage) {
      this.form.page = nowpage;
      this.shopChange();
    },
  },
};
</script>
<style scoped>
.btnBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: red;
}
</style>