<template>
  <div class="account-number">
    <el-card class="account-form">
      <el-form :inline="true" :model="form">
        <el-form-item label="站点:">
          <el-select v-model="form.site" filterable clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in site_list"
              :key="item+index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="搜索类型:">
          <el-radio-group v-model="form.type" @change="radioChange">
            <el-radio label="item_id">item ID</el-radio>
            <el-radio label="title">标题</el-radio>
            <el-radio label="sku">SKU</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="搜索内容:">
          <el-input v-model="form.keywords" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button @click="goback">返回</el-button>
          <el-button type="success" @click="batchAdd">批量添加</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <designatedProductTable
      :tableData="item_list.data"
      @addClick="addClick"
      @delectClick="delectClick"
      @handleSelectionChange="handleSelectionChange"
    ></designatedProductTable>
    <div class="pagination-bottom">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes=" [10, 20, 50, 100]"
        :current-page.sync="form.page"
        :page-size="form.per_page_num"
        layout="total, sizes, prev, pager, next, jumper"
        :total="item_list.total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import designatedProductTable from "./table/designatedProductTable";
import { change_listings } from "@/api/marketing";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      site_list: (state) => state.marketing.site_list,
      listing_id: (state) => state.marketing.listing_ids,
      item_list: (state) => state.marketing.item_list,
    }),
  },
  components: { designatedProductTable },
  data() {
    return {
      form: {
        identify: "",
        list_type: "",
        rule_id: "",
        shop_id: "",
        site: "",
        type: "",
        keywords: "",
        page: 1,
        per_page_num: 10,
      },
      selectedList: [],
    };
  },
  mounted() {
    let that = this;
    that.form.shop_id = that.$route.query.shopId;
    that.form.rule_id = that.$route.query.rule_id;
    that.form.list_type = that.$route.query.list_type;
    switch (that.$route.query.list_type) {
      case 0:
        that.form.identify = JSON.parse(
          sessionStorage.getItem("rangeListing_ids")
        );
        // sessionStorage.removeItem("rangeListing_ids");
        break;
      case 1:
        that.form.identify = JSON.parse(
          sessionStorage.getItem("aboveListing_ids")
        );
        // sessionStorage.removeItem("aboveListing_ids");
        break;
      case 2:
        that.form.identify = JSON.parse(
          sessionStorage.getItem("belowListing_ids")
        );
        // sessionStorage.removeItem("belowListing_ids");
        break;
    }
    that.$store.dispatch("marketing/getsite_list", {
      shop_id: that.$route.query.shopId,
    });
    that.onSubmit();
  },
  methods: {
    // 批量添加按钮
    batchAdd() {
      let that = this;
      let listing = that.listing_id;
      let selectedList = that.selectedList;
      selectedList.forEach((item) => {
        listing.push(item.listing_id);
      });
      let list = Array.from(new Set(listing));
      change_listings({
        listing_id: list,
        identify: that.form.identify,
      }).then((res) => {
        if (res.code == 0) {
          that.form.identify = res.data.identify;
          that.onSubmit();
        }
      });
    },
    // 表格选中
    handleSelectionChange(item) {
      this.selectedList = item;
    },
    // 返回上一页
    goback() {
      let that = this;
      switch (that.$route.query.list_type) {
        case 0:
          sessionStorage.setItem(
            "rangeIdentify",
            JSON.stringify(that.form.identify)
          );
          break;
        case 1:
          sessionStorage.setItem(
            "aboveIdentify",
            JSON.stringify(that.form.identify)
          );
          break;
        case 2:
          sessionStorage.setItem(
            "belowIdentify",
            JSON.stringify(that.form.identify)
          );
          break;
      }
      this.$router.push({
        name:'CreateMarketing',
        query:{
          create:2,
        }
      });
    },
    // 表格添加
    addClick(item) {
      let that = this;
      let listing = this.listing_id;
      listing.push(item.listing_id);
      change_listings({
        listing_id: listing,
        identify: that.form.identify,
      }).then((res) => {
        if (res.code == 0) {
          that.form.identify = res.data.identify;
          that.onSubmit();
        }
      });
    },
    // 表格移除
    delectClick(item) {
      let that = this;
      let listing = that.listing_id;
      listing.splice(
        listing.findIndex((data) => data === item.listing_id),
        1
      );
      change_listings({
        listing_id: listing,
        identify: that.form.identify,
      }).then((res) => {
        if (res.code == 0) {
          that.form.identify = res.data.identify;
          that.onSubmit();
        }
      });
    },
    // 获取分页size
    handleSizeChange(size) {
      this.form.per_page_num = size;
      this.getList();
    },
    // 获取分页请求的page的值
    handleCurrentChange(nowpage) {
      this.form.page = nowpage;
      this.getList();
    },
    radioChange(item) {
      let that = this;
      switch (item) {
        case "sku":
          that.$message("多个SKU时用逗号隔开");
          break;
        case "item_id":
          that.$message("多个item ID时用逗号隔开");
          break;
      }
    },
    onSubmit() {
      this.$store.dispatch("marketing/getitem_list", this.form);
    },
  },
};
</script>
<style scoped>
.el-form-item {
  margin-bottom: 0px;
}
</style>