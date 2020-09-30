<template>
  <div class="edit-selection">
    <el-form
      :inline="true"
      :model="form"
      ref="form"
      :rules="rules"
      class="demo-form-inline"
      label-width="135px"
    >
      <div>
        <div class="item-title">
          <h3 id="content-0">基础信息</h3>
        </div>
        <div>
          <el-form-item label="SPU：" label-width="135px">
            <el-input v-model="form.spu" placeholder="SPU:" style="width: 217px" disabled></el-input>
          </el-form-item>
          <el-form-item>
            <!-- <el-button type="primary" size="mini" @click="loadSpu">加载spu信息</el-button> -->
          </el-form-item>
          <el-form-item label="店铺：" style="width:100%" prop="shop" label-width="135px">
            <el-select v-model="form.shop" placeholder="请选择店铺">
              <el-option
                v-for="item in shopList"
                :key="item.shop_id"
                :label="item.shop_name"
                :value="item.shop_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="站点：" style="width:100%" prop="site" label-width="135px">
            <el-select v-model="form.site" placeholder="请选择站点">
              <el-option
                v-for="item in siteData"
                :key="item.site_id"
                :label="item.site"
                :value="item.site_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <div class="item-group set-margin-bottom">
            <el-form-item label="产品分类1：" prop="product1" label-width="135px">
              <el-select v-model="form.product1" placeholder="请选择">
                <el-option
                  v-for="item in product1"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="chooseCategory('1')">选择分类</el-button>
            </el-form-item>
          </div>
          <div class="item-group no-select-group">
            <el-form-item label="  " label-width="135px">
              <!-- <span class="no-select-pro" v-if="!form.product1">未选择类目</span>   -->
              <div class="product_name" v-if="form.product1">
                <span v-for="(item, index) in saveProductNameList1[form.product1]" :key="index">
                  {{item}}
                  <i
                    class="el-icon-arrow-right"
                    v-if="index !== saveProductNameList1[form.product1].length -1"
                  ></i>
                </span>
              </div>
            </el-form-item>
          </div>
          <div class="item-group set-margin-bottom">
            <el-form-item label="产品分类2：" label-width="135px">
              <el-select v-model="form.product2" placeholder="请选择">
                <el-option
                  v-for="item in product2"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="chooseCategory('2')">选择分类</el-button>
              <span class="comment">
                <svg-icon style="font-size:20px;" icon-class="USdollar" />该字段填写并刊登后需要收取一定费用，请谨慎填写
              </span>
            </el-form-item>
          </div>
          <div class="item-group no-select-group">
            <el-form-item label="  " label-width="135px">
              <!-- <span class="no-select-pro" v-if="!form.product2">未选择类目</span>   -->
              <div class="product_name" v-if="form.product2">
                <span v-for="(item, index) in saveProductNameList2[form.product2]" :key="index">
                  {{item}}
                  <i
                    class="el-icon-arrow-right"
                    v-if="index !== saveProductNameList2[form.product2].length -1"
                  ></i>
                </span>
              </div>
            </el-form-item>
          </div>
          <div class="item-group set-margin-bottom">
            <el-form-item label="店铺分类1：" prop="shop1" label-width="135px">
              <el-select v-model="form.shop1" placeholder="请选择">
                <el-option
                  v-for="item in shop1"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="chooseShops('1')">选择分类</el-button>
            </el-form-item>
          </div>
          <div class="item-group no-select-group">
            <el-form-item label="  " label-width="135px">
              <!-- <span class="no-select-pro" v-if="!form.product2">未选择类目</span>   -->
              <div class="product_name" v-if="form.shop1">
                <span v-for="(item, index) in saveShop1Name[form.shop1]" :key="index">
                  {{item}}
                  <i
                    class="el-icon-arrow-right"
                    v-if="index !== saveShop1Name[form.shop1].length -1"
                  ></i>
                </span>
              </div>
            </el-form-item>
          </div>
          <div class="item-group set-margin-bottom">
            <el-form-item label="店铺分类2：" label-width="135px">
              <el-select v-model="form.shop2" placeholder="请选择">
                <el-option
                  v-for="item in shop2"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="chooseShops('2')">选择分类</el-button>
            </el-form-item>
          </div>
          <div class="item-group no-select-group">
            <el-form-item label="  " label-width="135px">
              <!-- <span class="no-select-pro" v-if="!form.product2">未选择类目</span>   -->
              <div class="product_name" v-if="form.shop2">
                <span v-for="(item, index) in saveShop2Name[form.shop2]" :key="index">
                  {{item}}
                  <i
                    class="el-icon-arrow-right"
                    v-if="index !== saveShop2Name[form.shop2].length -1"
                  ></i>
                </span>
              </div>
            </el-form-item>
          </div>
        </div>
      </div>
      <div>
        <div class="item-title">
          <h3 id="content-1">产品信息</h3>
        </div>
        <div>
          <div>
            <el-form-item label="售卖形式：" prop="salesMethod" label-width="135px">
              <el-radio-group v-model="form.salesMethod">
                <el-radio :label="0" @change="salesChanges(0)">拍卖</el-radio>
                <el-radio :label="1" @change="salesChanges(1)">固价</el-radio>
                <el-radio :label="2" @change="salesChanges(2)" v-if="allowMultiattr">多属性</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <div>
            <el-form-item
              label="产品标题："
              style="width:650px;margin-right: 60px"
              label-width="135px"
              prop="productTitle"
            >
              <el-input
                v-model="form.productTitle"
                maxlength="80"
                show-word-limit
                placeholder="请输入产品标题"
                style="width:300%"
                resize="none"
                @blur="changeProductTitle"
                :autosize="{ minRows: 4 }"
                type="textarea"
              ></el-input>
            </el-form-item>
            <!-- <el-form-item>
              <el-button type="primary"  size="mini" @click="generateTitle">自动生成标题</el-button>
            </el-form-item>-->
          </div>
          <div>
            <el-form-item label="子标题：" style="width:660px" label-width="135px">
              <el-input
                v-model="form.subtitle"
                maxlength="55"
                show-word-limit
                :autosize="{ minRows: 2 }"
                resize="none"
                type="textarea"
                placeholder="请输入子标题"
                style="width:300%"
              ></el-input>
            </el-form-item>
            <el-form-item class="comment comment-title">
              <svg-icon style="font-size:20px;" icon-class="USdollar" />该字段填写并刊登后需要收取一定费用，请谨慎填写
            </el-form-item>
          </div>
          <el-form-item label="图片：" label-width="135px" style="width:100%" class="img-form-item">
            <div class="drag">
              <ul class="el-upload-list el-upload-list--picture-card img-list">
                <draggable v-model="form.images" class="dragArea">
                  <li
                    :tabindex="index"
                    class="el-upload-list__item is-success animated"
                    v-for="(src, index) in form.images"
                    :class="{flash: src.to_del}"
                    :key="index"
                  >
                    <img :src="src.img_path" alt class="el-upload-list__item-thumbnail" />
                    <!-- <a class="el-upload-list__item-name">
                      <i class="el-icon-document"></i>
                      @{{element.name}}
                    </a>-->
                    <label class="el-upload-list__item-status-label">
                      <i class="el-icon-upload-success el-icon-check"></i>
                    </label>
                    <i class="el-icon-close"></i>
                    <span class="el-upload-list__item-actions">
                      <!---->
                      <span class="el-upload-list__item-delete">
                        <i class="el-icon-delete" @click="productInfoRemove(index)"></i>
                      </span>
                    </span>
                  </li>
                </draggable>

                <li>
                  <el-upload
                    v-show="form.images.length != 12"
                    :action="uploadImageUrl"
                    list-type="picture-card"
                    multiple
                    :on-preview="handlePictureCardPreview"
                    :data="parmas"
                    :show-file-list="false"
                    :on-success="onSuccess"
                    :before-upload="beforeUpload"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </li>
              </ul>
            </div>
          </el-form-item>
          <div style="margin-bottom: 20px">
            <el-input
              v-model="picturePasteInput"
              placeholder="请输入图片链接"
              style="width:600px;margin-left: 115px"
              :disabled="form.images.length == 12"
            ></el-input>
            <el-button
              type="primary"
              size="mini"
              @click="confirmPastePath"
              :disabled="form.images.length == 12"
            >确认</el-button>
          </div>
        </div>
      </div>
      <div>
        <div class="item-title">
          <h3 id="content-2">属性信息</h3>
        </div>
        <div>
          <el-form-item label="UPC编码：" label-width="135px">
            <el-input v-model="upcCode" placeholder="does not apply" style="width: 217px" disabled></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="generateUPC">生成UPC</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" size="mini" @click=" upcCode = ''">默认</el-button>
          </el-form-item>
        </div>
        <div>
          <div></div>
          <el-form-item label="产品属性：" label-width="135px">
            <!-- <el-input v-model="form.upc" placeholder="" style="width: 217px" disabled></el-input> -->
          </el-form-item>
        </div>
        <div>
          <div>
            <form-list :formList="formList" />
            <div class="margin-bottom-form" v-if="formList && formList2"></div>
            <form-list :formList="formList2" />
            <!-- <el-card class="card" shadow="always" style="width:70%;margin-left: 115px;margin-bottom: 15px">
              <div class="product_attr" v-for="(value, key, index) in productAttrList" :key="index">
                <span>{{key}}</span>
                <div>
                  <el-tag size="small" style="margin-right: 5px" closable v-for="(item, i) in value" :key="i" @close="handleClose(key, value, i)">{{item}}</el-tag>
                </div>
              </div>
            </el-card>-->
          </div>
          <div>
            <!-- <el-form-item label="自定义属性："> -->
            <el-card
              class="card"
              shadow="always"
              style="width:600px;margin-left: 115px;"
              v-if="form.customizeAttr.length"
            >
              <div class="attr-item" v-for="(attr, index) in form.customizeAttr" :key="attr.id">
                <span class="attr-num">{{index + 1}}</span>
                <el-form-item>
                  <el-input v-model="attr.name" placeholder="属性名-例如Color"></el-input>
                </el-form-item>
                <span>：</span>
                <el-form-item>
                  <el-input v-model="attr.value" placeholder="属性值-例如Red"></el-input>
                </el-form-item>
                <i class="el-icon-delete" @click="deleteAttr(index)"></i>
              </div>
              <!-- <el-button type="primary" class="add-attr" @click="addAttr" size="mini">添加定义属性</el-button> -->
            </el-card>
            <!-- </el-form-item> -->
            <el-form-item label="自定义属性：">
              <el-button
                type="primary"
                @click="addAttr"
                size="mini"
                :disabled="form.customizeAttr.length === 10"
              >添加自定义属性</el-button>
            </el-form-item>
          </div>

          <div v-if="showVariant">
            <!-- 变种显示 -->
            <div>
              <el-form-item label="变种属性：">
                <el-button type="primary" @click="addVariantAttributes" size="mini">添加变种属性</el-button>
                <div
                  class="attr-item variant-attr"
                  v-for="(attr, index) in form.variantAttributeData"
                  :key="index"
                >
                  <div>
                    <i class="el-icon-circle-plus" @click="addSingleAttr(attr)"></i>
                    <span class="attr-num">{{attr.name}}：</span>
                    <div :class="{'overflow-scroll': attr.valueList.length > 18}">
                      <div v-for="(valList, index) in attr.valueList" :key="index">
                        <el-form-item>
                          <el-input
                            v-model.trim="valList.val"
                            placeholder
                            size="small"
                            @focus="focusValue(valList.val)"
                            @blur="blurAttr(valList.val, attr, attr.valueList, attr.name)"
                          ></el-input>
                        </el-form-item>
                        <span class="attr-variant">
                          <i class="el-icon-remove" @click="removeSingleAttr(attr, index)"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="变种图片：">
                <div>
                  <div style="margin-bottom: 10px">
                    <span>变种类型：</span>
                    <el-select
                      v-model="form.attributesSelect"
                      @change="changeVariantVal"
                      placeholder="请选择产品属性"
                    >
                      <el-option
                        v-for="item in form.variantAttributeData"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name"
                      ></el-option>
                    </el-select>
                  </div>
                  <div class="drag" v-for="(item, i) in uploadList" :key="i">
                    <ul class="el-upload-list el-upload-list--picture-card img-list">
                      <draggable v-model="item.imagesList" class="dragArea">
                        <li
                          :tabindex="index"
                          class="el-upload-list__item is-success animated"
                          v-for="(element, index) in item.imagesList"
                          :class="{flash: element.to_del}"
                          :key="index"
                        >
                          <img :src="element.url" alt class="el-upload-list__item-thumbnail" />
                          <a class="el-upload-list__item-name">
                            <i class="el-icon-document"></i>
                            @{{element.name}}
                          </a>
                          <label class="el-upload-list__item-status-label">
                            <i class="el-icon-upload-success el-icon-check"></i>
                          </label>
                          <i class="el-icon-close"></i>
                          <span class="el-upload-list__item-actions">
                            <span class="el-upload-list__item-delete">
                              <i
                                class="el-icon-delete"
                                @click="productInfoRemoveUploadList(item.imagesList, index)"
                              ></i>
                            </span>
                          </span>
                        </li>
                      </draggable>
                      <li>
                        <el-upload
                          v-show="item.imagesList.length != 12"
                          :action="uploadImageUrl"
                          list-type="picture-card"
                          multiple
                          :data="parmas"
                          :on-preview="handlePictureCardPreview"
                          :show-file-list="false"
                          :on-success="(response, file, fileList) => uplaodSuccessAttr(response, file, fileList, item)"
                          :before-upload="beforeUpload"
                        >
                          <i class="el-icon-plus"></i>
                        </el-upload>
                        <div class="variant-picture-notes">{{form.attributesSelect}}: {{item.val}}</div>
                        <div class="variant-picture-notes">图片支持拖拽排序，最多上传12张图片</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </el-form-item>
            </div>
            <div style="width: 100%" class="table_content" v-if="form.tableData.length">
              <el-form-item label="变种参数：">
                <el-table
                  :data="form.tableData"
                  border
                  :row-style="{height:'40px'}"
                  :cell-style=" {padding:'0px'}"
                  @cell-dblclick="dubleClick"
                  style="width: 100%"
                >
                  <el-table-column prop="sku" label="SKU" align="center">
                    <!-- <template slot-scope="{$index, row}">
                      <el-input size="mini" v-model="row.sku" disabled></el-input>
                      <span></span>
                    </template>-->
                  </el-table-column>
                  <el-table-column
                    :prop="item"
                    :label="item"
                    align="center"
                    v-for="(item, i) in tableHeadList"
                    :key="i"
                  ></el-table-column>
                  <!-- <el-table-column prop="sizeID" label="SizeID" align="center"></el-table-column> -->
                  <el-table-column prop="attr_price" label="价格" align="center">
                    <template slot-scope="{$index, row}">
                      <el-input size="mini" v-model="row.attr_price">
                        <template slot="append" style="width:30px">{{getCurrency()}}</template>
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="quantity" label="库存量" align="center">
                    <template slot-scope="{$index, row}">
                      <el-input size="mini" v-model="row.quantity"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="barcode" label="MPN/EAN" align="center">
                    <template slot-scope="{$index, row}">
                      <el-input size="mini" v-model="row.barcode"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="{$index, row}">
                      <i class="el-icon-remove" @click="handleTableDelete($index,row)"></i>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="item-title">
          <h3 id="content-3">描述信息</h3>
        </div>
        <div>
          <el-form-item label="选择描述类型：" prop="descriptionType" label-width="135px">
            <el-radio-group v-model="form.descriptionType">
              <el-radio label="HTML" @change="descriptionChange">HTML</el-radio>
              <el-radio label="template" @change="descriptionChange">使用描述模板</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="form.chooseTemplate"
              size="mini"
              filterable
              clearable
              placeholder="请选择描述模板"
            >
              <el-option
                v-for="item in templateList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <div class="template-editing" v-if="showTemplateEditing && !form.chooseTemplate">
            <h1>请选择描述模板</h1>
          </div>
          <div v-if="showTemplateEditing && form.chooseTemplate">
            <component
              :is="componentsName"
              :templateId="form.chooseTemplate"
              :showTemplateBtn="false"
              :shopId="form.shop"
              ref="AttrTemplate"
            ></component>
          </div>
          <div class="HTML-template" v-if="showHTMLtemplate">
            <!-- <div class="button_display">
              <div></div>
              <el-button type="primary" @click="insertImage">一键插图</el-button>
            </div>-->
            <tinymce v-model="form.richTextContent" :height="300" ref="tinymce" @input="input" />
          </div>
        </div>
      </div>
      <div>
        <div class="item-title">
          <h3 id="content-4">价格信息({{infoTitle}})</h3>
        </div>
        <div>
          <div>
            <el-form-item label="私人拍卖：" label-width="135px">
              <!-- <el-radio
                label="1"
                v-model="form.private_listing"
                @change="privateAuctionsChanges()"
              >不向公众显示买家名称</el-radio>-->
              <el-checkbox
                v-model="form.private_listing"
                @change="privateAuctionsChanges()"
              >不向公众显示买家名称</el-checkbox>
            </el-form-item>
          </div>
          <el-form-item label="刊登天数：" label-width="135px" prop="listing_duration">
            <el-select
              v-model="form.listing_duration"
              placeholder="请选择刊登天数"
              :disabled="form.salesMethod === 1 || form.salesMethod === 2 "
            >
              <el-option
                v-for="item in listing_durationList"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>
            <!-- <el-input v-model="form.listing_duration"></el-input> -->
          </el-form-item>
          <div v-if="showPriceGroup">
            <el-form-item label="起拍价：" prop="pm_start_price">
              <el-col :span="16">
                <el-input
                  v-model.number="form.pm_start_price"
                  maxlength="5"
                  oninput="value=value.replace(/[^\d]/g,'')"
                >
                  <template slot="append" style="width:30px">{{getCurrency()}}</template>
                </el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="保留价：" prop="pm_reserve_price">
              <el-col :span="16">
                <!-- <el-form-item > -->
                <el-input
                  v-model.number="form.pm_reserve_price"
                  maxlength="5"
                  oninput="value=value.replace(/[^\d]/g,'')"
                >
                  <template slot="append" style="width:30px">{{getCurrency()}}</template>
                </el-input>
                <!-- </el-form-item> -->
              </el-col>
            </el-form-item>
            <el-form-item label="一口价：" prop="pm_buy_it_now_price">
              <el-col :span="16">
                <!-- <el-form-item> -->
                <el-input
                  v-model.number="form.pm_buy_it_now_price"
                  maxlength="5"
                  oninput="value=value.replace(/[^\d]/g,'')"
                >
                  <template slot="append" style="width:30px">{{getCurrency()}}</template>
                </el-input>
                <!-- </el-form-item> -->
              </el-col>
            </el-form-item>
          </div>
          <div v-if="showFixedPrice">
            <el-form-item label="价格：" prop="fixedPrice">
              <el-col :span="16">
                <!-- <el-form-item> -->
                <el-input
                  v-model.number="form.fixedPrice"
                  maxlength="5"
                  oninput="value=value.replace(/[^\d]/g,'')"
                >
                  <template slot="append" style="width:30px">{{getCurrency()}}</template>
                </el-input>
                <!-- </el-form-item> -->
              </el-col>
            </el-form-item>
          </div>
          <div v-if="showQuantityInStock">
            <el-form-item label="库存数量：" prop="gj_quantity">
              <el-input
                v-model.number="form.gj_quantity"
                maxlength="5"
                oninput="value=value.replace(/[^\d]/g,'')"
              ></el-input>
            </el-form-item>
          </div>
          <div v-if="showBargain">
            <el-form-item label="接受买家还价：">
              <el-radio-group v-model="form.gj_best_offer">
                <el-radio :label="1" @change="wholesaleChanges(1)">开启</el-radio>
                <el-radio :label="0" @change="wholesaleChanges(0)">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-checkbox
              v-model="form.gj_best_offer_auto_accept"
              style="margin: 9px 0 0 15px;"
              v-if="form.gj_best_offer === 1"
            ></el-checkbox>
            <el-form-item label=" 自动接收大于：" label-width="125px" v-if="form.gj_best_offer === 1">
              <el-input
                v-model.number="form.gj_best_offer_auto_accept_price"
                style="width: 150px"
                maxlength="5"
                oninput="value=value.replace(/[^\d]/g,'')"
              >
                <template slot="append" style="width:30px">{{getCurrency()}}</template>
              </el-input>
            </el-form-item>
            <el-checkbox
              v-model="form.gj_best_offer_auto_decline"
              style="margin: 9px 0 0 15px;"
              v-if="form.gj_best_offer === 1"
            ></el-checkbox>
            <el-form-item label=" 自动接收小于：" label-width="125px" v-if="form.gj_best_offer === 1">
              <el-input
                v-model.number="form.gj_minP_best_offer_price"
                style="width: 150px"
                maxlength="5"
                oninput="value=value.replace(/[^\d]/g,'')"
              >
                <template slot="append" style="width:30px">{{getCurrency()}}</template>
              </el-input>
            </el-form-item>
          </div>
          <div v-if="showWholesale">
            <el-form-item label="批发：" prop="is_pm_lot_size">
              <el-radio-group v-model="form.is_pm_lot_size">
                <el-radio :label="1" @change="wholesaleChanges(1)">开启</el-radio>
                <el-radio :label="0" @change="wholesaleChanges(0)">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="批发数量：" label-width="130px" v-if="form.is_pm_lot_size === 1">
              <el-input
                v-model.number="form.pm_lot_size"
                oninput="value=value.replace(/[^\d]/g,'')"
                maxlength="5"
              ></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
      <div>
        <div class="item-title">
          <h3 id="content-5">付款信息</h3>
          <el-form-item label="选择付款模板：" prop="paymentTemplate" label-width="130px">
            <el-select v-model="form.paymentTemplate" filterable clearable placeholder="请选择付款模板">
              <el-option
                v-for="item in listingConfig"
                :key="item.tmp_id"
                :label="item.tmp_name"
                :value="item.tmp_id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="PayPal账号：" prop="pay_pal_email">
          <el-input v-model="form.pay_pal_email" placeholder disabled></el-input>
        </el-form-item>
        <el-form-item label="付款说明：" style="width:100%">
          <el-input
            type="textarea"
            placeholder
            v-model="form.payment_instructions"
            resize="none"
            maxlength="500"
            show-word-limit
            :autosize="{ minRows: 4 }"
            style="width:300%"
          ></el-input>
        </el-form-item>
      </div>
      <div>
        <div class="item-title">
          <h3 id="content-6">退款政策</h3>
          <el-form-item label="选择退款模板：" prop="refundTemplate" label-width="130px">
            <el-select v-model="form.refundTemplate" placeholder="请选择退款模板">
              <el-option
                v-for="item in listingConfig"
                :key="item.tmp_id"
                :label="item.tmp_name"
                :value="item.tmp_id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="refund domestic-refund" style="padding-left: 35px">
          <el-checkbox v-model="returns_accepted" @change="domesticChange">接受国内退款</el-checkbox>
          <el-row v-if="returns_accepted" class="margin-l20">
            <el-col :span="7">
              <div class="grid-content margin-tb20">
                <el-form-item label="退货天数：" prop="returns_with_in">
                  <el-select v-model="form.returns_with_in" placeholder="请选择退货天数">
                    <el-option
                      v-for="item in returnPolicy.return_within"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content margin-tb20">
                <el-form-item label="退货运费承担方：" prop="shipping_cost_paid_by" label-width="130px">
                  <el-select v-model="form.shipping_cost_paid_by" placeholder="请选择退货运费承担方">
                    <el-option
                      v-for="item in returnPolicy.shipping_cost_paid_by"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="refund foreign-refund" style="padding-left: 35px">
          <el-checkbox v-model="internation_returns_accepted" @change="foreignChange">接受国外退款</el-checkbox>
          <el-row v-if="internation_returns_accepted" class="margin-l20">
            <el-col :span="7">
              <div class="grid-content margin-tb20">
                <el-form-item label="退货天数：" prop="internation_returns_with_in">
                  <el-select v-model="form.internation_returns_with_in" placeholder="请选择退货天数">
                    <el-option
                      v-for="item in returnPolicy.return_within"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content margin-tb20">
                <el-form-item
                  label="退货运费承担方："
                  prop="internation_shipping_cost_paid_by"
                  label-width="130px"
                >
                  <el-select
                    v-model="form.internation_shipping_cost_paid_by"
                    placeholder="请选择退货运费承担方"
                  >
                    <el-option
                      v-for="item in returnPolicy.shipping_cost_paid_by"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-form-item label="退款说明：" style="width:100%">
            <el-input
              type="textarea"
              placeholder
              maxlength="80"
              show-word-limit
              v-model="form.return_description"
              resize="none"
              :autosize="{ minRows: 4 }"
              style="width:300%"
            ></el-input>
          </el-form-item>
        </div>
      </div>
      <div>
        <div class="item-title">
          <h3 id="content-7">运输政策</h3>
          <el-form-item label="选择运输模板：" prop="transportTemplate" label-width="130px">
            <el-select v-model="form.transportTemplate" filterable clearable placeholder="请选择运输模板">
              <el-option
                v-for="item in listingConfig"
                :key="item.tmp_id"
                :label="item.tmp_name"
                :value="item.tmp_id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="物品所在地：" prop="location" label-width="135px">
          <el-input placeholder v-model.trim="form.location"></el-input>
        </el-form-item>
        <el-form-item label="国家或区域：" label-width="150px" prop="country">
          <el-select v-model="form.country" placeholder="请选择国家或区域" filterable>
            <el-option
              v-for="item in shippingCountries"
              :key="item.id"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮编：" label-width="135px">
          <el-input placeholder v-model="form.postal_code"></el-input>
        </el-form-item>
        <div class="transportation-policy">
          <div class="domestic-transport transport">
            <div class="title">国内运输：</div>
            <el-card class="mode-of-transport disflex-transport" shadow="hover">
              <div>
                <el-form-item
                  label="处理时间："
                  :label-width="formLabelWidth"
                  style="width:100%"
                  prop="dispatch_time_max"
                >
                  <el-select
                    class="processing-time"
                    v-model="form.dispatch_time_max"
                    placeholder="请选择"
                    style="width:100px"
                    size="mini"
                  >
                    <el-option
                      v-for="item in shippingDispatchTime"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>天
                  <span class="comment">
                    <span class="focus">说明！</span> 设置值为0，则表示当天24小时内处理
                  </span>
                </el-form-item>
                <div v-for="(transport, index) in form.internalGroup" :key="index">
                  <el-form-item
                    :label="`运输方式${index + 1}：`"
                    :label-width="formLabelWidth"
                    :prop="`internalGroup.${index}.shipping_type`"
                    :rules="rules.shipping_type"
                  >
                    <el-select
                      class="processing-time"
                      v-model="transport.shipping_type"
                      placeholder="请选择"
                      size="mini"
                    >
                      <el-option
                        v-for="item in domesticList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item :label-width="formLabelWidth" prop="freeShipping">
                    <el-checkbox v-model="transport.free_shipping">免运费</el-checkbox>
                  </el-form-item>
                  <el-form-item style="margin-left:50px" v-if="form.internalGroup.length != 1">
                    <el-button type="text" @click="deleShipping(index, 'in')">移除</el-button>
                  </el-form-item>
                  <div>
                    <el-form-item label="运费：" prop="freeShipping">
                      <el-input
                        v-model="transport.shipping_cost"
                        style="width:100px;"
                        size="mini"
                        placeholder="0.00"
                      >
                        <template slot="append" style="width:30px">{{getCurrency()}}</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="每件附加费用：" label-width="110px" prop="freeShipping">
                      <el-input
                        v-model="transport.add_shipping_cost"
                        style="width:100px;"
                        size="mini"
                        placeholder="0.00"
                      >
                        <template slot="append" style="width:30px">{{getCurrency()}}</template>
                      </el-input>
                    </el-form-item>
                  </div>
                </div>
                <div>
                  <el-button
                    type="primary"
                    style="margin:0  0 0  100px"
                    size="mini"
                    @click="addShipping"
                  >添加一行</el-button>
                </div>
              </div>
            </el-card>
          </div>
          <div class="foreign-transportation transport">
            <div class="title">国际运输：</div>
            <el-card class="mode-of-transport disflex-transport" shadow="hover">
              <div>
                <div v-for="(transport,index) in form.internationalGroup" :key="index">
                  <el-form-item
                    :label="`运输方式${index + 1}：`"
                    :prop="`internationalGroup.${index}.shipping_type`"
                    :rules="rules.shipping_type"
                  >
                    <el-select
                      class="processing-time"
                      v-model="transport.shipping_type"
                      placeholder="请选择"
                      size="mini"
                    >
                      <el-option
                        v-for="item in international"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="text" @click="deleShipping(index, 'out')">移除</el-button>
                  </el-form-item>
                  <div style="margin-bottom:10px">
                    <el-form-item
                      label="运费："
                      :prop="`internationalGroup.${index}.shipping_cost`"
                      :rules="rules.shipping_cost"
                    >
                      <el-input
                        v-model="transport.shipping_cost"
                        style="width:100px;"
                        size="mini"
                        placeholder="0.00"
                      >
                        <template slot="append" style="width:30px">{{getCurrency()}}</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item
                      label="附加费用："
                      label-width="110px"
                      :prop="`internationalGroup.${index}.add_shipping_cost`"
                      :rules="rules.add_shipping_cost"
                    >
                      <el-input
                        v-model="transport.add_shipping_cost"
                        style="width:100px;"
                        size="mini"
                        placeholder="0.00"
                      >
                        <template slot="append" style="width:30px">{{getCurrency()}}</template>
                      </el-input>
                    </el-form-item>
                  </div>
                  <el-form-item label="运输到：" prop="global" style="width:100%">
                    <el-checkbox
                      v-model="transport.global"
                      @change="foreignGlobalChange(transport,$event)"
                    >全球</el-checkbox>
                    <span class="margin-rf10">或</span>
                    <el-button
                      v-model="transport.checkAll"
                      type="text"
                      style="margin-left:25px"
                      :disabled="transport.global"
                      @click="handleCheckAllChange(transport)"
                    >选中以下国家</el-button>
                  </el-form-item>

                  <div class="checkbox-content">
                    <el-form-item style="margin-left:68px">
                      <el-checkbox
                        v-for="location in transport.shipping_location"
                        :key="location.name"
                        v-model="location.select"
                        :disabled="transport.global"
                        @change="handleCheckedCitiesChange(transport,location,$event)"
                      >{{location.name}}</el-checkbox>
                    </el-form-item>
                  </div>
                </div>
                <div>
                  <el-button
                    type="primary"
                    style="margin:0  0 0  100px"
                    size="mini"
                    @click="addInternationaShipping"
                  >添加一行</el-button>
                </div>
              </div>
            </el-card>
            <el-form-item prop="freeShipping" label="不运送地区：">
              <el-select
                class="processing-time"
                v-model="form.ddl_exclusion_list_type"
                placeholder="请选择"
                size="mini"
              >
                <el-option
                  v-for="item in noTransportationData"
                  :key="item.value"
                  :label="item.value"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="form.ddl_exclusion_list_type === 2 ">
              <el-button type="text" @click="addRestrictedArea">添加不运送地区</el-button>
            </el-form-item>
            <p
              style="margin-left: 115px;color: #933;word-break: break-all"
              v-if="form.ddl_exclusion_list_type === 2 "
            >{{form.unavailable_shipping_location}}</p>
          </div>
        </div>
      </div>
      <div>
        <div class="item-title">
          <h3 id="content-8">其他政策</h3>
          <el-form-item label="选择其他政策：" prop="otherTemplate" label-width="130px">
            <el-select v-model="form.otherTemplate" filterable clearable placeholder="请选择其他政策模板">
              <el-option
                v-for="item in listingConfig"
                :key="item.tmp_id"
                :label="item.tmp_name"
                :value="item.tmp_id"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="买家要求：" :label-width="formLabelWidth">
            <div>
              <el-radio v-model="form.disable_buyer_requirements" :label="0">允许所有买家购买我的商品</el-radio>
            </div>
            <div>
              <el-radio v-model="form.disable_buyer_requirements" :label="1">不允许以下买家购买我的商品</el-radio>
              <ul v-if="form.disable_buyer_requirements == 1">
                <li>
                  <el-checkbox v-model="form.ship_to_registration_country">主要运送地址在我的运送范围之外</el-checkbox>
                  <span class="comment">
                    <span class="focus">说明！</span> 国际运输中存在不运送国家时，需要勾选
                  </span>
                </li>
                <li>
                  <el-checkbox v-model="form.max_unpaid_count_checkbox">
                    曾收到
                    <el-select
                      size="mini"
                      v-model="form.max_unpaid_count"
                      style="width:70px;margin:0 5px;"
                    >
                      <el-option
                        v-for="item in discardBidData"
                        :key="item.id"
                        :label="item.value"
                        :value="item.id"
                      ></el-option>
                    </el-select>个弃标个案，在过去
                    <el-select
                      size="mini"
                      v-model="form.max_unpaid_period"
                      style="width:100px;margin:0 5px;"
                    >
                      <el-option
                        v-for="item in discardDaysData"
                        :key="item.id"
                        :label="item.value"
                        :value="item.id"
                      ></el-option>
                    </el-select>天
                  </el-checkbox>
                </li>
                <li>
                  <el-checkbox v-model="form.max_violations_count_checkbox">
                    曾收到
                    <el-select
                      size="mini"
                      v-model="form.max_violations_count"
                      style="width:70px;margin:0 5px;"
                    >
                      <el-option
                        v-for="item in policyViolation"
                        :key="item.id"
                        :label="item.value"
                        :value="item.id"
                      ></el-option>
                    </el-select>个违反政策检举，在过去
                    <el-select
                      size="mini"
                      v-model="form.max_violations_period"
                      style="width:100px;margin:0 5px;"
                    >
                      <el-option
                        v-for="item in policyViolationDays"
                        :key="item.id"
                        :label="item.value"
                        :value="item.id"
                      ></el-option>
                    </el-select>天
                  </el-checkbox>
                </li>
                <li>
                  <el-checkbox v-model="form.min_feedback_score_checkbox">
                    信用指标等于或低于：
                    <el-select
                      size="mini"
                      v-model="form.min_feedback_score"
                      style="width:100px;margin:0 5px;"
                    >
                      <el-option
                        v-for="item in creditRatingNumData"
                        :key="item.id"
                        :label="item.value"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-checkbox>
                </li>
                <li>
                  <el-checkbox v-model="form.require_item_count_checkbox">
                    在过去10天内内曾出价或购买我的物品，已达到我所设定的限制
                    <el-select
                      size="mini"
                      v-model="form.require_item_count"
                      style="width:100px;margin:0 5px;"
                      placeholder
                    >
                      <el-option
                        v-for="item in selfSettingNumData"
                        :key="item.id"
                        :label="item.value"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-checkbox>
                  <div v-if="form.require_item_count_checkbox" style="margin-left:20px">
                    <el-checkbox v-model="form.require_feedback_score_checkbox">
                      这项限制只选用于买家信用指数等于或低于
                      <el-select
                        size="mini"
                        v-model="form.require_feedback_score"
                        style="width:70px;margin:0 5px;"
                        placeholder
                      >
                        <el-option
                          v-for="item in restrictBuyerCreditNumData"
                          :key="item.id"
                          :label="item.value"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                    </el-checkbox>
                  </div>
                </li>
              </ul>
            </div>
          </el-form-item>
          <div class="clear-margin-bottom">
            <el-form-item label="销售税：" prop="sales_tax_state" :label-width="formLabelWidth">
              <el-select
                v-model="form.sales_tax_state"
                filterable
                clearable
                placeholder="请选择销售税"
                size="mini"
              >
                <el-option
                  v-for="item in taxLocation"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="sales_tax_percent" label-width="10px" style="width:140px">
              <el-input size="mini" v-model.number="form.sales_tax_percent">
                <svg-icon slot="suffix" style="font-weight:700" icon-class="percentage" />
              </el-input>
            </el-form-item>
            <el-checkbox v-model="form.shipping_included_in_tax">运费包括销售税</el-checkbox>
            <!-- <el-radio style="margin:12px 0" v-model="form.shipping_included_in_tax" label="1">运费包括销售税</el-radio> -->
          </div>
        </div>
        <div>
          <el-form-item label="图片广告：" prop="gallery_type" :label-width="formLabelWidth">
            <el-select v-model="form.gallery_type" filterable size="mini">
              <el-option
                v-for="item in imageAdData"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>
            <svg-icon icon-class="USdollar" style="font-size:20px" />
          </el-form-item>
        </div>
      </div>
      <div>
        <div class="item-title">
          <h3 id="content-9">发布设置</h3>
        </div>
        <div>
          <el-form-item label="定时发布：" prop="is_plan_release">
            <el-checkbox v-model="is_plan_release">定时发布</el-checkbox>
          </el-form-item>
          <el-form-item label="发布时间：" v-if="is_plan_release" style="width:100%">
            <el-date-picker v-model="form.plan_update" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
        </div>
      </div>
      <el-form-item class="btn-group no-border-btn-group">
        <el-button type="primary" @click="submitForm('form')">发布</el-button>
        <el-button @click="cancel('form')">取消</el-button>
      </el-form-item>
    </el-form>
    <sele-category-popup
      v-if="showCategoryaDialog"
      :showCategoryaDialog="showCategoryaDialog"
      :recordCurrent="recordCurrent"
      @on-open-sesion="categoryaPopupData"
    ></sele-category-popup>
    <ul class="navs">
      <li
        :class="{active: active=== index}"
        v-for="(mod,index) in modules"
        :key="mod.id"
        @click="returnTop(`#content-${index}`,index)"
      >{{mod.name}}</li>
    </ul>
    <Modal
      v-model="modal_attr"
      title="变种属性"
      width="30%"
      class-name="vertical-center-modal"
      @on-cancel="cancel_attr"
    >
      <div class="modal_tontent">
        <span>变种属性名称</span>
        <el-input v-model.trim="defineAttr" placeholder="请输入" maxlength="10"></el-input>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="submit_attr">确定</el-button>
        <el-button @click="cancel_attr">取消</el-button>
      </div>
    </Modal>
    <el-dialog
      title="选择分类"
      :visible.sync="modal_product"
      width="70%"
      :before-close="cancel_product"
      :close-on-click-modal="false"
    >
      <div class="product_name">
        <span v-for="(item, index) in saveProductName" :key="index">
          {{item}}
          <i class="el-icon-arrow-right" v-if="index !== saveProductName.length -1"></i>
        </span>
      </div>
      <div class="modal_content_product">
        <div class="categoryChooseOutDiv">
          <div
            class="categoryChooseMiddleDiv"
            :class="{'overflowx-sxroll': categoryLevelList.length > 3}"
          >
            <div
              class="pull-left categoryChooseInDiv"
              v-for="(item, levelIndex) in categoryLevelList"
              :key="levelIndex"
            >
              <div class="categoryList">
                <div
                  class="categoryDiv"
                  v-for="(ele, i) in item"
                  :key="i"
                  @click="showChildren(ele,levelIndex,i)"
                  :class="savedActiveIndex[levelIndex] === i ? 'active' : ''"
                >
                  <span class="categoryNames">{{ele.category_name}}</span>
                  <i class="el-icon-arrow-right" v-if="ele.has_son"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit_product">确定</el-button>
        <el-button @click="cancel_product">取消</el-button>
      </span>
    </el-dialog>
    <restricted-area-popup
      v-if="showAreaDialog"
      :showAreaDialog="showAreaDialog"
      :recordCurrent="recordCurrent"
      :unavailableLocation="unavailableLocation"
      @on-open-sesion="areaPopupData"
      :unavailableShippingLocation="unavailableShippingLocation"
      ref="noAreaPopup"
    ></restricted-area-popup>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import sortable from "sortablejs";
