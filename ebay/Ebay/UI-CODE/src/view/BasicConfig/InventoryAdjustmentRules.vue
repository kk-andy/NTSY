<template>
  <div class="inventory-adjustment-rules margin10">
    <el-card class="inventory-adjustment-rules-form">
      <el-form ref="form" :model="form" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="规则名称：" prop="rule_name">
                <el-input placeholder="请输入规则名称" v-model="form.rule_name" clearable></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="创建人：" prop="create_user">
                <el-select v-model="form.create_user" filterable clearable placeholder="请选择创建人">
                  <el-option
                    v-for="item in userData"
                    :key="item.staff_id"
                    :label="item.staff_name"
                    :value="item.staff_id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="9">
            <div class="grid-content bg-purple">
              <el-form-item label="创建时间：" label-width="100px" prop="date">
                <el-date-picker
                  v-model="form.date"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <div class="search-reset-btn">
          <el-form-item>
            <el-button size="small" type="primary" @click="submitForm()">搜索</el-button>
            <el-button size="small" @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
    <div class="add-account-btn">
      <el-button size="small" type="primary" v-if="btnClass.new" @click="addRule">新增规则</el-button>
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
        :default-sort="{prop: 'createdTime', order: 'descending'}"
      >
        <el-table-column type="index" width="50" align="center"></el-table-column>
        <el-table-column prop="rule_name" label="规则名称" align="center"></el-table-column>
        <el-table-column prop="shop_name" label="店铺名称" align="center"></el-table-column>
        <el-table-column prop="actual" label="实际库存区间" align="center">
          <template slot-scope="{row}">
            <span>{{row.stock_min}}</span> ——
            <span>{{row.stock_max}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="onLine" label="线上库存区间" align="center">
          <template slot-scope="{row}">
            <span>{{row.online_stock_min}}</span> ——
            <span>{{row.online_stock_max}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="stock_change" label="库存修改结果" width="120" align="center"></el-table-column>
        <el-table-column prop="create_user" label="创建人" align="center"></el-table-column>
        <el-table-column prop="created_at" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="update_user" label="修改人" align="center"></el-table-column>
        <el-table-column prop="updated_at" label="修改时间" align="center"></el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="text" v-if="btnClass.edit" @click="editRule(scope.row)">编辑</el-button>
            <el-button type="text" v-if="btnClass.del" class="danger" @click="delRule(scope.row)">删除</el-button>
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
    <InventoryAdjustmentPopup
      v-if="showRulePopup"
      :showRulePopup="showRulePopup"
      :recordCurrent="recordCurrent"
      :storelist="storelist"
      :shopsList="shopsList"
      @on-open-sesion-btn="CallbackRulePopup"
    ></InventoryAdjustmentPopup>
  </div>
</template>

<script>
import InventoryAdjustmentPopup from "./components/InventoryAdjustmentPopup.vue";

export default {
  name: "InventoryAdjustmentRules",
  components: {
    InventoryAdjustmentPopup
  },
  data() {
    return {
      form: {
        rule_name: "",
        create_user: "",
        date: ""
      },
      storelist: [],
      shopsList: [],
      userData: [],

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
        cureentPage: 1,
        size: 20,
        total: 0
      },
      tableHeight: null,
      showRulePopup: false,
      // 暂存区
      recordCurrent: {},
      btnClass: {
        new: false,
        edit: false,
        del: false
      }
    };
  },
  created() {
    let id = this.$getMenuId(
      sessionStorage.getItem("munuIdList"),
      this.$route.path
    );
    this.getList();
    this.getStorelist();
    this.getshopsitecurrency();
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
        page: this.page.cureentPage,
        per_page_num: this.page.size,
        rule_name: this.form.rule_name,
        create_user: this.form.create_user,
        start_time: createTimeStart || "",
        end_time: createTimeEnd || ""
      };
      this.$axios.get(`/listing/config/stock/list`, { params }).then(res => {
        this.page.total = res.data.list.total;
        this.tableData = res.data.list.data;
        this.userData = res.data.select.user;
        _g.scrollTop();
      });
    },
    // 获取仓库数据列表
    getStorelist() {
      this.$axios.get(`/listing/info/store/storelist`).then(res => {
        this.storelist = res.data;
      });
    },
    //获取店铺/站点/货币数据列表
    getshopsitecurrency() {
      this.$axios.get(`/listing/prepublish/shopsitecurrency`).then(res => {
        this.shopsList = res.data.shops;
      });
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
    // 打开新建规则弹窗
    addRule() {
      this.$set(this.recordCurrent, "title", "新增库存调整规则");
      this.showRulePopup = true;
    },
    // 编辑规则
    editRule(data) {
      this.$set(data, "title", "编辑库存调整规则");
      this.recordCurrent = data;
      this.showRulePopup = true;
    },
    // 删除规则
    delRule(data) {
      let params = {
        id: data.id
      };
      _g.confirmMsg("warning", "提示", "确定要删除该条规则吗?", () => {
        this.$axios
          .get("/listing/config/stock/delete", { params })
          .then(res => {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getList();
          });
      });
    },
    // 回调账户弹窗
    CallbackRulePopup(data) {
      let { form, code } = data;
      if (!form) {
        this.showRulePopup = false;
        return false;
      }
      let formdata = new FormData();
      for (let i = 0; i < form.warehouse.length; i++) {
        formdata.append("store_ids[]", form.warehouse[i]); //仓库数组格式
      }
      for (let i = 0; i < form.shop_name.length; i++) {
        formdata.append("shop_id[]", form.shop_name[i]); //仓库数组格式
      }
      formdata.append("rule_name", form.rule_name); // 规则名称
      // formdata.append("shop_id", form.shop_name); //店铺id
      formdata.append("stock_min", form.stock_min); //实际库存区间下限
      formdata.append("stock_max", form.stock_max); //实际库存区间上限
      formdata.append("online_stock_min", form.online_stock_min); //线上库存区间下限
      formdata.append("online_stock_max", form.online_stock_max); //线上库存区间上限
      formdata.append("stock_change", form.stock_change); //库存变动
      formdata.append("country", form.country); //库存变动
      if (code) {
        this.$axios.post("/listing/config/stock/add", formdata).then(res => {
          this.$message({
            message: "新增成功",
            type: "success"
          });
          this.getList();
          this.showRulePopup = false;
        });
      } else {
        formdata.append("id", form.id); //rule_id
        this.$axios.post("/listing/config/stock/update", formdata).then(res => {
          this.$message({
            message: "编辑成功",
            type: "success"
          });
          this.getList();
          this.showRulePopup = false;
        });
      }
    },
    // 获取分页size
    handleSizeChange(size) {
      this.page.size = size;
      this.page.cureentPage = 1;
      this.getList();
    },
    // 获取分页请求的page的值
    handleCurrentChange(nowpage) {
      this.page.cureentPage = nowpage;
      this.getList();
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
.account-number {
  /* background-color: #ddd; */
}
.danger {
  color: rgb(245, 108, 108);
}
.inventory-adjustment-rules-form:after {
  content: "";
  display: block;
  clear: both;
}

.add-account-btn {
  margin: 10px 0;
}
</style>







