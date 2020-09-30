<template>
  <div>
    <div class="main">
      <div class="header">
        <div class="header1">
          <h2>货件详情</h2>
        </div>
        <div class="header2">
          <span>货件单号</span>
          <span>{{ inbound_code }}</span>
          <span
            :style="{ color: shipment_status == 'WORKING' ? 'green' : '' }"
            >{{ shipment_status }}</span
          >
        </div>
        <div class="header3">
          <el-steps :active="pack_status" align-center>
            <el-step title="上传物流信息"></el-step>
            <el-step title="上传装箱信息"></el-step>
            <el-step title="打印箱子标签"></el-step>
            <el-step title="发货"></el-step>
          </el-steps>
        </div>
        <div class="header4">
          <el-tabs v-model="infoType" @tab-click="infoSel">
            <el-tab-pane label="基本信息" name="baseInfo">
              <template>
                <div class="header4Info">
                  <el-row>
                    <el-col :span="8">
                      <span>店铺-</span>
                      <span>{{ base_info.shop_name }}</span>
                    </el-col>
                    <el-col :span="8">
                      <span>标签类型-</span>
                      <span>{{
                        base_info.label_prep_type == "AMAZON_LABEL_ONLY"
                          ? "亚马逊贴标签"
                          : "卖家自己贴标签"
                      }}</span>
                    </el-col>
                    <el-col :span="8">
                      <span>货件名称-</span>
                      <span>{{ base_info.shipment_name }}</span>
                    </el-col>
                  </el-row>
                </div>
                <div class="header4Info">
                  <el-row>
                    <el-col :span="8">
                      <span>包装类型-</span>
                      <span>{{
                        base_info.pack_type == 0 ? "混装" : "原装"
                      }}</span>
                    </el-col>
                    <el-col :span="8">
                      <span>创建人-</span>
                      <span>{{ base_info.creater_name }}</span>
                    </el-col>
                    <el-col :span="8">
                      <span>创建时间-</span>
                      <span>{{ base_info.created_time }}</span>
                    </el-col>
                  </el-row>
                </div>
              </template>
            </el-tab-pane>
            <el-tab-pane label="寄件信息" name="mailInfo">
              <div class="header4Info">
                <el-row>
                  <el-col :span="8">
                    <span>寄件人-</span>
                    <span>{{ send_info.name }}</span>
                  </el-col>
                  <el-col :span="8">
                    <span>邮编-</span>
                    <span>{{ send_info.postal_code }}</span>
                  </el-col>
                  <el-col :span="8">
                    <span>国家-</span>
                    <span>{{ send_info.country }}</span>
                  </el-col>
                </el-row>
              </div>
              <div class="header4Info">
                <el-row>
                  <el-col :span="8">
                    <span>州/省-</span>
                    <span>{{ send_info.province }}</span>
                  </el-col>
                  <el-col :span="8">
                    <span>城市-</span>
                    <span>{{ send_info.city }}</span>
                  </el-col>
                  <el-col :span="8">
                    <span>街道地址-</span>
                    <span>{{ send_info.address_line1 }}</span>
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane label="收件信息" name="shipInfo">
              <div class="header4Info">
                <el-row>
                  <el-col :span="6">
                    <span>收件人-</span>
                    <span>{{ recipient_info.name }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>配送地址-</span>
                    <span>{{ recipient_info.express_address }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>邮编-</span>
                    <span>{{ recipient_info.postal_code }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>国家-</span>
                    <span>{{ recipient_info.country }}</span>
                  </el-col>
                </el-row>
              </div>
              <div class="header4Info">
                <el-row>
                  <el-col :span="6">
                    <span>州/省-</span>
                    <span>{{ recipient_info.province }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>城市-</span>
                    <span>{{ recipient_info.city }}</span>
                  </el-col>
                  <el-col :span="12">
                    <span>街道地址-</span>
                    <span>{{ recipient_info.address_line1 }}</span>
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="con">
        <div class="con1">
          <h3>1.物流信息</h3>
          <div class="con1Sel">
            <ul>
              <li>
                <span style="color: red">*</span>
                <span>物流类型：</span>
                <el-select
                  v-model="shipping_info.shipment_type"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, key) in shipmentsAllType"
                    :key="key"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </li>
              <li>
                <span style="color: red">*</span>
                <span>承运人：</span>
                <el-select
                  v-model="shipping_info.carrier_name"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, key) in carrierAll"
                    :key="key"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </li>
            </ul>
          </div>
          <div class="con1Btn">
            <el-button
              v-if="showButtons.uploadLog"
              type="primary"
              style="float: right; marginright: 50px"
              @click="uploadTransport"
              :disabled="pack_status == 0 || pack_status == 1 ? false : true"
              >上传物流信息</el-button
            >
          </div>
        </div>
        <div class="con2">
          <h3>2.装箱信息</h3>

          <div
            style="display: flex; justify-content: flex-end; align-item: center"
          >
            <p style="fontweight: bold; margin: 0; line-height: 36px">
              装箱方式：
            </p>
            <div style="margin-right: 15px">
              <el-input :value="base_info.pack_type" disabled />
            </div>
            <p style="fontweight: bold; margin: 0; line-height: 36px">
              总箱数：
            </p>
            <div>
              <el-input
                v-if="pack_type == 0"
                v-model="tableData.boxes_total"
                oninput="value=value.replace(/[^0-9]/g,'')"
                :disabled="pack_status != 1"
                @input="boxesTotalChange(tableData.boxes_total)"
              />
              <el-input v-if="pack_type == 1" :value="boxTotalT" disabled />
            </div>
          </div>
          <div class="table" v-if="hasTable">
            <ShipmentsDetailTable
              :tableData="tableData"
              :inbound_id="inbound_id"
              :boxes_total="tableData.boxes_total"
              :pack_type="pack_type"
              :pack_status="pack_status"
              @uploadBoxInfoToF="uploadBoxInfoToF"
            />
          </div>
          <div class="con2Btn">
            <el-button
              v-if="showButtons.uploadBox"
              type="primary"
              style="float: right; marginright: 50px"
              @click="uploadBinningInfo"
              :disabled="pack_status == 1 ? false : true"
              >上传装箱信息</el-button
            >
          </div>
        </div>
        <div class="con5">
          <h3>3.物流询价反馈</h3>
          <div>
            <div>
              <span
                ><span style="color: red; margin-right: 5px">*</span>运费:</span
              >
              <el-input
                style="width: 200px"
                v-model="logistics_inquiry_info.logistics_fee"
                oninput="value=value.replace(/[^0-9.]/g,'')"
                :disabled="pack_status != 2 ? true : false"
              />
              <div style="display: inline-block; margin-left: 50px">
                <span
                  ><span style="color: red; margin-right: 5px">*</span
                  >运费分摊方式:</span
                >
                <el-select
                  slot="prepend"
                  v-model="logistics_inquiry_info.fee_avg_assign"
                  placeholder="选择类别"
                  :disabled="pack_status != 2 ? true : false"
                >
                  <el-option
                    v-for="(item, key) in freightAll"
                    :key="key"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
            </div>

            <!-- <div>
              <span><i>*</i>物流承运商:</span>
              <el-select
                style="width: 200px"
                slot="prepend"
                placeholder="选择类别"
                v-model="logistics_inquiry_info.carrier_name"
                filterable
              >
                <el-option
                  v-for="(item, key) in LogisticsCarriers"
                  :key="key"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div>
              <span><i>*</i>物流单号:</span>
              <el-input
                v-model="logistics_inquiry_info.tracking_id"
                oninput="value=value.replace(/[^\d]/g,'')"
                style="width: 200px"
              />
            </div> -->
            <div>
              <span>备注:</span>
              <el-input
                style="width: 350px"
                v-model="logistics_inquiry_info.remark"
                type="textarea"
                :disabled="pack_status != 2 ? true : false"
              />
              <div style="display: inline-block; margin-left: 10px">
                <el-upload
                  :show-file-list="false"
                  :action="uploadLogisticsURL"
                  :headers="headers"
                  :data="logisticsData"
                  :before-upload="beforeUpload"
                  :on-success="uploadSuccess"
                  :limit="3"
                >
                  <el-button
                    size="small"
                    type="text"
                    v-show="logistics_inquiry_info.attach_file.length !== 3"
                    >添加附件</el-button
                  >
                  <div slot="tip" class="el-upload__tip tag-list">
                    <el-tag
                      closable
                      @click="hanleClick(item.file_url)"
                      @close="handleClose(index)"
                      type="info"
                      v-for="(item,
                      index) in logistics_inquiry_info.attach_file"
                      :key="item.file_url"
                      ><i class="el-icon-tickets"></i
                      >{{ item.file_name }}</el-tag
                    >
                  </div>
                </el-upload>
              </div>
            </div>
            <div class="logisticsTable">
              <logisticsTable
                :tableData="logistics_inquiry_info.sku_list"
                :logistics_fee="logistics_inquiry_info.logistics_fee"
                :fee_avg_assign="logistics_inquiry_info.fee_avg_assign"
                @changeSaveDisabled="changeSaveDisabled"
              />
            </div>
            <div>
              <el-button
                size="small"
                type="primary"
                :disabled="
                  pack_status != 2 ? true : !saveDisabled ? false : true
                "
                @click="saveLogistics"
                >保存</el-button
              >
            </div>
          </div>
        </div>
        <div class="con6">
          <h3>4.运营确认发货</h3>
          <el-button
            size="small"
            type="primary"
            :disabled="pack_status === 2 ? false : true"
            @click="confirmShipped"
            >确认发货</el-button
          >
        </div>
        <div class="con3">
          <h3>5.打印箱子标签</h3>
          <div class="con3Func">
            <ul>
              <li>
                <p><span style="color: red">*</span> 打印次数：</p>
                <div>
                  <el-input v-model="printNum" placeholder="打印次数" />
                </div>
              </li>
              <li>
                <span> <span style="color: red">*</span> 纸张类型： </span>
                <el-select
                  v-model="paperTypeSel"
                  style="width: 230px"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, key) in paperTypeAll"
                    :key="key"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </li>
              <li>
                <span>纸张规格108*152毫米</span>
              </li>
            </ul>
          </div>
          <div class="con3Btn">
            <el-button
              v-if="showButtons.printTitle"
              type="primary"
              style="float: right; marginright: 50px"
              @click="printBoxTitle"
              :disabled="pack_status == 2 || pack_status == 3 ? false : true"
              >打印箱子标签</el-button
            >
          </div>
        </div>
        <div class="con4">
          <h3>6.标记发货</h3>

          <div class="con4Btn">
            <el-button
              v-if="showButtons.sign"
              type="primary"
              style="float: right; marginright: 50px"
              @click="signShipment"
              :disabled="pack_status == 3 ? false : true"
              >标记发货</el-button
            >
          </div>
        </div>
      </div>
      <div class="footerBtn">
        <!-- <el-button type="primary" @click="save">保存</el-button> -->
        <el-button plain @click="cancel">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { loading, loadingClose, message } from "@/utils/common";
