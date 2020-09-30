<template>
  <div class="online-SKU-change-list margin10">
    <div class="publication-records-form">
      <el-card>
        <el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
          <el-form-item label="SKU：" prop="sku">
            <el-input v-model="form.sku" placeholder="请输入SKU"></el-input>
          </el-form-item>
          <el-form-item label="itemId：" prop="itemId">
            <el-input v-model="form.itemId" placeholder="请输入itemId"></el-input>
          </el-form-item>
          <el-form-item label="店铺：" prop="shop">
            <el-select v-model="form.shop" filterable placeholder="请选择店铺">
              <el-option
                v-for="shop in shops"
                :key="shop.shop_id"
                :label="shop. shop_name"
                :value="shop.shop_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="变更字段名：" prop="fieldName">
            <el-select v-model="form.fieldName" placeholder="请选择变更字段名">
              <el-option
                v-for="field in change_fields"
                :key="field.field_value"
                :label="field.field_name"
                :value="field.field_name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="变更人：" prop="name">
            <el-select v-model="form.name" filterable placeholder="请选择变更人">
              <el-option
                v-for="sell in sellers"
                :key="sell.seller_id"
                :label="sell.seller_name"
                :value="sell.seller_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="变更时间：" prop="date">
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
      <div class="publication-tab">
        <el-table
          :data="tableData"
          border
          style="width: 100%;margin-top:10px"
          ref="table"
          :height="tableHeight"
          :row-style="{height:'40px'}"
          :cell-style=" {padding:'0px'}"
        >
          <el-table-column prop="product_sku" label="SKU" align="center"></el-table-column>
          <el-table-column prop="item_id" label="关联itemId" align="center"></el-table-column>
          <el-table-column prop="shop_name" label="关联店铺" align="center"></el-table-column>
          <el-table-column prop="change_fields_cn" label="变更字段名" align="center"></el-table-column>
          <el-table-column prop="staff_name" label="变更人" align="center"></el-table-column>
          <el-table-column prop="modify_date" label="变更时间" align="center"></el-table-column>
          <el-table-column prop="push_status" label="是否已同步" align="center">
            <template slot-scope="{row}">
              <span>{{row.push_status == 1 ? "已同步":"未同步"}}</span>
            </template>
          </el-table-column>
          <el-table-column label="非listing信息" align="center">
            <template slot-scope="{row}">
              <el-button type="text" v-if="btnClass.view" @click="getLog(row)">点击查看</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="{row}">
              <el-button
                v-if="btnClass.syn && row.push_status == 0"
                v-show="row.change_fields_cn == '标题' || row.change_fields_cn == '描述'|| row.change_fields_cn == '设计图'"
                type="text"
                @click="synchanges(row)"
              >同步变更</el-button>
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
    <notListingInfo
      v-if="showNotInfoPopup"
      :showNotInfoPopup="showNotInfoPopup"
      :recordCurrent="recordCurrent"
      @on-open-sesion="callbackPopup"
    ></notListingInfo>
    <SynChangesPopup
      v-if="showSynChangesPopup"
      :showSynChangesPopup="showSynChangesPopup"
      :recordCurrent="recordCurrent"
      @on-open-sesion="callbackSynPopup"
    ></SynChangesPopup>
  </div>
</template>
<script>
import NotListingInfo from "./components/NotListingInfo.vue";
import SynChangesPopup from "./components/SynChangesPopup.vue";
export default {
  name: "OnlineSKUchangeList",
  components: {
    NotListingInfo,
    SynChangesPopup
  },
  data() {
    return {
      showNotInfoPopup: false,
      showSynChangesPopup: false,
      form: {
        sku: this.$route.query.id || "",
        itemId: "",
        shop: "",
        fieldName: "",
        name: "",
        date: ""
      },
      tableData: [
        {
          sku: "234235332",
          itemId: "1323455543、123252352、1314451",
          shop: "abc123、bna23、356",
          fieldName: "标题、描述、运输特性",
          name: "leochen",
          time: "2020-04-09 15:00:00",
          synStatus: "否"
        }
      ],
      page: {
        cureentPage: 1,
        size: 20,
        total: 0
      },
      change_fields: [], // 变更字段下拉
      shops: [], // 店铺下拉
      sellers: [], // 变更字段下拉
      tableHeight: null,
      // 暂存区
      recordCurrent: {},
      btnClass: {
        view: false,
        syn: false
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
      let params = {
        item_id: this.form.itemId,
        sku: this.form.sku,
        shop_id: this.form.shop,
        change_fields_cn: this.form.fieldName,
        seller_id: this.form.name,
        change_time_start: createTimeStart || "",
        change_time_end: createTimeEnd || "",
        page: this.page.cureentPage,
        per_page_num: this.page.size
      };
      this.$axios.get(`/listing/sku/list`, { params }).then(res => {
        this.tableData = res.data.sku_listings.data;
        this.page.total = res.data.sku_listings.total;
        this.change_fields = res.data.change_fields;
        this.shops = res.data.shops;
        this.sellers = res.data.sellers;
      });
    },
    getLog(data) {
      let params = {
        id: data.id
      };
      this.$axios.get(`/listing/sku/show`, { params }).then(res => {
        this.$set(data, "title", "非listing信息变更");
        this.$set(data, "gridData", res.data);
        this.recordCurrent = data;
        this.showNotInfoPopup = true;
      });
    },

    // 搜索表单
    submitForm() {
      this.page.cureentPage = 1;
      this.getList();
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
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 同步变更
    synchanges(data) {
      let params = {
        update_id: data.id
      };
      this.$axios.get(`/listing/sku/modify/diff`, { params }).then(res => {
        this.$set(data, "title", "同步变更");
        this.$set(data, "res", res.data);
        this.recordCurrent = data;
        this.showSynChangesPopup = true;
      });
    },
    callbackSynPopup({ form, val }) {
      this.showSynChangesPopup = false;
    },
    // 查看弹窗回调
    callbackPopup(data) {
      this.showNotInfoPopup = false;
    },

    jump(url) {
      this.$router.path(url);
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

