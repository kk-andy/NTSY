<template>
  <div>
    <el-card class="account-form">
      <el-form
        label-position="left"
        label-width="100px"
        ref="formLabelAlign"
        :rules="rules"
        :model="formLabelAlign"
      >
        <div class="formTit">基本信息</div>
        <el-form-item label="规则名称:" prop="market_rule_name">
          <el-col :span="4">
            <el-input v-model="formLabelAlign.market_rule_name" placeholder="请输入规则名称"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="适用店铺:" prop="shop_id">
          <el-col :sapn="6">
            <el-select v-model="formLabelAlign.shop_id" placeholder="请选择适用店铺" :disabled="!isCreate">
              <el-option
                v-for="item in shop_list"
                :key="item.shop_id"
                :label="item.shop_name"
                :value="item.shop_id"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="优先级:" prop="level">
          <el-col :sapn="6">
            <el-select v-model="formLabelAlign.level" placeholder="请选择优先级">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
              <el-option label="6" value="6"></el-option>
              <el-option label="7" value="7"></el-option>
              <el-option label="8" value="8"></el-option>
              <el-option label="9" value="9"></el-option>
              <el-option label="10" value="10"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <div class="formTit">
          适用范围
          <span>(设置需要插入关联营销的产品范围)</span>
        </div>
        <el-form-item label="范围选择:">
          <el-col :sapn="6">
            <el-select v-model="formLabelAlign.related_type" placeholder="请选择范围">
              <el-option label="全部商品" value="1"></el-option>
              <el-option label="按条件筛选产品" value="2"></el-option>
              <el-option label="指定产品" value="3"></el-option>
            </el-select>
            <el-link
              v-show="formLabelAlign.related_type==3"
              type="primary"
              icon="el-icon-plus"
              :underline="false"
              @click="addshop(0,formLabelAlign.range.identify)"
            >添加产品</el-link>
          </el-col>
        </el-form-item>
        <div v-show="formLabelAlign.related_type==2">
          <el-form-item label="产品分类:">
            <el-link
              v-if="formLabelAlign.range.site_categories.length==0"
              type="primary"
              icon="el-icon-plus"
              :underline="false"
              @click="productClick()"
            >选择分类</el-link>
            <div v-else class="goodsClassBox">
              <div
                v-for="item in formLabelAlign.range.site_categories"
                :key="item.site_id+item.site"
                v-show="item.selectedArr.length != 0"
              >
                <el-link
                  icon="el-icon-edit"
                  :underline="false"
                  @click="productClick(item)"
                >{{item.site}}</el-link>
                <span v-for="el in item.selectedArr" :key="el.category_id">{{el.category_name}}、</span>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="店铺分类:">
            <el-link
              v-if="formLabelAlign.range.shop_categories.length==0"
              type="primary"
              icon="el-icon-plus"
              :underline="false"
              @click="shopClick"
            >选择分类</el-link>
            <div v-else class="goodsClassBox">
              <el-link icon="el-icon-edit" :underline="false" @click="shopClick"></el-link>
              <span
                v-for="el in formLabelAlign.range.shop_categories"
                :key="el.category_id"
              >{{el.category_name}}、</span>
            </div>
          </el-form-item>
          <el-form-item label="刊登形式：" :prop="formLabelAlign.related_type==2?'sell_type':''">
            <el-checkbox-group v-model="formLabelAlign.range.sell_type">
              <el-checkbox label="0">拍卖</el-checkbox>
              <el-checkbox label="1">固定</el-checkbox>
              <el-checkbox label="2">多属性</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
        <createMarketingTable
          v-show="formLabelAlign.related_type==3"
          :tableData="formLabelAlign.range.listings"
          @delectClick="delectClick"
        />
        <div class="formTit">
          <el-checkbox v-model="formLabelAlign.describe_above"></el-checkbox>&nbsp;描述上方
          <span>(关联营销的产品在listing中出现的位置)</span>
        </div>
        <div class="row styleBox" v-show="formLabelAlign.describe_above">
          <h4 style="margin-left:30px">营销风格</h4>
          <el-form-item class="numBox" label="显示数量:">
            <el-select v-model="formLabelAlign.above.row">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
            </el-select>&nbsp;行 &nbsp;&nbsp;&nbsp;&nbsp;
            <el-select v-model="formLabelAlign.above.col">
              <el-option label="6" value="6"></el-option>
              <el-option label="7" value="7"></el-option>
              <el-option label="8" value="8"></el-option>
              <el-option label="9" value="9"></el-option>
              <el-option label="10" value="10"></el-option>
            </el-select>&nbsp;列
          </el-form-item>
          <el-form-item label="营销标题:">
            <el-col :span="4">
              <el-input v-model="formLabelAlign.above.title" placeholder="请输入营销标题"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="高级设置:">
            <el-checkbox v-model="formLabelAlign.above.listing_title_hide">隐藏产品标题</el-checkbox>
          </el-form-item>
          <el-form-item label="营销产品:">
            <el-radio-group v-model="formLabelAlign.above.product_selection">
              <el-radio label="0">根据条件筛选</el-radio>
              <el-radio label="1">指定产品</el-radio>
            </el-radio-group>
            <el-link
              v-show="formLabelAlign.above.product_selection==1"
              type="primary"
              icon="el-icon-plus"
              :underline="false"
              @click="addshop(1,formLabelAlign.above.identify)"
            >添加产品</el-link>
          </el-form-item>
          <div v-show="formLabelAlign.above.product_selection==0">
              <el-form-item label="产品分类:">
                <el-select v-model="formLabelAlign.above.site_categories_type" placeholder="产品分类">
                  <el-option label="本店铺所有分类" value="0"></el-option>
                  <el-option label="同(适用范围)的产品分类" value="1"></el-option>
                  <el-option label="指定具体分类" value="2"></el-option>
                </el-select>
              </el-form-item>
              <div v-show="formLabelAlign.above.site_categories_type == '2' ">
                <el-form-item label="产品分类:">
                  <el-link
                    v-if="formLabelAlign.above.site_categories.length==0"
                    type="primary"
                    icon="el-icon-plus"
                    :underline="false"
                    @click="productAboveClick()"
                  >选择分类</el-link>
                  <div v-else class="goodsClassBox">
                    <div
                      v-for="item in formLabelAlign.above.site_categories"
                      :key="item.site_id+item.site"
                      v-show="item.selectedArr.length != 0"
                    >
                      <el-link
                        icon="el-icon-edit"
                        :underline="false"
                        @click="productAboveClick(item)"
                      >{{item.site}}</el-link>
                      <span v-for="el in item.selectedArr" :key="el.category_id">{{el.category_name}}、</span>
                    </div>
                  </div>
                </el-form-item>
              </div>
            <el-form-item label="店铺分类:">
              <el-select v-model="formLabelAlign.above.shop_categories_type" placeholder="店铺分类">
                <el-option label="本店铺所有分类" value="0"></el-option>
                <el-option label="同(适用范围)的产品分类" value="1"></el-option>
                <el-option label="指定具体分类" value="2"></el-option>
              </el-select>
            </el-form-item>
            <div v-show="formLabelAlign.above.shop_categories_type == '2' ">
                <el-form-item label="店铺分类:">
                  <el-link
                    v-if="formLabelAlign.above.shop_categories.length==0"
                    type="primary"
                    icon="el-icon-plus"
                    :underline="false"
                    @click="shopAboveClick"
                  >选择分类</el-link>
                  <div v-else class="goodsClassBox">
                    <el-link icon="el-icon-edit" :underline="false" @click="shopAboveClick"></el-link>
                    <span
                      v-for="el in formLabelAlign.above.shop_categories"
                      :key="el.category_id"
                    >{{el.category_name}}、</span>
                  </div>
                </el-form-item>
            </div>
            <el-form-item label="价格区间:">
              <el-col :span="2">
                <el-input type="number" v-model="formLabelAlign.above.price_min"></el-input>
              </el-col>
              <span style="float:left;">&nbsp;--&nbsp;</span>
              <el-col :span="2">
                <el-input type="number" v-model="formLabelAlign.above.price_max"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="刊登形式:">
              <el-checkbox-group v-model="formLabelAlign.above.sell_type">
                <el-checkbox label="0">拍卖</el-checkbox>
                <el-checkbox label="1">固定</el-checkbox>
                <el-checkbox label="2">多属性</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="排序方式:">
              <el-select v-model="formLabelAlign.above.sort_by" placeholder="请选择排序方式">
                <el-option label="随机" value="0"></el-option>
                <el-option label="销量从高到底" value="1"></el-option>
                <el-option label="销量从低到高" value="2"></el-option>
                <el-option label="最新上架时间" value="3"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="listBox" v-show="formLabelAlign.above.product_selection==1">
            <el-row :gutter="20">
              <el-col
                :span="4"
                v-for="item in formLabelAlign.above.listings"
                :key="'above'+item.listing_id"
              >
                <div class="goodsBox">
                  <img :src="item.thumbnail" alt />
                  <div class="tit">{{item.title}}</div>
                  <div class="amount">{{item.min_price}}</div>
                </div>
                <div class="deleteBtn">
                  <el-button type="text" @click="aboveDelect(item)">移除</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="formTit">
          <el-checkbox v-model="formLabelAlign.describe_below"></el-checkbox>&nbsp;描述下方
          <span>(关联营销的产品在listing中出现的位置)</span>
        </div>
        <div class="row styleBox" v-show="formLabelAlign.describe_below">
          <h4 style="margin-left:30px">营销风格</h4>
          <el-form-item class="numBox" label="显示数量:">
            <el-select v-model="formLabelAlign.below.row">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
            </el-select>&nbsp;行 &nbsp;&nbsp;&nbsp;&nbsp;
            <el-select v-model="formLabelAlign.below.col">
              <el-option label="6" value="6"></el-option>
              <el-option label="7" value="7"></el-option>
              <el-option label="8" value="8"></el-option>
              <el-option label="9" value="9"></el-option>
              <el-option label="10" value="10"></el-option>
            </el-select>&nbsp;列
          </el-form-item>
          <el-form-item label="营销标题:">
            <el-col :span="4">
              <el-input v-model="formLabelAlign.below.title" placeholder="请输入营销标题"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="高级设置:">
            <el-checkbox v-model="formLabelAlign.below.listing_title_hide">隐藏产品标题</el-checkbox>
          </el-form-item>
          <el-form-item label="营销产品:">
            <el-radio-group v-model="formLabelAlign.below.product_selection">
              <el-radio label="0">根据条件筛选</el-radio>
              <el-radio label="1">指定产品</el-radio>
            </el-radio-group>
            <el-link
              v-show="formLabelAlign.below.product_selection==1"
              type="primary"
              icon="el-icon-plus"
              :underline="false"
              @click="addshop(2,formLabelAlign.below.identify)"
            >添加产品</el-link>
          </el-form-item>
          <div v-show="formLabelAlign.below.product_selection==0">
            <el-form-item label="产品分类:">
              <el-select v-model="formLabelAlign.below.site_categories_type" placeholder="产品分类">
                <el-option label="本店铺所有分类" value="0"></el-option>
                <el-option label="同(适用范围)的产品分类" value="1"></el-option>
                <el-option label="指定具体分类" value="2"></el-option>
              </el-select>
            </el-form-item>
            <div v-show="formLabelAlign.below.site_categories_type == '2' ">
                <el-form-item label="产品分类:">
                  <el-link
                    v-if="formLabelAlign.below.site_categories.length==0"
                    type="primary"
                    icon="el-icon-plus"
                    :underline="false"
                    @click="productBelowClick()"
                  >选择分类</el-link>
                  <div v-else class="goodsClassBox">
                    <div
                      v-for="item in formLabelAlign.below.site_categories"
                      :key="item.site_id+item.site"
                      v-show="item.selectedArr.length != 0"
                    >
                      <el-link
                        icon="el-icon-edit"
                        :underline="false"
                        @click="productBelowClick(item)"
                      >{{item.site}}</el-link>
                      <span v-for="el in item.selectedArr" :key="el.category_id">{{el.category_name}}、</span>
                    </div>
                  </div>
                </el-form-item>
              </div>
            <el-form-item label="店铺分类:">
              <el-select v-model="formLabelAlign.below.shop_categories_type" placeholder="店铺分类">
                <el-option label="本店铺所有分类" value="0"></el-option>
                <el-option label="同(适用范围)的产品分类" value="1"></el-option>
                <el-option label="指定具体分类" value="2"></el-option>
              </el-select>
            </el-form-item>
            <div v-show="formLabelAlign.below.shop_categories_type == '2' ">
                <el-form-item label="店铺分类:">
                  <el-link
                    v-if="formLabelAlign.below.shop_categories.length==0"
                    type="primary"
                    icon="el-icon-plus"
                    :underline="false"
                    @click="shopBelowClick"
                  >选择分类</el-link>
                  <div v-else class="goodsClassBox">
                    <el-link icon="el-icon-edit" :underline="false" @click="shopBelowClick"></el-link>
                    <span
                      v-for="el in formLabelAlign.below.shop_categories"
                      :key="el.category_id"
                    >{{el.category_name}}、</span>
                  </div>
                </el-form-item>
            </div>
            <el-form-item label="价格区间:">
              <el-col :span="2">
                <el-input type="number" v-model="formLabelAlign.below.price_min"></el-input>
              </el-col>
              <span style="float:left;">&nbsp;--&nbsp;</span>
              <el-col :span="2">
                <el-input type="number" v-model="formLabelAlign.below.price_max"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="刊登形式:">
              <el-checkbox-group v-model="formLabelAlign.below.sell_type">
                <el-checkbox label="0">拍卖</el-checkbox>
                <el-checkbox label="1">固定</el-checkbox>
                <el-checkbox label="2">多属性</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="排序方式:">
              <el-select v-model="formLabelAlign.below.sort_by" placeholder="请选择排序方式">
                <el-option label="随机" value="0"></el-option>
                <el-option label="销量从高到底" value="1"></el-option>
                <el-option label="销量从低到高" value="2"></el-option>
                <el-option label="最新上架时间" value="3"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="listBox" v-show="formLabelAlign.below.product_selection==1">
            <el-row :gutter="20">
              <el-col
                :span="4"
                v-for="item in formLabelAlign.below.listings"
                :key="'below'+item.listing_id"
              >
                <div class="goodsBox">
                  <img :src="item.thumbnail" alt />
                  <div class="tit">{{item.title}}</div>
                  <div class="amount">{{item.min_price}}</div>
                </div>
                <div class="deleteBtn">
                  <el-button type="text" @click="belowDelect(item)">移除</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <el-form-item class="btn_form">
          <el-button v-if="isCreate" type="primary" @click="submitForm('formLabelAlign')">立即创建</el-button>
          <el-button v-else type="primary" @click="saveBtn('formLabelAlign')">保存</el-button>
          <el-button type="primary" @click="preview">预览</el-button>
          <!-- <el-button @click="resetForm('formLabelAlign')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </el-card>
    <shopClassBox
      v-show="shopClass"
      @confirmClick="confirmShop"
      ref="shopClassBox"
      @cancelClick="cancelClick"
      :shop_cats_info="shop_cats_info"
      :shopClass="shopList[shopFlag]"
    ></shopClassBox>
    <goodsClassBox
      v-show="goodsClass"
      :product_cats_info="product_cats_info"
      :goodsClass="productList[productFlag]"
      :currentSelect="currentSelect"
      @confirmClick="confirmGoods"
      @cancelClick="cancelClick"
    ></goodsClassBox>
    <templatePage v-if="templatePage" :formLabelAlign="formLabelAlign" @cancelClick="cancelClick" />
  </div>
