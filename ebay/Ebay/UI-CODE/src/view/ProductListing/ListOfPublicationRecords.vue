<template>
  <div class="List-of-publication-records margin10">
    <div class="publication-records-form">
      <el-card>
        <el-form
          :inline="true"
          ref="form"
          :model="form"
          label-width="110px"
          class="demo-form-inline"
        >
          <el-form-item label="SKU：" prop="sku">
            <el-input clearable v-model="form.sku" placeholder="请输入SKU"></el-input>
          </el-form-item>
          <el-form-item clearable label="标题：" prop="title">
            <el-input clearable v-model="form.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="产品线：" prop="productLine">
            <el-select clearable v-model="form.productLine" placeholder="请选择产品线">
              <el-option
                v-for="shop in productCategoryList "
                :key="shop.id"
                :label="shop.category_name"
                :value="shop.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="刊登类型：" prop="publishType">
            <el-select clearable v-model="form.publishType" placeholder="请选择刊登类型">
              <el-option label="拍卖" :value="0"></el-option>
              <el-option label="固定价格" :value="1"></el-option>
              <el-option label="多属性" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="是否已刊登:" prop="shelfStatus" label-width="100px">
            <el-select v-model="form.shelfStatus" placeholder="请选择">
              <el-option label="未刊登" :value="0"></el-option>
              <el-option label="已刊登" :value="1"></el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item label="刊登店铺：" prop="shop">
            <el-select clearable v-model="form.shop" filterable placeholder="请选择">
              <el-option
                v-for="shop in shopList "
                :key="shop.shop_id"
                :label="shop.shop_name"
                :value="shop.shop_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="刊登状态：" prop="publishStatus">
            <el-select clearable v-model="form.publishStatus" placeholder="请选择">
              <el-option label="待刊登" :value="0"></el-option>
              <el-option label="刊登成功" :value="1"></el-option>
              <el-option label="刊登失败" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="刊登时间："  prop="date">
            <el-date-picker
              v-model="form.date"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="定时发布时间："  prop="datePlan">
            <el-date-picker
              v-model="form.datePlan"
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
          v-if="btnClass.syns"
          type="primary"
          @click="bulkResynchronization"
        >批量重新同步</el-button>
      </div>
      <div class="publication-tab">
        <el-table
          :data="tableData"
          border
          style="width: 100%;margin-top:10px"
          ref="table"
          tooltip-effect="dark"
          :height="tableHeight"
          :row-style="{height:'40px'}"
          :cell-style=" {padding:'0px'}"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <el-table-column prop="title" label="标题" align="center" show-overflow-tooltip>
            <template slot-scope="{row}">
              <div class="isOverflow">
                <span>{{row.title}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="item_id" label="itemId" align="center"></el-table-column>
          <el-table-column prop="product_sku" label="SKU" align="center"></el-table-column>
          <el-table-column label="缩略图" align="center" width="100">
            <template slot-scope="scope">
              <img
                :src="scope.row.thumbnail"
                alt
                style="width:80px; text-align:center; margin-top:10px"
              />
            </template>
          </el-table-column>
          <el-table-column prop="cat_id_one_name" label="产品线" align="center"></el-table-column>
          <el-table-column label="刊登类型" align="center">
            <template slot-scope="{row}">
              <span>{{row.sell_type | transformType}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="push_date" label="刊登时间" align="center"></el-table-column>
          <el-table-column prop="plan_update" label="定时发布时间" align="center"></el-table-column>
          <el-table-column label="刊登店铺" align="center">
            <template slot-scope="{row}">
              <span>{{row.shop }}</span>
            </template>
          </el-table-column>
          <el-table-column label="刊登状态" align="center">
            <template slot-scope="{row}">
              <span>{{row.push_status | transformStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="error_msg" label="错误原因" align="center">
            <template slot-scope="{row}">
              <el-popover
                placement="top-start"
                width="350"
                trigger="hover"
                :content="row.error_msg"
              >
                <span slot="reference" style="color:#46a6ff" class="isOverflow Overflow">{{row.error_msg}}</span>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="150"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="{row}">
              <el-button
                type="text"
                v-if="btnClass.edit && row.push_status==2"
                class="editColor"
                @click="edit(row)"
              >编辑</el-button>
              <el-button
                v-if="row.push_status==2 && btnClass.syn"
                type="text"
                class="synColor"
                @click="resynchronize(row,'published')"
              >同步</el-button>
              <el-button
                v-if="btnClass.log"
                class="logColor"
                type="text"
                @click="getLog(row,'draft')"
              >日志</el-button>
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
    <LogPopup
      v-if="showLogPopup"
      :showLogPopup="showLogPopup"
      :recordCurrent="recordCurrent"
      @on-open-sesion="callbackPopup"
    ></LogPopup>
  </div>
</template>

<script>
import LogPopup from "./components/LogPopup.vue";
import { mapGetters } from "vuex";
export default {
  name: "ListOfPublicationRecords",
  components: {
    LogPopup,
  },
  computed: {
    ...mapGetters(['ebayURL']),
  },
  data() {
    return {
      showLogPopup: false,
      form: {
        sku: "",
        title: "", //标题
        productLine: "", //产品线
        publishType: "", //刊登类型
        shelfStatus: "", //上架状态
        shop: "", //上架店铺
        publishStatus: "", //刊登状态
        date: "", //刊登时间
        datePlan: "" //计划发布时间
      },
      shopList: [],
      productCategoryList: [],
      tableData: [],
      dataSynAll: [],
      page: {
        cureentPage: 1,
        size: 20,
        total: 0
      },
      tableHeight: null,
      // 暂存区
      recordCurrent: {},
      btnClass: {
        syn: false,
        edit: false,
        log: false,
        syns: false
      }
    };
  },
  created() {
    let id = this.$getMenuId(
      sessionStorage.getItem("munuIdList"),
      this.$route.path
    );
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
      if (this.form.datePlan) {
        var createTimeStartPlan = this.form.datePlan[0];
        var createTimeEndPlan = this.form.datePlan[1];
      }
      let params = {
        sku: this.form.sku,
        title: this.form.title,
        cat_id: this.form.productLine,
        sell_type: this.form.publishType,
        is_publish: this.form.shelfStatus,
        shop_id: this.form.shop,
        push_status: this.form.publishStatus,
        push_date_start: createTimeStart || "",
        push_date_end: createTimeEnd || "",
        plan_update_start: createTimeStartPlan || "",
        plan_update_end: createTimeEndPlan || "",
        page: this.page.cureentPage,
        per_page_num: this.page.size
      };
      this.$axios.get(`/listing/publishrecord/list`, { params }).then(res => {
        res.data.product_list.data.forEach(list => {
          // console.log(_g.getJsonParse(list.error_msg));
        });
        this.tableData = res.data.product_list.data;
        this.shopList = res.data.shop;
        this.productCategoryList = res.data.product_category;
        this.page.total = res.data.product_list.total;
        _g.scrollTop();
      });
    },
    handleSelectionChange(val) {
      this.dataSynAll = val;
    },
    // 日志
    getLog(data) {
      let params = {
        listing_id: data.listing_id
      };
      this.$axios.get(`/listing/publishrecord/log`, { params }).then(res => {
        this.$set(data, "gridData", res.data.list);
        this.$set(data, "titleLog", "日志");
        this.recordCurrent = data;
        this.showLogPopup = true;
      });
    },
    // 批量重新同步
    bulkResynchronization() {
      if (!this.dataSynAll.length) {
        this.$message({
          message: "请先勾选数据列表!",
          type: "warning"
        });
        return;
      }
      let select = this.dataSynAll.filter(item => item.push_status !== 2);
      if (select.length) {
        this.$message({
          message: "请选择同步失败的数据!",
          type: "warning"
        });
        return;
      }
      let formdata = new FormData();
      this.dataSynAll.forEach(data => {
        formdata.append("listing_id[]", data.listing_id);
      });
      this.batchSyncRequest(formdata);
    },
    // 单个重新同步
    resynchronize(data) {
      let formdata = new FormData();
      formdata.append("listing_id[]", data.listing_id);
      this.batchSyncRequest(formdata);
    },
    batchSyncRequest(formdata) {
      this.$axios.post("/listing/batch_sync", formdata).then(res => {
        this.$message({
          message: res.msg,
          type: "success"
        });
      });
    }, // 搜索表单
    submitForm() {
      this.page.cureentPage = 1;
      this.getList();
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 编辑
    edit(data) {
      let tokenAndID = this.$getTokenAndID()
      let path = '/listingManagement/publicationRecordsEdit'
      let str = `${ this.ebayURL }${ path }?${tokenAndID}&sku=${ data.listing_id }`
      window.open(str)
    },

    // 回调log
    callbackPopup(data) {
      this.showLogPopup = false;
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
  },
  filters: {
    transformType(val) {
      switch (val) {
        case 0:
          val = "拍卖";
          break;
        case 1:
          val = "固定价格";
          break;
        case 2:
          val = "多属性";
          break;
      }
      return val;
    },
    transformStatus(val) {
      switch (val) {
        case 0:
          val = "待刊登";
          break;
        case 1:
          val = "刊登成功";
          break;
        case 2:
          val = "刊登失败";
          break;
      }
      return val;
    }
  }
};
</script>

<style >
.editColor {
  color: #e6a23c;
}
.synColor {
  color: #67c23a;
}
.logColor {
  color: #909399;
}
</style>