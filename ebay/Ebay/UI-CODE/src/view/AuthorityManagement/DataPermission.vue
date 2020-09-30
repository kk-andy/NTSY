<template>
  <div class="data-permission margin10">
    <el-card class="inventory-adjustment-rules-form">
      <el-form ref="form" :inline="true" :model="form" label-width="100px">
        <el-form-item label="用户名：" prop="name">
          <el-select v-model="form.name" filterable clearable placeholder="请选择用户">
            <el-option
              v-for="item in sellerList"
              :key="item.staff_id"
              :label="item.staff_name"
              :value="item.staff_id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="店铺名：" prop="store">
          <el-select v-model="form.store" filterable clearable placeholder="请选择店铺名">
            <el-option
              v-for="item in storeNameData"
              :key="item.shop_id"
              :label="item.shop_name"
              :value="item.shop_id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="修改时间：" prop="date">
          <el-date-picker
            v-model="form.date"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <div class="search-reset-btn">
          <el-form-item>
            <el-button size="small" type="primary" @click="submitForm()">搜索</el-button>
            <el-button size="small" @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
    <div class="permission-tab margin-tb20">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        ref="table"
        :height="tableHeight"
        :row-style="{height:'40px'}"
        :cell-style=" {padding:'0px'}"
        :default-sort="{prop: 'updatedTime', order: 'descending'}"
      >
        <el-table-column prop="staff_name" label="用户名" align="center"></el-table-column>
        <el-table-column prop="shop_id" label="店铺" align="center"></el-table-column>
        <el-table-column prop="edit_user" label="修改人" align="center"></el-table-column>
        <el-table-column prop="updated_at" label="修改时间" align="center" sortable></el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="text" v-if="btnClass.edit" @click="editPermission(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-bottom">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes=" [10, 20, 50, 100]"
        :current-page.sync="page.cureentPage"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
    </div>
    <PermissionPopup
      v-if="showPermissionPopup"
      :showPermissionPopup="showPermissionPopup"
      :recordCurrent="recordCurrent"
      @on-open-sesion="callbackPopup"
    ></PermissionPopup>
  </div>
</template>

<script>
import PermissionPopup from "./components/DataPermissionPopup.vue";

export default {
  name: "DataPermission",
  components: {
    PermissionPopup
  },
  data() {
    return {
      showPermissionPopup: false,
      form: {
        name: "",
        store: "",
        date: ""
      },
      storeNameData: [],
      sellerList: [],
      tableData: [],
      page: {
        cureentPage: 1,
        size: 20,
        total: 0
      },
      tableHeight: null,
      // 暂存区
      recordCurrent: {},
      btnClass: {
        edit: false
      }
    };
  },
  created() {
    let id = this.$getMenuId(
      sessionStorage.getItem("munuIdList"),
      this.$route.path
    );
    this.getList();
    this.getshopsitecurrency();
    this.getSellerList();
    this.getControlBtn(id);
  },
  mounted() {
    this.tableHeight = _g.getAdaptiveHeight(
      this.tableHeight,
      this.$refs.table.$el,
      160
    );
  },
  methods: {
    getList() {
      if (this.form.date) {
        var createTimeStart = this.form.date[0];
        var createTimeEnd = this.form.date[1];
      }
      let params = {
        staff_id: this.form.name,
        account_id: this.form.store,
        update_at_start: createTimeStart || "",
        update_at_end: createTimeEnd || "",
        per_page_num: this.page.size,
        page: this.page.cureentPage
      };
      this.$axios.get(`/listing/authshop/list`, { params }).then(res => {
        this.page.total = res.data.auth_list.total;
        this.tableData = res.data.auth_list.data;
        _g.scrollTop();
      });
    },
    getshopsitecurrency() {
      this.$axios.get(`/listing/prepublish/shopsitecurrency`).then(res => {
        this.storeNameData = res.data.shops;
      });
    },
    getSellerList() {
      this.$axios.get(`/listing/info/staff/sellerlist`).then(res => {
        this.sellerList = res.data;
      });
    },
    // 搜索表单
    submitForm() {
      this.getList();
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //新增模板
    addTemplate() {},
    // 编辑模板
    editPermission(data) {
      let params = {
        seller_id: data.staff_id
      };
      this.$axios.get(`/listing/authshop/authinfo`, { params }).then(res => {
        res.data.shopList.forEach(shop => {
          this.$set(shop, "select", false);
          res.data.info.forEach(item => {
            if (item.shop_id == shop.id) {
              this.$set(shop, "select", true);
            }
          });
        });
        this.$set(data, "title", "店铺");
        this.$set(data, "shopList", res.data.shopList);
        this.recordCurrent = data;
        this.showPermissionPopup = true;
      });
    },
    // 获取分页size
    handleSizeChange(size) {
      this.page.size = size;
      this.getList();
    },
    // 获取分页请求的page的值
    handleCurrentChange(nowpage) {
      this.page.cureentPage = nowpage;
      this.getList();
    },
    // 弹窗回调
    callbackPopup(data) {
      console.log(data);
      if (!data) {
        this.showPermissionPopup = false;
        return false;
      }
      let arr = [];
      data.shopList.forEach(shop => {
        if (shop.select) {
          arr.push(shop.id);
        }
      });

      if (!arr.length) {
        this.$message({
          message: "请至少选择一个店铺!",
          type: "warning"
        });
        return false;
      }
      let formdata = new FormData();
      //模板信息
      formdata.append("seller_id", data.staff_id);
      for (var i = 0; i < arr.length; i++) {
        formdata.append("shops[]", arr[i]);
      }
      this.$axios.post("/listing/authshop/edit", formdata).then(res => {
        this.getList();
        this.$message({
          message: "编辑成功",
          type: "success"
        });
        this.showPermissionPopup = false;
      });
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
    }
  }
};
</script>





