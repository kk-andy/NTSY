<template>
  <div class="list-of-selections margin10">
    <div class="inventory-adjustment-rules-form">
      <el-card>
        <el-form :inline="true" ref="form" :model="form" label-width="140px">
          <el-form-item label="SKU：" prop="suk">
            <el-input placeholder="请输入SKU" v-model="form.suk" clearable></el-input>
          </el-form-item>
          <el-form-item label="标题：" prop="title">
            <el-input placeholder="请输入标题" v-model="form.title" clearable></el-input>
          </el-form-item>
          <el-form-item label="关键词：" prop="core_word">
            <el-input placeholder="请输入关键词" v-model="form.core_word" clearable></el-input>
          </el-form-item>
          <el-form-item label="产品线：" prop="productLine">
            <el-select v-model="form.productLine" filterable clearable placeholder="请选择产品线">
              <el-option
                v-for="item in product_category"
                :key="item.id"
                :label="item.category_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上架店铺：" prop="shop">
            <el-select v-model="form.shop" filterable clearable placeholder="请选择上架店铺">
              <el-option
                v-for="item in shopList"
                :key="item.shop_id"
                :label="item.shop_name"
                :value="item.shop_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="未上架店铺：" prop="unlistedShop">
            <el-select filterable multiple v-model="form.unlistedShop" clearable  placeholder="请选择">
              <el-option
                v-for="item in shopList"
                :key="item.shop_id"
                :label="item.shop_name"
                :value="item.shop_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否已备货：" prop="is_early_stock">
            <el-select v-model="form.is_early_stock" clearable placeholder="请选择">
              <el-option
                v-for="item in isEarlyStockList"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否已刊登：" prop="status">
            <el-select v-model="form.status" clearable placeholder="请选择">
              <el-option
                v-for="item in seleStatus"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="推荐平台：" prop="recommend">
            <el-select v-model="form.recommend" filterable clearable placeholder="请选择">
              <el-option v-for="item in platform" :key="item.id" :label="item.id" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调研平台：" prop="research">
            <el-select v-model="form.research" filterable clearable placeholder="请选择">
              <el-option v-for="item in platform" :key="item.id" :label="item.id" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="SKU生成时间：" label-width="125px" prop="date">
            <el-date-picker
              v-model="form.date"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="开发人：" prop="creator">
            <!-- <el-input placeholder="请输入开发人姓名(模糊搜索)" v-model="form.creator" clearable></el-input> -->
            <el-select v-model="form.creator" filterable multiple  clearable placeholder="请选择开发人">
              <el-option
                v-for="item in develperList"
                :key="item.staff_id"
                :label="item.staff_name"
                :value="item.staff_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <div class="search-reset-btn">
            <el-form-item>
              <el-button size="small" type="primary" @click="submitForm()">搜索</el-button>
              <el-button size="small" @click="resetForm">重置</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-card>
    </div>
    <div class="add-template-btn">
      <el-button
        size="small"
        type="primary"
        v-if="btnClass.new"
        @click="createListing('/productListing/createSelection')"
      >创建listing</el-button>
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
        <el-table-column prop="sku" label="SKU" align="center"></el-table-column>
        <el-table-column prop="sku_name" label="标题" align="center"></el-table-column>
        <el-table-column prop="image_url" label="缩略图" align="center">
          <template slot-scope="{row}">
            <a :href="row.image_url" target="_blank" v-if="row.image_url">
              <el-popover placement="right" width="350" trigger="hover">
                <img :src="row.image_url" alt style="width:100%;" />
                <div slot="reference">
                  <img
                    :src="row.image_url"
                    alt
                    style="width:100%; text-align:center;margin-top:10px"
                  />
                </div>
              </el-popover>
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="cat_id_one_name" label="产品线" align="center"></el-table-column>
        <el-table-column prop="core_word" label="关键词" align="center"></el-table-column>
        <el-table-column prop="is_early_stock" label="是否已备货" align="center">
          <template slot-scope="{row}">
            <span>{{row.is_early_stock ? "是" :'否'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="is_publish" label="是否已刊登" align="center">
          <template slot-scope="{row}">
            <span>{{row.is_publish ? "是" :'否'}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="recommend_platform" label="推荐平台" align="center"></el-table-column>
        <el-table-column prop="research_platform" label="调研平台" align="center"></el-table-column>
        <el-table-column prop="buy_price" label="采购价" align="center"></el-table-column>
        <el-table-column prop="pack_weight" label="产品包装重量" align="center"></el-table-column>
        <el-table-column prop="attr_trans" label="运输属性" align="center"></el-table-column>
        <el-table-column prop="attr_trans" label="反向链接" align="center">
          <template slot-scope="{row}">
            <div class="isOverflow">
              <el-tooltip
                class="item"
                effect="dark"
                :content="row.re_url_one"
                placement="top-start"
                v-if="row.re_url_one"
              >
                <div>          
                  <div>
                    <el-link type="primary" :underline="false" @click="openUrl(row.re_url_one)">{{ row.re_url_one }}</el-link>
                  </div>
                </div>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                :content="row.re_url_two"
                placement="top-start"
                v-if="row.re_url_two"
              >
                <div>               
                  <div>
                    <el-link type="primary" :underline="false" @click="openUrl(row.re_url_two)">{{row.re_url_two }}</el-link>
                  </div>
                </div>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                :content="row.re_url_three"
                placement="top-start"
                v-if="row.re_url_three"
              >
                <div>            
                  <div>
                    <el-link type="primary" :underline="false" @click="openUrl(row.re_url_three)">{{row.re_url_three }}</el-link>
                  </div>
                </div>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                :content="row.re_url_four"
                placement="top-start"
                v-if="row.re_url_four"
              >
                <div>                
                  <div>
                    <el-link type="primary" :underline="false" @click="openUrl(row.re_url_four)">{{row.re_url_four }}</el-link>
                  </div>
                </div>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                :content="row.re_url_five"
                placement="top-start"
                v-if="row.re_url_five"
              >
                <div>
                  <div>
                    <el-link type="primary" :underline="false" @click="openUrl(row.re_url_five)">{{row.re_url_five }}</el-link>
                  </div>
                </div>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                :content="row.re_url_six"
                placement="top-start"
                v-if="row.re_url_six"
              >
                <div>
                  <div>
                    <el-link type="primary" :underline="false" @click="openUrl(row.re_url_six)">{{row.re_url_six }}</el-link>
                  </div>
                </div>
              </el-tooltip>
              <!-- <div>{{row.re_url_six }}</div> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="shop" label="刊登店铺" align="center"></el-table-column>
        <el-table-column prop="done_at" label="SKU生成时间" align="center"></el-table-column>
        <el-table-column prop="developer_name" label="开发人" align="center"></el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button v-if="btnClass.edit" type="text" @click="editListing(scope.row)">编辑</el-button>
            <!-- <el-button v-if="btnClass.log" type="text" @click="getLog(scope.row)">日志</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style=" margin: 15px 0;float:right;">
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
    <!-- <LogPopup
      v-if="showLogPopup"
      :showLogPopup="showLogPopup"
      :recordCurrent="recordCurrent"
      @on-open-sesion="callbackPopup"
    ></LogPopup>-->
  </div>
</template>

<script>
import LogPopup from "./components/LogPopup.vue";
import { mapState, mapGetters } from "vuex";
import { parseTime } from "@/utils/index";
// import { getMenuId } from '@/utils/menuName'
export default {
  name: "ListOfSelections",
  components: {
    // LogPopup
  },
  computed: {
    ...mapState({
      munuIDList: state => state.permission.munuIDList,
      develperList: state => state.ListOfSelections.develperList
    }),
    ...mapGetters(['ebayURL']),
    munuIDList: {
      get() {
        // console.log(this.$store.state.permission.munuIDList)
      }
    }
  },
  data() {
    return {
      showLogPopup: false,
      // 暂存区
      recordCurrent: {},
      form: {
        suk: "",
        title: "",
        productLine: "",
        shop: "",
        status: "",
        date: [],
        research: "",
        recommend: "",
        unlistedShop: "",
        core_word: "",
        is_early_stock: "",
        creator: ''
      },
      product_category: [],
      shopList: [],
      seleStatus: [
        {
          id: 0,
          value: "未刊登"
        },
        {
          id: 1,
          value: "已刊登"
        }
      ],
      isEarlyStockList: [
        {
          id: 0,
          value: "未备货"
        },
        {
          id: 1,
          value: "已备货"
        }
      ],
      researchDrop: [],
      recommendDrop: [],
      tableData: [],
      page: {
        cureentPage: 1,
        size: 20,
        total: 0
      },
      tableHeight: "500px",
      // 暂存区
      recordCurrent: {},
      platform: [],
      btnClass: {
        new: false,
        edit: false,
        log: false
      },
      recordRoute: ""
    };
  },
  watch: {
    $route(to, from) {
      // from 对象中要 router 来源信息.
      // do your want
      this.recordRoute = from.name;
    }
  },
  activated() {
    if (
      this.recordRoute === "CreateSelection" ||
      this.recordRoute === "EditSelection"
    )
      return;
    this.resetForm();
    this.page.cureentPage = 1
    let currentTime = parseTime(new Date());
    let s = currentTime.substr(0, 6);
    let e = currentTime.substr(7, 18);
    let pastTime = `${s}${currentTime[6] - 1}${e}`;
    this.form.date[0] = pastTime;
    this.form.date[1] = currentTime;
    this.getList();
  },
  deactivated() {},
  created() {
    let id = this.$getMenuId(
      sessionStorage.getItem("munuIdList"),
      this.$route.path
    );
    this.getControlBtn(id);
    let currentTime = parseTime(new Date());
    let s = currentTime.substr(0, 6);
    let e = currentTime.substr(7, 18);
    let pastTime = `${s}${currentTime[6] - 1}${e}`;
    this.form.date[0] = pastTime;
    this.form.date[1] = currentTime;
  },
  mounted() {
    this.$store.dispatch('ListOfSelections/getDevelperList')
    this.getList();
    this.getShopList();
    this.getProductCate();
  },
  methods: {
    getList() {
      if (this.form.date) {
        var [createTimeStart, createTimeEnd] = [
          this.form.date[0],
          this.form.date[1]
        ];
      }
      let params = {
        sku: this.form.suk,
        sku_name: this.form.title,
        cat_id: this.form.productLine,
        shop_id: this.form.shop,
        is_publish: this.form.status,
        recommend_platform: this.form.recommend,
        research_platform: this.form.research,
        not_shop_id: this.form.unlistedShop,
        done_at_start: createTimeStart || "",
        done_at_end: createTimeEnd || "",
        core_word: this.form.core_word,
        is_early_stock: this.form.is_early_stock,
        per_page_num: this.page.size,
        page: this.page.cureentPage,
        developer_id: this.form.creator
      };
      this.$axios.get(`/listing/prepublish/list`, { params }).then(res => {
        this.tableData = res.data.product_list.data;
        this.platform = _g.searchField(res.data.platform);
        this.page.total = res.data.product_list.total;
        _g.scrollTop();
      });
    },
    getShopList() {
      this.$axios.get(`/listing/info/shop_list`).then(res => {
        this.shopList = res.data;
      });
    },
    getProductCate() {
      this.$axios.get(`/listing/info/product_cate`).then(res => {
        this.product_category = res.data;
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
    },
    // 搜索表单
    submitForm() {
      this.page.cureentPage = 1;
      this.getList();
    },
    // 重置表单
    resetForm() {
      this.$refs.form.resetFields();
      this.form = {
        suk: "",
        title: "",
        productLine: "",
        shop: "",
        status: "",
        date: [],
        research: "",
        recommend: "",
        unlistedShop: "",
        core_word: "",
        is_early_stock: ""
      };
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
    //创建listing按钮
    createListing(val) {
      let tokenAndID = this.$getTokenAndID()
      let str = `${this.ebayURL}${val}?${tokenAndID}`
      window.open(str)
    },
    // 日志
    getLog(data) {
      let params = {
        // item_id: data.id
        sku: data.sku
      };
      this.$axios.get(`/listing/prepublish/log`, { params }).then(res => {
        this.$set(data, "title", "日志");
        this.$set(data, "gridData", res.data.list);
        this.recordCurrent = data;
        this.showLogPopup = true;
      });
    },

    // 回调log
    callbackPopup(data) {
      this.showLogPopup = false;
    },
    editListing(data) {
      let tokenAndID = this.$getTokenAndID()
      let val = '/productListing/editSelection'
      let str = `${this.ebayURL}${val}?${tokenAndID}&spu=${data.spu}&sku=${data.sku}`
      window.open(str)
    },
    openUrl(url) {
      window.open(url)
    }
  }
};
</script>

<style scoped>
.box-card.margin10 {
  margin: 10px;
  box-sizing: border-box;
}
</style>