import ShipmentsDetailTable from "@/views/FBA/shipments/components/ShipmentsDetailTable";
import logisticsTable from "@/views/FBA/shipments/components/logisticsTable";
import { debounce } from "@/utils/common";
import {
  getSesstionToken,
  getStaffIdSession,
  getStaffNameSession,
} from "@/utils/auth";
import {
  reqGetShipmentsDetail,
  reqUpdataLogisticsInfo,
  reqUpdataInboundPackInfo,
  reqGetBoxTitle,
  signShipments,
  saveLogistics,
  confirmShipped,
} from "@/api/FBA";
import { date } from "jszip/lib/defaults";
export default {
  data() {
    return {
      //货件类型all
      shipmentsAllType: [
        {
          label: " 小包裹快递",
          value: "SP",
        },
      ],
      //物流询价禁用标识
      saveDisabled: false,
      logistics_inquiry_info: {
        attach_file: [],
        logistics_fee: "",
        can_use_real: "",
        fee_avg_assign: "",
        taxes: "",
        remark: "",
      },
      taxes: "",
      uploadLogisticsURL: `${process.env.VUE_APP_AMAZON_PHP}/api/fba/upload_inquiry_attach`,
      logisticsData: {
        inbound_id: this.$route.query.id,
      },
      headers: {
        staffId: JSON.parse(getStaffIdSession()),
        staffName: encodeURIComponent(JSON.parse(getStaffNameSession())),
      },
      // shipmentsTypeSel: "", //货件类型
      //承运人All
      carrierAll: [
        {
          label: "BUSINESS_POST",
          value: "BUSINESS_POST",
        },
        {
          label: "DHL_AIRWAYS_INC",
          value: "DHL_AIRWAYS_INC",
        },
        {
          label: "DHL_UK",
          value: "DHL_UK",
        },
        {
          label: "PARCELFORCE",
          value: "PARCELFORCE",
        },
        {
          label: "DPD",
          value: "DPD",
        },
        {
          label: "TNT_LOGISTICS_CORPORATION",
          value: "TNT_LOGISTICS_CORPORATION",
        },
        {
          label: "TNT",
          value: "TNT",
        },
        {
          label: "YODEL",
          value: "YODEL",
        },
        {
          label: "UNITED_PARCEL_SERVICE_INC",
          value: "UNITED_PARCEL_SERVICE_INC",
        },
        {
          label: "OTHER",
          value: "OTHER",
        },
        {
          label: "DHL_EXPRESS_USA_INC",
          value: "DHL_EXPRESS_USA_INC",
        },
        {
          label: "FEDERAL_EXPRESS_CORP",
          value: "FEDERAL_EXPRESS_CORP",
        },
        {
          label: "UNITED_STATES_POSTAL_SERVICE",
          value: "UNITED_STATES_POSTAL_SERVICE",
        },
        {
          label: "UNITED_PARCEL_SERVICE_INC",
          value: "UNITED_PARCEL_SERVICE_INC",
        },
      ],
      //承运人sel
      // carrierSel: "",
      //打印次数
      printNum: "",
      freightAll: [
        {
          label: "按计费重",
          value: 1,
        },
        {
          label: "按体积重",
          value: 2,
        },
        {
          label: "按实际重",
          value: 3,
        },
      ],
      //纸张类型
      paperTypeAll: [
        {
          label: "PackageLabel_Letter_2",
          value: "PackageLabel_Letter_2",
        },
        {
          label: " PackageLabel_Letter_6",
          value: " PackageLabel_Letter_6",
        },
        {
          label: " PackageLabel_A4_2",
          value: " PackageLabel_A4_2",
        },
        {
          label: " PackageLabel_A4_4",
          value: "PackageLabel_A4_4",
        },
        {
          label: "PackageLabel_Plain_Paper",
          value: "PackageLabel_Plain_Paper",
        },
      ],
      paperTypeSel: "PackageLabel_Letter_2",
      infoType: "baseInfo", //tab栏
      inbound_id: "", //请求用的id
      hasTable: false,
      //--请求的信息
      inbound_code: "", //货件单号
      shipment_status: "", //货件状态
      pack_status: 0, //打包状态 0：补充基础信息   1：上传物流状态   2：上传装箱信息   3：打印箱子标签   4：标记发货
      pack_type: "", //0混装1原厂
      //基本信息
      base_info: {
        created_time: "", //创建时间
        creater_name: "", //创建人
        label_prep_type: "", //标签类型
        pack_type: "", //包装类型
        shipment_name: "", //货件名称
        shop_name: "", //店铺名称
      },
      //寄件人信息
      send_info: {
        address_line1: "",
        address_line2: "",
        city: "",
        country: "",
        district: "",
        name: "",
        postal_code: "",
        province: "",
      },
      //收件人信息
      recipient_info: {
        address_line1: "",
        address_line2: "",
        city: "",
        country: "",
        district: "",
        name: "",
        postal_code: "",
        province: "",
        express_address: "",
      },
      //物流信息
      shipping_info: {
        carrier_name: "", //承运人
        shipment_type: "", //货件类型
      },

      //表格各种信息
      tableData: {
        boxes_total: "", //箱子总数
        sku_info: [],
        gross_weight: [
          {},
          //箱子毛重信息
        ],
        box_length: [
          {},
          //箱子长度信息
        ],
        box_width: [
          {},
          //箱子宽度信息
        ],
        box_height: [
          {},
          //箱子高度信息
        ],
      },
    };
  },
  computed: {
    ...mapState({
      showButtons: (state) => state.FBAshipments.showButtons,
      LogisticsCarriers: (state) => state.FBA.carriers,
    }),
    //混装
    boxTotal() {
      return this.tableData.boxes_total;
    },
    //原装
    boxTotalT() {
      let num = 0;
      this.tableData.sku_info.forEach((item) => {
        num += item.boxes_total * 1;
      });
      this.tableData.boxes_total = num;
      return num;
    },
  },
  methods: {
    //获取请求数据
    ...mapActions("FBA", ["getCarries"]),
    getData(arg) {
      loading();
      reqGetShipmentsDetail({ inbound_id: this.inbound_id })
        .then((data) => {
          if (data.code == 0) {
            loadingClose();
            this.inbound_code = data.data.inbound_code;
            this.shipment_status = data.data.shipment_status;
            this.pack_status = data.data.pack_status * 1 - 1; //得到的数据需要减1
            this.pack_type = data.data.pack_type;
            this.base_info = data.data.base_info;
            this.send_info = data.data.send_info;
            this.recipient_info = data.data.recipient_info;
            this.shipping_info = data.data.shipping_info;
            //
            this.logistics_inquiry_info = data.data.logistics_inquiry_info;
            if (this.logistics_inquiry_info.can_use_real == 1) {
              this.freightAll = [
                {
                  label: "按实际重",
                  value: 3,
                },
              ];
              this.logistics_inquiry_info.fee_avg_assign = 3;
            }

            this.tableData.boxes_total = data.data.boxes_total;
            this.tableData.sku_info = data.data.sku_info;

            if (this.pack_type == 0) {
              //响应式改变总体的数据
              data.data.gross_weight.forEach((item) => {
                this.$set(
                  this.tableData.gross_weight[0],
                  item.label,
                  item.value
                );
              });
              this.$set(this.tableData.gross_weight[0], "grossWeightAll", "");
              //响应式改变总体的数据
              data.data.box_length.forEach((item) => {
                this.$set(this.tableData.box_length[0], item.label, item.value);
              });
              this.$set(this.tableData.box_length[0], "lengthAll", "");
              //响应式改变总体的数据
              data.data.box_height.forEach((item) => {
                this.$set(this.tableData.box_height[0], item.label, item.value);
              });
              this.$set(this.tableData.box_height[0], "heightAll", "");
              //响应式改变总体的数据
              data.data.box_width.forEach((item) => {
                this.$set(this.tableData.box_width[0], item.label, item.value);
              });
              this.$set(this.tableData.box_width[0], "widthAll", "");
            }

            //显示table 解决异步
            this.hasTable = true;
          }
        })
        .catch((err) => {
          this.$message.warning(err);
          loadingClose();
        });
    },
    //tap选择
    infoSel(a, b) {},
    //上传物流信息
    uploadTransport() {
      if (!this.shipping_info.shipment_type) {
        this.$message.warning("请选择物流类型");
      } else if (!this.shipping_info.carrier_name) {
        this.$message.warning("请选择承运人");
      } else {
        loading();
        reqUpdataLogisticsInfo({
          inbound_id: this.inbound_id,
          shipment_type: this.shipping_info.shipment_type,
          carrier_name: this.shipping_info.carrier_name,
        })
          .then((data) => {
            loadingClose();
            if (data.code == 0) {
              this.$message.success("上传成功");
              this.pack_status = data.data.pack_status - 1;
            }
          })
          .catch((err) => {
            loadingClose();
            this.$message.error(err);
          });
      }
    },
    //上传装箱信息
    uploadBinningInfo() {
      this.$bus.$emit("uploadBoxInfo");
    },
    boxesTotalChange(arg) {
      debounce(() => {
        if (!arg || arg == 0) {
          this.tableData.boxes_total = 1;
          this.$message.error("总箱数不能为空");
        }
      }, 500);
    },
    /* 上传附件之前 */
    beforeUpload(file) {
      let fileNameList = ["doc", "docx", "xls", "xlsx", "txt", "text"];
      let extension = file.name.substring(
        file.name.lastIndexOf(".") + 1
      ); /* 获取文件名后缀 */
      if (!fileNameList.includes(extension)) {
        message("warning", "上传文件格式错误");
        return false;
      }
      console.log(this.logistics_inquiry_info.attach_file);
      if (this.logistics_inquiry_info.attach_file.length === 3) {
        message("warning", "已到达文件上传个数上限");
        return false;
      }
      let islarge = file.size / 1024 > 5120;
      if (islarge) {
        message("warning", "文件大小必须小于5M", 2000);
        return false;
      }
      loading();
    },
    handleClose(index) {
      this.logistics_inquiry_info.attach_file.splice(index, 1);
    },
    hanleClick(url) {
      let a = document.createElement("a");
      a.style.display = "none";
      document.body.appendChild(a);
      a.href = url;
      a.target = "_blank";
      a.setAttribute("download", "link"); // 指示浏览器下载url,而不是导航到它
      a.click();
      document.body.removeChild(a);
    },
    /* 上传成功 */
    uploadSuccess(res) {
      loadingClose();
      if (res.code !== 0) {
        message("error", res.msg, 2000);
        return;
      }
      this.logistics_inquiry_info.attach_file.push(res.data);
    },
    //物流询价保存禁用
    changeSaveDisabled(arg) {
      this.saveDisabled = arg;
      console.log(this.saveDisabled);
    },
    saveLogistics() {
      let priceReg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
      // if (!priceReg.test(this.logistics_inquiry_info.taxes)) {
      //   message("warning", "请填写正确的税费和运费并且不能超过两位小数");
      //   return
      // }
      if (this.logistics_inquiry_info.logistics_fee) {
        if (!priceReg.test(this.logistics_inquiry_info.logistics_fee)) {
          message("warning", "请填写正确的运费并且不能超过两位小数");
          return;
        }
      }
      if (!this.logistics_inquiry_info.fee_avg_assign) {
        message("warning", "运费分摊方式必须填写");
        return;
      }
      if (!this.logistics_inquiry_info.remark) {
        message("warning", "备注必须填写");
        return;
        if (this.logistics_inquiry_info.remark.length > 300) {
          message("warning", "备注只能在300个字符以内");
          return;
        }
      }
      //税费和头程缺失检测
      let taxesMiss = false;
      let firstCostMiss = false;
      this.logistics_inquiry_info.sku_list.forEach((item) => {
        if (!item.taxes) {
          taxesMiss = true;
        }
        if (!item.first_leg_fee) {
          firstCostMiss = true;
        }
      });
      if (taxesMiss) {
        this.$message.error("请填写完整商品税费");
        return false;
      }
      if (firstCostMiss) {
        this.$message.error(
          "存在头程费用缺失的情况，请重新录入与之相对应的税费来重新获取头程费用"
        );
        return false;
      }

      this.$set(this.logistics_inquiry_info, "inbound_id", this.inbound_id);
      loading();
      saveLogistics(this.logistics_inquiry_info)
        .then((res) => {
          console.log(res);
          loadingClose();
          if (res.code === 0) {
            this.$message.success(res.msg);
          }
        })
        .catch((err) => {
          loadingClose();
        });
    },
    confirmShipped() {
      loading();
      confirmShipped({ inbound_id: this.inbound_id })
        .then((res) => {
          loadingClose();
          if (res.code === 0) {
            message("success", res.msg || "确认发货成功");
          }
        })
        .catch((err) => {
          loadingClose();
        });
    },
    uploadBoxInfoToF(arg) {
      loading();
      reqUpdataInboundPackInfo(arg).then((data) => {
        loadingClose();
        if (data.code == 0) {
          this.$message.success("更新成功");
          this.pack_status = data.data.pack_status - 1;
        }
      });
    },
    //打印箱子标签
    printBoxTitle() {
      if (!this.printNum && this.printNum == 0) {
        this.$message.error("请输入不为0的打印数量");
      } else if (!this.paperTypeSel) {
        this.$message.error("请选择纸张类型");
      } else {
        loading();
        reqGetBoxTitle({
          inbound_id: this.inbound_id,
          page_type: this.paperTypeSel,
        })
          .then((data) => {
            loadingClose();
            if (data.code == 0) {
              this.pack_status = data.data.pack_status - 1;
              //下载
              let url = data.data[0].file_path;
              let a = document.createElement("a");
              a.style.display = "none";
              document.body.appendChild(a);
              a.href = url;
              a.target = "_blank";
              // a.setAttribute("download", "link"); // 指示浏览器下载url,而不是导航到它
              a.click();
              document.body.removeChild(a);
            }
          })
          .catch((err) => {
            loadingClose();
            this.$message.error(err);
          });
      }
    },
    //标记发货
    signShipment() {
      loading();
      signShipments({ inbound_id: this.inbound_id })
        .then((data) => {
          if (data.code == 0) {
            loadingClose();
            this.$message.success("标记成功");
            this.pack_status = data.data.pack_status - 1;
            this.$router.push({ name: "shipments" });
          } else {
            loadingClose();
          }
        })
        .catch((err) => {
          loadingClose();
          this.$message.error(err);
        });
    },
    // save() {},
    cancel() {
      this.$router.push({ name: "shipments" });
    },
  },
  watch: {
    boxTotal: {
      handler(n, o) {
        if (o != "") {
          if (n > 0) {
            for (let i = 1; i <= n * 1; i++) {
              this.$set(this.tableData.gross_weight[0], i, "");
              this.$set(this.tableData.box_height[0], i, "");
              this.$set(this.tableData.box_length[0], i, "");
              this.$set(this.tableData.box_width[0], i, "");
            }

            this.tableData.sku_info.forEach((item) => {
              // item.box_info = [];
              this.$set(item, "box_info", []);
              for (let i = 1; i <= n * 1; i++) {
                this.$set(item.box_info, i - 1, {});
                this.$set(item.box_info[i - 1], "label", i);
                this.$set(item.box_info[i - 1], "value", "");
              }
            });
            this.$set(this.tableData.gross_weight[0], "grossWeightAll", "");
            this.$set(this.tableData.box_height[0], "grossWeightAll", "");
            this.$set(this.tableData.box_length[0], "grossWeightAll", "");
            this.$set(this.tableData.box_width[0], "grossWeightAll", "");
          }
        }
      },
      immediate: false, //刷新加载 立马触发一次handler
      deep: true, // 可以深度检测到 person 对象的属性值的变化
    },
  },
  components: {
    ShipmentsDetailTable,
    logisticsTable,
  },
  mounted() {
    this.getCarries();
    if (!this.$route.query.id) {
      this.$router.push({ name: "shipments" });
    } else {
      this.inbound_id = this.$route.query.id;
      //获取数据
      this.getData();
    }
    //
    let id = this.$getMenuId(
      sessionStorage.getItem("munuIdList"),
      "/FBA/shipments"
    );
    this.$store.dispatch("FBAshipments/getButtonList", { id });
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  //   min-height: 600px;
  padding: 20px;
  background: #f2f2f2;
}
.header {
  width: 100%;

  .header1 {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #ebebeb;
    margin-bottom: 20px;
  }
  .header2 {
    margin-bottom: 20px;
    span {
      margin-right: 20px;
    }
  }
  .header3 {
    margin-bottom: 10px;
  }
  .header4 {
    overflow: hidden;
    border-bottom: 1px solid #ebebeb;
    .header4Info {
      padding-left: 50px;
      overflow: hidden;
      margin-top: 10px;
      margin-bottom: 30px;
    }
  }
}
.con {
  .con1 {
    border-bottom: 1px solid #ebebeb;
    ul {
      li {
        list-style: none;
        display: inline-block;
        margin-right: 100px;
      }
    }
    .con1Sel {
      display: flex;
      align-items: center;
    }
    .con1Btn {
      height: 36px;
      margin-bottom: 20px;
    }
  }
  .con2 {
    border-bottom: 1px solid #ebebeb;
    .table {
      margin: 20px 0 20px 0;
    }
    .con2Btn {
      height: 36px;
      margin-bottom: 20px;
    }
  }
  .con3 {
    border-bottom: 1px solid #ebebeb;
    .con3Btn {
      height: 36px;
      margin-bottom: 20px;
    }
    .con3Func {
      ul {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        white-space: nowrap;
        li {
          list-style: none;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin-right: 50px;
        }
      }
    }
  }
  .con4 {
    border-bottom: 1px solid #ebebeb;
    .con4Btn {
      height: 36px;
      margin-bottom: 20px;
    }
  }
  .con5 {
    border-bottom: 1px solid #ebebeb;
    & > div {
      & > div {
        padding: 10px 0;

        & > span {
          display: inline-block;
          margin-right: 5px;
          width: 100px;
          text-align: right;
          font-size: 14px;
        }
      }
      & > div:last-child {
        display: flex;
        justify-content: flex-end;
        button {
          width: 126px;
        }
      }
    }
    .tag-list {
      display: flex;
      flex-direction: column;
      & > span {
        margin: 5px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
      }
      & > span:hover {
        color: #409eff;
        cursor: pointer;
      }
    }
  }
  .con6 {
    display: flex;
    border-bottom: 1px solid #ebebeb;
    justify-content: space-between;
    align-items: center;
    button {
      // margin-right: 50px;
      width: 126px;
    }
  }
}
.footerBtn {
  margin-top: 20px;
  // margin-right: 50px;
  display: flex;
  justify-content: flex-end;
}
</style>