</template>
<script>
import createMarketingTable from "./table/createMarketingTable";
import shopClassBox from "./components/shopClass";
import templatePage from "./templatePage";
import goodsClassBox from "./components/goodsClass";
import {
  get_listings,
  change_listings,
  addRule,
  editRule,
  selectRule,
} from "@/api/marketing";
import { mapState } from "vuex";
export default {
  name: "CreateMarketing",
  computed: {
    ...mapState({
      shop_list: (state) => state.marketing.shop_list,
      // product_cats_info: (state) => state.marketing.product_cats_info,
      // shop_cats_info: (state) => state.marketing.shop_cats_info,
    }),
    shop_cats_info: {
      get() {
        return this.$store.state.marketing.shop_cats_info
      },
      set(val) {
        this.$store.state.marketing.shop_cats_info = val
      }
    },
    product_cats_info: {
      get() {
        return this.$store.state.marketing.product_cats_info
      },
      set(val) {
        this.$store.state.marketing.product_cats_info = val
      }
    }
  },
  components: {
    createMarketingTable,
    shopClassBox,
    goodsClassBox,
    templatePage,
  },
  watch: {
    'formLabelAlign.shop_id': {
      handler(val) {
        this.formLabelAlign.range.shop_categories = []
        this.formLabelAlign.range.site_categories = []
        this.formLabelAlign.above.shop_categories = []
        this.formLabelAlign.above.site_categories = []
        this.formLabelAlign.below.shop_categories = []
        this.formLabelAlign.below.site_categories = []
        this.shop_cats_info = []
        Object.keys(this.productList).forEach(key => this.productList[key] = [])
        Object.keys(this.shopList).forEach(key => this.shopList[key] = [])
      }
    }
  },
  data() {
    return {
      current: "",
      currentSelect: {},
      templatePage: false,
      goodsClass: false,
      shopClass: false,
      isCreate: true,
      productList: {}, /* 传入子组件的产品分类 */
      productFlag: 0, /* 用来标识是哪一个模块选择产品 */
      shopList: {}, /* 传入子组件的店铺分类 */
      shopFlag: 0, /* 用来标识是哪一个模块选择店铺 */
      formLabelAlign: {
        market_rule_name: "",
        shop_id: "",
        level: "",
        related_type: "1",
        site: [],
        range: {
          shop_categories: [],
          site_categories: [],
          // above_site_categories: [], /* 上方分类选择 */
          // below_site_categories: [], /* 下方分类选择 */
          // above_shop_categories: [], /* 上方店铺选择 */
          // below_shop_categories: [], /* 下方分类选择 */
          listing_ids: [],
          sell_type: [],
          identify: "",
          listings: [],
        },
        describe_above: false,
        describe_below: false,
        above: {
          row: "1",
          col: "6",
          title: "Recommended for you",
          listing_title_hide: false,
          product_selection: "0",
          site_categories_type: "1",
          shop_categories_type: "1",
          price_min: "0",
          price_max: "",
          sort_by: "0",
          sell_type: [],
          listing_ids: [],
          identify: "",
          listings: [],
          site_categories: [], /* 上方分类 */
          shop_categories: [] /* 上方店铺 */
        },
        below: {
          row: "1",
          col: "6",
          title: "Recommended for you",
          listing_title_hide: false,
          product_selection: "0",
          site_categories_type: "1",
          shop_categories_type: "1",
          price_min: "0",
          price_max: "",
          sell_type: [],
          sort_by: "0",
          listing_ids: [],
          identify: "",
          listings: [],
          site_categories: [], /* 下方分类 */
          shop_categories: [] /* 下方店铺 */
        },
      },
      rules: {
        market_rule_name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
        ],
        shop_id: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        level: [
          {
            required: true,
            message: "请选择优先级",
            trigger: "change",
          },
        ],
        related_type: [
          {
            required: true,
            message: "请选择范围",
            trigger: "change",
          },
        ],
        sort: [
          {
            required: true,
            message: "请选择排序方式",
            trigger: "change",
          },
        ],
        sell_type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个刊登形式",
            trigger: "change",
          },
        ],
      },
    };
  },
  mounted() {
    console.log(this.formLabelAlign.above.site_categories)
    let that = this;
    if (
      that.$route.query.rule_id &&
      !that.$route.query.create &&
      that.$route.query.create == 1
    ) {
      selectRule({
        rule_id: that.$route.query.rule_id,
        shop_id: that.$route.query.shop_id,
      }).then((item) => {
        if (item.code == 0) {
          that.formLabelAlign = item.data;
        }
      });
    }
    that.$store.dispatch("marketing/getshop_list");
  },
  activated() {
    let that = this;
    let nullObject = {};
    if (that.$route.query.create == 1) {
      that.isCreate = false;
    } else if (that.$route.query.create == 0) {
      that.current = "";
      that.currentSelect = {};
      that.templatePage = false;
      that.goodsClass = false;
      that.shopClass = false;
      that.isCreate = true;
      that.resetForm("formLabelAlign");
      return;
    }
    if (
      that.$route.query.rule_id !== that.formLabelAlign.rule_id &&
      that.$route.query.create == 1
    ) {
      selectRule({
        rule_id: that.$route.query.rule_id,
        shop_id: that.$route.query.shop_id,
      }).then((item) => {
        if (item.code == 0) {
          that.formLabelAlign = item.data;
        }
      });
    }
    switch (that.current) {
      case 0:
        nullObject = JSON.parse(sessionStorage.getItem("rangeIdentify"));
        sessionStorage.removeItem("rangeIdentify");
        break;
      case 1:
        nullObject = JSON.parse(sessionStorage.getItem("aboveIdentify"));
        sessionStorage.removeItem("aboveIdentify");
        break;
      case 2:
        nullObject = JSON.parse(sessionStorage.getItem("belowIdentify"));
        sessionStorage.removeItem("belowIdentify");
        break;
    }
    if (that.current !== "" && that.$route.query.create == 2) {
      get_listings({
        shop_id: that.formLabelAlign.shop_id,
        identify: nullObject,
      }).then((item) => {
        if (item.code == 0) {
          switch (that.current) {
            case 0:
              that.formLabelAlign.range.listing_ids = item.data.listing_ids;
              that.formLabelAlign.range.listings = item.data.listings;
              that.formLabelAlign.range.identify = nullObject;
              break;
            case 1:
              that.formLabelAlign.above.listing_ids = item.data.listing_ids;
              that.formLabelAlign.above.listings = item.data.listings;
              that.formLabelAlign.above.identify = nullObject;
              break;
            case 2:
              that.formLabelAlign.below.listing_ids = item.data.listing_ids;
              that.formLabelAlign.below.listings = item.data.listings;
              that.formLabelAlign.below.identify = nullObject;
              break;
          }
        }
      });
    }
  },
  methods: {
    preview() {
      if (
        !this.formLabelAlign.describe_above &&
        !this.formLabelAlign.describe_below
      ) {
        this.$message({
          message: "请至少选择一项描述位置",
          type: "warning",
        });
        return;
      }
      this.templatePage = true;
    },
    // 添加产品按钮
    addshop(item, data) {
      let that = this;
      if (that.formLabelAlign.shop_id == "") {
        that.$message({
          message: "请先选择店铺",
          type: "warning",
        });
        return;
      }
      switch (item) {
        case 0:
          that.current = 0;
          sessionStorage.setItem("rangeListing_ids", JSON.stringify(data));
          break;
        case 1:
          that.current = 1;
          sessionStorage.setItem("aboveListing_ids", JSON.stringify(data));
          break;
        case 2:
          that.current = 2;
          sessionStorage.setItem("belowListing_ids", JSON.stringify(data));
          break;
      }
      that.$router.push({
        name: "DesignatedProduct",
        query: {
          shopId: that.formLabelAlign.shop_id,
          list_type: item,
          rule_id: that.formLabelAlign.rule_id,
        },
      });
    },
    // 店铺分类弹框
    confirmShop(item) {
      // this.formLabelAlign.range.shop_categories = item;
      if (this.shopFlag === 0) {
        this.shopList[this.shopFlag] = item
        this.formLabelAlign.range.shop_categories = item;
      } else if (this.shopFlag === 1) { /* 上方店铺选择 */
        this.shopList[this.shopFlag] = item
        this.formLabelAlign.above.shop_categories = item;
      } else { /* 下方分类选择 */
        this.shopList[this.shopFlag] = item
        this.formLabelAlign.below.shop_categories = item;
      }
      this.shopClass = false;
    },
    // 产品分类弹框
    confirmGoods(item) {
      let site = [];
      item.forEach((el) => {
        site.push({
          site_id: el.site_id,
          site: el.site,
        });
      });
      if (this.productFlag === 0) {
        this.formLabelAlign.site = site;
        this.productList[this.productFlag] = item
        this.formLabelAlign.range.site_categories = item;
      } else if (this.productFlag === 1) { /* 上方分类选择 */
        this.formLabelAlign.site = site;
        this.productList[this.productFlag] = item
        this.formLabelAlign.above.site_categories = item;
      } else { /* 下方分类选择 */
        this.formLabelAlign.site = site;
        this.productList[this.productFlag] = item
        this.formLabelAlign.below.site_categories = item;
      }
      
      this.goodsClass = false;
    },
    cancelClick() {
      this.shopClass = false;
      this.goodsClass = false;
      this.templatePage = false;
    },
    // 表格移除按钮
    delectClick(item) {
      let that = this;
      let listing = that.formLabelAlign.range.listing_ids;
      listing.splice(
        listing.findIndex((data) => data === item.listing_id),
        1
      );
      change_listings({
        listing_id: listing,
        identify: that.formLabelAlign.range.identify,
      }).then((res) => {
        if (res.code == 0) {
          that.formLabelAlign.range.listing_ids = res.data.listing_id;
          that.formLabelAlign.range.listings.splice(
            that.formLabelAlign.range.listings.findIndex(
              (data) => data.listing_id === item.listing_id
            ),
            1
          );
        }
      });
    },
    // 描述上方产品移除
    aboveDelect(item) {
      let that = this;
      let listing = that.formLabelAlign.above.listing_ids;
      listing.splice(
        listing.findIndex((data) => data === item.listing_id),
        1
      );
      change_listings({
        listing_id: listing,
        identify: that.formLabelAlign.above.identify,
      }).then((res) => {
        if (res.code == 0) {
          that.formLabelAlign.above.listing_ids = res.data.listing_id;
          that.formLabelAlign.above.listings.splice(
            that.formLabelAlign.above.listings.findIndex(
              (data) => data.listing_id === item.listing_id
            ),
            1
          );
        }
      });
    },
    // 描述下方产品移除
    belowDelect(item) {
      let that = this;
      let listing = that.formLabelAlign.below.listing_ids;
      listing.splice(
        listing.findIndex((data) => data === item.listing_id),
        1
      );
      change_listings({
        listing_id: listing,
        identify: that.formLabelAlign.below.identify,
      }).then((res) => {
        if (res.code == 0) {
          that.formLabelAlign.below.listing_ids = res.data.listing_id;
          that.formLabelAlign.below.listings.splice(
            that.formLabelAlign.below.listings.findIndex(
              (data) => data.listing_id === item.listing_id
            ),
            1
          );
        }
      });
    },
    // 产品选择
    productClick(data = {}) {
      this.selectClassFunc(0, data)
    },
    // 店铺选择
    shopClick() {
      this.selectShopFunc(0)
    },
    /* 选择店铺 */
    selectShopFunc(num) {
      this.shopFlag = num
      if (!this.shopList.hasOwnProperty(this.shopFlag)) {
        this.shopList[this.shopFlag] = []
      }
      if (this.formLabelAlign.shop_id == "") {
        this.$message({
          message: "请先选择店铺",
          type: "warning",
        });
        return;
      }
      this.$store.dispatch("marketing/getshop_cats_info", {
        shop_id: this.formLabelAlign.shop_id,
      });
      this.shopClass = true;
    },
    /* 选择产品 */
    selectClassFunc(num, item) {
      this.productFlag = num
      if (!this.productList.hasOwnProperty(this.productFlag)) {
        this.productList[this.productFlag] = []
      }
      if (this.formLabelAlign.shop_id == "") {
        this.$message({
          message: "请先选择店铺",
          type: "warning",
        });
        return;
      }
      this.currentSelect = item
      this.$store.dispatch("marketing/getproduct_cats_info", {
        shop_id: this.formLabelAlign.shop_id,
      });
      this.goodsClass = true
    },
    /* 上方产品分类选择 */
    productAboveClick(item = {}) {
      this.selectClassFunc(1, item)
    },
    /* 上方店铺分类选择 */
    shopAboveClick() {
      this.selectShopFunc(1)
    },
    /* 下方店铺选择 */
    shopBelowClick() {
      this.selectShopFunc(2)
    },
    /* 下方分类选择 */
    productBelowClick(item = {}) {
      this.selectClassFunc(2, item)
    },
    /*  */
    //  提交按钮
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false;
        }
        if (
          this.formLabelAlign.related_type == 2 &&
          this.formLabelAlign.range.sell_type == ""
        ) {
          this.$message({
            message: "至少选择一种刊登形式",
            type: "warning",
          });
          return;
        }
        addRule(this.formLabelAlign).then((item) => {
          if (item.code == 0) {
            this.$message({
              message: "新建成功!",
              type: "success",
            });
            this.$router.push({
              name: "RelatedMarketing",
            });
          }
        });
      });
    },
    //  提交按钮
    saveBtn(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false;
        }
        if (
          this.formLabelAlign.related_type == 2 &&
          this.formLabelAlign.range.site_categories.length == 0 &&
          this.formLabelAlign.range.shop_categories.length == 0 &&
          this.formLabelAlign.range.sell_type == ""
        ) {
          this.$message({
            message: "范围选择未选择产品",
            type: "warning",
          });
          return;
        }
        editRule(this.formLabelAlign).then((item) => {
          if (item.code == 0) {
            this.$message({
              message: "保存成功!",
              type: "success",
            });
            this.$router.push({
              name: "RelatedMarketing",
            });
          }
        });
      });
    },
    // 重置按钮
    resetForm(formName) {
      let dataText = {
        market_rule_name: "",
        shop_id: "",
        level: "",
        related_type: "1",
        site: [],
        range: {
          shop_categories: [],
          site_categories: [],
          listing_ids: [],
          sell_type: [],
          identify: "",
          listings: [],
        },
        describe_above: false,
        describe_below: false,
        above: {
          row: "1",
          col: "6",
          title: "Recommended for you",
          listing_title_hide: false,
          product_selection: "0",
          site_categories_type: "1",
          shop_categories_type: "1",
          price_min: "0",
          price_max: "",
          sort_by: "0",
          sell_type: [],
          listing_ids: [],
          identify: "",
          listings: [],
          shop_categories: [],
          site_categories: [],
        },
        below: {
          row: "1",
          col: "6",
          title: "Recommended for you",
          listing_title_hide: false,
          product_selection: "0",
          site_categories_type: "1",
          shop_categories_type: "1",
          price_min: "0",
          price_max: "",
          sell_type: [],
          sort_by: "0",
          listing_ids: [],
          identify: "",
          listings: [],
          shop_categories: [],
          site_categories: [],
        },
      };
      this.formLabelAlign = dataText;
      this.$refs[formName].resetFields();
      sessionStorage.removeItem("rangeListing_ids");
      sessionStorage.removeItem("aboveListing_ids");
      sessionStorage.removeItem("belowListing_ids");
    },
  },
};
</script>
<style scoped>
.account-form {
  padding-left: 50px;
}
.formTit {
  margin: 10px 0;
  font-weight: bold;
}
.formTit > span {
  font-size: 10px;
  color: gray;
}
.el-form-item {
  margin-left: 30px;
}
.btn_form {
  margin-top: 20px;
}
.styleBox .numBox .el-select {
  width: 8vw;
}
.styleBox .el-form-item__content {
  display: flex !important;
}
.listBox {
  padding: 20px;
  margin-left: 30px;
  width: 70vw;
  background-color: rgba(0, 0, 0, 0.3);
}
.listBox .goodsBox {
  height: 230px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: white;
}
.listBox .goodsBox img {
  width: 80%;
  height: 70%;
}
.listBox .goodsBox .tit {
  width: 170px;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.listBox .goodsBox .amount {
  width: 90%;
  color: red;
  text-align: left;
}
.listBox .deleteBtn {
  width: 97%;
  font-size: 16px;
  margin: 5px 0 10px 0;
  color: #409eff;
  text-align: right;
}
.goodsClassBox {
  width: 60%;
}
</style>