import SeleCategoryPopup from "../components/SeleCategoryPopup.vue";
import DescriptionTemplate from "../components/DescriptionTemplate";
import FormList from "../components/formList";
import Tinymce from "@/components/Tinymce";
import RestrictedAreaPopup from "@/view/BasicConfig/components/tabs/components/RestrictedAreaPopup";
import { dateFormat, textFormat, debounce, requiredWord } from "@/utils/common";
import { getMutiData } from "@/utils/getMutiData";
import {
  getPeoduct1,
  getShopClassList,
  getProductSpecifications,
  getListingConfig,
  getUnvailableLocation,
  getListingPublishrecordDetail,
  getSkuCode
} from "@/api/listing";
let reg = /^[1-9]\d*$/;
import { Loading } from "element-ui";
import { mapState } from "vuex";
export default {
  name: "EditSelection",
  components: {
    draggable,
    RestrictedAreaPopup,
    SeleCategoryPopup,
    DescriptionTemplate,
    sortable,
    Tinymce,
    FormList,
    AttrTemplate: () => import("@/view/BasicConfig/Subpage/AttrTemplate")
  },
  computed: {
    ...mapState({
      siteData: state => state.listing.sites,
      shopList: state => state.listing.shops,
      currency: state => state.listing.currency,
      unavailableLocation: state => state.listing.unavailableLocation,
      availableLocation: state => state.listing.availableLocation,
      domesticList: state => state.listing.domestic,
      international: state => state.listing.international,
      listingConfig: state => state.listing.listingConfig,
      returnPolicy: state => state.listing.returnPolicy,
      shippingCountries: state => state.listing.shippingCountries,
      shippingDispatchTime: state => state.listing.shippingDispatchTime,
      taxLocation: state => state.listing.taxLocation,
      selfSettingNumData: state => state.listing.selfSettingNumData,
      restrictBuyerCreditNumData: state =>
        state.listing.restrictBuyerCreditNumData,
      imageAdData: state => state.listing.imageAdData,
      creditRatingNumData: state => state.listing.creditRatingNumData,
      policyViolation: state => state.listing.policyViolation,
      policyViolationDays: state => state.listing.policyViolationDays,
      modules: state => state.listing.modules,
      discardBidData: state => state.listing.discardBidData,
      discardDaysData: state => state.listing.discardDaysData,
      allowMultiattr: state => state.listing.allowMultiattr,
      upcCode: state => state.listing.upcCode,
      listing_durationList: state => state.listing.listing_durationList,
      templateList: state => state.listing.templateList,
      paypal_accounts: state => state.listing.paypal_accounts,
      checkProductTitle: state => state.listing.checkProductTitle,
      checkeditContent: state => state.listing.checkeditContent
    }),
    showAreaDialog: {
      get() {
        return this.$store.state.listing.showAreaDialog;
      },
      set(val) {
        this.$store.state.listing.showAreaDialog = val;
      }
    },
    upcCode: {
      get() {
        return this.$store.state.listing.upcCode;
      },
      set(val) {
        this.$store.state.listing.upcCode = val;
      }
    }
  },
  watch: {
    "form.product1": {
      handler(val) {
        if (val) {
          this.getProductSpecifications();
          if (String(this.form.site) && this.form.shop) {
            this.getAllowMultiattr();
          }
        }
      }
    },
    allowMultiattr: {
      handler(val) {
        if (!val) {
          if (this.form.salesMethod === 2) {
            this.form.salesMethod = 0;
            this.salesChanges(0);
          }
        }
      }
    },
    "form.productTitle": {
      handler(val) {
        this.changeProductTitle();
      }
    },
    "form.salesMethod": {
      handler(val) {
        this.changeListingduration(val);
      }
    },
    "form.product2": {
      handler(val) {
        if (val) {
          this.getProductSpecifications();
          if (String(this.form.site) && this.form.shop) {
            this.getAllowMultiattr();
          }
        }
      }
    },
    "form.shop": {
      handler(val) {
        if (val) {
          if (String(this.form.site)) {
            let query = {
              shop_id: val,
              site_id: this.form.site
            };
            this.$store.dispatch("listing/getListingConfig", query);
            if (this.form.product2 || this.form.product1) {
              this.getAllowMultiattr();
            }
          }
          let paypal = this.paypal_accounts.filter(
            item => item.shop_id === val
          )[0];
          this.form.pay_pal_email = paypal.paypal;
          this.parmas.shop_id = val;
        }
      }
    },
    "form.site": {
      handler(val) {
        if (String(val)) {
          let query = { site_id: val };
          this.$store.dispatch("listing/getAvailableLocation", query);
          this.$store.dispatch("listing/getShippingType", query);
          this.$store.dispatch("listing/getRefundPolicye", query);
          this.$store.dispatch("listing/getShippingCountries", query);
          this.$store.dispatch("listing/getshippingDispatchtime", query);
          this.$store.dispatch("listing/getUnvailableLocation", query);
          this.$store.dispatch("listing/getTaxLocation", query);
          this.getCurrency();
          if (String(this.form.shop)) {
            let query = {
              shop_id: this.form.shop,
              site_id: val
            };
            this.$store.dispatch("listing/getListingConfig", query);
            if (this.form.product2 || this.form.product1) {
              this.getAllowMultiattr();
              this.getProductSpecifications();
            }
          }
        }
      }
    },
    "form.refundTemplate": {
      handler(val) {
        if (String(val)) {
          let obj = this.listingConfig.filter(item => item.tmp_id === val)[0];
          this.returns_accepted = obj.returns_accepted ? true : false;
          this.internation_returns_accepted = obj.internation_returns_accepted
            ? true
            : false;
        }
      }
    },
    "form.transportTemplate": {
      handler(val) {
        if (String(val)) {
          let obj = this.listingConfig.filter(item => item.tmp_id === val)[0];
          this.form.dispatch_time_max = obj.dispatch_time_max;
          obj.domestic_shipping.forEach(item => {
            item.free_shipping = item.free_shipping ? true : false;
          });
          this.form.internalGroup = obj.domestic_shipping;
          this.form.internationalGroup = obj.internation_shipping;
        }
      }
    },
    "form.otherTemplate": {
      handler(val) {
        if (String(val)) {
          let obj = this.listingConfig.filter(item => item.tmp_id === val)[0];
          this.form.disable_buyer_requirements = obj.disable_buyer_requirements;
          this.form.ship_to_registration_country = obj.ship_to_registration_country
            ? true
            : false;
          this.form.max_unpaid_count_checkbox = obj.max_unpaid_count_checkbox
            ? true
            : false;
          this.form.max_unpaid_count = obj.max_unpaid_count;
          this.form.max_unpaid_period = obj.max_unpaid_period;
          this.form.max_violations_count_checkbox = obj.max_violations_count_checkbox
            ? true
            : false;
          this.form.max_violations_count = obj.max_violations_count;
          this.form.max_violations_period = obj.max_violations_period;
          this.form.min_feedback_score_checkbox = obj.min_feedback_score_checkbox
            ? true
            : false;
          this.form.min_feedback_score = obj.min_feedback_score;
          this.form.require_item_count_checkbox = obj.require_item_count_checkbox
            ? true
            : false;
          this.form.require_item_count = obj.require_item_count;
          this.form.require_feedback_score_checkbox = obj.require_feedback_score_checkbox
            ? true
            : false;
          this.form.require_feedback_score = obj.require_feedback_score;
          this.form.sales_tax_state = obj.sales_tax_state;
          this.form.sales_tax_percent = obj.sales_tax_percent;
          this.form.shipping_included_in_tax = obj.shipping_included_in_tax
            ? true
            : false;
          this.form.gallery_type = obj.gallery_type;
        }
      }
    }
  },
  data() {
    const gj_quantityValidator = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入值"));
      }
      if (Number.isInteger(value) && value > 0) {
        callback();
      } else {
        return callback(new Error("只能为长度为5位数以内的正整数"));
      }
    };
    return {
      uploadImageUrl: `${process.env.VUE_APP_AUTH_API_DOMAIN}/listing/tool/image/upload`,
      componentsName: "AttrTemplate",
      spuInfo: {},
      unavailableShippingLocation: [],
      imageBaeUrl: "https://file.ebay.nantang-tech.com",
      active: 0, // 当前激活的导航索引,
      product1: [],
      product2: [],
      shop1: [],
      shop2: [],
      parmas: {
        shop_id: ""
      },
      saveProductNameList1: {},
      saveProductNameList2: {},
      productSkuList: [],
      saveShop1Name: {},
      saveShop2Name: {},
      saveProduct1IdList: {},
      saveProduct2IdList: {},
      saveShop1IdList: {},
      saveShop2IdList: {},
      tableHeadList: [],
      productidList: [],
      formList: [] /* 动态表单列表 */,
      formList2: [],
      modal_localtion: false,
      productAttrList: {},
      recordCurrent: {},
      infoTitle: "",
      sku: "",
      props: {
        lazy: true,
        lazyLoad: this.cascaderLazyload,
        value: "category_id",
        label: "category_name",
        dialogVisible: false,
        children: "son"
      },
      recordValue: "", // 记录自定义属性进入input框的值
      flag: true,
      list: [],
      parentId: 0,
      modal_attr: false,
      search_product: "",
      modal_product: false,
      categoryLevelList: [],
      uploadList: [],
      // options: [{
      //     category_id: 'zhinan',
      //     category_name: '指南',
      //   },
      // ],
      defineAttr: "",
      internation_returns_accepted: false, //国外选择框
      returns_accepted: false,
      showCategoryaDialog: false, //控制三级联动弹窗
      is_plan_release: false, // 定时发布单选按钮
      showPriceGroup: true, //控制 起拍价、保留价、一口价显示
      showWholesale: true, //控制 批发 显示
      showVariant: false, //控制变种属性、变种图片、变种参数 显示
      showBargain: false, //控制  接受买家还价 显示
      showQuantityInStock: false, //控制 库存数量 显示
      showFixedPrice: false, //控制 固价价格 显示
      showTemplateEditing: false,
      showHTMLtemplate: true,
      // 对话框数据缓存区
      form: {
        spu: "",
        product1: "",
        site: 0,
        shop: "",
        product2: "",
        shop1: "",
        shop2: "",
        salesMethod: 0,
        productTitle: "", //产品标题
        subtitle: "", //子标题,
        upc: "",
        attributes: "", //产品属性,
        descriptionType: "HTML", //描述模板类型
        chooseTemplate: "", //描述模板选择
        attributesSelect: "",
        unavailable_shipping_location: "",
        return_description: "",
        customizeAttr: [],
        variantAttributeData: [],
        variantPicture: [], //变种图片   主要控制
        private_listing: false, //私人拍卖单选框,
        listing_duration: "", //刊登天数,
        pm_start_price: "", //起拍价     主要控制
        pm_reserve_price: "", //保留价      主要控制
        pm_buy_it_now_price: "", //一口价,         主要控制
        is_pm_lot_size: "", // 批发状态,   主要控制
        pm_lot_size: "", //批发数量
        paymentTemplate: "", //选择付款模板,
        pay_pal_email: "", //payPal账号
        payment_instructions: "", //付款说明
        refundTemplate: "", //选择退款模板,
        gj_best_offer_auto_accept_price: "", //自动接收大于
        gj_minP_best_offer_price: "", //自动接收小于
        returns_with_in: "", //国内退货天数
        shipping_cost_paid_by: "", //国内退货运营承担方
        internation_returns_with_in: "", //外内退货天数
        internation_shipping_cost_paid_by: "", //国外退货运营承担方
        gj_best_offer_auto_accept: false, // 开启自动接受高报价
        gj_best_offer_auto_decline: false, // 开启自动拒绝低报价
        transportTemplate: "", //选择运输模板
        location: "", //物品所在地
        country: "", //国家或区域
        postal_code: "", //邮编
        dispatch_time_max: "",
        fixedPrice: "", //固价价格   主要控制
        gj_quantity: "", //库存数量   主要控制
        gj_best_offer: "", //接收买家还价 主要控制
        //国内运输
        internalGroup: [],
        // 国际运输
        internationalGroup: [],
        ddl_exclusion_list_type: 1, //不运送地区
        otherTemplate: "", //选择其他政策模板
        disable_buyer_requirements: 0,
        ship_to_registration_country: false, // 范围之外的复选框
        max_unpaid_count_checkbox: false, //弃标复选框
        max_unpaid_count: "2", //弃标个案
        max_unpaid_period: "30", //弃标天数
        max_violations_count_checkbox: false, //违反政策检举复选框
        max_violations_count: "2", //违反政策检举
        max_violations_period: "30", //违反政策检举天数
        min_feedback_score_checkbox: false, // 信誉等级复选框
        min_feedback_score: "1", // 信誉等级复选框
        require_item_count_checkbox: false, //10天内的自我设定复选框
        require_item_count: "1", //10天内的自我设定复选框
        require_feedback_score_checkbox: false, // 限制买家信誉等级复选框
        require_feedback_score: "0", //限制买家信誉等级选择器
        sales_tax_state: "", //销售税选择器
        sales_tax_percent: "", //销售税的百分比
        shipping_included_in_tax: false, // 销售税单选框
        gallery_type: "None", // 图片广告
        features: false, // 图片特色
        internation: false,
        plan_update: "", //发布时间
        tableData: [
          //变种参数  主要控制
        ],
        images: [],
        richTextContent: "" // 类型描述类型的富文本框
      },
      rules: {
        site: [
          { required: true, message: "请选择站点名称", trigger: "change" }
        ],
        gj_quantity: [
          { required: true, message: "请输入库存数量", trigger: "blur" },
          { validator: gj_quantityValidator, trigger: "blur" }
        ],
        pm_lot_size: [
          { required: true, message: "请输入批量数量", trigger: "blur" },
          { validator: gj_quantityValidator, trigger: "blur" }
        ],
        gj_best_offer_auto_accept_price: [
          {
            required: true,
            message: "请输入自动接受大于的价格",
            trigger: "blur"
          },
          { validator: gj_quantityValidator, trigger: "blur" }
        ],
        gj_minP_best_offer_price: [
          {
            required: true,
            message: "请输入自动接受小于的价格",
            trigger: "blur"
          },
          { validator: gj_quantityValidator, trigger: "blur" }
        ],
        pm_start_price: [
          { required: true, message: "请输入1起拍价", trigger: "blur" },
          { validator: gj_quantityValidator, trigger: "blur" }
        ],
        pm_reserve_price: [
          { required: true, message: "请输入保留价", trigger: "blur" },
          { validator: gj_quantityValidator, trigger: "blur" }
        ],
        pm_buy_it_now_price: [
          { required: true, message: "请输入一口价", trigger: "blur" },
          { validator: gj_quantityValidator, trigger: "blur" }
        ],
        listing_duration: [
          { required: true, message: "请选择刊登天数", trigger: "change" }
        ],
        shop: [{ required: true, message: "请选择店铺", trigger: "change" }],
        product1: [
          { required: true, message: "请选择产品分类", trigger: "change" }
        ],
        product2: [
          { required: true, message: "请选择产品分类", trigger: "change" }
        ],
        productTitle: [
          { required: true, message: "请填写产品标题", trigger: "blur" }
        ],
        pay_pal_email: [
          { required: true, message: "请填付款账号", trigger: "blur" }
        ],
        fixedPrice: [
          { required: true, message: "请输入价格", trigger: "blur" },
          { validator: gj_quantityValidator, trigger: "blur" }
        ],
        location: [
          { required: true, message: "请输入物品所在地", trigger: "blur" }
        ],
        salesMethod: [
          { required: true, message: "请选择售卖形式", trigger: "change" }
        ],
        descriptionType: [
          { required: true, message: "请选择类型描述", trigger: "change" }
        ],
        shipping_type: [
          { required: true, message: "请选择运输方式", trigger: "change" }
        ],
        country: [
          { required: true, message: "请选择国家和区域", trigger: "change" }
        ],
        dispatch_time_max: [
          { required: true, message: "请选择处理时间", trigger: "change" }
        ]
      },
      picturePasteInput: "", //图片粘贴文本框

      nameData: [],
      noTransportationData: [
        {
          id: 0,
          value: "运送至所有国家"
        },
        {
          id: 2,
          value: "选择不运送地区"
        }
      ],
      id: 2,
      transportId: 1,
      formLabelWidth: "100px",
      levelIndex: "",
      savedParentId: [""],
      savedActiveIndex: [],
      saveProductName: [],
      savedViewItem: "",
      parentId: 0,
      NextChild: "",
      productNo: "",
      shopsNo: "",
      testMutiData: {}
    };
  },
  created() {
    let query = { site_id: this.form.site };
    this.$store.dispatch("listing/getCommonsList");
    this.$store.dispatch("listing/getAvailableLocation", query);
    this.$store.dispatch("listing/getShippingType", query);
    this.$store.dispatch("listing/getRefundPolicye", query);
    this.$store.dispatch("listing/getShippingCountries", query);
    this.$store.dispatch("listing/getshippingDispatchtime", query);
    this.$store.dispatch("listing/getUnvailableLocation", query);
    this.$store.dispatch("listing/getTaxLocation", query);
    this.$store.dispatch("listing/getTemplateList");
  },
  mounted() {
    // this.$store.dispatch('listing/getSkuInfo', { sku: this.$route.query.id })
    let query = { listing_id: this.$route.query.sku };
    this.getProductInfo(query);
    setTimeout(() => {
      this.getCurrency();
      this.changeListingduration(this.form.salesMethod);
    }, 500);
  },
  methods: {
    // 生成upc
    generateUPC() {
      this.$store.dispatch("listing/getUPCcode");
    },
    // 一键插图
    // insertImage() {
    //   let imgHTMLArr = []
    //   this.form.images.forEach(img => {
    //     imgHTMLArr.push(`<img style="width:50%" src="${img.img_path}" alt>`);
    //   });
    //   console.log(imgHTMLArr)
    //   this.form.richTextContent = `${imgHTMLArr.join(" ")}${this.form.richTextContent}`;
    // },
    // 生成标题
    // generateTitle() {

    // },
    changeListingduration(val) {
      let _this = this;
      switch (val) {
        case 0:
          deleteObjKey(val);
          this.form.listing_duration = "";
          this.infoTitle = "拍卖";
          return;
        case 1:
          deleteObjKey(val);
          this.infoTitle = "固价";
          return;
        case 2:
          deleteObjKey(val);
          this.infoTitle = "多属性";
          return;
      }
      function deleteObjKey(val) {
        if (val === 0) {
          if (_this.listing_durationList[0].value === "GTC") {
            _this.listing_durationList.splice(0, 1);
          }
        } else {
          if (_this.listing_durationList[0].value === "GTC") {
            return _this;
          }
          _this.listing_durationList.unshift({ id: 0, value: "GTC" });
        }
      }
    },
    getCurrency() {
      let site = null;
      let usd = null;
      this.siteData.forEach(item => {
        if (item.site_id === this.form.site) {
          site = item.site;
        }
      });
      this.currency.forEach(item => {
        if (item.site === site) {
          usd = item.currency;
        }
      });
      return usd;
    },
    deleteFiratItem(arr, id) {
      let newArr = arr[id].slice(0);
      newArr.splice(0, 1);
      return newArr.join("_");
    },
    submitForm(form) {
      let customizeAttrObj = {};
      let variantAttributeDataObj = {};
      let imageObj = {};
      let imagesObj = {};
      this.form.customizeAttr.forEach(item => {
        if (item.name && item.value) {
          if (
            Object.prototype.hasOwnProperty.call(customizeAttrObj, item.name)
          ) {
            customizeAttrObj[item.name].push(item.value);
          } else {
            customizeAttrObj[item.name] = [item.value];
          }
        }
      });
      this.uploadList.forEach(item => {
        imageObj[item.val] = item.imagesList.map(item => item.url);
      });
      imagesObj[this.form.attributesSelect] = imageObj;
      this.form.variantAttributeData.forEach(item => {
        variantAttributeDataObj[item.name] = item.valueList.map(ele => ele.val);
      });
      let internationListGroup = [];
      let internalListGroup = [];
      if (this.form.internationalGroup.length > 0) {
        this.form.internationalGroup.forEach((item, index, arr) => {
          let obj = {
            add_shipping_cost: item.add_shipping_cost,
            shipping_cost: item.shipping_cost,
            shipping_type: item.shipping_type,
            priority: index + 1,
            shipping_location: ""
          };
          if (item.global) {
            obj.shipping_location = "Worldwide";
          }
          if (!item.global) {
            let checkList = item.shipping_location.filter(item => item.select);
            if (checkList.length > 0) {
              let valueList = checkList.map(item => item.value);
              obj.shipping_location = valueList.join("|");
            } else {
              obj.shipping_location = "";
            }
          }
          internationListGroup.push(obj);
        });
      }
      if (this.form.internalGroup.length > 0) {
        this.form.internalGroup.forEach((item, index, arr) => {
          let obj = {
            add_shipping_cost: item.add_shipping_cost,
            shipping_cost: item.shipping_cost,
            shipping_type: item.shipping_type,
            free_shipping: item.free_shipping ? 1 : 0,
            priority: index + 1
          };
          internalListGroup.push(obj);
        });
      }
      let sitesObj = this.siteData.filter(
        item => item.site_id === this.form.site
      );
      let siteName = sitesObj[0].site;
      this.$refs[form].validate(valid => {
        if (valid) {
          if (this.form.salesMethod === 0) {
            if (
              this.form.pm_start_price &&
              this.form.pm_reserve_price &&
              this.form.pm_buy_it_now_price
            ) {
              if (
                this.form.pm_start_price >= this.form.pm_reserve_price ||
                this.form.pm_start_price >= this.form.pm_buy_it_now_price ||
                this.form.pm_reserve_price > this.form.pm_buy_it_now_price
              ) {
                this.$message({
                  type: "warning",
                  message: "起拍价必须小于保留价和一口价,保留价必须小于一口价"
                });
                return false;
              }
            }
          }
          if (!this.checkProductTitle) {
            this.$message({
              type: "warning",
              message: "产品标题中侵权词汇"
            });
            return false;
          }
          if (!requiredWord(this.formList)) {
            this.$message({
              type: "warning",
              message: "请填写完整产品属性中的必填字段"
            });
            return false;
          }
          if (!requiredWord(this.formList2)) {
            this.$message({
              type: "warning",
              message: "请填写完整产品属性中的必填字段"
            });
            return false;
          }
          let fromListObj1 = {};
          let fromListObj2 = {};
          this.formList.forEach(item => {
            fromListObj1[item.name] = item.value;
          });
          this.formList2.forEach(item => {
            fromListObj2[item.name] = item.value;
          });
          let fromListObjTotal = Object.assign({}, fromListObj1, fromListObj2);
          let data = {
            spu: this.form.spu,
            product_sku: this.sku,
            listing_id: this.$route.query.sku,
            // sku: this.sku ,
            shop_id: this.form.shop,
            site: siteName,
            currency: this.getCurrency(),
            category_history_id: this.form.product1,
            category_ids: this.deleteFiratItem(
              this.saveProduct1IdList,
              this.form.product1
            ),
            category_path: this.saveProductNameList1[this.form.product1].join(
              "_"
            ),
            sell_type: this.form.salesMethod,
            product_title: this.form.productTitle,
            sub_title: this.form.subtitle,
            base_imgs: this.form.images,
            upc: this.upcCode,
            product_attrs: fromListObjTotal,
            pay_pal_email: this.form.pay_pal_email,
            payment_instructions: this.form.payment_instructions,
            returns_accepted: this.form.returns_accepted ? 0 : 1,
            returns_with_in: this.form.returns_with_in,
            other_attrs: customizeAttrObj,
            shipping_cost_paid_by: this.form.shipping_cost_paid_by,
            internation_returns_accepted: this.internation_returns_accepted
              ? 1
              : 0,
            return_description: this.form.return_description, //退款说明
            location: this.form.location,
            country: this.form.country,
            postal_code: this.form.postal_code,
            dispatch_time_max: this.form.dispatch_time_max,
            international_shipping: internationListGroup,
            domestic_shipping: internalListGroup,
            ddl_exclusion_list_type: this.form.ddl_exclusion_list_type,
            // unavailable_shipping_location: this.form.unavailable_shipping_location,
            disable_buyer_requirements: this.form.disable_buyer_requirements,
            gallery_type: this.form.gallery_type,
            is_plan_release: this.is_plan_release ? 1 : 0,
            sales_tax_state: this.form.sales_tax_state,
            sales_tax_percent: this.form.sales_tax_percent,
            shipping_included_in_tax: this.form.shipping_included_in_tax
              ? 1
              : 0,
            private_listing: this.form.private_listing ? 1 : 0,
            listing_duration: this.form.listing_duration
            // plan_update: this.form.plan_update
          };
          if (this.internation_returns_accepted) {
            data.internation_returns_with_in = this.form.internation_returns_with_in;
            data.internation_shipping_cost_paid_by = this.form.internation_shipping_cost_paid_by;
          }
          if (this.form.disable_buyer_requirements === 1) {
            data.ship_to_registration_country = this.form
              .ship_to_registration_country
              ? 1
              : 0;
            data.max_unpaid_count_checkbox = this.form.max_unpaid_count_checkbox
              ? 1
              : 0;
            data.max_unpaid_count = this.form.max_unpaid_count;
            data.max_unpaid_period = this.form.max_unpaid_period;
            data.max_violations_count_checkbox = this.form
              .max_violations_count_checkbox
              ? 1
              : 0;
            data.max_violations_count = this.form.max_violations_count;
            data.max_violations_period = this.form.max_violations_period;
            data.min_feedback_score_checkbox = this.form
              .min_feedback_score_checkbox
              ? 1
              : 0;
            (data.min_feedback_score = this.form.min_feedback_score),
              (data.require_item_count_checkbox = this.form
                .require_item_count_checkbox
                ? 1
                : 0);
            data.require_item_count = this.form.require_item_count;
            data.require_feedback_score_checkbox = this.form
              .require_feedback_score_checkbox
              ? 1
              : 0;
            data.require_feedback_score = this.form.require_feedback_score;
          }
          if (this.form.ddl_exclusion_list_type === 2) {
            data.unavailable_shipping_location = this.form.unavailable_shipping_location;
          }
          if (this.is_plan_release) {
            if (!this.form.plan_update) {
              this.$message({
                type: "wanring",
                message: "请选择发布时间"
              });
            }
            if (
              new Date(this.form.plan_update).getTime() < new Date().getTime()
            ) {
              this.$message({
                type: "wanring",
                message: "发布时间必须晚于当前的时间"
              });
            }
            data.plan_update = dateFormat(this.form.plan_update);
          }
          if (this.form.salesMethod === 0) {
            (data.pm_start_price = parseInt(this.form.pm_start_price)),
              (data.pm_reserve_price = parseInt(this.form.pm_reserve_price)),
              (data.pm_buy_it_now_price = parseInt(
                this.form.pm_buy_it_now_price
              )),
              (data.is_pm_lot_size = this.form.is_pm_lot_size);
            data.pm_lot_size = this.form.pm_lot_size;
          }
          if (this.form.salesMethod === 1) {
            (data.gj_start_price = this.form.fixedPrice),
              (data.gj_quantity = this.form.gj_quantity),
              (data.gj_best_offer = this.form.gj_best_offer),
              (data.gj_best_offer_auto_accept = this.form
                .gj_best_offer_auto_accept
                ? 1
                : 0),
              (data.gj_best_offer_auto_accept_price = parseInt(
                this.form.gj_best_offer_auto_accept_price
              )),
              (data.gj_best_offer_auto_decline = this.form
                .gj_best_offer_auto_decline
                ? 1
                : 0),
              (data.gj_minP_best_offer_price = parseInt(
                this.form.gj_minP_best_offer_price
              )),
              (data.is_gjLot_size = this.form.is_pm_lot_size);
            data.gj_lot_size = this.form.pm_lot_size;
          }
          if (this.form.salesMethod === 2) {
            data.variety_imgs = imageObj;
            data.variety_paramers = this.form.tableData; // 变种参数
          }
          if (this.form.descriptionType == "HTML") {
            if (!this.form.richTextContent) {
              this.$message({
                type: "warning",
                message: "请输入描述说明"
              });
              return false;
            }
            if (!this.checkeditContent) {
              this.$message({
                type: "warning",
                message: "产品描述中有侵权词汇"
              });
              return false;
            }
            data.description = this.form.richTextContent;
          }
          if (this.form.descriptionType == "template") {
            if (this.form.chooseTemplate) {
              data.description = this.$refs.AttrTemplate.previewTemplate;
            }
          }
          if (this.form.shop1) {
            (data.shop_category_history_id = this.form.shop1),
              (data.shop_category_ids = this.deleteFiratItem(
                this.saveShop1IdList,
                this.form.shop1
              )),
              (data.shop_category_path = this.saveShop1Name[
                this.form.shop1
              ].join("_"));
          }
          if (this.form.shop2) {
            (data.shop_second_category_history_id = this.form.shop2),
              (data.shop_second_category_ids = this.deleteFiratItem(
                this.saveShop2IdList,
                this.form.shop2
              ));
            data.shop_second_category_path = this.saveShop2Name[
              this.form.shop2
            ].join("_");
          }
          if (this.form.product2) {
            (data.second_category_history_id = this.form.product2),
              (data.second_category_ids = this.deleteFiratItem(
                this.saveProduct2IdList,
                this.form.product2
              ));
            data.second_category_path = this.saveProductNameList2[
              this.form.product2
            ].join("_");
          }
          this.$store.dispatch("listing/savePublicationRecords", data);
        } else {
          this.$message({
            type: "warning",
            message: "请填写必填的字段"
          });
          return false;
        }
      });
    },
    /* 获取产品属性规格 */
    getProductSpecifications() {
      let query = {
        site_id: this.form.site,
        category_id: this.form.product1,
        second_category_id: this.form.product2
      };
      getProductSpecifications(query).then(res => {
        if (this.form.product1) {
          res.data[this.form.product1].forEach(item => {
            if (item.selection_mode === "checkbox") {
              item.value = [];
            } else {
              item.value = "";
            }
          });
          res.data[this.form.product1].forEach(item => {
            for (let key in this.productAttrList) {
              if (item.name === key) {
                if (item.selection_mode === "checkbox") {
                  if (typeof this.productAttrList[key] == "string") {
                    item.value = [this.productAttrList[key]];
                  } else {
                    item.value = this.productAttrList[key];
                  }
                } else {
                  item.value = this.productAttrList[key];
                }
              }
            }
          });
          this.formList = res.data[this.form.product1];
        }
        if (this.form.product2) {
          res.data[this.form.product2].forEach(item => {
            if (item.selection_mode === "checkbox") {
              item.value = [];
            } else {
              item.value = "";
            }
          });
          res.data[this.form.product2].forEach(item => {
            for (let key in this.productAttrList) {
              if (item.name === key) {
                if (item.selection_mode === "checkbox") {
                  if (typeof this.productAttrList[key] == "string") {
                    item.value = [this.productAttrList[key]];
                  } else {
                    item.value = this.productAttrList[key];
                  }
                } else {
                  item.value = this.productAttrList[key];
                }
              }
            }
          });
          this.formList2 = res.data[this.form.product2];
        }
      });
    },
    // 产品分类下是否允多属性sku
    getAllowMultiattr() {
      let query = {
        site_id: this.form.site,
        shop_id: this.form.shop
      };
      if (this.form.product1) {
        query.category_history_id = this.form.product1;
      }
      if (this.form.product2) {
        query.second_category_history_id = this.form.product2;
      }
      this.$store.dispatch("listing/getAllowMultiattr", query);
    },
    /* 是否有侵权词汇 */
    changeProductTitle() {
      if (!this.form.productTitle) {
        return false;
      }
      let formData = new FormData();
      formData.append("words", this.form.productTitle);
      let flag = { title: "productTitle" };
      this.$store.dispatch("listing/InfringementOfWord", { formData, flag });
    },
    input(val) {
      if (!val) {
        return false;
      }
      debounce(() => {
        if (!this.form.richTextContent) {
          return false;
        }
        let formData = new FormData();
        formData.append("words", textFormat(this.form.richTextContent));
        let flag = { title: "editorContent" };
        this.$store.dispatch("listing/InfringementOfWord", { formData, flag });
      }, 1000);
    },
    /* 获取运输政策-- 不可运送国家 */
    getUnvailableLocation() {
      this.$set(this.recordCurrent, "title", "添加不运送地区");
    },
    /* 获取产品分类和店铺的列表 */
    getProduct1List(args) {
      let query = {
        site_id: this.form.site,
        pid: 0
      };
      getPeoduct1(query).then(res => {
        if (args) {
          this.categoryLevelList.splice(0, 1, res.data);
          // this.categoryLevelList[0] = res.data.data.children
        } else {
          this.categoryLevelList.push(res.data);
        }
        this.modal_product = true;
      });
      this.$store.dispatch("listing/getPeoduct1", query);
    },
    getShopClassList(args) {
      let query = {
        site_id: this.form.site,
        shop_id: this.form.shop,
        pid: 0
      };
      getShopClassList(query).then(res => {
        if (args) {
          this.categoryLevelList.splice(0, 1, res.data);
          // this.categoryLevelList[0] = res.data.data.children
        } else {
          this.categoryLevelList.push(res.data);
        }
        this.modal_product = true;
      });
    },
    // 查看下一级的产品
    showChildren(item, index, activeIndex) {
      this.NextChild = item;
      this.levelIndex = index;
      this.savedParentId[index + 1] = item.category_id;
      this.savedActiveIndex[index] = activeIndex;
      this.saveProductName[index] = item.category_name;
      this.saveProductName.splice(index + 1);
      this.savedActiveIndex.splice(index + 1);
      if (index === 0) {
        this.parentId = 0;
      } else {
        this.parentId = item.category_id;
      }
      if (!item.has_son) {
        this.categoryLevelList.splice(index + 1);
        return false;
      }
      this.updateList(item.category_id, index);
    },
    updateList(id, index) {
      if (!id) {
        this.getdata(true);
        return false;
      }
      let query = {
        site_id: this.form.site,
        pid: id
      };
      if (!this.flag) {
        query.shop_id = this.form.shop;
        getShopClassList(query).then(res => {
          this.categoryLevelList.splice(index + 1);
          let tempArr = [...this.categoryLevelList];
          tempArr[index + 1] = res.data;
          this.$nextTick(() => {
            this.categoryLevelList = tempArr;
          });
        });
      } else {
        getPeoduct1(query).then(res => {
          this.categoryLevelList.splice(index + 1);
          let tempArr = [...this.categoryLevelList];
          tempArr[index + 1] = res.data;
          this.$nextTick(() => {
            this.categoryLevelList = tempArr;
          });
        });
      }
    },
    cascaderLazyload(node, reslove) {
      let { category_id } = node;
      this.parentId = category_id;
      let nodes = [];
    },
    // 取消操作
    cancel() {
      this.$router.go(-1);
    },
    // 删除产品属性
    handleClose(key, item, i) {
      item.splice(i, 1);
      if (!item.length) {
        this.$delete(this.productAttrList, key); // 当属性被全部删除时，应该删除对应的键值
      }
    },
    // 获取信息
    getProductInfo(query) {
      getListingPublishrecordDetail(query).then(res => {
        let data = res.data;
        let list = [];
        if (data.variety_attrs.length) {
          data.variety_attrs.forEach(item => {
            let obj = {};
            obj.name = item.attr_name;
            obj.valueList = [];
            item.item_name.forEach(ele => {
              let son = {};
              son.val = ele;
              son.imagesList = [];
              obj.valueList.push(son);
            });
            list.push(obj);
          });
        }
        if (data.variety_imgs.length) {
          data.variety_imgs.forEach(item => {
            list.forEach(ele => {
              if (item.attr_name === ele.name) {
                ele.valueList.forEach(son => {
                  if (son.val === item.item_name) {
                    let obj = {};
                    obj.url = item.img_path;
                    son.imagesList.push(obj);
                  }
                });
              }
            });
          });
        }
        if (list.length > 0) {
          this.form.attributesSelect = list[0].name;
          list.forEach(ele => {
            if (ele.name === this.form.attributesSelect) {
              // 如果当前的新增的自定义属性名称相同
              this.uploadList = ele.valueList.filter(son => son.val);
            }
          });
        }
        this.form.variantAttributeData = list;
        this.form.productTitle = data.title;
        this.form.images = data.base_imgs;
        this.form.spu = data.spu;
        this.form.shop = data.shop_id;
        this.form.salesMethod = data.sell_type;
        this.salesChanges(this.form.salesMethod);
        this.form.private_listing = data.private_listing;
        this.form.listing_duration = data.listing_duration;
        this.form.pm_start_price = parseInt(data.pm_start_price)
          ? parseInt(data.pm_start_price)
          : "";
        this.form.pm_reserve_price = parseInt(data.pm_reserve_price)
          ? parseInt(data.pm_reserve_price)
          : "";
        this.form.pm_buy_it_now_price = parseInt(data.pm_buy_it_now_price)
          ? parseInt(data.pm_buy_it_now_price)
          : "";
        this.form.fixedPrice = parseInt(data.gj_start_price)
          ? parseInt(data.gj_start_price)
          : "";
        this.form.gj_quantity = parseInt(data.gj_quantity)
          ? parseInt(data.gj_quantity)
          : "";
        if (this.form.salesMethod === 0) {
          this.form.is_pm_lot_size = data.is_pm_lot_size;
          this.form.pm_lot_size = data.pm_lot_size;
        }
        if (this.form.salesMethod === 1) {
          this.form.is_pm_lot_size = data.is_gjLot_size;
          this.form.pm_lot_size = data.gj_lot_size;
        }
        this.form.gj_best_offer = data.gj_best_offer;
        this.form.gj_best_offer_auto_accept = data.gj_best_offer_auto_accept
          ? true
          : false;
        this.form.gj_best_offer_auto_accept_price =
          data.gj_best_offer_auto_accept_price;
        this.form.gj_best_offer_auto_decline = data.gj_best_offer_auto_decline
          ? true
          : false;
        this.form.gj_minP_best_offer_price = data.gj_minP_best_offer_price;
        this.form.productTitle = data.title;
        this.form.subtitle = data.sub_title;
        this.upcCode = data.upc;
        this.form.richTextContent = data.description;
        this.form.pay_pal_email = data.pay_pal_email;
        this.form.payment_instructions = data.payment_instructions;
        this.form.location = data.location;
        this.form.country = data.country;
        this.form.postal_code = data.postal_code;
        this.form.dispatch_time_max = data.dispatch_time_max;
        this.form.ddl_exclusion_list_type = data.ddl_exclusion_list_type;
        this.returns_accepted = data.returns_accepted ? true : false;
        this.form.returns_with_in = data.returns_with_in;
        this.form.shipping_cost_paid_by = data.shipping_cost_paid_by;
        this.internation_returns_accepted = data.internation_returns_accepted
          ? true
          : false;
        this.form.internation_returns_with_in =
          data.internation_returns_with_in;
        this.form.internation_shipping_cost_paid_by =
          data.internation_shipping_cost_paid_by;
        this.form.return_description = data.return_description;
        this.form.disable_buyer_requirements = data.disable_buyer_requirements;
        this.form.ship_to_registration_country = data.ship_to_registration_country
          ? true
          : false;
        this.form.max_unpaid_count_checkbox = data.max_unpaid_count_checkbox
          ? true
          : false;
        this.form.max_unpaid_count = data.max_unpaid_count;
        this.form.max_unpaid_period = data.max_unpaid_period;
        this.form.max_violations_count_checkbox = data.max_violations_count_checkbox
          ? true
          : false;
        this.form.max_violations_count = data.max_violations_count;
        this.form.max_violations_period = data.max_violations_period;
        this.form.min_feedback_score_checkbox = data.min_feedback_score_checkbox
          ? true
          : false;
        this.form.min_feedback_score = data.min_feedback_score;
        this.form.require_item_count_checkbox = data.require_item_count_checkbox
          ? true
          : false;
        this.form.require_item_count = data.require_item_count;
        this.form.require_feedback_score_checkbox = data.require_feedback_score_checkbox
          ? true
          : false;
        this.form.require_feedback_score = data.require_feedback_score;
        this.form.sales_tax_state = data.sales_tax_state;
        this.form.sales_tax_percent = data.sales_tax_percent;
        this.form.shipping_included_in_tax = data.shipping_included_in_tax
          ? true
          : false;
        this.form.gallery_type = data.gallery_type;
        this.is_plan_release = data.is_plan_release ? true : false;
        this.form.plan_update = data.plan_update;
        this.form.images = data.base_imgs;
        if (data.ddl_exclusion_list_type === 2) {
          this.unavailableShippingLocation = data.unavailable_shipping_location;
          this.form.unavailable_shipping_location = data.unavailable_shipping_location
            ? data.unavailable_shipping_location.join("|")
            : "";
        }
        this.descriptionChange();
        data.domestic_shipping.forEach(item => {
          item.free_shipping = item.free_shipping ? true : false;
        });
        data.international_shipping.forEach(item => {
          item.global = false;
          item.checkAll = false;
          if (typeof item.shipping_location == "string") {
            // 如果当前的类型为字符串，那么选择的就是全球
            item.global = true;
            item.shipping_location = _g.getJsonParse(this.availableLocation);
          } else {
            // 不是则是数组类型，那么选的就是国家
            item.checkAll = true;
            let availableLocation = _g.getJsonParse(this.availableLocation);
            availableLocation.forEach(ele => {
              item.shipping_location.forEach(location => {
                let list = [];
                list.push(ele.value);
                if (list.indexOf(location) != -1) {
                  ele.select = true;
                }
              });
            });
            item.shipping_location = availableLocation;
          }
        });
        this.form.internalGroup = data.domestic_shipping;
        this.form.internationalGroup = data.international_shipping;
        this.form.product1 = data.category_history_id;
        this.form.product2 = data.second_category_history_id;
        this.form.shop1 = data.shop_category_history_id;
        this.form.shop2 = data.shop_second_category_history_id;
        let product1Ids = [""];
        product1Ids.push(...data.category_ids);
        let product2Ids = [""];
        product2Ids.push(...data.second_category_ids);
        let shop1Ids = [""];
        shop1Ids.push(...data.shop_category_ids);
        let shop2Ids = [""];
        shop2Ids.push(...data.shop_second_category_ids);
        this.saveProduct1IdList[data.category_history_id] = product1Ids;
        this.saveProduct2IdList[data.second_category_history_id] = product2Ids;
        this.saveShop1IdList[data.shop_category_history_id] = shop1Ids;
        this.saveShop2IdList[data.shop_second_category_history_id] = shop2Ids;

        this.saveProductNameList1[data.category_history_id] =
          data.category_path;
        this.product1.push({
          id: data.category_history_id,
          label: data.category_path[data.category_path.length - 1]
        });
        this.saveProductNameList2[data.second_category_history_id] =
          data.second_category_path;
        this.product2.push({
          id: data.second_category_history_id,
          label: data.second_category_path[data.second_category_path.length - 1]
        });
        this.saveShop1Name[data.shop_category_history_id] =
          data.shop_category_path;
        this.shop1.push({
          id: data.shop_category_history_id,
          label: data.shop_category_path[data.shop_category_path.length - 1]
        });
        this.saveShop2Name[data.shop_second_category_history_id] =
          data.shop_second_category_path;
        this.shop2.push({
          id: data.shop_second_category_history_id,
          label:
            data.shop_second_category_path[
              data.shop_second_category_path.length - 1
            ]
        });
        /* 自定义属性 */
        // this.form.customizeAttr
        for (let key in data.other_attrs) {
          data.other_attrs[key].forEach(item => {
            let obj = {};
            obj.name = key;
            obj.value = item;
            this.form.customizeAttr.push(obj);
          });
        }
        /* 产品属性 */
        // for (let key in data.product_attrs) {
        //   if (!data.product_attrs[key] instanceof Array) {
        //     data.product_attrs[key] = [data.product_attrs[key]]
        //   }
        // }
        this.productAttrList = data.product_attrs;
        /* 变种参数 */
        let tableList = [];
        if (data.variety_paramers.length) {
          tableList = data.variety_paramers[0].attrs;
          data.variety_paramers.forEach(item => {
            this.productSkuList.push(item.product_sku);
            for (let key in item.attrs) {
              if (
                Object.prototype.hasOwnProperty.call(this.testMutiData, key)
              ) {
                this.testMutiData[key].push(item.attrs[key]);
              } else {
                this.testMutiData[key] = [item.attrs[key]];
              }
            }
          });
        }

        this.tableHeadList.push(...tableList);
        this.form.tableData = data.variety_paramers;
      });
    },

    privateAuctionsChanges() {},
    // 批发选择
    wholesaleChanges(data) {},
    handleRemove(file, fileList, item, index) {},
    domesticChange(e) {
      if (this.returns_accepted) {
        this.form.returns_with_in = "";
        this.form.shipping_cost_paid_by = "";
      }
    },
    foreignChange(e) {
      if (this.internation_returns_accepted) {
        this.form.internation_returns_with_in = "";
        this.form.internation_shipping_cost_paid_by = "";
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 添加变种属性按钮
    addVariantAttributes() {
      this.modal_attr = true;
    },
    // 确定添加
    submit_attr() {
      if (!this.defineAttr) {
        this.$message({
          message: "请输入自定义属性",
          type: "warning"
        });
        return false;
      }
      let nameList = this.form.variantAttributeData.map(item => item.name);
      if (nameList.indexOf(this.defineAttr) !== -1) {
        this.$message({
          message: "不能添加相同的属性",
          type: "warning"
        });
        return false;
      }
      if (this.form.variantAttributeData.length === 5) {
        this.$message({
          message: "最多只能添加5个自定义属性",
          type: "warning"
        });
        return false;
      }
      let valueList = [
        {
          val: "",
          imagesList: []
        },
        {
          val: "",
          imagesList: []
        }
      ];
      this.form.variantAttributeData.push({ name: this.defineAttr, valueList });
      this.form.attributesSelect = this.form.variantAttributeData[0].name;
      this.defineAttr = "";
      this.modal_attr = false;
    },
    // 确定选择分类
    submit_product() {
      if (this.NextChild) {
        if (this.NextChild.has_son) {
          this.$message({
            type: "warning",
            message: `错误：您选择的类目 “${this.NextChild.category_name}” 还有子类目,请选择子类目！`
          });
          return false;
        }
      }
      if (this.flag) {
        if (this.productNo === "1") {
          this.saveProductNameList1[
            this.NextChild.category_id
          ] = this.saveProductName;
          this.saveProduct1IdList[
            this.NextChild.category_id
          ] = this.savedParentId;
          this.form.product1 = this.NextChild.category_id;
          this.product1.push({
            id: this.NextChild.category_id,
            label: this.NextChild.category_name
          });
        } else {
          this.saveProductNameList2[
            this.NextChild.category_id
          ] = this.saveProductName;
          this.saveProduct2IdList[
            this.NextChild.category_id
          ] = this.savedParentId;
          this.form.product2 = this.NextChild.category_id;
          this.product2.push({
            id: this.NextChild.category_id,
            label: this.NextChild.category_name
          });
        }
      } else {
        if (this.shopsNo === "1") {
          this.saveShop1Name[this.NextChild.category_id] = this.saveProductName;
          this.saveShop1IdList[this.NextChild.category_id] = this.savedParentId;
          this.form.shop1 = this.NextChild.category_id;
          this.shop1.push({
            id: this.NextChild.category_id,
            label: this.NextChild.category_name
          });
        } else {
          this.saveShop2Name[this.NextChild.category_id] = this.saveProductName;
          this.saveShop2IdList[this.NextChild.category_id] = this.savedParentId;
          this.form.shop2 = this.NextChild.category_id;
          this.shop2.push({
            id: this.NextChild.category_id,
            label: this.NextChild.category_name
          });
        }
      }
      this.cancel_product();
    },
    // 取消选择产品分类
    cancel_product() {
      this.savedActiveIndex = [];
      this.categoryLevelList = [];
      this.saveProductName = [];
      this.savedParentId = [""];
      this.modal_product = false;
    },
    // 取消添加
    cancel_attr() {
      this.modal_attr = false;
    },
    // 添加单个属性
    addSingleAttr(item) {
      if (item.valueList.length === 10) {
        this.$message({
          message: "最多只能添加10个属性",
          type: "warning"
        });
        return false;
      }
      item.valueList.push({ val: "", imagesList: [] });
    },
    // 删除单个属性
    removeSingleAttr(item, index) {
      item.valueList.splice(index, 1);
      this.uploadList.splice(index, 1);
      if (item.valueList.length === 0) {
        // 如果当前的属性中的单个属性长度为0，应该父属性
        this.form.variantAttributeData = this.form.variantAttributeData.filter(
          ele => ele.valueList.length > 0
        );
      }
      this.form.attributesSelect =
        this.form.variantAttributeData.length > 0
          ? this.form.variantAttributeData[0].name
          : "";
      if (!this.form.variantAttributeData.length) {
        this.form.attributesSelect = "";
      }
    },
    /* 拿到当前 */
    getSameNum(val, arr) {
      let processArr;
      processArr = arr.filter(item => {
        return item.val == val;
      });
      return processArr.length;
    },
    getSameNameNum(val, arr) {
      let processArr;
      processArr = arr.filter(item => {
        return item == val;
      });
      return processArr.length;
    },
    // 获取焦点
    focusValue(val) {
      if (val) {
        this.recordValue = val;
      }
    },
    getMaxClass(arr, num) {},
    // 属性值失去焦点添加upload组件
    blurAttr(val, item, valueList, fatherLabel) {
      if (!val) {
        return false;
      }
      if (this.recordValue === val) {
        return false;
      }
      if (
        Object.prototype.hasOwnProperty.call(this.testMutiData, fatherLabel)
      ) {
        this.testMutiData[fatherLabel].push(val);
      } else {
        this.testMutiData[fatherLabel] = [val];
      }
      const result = getMutiData(this.testMutiData);
      let query = {
        num: result.length,
        product_sku: this.productSkuList
      };
      getSkuCode(query).then(res => {
        setTimeout(() => {
          result.forEach((item, index, arr) => {
            item.sku = res.data[index];
            item.attr_price = "";
            item.quantity = "";
            item.barcode = "";
          });
          this.form.tableData = result;
        }, 100);
      });
      this.form.variantAttributeData.forEach(ele => {
        if (ele.name === this.form.attributesSelect) {
          // 如果当前的新增的自定义属性名称相同
          if (this.getSameNum(val, ele.valueList) >= 2 && val) {
            // 下面的自定义属性名称已有重复的 并且当前已经输入了值
            let hash = {};
            ele.valueList = ele.valueList.reduce((preVal, curVal) => {
              hash[curVal.val]
                ? ""
                : (hash[curVal.val] = true && preVal.push(curVal));
              return preVal;
            }, []);
          }
          this.uploadList = ele.valueList.filter(son => son.val);
        }
      });
      if (this.getSameNameNum(item.name, this.tableHeadList) === 1)
        return false; // 判断添加的头部有没有相同的
      this.tableHeadList.push(item.name);
    },
    // 双击单元格
    dubleClick(row, column, cell, event) {
      if (column.property === "barcode") {
        return false;
      }
      this.form.tableData.forEach(item => {
        item[column.property] = row[column.property];
      });
    },
    // 根据下拉框中的值遍历产生上传
    changeVariantVal(val) {
      this.form.variantAttributeData.forEach(item => {
        if (item.name === val) {
          this.uploadList = item.valueList.filter(item => item.val);
        }
      });
      if (!val) {
        this.uploadList = [];
      }
    },
    // 添加自定义属性按钮
    addAttr() {
      if (this.form.customizeAttr.length === 10) {
        return false;
      }
      this.form.customizeAttr.push({
        name: "",
        value: ""
      });
    },
    // 删除属性
    deleteAttr(index) {
      this.form.customizeAttr.splice(index, 1);
    },
    //处理表删除
    handleTableDelete(index, data) {
      if (this.productSkuList.indexOf(data.sku) !== -1) {
        // 如果当前删除的sku在关联商品的sku列表里，那么也应该删除
        let index = this.productSkuList.indexOf(data.sku);
        this.productSkuList.splice(index, 1);
      }
      this.form.tableData.splice(index, 1);
    },
    // 添加运输方式
    addShipping() {
      this.form.internalGroup.push({
        shipping_type: "", //运输方式
        free_shipping: false, //免运费
        shipping_cost: "", //运费
        add_shipping_cost: "" //附加费用
      });
    },
    // 移除运输方式
    deleShipping(index, str) {
      if (str === "in") {
        this.form.internalGroup.splice(index, 1);
      } else {
        this.form.internationalGroup.splice(index, 1);
      }
    },
    descriptionChange() {
      this.showHTMLtemplate = false;
      this.showTemplateEditing = false;

      if (this.form.descriptionType == "HTML") {
        this.showHTMLtemplate = true;
      }
      if (this.form.descriptionType == "template") {
        this.showTemplateEditing = true;
      }
    },

    // 添加不运送地区
    addRestrictedArea() {
      if (this.form.site === null || this.form.site === "") {
        this.$message({
          message: "请先选择站点",
          type: "warning"
        });
        return false;
      }
      this.showAreaDialog = true;
      this.$set(this.recordCurrent, "title", "添加不运送地区");
    },
    areaPopupData(data) {
      let arr = [];
      if (data) {
        data.forEach(item => {
          arr.push(item.value);
        });
        this.form.unavailable_shipping_location = arr.join("|");
      } else {
        this.form.unavailable_shipping_location = "";
      }
      this.showAreaDialog = false;
    },
    /* 确定添加 */
    submit_location() {},
    // 不运送地区弹窗回调
    cancel_modal_location() {
      this.modal_localtion = false;
    },
    //选择分类
    chooseCategory(num) {
      if (this.form.site === null || this.form.site === "") {
        this.$message({
          message: "请先选择站点",
          type: "warning"
        });
        return false;
      }
      this.productNo = num;
      this.flag = true;
      this.getProduct1List();
    },
    chooseShops(num) {
      if (
        this.form.site === null ||
        this.form.site === "" ||
        this.form.shop === null ||
        this.form.shop === ""
      ) {
        this.$message({
          message: "请先选择站点和店铺",
          type: "warning"
        });
        return false;
      }
      this.shopsNo = num;
      this.flag = false;
      this.getShopClassList();
    },
    // 三级联动弹窗回调
    categoryaPopupData(data) {
      this.showCategoryaDialog = false;
    },
    //添加国外一行
    addInternationaShipping() {
      this.form.internationalGroup.push({
        shipping_type: "", //运输方式 transport
        shipping_cost: "", //运费 postage
        add_shipping_cost: "", //附加费用 attach
        global: true, //全球勾选
        //判断勾选
        shipping_location: _g.getJsonParse(this.availableLocation) //运送范围 country
      });
    },

    // 售卖形式变化控制
    salesChanges(e) {
      this.showPriceGroup = false; //控制 起拍价、保留价、一口价显示
      this.showWholesale = false; //控制 批发 显示
      this.showVariant = false; //控制变种属性、变种图片、变种参数 显示
      this.showBargain = false; //控制  接受买家还价 显示
      this.showQuantityInStock = false; //控制 库存数量 显示
      this.showFixedPrice = false; //控制 固价价格 显示

      if (e === 0) {
        this.showPriceGroup = true;
        this.showWholesale = true;
      }
      if (e === 1) {
        this.showFixedPrice = true;
        this.showQuantityInStock = true;
        this.showBargain = true;
        this.showWholesale = true;
        this.form.listing_duration = 0;
      }
      if (e === 2) {
        this.showVariant = true;
        this.form.listing_duration = 0;
      }
    },
    // 图片上传之前的钩子
    beforeUpload(file) {
      if (this.form.images.length === 12) {
        Loading.service({ fullscreen: true }).close();
        return false;
      }
      let type_arr = ["image/jpeg", "image/png"];
      let type = file.type;
      if (!type_arr.includes(type)) {
        this.$message({
          message: "图片格式不正确，只支持 jpg 和 png 类型图片",
          type: "error"
        });
        return false;
      }
      Loading.service({ fullscreen: true, text: "图片上传中，请稍后" });
    },
    handlePictureCardPreview(e) {},
    // 图片上传之后的钩子
    onSuccess(response, file, fileList) {
      this.form.images.push({
        img_path: response.data.file
      });
      if (this.form.images.length > 12) {
        this.form.images.splice(11, this.form.images.length - 12);
      }
      Loading.service({ fullscreen: true }).close();
    },
    // 自定义属性上传图片
    uplaodSuccessAttr(response, file, fileList, item) {
      let obj = { url: response.data.file };
      item.imagesList.push(obj);
      if (item.imagesList.length > 12) {
        item.imagesList.splice(11, item.imagesList.length - 12);
      }
      Loading.service({ fullscreen: true }).close();
    },
    // 删除图片
    productInfoRemove(index) {
      this.form.images.splice(index, 1);
    },
    // 删除属性中的图片
    productInfoRemoveUploadList(list, index) {
      list.splice(index, 1);
    },
    confirmPastePath() {
      if (!this.picturePasteInput) {
        this.$message({
          type: "warning",
          message: "请输入图片地址"
        });
        return false;
      }
      let index = this.picturePasteInput.lastIndexOf("."); // 获取最后一个点的位置
      let imgStr = this.picturePasteInput.substr(index + 1); // 获取最后一个点后面的文本
      if (imgStr !== "jpg" && imgStr !== "jpeg" && imgStr !== "png") {
        this.$message({
          type: "warning",
          message: "请输入正确的图片地址"
        });
        return false;
      }
      this.form.images.push({
        img_path: this.picturePasteInput
      });
    },

    // 全选国家
    handleCheckAllChange(item) {
      item.shipping_location.forEach(location => {
        location.select = !location.select;
      });
    },
    // 国外全球选择
    foreignGlobalChange(item, e) {
      item.global = e;
      if (item.global) {
        item.shipping_location.forEach(c => {
          this.$set(c, "select", false);
        });
      }
    },
    // 选择国家
    handleCheckedCitiesChange(transport, location, e) {},
    //锚链接
    returnTop(dom, index) {
      this.$el.querySelector(dom).scrollIntoView({
        behavior: "smooth"
      });
      this.active = index;
    },

    setData(dataTransfer) {
      dataTransfer.setData("Text", "");
    }
  }
};
</script>


<style  lang="scss" scoped>
.edit-selection {
  scroll-padding-top: 1004px;
  .el-upload-dragger {
    width: 98px;
    height: 98px;
  }
}
.demo-form-inline {
  width: 85%;
}
.demo-form-inline h3 {
  // margin-bottom: 20px;
}
.comment {
  color: rgb(188, 188, 188);
}
.comment-title {
  margin-left: 35px;
}
.card {
  width: 100%;
  background-color: #f9f9f9;
}

.attr-num {
  display: inline-block;
  margin-right: 5px;
}
.attr-item,
.add-attr {
  margin: 10px 15px;
}
.template-editing,
.HTML-template {
  width: 100%;
  color: rgb(148, 148, 148);
  min-height: 400px;
  position: relative;
}

.template-editing h1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.item-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #eee;
  margin-bottom: 20px;
  // border-bottom: 1px solid #ddd;
  padding: 10px;
  .el-form-item {
    margin-bottom: 0px;
  }
}
.refund {
  margin: 10px 0;
}
.foreign-transportation {
  margin: 10px 0;
}
.mode-of-transport {
  width: 100%;
  height: 100%;
  margin: 10px 0;
  background-color: #f9f9f9;
}
.processing-time {
  margin-right: 8px;
}
.comment {
  color: rgb(176, 176, 176);
}

