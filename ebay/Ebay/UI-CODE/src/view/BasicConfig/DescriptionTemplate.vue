<template>
  <div class="description-template margin10">
    <el-card class="inventory-adjustment-rules-form">
      <el-form ref="form" :inline="true" :model="form">
        <el-form-item label="模板名称：" prop="name">
          <el-input placeholder="请输入模板名称" v-model="form.name" clearable></el-input>
        </el-form-item>

        <el-form-item label="店铺：" prop="store">
          <el-select
            v-model="form.store"
            style="width:250px"
            filterable
            clearable
            placeholder="请选择店铺"
          >
            <el-option
              v-for="shop in shopsitecurrency.shops"
              :key="shop.shop_id"
              :label="shop.shop_name"
              :value="shop.shop_id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="创建人：" prop="creator">
          <el-select v-model="form.creator" filterable clearable placeholder="请选择创建人">
            <el-option
              v-for="item in sellerlistData"
              :key="item.staff_id"
              :label="item.staff_name"
              :value="item.staff_id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="创建时间：" prop="date">
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
    <div class="add-template-btn">
      <el-button
        size="small"
        type="primary"
        v-if="btnClass.new"
        @click="jump('/basicConfig/addTemplate','')"
      >新增模板</el-button>
    </div>
    <div class="description-tab">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        ref="table"
        :height="tableHeight"
        :row-style="{height:'40px'}"
        :cell-style=" {padding:'0px'}"
      >
        <el-table-column prop="template_name" label="模板名称" align="center"></el-table-column>
        <el-table-column prop="thumbnail" label="缩略图" align="center">
          <template slot-scope="scope">
            <!-- {{scope.row.thumbnail}} -->
            <img
              :src="scope.row.icon"
              alt
              style="width:80px; text-align:center;
            margin-top:10px"
            />
          </template>
        </el-table-column>
        <el-table-column prop="shop" label="店铺" align="center"></el-table-column>
        <el-table-column prop="stock_max" label="创建人" align="center"></el-table-column>
        <el-table-column prop="create_at" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="modify_user" label="修改人" align="center"></el-table-column>
        <el-table-column prop="update_at" label="修改时间" align="center"></el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              v-if="btnClass.edit"
              @click="jump('/basicConfig/editTemplate',scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              v-if="btnClass.attr"
              @click="jump('/basicConfig/attrTemplate',scope.row)"
            >属性</el-button>
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
import { mapState, mapGetters } from "vuex";
import { getCommonsList } from "@/api/listing";
export default {
  name: "DescriptionTemplate",
  components: {},
  computed: {
    ...mapGetters(['ebayURL'])
  },
  data() {
    return {
      form: {
        name: "",
        store: "",
        creator: "",
        date: ""
      },
      shopsitecurrency: [],
      sellerlistData: [],

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
        new: false,
        edit: false,
        attr: false
      }
    };
  },
  created() {
    let id = this.$getMenuId(sessionStorage.getItem('munuIdList'), this.$route.path)
    this.getSellerlist();
    this.getshopsitecurrency();
    this.getList();
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
        shop_id: this.form.store,
        create_user: this.form.creator,
        template_name: this.form.name,
        created_at_start: createTimeStart || "",
        created_at_end: createTimeEnd || ""
      };
      this.$axios
        .get(`/listing/config/template/list`, {
          params
        })
        .then(res => {
          this.tableData = res.data.list.data;
          this.page.total = res.data.list.total;
        });
    },

    // 获取下拉销售员
    getSellerlist() {
      this.$axios.get(`/listing/info/staff/sellerlist`).then(res => {
        this.sellerlistData = res.data;
      });
    },
    // 获取店铺/站点/货币
    getshopsitecurrency() {
      this.$axios.get(`/listing/prepublish/shopsitecurrency`).then(res => {
        this.shopsitecurrency = res.data;
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
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
    jump(val, item) {
      let str
      let tokenAndID = this.$getTokenAndID()
      if (item) {
        str = `${this.ebayURL}${val}?${tokenAndID}&templateId=${ item.id }`
      } else {
        str = `${this.ebayURL}${val}?${tokenAndID}`
      }
      window.open(str)
      // this.$router.push({
      //   path: val,
      //   query: {
      //     id: item.id
      //   }
      // });
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


<style >
.inventory-adjustment-rules-form {
  display: block;
  margin-bottom: 50px;
}
</style>