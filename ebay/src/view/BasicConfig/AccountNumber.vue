<template>
  <div class="account-number margin10">
    <el-card class="account-form">
      <el-form ref="accountForm" :inline="true" :model="accountForm" label-width="80px">
        <el-form-item label="账号名:" prop="name">
          <el-select v-model="accountForm.name" filterable clearable placeholder="请选择">
            <el-option
              v-for="item in accounts"
              :key="item.id"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态:" prop="status">
          <el-select v-model="accountForm.status" placeholder="请选择">
            <el-option
              v-for="item in statusData"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="创建人:" prop="founder">
          <el-select v-model="accountForm.founder" placeholder="请选择">
            <el-option
              v-for="item in sellerlistData"
              :key="item.staff_id"
              :label="item.staff_name"
              :value="item.staff_id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="创建时间:" label-width="80px" prop="date">
          <el-date-picker
            v-model="accountForm.date"
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
            <el-button size="small" @click="resetForm('accountForm')">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
    <div class="add-account-btn">
      <el-button
        size="small"
        type="primary"
        v-if="btnClass.new"
        accountNumber
        @click="addAccount"
      >新增账号</el-button>
    </div>
    <div class="account-tab">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        ref="table"
        :height="tableHeight"
        :row-style="{height:'40px'}"
        :cell-style=" {padding:'0px'}"
      >
        <el-table-column prop="account_name" label="账号名" align="center"></el-table-column>
        <el-table-column prop="token" label="token" align="center" width="300">
          <template slot-scope="{row}">
            <span class="isOverflow">{{row.token }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="80" align="center">
          <template slot-scope="{row}">
            <span>{{row.status == 1 ? '启用':'禁用'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="paypal" label="Paypal账号" align="center"></el-table-column>
        <el-table-column prop="seller_name" label="销售员" width="120" align="center"></el-table-column>
        <el-table-column prop="shop_name" label="店铺名" align="center"></el-table-column>
        <el-table-column prop="creator_name" label="创建人" align="center"></el-table-column>
        <el-table-column prop="created_at" label="创建时间" align="center"></el-table-column>
        <el-table-column label="操作" width="80" align="center">
          <template slot-scope="scope">
            <!-- :accountNumber="scope.row.isProtected == 1" -->
            <el-button type="text" v-if="btnClass.edit" @click="editAccount(scope.row)">编辑</el-button>
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
    <AccountPopup
      v-if="showAccountPopup"
      :showAccountPopup="showAccountPopup"
      :recordCurrent="recordCurrent"
      :sellerlistData="sellerlistData"
      @on-open-sesion-btn="CallbackAccountPopup"
    ></AccountPopup>
  </div>
</template>

<script>
import AccountPopup from "./components/AccountPopup.vue";

export default {
  name: "AccountNumber",
  components: {
    AccountPopup
  },
  data() {
    return {
      accountForm: {
        name: "",
        status: "",
        founder: "",
        date: ""
      },

      accounts: [],
      sellerlistData: [],
      statusData: [
        {
          id: 1,
          value: "启用"
        },
        {
          id: 0,
          value: "禁用"
        }
      ],
      tableData: [],
      page: {
        total: 0,
        size: 50,
        cureentPage: 1
      },
      tableHeight: "450px",
      showAccountPopup: false,
      // 暂存区
      recordCurrent: {},
      btnClass: {
        new: false,
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
    this.getSellerlist();
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
      if (this.accountForm.date) {
        var createTimeStart = this.accountForm.date[0];
        var createTimeEnd = this.accountForm.date[1];
      }
      let params = {
        page: this.page.cureentPage,
        per_page_num: this.page.size,
        account_name: this.accountForm.name,
        account_status: this.accountForm.status,
        creator_id: this.accountForm.founder,
        created_at_start: createTimeStart || "",
        created_at_end: createTimeEnd || ""
      };
      this.$axios.get(`/listing/account/list`, { params }).then(res => {
        this.page.total = res.data.account_list.total;
        this.tableData = res.data.account_list.data;
        let arr = [];
        res.data.accounts.forEach((item, index) => {
          arr.push({
            id: index,
            value: item
          });
        });
        this.accounts = arr;
        _g.scrollTop();
      });
    },
    // 获取下拉销售员
    getSellerlist() {
      this.$axios.get(`/listing/info/staff/sellerlist`).then(res => {
        this.sellerlistData = res.data;
      });
    },
    // 获取分页size
    handleSizeChange(size) {
      this.page.cureentPage = 1;
      this.page.size = size;
      this.getList();
    },
    // 获取分页请求的page的值
    handleCurrentChange(nowpage) {
      this.page.cureentPage = nowpage;
      this.getList();
    },
    // 搜索表单
    submitForm() {
      this.page.cureentPage = 1;
      this.getList();
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 打开新建账号弹窗
    addAccount() {
      this.$set(this.recordCurrent, "title", "新增账号");
      this.showAccountPopup = true;
    },
    // 编辑账号
    editAccount(item) {
      let params = {
        account_id: item.id
      };
      let data = {};
      this.$axios.get("/listing/account/accountinfo", { params }).then(res => {
        this.$set(data, "title", "编辑账号");
        this.$set(data, "account_name", res.data[0].account_name);
        this.$set(data, "oss_url", res.data[0].oss_url);
        this.$set(data, "dev_id", res.data[0].dev_id);
        this.$set(data, "cert_id", res.data[0].cert_id);
        this.$set(data, "app_id", res.data[0].app_id);
        this.$set(data, "seller_id", res.data[0].seller_id);
        this.$set(data, "token", res.data[0].token);
        this.$set(data, "shop_name", res.data[0].shop_name);
        this.$set(data, "paypal", res.data[0].paypal);
        this.$set(data, "status", res.data[0].status);
        this.$set(data, "account_id", res.data[0].account_id);
        this.recordCurrent = data;
        this.showAccountPopup = true;
      });
    },
    // 回调账户弹窗
    CallbackAccountPopup(from) {
      this.showAccountPopup = false;
      if (!from) {
        return false;
      }
      if (from.code == 1) {
        this.$axios
          .put(
            `/listing/account/add?account_name=${from.form.account_name}&token=${from.form.token}&status=${from.form.statusCode}&paypal=${from.form.paypal}&seller_id=${from.form.seller_id}&shop_name=${from.form.shop_name}&app_id=${from.form.app_id}&dev_id=${from.form.dev_id}&oss_url=${from.form.oss_url}&cert_id=${from.form.cert_id}`
          )
          .then(res => {
            this.$message({
              message: res.msg,
              type: "success",
              duration: 5 * 1000
            });
            this.getList();
          });
      } else {
        let formdata = new FormData();
        formdata.append("account_id", from.form.account_id);
        formdata.append("account_name", from.form.account_name);
        formdata.append("token", from.form.token);
        formdata.append("status", from.form.statusCode);
        formdata.append("paypal", from.form.paypal);
        formdata.append("seller_id", from.form.seller_id);
        formdata.append("shop_name", from.form.shop_name);
        formdata.append("app_id", from.form.app_id);
        formdata.append("dev_id", from.form.dev_id);
        formdata.append("cert_id", from.form.cert_id);
        formdata.append("oss_url", from.form.oss_url);

        this.$axios.post(`/listing/account/edit`, formdata).then(res => {
          this.$message({
            message: res.msg,
            type: "success",
            duration: 5 * 1000
          });
          this.getList();
        });
      }
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


<style  scoped>
.account-form :after {
  content: "";
  display: block;
  clear: both;
}
.add-account-btn {
  margin: 10px 0;
}
</style>