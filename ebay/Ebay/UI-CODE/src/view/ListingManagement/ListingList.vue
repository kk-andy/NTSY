<template>
  <div class="listing-list margin10">
    <div id="head-cover" v-if="showContent" @click="moreContent"></div> 
    <el-card>
      <el-form :inline="true" :model="form" ref="form" class="demo-form-inline" label-width="130px">
        <el-form-item label="itemId：" prop="itemId">
          <el-input clearable style="width:217px" v-model="form.itemId" placeholder="请输入itemId"></el-input>
        </el-form-item>
        <el-form-item label="SKU：" prop="sku">
          <el-input clearable style="width:217px" v-model="form.sku" placeholder="请输入SKU"></el-input>
        </el-form-item>
        <el-form-item label="标题：" prop="title">
          <el-input clearable style="width:217px" v-model="form.title" placeholder="请输入标题"></el-input>
        </el-form-item>
          <el-form-item label="物品所在地：" prop="location" v-show="show">
            <el-input clearable style="width:217px" v-model="form.location" placeholder="请输入物品所在地"></el-input>
          </el-form-item>
        <el-collapse-transition>
          <div v-show="show">
            <el-form-item label="国家和地区：" prop="country">
              <el-select clearable v-model="form.country" filterable placeholder="请选择国家和地区">
                <el-option
                  v-for="item in countriesList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="刊登类型：" prop="publicaType">
              <el-select clearable v-model="form.publicaType" placeholder="请选择刊登类型">
                <el-option v-for="sell in sellType" :key="sell.id" :label="sell.value" :value="sell.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="站点：" prop="site">
              <el-select clearable v-model="form.site" placeholder="请选择站点">
                <el-option
                  v-for="site in shopsitecurrency.sites"
                  :key="site.site_id"
                  :label="site.site"
                  :value="site.site"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="店铺：" prop="shop">
              <el-select clearable v-model="form.shop" filterable multiple placeholder="请选择店铺">
                <el-option
                  v-for="shop in shopsitecurrency.shops"
                  :key="shop.shop_id"
                  :label="shop.shop_name"
                  :value="shop.shop_id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="平台状态：" prop="status">
              <el-select clearable v-model="form.status" placeholder="请选择平台状态">
                <el-option
                  v-for="status in onlineStatus"
                  :key="status.id"
                  :label="status.id"
                  :value="status.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="刊登人：" prop="publisher">
              <el-select clearable v-model="form.publisher" filterable placeholder="请选择刊登人">
                <el-option
                  v-for="seller in listingUser"
                  :key="seller.seller_id"
                  :label="seller.seller_name"
                  :value="seller.seller_id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="salesStart">
              <el-select
                clearable
                v-model="selectClass"
                placeholder="请选择"
                style="width:110px;font-weight: 900;margin-left:27px"
              >
                <el-option
                  v-for="sales in handleType"
                  :key="sales.id"
                  :label="sales.value"
                  :value="sales.id"
                ></el-option>
              </el-select>
              <el-input
                v-model.number="form.salesStart"
                placeholder="最小值"
                @blur="checkValue"
                clearable
                style="width:120px"
              ></el-input>&ensp;-&ensp;
              <el-form-item prop="salesEnd">
                <el-input
                  v-model.number="form.salesEnd"
                  placeholder="最大值"
                  clearable
                  style="width:120px"
                  @blur="checkValue"
                ></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item prop="date">
              <el-select clearable v-model="selectTime" placeholder="请选择" style="width:125px">
                <el-option v-for="time in timeDrop" :key="time.id" :label="time.value" :value="time.id"></el-option>
              </el-select>
              <el-date-picker
                v-model="form.date"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetimerange"
                class="input-with-select"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="是否议价：">
              <el-select  v-model="form.bargaining" clearable>
                <el-option :value="1" label="是"></el-option>
                <el-option :value="0" label="否"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="changePackupOrAn">{{ packupOrAn }}</el-button>
              <el-button size="small" type="primary" @click="submitForm()">搜索</el-button>
              <el-button size="small" @click="resetForm('form')">重置</el-button>
            </el-form-item>
          </div>
        </el-collapse-transition>    
        <div class="search-reset-btn" v-show="!show">
            <el-form-item>
              <el-button size="small" type="primary" @click="changePackupOrAn">{{ packupOrAn }}</el-button>
              <el-button size="small" type="primary" @click="submitForm()">搜索</el-button>
              <el-button size="small" @click="resetForm('form')">重置</el-button>
            </el-form-item>
        </div>
      </el-form>
    </el-card>
    
    <div class="content-under">
      <div class="flex-j">
        <div class="bulkChanges">
          <el-select clearable v-model="bulkChanges" placeholder="请选择需批量的操作" @change="selectPopup">
            <el-option
              :label="option.val"
              v-for="option in bulkOperations"
              :key="option.id"
              v-show="btnClass[option.show]"
              :value="option.id"
            ></el-option>
          </el-select>
          <el-checkbox
            v-model="form.fullDataProcessing"
            v-if="btnClass.dealWith"
            class="margin-l10"
          >全量数据处理</el-checkbox>
        </div>

        <div class="selectSort">
          <!-- <el-select clearable v-model="selectSort" placeholder="请选择降序字段" @change="OrderChange">
            <el-option
              v-for="option in sortField"
              :key="option.id"
              :label="option.value"
              :value="option.id"
            ></el-option>
          </el-select> -->
          <span>
            <!-- <el-tooltip class="item" effect="dark" content="点击显示更多菜单" placement="left"> -->
            <svg-icon @click="moreContent" icon-class="nested" class="nested" />
            <!-- </el-tooltip> -->

            <div class="field-expansion" v-if="showContent">
              <el-checkbox-group v-model="checkboxVal" :min="7">
                <ul>
                  <li>
                    <el-checkbox disabled label="Item信息">Item信息</el-checkbox>
                  </li>
                  <li>
                    <el-checkbox disabled label="标题">标题</el-checkbox>
                  </li>
                  <li>
                    <el-checkbox disabled label="缩略图">缩略图</el-checkbox>
                  </li>
                  <li>
                    <el-checkbox  label="平台状态">平台状态</el-checkbox>
                  </li>
                  <li>
                    <el-checkbox disabled label="刊登类型">刊登类型</el-checkbox>
                  </li>
                  <li>
                    <el-checkbox disabled label="销量">销量</el-checkbox>
                  </li>
                  <li>
                    <el-checkbox disabled label="点击量">点击量</el-checkbox>
                  </li>
                  <li>
                    <el-checkbox  label="拉取时间">拉取时间</el-checkbox>
                  </li>
                  <li>
                    <el-checkbox label="价格">价格</el-checkbox>
                  </li>
                  <li>
                    <el-checkbox label="线上库存">线上库存</el-checkbox>
                  </li>

                  <li>
                    <el-checkbox label="刊登人员">刊登人员</el-checkbox>
                  </li>
                  <li>
                    <el-checkbox label="刊登SKU">刊登SKU</el-checkbox>
                  </li>

                  <li>
                    <el-checkbox disabled label="刊登时间">刊登时间</el-checkbox>
                  </li>
                  <li>
                    <el-checkbox disabled label="物品所在地">物品所在地</el-checkbox>
                  </li>
                  <li>
                    <el-checkbox label="处理时间">处理时间</el-checkbox>
                  </li>
                  <li>
                    <el-checkbox label="结束时间">结束时间</el-checkbox>
                  </li>
                  <li>
                    <el-checkbox label="收藏量">收藏量</el-checkbox>
                  </li>
                  <li>
                    <el-checkbox label="运费">运费</el-checkbox>
                  </li>
                  <li>
                    <el-checkbox label="是否议价">是否议价</el-checkbox>
                  </li>
                </ul>
              </el-checkbox-group>
            </div>
          </span>
        </div>
      </div>
      <el-table
        ref="multipleTable"
        @sort-change ="sortChange"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        fit
        :height="tableHeight"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column
          prop="thumbnail"
          label="缩略图"
          align="center"
          show-overflow-tooltip
          v-if="checkboxVal.indexOf('缩略图') != -1"
        >
          <template slot-scope="{row}">
            <a :href="row.thumbnail" target="_blank" v-if="row.thumbnail">
              <el-popover placement="right" width="350" trigger="hover">
                <img :src="row.thumbnail" alt style="width:100%;" />
                <div slot="reference">
                  <img
                    :src="row.thumbnail"
                    alt
                    style="width:100%; text-align:center;margin-top:10px"
                  />
                </div>
              </el-popover>
            </a>
          </template>
        </el-table-column>
        <el-table-column
          prop="itemInfo"
          label="Item信息"
          width="160"
          align="center"
          show-overflow-tooltip
          v-if="checkboxVal.indexOf('Item信息') != -1"
        >
          <template slot-scope="{row}">
            <div style="margin:5px 0;">{{row.item_id}}</div>
            <div style="margin:5px 0;">{{ row.sell_type}}</div>
            <div style="margin:5px 0;">{{row.location}}</div>
            
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="308"
          align="center"
          v-if="checkboxVal.indexOf('标题') != -1"
        >
          <template slot-scope="{row}">
            <div style="margin:5px 0;">
              <span style="margin-right:5px">{{row.shop_name}}</span>
              <span>{{row.site}}</span>       
            </div>     
            <!-- <div style="margin:5px 0;"></div> -->
            <div class="isOverflow">
              <el-link
                :href="ebayUrl + row.item_id"
                style="color:#46a6ff"
                :underline="false"
                target="_blank"
                type="primary"
              >{{row.title}}</el-link>
            </div>
            <div class="isOverflow ">
              <el-popover placement="right" width="350" trigger="hover">
                <div class="red-note">
                  {{ row.note }}
                </div>
                <div slot="reference" class="red-note" v-if="row.note">
                  备注：{{ row.note }}
                </div>
              </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="online_status"
          label="平台状态"
          align="center"
          show-overflow-tooltip
          v-if="checkboxVal.indexOf('平台状态') != -1"
        >
          <template slot-scope="{row}">
            <span>{{ row.online_status}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="sku"
          label="刊登SKU"
          align="center"
          show-overflow-tooltip
          v-if="checkboxVal.indexOf('刊登SKU') != -1"
        >
          <template slot-scope="{row}">
            <div
              class="isOverflow"
              v-for="(sku,index) in row.newsku"
              :key="index"
              style="line-height: 33px;height: 33px;"
            >
              <span>{{sku}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="start_price"
          label="价格"
          sortable="custom"
          align="center"
          show-overflow-tooltip
          v-if="checkboxVal.indexOf('价格') != -1"
        >
          <template slot-scope="{row}">
            <div v-for="(item,index) in row.priceArr" :key="index" style="margin:5px 0;">
              <el-input
                size="mini"
                v-model="item.price"
                style=" width:100%"
                @blur="chagneInputVal(row,item,item.price,'price')"
                @focus="chagneBeforeVal(item.price)"
              ></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="shipping_cost"
          label="运费"
          sortable="custom"
          align="center"
          width="80"
          show-overflow-tooltip
          v-if="checkboxVal.indexOf('运费') != -1"
        ></el-table-column>
        <el-table-column
          prop="quantity"
          label="线上库存"
          sortable="custom"
          align="center"
          show-overflow-tooltip
          v-if="checkboxVal.indexOf('线上库存') != -1"
        >
          <template slot-scope="{row}">
            <div v-for="(item,index) in row.isStockArr" :key="index" style="margin:5px 0;">
              <el-input
                size="mini"
                v-model="item.isStock"
                style=" width:100%"
                @blur="chagneInputVal(row,item,item.isStock,'isStoc')"
                @focus="chagneBeforeVal(item.isStock)"
              ></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="quantity_sold"
          label="销量"
          sortable="custom"
          align="center"
          width="80"
          v-if="checkboxVal.indexOf('销量') != -1"
        >
          <template slot-scope="{row}">
            <div
              v-for="(sold,index) in row.newsold"
              :key="index"
              style="line-height: 33px;height: 33px;"
            >
              <span>{{sold}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="hit_count"
          label="点击量"
          sortable="custom"
          align="center"
          width="80"
          v-if="checkboxVal.indexOf('点击量') != -1"
        ></el-table-column>
        <el-table-column
          prop="watch_count"
          label="收藏量"
          sortable="custom"
          width="80"
          align="center"
          v-if="checkboxVal.indexOf('收藏量') != -1"
        ></el-table-column>
        <el-table-column
          prop="publisher_id"
          label="刊登人员"
          align="center"
          show-overflow-tooltip
          v-if="checkboxVal.indexOf('刊登人员') != -1"
        ></el-table-column>
        <el-table-column
          prop="yijia"
          label="是否议价"
          align="center"
          show-overflow-tooltip
          v-if="checkboxVal.indexOf('是否议价') != -1"
        >
          <template slot-scope="{ row }">
            {{row.gj_best_offer ? '是' : '否'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="get_time"
          sortable="custom"
          label="拉取时间"
          align="center"
          show-overflow-tooltip
          v-if="checkboxVal.indexOf('拉取时间') != -1"
        ></el-table-column>
        <el-table-column
          prop="start_time"
          sortable="custom"
          label="刊登时间"
          align="center"
          show-overflow-tooltip
          v-if="checkboxVal.indexOf('刊登时间') != -1"
        ></el-table-column>
        <el-table-column
          prop="updated_at"
          label="处理时间"
          align="center"
          show-overflow-tooltip
          v-if="checkboxVal.indexOf('处理时间') != -1"
        ></el-table-column>
        <el-table-column
          prop="end_time"
          sortable="custom"
          label="结束时间"
          align="center"
          show-overflow-tooltip
          v-if="checkboxVal.indexOf('结束时间') != -1"
        ></el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="120"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <div v-if="row.online_status=='Active'">
              <el-button
                type="text"
                class="synColor"
                v-if="btnClass.edit && row.online_status=='Active'"
                @click="edit(row.id)"
              >编辑</el-button>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <el-button
                      type="text"
                      class="editColor"
                      v-if="btnClass.shelf && row.online_status=='Active'"
                      @click="offShelf(row,'single')"
                    >下架</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button
                      type="text"
                      class="copyColor"
                      v-if="btnClass.copy"
                      @click="copyOperation(row.id)"
                    >复制</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button
                      type="text"
                      class="copyColor"
                      v-if="!row.gj_best_offer && row.online_status === 'Active' && row.sell_type === '固定价格' && btnClass.openBargaining "
                      @click="openBargaining(row.item_id)"
                    >开启</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button
                      type="text"
                      class="copyColor"
                      v-if="row.gj_best_offer && row.online_status === 'Active' && row.sell_type === '固定价格' && btnClass.closeBargaining "
                      @click="closeBargaining(row.item_id)"
                    >关闭</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button
                      class="logColor"
                      type="text"
                      v-if="btnClass.log"
                      @click="getLog(row,'draft')"
                    >日志</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button
                      class="logColor"
                      type="text"
                      v-if="btnClass.log"
                      @click="note(row,'draft')"
                    >备注</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div v-else>
              <el-button
                type="text"
                class="copyColor"
                v-if="btnClass.copy"
                @click="copyOperation(row.id)"
              >复制</el-button>
              <el-button
                class="logColor"
                type="text"
                v-if="btnClass.log"
                @click="getLog(row,'draft')"
              >日志</el-button>
            </div>
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
    <div>
      <LogPopup
        v-if="showLogPopup"
        :showLogPopup="showLogPopup"
        :recordCurrent="recordCurrent"
        @on-open-sesion="callbackLogPopup"
      ></LogPopup>
      <BatchEditPopup
        v-if="showBatchEditPopup"
        :showBatchEditPopup="showBatchEditPopup"
        :recordCurrent="recordCurrent"
        @on-open-sesion="callbackPricePopup"
      ></BatchEditPopup>
      <RefundPolicy
        v-if="showRefundPopup"
        :templateList="templateList"
        :showRefundPopup="showRefundPopup"
        :refundRecordCurrent="recordCurrent"
        @on-open-sesion="callbackRecordPopup"
      ></RefundPolicy>
      <TransportationPolicy
        v-if="showTransportPopup"
        :templateList="templateList"
        :showTransportPopup="showTransportPopup"
        :transportTecordCurrent="recordCurrent"
        @on-open-sesion="callbackTransportPopup"
      ></TransportationPolicy>
      <!-- <BulkCopyPopup
        v-if="showCopyPopup"
        :showCopyPopup="showCopyPopup"
        :recordCurrent="recordCurrent"
        @on-open-sesion="callbackCopyPopup"
      ></BulkCopyPopup>-->
      <PaymentInfo
        v-if="showPaymentPopup"
        :showPaymentPopup="showPaymentPopup"
        :templateList="templateList"
        :recordCurrent="recordCurrent"
        @on-open-sesion="callbackPaymenPopup"
      ></PaymentInfo>
      <OffShelfPopup
        v-if="showOffShelfPopup"
        :showOffShelfPopup="showOffShelfPopup"
        :recordCurrent="recordCurrent"
        @on-open-sesion="callbackFreightPopup"
      ></OffShelfPopup>
    </div>
    <el-dialog
      :visible.sync="modal_note"
      title="备注"
      :close-on-click-modal="false"
      width="40%"
      class-name="vertical-center-modal"
    >
        <div style="display:flex">
          <span style="width: 45px">内容:</span>
          <el-input 
          placeholder="请填写您要备注的内容(最多500字)"
          v-model="modalNote"
          maxlength="500"
          :autosize="{ minRows: 5, maxRows: 5}"
          resize="none"
          type="textarea" 
          clearable></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" class="btn_button_primary" @click="confirmAddNote">确定</el-button>
            <el-button type="primary" class="btn_button_primary" @click="cancelAddNote">取消</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import LogPopup from "./components/LogPopup.vue";
import BatchEditPopup from "./components/BatchEditPopup.vue";
import RefundPolicy from "./components/RefundPolicy.vue"; //退款政策
import TransportationPolicy from "./components/TransportationPolicy.vue"; //运输政策
// import BulkCopyPopup from "./components/BulkCopyPopup.vue"; //批量复制listing
import PaymentInfo from "./components/PaymentInfo.vue"; //修改付款信息
import OffShelfPopup from "./components/OffShelfPopup.vue"; //下架弹框
import { mapGetters } from 'vuex'
import { openBargainingAPI, closeBargainingAPI } from '@/api/listing'
export default {
  name: "ListingList",
  components: {
    LogPopup,
    BatchEditPopup,
    RefundPolicy,
    TransportationPolicy,
    // BulkCopyPopup,
    PaymentInfo,
    OffShelfPopup
  },
  computed: {
    ...mapGetters(['ebayURL'])
  },
  data() {
    return {
      checkboxVal: [
        "Item信息",
        "标题",
        "缩略图",
        '刊登类型',
        "价格",
        "线上库存",
        "物品所在地",
        "销量",
        "点击量",
        "收藏量",
        "刊登SKU",
        "运费",
        "刊登时间",
        "结束时间",
        "是否议价"
      ],
      modalNote: '',
      show: true,
      showLogPopup: false, //日志弹窗
      showBatchEditPopup: false, //批量修改价格弹窗
      showRefundPopup: false, //退款弹窗
      showTransportPopup: false, //退款弹窗
      showPaymentPopup: false, // 修改付款信息
      modal_note: false,
      // showCopyPopup: false, //批量复制listing
      showContent: false, //表头
      showOffShelfPopup: false, //下架
      recordCurrent: {},
      packupOrAn: '收起',
      selectTime: "",
      selectClass: "",
      form: {
        itemId: "",
        sku: "",
        publicaType: "",
        site: "",
        shop: [],
        date: "",
        publisher: "",
        salesStart: "",
        salesEnd: "",
        status: "Active",
        fullDataProcessing: false,
        location: "",
        title: "",
        country: "",
        bargaining: ''
      },
      page: {
        total: 0,
        size: 20,
        cureentPage: 1
      },
      tableHeight: "450px",
      bulkChanges: null,
      selectSort: "",
      bulkOperations: [
        {
          id: 1,
          show: "price",
          val: "批量修改价格"
        },
        {
          id: 2,
          show: "inStock",
          val: "批量修改库存"
        },
        {
          id: 3,
          show: "offShelf",
          val: "批量下架"
        },
        {
          id: 4,
          show: "putShelves",
          val: "批量重新上架"
        },
        {
          id: 5,
          show: "transport",
          val: "修改运输政策"
        },
        {
          id: 6,
          show: "refund",
          val: "修改退款政策"
        },
        {
          id: 7,
          show: "payment",
          val: "修改付款信息"
        },
        {
          id: 8,
          show: "allOpenBargaining",
          val: "批量开启议价"
        },
        {
          id: 9,
          show: "allCloseBargaining",
          val: "批量关闭议价"
        }
        // {
        //   id: 8,
        //   val: "批量复制listing"
        // }
      ],
      templateList: {
        list: [],
        site: "",
        site_id: null
      },
      sortField: [],
      sellType: [],
      handleType: [],
      timeDrop: [],
      onlineStatus: [],
      shopsitecurrency: {},
      tableData: [],
      multipleSelection: [],
      endListReason: [],
      listingUser: [],
      ebayUrl: process.env.VUE_APP_EBAY,
      btnClass: {
        price: false,
        inStock: false,
        offShelf: false,
        putShelves: false,
        transport: false,
        refund: false,
        payment: false,
        dealWith: false,
        shelf: false,
        copy: false,
        edit: false,
        log: false,
        openBargaining: false,
        closeBargaining: false,
        allCloseBargaining: false,
        allOpenBargaining: false
      },
      item_id: '',
      sort_asc: '',
      sort_desc: '',
      countriesList: [],
      showPopup: false,
      beforeVal: null
    };
  },
  created() {
    let id = this.$getMenuId(
      sessionStorage.getItem("munuIdList"),
      this.$route.path
    );
    this.getList();
    this.getshopsitecurrency();
    this.getControlBtn(id);
    this.getCountries();
  },
  // mounted() {
  //   window.addEventListener("scroll", this.showIcon);
  // },
  methods: {
    confirmAddNote() {
        let data = {
          item_id: this.item_id,
          note: this.modalNote
        }
        this.$axios.post('/listing/listing/add_note', data).then(res => {
          this.modal_note = false
          this.getList()
        })
    },
    /* 开启议价 */
    openBargaining(id) {
      let data = { item_id: [ id ] }
      this.openBargainingFunc(data)
    },
    /* 开启议价方法 */
    openBargainingFunc(data) {
      _g.confirmMsg("warning", "提示", "确认开启议价吗?", () => {
        openBargainingAPI(data).then(res => {
          this.getList()
          this.bulkChanges = null
          this.$message({
            type: "success",
            message: `${res.msg}`
          });
        })
      }, () => {
        this.bulkChanges = null
      })
    },
    /* 关闭议价 */
    closeBargaining(id) {
      let data = { item_id: [ id ] }
      this.closeBargainingFunc(data)
    },
    closeBargainingFunc(data) {
      _g.confirmMsg("warning", "提示", "确认关闭议价吗?", () => {
        closeBargainingAPI(data).then(res => {
          this.getList()
          this.bulkChanges = null
          this.$message({
            type: "success",
            message: `${res.msg}`
          });
        })
      }, () => {
        this.bulkChanges = null
      })
    },
    cancelAddNote() {
      this.modal_note = false
    },
    sortChange(column) {
      let { prop, order } = column
      console.log(prop)
      if (order === 'descending') {
        this.sort_asc = ''
        this.sort_desc = prop       
      } else {
        this.sort_desc = ''
        this.sort_asc = prop
      } 
      this.page.cureentPage = 1
      this.getList()
    },
    getList() {
      if (this.form.date) {
        var createTimeStart = this.form.date[0];
        var createTimeEnd = this.form.date[1];
      }
      let formdata = new FormData();
      formdata.append("item_id", this.form.itemId);
      formdata.append("sku", this.form.sku);
      if (this.form.shop.length) {
        this.form.shop.forEach(item => {
          formdata.append("shop_id[]", item); //店铺
        })
      } else {
          formdata.append("shop_id", ''); //店铺
      }
      formdata.append("sell_type", this.form.publicaType); //刊登类型
      formdata.append("time_type", this.selectTime); //时间类型
      formdata.append("start_time", createTimeStart || "");
      formdata.append("end_time", createTimeEnd || "");
      formdata.append("site", this.form.site); //站点
      formdata.append("handle_type", this.selectClass); //处理（销量和处理时间）
      formdata.append("quantity_min", this.form.salesStart); //最小值
      formdata.append("quantity_max", this.form.salesEnd); //最大值
      formdata.append("status", this.form.status); //平台状态
      formdata.append("sort_asc", this.sort_asc); //平台状态
      formdata.append("sort_desc", this.sort_desc); //平台状态
      formdata.append("publisher", this.form.publisher); //刊登人
      formdata.append("page", this.page.cureentPage); //当前页面
      formdata.append("per_page_num", this.page.size); //每页条数
      formdata.append("title", this.form.title); //标题
      formdata.append("country", this.form.country); //国家
      formdata.append("location", this.form.location); //标题
      formdata.append("best_offer", this.form.bargaining); //是否议价

      this.$axios.post(`/listing/listing/list`, formdata).then(res => {
        this.page.total = res.data.list.total;
        this.tableData = res.data.list.data;
        res.data.list.data.forEach(item => {
          this.$set(item, "isStockArr", []);
          this.$set(item, "priceArr", []);
          for (const key in item.newquantity) {
            const e = item.newquantity[key];
            item.isStockArr.push({ sku: key, isStock: e });
          }
          for (const key in item.price) {
            if (item.price.hasOwnProperty(key)) {
              const e = item.price[key];
              item.priceArr.push({ sku: key, price: e });
            }
          }
        });
        this.listingUser = res.data.listingUser;
        // this.sortField = _g.searchField(res.data.orderList);
        // this.sortField.unshift({ id: "", value: "请选择降序字段" });
        this.handleType = _g.searchField(res.data.handleType);
        this.sellType = _g.searchField(res.data.sellType);
        this.endListReason = _g.searchField(res.data.endListReason);
        this.onlineStatus = _g.searchField(res.data.onlineStatus);
        this.timeDrop = _g.searchField(res.data.timeType);
        if (!this.selectTime) this.selectTime = this.timeDrop[0].id; //初始化下拉框

        if (!this.selectClass) this.selectClass = this.handleType[0].id; //初始化下拉框

        _g.scrollTop();
      });
    },

    getshopsitecurrency() {
      this.$axios.get(`/listing/prepublish/shopsitecurrency`).then(res => {
        this.shopsitecurrency = res.data;
      });
    },
    // 下架回调
    callbackFreightPopup({ form, str }) {
      if (!form) {
        this.showOffShelfPopup = false;
        return false;
      }

      let formdata = new FormData();
      if (this.form.date) {
        var createTimeStart = this.form.date[0];
        var createTimeEnd = this.form.date[1];
      }
      if (this.form.shop.length) {
        this.form.shop.forEach(item => {
          formdata.append("shop_id[]", item); //店铺
        })
      } else {
          formdata.append("shop_id", ''); //店铺
      }
      formdata.append("item_id", this.form.itemId);
      formdata.append("sku", this.form.sku);
      // formdata.append("shop_id", this.form.shop); //店铺
      formdata.append("sell_type", this.form.publicaType); //刊登类型
      formdata.append("time_type", this.selectTime); //时间类型
      formdata.append("start_time", createTimeStart || "");
      formdata.append("end_time", createTimeEnd || "");
      formdata.append("site", this.form.site); //站点
      formdata.append("handle_type", this.selectClass); //处理（销量和处理时间）
      formdata.append("quantity_min", this.form.salesStart); //最小值
      formdata.append("quantity_max", this.form.salesEnd); //最大值
      formdata.append("status", this.form.status); //平台状态
      formdata.append("publisher", this.form.publisher); //刊登人
      formdata.append("title", this.form.title); //标题
      formdata.append("country", this.form.country); //国家
      formdata.append("batch_type", 3); //类别
      formdata.append("best_offer", this.form.bargaining);

      formdata.append("endlist_reason", form.reason);
      if (str === "single") {
        formdata.append("item_id[]", form.item_id);
      } else {
        form.item_id.forEach(item_id => {
          formdata.append("item_id[]", item_id);
        });
      }
      if (this.form.fullDataProcessing) {
        let params = this.getFilterCondition();
        let totalNum = null;
        this.$axios
          .get("/listing/listing/gloab_update_count", { params })
          .then(res => {
            totalNum = res.data.count;
            _g.confirmMsg(
              "warning",
              "提示",
              `已经选中${totalNum}条数据,是否进行全量数据处理?`,
              () => {
                this.$axios
                  .post("/listing/listing/gloab_update_save", formdata)
                  .then(res => {
                    if (res.code === 0) {
                      this.showOffShelfPopup = false
                      this.getList();
                      this.$message({
                        message: res.msg,
                        type: "success"
                      });
                    }            
                  });
                return false;
              }
            );
          });
      } else {
        this.$axios.post(`/listing/listing/endlisting`, formdata).then(res => {
          if (res.code === 0) {
            this.showOffShelfPopup = false
          }
          this.$message({
            message: res.msg,
            type: "success"
          });
        });
      }
    },
    // 下架
    offShelf(data, str) {
      this.showOffShelfPopup = true;
      this.$set(this.recordCurrent, "endListReason", this.endListReason);
      if (str == "single") {
        this.$set(this.recordCurrent, "title", "下架");
        this.$set(this.recordCurrent, "item_id", data.item_id);
      } else {
        this.$set(this.recordCurrent, "title", "批量下架");
        this.$set(this.recordCurrent, "item_id", data);
      }
    },
    // 复制
    copyOperation(data) {
      let tokenAndID = this.$getTokenAndID()
      let path = '/listingManagement/copyListing'
      let str = `${ this.ebayURL }${ path }?${tokenAndID}&online_listing_id=${ data }`
      window.open(str)
      // this.$router.push({
      //   name: "CopyListing",
      //   query: {
      //     online_listing_id: data
      //   }
      // });
    },
    // 运输政策回调
    callbackTransportPopup(data) {
      this.bulkChanges = null;
      if (typeof data === 'boolean') {
        this.showTransportPopup = false
        return
      }
      if (!data.form) {
        this.showTransportPopup = false;
        return false;
      }

      let {
        processingTime,
        itemLocation,
        countryArea,
        postcode,
        internalGroup,
        internationalGroup,
        noTransportation,
        unavailableShippingLocation
      } = data.form;
      let formdata = new FormData();
      let transportationRange = []; //运输范围，以|拼接起来
      let domesticTransport, internationalTransport; //国内国际运输
      // //  =>国内 //移除id 后端控制
      internalGroup.forEach((area, index) => {
        this.$set(area, "priority", index + 1);
        area.free_shipping = this.convertNum(area.free_shipping);
        this.$delete(area, "other_shipping_cost");
        if (area.free_shipping) {
          this.$delete(area, "shipping_cost");
          this.$delete(area, "add_shipping_cost");
        }
      });
      // //  =>国际  //移除id 后端控制
      internationalGroup.forEach((area, index) => {
        this.$set(area, "priority", index + 1);
        if (area.global) {
          this.$set(area, "shipping_location", "Worldwide");
        } else {
          area.shipping_location.forEach(location => {
            if (location.select) {
              transportationRange.push(location.value);
              area.shipping_location = transportationRange.join("|");
            }
          });

          if (!transportationRange.length) {
            area.shipping_location = "Worldwide";
          }
        }
        this.$delete(area, "countryAll");
        this.$delete(area, "global");
      });
      if (this.form.date) {
        var createTimeStart = this.form.date[0];
        var createTimeEnd = this.form.date[1];
      }
      if (this.form.shop.length) {
        this.form.shop.forEach(item => {
          formdata.append("shop_id[]", item); //店铺
        })
      } else {
          formdata.append("shop_id", ''); //店铺
      }
      formdata.append("sku", this.form.sku);
      // formdata.append("shop_id", this.form.shop); //店铺
      formdata.append("sell_type", this.form.publicaType); //刊登类型
      formdata.append("time_type", this.selectTime); //时间类型
      formdata.append("start_time", createTimeStart || "");
      formdata.append("end_time", createTimeEnd || "");
      formdata.append("site", this.form.site); //站点
      formdata.append("handle_type", this.selectClass); //处理（销量和处理时间）
      formdata.append("quantity_min", this.form.salesStart); //最小值
      formdata.append("quantity_max", this.form.salesEnd); //最大值
      formdata.append("status", this.form.status); //平台状态
      formdata.append("publisher", this.form.publisher); //刊登人
      formdata.append("title", this.form.title); //标题
      formdata.append("country", this.form.country); //国家
      formdata.append("batch_type", 5); //类别
      domesticTransport = JSON.stringify(internalGroup);
      internationalTransport = JSON.stringify(internationalGroup);
      formdata.append("dispatch_time_max", processingTime); //处理时间
      formdata.append("best_offer", this.form.bargaining);
      formdata.append("postal_code", postcode || ""); //邮编
      formdata.append("domestic_shipping", domesticTransport); //国内运输
      formdata.append("ddl_exclusion_list_type", String(noTransportation)); //运送类型
      formdata.append("international_shipping", internationalTransport); //国际运输
      if (unavailableShippingLocation.length) {
        formdata.append(
          "unavailable_shipping_location",
          unavailableShippingLocation.join("|")
        ); //不运送地区
      }
      if (this.form.fullDataProcessing) {
        let params = this.getFilterCondition();
        let totalNum = null;
        this.$axios
          .get("/listing/listing/gloab_update_count", { params })
          .then(res => {
            totalNum = res.data.count;
            console.log(formdata.get("international_shipping"));
            _g.confirmMsg(
              "warning",
              "提示",
              `已经选中${totalNum}条数据,是否进行全量数据处理?`,
              () => {
                formdata.append("shipping_location", itemLocation); //物品所在地（必填）
                formdata.append("shipping_country", countryArea); //国家/区域
                this.$axios
                  .post("/listing/listing/gloab_update_save", formdata)
                  .then(res => {
                    if (res.code === 0) {
                      this.showTransportPopup = false;
                      this.getList();
                      this.$message({
                        message: res.msg,
                        type: "success"
                      });
                    }
                    
                  });          
                return false;
              }
            );
          });
      } else {
        this.multipleSelection.forEach(item => {
          formdata.append("item_id[]", item.item_id); //item_id[]
        });
        formdata.append("location", itemLocation); //物品所在地（必填）
        formdata.append("country", countryArea); //国家/区域
        this.$axios
          .post("/listing/manage/shipping_service", formdata)
          .then(res => {
            if (res.code === 0) {
              this.$message({
                message: res.msg,
                type: "success"
              });
              this.getList();
              this.showTransportPopup = false;
            }       
          });
      }
    },

    // 获取模板
    getTemplateList() {
      let arr = [];
      let params = null;

      this.multipleSelection.forEach(item => {
        arr.push(item.item_id);
      });
      if (this.form.fullDataProcessing) {
        params = {
          item_id: [this.tableData[0].item_id]
        };
      } else {
        params = {
          item_id: arr
        };
      }
      this.$axios.get("/listing/manage/temps", { params }).then(res => {
        this.templateList = {
          list: [],
          site: "",
          site_id: null
        };
        this.templateList = res.data;
        this.showPopup = true;
      });
      return arr;
    },
    // 获取批量数据
    getBatchAll() {
      let arr = [];
      this.multipleSelection.forEach(item => {
        arr.push(item.item_id);
      });
      return arr;
    },
    // 选择批量修改弹窗
    selectPopup() {
      if (this.form.fullDataProcessing) {
        if (this.bulkChanges !==8 && this.bulkChanges !== 9 ) {
          if (!this.form.shop.length) {      
            this.$message({
              message: "请先选择店铺!",
              type: "warning"
            });
            this.bulkChanges = ''
            return
          }
        } else if (!this.multipleSelection.length) {
          this.$message({
            message: "请先勾选列表数据!",
            type: "warning"
          });
          this.bulkChanges = null;
          return false;
        }
        this.unifyAll = true;    
      } else if (!this.multipleSelection.length) {
        this.$message({
          message: "请先勾选列表数据!",
          type: "warning"
        });
        this.bulkChanges = null;
        return false;
      }
      switch (this.bulkChanges) {
        case 1:
          let priceOptions = [
            {
              id: 0,
              val: "修改为固定价格"
            },
            {
              id: 1,
              val: "原价格基础上增加"
            },
            {
              id: 2,
              val: "原价格基础上减少"
            },
            {
              id: 3,
              val: "原价格乘以百分比"
            }
          ];
          let priceExplanation = ["拍卖仅修改起拍价", "多属性改变所有变种价格"];
          this.$set(this.recordCurrent, "title", "批量修改价格");
          this.$set(this.recordCurrent, "options", priceOptions);
          this.$set(this.recordCurrent, "explanation", priceExplanation);
          this.$set(this.recordCurrent, "bulkChangesId", this.bulkChanges);

          this.showBatchEditPopup = true;
          break;
        case 2:
          let inStockOptions = [
            {
              id: 0,
              val: "修改为固定库存数量"
            },
            {
              id: 1,
              val: "原库存数量上增加"
            },
            {
              id: 2,
              val: "原库存数量上减少"
            }
          ];
          let inStockExplanation = [
            "拍卖产品不支持修改库存",
            "多属性改变所有变种库存"
          ];
          this.$set(this.recordCurrent, "title", "批量修改库存");
          this.$set(this.recordCurrent, "options", inStockOptions);
          this.$set(this.recordCurrent, "explanation", inStockExplanation);
          this.$set(this.recordCurrent, "bulkChangesId", this.bulkChanges);
          this.showBatchEditPopup = true;
          break;
        case 3:
          // if (this.isSame()) {
          let arr = this.getBatchAll();
          this.offShelf(arr, "multiple");
          this.bulkChanges = null;
          // }
          break;
        case 4:
          // if (this.isActive("Completed")) {
          this.reListItemRequest();
          // }
          break;
        case 5:
          // if (this.isSame() && this.isActive("Active")) {
          let arrTemplate = this.getTemplateList();
          setTimeout(() => {
            if (this.showPopup) {
              this.$set(this.recordCurrent, "title", "修改运输政策");
              this.$set(this.recordCurrent, "item_id", arrTemplate);
              this.showTransportPopup = true;
            }
          }, 800);
          break;
        case 6:
          // if (this.isSame()) {
          let arrRecord = this.getTemplateList();
          setTimeout(() => {
            if (this.showPopup) {
              this.$set(this.recordCurrent, "title", "修改退款政策");
              this.$set(this.recordCurrent, "item_id", arrRecord);
              this.showRefundPopup = true;
            }
          }, 800);
          // }
          break;
        case 7:
          // if (this.isSame()) {
          let arrPayment = this.getTemplateList();
          setTimeout(() => {
            if (this.showPopup) {
              this.$set(this.recordCurrent, "title", "修改付款信息");
              this.$set(this.recordCurrent, "item_id", arrPayment);
              this.showPaymentPopup = true;
            }
          }, 800);
          // }
          break;
          case 8:
          let list = this.multipleSelection.filter(item => item.gj_best_offer === 0 && item.sell_type === '固定价格' && item.online_status === 'Active')
          let idList = list.map(item => item.item_id)
          if (!idList.length) {
            this.$message({
              type: 'warning',
              message: '当前没有符合条件的数据'
            })
            return
          }
          this.openBargainingFunc({ item_id: idList })
          return
          case 9:
          let listClose = this.multipleSelection.filter(item => item.gj_best_offer === 1 && item.sell_type === '固定价格' && item.online_status === 'Active')
          let idListClose = listClose.map(item => item.item_id)
          if (!idListClose.length) {
            this.$message({
              type: 'warning',
              message: '当前没有符合条件的数据'
            })
            return
          }
          this.closeBargainingFunc({ item_id: idListClose })
          return
      }
    },
    //  运输政策 -- 获取国家/区域
    getCountries() {
      this.$axios.get(`/listing/info/store/shippingCountryList`).then(res => {
        this.countriesList = res.data;
      });
    },
    // 排序字段
    OrderChange() {
      this.page.cureentPage = 1;

      this.getList();
    },
    // 退款弹窗回调
    callbackRecordPopup(data) {
      this.bulkChanges = null;
      if (typeof data === 'boolean') {
        this.showRefundPopup = false
        return
      }  
      let { form, itemId } = data;
      if (!form) {
        return false;
      }
      let formdata = new FormData();
      itemId.forEach(id => {
        formdata.append("item_id[]", id);
      });
      form.domestic = this.convertNum(form.domestic);
      form.foreign = this.convertNum(form.foreign);
      formdata.append("returns_accepted", form.domestic); //接受国内退款
      if (form.domestic) {
        formdata.append("returns_with_in", form.domesticDays); //国内退款天数
        formdata.append("shipping_cost_paid_by", form.domesticUndertaker); //国内退货运费承担方
      }
      formdata.append("internation_returns_accepted", form.foreign); //接受国外退款
      if (form.foreign) {
        formdata.append("internation_returns_with_in", form.foreignDays); //国外退款天数
        formdata.append(
          "internation_shipping_cost_paid_by",
          form.foreignUndertaker
        ); //国外退货运费承担方
      }

      if (this.form.date) {
        var createTimeStart = this.form.date[0];
        var createTimeEnd = this.form.date[1];
      }
      if (this.form.shop.length) {
        this.form.shop.forEach(item => {
          formdata.append("shop_id[]", item); //店铺
        })
      } else {
          formdata.append("shop_id", ''); //店铺
      }
      formdata.append("sku", this.form.sku);
      // formdata.append("shop_id", this.form.shop); //店铺
      formdata.append("sell_type", this.form.publicaType); //刊登类型
      formdata.append("time_type", this.selectTime); //时间类型
      formdata.append("start_time", createTimeStart || "");
      formdata.append("end_time", createTimeEnd || "");
      formdata.append("site", this.form.site); //站点
      formdata.append("handle_type", this.selectClass); //处理（销量和处理时间）
      formdata.append("quantity_min", this.form.salesStart); //最小值
      formdata.append("quantity_max", this.form.salesEnd); //最大值
      formdata.append("status", this.form.status); //平台状态
      formdata.append("publisher", this.form.publisher); //刊登人
      formdata.append("title", this.form.title); //标题
      formdata.append("country", this.form.country); //国家
      formdata.append("batch_type", 6); //类别
      formdata.append("best_offer", this.form.bargaining);
      if (this.form.fullDataProcessing) {
        let params = this.getFilterCondition();
        let totalNum = null;
        this.$axios
          .get("/listing/listing/gloab_update_count", { params })
          .then(res => {
            totalNum = res.data.count;
            _g.confirmMsg(
              "warning",
              "提示",
              `已经选中${totalNum}条数据,是否进行全量数据处理?`,
              () => {
                this.$axios
                  .post("/listing/listing/gloab_update_save", formdata)
                  .then(res => {
                    this.showRefundPopup = false
                    this.getList();
                    this.$message({
                      message: res.msg,
                      type: "success"
                    });
                  });
                return false;
              }
            );
          });
      } else {
        this.$axios
          .post("/listing/manage/return_policy", formdata)
          .then(res => {
            this.showRefundPopup = false
            this.getList();
            this.$message({
              message: res.msg,
              type: "success"
            });
          });
      }
    },
    // 修改付款信息回调
    callbackPaymenPopup(data) {
      this.bulkChanges = null;
      if (typeof data === 'boolean') {
          this.showPaymentPopup = false;
          return
      } 
      if (!data) {
        return false;
      }
      let { textarea } = data;
      let formdata = new FormData();
      this.multipleSelection.forEach(item => {
        formdata.append("item_id[]", item.item_id);
      });
      formdata.append("payment_instructions", textarea);

      if (this.form.date) {
        var createTimeStart = this.form.date[0];
        var createTimeEnd = this.form.date[1];
      }
      if (this.form.shop.length) {
        this.form.shop.forEach(item => {
          formdata.append("shop_id[]", item); //店铺
        })
      } else {
          formdata.append("shop_id", ''); //店铺
      }
      formdata.append("sku", this.form.sku);
      // formdata.append("shop_id", this.form.shop); //店铺
      formdata.append("sell_type", this.form.publicaType); //刊登类型
      formdata.append("time_type", this.selectTime); //时间类型
      formdata.append("start_time", createTimeStart || "");
      formdata.append("end_time", createTimeEnd || "");
      formdata.append("site", this.form.site); //站点
      formdata.append("handle_type", this.selectClass); //处理（销量和处理时间）
      formdata.append("quantity_min", this.form.salesStart); //最小值
      formdata.append("quantity_max", this.form.salesEnd); //最大值
      formdata.append("status", this.form.status); //平台状态
      formdata.append("publisher", this.form.publisher); //刊登人
      formdata.append("title", this.form.title); //标题
      formdata.append("country", this.form.country); //国家
      formdata.append("batch_type", 7); //类别
      formdata.append("best_offer", this.form.bargaining);
      if (this.form.fullDataProcessing) {
        let params = this.getFilterCondition();
        let totalNum = null;
        this.$axios
          .get("/listing/listing/gloab_update_count", { params })
          .then(res => {
            totalNum = res.data.count;
            _g.confirmMsg(
              "warning",
              "提示",
              `已经选中${totalNum}条数据,是否进行全量数据处理?`,
              () => {
                this.$axios
                  .post("/listing/listing/gloab_update_save", formdata)
                  .then(res => {
                    if (res.code === 0) {
                      this.showPaymentPopup = false
                      this.getList();
                       this.$message({
                        message: res.msg,
                        type: "success"
                      });
                    }             
                  });
                return false;
              }
            );
          });
      } else {
        this.$axios
          .post("/listing/manage/payment_method", formdata)
          .then(res => {
            if (res.code === 0) {
              this.showPaymentPopup = false
              this.$message({
                message: res.msg,
                type: "success"
              });
            this.bulkChanges = null;
            this.getList();
            }         
          });
      }
    },
    // showIcon() {
    //   if (
    //     !!document.documentElement.scrollTop &&
    //     document.documentElement.scrollTop > 480
    //    ) {            
    //         console.log(document.documentElement.scrollTop)
    //     } else {
    //          console.log(document.documentElement.scrollTop)
    //     }
    // },
    // callbackCopyPopup(data) {
    //   this.showCopyPopup = false;
    //   this.bulkChanges = null;
    //   console.log(data);
    // },
    // 日志
    getLog(data) {
      let params = {
        listing_id: data.id
      };
      this.$axios.get(`/listing/listing/log`, { params }).then(res => {
        this.$set(data, "gridData", res.data.list);
        this.$set(data, "titleLog", "日志");
        this.recordCurrent = data;
        this.showLogPopup = true;
      });
    },
    note(item) {
      this.modalNote = item.note
      this.item_id = item.item_id
      this.modal_note = true
    },
    // 日志回调
    callbackLogPopup(data) {
      this.showLogPopup = false;
    },
    // 批量价格弹窗 / 批量修改库存弹窗
    callbackPricePopup(data) {
      this.bulkChanges = null;
      if (typeof data === 'boolean') {
        this.showBatchEditPopup = false;
        return 
      }    
      let totalNum = null;
      if (!data.form) {
        return false;
      }

      let { mode, val, status } = data.form;
      if (status) {
        status = 1;
      } else {
        status = 0;
      }
      let formdata = new FormData();
      this.multipleSelection.forEach(item => {
        formdata.append("item_id[]", item.item_id);
      });
      formdata.append("change_type", mode);
      formdata.append("change_value", val);
      formdata.append("is_sync", status);

      if (this.form.fullDataProcessing) {
        let params = this.getFilterCondition();
        this.$axios
          .get("/listing/listing/gloab_update_count", { params })
          .then(res => {
            totalNum = res.data.count;

            if (this.form.date) {
              var createTimeStart = this.form.date[0];
              var createTimeEnd = this.form.date[1];
            }
            if (this.form.shop.length) {
              this.form.shop.forEach(item => {
                formdata.append("shop_id[]", item); //店铺
              })
            } else {
                formdata.append("shop_id", ''); //店铺
            }
            formdata.append("item_id", this.form.itemId);
            formdata.append("sku", this.form.sku);
            // formdata.append("shop_id", this.form.shop); //店铺
            formdata.append("sell_type", this.form.publicaType); //刊登类型
            formdata.append("time_type", this.selectTime); //时间类型
            formdata.append("start_time", createTimeStart || "");
            formdata.append("end_time", createTimeEnd || "");
            formdata.append("site", this.form.site); //站点
            formdata.append("handle_type", this.selectClass); //处理（销量和处理时间）
            formdata.append("quantity_min", this.form.salesStart); //最小值
            formdata.append("quantity_max", this.form.salesEnd); //最大值
            formdata.append("status", this.form.status); //平台状态
            formdata.append("publisher", this.form.publisher); //刊登人
            formdata.append("title", this.form.title); //标题
            formdata.append("country", this.form.country); //国家

            if (data.code) {
              formdata.append("batch_type", 1); //类型
              _g.confirmMsg(
                "warning",
                "提示",
                `已经选中${totalNum}条数据,是否进行全量数据处理?`,
                () => {
                  this.$axios
                    .post("/listing/listing/gloab_update_save", formdata)
                    .then(res => {
                      if (res.code === 0) {
                          this.showBatchEditPopup = false
                          this.getList();
                          this.$message({
                            message: res.msg,
                            type: "success"
                          });
                      }                 
                    });
                }
              );
            } else {
              formdata.append("batch_type", 2); //类型
              _g.confirmMsg(
                "warning",
                "提示",
                `已经选中${totalNum}条数据,是否进行全量数据处理?`,
                () => {
                  this.$axios
                    .post("/listing/listing/gloab_update_save", formdata)
                    .then(res => {
                     if (res.code === 0) {
                          this.showBatchEditPopup = false
                          this.getList();
                          this.$message({
                            message: res.msg,
                            type: "success"
                          });
                      }      
                    });
                }
              );
            }
          });
      } else {
        if (data.code) {
          this.startPriceRequest(formdata);
        } else {
          this.quantityRequest(formdata);
        }
      }
    },
    getFilterCondition() {
      if (this.form.date) {
        var createTimeStart = this.form.date[0];
        var createTimeEnd = this.form.date[1];
      }
      let params = {
        item_id: this.form.itemId,
        sku: this.form.sku,
        shop_id: this.form.shop,
        sell_type: this.form.publicaType,
        time_type: this.selectTime,
        start_time: createTimeStart || "",
        end_time: createTimeEnd || "",
        site: this.form.site,
        handle_type: this.selectClass,
        quantity_min: this.form.salesStart,
        quantity_max: this.form.salesEnd,
        status: this.form.status,
        publisher: this.form.publisher,
        title: this.form.title,
        country: this.form.country
      };

      return params;
    },
    // 批量修改价格API
    startPriceRequest(formdata) {
      if (this.form.fullDataProcessing) {
        return;
      }
      this.$axios.post("/listing/manage/start_price", formdata).then(res => {
        if (res.code === 0) {
          this.showBatchEditPopup = false;
          this.bulkChanges = null;
          this.getList();
          this.$message({
            message: res.msg,
            type: "success"
          });
        }      
      });
    },
    // 批量修改库存API
    quantityRequest(formdata) {
      if (this.form.fullDataProcessing) {
        return;
      }
      this.$axios.post("/listing/manage/quantity", formdata).then(res => {
        if (res.code === 0) {
          this.showBatchEditPopup = false;
          this.bulkChanges = null;
          this.getList();
          this.$message({
            message: res.msg,
            type: "success"
          });
        }
        
      });
    },
    // 批量重新上架
    reListItemRequest() {
      let formdata = new FormData();
      this.multipleSelection.forEach(item => {
        formdata.append("item_id[]", item.item_id);
      });
      if (this.form.date) {
        var createTimeStart = this.form.date[0];
        var createTimeEnd = this.form.date[1];
      }
      if (this.form.shop.length) {
        this.form.shop.forEach(item => {
          formdata.append("shop_id[]", item); //店铺
        })
      } else {
          formdata.append("shop_id", ''); //店铺
      }
      formdata.append("sku", this.form.sku);
      // formdata.append("shop_id", this.form.shop); //店铺
      formdata.append("sell_type", this.form.publicaType); //刊登类型
      formdata.append("time_type", this.selectTime); //时间类型
      formdata.append("start_time", createTimeStart || "");
      formdata.append("end_time", createTimeEnd || "");
      formdata.append("site", this.form.site); //站点
      formdata.append("handle_type", this.selectClass); //处理（销量和处理时间）
      formdata.append("quantity_min", this.form.salesStart); //最小值
      formdata.append("quantity_max", this.form.salesEnd); //最大值
      formdata.append("status", this.form.status); //平台状态
      formdata.append("publisher", this.form.publisher); //刊登人
      formdata.append("title", this.form.title); //标题
      formdata.append("country", this.form.country); //国家
      formdata.append("batch_type", 4); //類別
      if (this.form.fullDataProcessing) {
        let params = this.getFilterCondition();
        let totalNum = null;
        this.$axios
          .get("/listing/listing/gloab_update_count", { params })
          .then(res => {
            totalNum = res.data.count;
            _g.confirmMsg(
              "warning",
              "提示",
              `已经选中${totalNum}条数据,是否进行全量数据处理?`,
              () => {
                this.$axios
                  .post("/listing/listing/gloab_update_save", formdata)
                  .then(res => {
                    if (res.code === 0) {
                      this
                      this.getList();
                      this.$message({
                        message: res.msg,
                        type: "success"
                      });
                    }
                    
                  });
                return false;
              }
            );
          });
      } else {
        this.$axios.post("/listing/manage/re_list_item", formdata).then(res => {
          this.getList();
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.bulkChanges = null;
        });
      }
    },
    chagneBeforeVal(e) {
      this.beforeVal = e;
    },
    chagneInputVal(row, item, val, str) {
      if (!val) {
        return;
      }

      let formdata = new FormData();
      formdata.append("item_id", row.item_id);
      formdata.append("sku", item.sku);
      formdata.append("change_value", val);
      if (val !== this.beforeVal) {
        if (str === "price") {
          this.$axios
            .post("/listing/manage/single_start_price", formdata)
            .then(res => {
              if (res.code === 0) {
                this.$message({
                  message: `${res.msg}`,
                  type: "success"
                });
              } else {
                item.price = this.beforeVa
              }
            })
            .catch(err => this.getList()); //请求失败;
        } else {
          this.$axios
            .post("/listing/manage/single_quantity", formdata)
            .then(res => {
              if (res.code === 0) {
                this.$message({
                  message: `${res.msg}`,
                  type: "success"
                });
              } else {
                item.price = this.beforeVa
              }
            })
            .catch(err => this.getList()); //请求失败;
        }
      }
    },

    moreContent() {
      this.showContent = !this.showContent;
    },

    // 重置表单
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 编辑
    edit(data) {
      let tokenAndID = this.$getTokenAndID()
      let path = '/listingManagement/listingEdit'
      let str = `${ this.ebayURL }${ path }?${tokenAndID}&online_listing_id=${ data }`
      window.open(str)
    },

    isSame() {
      let arr = [];
      let isSame;
      this.multipleSelection.forEach(item => {
        arr.push(item.site);
      });
      for (let i = 0; i < arr.length; i++) {
        isSame = arr.every(e => e === arr[0]);
      }
      if (!isSame) {
        this.$message({
          message: "勾选的数据需在同一个站点下!",
          type: "warning"
        });
        this.bulkChanges = null;
        return false;
      }
      return true;
    },
    isActive(status) {
      let arr = [];
      let isSame;
      this.multipleSelection.forEach(item => {
        arr.push(item.online_status);
      });
      for (let i = 0; i < arr.length; i++) {
        isSame = arr.every(e => e === status);
        if (!isSame) {
          this.$message({
            message: `请勾选平台状态为 ${status} 的数据`,
            type: "warning"
          });
          this.bulkChanges = null;
          return false;
        }
        return true;
      }
    },
    // 搜索表单
    submitForm() {
      this.page.cureentPage = 1;
      this.getList();
    },
    /* 展开or收起 */
    changePackupOrAn() {
      this.show = !this.show
      this.packupOrAn = this.show ? '收起' : '展开'
      this.tableHeight = this.show ? '450px' : '580px'
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
    checkValue() {
      if (!this.form.salesStart || !this.form.salesEnd) return;
      if (this.form.salesStart > this.form.salesEnd) {
        [this.form.salesStart, this.form.salesEnd] = [
          this.form.salesEnd,
          this.form.salesStart
        ];
      }
    },

    convertNum(val) {
      if (val) {
        val = 1;
      } else {
        val = 0;
      }
      return val;
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


<style  >
.content-under {
  margin-top: 20px;
}
.flex-j {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
.nested {
  margin: 0 15px;
  cursor: pointer;
}
.editColor {
  color: #e6a23c;
}
.synColor {
  color: #409eff;
}
.logColor {
  color: #909399;
}
.copyColor {
  color: #67c23a;
}
#head-cover {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.field-expansion {
  position: absolute;
  width: 150px;
  right: 0;
  border-radius: 5px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  z-index: 2;
}
.field-expansion::after {
  position: absolute;
  top: -18px;
  right: 10px;
  content: "";
  width: 10px;
  height: 10px;
  border-top: 10px solid transparent;
  border-left: 10px solid transparent;
  border-bottom: 10px solid #fff;
  border-right: 10px solid transparent;
  z-index: 3;
}
.field-expansion li {
  margin: 5px 0;
  padding: 0 5px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
</style>