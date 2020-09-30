<template>
  <div class="data-syn-list margin10">
    <el-card class="syn-form">
      <el-form ref="form" :inline="true" :model="form " label-width="80px">
        <el-form-item label="SKU:" prop="sku">
          <el-input placeholder="请输入SKU" v-model="form.sku" clearable></el-input>
        </el-form-item>

        <el-form-item label="itemId:" prop="itemId">
          <el-input placeholder="请输入itemId" v-model="form.itemId" clearable></el-input>
        </el-form-item>

        <el-form-item label="店铺名：" prop="shop_id" style="100%">
          <el-select v-model="form.shop_id" filterable clearable placeholder="请选择店铺名" style="100%">
            <el-option
              v-for="item in shopList"
              :key="item.shop_id"
              :label="item.shop_name"
              :value="item.shop_id"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item label="产品状态:" prop="productStatus">
          <el-select v-model="form.productStatus" clearable placeholder="请选择产品状态">
            <el-option
              v-for="item in statusData"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>-->

        <el-form-item label="同步状态:" prop="syntStatus">
          <el-select v-model="form.syntStatus" clearable placeholder="请选择">
            <el-option
              v-for="item in pushStatus"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="同步事项:" prop="matter">
          <el-select v-model="form.matter" clearable placeholder="请选择同步事项">
            <el-option v-for="item in pushList" :key="item.id" :label="item.value" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="同步时间：" label-width="100px" prop="date">
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
    <div class="add-account-btn">
      <el-button
        size="small"
        type="primary"
        v-if="btnClass.syns"
        @click="bulkResynchronization"
      >批量重新同步</el-button>
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="item_id" label="itemId" align="center"></el-table-column>
        <el-table-column prop="sku" label="SKU" align="center"></el-table-column>
        <el-table-column prop="shop_name" label="店铺" align="center"></el-table-column>
        <el-table-column prop="online_status" label="产品状态" align="center"></el-table-column>
        <el-table-column prop="push_type" label="同步事项" align="center"></el-table-column>
        <el-table-column prop="change" label="修改前/修改后" align="center"></el-table-column>
        <el-table-column prop="updated_at" label="修改时间" align="center"></el-table-column>
        <el-table-column prop="push_date" label="同步时间" align="center"></el-table-column>
        <el-table-column label="同步状态" align="center">
          <template slot-scope="{row}">
            <span>{{row.push_status | transform}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="error_msg" label="失败原因" width="120" align="center">
          <template slot-scope="{row}">
            <el-popover placement="top-start" width="350" trigger="hover" :content="row.error_msg">
              <span slot="reference" style="color:#46a6ff" class="isOverflow Overflow">{{row.error_msg}}</span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80" align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.push_status == 2 && btnClass.syn"
              type="text"
              @click="resynchronize(scope.row)"
            >重新同步</el-button>
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
  </div>
</template>

<script>
export default {
  name: "DataSynList",
  components: {
    // AccountPopup
  },
  data() {
    return {
      form: {
        sku: "",
        itemId: "",
        shop_id: "",
        name: "",
        // productStatus: "",
        syntStatus: "",
        matter: "", // 同步事项
        founder: "",
        date: "",
      },
      shopList: [], //店铺
      statusData: [],
      pushList: [], //推送事项
      pushStatus: [], //推送状态
      tableData: [],
      page: {
        cureentPage: 1,
        size: 20,
        total: 0,
      },
      dataSynAll: [],
      tableHeight: null,
      showAccountPopup: false,
      // 暂存区
      recordCurrent: {},
      btnClass: {
        syns: false,
        syn: false,
      },
    };
  },
  created() {
    this.getshopsitecurrency();
    let id = this.$getMenuId(
      sessionStorage.getItem("munuIdList"),
      this.$route.path
    );
    this.getControlBtn(id);
  },
  mounted() {
    this.getList();
    this.tableHeight = _g.getAdaptiveHeight(
      this.tableHeight,
      this.$refs.table.$el,
      160
    );
  },
  methods: {
    handleSelectionChange(val) {
      this.dataSynAll = val;
    },
    getList() {
      if (this.form.date) {
        var createTimeStart = this.form.date[0];
        var createTimeEnd = this.form.date[1];
      }
      let formData = new FormData();
      formData.append("sku", this.form.sku);
      formData.append("item_id", this.form.itemId);
      formData.append("shop_id", this.form.shop_id);
      formData.append("push_status", this.form.syntStatus);
      formData.append("push_type", this.form.matter);
      formData.append("push_date_start", createTimeStart || "");
      formData.append("push_date_end", createTimeEnd || "");
      formData.append("page", this.page.cureentPage);
      formData.append("per_page_num", this.page.size);
      this.$axios.post(`/listing/data/list`, formData).then((res) => {
        this.tableData = res.data.list.data;
        this.page.total = res.data.list.total;
        // this.statusData = _g.searchField(res.data.productStatus);
        this.pushList = _g.searchField(res.data.pushList);
        this.pushStatus = _g.searchField(res.data.pushStatus);
        _g.scrollTop();
      });
    },
    getshopsitecurrency() {
      this.$axios.get(`/listing/prepublish/shopsitecurrency`).then((res) => {
        this.shopList = res.data.shops;
      });
    },

    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 批量重新同步
    bulkResynchronization() {
      if (!this.dataSynAll.length) {
        this.$message({
          message: "请先勾选数据列表!",
          type: "warning",
        });
        return;
      }

      let select = this.dataSynAll.filter((item) => item.push_status !== 2);
      if (select.length) {
        this.$message({
          message: "请选择同步失败的数据!",
          type: "warning",
        });
        return;
      }
      let formdata = new FormData();
      this.dataSynAll.forEach((data) => {
        formdata.append("id[]", data.id);
      });
      this.batchSyncRequest(formdata);
    },
    // 单个重新同步
    resynchronize(data) {
      let formdata = new FormData();
      formdata.append("id[]", data.id);
      this.batchSyncRequest(formdata);
    },
    batchSyncRequest(formdata) {
      this.$axios.post("/listing/manage/batch_sync", formdata).then((res) => {
        this.$message({
          message: res.msg,
          type: "success",
        });
      });
    },
    // // 回调账户弹窗
    // CallbackAccountPopup(from) {
    //   this.showAccountPopup = false;
    //   if (!from) {
    //     return false;
    //   }
    //   console.log(from);
    // },
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
    getControlBtn(id) {
      let params = {
        id,
      };
      this.$authHttp
        .get("/rest/auth/user/perms/buttons", { params })
        .then((res) => {
          res.data.buttonList.forEach((btn) => {
            this.btnClass[btn.key] = true;
          });
        });
    },
  },
  filters: {
    transform(val) {
      switch (val) {
        case 0:
          val = "待同步";
          break;
        case 1:
          val = "同步成功";
          break;
        case 2:
          val = "同步失败";
          break;
      }
      return val;
    },
  },
};
</script>


<style  scoped>
.account-number {
  /* background-color: #ddd; */
}
.account-form {
}
.account-form :after {
  content: "";
  display: block;
  clear: both;
}
.add-account-btn {
  margin: 10px 0;
}
</style>