.focus {
  color: #ffffff;
  background-color: rgb(64, 154, 154);
  padding: 0 3px;
  margin: 0 8px;
  text-align: center;
}
.attr-variant {
  display: inline-block;
  margin-right: 20px;
}
.attr-item .el-icon-circle-plus {
  font-size: 18px;
  color: #409eff;
  cursor: pointer;
}
.attr-variant i {
  font-size: 18px;
  color: #f56c6c;
  cursor: pointer;
}
.variant-picture-notes {
  font-size: 12px;
  color: #909399;
}
.img-form-item .el-form-item__content {
  width: 100%;
  margin-left: 80px;
}
.dragArea {
  float: left;
}
.img-list .dragArea li {
  width: 100px;
  height: 100px;
}

.img-list li div .el-upload--picture-card {
  width: 100px;
  height: 100px;
  line-height: 100px;
}

/* 导航栏的样式 */
.navs {
  position: fixed;
  top: 50%;
  right: -165px;
  transform: translate(-50%, -50%);
  width: 200px;
  color: #bdc3c7;
  border-left: 1px solid rgb(232, 234, 236);
}
.navs li {
  height: 35px;
  line-height: 35px;
  padding: 0 20px;
  line-height: 1.6;
  font-size: 16px;
  cursor: pointer;
  position: relative;
  width: 100%;
  white-space: nowrap;
  /* // overflow: hidden; */
  text-overflow: ellipsis;
}
.navs li.active {
  color: rgb(64, 158, 255);
  transition: all 1s ease;
}
.navs li.active::before {
  content: "";
  display: block;
  background: url("~@/icons/anchor.png") no-repeat; /*兼容没测 */
  width: 16px;
  height: 16px;
  position: absolute;
  top: 5px;
  left: -8.5px;
  font-size: 16px;
  color: rgb(64, 158, 255);
  transition: all 2s ease;
}
.btn-group {
  width: 100%;
  margin: auto;
  text-align: center;
}
.no-border-btn-group {
  border: none !important;
  // position: fixed;
  // bottom: 20px;
  // right: 0px;
  background: rgba(255, 255, 255, 0.3);
  // margin-top: 30px;
}
.btn-group .el-button {
  margin: 0 50px;
}
</style>
<style lang="scss">
.edit-selection {
  .el-upload--picture-card {
    width: 98px;
    height: 98px;
    line-height: 98px;
  }
  .el-icon-delete {
    cursor: pointer;
  }
  .disabled-delete {
    cursor: not-allowed;
  }
  .variant-attr {
    & > div {
      display: flex;
      align-items: center;
      & > span {
        min-width: 100px;
      }
      & > div {
        display: flex;
        flex-wrap: wrap;
        & > div {
          display: flex;
          align-items: center;
        }
        // flex-wrap: wrap;
      }
      .overflow-scroll {
        // height: 300px;
        // overflow-y: scroll;
      }
    }
  }
}
.product_name {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  .el-icon-arrow-right {
    font-size: 16px;
  }
}
.categoryChooseOutDiv {
  width: 100%;
  height: 330px;
  overflow: hidden;
  overflow-x: auto;
  font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  .categoryChooseMiddleDiv {
    width: auto;
    display: flex;
    // flex-wrap: wrap;
    .categoryChooseInDiv {
      margin-right: 14px;
      border: 1px solid #ddd;
      height: 308px;
      overflow-y: auto;
      border-radius: 4px;
      width: 245px;
      .categoryList {
        .categoryDiv {
          width: 100%;
          cursor: pointer;
          height: 24px;
          line-height: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #434649;
          margin-bottom: 3px;
          .categoryNames {
            display: inline-block;
            width: 200px;
            overflow: hidden;
            padding-left: 10px;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .el-icon-arrow-right {
            font-weight: bold;
          }
        }
        .active {
          background-color: rgba(254, 219, 207, 0.5);
          color: #333;
        }
        .categoryDiv:hover {
          background-color: rgba(254, 219, 207, 0.3);
        }
      }
    }
  }
  .overflowx-sxroll {
    overflow-x: scroll;
    // width: ;
  }
}
.edit-selection {
  .el-form {
    & > div {
      border: 1px solid #ddd;
      margin-bottom: 20px;
      border-radius: 4px;
      h3 {
        background-color: #eee;
      }
    }
  }
  .no-select-group {
    .el-form-item {
      margin-bottom: 0px;
      .product_name {
        span {
          font-size: 13px;
          color: #933;
          font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
        }
        .el-icon-arrow-right {
          font-size: 13px;
        }
      }
    }
    .no-select-pro {
      color: red;
    }
  }
  .set-margin-bottom {
    .el-form-item {
      margin-bottom: 0px;
    }
  }
}
.el-dialog__header {
  border-bottom: 1px solid #e5e5e5;
  padding: 18px;
  background: #eee;
  & > span {
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }
}
.disflex-transport {
  .el-card__body {
    display: flex;
    flex-direction: column;
    & > div {
      display: flex;
      flex-direction: column;
    }
    .checkbox-content {
      max-width: 750px;
    }
  }
}
.clear-margin-bottom {
  display: flex;
  align-items: center;
  .el-form-item {
    margin-bottom: 0px;
  }
}
.table_content {
  .el-table__header {
    width: 100%;
  }
}
.el-input-group__append {
  padding: 0 5px;
}
.product_attr {
  display: flex;
  margin-bottom: 8px;
  // margin-left: 115px;
  // margin-bottom: 15px;
  // background-color: #f9f9f9;
  // width: 600px;
  & > span {
    margin-right: 20px;
    min-width: 150px;
    & > div {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      span {
        margin-right: 5px;
      }
    }
  }
}
.margin-bottom-form {
  height: 25px;
}
</style>