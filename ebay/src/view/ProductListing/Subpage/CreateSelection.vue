<template>
  <div class="edit-selection">
    <el-form :inline="true" :model="form" ref="form" :rules="rules" class="demo-form-inline" label-width="135px">
      <div>
        <div class="item-title">
          <h3 id="content-0">基础信息</h3>
        </div>
        <div>
          <el-form-item label="SPU：" >
            <el-input v-model="form.spu" placeholder="" style="width: 217px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="loadSpu">加载spu信息</el-button>
          </el-form-item>
          <div>
            <el-form-item label="Item ID：" >
            <el-input v-model="form.itemId" placeholder="" style="width: 217px"></el-input>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" size="mini" @click="loadItemId">加载信息</el-button>
          </el-form-item>
          </div>
          <el-form-item label="店铺：" style="width:100%" prop="shop" >
            <el-select v-model="form.shop"  @change="clearTemp"  placeholder="请选择店铺">
              <el-option
                v-for="item in shopList"
                :key="item.shop_id"
                :label="item.shop_name"
                :value="item.shop_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="站点：" style="width:100%" prop="site" >
            <el-select v-model="form.site"  placeholder="请选择站点">
              <el-option
                v-for="item in siteData"
                :key="item.site_id"
                :label="item.site"
                :value="item.site_id"
              ></el-option>
            </el-select>
          </el-form-item>
          <div class="item-group set-margin-bottom">
            <el-form-item label="产品分类1：" prop="product1" >
              <el-select v-model="form.product1"   placeholder="请选择">
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
            <el-form-item>
              <el-input v-model="form.categoryOne" maxlength="15" placeholder="请输入分类ID" style="width: 217px" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
              <el-button type="primary" size="mini" @click="confiromCategory('1')">确定</el-button>
            </el-form-item>
          </div>
          <div class="item-group no-select-group">
            <el-form-item label="  " >
              <!-- <span class="no-select-pro" v-if="!form.product1">未选择类目</span>   -->
              <div class="product_name" v-if="form.product1">
                <span v-for="(item, index) in saveProductNameList1[form.product1]" :key="index">
                  {{item}}
                  <i class="el-icon-arrow-right" v-if="index !== saveProductNameList1[form.product1].length -1"></i>
                  </span>
              </div>
            </el-form-item>
          </div>
          <div class="item-group set-margin-bottom">
            <el-form-item label="产品分类2：" >
              <el-select v-model="form.product2" clearable  placeholder="请选择">
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
            </el-form-item>
            <el-form-item>
                <el-input v-model="form.categoryTwo" maxlength="15" placeholder="请输入分类ID" style="width: 217px" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                <el-button type="primary" size="mini" @click="confiromCategory('2')">确定</el-button>
            </el-form-item>
            <el-form-item>
              <span class="comment">
                <svg-icon style="font-size:20px;" icon-class="USdollar" />该字段填写并刊登后需要收取一定费用，请谨慎填写
              </span>
            </el-form-item>
          </div>
          <div class="item-group no-select-group">
            <el-form-item label="  " >
              <!-- <span class="no-select-pro" v-if="!form.product2">未选择类目</span>   -->
              <div class="product_name" v-if="form.product2">
                <span v-for="(item, index) in saveProductNameList2[form.product2]" :key="index">
                  {{item}}
                  <i class="el-icon-arrow-right" v-if="index !== saveProductNameList2[form.product2].length -1"></i>
                  </span>
              </div>
            </el-form-item>
          </div>
          <div class="item-group set-margin-bottom">
            <el-form-item label="店铺分类1：" prop="shop1" >
              <el-select v-model="form.shop1"  placeholder="请选择">
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
            <el-form-item label="  " >
              <!-- <span class="no-select-pro" v-if="!form.product2">未选择类目</span>   -->
              <div class="product_name" v-if="form.shop1">
                <span v-for="(item, index) in saveShop1Name[form.shop1]" :key="index">
                  {{item}}
                  <i class="el-icon-arrow-right" v-if="index !== saveShop1Name[form.shop1].length -1"></i>
                  </span>
              </div>
            </el-form-item>
          </div>
          <div class="item-group set-margin-bottom">
            <el-form-item label="店铺分类2：">
              <el-select v-model="form.shop2"  placeholder="请选择">
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
            <el-form-item label="  " >
              <!-- <span class="no-select-pro" v-if="!form.product2">未选择类目</span>   -->
              <div class="product_name" v-if="form.shop2">
                <span v-for="(item, index) in saveShop2Name[form.shop2]" :key="index">
                  {{item}}
                  <i class="el-icon-arrow-right" v-if="index !== saveShop2Name[form.shop2].length -1"></i>
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
            <el-form-item label="售卖形式：" prop="salesMethod" >
              <el-radio-group v-model="form.salesMethod">
                <el-radio :label="0" @change="salesChanges(0)">拍卖</el-radio>
                <el-radio :label="1" @change="salesChanges(1)">固价</el-radio>
                <el-radio :label="2" @change="salesChanges(2)" v-if="allowMultiattr">多属性</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <!-- <div>
            <el-form-item label="是否开启议价：" v-if="form.salesMethod === 1">
              <el-radio-group v-model="form.openBargaining">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </div> -->
          <div class="no-select-group">
            <ebay-span-prompt />
          </div>
          <div>
            <el-form-item label="产品标题：" style="width:650px;margin-right: 60px" class="product_title_clearbg"  prop="productTitle">
              <el-input
                v-model="form.productTitle"
                maxlength="150"
                show-word-limit
                placeholder="请输入产品标题"
                style="width:300%"
                resize="none"
                @blur="changeProductTitle"
                :autosize="{ minRows: 4 }"
                type="textarea"
              ></el-input>
            </el-form-item>
            <to-upper-case-component @toUpper="toUpper" />
          </div>
          <div>
            <el-form-item label="子标题："  style="width:660px" >
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
              <svg-icon style="font-size:20px;marign-left:30px" icon-class="USdollar" />该字段填写并刊登后需要收取一定费用，请谨慎填写
            </el-form-item>
          </div>
          <el-form-item label="图片："  style="width:100%" class="img-form-item">
            <div class="drag">
              <ul class="el-upload-list el-upload-list--picture-card img-list">
                <draggable v-model="form.images" class="dragArea">
                  <li
                    :tabindex="index"
                    class="el-upload-list__item is-success animated"
                    v-for="(src, index) in form.images"
                    :key="index"
                  >
                    <img :src="src" alt class="el-upload-list__item-thumbnail" />
                    <label class="el-upload-list__item-status-label">
                      <i class="el-icon-upload-success el-icon-check"></i>
                    </label>
                    <i class="el-icon-close"></i>
                    <span class="el-upload-list__item-actions">
                      <span class="el-upload-list__item-preview">
                        <i class="el-icon-zoom-in" @click="handlePictureCardPreview(src)"></i>
                      </span>
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
                    :data="parmas"
                    :headers="headers"
                    :show-file-list="false"
                    :on-success="onSuccess"
                    :on-error="uploadError"
                    :before-upload="beforeUpload"
                  >
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </li>
              </ul>
            </div>
            <div v-if="showDownloadButton">
              <el-button
              type="primary"
              @click="downloadImages(form.spu)"
            >一键下载</el-button>     
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
          <el-form-item label="UPC编码：" >
            <el-input v-model="upcCode" placeholder="does not apply" style="width: 217px" disabled></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" size="mini" @click="generateUPC">生成UPC</el-button>
          </el-form-item>
          <el-form-item>
              <el-button type="warning" size="mini" @click=" upcCode = ''">默认</el-button>
          </el-form-item>
        </div>
        <div v-if="form.salesMethod !== 2">
          <el-form-item label="刊登SKU：" prop="published_sku">
            <el-input v-model="form.published_sku" placeholder="" style="width: 217px" ></el-input>
          </el-form-item>
          
        </div>
        <div>
          <div></div>
          <el-form-item label="产品属性：" >
            <!-- <el-input v-model="form.upc" placeholder="" style="width: 217px" disabled></el-input> -->
          </el-form-item>
        </div>
        <div>
          <div>
            <form-list :formList="formList" />
            <!-- <div class="margin-bottom-form" v-if="formList"></div>      -->
            <!-- <form-list :formList="formList2" /> -->
          </div>
          <div>
            <!-- <el-form-item label="自定义属性："> -->
              <el-card class="card" shadow="always" style="width:600px;margin-left: 135px;" v-if="form.customizeAttr.length">
                <div class="attr-item" v-for="(attr, index) in form.customizeAttr" :key="attr.id">
                  <span class="attr-num">{{index + 1}}</span>
                  <el-form-item>
                    <el-input v-model="attr.name" placeholder="属性名-例如Color"></el-input>
                  </el-form-item>
                  <span>：</span>
                  <el-form-item>
                    <el-input v-model="attr.value" placeholder="属性值-例如Red"></el-input>
                  </el-form-item>
                  <i class="el-icon-delete" @click="deleteAttr(index)" ></i>
                </div>
                <!-- <el-button type="primary" class="add-attr" @click="addAttr" size="mini">添加定义属性</el-button> -->
              </el-card>
            <!-- </el-form-item> -->
            <el-form-item label="自定义属性：">
              <el-button type="primary"  @click="addAttr" size="mini" :disabled="form.customizeAttr.length === 10">添加自定义属性</el-button>
            </el-form-item>
          </div>
          <div v-if="showVariant">
            <!-- 变种显示 -->
            <div>
              <el-form-item label="变种属性：">
                <el-button type="primary" @click="addVariantAttributes" size="mini">添加变种属性</el-button>
                <div class="attr-item variant-attr" v-for="(attr, index) in form.variantAttributeData" :key="index">
                  <div>
                      <i class="el-icon-circle-plus" @click="addSingleAttr(attr)"></i>
                      <!-- <span class="attr-num">{{attr.name}}：</span> -->
                      <el-form-item>
                        <el-input v-model.trim="attr.name" maxlength="50" style="width: 100px" placeholder size="small" @focus="focusFatherValue(attr.name)"   @blur="blurAttrFather(attr, attr.name, index)"></el-input>
                      </el-form-item>
                  <div :class="{'overflow-scroll': attr.valueList.length > 18}">
                    <div v-for="(valList, index) in attr.valueList" :key="index" >
                      <el-form-item>
                        <el-input v-model.trim="valList.val" placeholder size="small" @focus="focusValue(valList.val)" @blur="blurAttr(valList,valList.val, attr, attr.valueList, attr.name)"></el-input>
                      </el-form-item>
                      <span class="attr-variant">
                        <i class="el-icon-remove" @click="removeSingleAttr(valList.val, attr, attr.valueList, attr.name, index)"></i>
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
                    <el-select  v-model="form.attributesSelect" @change="changeVariantVal"  placeholder="请选择产品属性">
                      <el-option
                        v-for="(item, index) in form.variantAttributeData"
                        :key="index"
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
                            <span class="el-upload-list__item-preview">
                              <i class="el-icon-zoom-in" @click="handlePictureCardPreview(element.url)"></i>
                            </span>
                            <span class="el-upload-list__item-delete">
                              <i class="el-icon-delete" @click="productInfoRemoveUploadList(item.imagesList, index)"></i>
                            </span>
                          </span>
                        </li>
                      </draggable>
                      <li>
                        <div style="display: flex;flex-warp: warp;width: 230px">
                          <el-upload
                          v-show="item.imagesList.length != 12"
                          :action="uploadImageUrl"
                          list-type="picture-card"
                          multiple
                          :data="parmas"
                          :headers="headers"
                          :show-file-list="false"
                          style="margin-right: 20px"
                          :on-success="(response, file, fileList) => uplaodSuccessAttr(response, file, fileList, item)"
                          :before-upload="(file) => beforeUplaodAttr(file, item)"
                        >
                          <i class="el-icon-upload"></i>
                        </el-upload>
                        <div class="edit-selection-add-img" @click="showAddImagesModal(item)" v-if="showDownloadButton && item.imagesList.length != 12">
                          <i class="el-icon-plus"></i>
                        </div>
                        </div>
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
                  <el-table-column prop="sku" label="刊登SKU" align="center">
                    <template slot-scope="{$index, row}">
                        <el-input  v-model="row.sku">
                        </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :prop="item" :label="item" align="center" v-for="(item, i) in tableHeadList" :key="i"></el-table-column>
                  <el-table-column prop="attr_price" label="价格" align="center">
                    <template slot-scope="{$index, row}">
                      <el-input size="mini" v-model="row.attr_price" oninput="value=value.replace(/[^0-9.]/g,'')">
                        <template slot="append" style="width:30px">{{getCurrency()}}</template>
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="quantity" label="库存量" align="center">
                    <template slot-scope="{$index, row}">
                      <el-input size="mini" v-model.number="row.quantity" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="barcode" label="MPN/EAN/UPC" align="center">
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
              <el-radio label="HTML">HTML</el-radio>
              <el-radio label="template" >使用描述模板</el-radio>
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
          <div class="template-editing" v-if="form.descriptionType === 'template' && !form.chooseTemplate">
            <h1>请选择描述模板</h1>
          </div>
          <div v-if="form.descriptionType === 'template' && form.chooseTemplate">
            <component 
            :is="componentsName" 
            :showMainFigureBUtton="showMainFigureBUtton" 
            :showMainTitleButton="showMainTitleButton"  
            :templateId="form.chooseTemplate" 
            :showTemplateBtn="false" 
            :desc_tpl_id="desc_tpl_id" 
            :shopId="form.shop" 
            ref="AttrTemplate">
            </component>
          </div>
          <div class="HTML-template" v-if="form.descriptionType === 'HTML'">
            <div class="button_display">
              <div></div>
              <el-button type="primary" @click="insertImage">一键插图</el-button>
            </div>
            <tinymce v-model="form.richTextContent"  :height="300" ref="content" :id="content" @input="input"/>
          </div>
        </div>
      </div>
      <div>    
        <div class="item-title">
          <h3 id="content-4">价格信息({{infoTitle}})</h3>
        </div>
        <div>
          <div>
            <el-form-item label="私人拍卖：" >
              <el-checkbox v-model="form.private_listing" @change="privateAuctionsChanges()">不向公众显示买家名称</el-checkbox>
            </el-form-item>
          </div>
          <el-form-item label="刊登天数："  prop="listing_duration">
            <el-select v-model="form.listing_duration"   placeholder="请选择刊登天数" :disabled="form.salesMethod === 1 || form.salesMethod === 2 ">
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
              <el-col>
                  <el-input v-model="form.pm_start_price" oninput="value=value.replace(/[^0-9.]/g,'')" >
                    <template slot="append" style="width:30px">{{getCurrency()}}</template>
                  </el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="保留价：" label-width="80px">
              <el-col>
                <!-- <el-form-item > -->
                  <el-input v-model="form.pm_reserve_price" oninput="value=value.replace(/[^0-9.]/g,'')">
                    <template slot="append" style="width:30px">{{getCurrency()}}</template>
                  </el-input>
                <!-- </el-form-item> -->
              </el-col>
            </el-form-item>
            <el-form-item label="一口价：" label-width="80px">
              <el-col>
                <!-- <el-form-item> -->
                  <el-input v-model="form.pm_buy_it_now_price" oninput="value=value.replace(/[^0-9.]/g,'')">
                    <template slot="append" style="width:30px">{{getCurrency()}}</template>
                  </el-input>
                <!-- </el-form-item> -->
              </el-col>
            </el-form-item>
            <el-form-item>
              <span class="comment">
                <svg-icon style="font-size:20px;" icon-class="USdollar" />该字段填写并刊登后需要收取一定费用，请谨慎填写
              </span>
            </el-form-item>
          </div>
          <div v-if="showFixedPrice">
            <el-form-item label="价格："  prop="fixedPrice">
              <el-col :span="16">
                <!-- <el-form-item> -->
                  <el-input v-model="form.fixedPrice" oninput="value=value.replace(/[^0-9.]/g,'')">
                    <template slot="append" style="width:30px">{{getCurrency()}}</template>
                  </el-input>
                <!-- </el-form-item> -->
              </el-col>
            </el-form-item>
          </div>
          <div v-if="showQuantityInStock">
            <el-form-item label="库存数量："  prop="gj_quantity">
              <el-input v-model.number="form.gj_quantity" maxlength="5" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
            </el-form-item>
          </div>
          <div v-if="showBargain">
            <el-form-item label="接受买家还价：" >
              <el-radio-group v-model="form.gj_best_offer">
                <el-radio :label="1" @change="wholesaleChanges(1)">开启</el-radio>
                <el-radio :label="0" @change="wholesaleChanges(0)">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-checkbox v-model="form.gj_best_offer_auto_accept" style="margin: 9px 0 0 15px;" v-if="form.gj_best_offer === 1"></el-checkbox>
            <el-form-item label=" 自动接受大于：" label-width="125px" v-if="form.gj_best_offer === 1">
               <el-input v-model="form.gj_best_offer_auto_accept_price" style="width: 150px" oninput="value=value.replace(/[^0-9.]/g,'')">
                    <template slot="append" style="width:30px">{{getCurrency()}}</template>
                </el-input>
            </el-form-item>
            <el-checkbox v-model="form.gj_best_offer_auto_decline" style="margin: 9px 0 0 15px;" v-if="form.gj_best_offer === 1"></el-checkbox>
            <el-form-item label="自动拒绝小于：" label-width="125px" v-if="form.gj_best_offer === 1">
               <el-input v-model="form.gj_minP_best_offer_price" style="width: 150px" oninput="value=value.replace(/[^0-9.]/g,'')">
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
              <el-input v-model.number="form.pm_lot_size" oninput="value=value.replace(/[^\d]/g,'')" maxlength="5"></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
      <div>
        <div class="item-title">
          <h3 id="content-5">付款信息</h3>
          <el-form-item label="选择付款模板：" prop="paymentTemplate" label-width="130px">
            <el-select v-model="form.paymentTemplate"   placeholder="请选择付款模板">
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
          <el-input v-model="form.pay_pal_email" placeholder maxlength="30" disabled></el-input>
        </el-form-item>
        <el-form-item label="付款说明：" style="width:100%">
          <el-input 
          type="textarea" 
          placeholder 
          v-model="form.payment_instructions" 
          resize="none"
          :autosize="{ minRows: 4 }" 
          maxlength="500"
          show-word-limit
          style="width:300%">
          </el-input>
        </el-form-item>
      </div>
      <div>
        <div class="item-title">
          <h3 id="content-6">退款政策</h3>
          <el-form-item label="选择退款模板：" prop="refundTemplate" label-width="130px">
            <el-select v-model="form.refundTemplate"  placeholder="请选择退款模板">
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
          <el-form-item label=" " prop="returns_accepted" label-width="0px">
            <el-checkbox v-model="form.returns_accepted">接受国内退款</el-checkbox>
          </el-form-item>
          <el-row v-if="form.returns_accepted" class="margin-l20">
            <el-col :span="7">
              <div class="grid-content margin-tb20">
                <el-form-item label="退货天数：" prop="returns_with_in" >
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
          <!-- <el-checkbox v-model="internation_returns_accepted" @change="foreignChange">接受国外退款</el-checkbox> -->
          <el-form-item label=" " prop="internation_returns_accepted" label-width="0px">
            <el-checkbox v-model="form.internation_returns_accepted">接受国外退款</el-checkbox>
          </el-form-item>
          <el-row v-if="form.internation_returns_accepted" class="margin-l20">
            <el-col :span="7">
              <div class="grid-content margin-tb20">
                <el-form-item label="退货天数：" prop="internation_returns_with_in" >
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
                <el-form-item label="退货运费承担方：" prop="internation_shipping_cost_paid_by" label-width="130px">
                  <el-select v-model="form.internation_shipping_cost_paid_by" placeholder="请选择退货运费承担方">
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
          <el-form-item label="退款说明：" style="width:100%" v-if="showReturnDescription">
          <el-input 
          type="textarea" 
          placeholder 
          maxlength="5000"
          show-word-limit
          v-model="form.return_description" 
          resize="none"
          :autosize="{ minRows: 4 }" 
          style="width:300%">
          </el-input>
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
        <el-form-item label="物品所在地：" prop="location" >
          <el-input placeholder v-model.trim="form.location"></el-input>
        </el-form-item>
        <el-form-item label="国家或区域：" label-width="150px" prop="country" >
          <el-select v-model="form.country"  placeholder="请选择国家或区域" filterable>
            <el-option v-for="item in shippingCountries" :key="item.id" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮编：" >
          <el-input placeholder v-model="form.postal_code"></el-input>
        </el-form-item>
        <div class="transportation-policy">
          <div class="domestic-transport transport">
            <div class="title">国内运输：</div>
            <el-card class="mode-of-transport disflex-transport" shadow="hover" >
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
                <div v-for="(transport, index) in form.internalGroup" :key="index" >
                  <el-form-item
                  :label="`运输方式${index + 1}：`"
                  :label-width="formLabelWidth"
                  :prop="`internalGroup.${index}.shipping_type`"
                   :rules="rules.shipping_type"
                >
                  <el-select
                    class="processing-time"
                    v-model="transport.shipping_type"
                    filterable
                    placeholder="请选择"
                    style="width: 300px"
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
                        style="width: 100px;"
                        size="mini"
                        placeholder="0.00"
                      >
                      <template slot="append" style="width:30px">{{getCurrency()}}</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="每件附加费用：" label-width="110px" prop="freeShipping">
                      <el-input
                        v-model="transport.add_shipping_cost"
                        style="width: 100px;"
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
                <div v-for="(transport,index) in form.internationalGroup"
                  :key="index">
                  <el-form-item
                  :label="`运输方式${index + 1}：`"
                   :prop="`internationalGroup.${index}.shipping_type`"
                   :rules="rules.shipping_type"
                >
                  <el-select
                    class="processing-time"
                    v-model="transport.shipping_type"
                    placeholder="请选择"
                    filterable
                    style="width: 300px"
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
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="form.ddl_exclusion_list_type === 2 ">
              <el-button type="text" @click="addRestrictedArea">添加不运送地区</el-button>
            </el-form-item>
            <p style="margin-left: 115px;color: #933;word-break: break-all" v-if="form.ddl_exclusion_list_type === 2 ">
              {{form.unavailable_shipping_location}}
            </p>
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
                  <el-checkbox v-model="form.ship_to_registration_country" :disabled="form.ddl_exclusion_list_type === 0 ">主要运送地址在我的运送范围之外</el-checkbox>
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
          <el-form-item
            label="发布时间："
            v-if="is_plan_release"
            style="width:100%"
          >
            <el-date-picker v-model="form.plan_update" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
        </div>
      </div>
      <el-form-item class="btn-group no-border-btn-group">
        <el-button type="primary" @click="submitForm('form')">发布</el-button>
        <el-button type="primary" @click="releasePending('form')">保存待发布</el-button>
        <el-button type="primary" @click="TestCost('form')">费用检测</el-button>
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
        <el-input v-model="defineAttr"  placeholder="请输入" maxlength="50"></el-input>
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
      <div class="search-input">
        <div>
          <el-input clearable style="width:70%" placeholder="搜索分类名称,回车即可搜索" v-model="searchWord" @keyup.enter.native="doSearch"></el-input>
          <el-button class="btn_button_primary" @click="doSearch">搜索</el-button>
        </div>
        <div>
          <ul :class="{'overflow-scroll-y': list.length >= 10 }">
            <li v-for="(item, index) in list" :key="index" @click="selectLi(item)">
              <span v-for="(ele, i) in item.path" :key="i">
                {{ ele }}
                <i class="el-icon-arrow-right" v-if="i !== item.path.length -1"></i>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div v-show="list.length === 0">
        <div class="product_name">
          <span v-for="(item, index) in saveProductName" :key="index">
            {{item}}
            <i class="el-icon-arrow-right" v-if="index !== saveProductName.length -1"></i>
            </span>
        </div>
        <div class="modal_content_product">
          <div class="categoryChooseOutDiv">
              <div class="categoryChooseMiddleDiv" :class="{'overflowx-sxroll': categoryLevelList.length > 3}">
                  <div class="pull-left categoryChooseInDiv" v-for="(item, levelIndex) in categoryLevelList" :key="levelIndex">
                    <div class="categoryList">
                        <div class="categoryDiv" v-for="(ele, i) in item" :key="i" @click="showChildren(ele,levelIndex,i)" :class="savedActiveIndex[levelIndex] === i ? 'active' : ''">
                          <span class="categoryNames">{{ele.category_name}}</span>
                          <i class="el-icon-arrow-right" v-if="ele.has_son"></i>
                        </div>
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
    <el-dialog
      title="费用检测"
      :visible.sync="modal_test_cost"
      width="70%"
      :before-close="cancel_test_cost"
      :close-on-click-modal="false"
      class="modal_test_cost"
      >
      <table-list :status="status" :feeResults="feeResults" :Warnings="Warnings" :Errors="Errors" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel_test_cost">确认</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="选择变种图片"
      :visible.sync="modal_add_img"
      width="70%"
      :before-close="cancelAddImages"
      :close-on-click-modal="false"
      class="modal_test_cost"
      >
      <select-images :imgsList="selectImagesList" ref="selectImages"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="confirmAddImages">确认</el-button>
        <el-button @click="cancelAddImages">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import sortable from "sortablejs";
import SeleCategoryPopup from "../components/SeleCategoryPopup.vue";
import DescriptionTemplate from '../components/DescriptionTemplate'
import FormList from '../components/formList'
import Tinymce from "@/components/Tinymce";
import RestrictedAreaPopup from '@/view/BasicConfig/components/tabs/components/RestrictedAreaPopup'
import { dateFormat, textFormat, debounce, requiredWord, gj_quantityValidator, _quantityValidator, download, firstToUpper } from '@/utils/common'
import { getMutiData, deleteTableContent, deleteObjArrayItem } from '@/utils/getMutiData'
import { setCreateListingSku,  getCreateListingSku} from '@/utils/auth'
import toUpperCaseComponent from '@/components/toUpperCase'
import SelectImages from '../components/selectImages'
import EbaySpanPrompt from '../components/ebaySpan'
import { 
  getPeoduct1,
  getShopClassList, 
  getProductSpecifications,
  getListingConfig,
  getUnvailableLocation,
  getSpuInfo,
  getSkuCode,
  InfringementOfWord,
  getItemInfo,
  getImagePath,
  downloadImagesApi,
  searchCatagoryList
  } from '@/api/listing'
import { getEbayCate } from '@/api/categoryClass'
let reg = /^[1-9]\d*$/
import { Loading } from "element-ui";
import { mapState } from 'vuex'
export default {
  name: "CreateSelection",
  components: {
    draggable,
    RestrictedAreaPopup,
    SeleCategoryPopup,
    DescriptionTemplate,
    toUpperCaseComponent,
    sortable,
    Tinymce,
    FormList,
    EbaySpanPrompt,
    SelectImages,
    AttrTemplate: () => import ('@/view/BasicConfig/Subpage/AttrTemplate'),
    TableList: () => import ('../components/tableList')
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
        restrictBuyerCreditNumData: state => state.listing.restrictBuyerCreditNumData,
        imageAdData: state => state.listing.imageAdData,
        creditRatingNumData: state => state.listing.creditRatingNumData,
        policyViolation: state => state.listing.policyViolation,
        policyViolationDays: state => state.listing.policyViolationDays,
        modules: state => state.listing.modules,
        discardBidData: state => state.listing.discardBidData,
        discardDaysData: state => state.listing.discardDaysData,
        allowMultiattr: state => state.listing.allowMultiattr,
        // upcCode: state => state.listing.upcCode,
        listing_durationList: state => state.listing.listing_durationList,
        templateList: state => state.listing.templateList,
        skuIdList: state => state.listing.skuIdList,
        paypal_accounts: state => state.listing.paypal_accounts,
        checkProductTitle: state => state.listing.checkProductTitle,
        checkeditContent: state => state.listing.checkeditContent,
        status: state => state.listing.status,
        Warnings: state => state.listing.Warnings,
        Errors: state => state.listing.Errors,
        feeResults: state => state.listing.feeResults,
        showMainFigureBUtton: state => state.listing.showMainFigureBUtton,
        showMainTitleButton: state => state.listing.showMainTitleButton
        // imagePath: state => state.listing.imagePath
    }),
    showAreaDialog: {
        get() {
          return this.$store.state.listing.showAreaDialog
        },
        set(val) {
          this.$store.state.listing.showAreaDialog = val
        }
    },
    upcCode: {
      get() {
        return this.$store.state.listing.upcCode
      },
      set(val) {
        this.$store.state.listing.upcCode = val
      }
    },
    modal_test_cost: {
      get() {
        return this.$store.state.listing.modal_test_cost
      },
      set(val) {
        this.$store.state.listing.modal_test_cost = val
      }
    }
  },
  watch: {
        'form.product1': {
            handler(val) {
                if (val) {
                  this.getProductSpecifications()
                  if (String(this.form.site) && this.form.shop) {
                    this.getAllowMultiattr()
                  }
                } 
            }
        },
        'form.product2': {
          handler(val) {
                  if (this.form.product1) {
                      this.getProductSpecifications()
                  }                           
                // if (val) {
                  if (String(this.form.site) && this.form.shop) {
                    this.getAllowMultiattr()
                  }
                // } 
          }
        },
        'allowMultiattr': {
          handler(val) {
            if (!val) {
              if (this.form.salesMethod === 2) {
                this.form.salesMethod = 0
                this.salesChanges(0)
              }
            }
          }
        },
        'form.shop': {
          handler(val) {
                if (val) {
                    if (String(this.form.site)) {
                      if (this.form.product2 || this.form.product1) {
                        this.getAllowMultiattr()
                        this.getProductSpecifications()
                      }
                    }   
                    if (this.paypal_accounts.length) {
                      let paypal = this.paypal_accounts.filter(item => item.shop_id === val)[0]
                      this.form.pay_pal_email = paypal.paypal   
                    }      
                    this.$store.dispatch('listing/getTemplateList', { shop_id: val })
                    this.$set(this.parmas, 'shop_id', val)
                } 
          }
        },
        'form.ddl_exclusion_list_type': {
          handler(val) {
            if (val === 0) {
              this.form.ship_to_registration_country = false
            }
          }
        },
        'form.site': {
          handler(val) {
                if (String(val)) {
                  let query = { site_id: val }
                  this.$store.dispatch('listing/getAvailableLocation', query)
                  this.$store.dispatch('listing/getShippingType', query)
                  this.$store.dispatch('listing/getRefundPolicye', query)
                  this.$store.dispatch('listing/getShippingCountries', query)
                  this.$store.dispatch('listing/getshippingDispatchtime', query)
                  this.$store.dispatch('listing/getUnvailableLocation', query)
                  this.$store.dispatch('listing/getTaxLocation', query)
                  this.$store.dispatch('listing/getListingConfig', query)
                  this.getCurrency()
                    if (String(this.form.shop)) {
                      if (this.form.product2 || this.form.product1) { 
                        this.getAllowMultiattr()
                        this.getProductSpecifications()
                      }
                    }
                  let siteName = this.siteData.filter(item => item.site_id === val)[0].site
                  if (siteName === 'DE' || siteName === 'AT' || siteName === 'FR' || siteName === 'IT' || siteName === 'ES') {
                    this.showReturnDescription = true
                  } else {
                    this.showReturnDescription = false
                  }
                } 
          }
        },
        'form.refundTemplate': {
          handler(val) {
                if (String(val)) {
                    let obj = this.listingConfig.filter(item => item.tmp_id === val)[0]
                    this.form.returns_accepted = obj.returns_accepted ? true : false
                    this.form.internation_returns_accepted = obj.internation_returns_accepted ? true : false
                    this.form.return_description = obj.return_description
                    this.form.returns_with_in = obj.returns_with_in
                    this.form.shipping_cost_paid_by = obj.shipping_cost_paid_by
                    this.form.internation_returns_with_in = obj.internation_returns_with_in
                    this.form.internation_shipping_cost_paid_by = obj.internation_shipping_cost_paid_by
                 } 
          }
        },
        'form.transportTemplate': {
           handler(val) {
                if (String(val)) {
                    let obj = this.listingConfig.filter(item => item.tmp_id === val)[0]
                    this.form.dispatch_time_max = obj.dispatch_time_max
                    this.form.internalGroup = obj.domestic_shipping
                    this.unavailableShippingLocation = obj.unavailable_shipping_location
                    this.form.unavailable_shipping_location = obj.unavailable_shipping_location ? obj.unavailable_shipping_location.join('|') : ''
                    this.form.ddl_exclusion_list_type = obj.ddl_exclusion_list_type
                    obj.international_shipping.forEach(item => {
                      item.global = false
                      item.checkAll = false
                      if (typeof(item.shipping_location)=='string') { // 如果当前的类型为字符串，那么选择的就是全球
                        item.global = true
                        item.shipping_location =  _g.getJsonParse(this.availableLocation)
                      } else { // 不是则是数组类型，那么选的就是国家
                        item.checkAll = true
                        let availableLocation = _g.getJsonParse(this.availableLocation)
                        availableLocation.forEach(ele => {
                          item.shipping_location.forEach(location => {
                            let list = []
                            list.push(ele.value)
                            if (list.indexOf(location.value) != -1) {              
                              ele.select = true
                            }
                          })
                        })
                        item.shipping_location = availableLocation
                      }      
                    })
                    this.form.internationalGroup = obj.international_shipping
                    console.log(this.form.internationalGroup)
                    this.form.postal_code = obj.postal_code
                    this.form.country = obj.country
                    this.form.location = obj.location
                 } 
          }
        },
        'form.paymentTemplate': {
          handler(val) {
            if (String(val)) {
              let obj = this.listingConfig.filter(item => item.tmp_id === val)[0]
              console.log(obj)
              this.form.payment_instructions = obj.payment_instructions
            }
          }
        },
        'form.salesMethod': {
          handler(val) {
            this.changeListingduration(val)
          }
        },
        // 'form.productTitle': {
        //    handler(val) {
        //     this.changeProductTitle()
        //   }
        // },
        'form.otherTemplate': {
          handler(val) {
                if (String(val)) {
                    let obj = this.listingConfig.filter(item => item.tmp_id === val)[0]
                    this.form.disable_buyer_requirements = obj.disable_buyer_requirements
                    this.form.ship_to_registration_country = obj.ship_to_registration_country ? true : false
                    this.form.max_unpaid_count_checkbox = obj.max_unpaid_count_checkbox ? true : false
                    this.form.max_unpaid_count = obj.max_unpaid_count
                    this.form.max_unpaid_period = obj.max_unpaid_period
                    this.form.max_violations_count_checkbox = obj.max_violations_count_checkbox ? true : false
                    this.form.max_violations_count = obj.max_violations_count
                    this.form.max_violations_period = obj.max_violations_period
                    this.form.min_feedback_score_checkbox = obj.min_feedback_score_checkbox ? true : false
                    this.form.min_feedback_score = obj.min_feedback_score
                    this.form.require_item_count_checkbox = obj.require_item_count_checkbox ? true : false
                    this.form.require_item_count = obj.require_item_count
                    this.form.require_feedback_score_checkbox = obj.require_feedback_score_checkbox ? true : false
                    this.form.require_feedback_score = obj.require_feedback_score
                    this.form.sales_tax_state = obj.sales_tax_state
                    this.form.sales_tax_percent = obj.sales_tax_percent
                    this.form.shipping_included_in_tax = obj.shipping_included_in_tax ? true : false
                    this.form.gallery_type = obj.gallery_type
                 } 
          }
        }
  },
  data() {
    return {
      uploadImageUrl: `${process.env.VUE_APP_AUTH_API_DOMAIN}/listing/tool/image/upload`,
      templateId: '',
      list: [], /* 通过搜索获取的分类 */
      searchWord: '', /* 分类搜索关键词2 */
      imagePath: [],
      spuInfo: {},
      imageBaeUrl: 'https://file.ebay.nantang-tech.com',
      active: 0, // 当前激活的导航索引,
      product1: [],
      product2: [],
      modal_add_img: false,
      componentsName: 'AttrTemplate',
      shop1: [],
      shop2: [],
      cat_id_one: '',
      cat_id_one_name: '',
      recordFatherValue: '',
      productAndSku: [],
      thumbnail: '',
      item: {},
      headers: {
        Authorization: sessionStorage.getItem('token')
      },
      parmas: {
       
      },
      submitFlag: true,
      desc_tpl_id: 10000,
      selectImagesList: [],
      itemId: '',
      showReturnDescription: false,
      showDownloadButton: false,
      saveProductNameList1: {},
      saveProductNameList2: {},
      productAttrList: {},
      saveShop1Name: {},
      saveShop2Name: {},
      saveProduct1IdList: {},
      saveProduct2IdList: {},
      saveShop1IdList: {},
      saveShop2IdList: {},
      tableHeadList: [],
      productidList: [],
      formList: [], /* 动态表单列表 */
      formList2: [],
      modal_localtion: false,
      recordCurrent: {},
      productSkuList: [],
      sku: '',
      props: {
        lazy: true,
        lazyLoad: this.cascaderLazyload,
        value: 'category_id',
        label: 'category_name',
        dialogVisible: false,
        children: 'son'
      },
      recordValue: '', // 记录自定义属性进入input框的值
      flag: true,
      list: [],
      parentId: 0,
      modal_attr: false,
      search_product: '',
      modal_product: false,
      categoryLevelList: [],
      productIdList: [],
      uploadList: [],
      // options: [{
      //     category_id: 'zhinan',
      //     category_name: '指南',          
      //   },
      // ],
      defineAttr: '',
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
      infoTitle: '',
      content: 'content',
      jsonParseTable: [],
      // 对话框数据缓存区
      form: {
        spu: "",
        product1: '',
        site: 0,
        shop: '',
        product2: '',
        shop1: "",
        shop2: "",
        openBargaining: 0, /* 是否开启议价 */
        salesMethod: 0,
        productTitle: "", //产品标题
        subtitle: "", //子标题,
        upc: "",
        attributes: "", //产品属性,
        descriptionType: "HTML", //描述模板类型
        chooseTemplate: "", //描述模板选择
        attributesSelect: '',
        unavailable_shipping_location: '',
        return_description: '',
        internation_returns_accepted: true, //国外选择框
        returns_accepted: true,
        categoryOne: '',
        categoryTwo: '',
        published_sku: '',
        customizeAttr: [
          
        ],
        variantAttributeData: [
           
        ],
        variantPicture: [], //变种图片   主要控制
        private_listing: false, //私人拍卖单选框,
        listing_duration: 1, //刊登天数,
        pm_start_price: "", //起拍价     主要控制
        pm_reserve_price: "", //保留价      主要控制
        pm_buy_it_now_price: "", //一口价,         主要控制
        is_pm_lot_size: 0, // 批发状态,   主要控制
        pm_lot_size: "", //批发数量
        paymentTemplate: "", //选择付款模板,
        pay_pal_email: "", //payPal账号
        payment_instructions: "", //付款说明
        refundTemplate: "", //选择退款模板,
        gj_best_offer_auto_accept_price: "", //自动接收大于
        gj_minP_best_offer_price: "", //自动接收小于
        returns_with_in: 'Days_14', //国内退货天数
        shipping_cost_paid_by: 'Buyer', //国内退货运营承担方
        internation_returns_with_in: 'Days_14', //外内退货天数
        internation_shipping_cost_paid_by: 'Buyer', //国外退货运营承担方
        gj_best_offer_auto_accept: false, // 开启自动接受高报价
        gj_best_offer_auto_decline: false, // 开启自动拒绝低报价
        transportTemplate: "", //选择运输模板
        location: "", //物品所在地
        country: "", //国家或区域
        postal_code: "", //邮编
        dispatch_time_max: "",
        fixedPrice: "", //固价价格   主要控制
        gj_quantity: "", //库存数量   主要控制
        gj_best_offer: 0, //接收买家还价 主要控制
        //国内运输
        internalGroup: [
          {
            shipping_type: "", //运输方式
            free_shipping: false, //免运费
            shipping_cost: "", //运费
            add_shipping_cost: "", //附加费用
          }
        ],
        // 国际运输
        internationalGroup: [
        
        ],
        ddl_exclusion_list_type: 0, //不运送地区
        otherTemplate: "", //选择其他政策模板
        disable_buyer_requirements: 0,
        ship_to_registration_country: false, // 范围之外的复选框
        max_unpaid_count_checkbox: false, //弃标复选框
        max_unpaid_count: 2, //弃标个案
        max_unpaid_period: 'Days_30', //弃标天数
        max_violations_count_checkbox: false, //违反政策检举复选框
        max_violations_count: 4, //违反政策检举
        max_violations_period: 'Days_30', //违反政策检举天数
        min_feedback_score_checkbox: false, // 信誉等级复选框
        min_feedback_score: -1, // 信誉等级复选框
        require_item_count_checkbox: false, //10天内的自我设定复选框
        require_item_count: 1, //10天内的自我设定复选框
        require_feedback_score_checkbox: false, // 限制买家信誉等级复选框
        require_feedback_score: 0, //限制买家信誉等级选择器
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
        site: [ { required: true, message: "请选择站点名称", trigger: "change" } ],
        gj_quantity: [ 
          { required: true, message: '请输入库存数量', trigger: 'blur' },
          { validator: _quantityValidator, trigger: "blur" } ],
        pm_lot_size: [ 
          { required: true, message: '请输入批量数量', trigger: 'blur' },
          { validator: _quantityValidator, trigger: "blur" } 
        ],
        gj_best_offer_auto_accept_price: [ 
          { required: true, message: '请输入自动接受大于的价格', trigger: 'blur' },
          { validator: gj_quantityValidator, trigger: "blur" } ],
        gj_minP_best_offer_price: [ 
          { required: true, message: '请输入自动接受小于的价格', trigger: 'blur' },
          { validator: gj_quantityValidator, trigger: "blur" } ],
        pm_start_price: [
            { required: true, message: '请输入起拍价', trigger: 'blur' },
            { validator: gj_quantityValidator, trigger: "blur" } 
           ],
        pm_reserve_price: [ 
          { required: true, message: '请输入保留价', trigger: 'blur' },
          { validator: gj_quantityValidator, trigger: "blur" } ],
        pm_buy_it_now_price: [
          { required: true, message: '请输入一口价', trigger: 'blur' },
          { validator: gj_quantityValidator, trigger: "blur" }
          ],
        listing_duration: [
          { required: true, message: '请选择刊登天数', trigger: 'change' }
        ],
        shop: [{ required: true, message: "请选择店铺", trigger: "change" } ],
        product1: [ { required: true, message: "请选择产品分类", trigger: "change" } ],
        product2: [ { required: true, message: "请选择产品分类", trigger: "change" } ],
        productTitle: [{ required: true, message: "请填写产品标题", trigger: "blur" }],
        pay_pal_email: [ { required: true, message: "请填付款账号", trigger: "blur"  } ],
        fixedPrice: [ 
          { required: true, message: '请输入价格', trigger: 'blur' },
          { validator: gj_quantityValidator, trigger: "blur" }
        ],
        location: [
          { required: true, message: '请输入物品所在地', trigger: 'blur' },
        ],
        salesMethod: [
          {required: true, message: '请选择售卖形式', trigger: 'change'}
        ],
        descriptionType: [
          {required: true, message: '请选择类型描述', trigger: 'change' }
        ],
        shipping_type: [
          {required: true, message: '请选择运输方式', trigger: 'change' }
        ],
        country: [
          {required: true, message: '请选择国家和区域', trigger: 'change' }
        ],
        dispatch_time_max: [
          {required: true, message: '请选择处理时间', trigger: 'change' }
        ],
        internation_returns_accepted: [
          {type: 'boolean', required: true, message: '请选择退款政策', trigger: 'change' }
        ],
        returns_accepted: [
          {type: 'boolean', required: true, message: '请选择退款政策', trigger: 'change' }
        ],
        published_sku: [
          {required: true, message: '请填写刊登SKU', trigger: 'blur' }
        ]
      },
      picturePasteInput: "", //图片粘贴文本框
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
      formLabelWidth: "135px",
      levelIndex: '',
      savedParentId: [''],
      savedActiveIndex: [],
      saveProductName: [],
      savedViewItem: '',
      parentId: 0,
      NextChild: '',
      productNo: '',
      shopsNo: '',
      testMutiData: {}
    };
  },
  created() {
    this.form.richTextContent = ''
    let query = { site_id: this.form.site }
    this.$store.commit('listing/clearUpcCode')
    this.$store.dispatch('listing/getCommonsList')
    this.$store.dispatch('listing/getAvailableLocation', query)
    this.$store.dispatch('listing/getShippingType', query)
    this.$store.dispatch('listing/getRefundPolicye', query)
    this.$store.dispatch('listing/getShippingCountries', query)
    this.$store.dispatch('listing/getshippingDispatchtime', query)
    this.$store.dispatch('listing/getUnvailableLocation', query)
    this.$store.dispatch('listing/getTaxLocation', query)
    this.$store.dispatch('listing/getListingConfig', query)
  },
  mounted() {
    setTimeout(() => {
      this.getCurrency()
      this.$nextTick(() => {     
      this.changeListingduration(this.form.salesMethod)
    })
    }, 1000)   
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit('listing/clearUpcCode')
    this.$store.commit('listing/CLEAR_TEMPLATE_LIST')
    next()
  },
  methods: {
    clearTemp(){
      this.form.chooseTemplate = ""
      this.form.descriptionType = "HTML"
    },
    toUpper() {
      if (!this.form.productTitle) {
        return
      }
      this.form.productTitle = firstToUpper(this.form.productTitle)
    },
    /* 变种图片弹窗 */
    showAddImagesModal(item) {
      this.selectImagesList = []
      this.form.images.forEach(src => {
        let obj = {}
        this.$set(obj, 'url', src)
        this.$set(obj, 'select', false)
        this.selectImagesList.push(obj)
      })
      this.item = item
      this.modal_add_img = true
    },
    /* 确认添加变种图片 */
    confirmAddImages() {
      if (this.item.imagesList.length === 12) {
        this.$message({
          message: '当前的变种图片长度已达到限制',
          type: 'warning'
        })
        return
      }
      this.selectImagesList.forEach(item => {
        if (item.select) {
          if (this.item.imagesList.length < 12) {
            this.item.imagesList.push({ url: item.url })
          }
        }
      })
      this.$refs.selectImages.checkAll = false
      this.modal_add_img = false
    },
    /* 取消添加变种图 */
    cancelAddImages() {
      this.modal_add_img = false
      this.$refs.selectImages.checkAll = false
    },
    // 生成upc
    generateUPC() {
      this.$store.dispatch('listing/getUPCcode')
    },
    // 生成标题
    // generateTitle() {
    // },
    // 一键插图
    insertImage() {
      let imgHTMLArr = []
      if (!this.form.images.length) {
        return false
      }
      getImagePath({ image_url: this.form.images }).then(res => {
        this.$refs.content.imageSuccessEditListing(res.data)
      })
      // this.$refs.content.imageSuccessEditListing(this.form.images)
      // let str = JSON.parse(JSON.stringify(this.form.richTextContent))
      // this.$refs.content.setContent("");
      // this.form.richTextContent = `${imgHTMLArr.join(" ")}`;
    },
    changeListingduration(val) {
      let _this = this
      switch(val) {
        case 0:
            deleteObjKey(val)
            this.form.listing_duration = 1
            this.infoTitle = '拍卖'
            return
        case 1:
            deleteObjKey(val)
            this.infoTitle = '固价'
            return
        case 2:
            deleteObjKey(val)
            this.infoTitle = '多属性'
            return
      }
      function deleteObjKey (val){
        if (val === 0) {
          if (_this.listing_durationList[0].value === 'GTC') {
            _this.listing_durationList.splice(0, 1)
          }
        } else {
          if (_this.listing_durationList[0].value === 'GTC') {
              return _this
          }
          _this.listing_durationList.unshift({ id: 0, value: 'GTC' })
        }
        
      }
    },
    getCurrency() {
      let site = null
      let usd = null
      this.siteData.forEach(item => {  
        if (item.site_id === this.form.site) {
          site = item.site
        }
      })
      this.currency.forEach(item => {
        if (item.site === site) {
          usd = item.currency
        }
      })
      return usd
    },
    deleteFiratItem(arr, id) {
      let newArr = arr[id].slice(0);
      newArr.splice(0, 1);
      return newArr.join('_')
    },
    cancel_test_cost() {
      this.modal_test_cost = false
    },
    saveProductFunc(form, num) {
      let customizeAttrObj = {}
      let variantAttributeDataObj = {}
      this.form.customizeAttr.forEach(item => {
        if (item.name && item.value) {
          if (Object.prototype.hasOwnProperty.call(customizeAttrObj, item.name)) {
            customizeAttrObj[item.name].push(item.value);
          } else {
            customizeAttrObj[item.name] = [item.value];
          }
        }     
      })
      
      this.form.variantAttributeData.forEach(item => {
        variantAttributeDataObj[item.name] = item.valueList.map(ele => ele.val)
      })
      let internationListGroup = []
      let internalListGroup = []
      if (this.form.internationalGroup.length > 0) {
        this.form.internationalGroup.forEach((item, index, arr) => {
          let obj = {
            add_shipping_cost: item.add_shipping_cost,
            shipping_cost: item.shipping_cost,
            shipping_type: item.shipping_type,
            priority: index + 1,
            shipping_location: ''
          }
          if (item.global) {
            obj.shipping_location = 'Worldwide'
          }
          if (!item.global) {
            let checkList = item.shipping_location.filter(item => item.select)
            if (checkList.length > 0) {
              let valueList = checkList.map(item => item.value)
              obj.shipping_location = valueList.join('|')
            } else {
              obj.shipping_location = ''
            }
          }
          internationListGroup.push(obj)
        })
      }
        if (this.form.internalGroup.length > 0) {
          this.form.internalGroup.forEach((item, index, arr) => {
            let obj = {
              add_shipping_cost: item.add_shipping_cost,
              shipping_cost: item.shipping_cost,
              shipping_type: item.shipping_type,
              free_shipping: item.free_shipping ? 1 : 0,
              priority: index + 1
            }
            internalListGroup.push(obj)
          }) 
      }
    let sitesObj = this.siteData.filter(item => item.site_id === this.form.site)
    let siteName = sitesObj[0].site
      this.$refs[form].validate((valid) => {
          if (valid) {
            if (this.form.salesMethod === 0) {
              // if (parseFloat(this.form.pm_start_price) < 1) {
              //   this.$message({
              //       type: 'warning',
              //       message: '起拍价必须大于等于1'
              //     })
              //     return false
              // }
              if (this.form.pm_start_price && this.form.pm_reserve_price && this.form.pm_buy_it_now_price) {
                if (parseFloat(this.form.pm_start_price) >= parseFloat(this.form.pm_reserve_price) || parseFloat(this.form.pm_start_price) >= parseFloat(this.form.pm_buy_it_now_price) || parseFloat(this.form.pm_reserve_price) > parseFloat(this.form.pm_buy_it_now_price)) {
                  this.$message({
                    type: 'warning',
                    message: '起拍价必须小于保留价和一口价,保留价必须小于一口价'
                  })
                  return false
                }
              }
            }
            if(!this.form.returns_accepted || !this.form.internation_returns_accepted) {
              this.$message({
                type: 'warning',
                message: '请勾选接受国外退款和国内退款'
              })
              return false
            }
            if (!this.checkProductTitle) {
              this.$message({
                type: 'warning',
                message: '产品标题中侵权词汇'
              })
              return false
            }
            if (!requiredWord(this.formList)) {
              this.$message({
                type: 'warning',
                message: '请填写完整产品属性中的必填字段'
              })
              return false
            }
            if (!requiredWord(this.formList2)) {
              this.$message({
                type: 'warning',
                message: '请填写完整产品属性中的必填字段'
              })
              return false
            }
            let fromListObj1 = {}
            // let fromListObj2 = {}
            this.formList.forEach(item => { 
            fromListObj1[item.name] = item.value
            })
            // this.formList2.forEach(item => { 
            //   fromListObj2[item.name] = item.value
            // })
            // let fromListObjTotal = Object.assign({}, fromListObj1, fromListObj2)
            if (this.form.sales_tax_state) {
              if (!this.form.sales_tax_percent) {
                  this.$message({
                  type: 'warning',
                  message: '当选择了销售国家时,销售税必须大于0'
                })
                return false
              }
            }
            let data = {
              spu: this.form.spu,
              product_sku: this.sku,
              shop_id: this.form.shop,
              type: 'create',
              site: siteName,
              site_id: this.form.site,
              currency: this.getCurrency(),
              category_history_id: this.form.product1,
              category_ids: this.deleteFiratItem(this.saveProduct1IdList, this.form.product1),
              category_path: this.saveProductNameList1[this.form.product1].join('_'),
              sell_type: this.form.salesMethod,
              product_title: this.form.productTitle,
              sub_title: this.form.subtitle,
              upc: this.upcCode,
              pay_pal_email: this.form.pay_pal_email,
              payment_instructions: this.form.payment_instructions,
              returns_accepted: this.form.returns_accepted ? 1 : 0,
              other_attrs: customizeAttrObj,
              internation_returns_accepted: this.form.internation_returns_accepted ? 1 : 0,
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
              shipping_included_in_tax: this.form.shipping_included_in_tax ? 1 : 0,
              private_listing: this.form.private_listing ? 1 : 0,
              listing_duration: this.form.listing_duration,
              // plan_update: this.form.plan_update
            }
            if (num === 1) {
              data.push_status = 0
            }
            if (num === 3) {
              data.push_status = 3
            }
            if (num === 2) {
              data.push_status = 4
            }
            if (this.form.salesMethod !==2 ) {
              data.sku = this.form.published_sku
            }
            if (this.form.images.length > 12) {
              this.$message({
                type: 'warning',
                  message: '主图最多只能上传12张'
                })
              return false
            }
            data.base_imgs = this.form.images
            if (this.showReturnDescription) {
              data.return_description = this.form.return_description //退款说明
            }
            if (this.form.returns_accepted) {
              data.returns_with_in = this.form.returns_with_in
              data.shipping_cost_paid_by = this.form.shipping_cost_paid_by
            }
            if (JSON.stringify(fromListObj1) !== '{}') {
              data.product_attrs = fromListObj1
            }
            if (this.form.internation_returns_accepted) {
              data.internation_returns_with_in = this.form.internation_returns_with_in
              data.internation_shipping_cost_paid_by = this.form.internation_shipping_cost_paid_by
            }
            if (this.form.disable_buyer_requirements === 1) {
              data.ship_to_registration_country=  this.form.ship_to_registration_country ? 1 : 0
              data.max_unpaid_count_checkbox = this.form.max_unpaid_count_checkbox ? 1 : 0
              data.max_unpaid_count = this.form.max_unpaid_count
              data.max_unpaid_period = this.form.max_unpaid_period
              data.max_violations_count_checkbox = this.form.max_violations_count_checkbox ? 1 : 0
              data.max_violations_count = this.form.max_violations_count
              data.max_violations_period = this.form.max_violations_period
              data.min_feedback_score_checkbox = this.form.min_feedback_score_checkbox ? 1 : 0
              data.min_feedback_score = this.form.min_feedback_score,
              data.require_item_count_checkbox = this.form.require_item_count_checkbox ? 1 : 0
              data.require_item_count = this.form.require_item_count
              data.require_feedback_score_checkbox = this.form.require_feedback_score_checkbox ? 1 : 0
              data.require_feedback_score = this.form.require_feedback_score
            }
            if (this.form.ddl_exclusion_list_type === 2) {
              data.unavailable_shipping_location = this.form.unavailable_shipping_location
            }
            if (this.is_plan_release) {
              if (!this.form.plan_update) {
                this.$message({
                  type: 'wanring',
                  message: '请选择发布时间'
                })
              }
              if (new Date(this.form.plan_update).getTime() < new Date().getTime()) {
                this.$message({
                  type: 'wanring',
                  message: '发布时间必须晚于当前的时间'
                })
                return false
              }
              data.plan_update = dateFormat(this.form.plan_update)
            }
            if (this.form.salesMethod === 0) {
              
              data.pm_start_price = this.form.pm_start_price,
              data.pm_reserve_price = this.form.pm_reserve_price,
              data.pm_buy_it_now_price = this.form.pm_buy_it_now_price,       
              data.is_pm_lot_size = this.form.is_pm_lot_size
              data.pm_lot_size = this.form.pm_lot_size
            }
            if (this.form.salesMethod === 1) {
              data.gj_start_price = this.form.fixedPrice,
              data.gj_quantity = this.form.gj_quantity,            
              data.gj_best_offer = this.form.gj_best_offer,
              data.gj_best_offer_auto_accept = this.form.gj_best_offer_auto_accept ? 1 : 0,           
              data.gj_best_offer_auto_decline = this.form.gj_best_offer_auto_decline ? 1 : 0,          
              data.is_gjLot_size = this.form.is_pm_lot_size
              data.gj_lot_size = this.form.pm_lot_size
              if (this.form.gj_best_offer === 1) {
                if (this.form.gj_best_offer_auto_accept) {
                  if (parseFloat(this.form.fixedPrice) <= parseFloat(this.form.gj_best_offer_auto_accept_price)) {
                    this.$message({
                      type: 'warning',
                      message: '价格必须高于自动接受大于价格'
                    })
                    return false
                  }
                  data.gj_best_offer_auto_accept_price = parseInt(this.form.gj_best_offer_auto_accept_price) ? parseFloat(this.form.gj_best_offer_auto_accept_price) : 0
                }
                if (this.form.gj_best_offer_auto_decline) {
                  if (parseFloat(this.form.fixedPrice) <= parseFloat(this.form.gj_minP_best_offer_price)) {
                    this.$message({
                      type: 'warning',
                      message: '价格必须高于自动拒绝小于价格'
                    })
                    return false
                  }
                  data.gj_minP_best_offer_price = parseInt(this.form.gj_minP_best_offer_price) ? parseFloat(this.form.gj_minP_best_offer_price) : 0
                }
              }
              // if (parseFloat(this.form.fixedPrice) < 1) {
              //       this.$message({
              //         type: 'warning',
              //         message: '价格必须大于等于1'
              //       })
              //       return false
              // }
              if (this.form.gj_best_offer_auto_accept && this.form.gj_best_offer_auto_decline) {
                if (this.form.gj_best_offer_auto_accept_price && this.form.gj_minP_best_offer_price) {
                  if (parseFloat(this.form.gj_best_offer_auto_accept_price) <= parseFloat(this.form.gj_minP_best_offer_price)) {
                    this.$message({
                      type: 'warning',
                      message: '自动接受大于价格必须高于自动拒绝小于价格'
                    })
                    return false
                  }
                }
              }
            }
            let imagesObj = {}
            let imageObj = {}
            this.uploadList.forEach(item => {
              if (item.imagesList.length) {
                imageObj[item.val] = item.imagesList.map(item => item.url)
              } 
            })
            imagesObj[this.form.attributesSelect] = imageObj
            if (this.form.salesMethod === 2) {
              let flag = true
              this.form.tableData.forEach(item => {
                if (!item.sku || !item.attr_price || !item.quantity || !item.barcode || parseFloat(item.attr_price) < 0) {
                  flag = false
                  return
                }
              })
              if (!flag) {
                this.$message({
                  type: 'warning',
                  message: '变种参数中的刊登sku, 价格，库存，必须填写'
                })
                return false
              }
              data.variety_paramers = this.form.tableData // 变种参数
              if (JSON.stringify(imageObj) !== '{}') {
                data.variety_imgs = imagesObj
              }
            }
            if (this.cat_id_one_name && this.cat_id_one && this.thumbnail) {
              data.cat_id_one_name = this.cat_id_one_name
              data.cat_id_one = this.cat_id_one
              data.thumbnail = this.thumbnail
            }
            if (this.form.descriptionType == "HTML") {
              if (!this.form.richTextContent) {
                this.$message({
                  type: 'warning',
                  message: '请输入描述说明'
                })
                return false
              }
              if (!this.checkeditContent) {
                this.$message({
                  type: 'warning',
                  message: '产品描述中有侵权词汇'
                })
                return false
              }
              data.description_type = 'HTML'
              data.description = this.form.richTextContent
            }
            if (this.form.descriptionType == "template") {
              if (this.form.chooseTemplate) {
                data.desc_tpl_id  = this.form.chooseTemplate
                data.description = this.$refs.AttrTemplate.getTemplateCode()
               let templateInfo =  {
                  banner: this.$refs.AttrTemplate.banner,
                  description: this.$refs.AttrTemplate.description,
                  templateTitle: this.$refs.AttrTemplate.templateTitle,
                  carouselImages: this.$refs.AttrTemplate.carouselImages,
                  tabBarData: this.$refs.AttrTemplate.tabBarData
                };
                data.desc_tpl_hidden_info = JSON.stringify(templateInfo)
              }
              data.description_type = 'template'
            }
            if (this.form.shop1) {
              data.shop_category_history_id = this.form.shop1,
              data.shop_category_ids =this.deleteFiratItem(this.saveShop1IdList, this.form.shop1),
              data.shop_category_path =this.saveShop1Name[this.form.shop1].join('_')
            }
            if (this.form.shop2) {
              data.shop_second_category_history_id = this.form.shop2,
              data.shop_second_category_ids = this.deleteFiratItem(this.saveShop2IdList, this.form.shop2)
              data.shop_second_category_path = this.saveShop2Name[this.form.shop2].join('_')
            }
            if (this.form.product2) {
              data.second_category_history_id = this.form.product2,
              data.second_category_ids = this.deleteFiratItem(this.saveProduct2IdList, this.form.product2)
              data.second_category_path = this.saveProductNameList2[this.form.product2].join('_')
            }
            if (num === 1 || num === 3) {
              this.$store.dispatch('listing/createListing', data)
            } else {
              this.$store.dispatch('listing/verifyAddItem', data)
            }      
          } else {
            this.$message({
              type: 'warning',
              message: '请填写必填的字段'
            })
            return false;
          }
      });
    },
    submitForm(form) {
      this.saveProductFunc(form, 1)
    },
    /* 保存待发布 */
    releasePending(form) {
      this.saveProductFunc(form, 3)
    },
    // 费用检测
    TestCost(form) {
      this.saveProductFunc(form, 2)
    },
     /* 获取产品属性规格 */
    getProductSpecifications() {
      let query = {
        site_id: this.form.site,
        category_id: this.form.product1,
        // second_category_id: this.form.product2,
        shop_id: this.form.shop_id ? this.form.shop_id : 0
      }
      if (this.form.product2) {
        query.second_category_id = this.form.product2
      } else {
        this.formList2 = []
      }
      getProductSpecifications(query).then(res => {
        if (this.form.product1) {
           res.data[this.form.product1].forEach(item => {
              if (item.selection_mode === 'checkbox') {
                item.value = []
              } else {
                item.value = ''
              }
          })
          res.data[this.form.product1].forEach(item => {
            for (let key in this.productAttrList) {
              if (item.name === key) {
                if (item.selection_mode === 'checkbox') {
                    if (typeof(this.productAttrList[key])=='string') {
                      item.value = [this.productAttrList[key]]
                    } else {
                      item.value = this.productAttrList[key]
                    }
                } else {
                  item.value = this.productAttrList[key]
                }             
              }
            }
          })
          this.formList = res.data[this.form.product1]
        }
        // if (this.form.product2) {
        //   res.data[this.form.product2].forEach(item => {
        //     if (item.selection_mode === 'checkbox') {
        //       item.checkedValue = ''
        //       item.value = []
        //     } else {
        //       item.value = ''
        //     }
        //   })
        //   this.formList2 = res.data[this.form.product2]
        // }
      })
    },
    // 产品分类下是否允多属性sku
    getAllowMultiattr() {
      let query = {
        site_id: this.form.site,
        shop_id: this.form.shop
      }
      if (this.form.product1) {
        query.category_history_id = this.form.product1
      }
      if (this.form.product2) {
        query.second_category_history_id = this.form.product2
      }
      this.$store.dispatch('listing/getAllowMultiattr', query)
    },
    /* 是否有侵权词汇 */
    changeProductTitle() {
      if (!this.form.productTitle) {
        return false
      }
      let formData = new FormData()
      formData.append('words', this.form.productTitle)
      let flag = { title: 'productTitle' }
      debounce(() => {
        this.$store.dispatch('listing/InfringementOfWord', { formData, flag })
      }, 10000)
      
    },
    input(val) {
      if (!val) {
        return false
      }
      if (!textFormat(this.form.richTextContent)) {
        return false
      }
      debounce(() => {
        if (!this.form.richTextContent) {
          return false
        }
        let formData = new FormData()
        formData.append('words', textFormat(this.form.richTextContent))
        let flag = { title: 'editorContent' }
        this.$store.dispatch('listing/InfringementOfWord', { formData, flag })
      }, 10000)   
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
        }
        getPeoduct1(query).then(res => {
          if (args) {
              this.categoryLevelList.splice(0, 1, res.data);
                    // this.categoryLevelList[0] = res.data.data.children
          } else {
              this.categoryLevelList.push(res.data);
          }
           this.modal_product = true
        })
        // this.$store.dispatch('listing/getPeoduct1', query)
    },
    getShopClassList(args) {
        let query = {
          site_id: this.form.site,
          shop_id: this.form.shop,
          pid: 0
        }
        getShopClassList(query).then(res => {
          if (args) {
              this.categoryLevelList.splice(0, 1, res.data);
                    // this.categoryLevelList[0] = res.data.data.children
          } else {
              this.categoryLevelList.push(res.data);
          }
          this.modal_product = true
        })
    },
    // 查看下一级的产品
    showChildren (item, index, activeIndex) {
      this.NextChild = item
      this.levelIndex = index;
      this.savedParentId[index + 1] = item.category_id;
      this.savedActiveIndex[index] = activeIndex;
      this.saveProductName[index] = item.category_name
      this.saveProductName.splice(index + 1)
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
    updateList (id, index) {
      if (!id) {
        this.getdata(true);
        return false;
      }
      let query = {
        site_id: this.form.site,
        pid: id
      }
      if (!this.flag) {
        query.shop_id = this.form.shop
        getShopClassList(query).then(res => {
          this.categoryLevelList.splice(index + 1);
          let tempArr = [...this.categoryLevelList];
          tempArr[index + 1] = res.data;
          this.$nextTick(() => {
            this.categoryLevelList = tempArr;
          });
      })
      } else {
        getPeoduct1(query).then(res => {
          this.categoryLevelList.splice(index + 1);
          let tempArr = [...this.categoryLevelList];
          tempArr[index + 1] = res.data;
          this.$nextTick(() => {
            this.categoryLevelList = tempArr;
          });
        })
      } 
    },
    cascaderLazyload(node, reslove) {
        let { category_id } = node
        this.parentId = category_id
        let nodes = []
        
    },
    // 取消操作
    cancel() {
      this.$router.push('/productListing/listOfSelections')
      // this.$router.go(-1);
    },
    // 获取信息
    getProductInfo(query) {
      getSpuInfo(query).then(res => {
          this.product1 = []
          this.form.product1 = ''
          this.saveProduct1IdList = {}
          this.saveProductNameList1 = {}
          let data = res.data
          this.submitFlag = true
          let list = []
          let tableList = []
          this.tableHeadList = []
          for (let key in data.variety_attrs) {
            let obj = {}
            obj.name = key
            obj.valueList = []
            data.variety_attrs[key].forEach(item => {
              let son = {}
              son.val = item
              obj.valueList.push(son)
              son.imagesList = []
              // data.base_imgs.forEach(img => {
              //   son.imagesList.push({ url: img })
              // })
              // son.imagesList = []
            })
            list.push(obj)
          }
          if (data.variety_paramers.length) {
            this.sku = data.variety_paramers[0].product_sku
          }
          this.form.attributesSelect = list.length > 0 ? list[0].name : ''
          if (data.variety_paramers[0].attrs) {
            tableList = Object.keys(data.variety_paramers[0].attrs)
          }
          list.forEach(ele => {
              if (ele.name === this.form.attributesSelect) {   // 如果当前的新增的自定义属性名称相同              
                  this.uploadList = ele.valueList.filter(son => son.val)
              }  
          })    
          this.productAndSku = []
          data.variety_paramers.forEach(item => {
            item.attr_price = ''
            item.quantity = ''
            item.barcode = 'does not apply'
            // this.productSkuList.push(item.product_sku)
            let obj = {}
            obj.sku = item.sku
            obj.product_sku = item.product_sku
            obj.attr_price = item.attr_price
            obj.quantity = item.quantity
            this.productAndSku.push(obj)
            for (let key in item.attrs) {
              item[key] = item.attrs[key]
              if (Object.prototype.hasOwnProperty.call(this.testMutiData, key)) {       
                this.testMutiData[key].push(item.attrs[key]);
            } else {
                this.testMutiData[key] = [item.attrs[key]];
              }
            }
          })
          if (!(this.product1.filter(item => item.id === data.category_history_id).length)) {
            let product1Ids = ['']
            product1Ids.push(...data.category_ids)
            this.form.product1 = data.category_history_id
            this.saveProduct1IdList[data.category_history_id] = product1Ids
            this.saveProductNameList1[data.category_history_id] = data.category_path
            this.product1.push({ id: data.category_history_id, label: data.category_path[data.category_path.length - 1]})
          }    
          this.cat_id_one = data.cat_id_one
          this.cat_id_one_name = data.cat_id_one_name
          this.thumbnail = data.thumbnail
          this.tableHeadList.push(...tableList)
          this.form.tableData = data.variety_paramers
          this.form.variantAttributeData = list
          this.form.productTitle = data.title
          if (data.base_imgs.length) {
            this.showDownloadButton = true
          } else {
            this.showDownloadButton = false
          }
          this.form.images =  data.base_imgs
          this.form.richTextContent = data.description
          
      })
    },
    //   加载SPU
    loadSpu() {
      if (!this.form.spu) {
        this.$message({
            message: '请先填写SPU',
            type: 'warning'
        })
        return
      }
      this.form.salesMethod = 2
      this.salesChanges(2)
      this.getProductInfo({ spu: this.form.spu })
      // this.$store.dispatch('listing/getSpuInfo', { spu: this.form.spu })
       // this.form.images = this.spuInfo.base_imgs
    },
    loadItemId() {
       if (!this.form.itemId) {
        this.$message({
            message: '请先填写item ID',
            type: 'warning'
        })
        return
      }
      let query = { item_id: this.form.itemId }
      this.getItemInfo(query)
    },
    // 获取信息
  getItemInfo(query) {
        getItemInfo(query).then(res => {
          this.product1 = []
                this.product2 = []
                this.shop1 = []
                this.shop2 = []
                this.form.categoryOne = ''
                this.form.categoryTwo = ''
                this.tableHeadList = []
                this.formList = []
                this.formList2 = []
                this.picturePasteInput = ''
          let data = res.data
          this.form.site = data.site_id
          this.submitFlag = false
          let list = []
            if (data.variety_attrs.length) {
                data.variety_attrs.forEach(item => {
                    let obj = {}
                    obj.name = item.attr_name
                    obj.valueList = []
                    item.item_name.forEach(ele => {
                        let son = {}
                        son.val = ele
                        son.imagesList = []
                        obj.valueList.push(son)
                    })
                    list.push(obj)
                })
                // this.form.salesMethod = 2
                // this.salesChanges(2)
            }
            if (data.variety_imgs.length) {
              data.variety_imgs.forEach(item => {
                  list.forEach(ele => {
                      if (item.attr_name === ele.name) {
                          ele.valueList.forEach(son => {
                              if (son.val === item.item_name) {
                                  let obj = {}
                                  obj.url = item.img_path
                                  son.imagesList.push(obj)
                              }
                          })
                      }
                  })
              })
            }
            if (list.length > 0) {
              this.form.attributesSelect  = list[0].name
              list.forEach(ele => {
                  if (ele.name === this.form.attributesSelect) {   // 如果当前的新增的自定义属性名称相同    
                      this.uploadList = ele.valueList.filter(son => son.val)
                  }  
              }) 
            }
            this.form.descriptionType = data.description_type 
            this.form.variantAttributeData = list
            this.form.productTitle = data.title
             if (data.base_imgs.length) {
                this.showDownloadButton = true
            } else {
              this.showDownloadButton = false
            }
            this.form.images = data.base_imgs
            this.form.spu = data.spu
            this.form.shop = data.shop_id
            this.form.salesMethod = data.sell_type
            this.salesChanges(this.form.salesMethod)
            this.form.private_listing = data.private_listing
            this.form.listing_duration = data.listing_duration
            this.form.pm_start_price = data.pm_start_price
            this.form.pm_reserve_price = data.pm_reserve_price
            this.form.pm_buy_it_now_price = data.pm_buy_it_now_price
            this.form.fixedPrice = data.gj_start_price
            this.form.gj_quantity = data.gj_quantity
            if (this.form.salesMethod === 0) {
                this.form.is_pm_lot_size = data.is_pm_lot_size 
                this.form.pm_lot_size = data.pm_lot_size  
            }
            if (this.form.salesMethod === 1) {
                this.form.is_pm_lot_size = data.is_gjLot_size 
                this.form.pm_lot_size = data.gj_lot_size 
            }
            // if (this.siteData.length) {
            //   this.form.site = this.siteData.filter(item => item.site === data.site)[0].site_id
            // }
            this.form.gj_best_offer = data.gj_best_offer
            this.form.gj_best_offer_auto_accept = data.gj_best_offer_auto_accept ? true : false
            this.form.gj_best_offer_auto_accept_price = data.gj_best_offer_auto_accept_price
            this.form.gj_best_offer_auto_decline = data.gj_best_offer_auto_decline ? true : false
            this.form.gj_minP_best_offer_price = data.gj_minP_best_offer_price
            this.form.productTitle = data.title
            this.form.subtitle = data.sub_title
            this.upcCode = data.upc
            this.form.richTextContent = data.description
            this.form.pay_pal_email = data.pay_pal_email
            this.form.payment_instructions = data.payment_instructions
            this.form.location = data.location
            this.form.country = data.country
            this.form.postal_code = data.postal_code
            this.form.dispatch_time_max = data.dispatch_time_max
            this.form.ddl_exclusion_list_type = data.ddl_exclusion_list_type
            this.form.returns_accepted = data.returns_accepted ? true : false
            this.form.returns_with_in = data.returns_with_in
            this.form.shipping_cost_paid_by = data.shipping_cost_paid_by
            this.form.internation_returns_accepted = data.internation_returns_accepted ? true : false
            this.form.internation_returns_with_in = data.internation_returns_with_in
            this.form.internation_shipping_cost_paid_by = data.internation_shipping_cost_paid_by
            this.form.return_description = data.return_description
            this.form.disable_buyer_requirements = data.disable_buyer_requirements
            this.form.ship_to_registration_country = data.ship_to_registration_country ? true : false
            this.form.max_unpaid_count_checkbox = data.max_unpaid_count_checkbox ? true : false
            this.form.max_unpaid_count = data.max_unpaid_count
            this.form.max_unpaid_period = data.max_unpaid_period
            this.form.max_violations_count_checkbox = data.max_violations_count_checkbox ? true : false
            this.form.max_violations_count = data.max_violations_count
            this.form.max_violations_period = data.max_violations_period
            this.form.min_feedback_score_checkbox = data.min_feedback_score_checkbox ? true : false
            this.form.min_feedback_score = data.min_feedback_score
            this.form.require_item_count_checkbox = data.require_item_count_checkbox ? true : false
            this.form.require_item_count = data.require_item_count
            this.form.require_feedback_score_checkbox = data.require_feedback_score_checkbox ? true : false
            this.form.require_feedback_score = data.require_feedback_score
            this.form.sales_tax_state = data.sales_tax_state
            this.form.sales_tax_percent = data.sales_tax_percent
            this.form.shipping_included_in_tax = data.shipping_included_in_tax ? true : false
            this.form.gallery_type = data.gallery_type
            this.is_plan_release = data.is_plan_release ? true : false
            this.form.plan_update = data.plan_update
            this.form.images = data.base_imgs
            if (data.ddl_exclusion_list_type === 2) {
              this.unavailableShippingLocation = data.unavailable_shipping_location
              this.form.unavailable_shipping_location = data.unavailable_shipping_location ? data.unavailable_shipping_location.join('|') : ''
            }
            if (data.site === 'DE' || data.site === 'AT' || data.site === 'FR' || data.site === 'IT' || data.site === 'ES') {
                this.showReturnDescription = true
            } 
            // this.descriptionChange()
            data.domestic_shipping.forEach(item => {
              item.free_shipping = item.free_shipping ? true : false
            })
            data.international_shipping.forEach(item => {
                item.global = false
                item.checkAll = false
              if (typeof(item.shipping_location)=='string') { // 如果当前的类型为字符串，那么选择的就是全球
                item.global = true
                item.shipping_location =  _g.getJsonParse(this.availableLocation)
              } else { // 不是则是数组类型，那么选的就是国家
                item.checkAll = true
                let availableLocation = _g.getJsonParse(this.availableLocation)
                availableLocation.forEach(ele => {
                  item.shipping_location.forEach(location => {
                    let list = []
                    list.push(ele.value)
                    if (list.indexOf(location) != -1) {              
                      ele.select = true
                    }
                  })
                })
                item.shipping_location = availableLocation
              }      
            })
            this.form.internalGroup = data.domestic_shipping
            this.form.internationalGroup = data.international_shipping
            if (data.category_ids.length) {
              let product1Ids = ['']
              product1Ids.push(...data.category_ids)
              this.form.product1 = data.category_history_id
              this.saveProduct1IdList[data.category_history_id] = product1Ids
              this.saveProductNameList1[data.category_history_id] = data.category_path
              this.product1.push({ id: data.category_history_id, label: data.category_path[data.category_path.length - 1]})
            }       
            if (data.second_category_ids.length) {
              let product2Ids = ['']
              product2Ids.push(...data.second_category_ids)
              this.form.product2 = data.second_category_history_id
              this.saveProduct2IdList[data.second_category_history_id] = product2Ids
              this.saveProductNameList2[data.second_category_history_id] = data.second_category_path
              this.product2.push({ id: data.second_category_history_id, label: data.second_category_path[data.second_category_path.length - 1]})
            } else {
              this.product2 = []
              this.form.product2 = ''
              this.saveProduct2IdList = {}
              this.saveProductNameList2 = {}
            }
            if (data.shop_category_ids.length) {
              let shop1Ids = ['']
              shop1Ids.push(...data.shop_category_ids)
              this.form.shop1 = data.shop_category_history_id
              this.saveShop1IdList[data.shop_category_history_id] = shop1Ids
              this.saveShop1Name[data.shop_category_history_id] = data.shop_category_path
              this.shop1.push({ id: data.shop_category_history_id, label: data.shop_category_path[data.shop_category_path.length - 1]})
            } else {
              this.form.shop1 = ''
              this.saveShop1IdList = {}
              this.saveShop1Name = {}
              this.shop1 = []
            }
            if (data.shop_second_category_ids.length) {
              let shop2Ids = ['']
              shop2Ids.push(...data.shop_second_category_ids)
              this.form.shop2 = data.shop_second_category_history_id
              this.saveShop2IdList[data.shop_second_category_history_id] = shop2Ids
              this.saveShop2Name[data.shop_second_category_history_id] = data.shop_second_category_path
              this.shop2.push({ id: data.shop_second_category_history_id, label: data.shop_second_category_path[data.shop_second_category_path.length - 1]})
            } else {
              this.form.shop2 = ''
              this.saveShop2IdList = {}
              this.saveShop2Name = {}
              this.shop2 = []
            }                                                     
            /* 自定义属性 */
            // this.form.customizeAttr
            for (let key in data.other_attrs) {
              data.other_attrs[key].forEach(item => {
                let obj = {}
                obj.name = key
                obj.value = item
                this.form.customizeAttr.push(obj)
              })
            }
            this.productAttrList = data.product_attrs
            /* 变种参数 */
            let tableList = []
            this.productAndSku = []
            if (data.variety_paramers.length) {
              tableList = data.variety_paramers[0].attrs
              data.variety_paramers.forEach(item => {
                let obj = {}
                obj.sku = item.sku
                obj.product_sku = item.product_sku
                obj.attr_price = item.attr_price
                obj.quantity = item.quantity
                this.productAndSku.push(obj)
                // this.productSkuList.push(item.product_sku)
                for (let key in item.attrs) {
                  if (Object.prototype.hasOwnProperty.call(this.testMutiData, key)) {       
                    this.testMutiData[key].push(item[key]);
                } else {
                    this.testMutiData[key] = [item[key]];
                  }
                }
            })
            }
            
          this.tableHeadList.push(...tableList)
          this.form.tableData = data.variety_paramers
          
          if (!data.desc_tpl_hidden_info) {
            this.form.descriptionType = "HTML"
          }
          else {
            this.form.descriptionType = "template"
            this.templateData = data.desc_tpl_hidden_info;
            this.desc_tpl_id = data.desc_tpl_id
            this.form.chooseTemplate = data.desc_tpl_id
          }
      })
    },
    privateAuctionsChanges() {},
    // 批发选择
    wholesaleChanges(data) {
    },
    handleRemove(file, fileList, item, index) {
    },
    // 添加变种属性按钮
    addVariantAttributes() {
        this.modal_attr = true
    },
    // 确定添加
    submit_attr() {
        if (!this.defineAttr) {
            this.$message({
                message: '请输入自定义属性',
                type: 'warning'
            })
            return false
        }
      let nameList =  this.form.variantAttributeData.map(item => item.name)
      if (nameList.indexOf(this.defineAttr) !== -1) {
          this.$message({
                message: '不能添加相同的属性',
                type: 'warning'
          })
          return false
      }
      if (this.form.variantAttributeData.length === 5) {
          this.$message({
                message: '最多只能添加5个自定义属性',
                type: 'warning'
          })
          return false
      }
        let valueList = [
          {
            val: '',
            imagesList: []
          },
          {
            val: '',
            imagesList: []
          },
        ]
        this.form.variantAttributeData.push({ name: this.defineAttr, valueList})
        this.form.attributesSelect  = this.form.variantAttributeData[0].name
        this.defineAttr = ''
        this.modal_attr = false
    },
    // 确定选择分类
    submit_product() {
      if (this.NextChild) {
        if (this.NextChild.has_son) {
            this.$message({
              type: 'warning',
              message: `错误：您选择的类目 “${this.NextChild.category_name}” 还有子类目,请选择子类目！`
            })
            return false
        }
      }
      if (this.flag) {
        if (this.productNo === '1') {
          if (this.product1.find(item => item.id === this.NextChild.category_id)) {
            this.$message({
              type: 'warning',
              message: `错误：您选择的类目 “${this.NextChild.category_name}” 已存在！`
            })
            return false
          }
          this.saveProductNameList1[this.NextChild.category_id] = this.saveProductName
          this.saveProduct1IdList[this.NextChild.category_id] = this.savedParentId
          this.form.product1 = this.NextChild.category_id
          this.product1.push({ id: this.NextChild.category_id, label: this.NextChild.category_name})
        } else {
          if (this.product2.find(item => item.id === this.NextChild.category_id)) {
            this.$message({
              type: 'warning',
              message: `错误：您选择的类目 “${this.NextChild.category_name}” 已存在！`
            })
            return false
          }
          this.saveProductNameList2[this.NextChild.category_id] = this.saveProductName
          this.saveProduct2IdList[this.NextChild.category_id] = this.savedParentId
          this.form.product2 = this.NextChild.category_id
          this.product2.push({ id: this.NextChild.category_id, label: this.NextChild.category_name})
        }
      } else {
        if (this.shop1.find(item => item.id === this.NextChild.category_id)) {
            this.$message({
              type: 'warning',
              message: `错误：您选择的类目 “${this.NextChild.category_name}” 已存在！`
            })
            return false
          }
        if (this.shopsNo === '1') {
          this.saveShop1Name[this.NextChild.category_id] = this.saveProductName
          this.saveShop1IdList[this.NextChild.category_id] = this.savedParentId
          this.form.shop1 = this.NextChild.category_id
          this.shop1.push({ id: this.NextChild.category_id, label: this.NextChild.category_name})
        } else {
          if (this.shop2.find(item => item.id === this.NextChild.category_id)) {
            this.$message({
              type: 'warning',
              message: `错误：您选择的类目 “${this.NextChild.category_name}” 已存在！`
            })
            return false
          }
          this.saveShop2Name[this.NextChild.category_id] = this.saveProductName
          this.saveShop2IdList[this.NextChild.category_id] = this.savedParentId
          this.form.shop2 = this.NextChild.category_id
          this.shop2.push({ id: this.NextChild.category_id, label: this.NextChild.category_name})
        }
      }
      
      this.cancel_product()
    },
    /* 搜索分类 */
    doSearch() {
      if (!this.searchWord) {
         message('warning', '请输入需要搜索的分类关键词')
        return
      }
      let params = {
        category_name: this.searchWord,
        site_id: this.form.site
      }
      searchCatagoryList(params).then(res => {
        this.list = res.data
      })
    },
    /* 确定选择分类 */
    selectLi(item) {
      if (this.productNo === '1') { /* 用来区分当前是分类是一还是二 */
        if (this.product1.find(ele => ele.id === item.category_id)) {
          this.$message({
            type: 'warning',
            message: `错误：您选择的类目 “${item.category_name}” 已存在！`
          })
          return false
        }
        this.saveProductNameList1[item.category_id] = JSON.parse(JSON.stringify(item.path))
        this.saveProduct1IdList[item.category_id] =  JSON.parse(JSON.stringify(item.category_ids))
        this.form.product1 = item.category_id
        this.product1.push({ id: item.category_id, label: item.category_name})
        this.cancel_product()
      } else {
        if (this.product2.find(ele => ele.id === item.category_id)) {
          this.$message({
            type: 'warning',
            message: `错误：您选择的类目 “${item.category_name}” 已存在！`
          })
          return false
        }
        this.saveProductNameList2[item.category_id] = JSON.parse(JSON.stringify(item.path))
        this.saveProduct2IdList[item.category_id] = JSON.parse(JSON.stringify(item.category_ids))
        this.form.product2 = item.category_id
        this.product2.push({ id: item.category_id, label: item.category_name})
        this.cancel_product()
      }
    },
    // 取消选择产品分类
    cancel_product() {
        this.savedActiveIndex = []
        this.categoryLevelList = []
        this.saveProductName = []
        this.savedParentId = ['']
        this.modal_product = false
        this.searchWord = ''
        this.list = []
    },
    // 取消添加
    cancel_attr() {
        this.modal_attr = false
    },
    // 添加单个属性
    addSingleAttr(item) {
      if (item.valueList.length === 10) {
          this.$message({
                message: '最多只能添加10个属性',
                type: 'warning'
          })
          return false
      }
      item.valueList.push({ val: '', imagesList: [] })
    },
    // 删除单个属性
    removeSingleAttr(val, item, valueList, fatherLabel, index) {  
      item.valueList.splice(index, 1)
      this.uploadList.splice(index, 1)
      if (item.valueList.length === 0) { // 如果当前的属性中的单个属性长度为0，应该父属性
          this.form.variantAttributeData = this.form.variantAttributeData.filter(ele => ele.valueList.length > 0)       
      }
      this.testMutiData = deleteObjArrayItem(this.testMutiData, item.name, val)
      if (!this.testMutiData[item.name].length) { // 如果当前属性名的数值被删除完了
        this.$delete(this.testMutiData, item.name) // 那么这个属性也要删除
        this.tableHeadList = this.tableHeadList.filter(ele => ele !== item.name) // 当前的表头也要把这个属性名删除
      }    
      this.productIdList = []
      this.productIdList = deleteTableContent(this.form.tableData, item.name, val, valueList, this.form.variantAttributeData)
      this.productAndSku = this.productAndSku.filter(item => !this.productIdList.includes(item.sku))
      this.form.attributesSelect = this.form.variantAttributeData.length ? this.form.variantAttributeData[0].name : ''
      this.form.variantAttributeData.forEach(ele => {
        this.uploadList = ele.valueList.filter(son => son.val)
      })
      if (!this.form.variantAttributeData.length) {
          this.form.attributesSelect = ''
      }
    },
     /* 拿到当前 */
    getSameNum(val,arr) {
        let processArr 
        processArr = arr.filter((item) => {
            return item.val == val;
        })
        return processArr.length;
    },
    getSameNameNum(val,arr) {
        let processArr 
        processArr = arr.filter((item) => {
            return item == val;
        })
        return processArr.length;
    },
    // 获取焦点
    focusValue(val) {
        this.recordValue = val
    }, 
    getMaxClass(arr, num) {
    },
    focusFatherValue(val) {
      this.recordFatherValue = val
    },
    blurAttrFather(item, val, i) {
      if (!val) { // 如果清空暂时不管
        this.$message({
          type: 'warning',
          message: '不要填写空值噢'
        })
        item.name = this.recordFatherValue
        return
      }
      if (this.recordFatherValue === val) { // 进来和离开的值相同
        return 
      }
      if (this.tableHeadList.indexOf(val) !== -1) { // 当发现有重复值时
        item.name = this.recordFatherValue // 用之前的填写的值将当前的替换避免错误
        this.$message({
          type: 'warning',
          message: '不要填写重复的值噢'
        })
        return false
      }
      this.form.attributesSelect = this.form.variantAttributeData[i].name // 当前下拉框绑定的值也需要跟着变
      this.form.variantAttributeData.forEach(ele => {
        this.uploadList = ele.valueList.filter(son => son.val)
      })
      for (let key in this.testMutiData) {
        if (key === this.recordFatherValue) {
          this.testMutiData[val] = this.testMutiData[key]
          delete this.testMutiData[key]
        }
      }   
      this.tableHeadList[i] = val
      this.form.tableData.forEach(ele => {
        for (let key in ele) {
          if (key === this.recordFatherValue) {
            ele[val] = ele[key];
            // 删除原来的键
            delete ele[key];
          }
        }
      })
        this.$forceUpdate()   
    },
    // 属性值失去焦点添加upload组件
    blurAttr(valList, val, item, valueList, fatherLabel) {
      if (!this.recordValue) { // 鼠标刚进入没有值，说明是第一次进入
        if (!val) {
          return false
        }
      }  
      if (this.recordValue === val) {
        return false
      }
      if (this.recordValue) { // 鼠标进入有值，说明不是第一次进入
        if (!val) { // 说明值被清空 那么因该删除当前属性名中的属性值，并且删除table关于他的行
          this.testMutiData = deleteObjArrayItem(this.testMutiData, fatherLabel, this.recordValue)
          deleteTableContent(this.form.tableData, fatherLabel, this.recordValue, valueList, this.form.variantAttributeData)
          if (!this.testMutiData[fatherLabel].length) { // 如果当前属性名的数值被删除完了
            this.$delete(this.testMutiData, fatherLabel) // 那么这个属性也要删除
            this.tableHeadList = this.tableHeadList.filter(ele => ele !== fatherLabel) // 当前的表头也要把这个属性名删除
          }  
          this.$forceUpdate()
          return // 直接不往面走了
        } else if (this.recordValue === val) { // 鼠标离开和进入的值一样，那就什么都不做
          return
        } else { // 离开的值和进入的值不一样，说明是修改，那么就应该将当前属性名中的属性值进行更改
          if (this.testMutiData[fatherLabel]) { // 填写的值需要判断当前有没有这个属性，没有直接不走，去下面创建
            if (this.testMutiData[fatherLabel].indexOf(val) !== -1) { // 判断当前填写的属性值在当前属性下有没有重复的
              valList.val = this.recordValue // 用之前的填写的值将当前的替换避免错误
              this.$message({
                type: 'warning',
                message: '不要填写重复的值噢'
              })
              return false
            }
            let flag = true
            this.form.tableData.forEach(item => {
              if (item[fatherLabel] === this.recordValue) {
                flag = false
                return 
              }
            })
            if (!flag) {
              let index = this.testMutiData[fatherLabel].indexOf(this.recordValue) // 找到之前属性值的下标
              this.testMutiData[fatherLabel][index] = val // 用现在的属性值将之前的属性值进行替换
              // console.log(this.testMutiData)
              this.form.tableData.forEach(ele => {
                for (let key in ele) {
                  if (key === fatherLabel && ele[fatherLabel] === this.recordValue) {
                    ele[fatherLabel] = val
                  }
                }
              })
              this.$forceUpdate()
              return
            }       
          }        
        }
      } else { /* 第一次进入有重复的 */
        if (this.testMutiData[fatherLabel]) {
          if (this.testMutiData[fatherLabel].indexOf(val) !== -1) { // 判断当前填写的属性值在当前属性下有没有重复的
            valList.val = this.recordValue // 用之前的填写的值将当前的替换避免错误
            this.$message({
              type: 'warning',
              message: '不要填写重复的值噢'
            })
            return false
          }
        }     
      }
      if (Object.prototype.hasOwnProperty.call(this.testMutiData, fatherLabel)) {       
        this.testMutiData[fatherLabel].push(val);
      } else {
        this.testMutiData[fatherLabel] = [val];
      }
      const result = getMutiData(this.testMutiData)
      if (result.length < this.productAndSku.length) {
        let length = this.productAndSku.length - result.length
        this.productAndSku.splice(0, length)
      }
      let data = {
        num: result.length,
        sku_arr: this.productAndSku
      }
      getSkuCode(data).then(res => {
         setTimeout(() => {
            result.forEach((item, index, arr) => {
              item.sku = res.data[index].sku
              item.product_sku = res.data[index].product_sku
              item.attr_price =  res.data[index].attr_price 
              item.quantity =  res.data[index].quantity
              item.barcode = 'does not apply'    
            })
            this.form.tableData = result
          }, 100)    
      })
      this.form.variantAttributeData.forEach(ele => {
          if (ele.name === this.form.attributesSelect) {   // 如果当前的新增的自定义属性名称相同    
              if (this.getSameNum(val, ele.valueList) >= 2 && val) { // 下面的自定义属性名称已有重复的 并且当前已经输入了值
                  let hash = {}; 
                  ele.valueList = ele.valueList.reduce((preVal, curVal) => {
                    hash[curVal.val] ? '' : hash[curVal.val] = true && preVal.push(curVal); 
                    return preVal 
                  }, [])
              } 
              // console.log(ele.valueList.filter(son => son.val))
              // ele.valueList.filter(son => son.val).forEach(item => {
              //     item.imagesList = []
              //     this.form.images.forEach(url => {
              //       item.imagesList.push({ url })
              //     })
              // })
              this.uploadList = ele.valueList.filter(son => son.val)
          }  
      })    
      if (this.getSameNameNum(item.name, this.tableHeadList) === 1) return false // 判断添加的头部有没有相同的
      this.tableHeadList.push(item.name)
    },
    // 双击单元格
    dubleClick(row, column, cell, event) {
      if (column.property !== 'attr_price' && column.property !== 'quantity') {
        return false
      }
      this.form.tableData.forEach(item => {
        item[column.property] = row[column.property]
      })
    },
    // 根据下拉框中的值遍历产生上传
    changeVariantVal(val) {
      this.form.variantAttributeData.forEach(item => {
          if (item.name === val) {
              // ele.valueList.filter(item => item.val).forEach(ele => {
              //     item.imagesList = []
              //     this.form.images.forEach(url => {
              //       item.imagesList.push({ url })
              //     })
              // })
              this.uploadList = item.valueList.filter(item => item.val)
          }
      })
      if (!val) {
        this.uploadList = []
      }
    },
    // 添加自定义属性按钮
    addAttr() {
      if (this.form.customizeAttr.length === 10) {
        return false
      }
      this.form.customizeAttr.push({
        name: "",
        value: ""
      });
    },
    // 删除属性
    deleteAttr(index) {
        // if (this.form.customizeAttr.length === 1 ) {
        //     return false
        // }
        this.form.customizeAttr.splice(index, 1)
    },
    //处理表删除
    handleTableDelete(index, data) {
      this.productAndSku = this.productAndSku.filter(item => item.sku !== data.sku)
      this.form.tableData.splice(index ,1)
    },
    // 添加运输方式
    addShipping() {
      this.form.internalGroup.push({
        shipping_type: "", //运输方式
        free_shipping: false, //免运费
        shipping_cost: "", //运费
        add_shipping_cost: "", //附加费用
      });
    },
    // 移除运输方式
    deleShipping(index, str) {
      if (str === 'in') {
          this.form.internalGroup.splice(index, 1)
      } else {
        this.form.internationalGroup.splice(index, 1)
      }
    },
    // 添加不运送地区
    addRestrictedArea() {
      if (this.form.site === null || this.form.site === '') {
        this.$message({
          message: "请先选择站点",
          type: "warning"
        });
        return false;
      }
      this.showAreaDialog = true
      this.$set(this.recordCurrent, "title", "添加不运送地区");
        this.$set(
        this.recordCurrent,
        "noShipping",
        this.form.unavailable_shipping_location
      );
    },
    areaPopupData(data) {
      let arr = [];
      if (data) {
        data.forEach(item => {
        arr.push(item.value);
        });
        this.form.unavailable_shipping_location = arr.join("|");
      } else {
        this.form.unavailable_shipping_location = ''
      }
      this.showAreaDialog = false;
    },
    /* 确定添加 */
    submit_location() {
      
    },
    // 不运送地区弹窗回调
    cancel_modal_location() {
      this.modal_localtion = false
    },
    //选择分类
    chooseCategory(num) {
      if (this.form.site === null || this.form.site === '') {
        this.$message({
          message: "请先选择站点",
          type: "warning"
        });
        return false;
      }
      this.productNo = num
      this.flag = true
      this.getProduct1List()
    },
    confiromCategory(num) {
      if (!String(this.form.site)) {
        this.$message({
          message: "请先选择站点",
          type: "warning"
        });
        return false;
      }
      if (!this.form.categoryOne && !this.form.categoryTwo) {
        this.$message({
          message: "请输入分类ID",
          type: "warning"
        });
        return false;
      }
      if (num === '1') {
        if (this.product1.filter(item => item.id == this.form.categoryOne).length) {
          this.$message({
            type: 'warning',
            message: `已有重复类目`
          })
          return false
        }
        getEbayCate({ ebay_cate_id: this.form.categoryOne, site_id: this.form.site }).then(res => {
                if (JSON.stringify(res.data) !== '{}') {
                    let data = res.data
                    this.form.product1 = data.category_id
                    let product1Ids = ['']
                    product1Ids.push(...data.category_ids)
                    this.saveProduct1IdList[data.category_id] = JSON.parse(JSON.stringify(product1Ids))
                    this.saveProductNameList1[data.category_id] = JSON.parse(JSON.stringify(data.category_path))
                    this.product1.push({ id: data.category_id, label: data.category_name})
                }
                else {
                    this.$message({
                        type: 'warning',
                        message: `未找到类目`
                    })
                }
            })
      }
      if (num === '2') {
        if (this.product2.filter(item => item.id == this.form.categoryTwo).length) {
          this.$message({
            type: 'warning',
            message: `已有重复类目`
          })
          return false
        }
        getEbayCate({ ebay_cate_id: this.form.categoryTwo, site_id: this.form.site }).then(res => {
                if (JSON.stringify(res.data) !== '{}') {
                    let data = res.data
                    this.form.product2 = data.category_id
                    let product2Ids = ['']
                    product2Ids.push(...data.category_ids)
                    this.saveProduct2IdList[data.category_id] = JSON.parse(JSON.stringify(product2Ids))
                    this.saveProductNameList2[data.category_id] = JSON.parse(JSON.stringify(data.category_path))
                    this.product2.push({ id: data.category_id, label: data.category_name})
                }
                else {
                    this.$message({
                        type: 'warning',
                        message: `未找到类目`
                    })
                }
            })
      }
      
    },
    chooseShops(num) {
      if (this.form.site === null || this.form.site === ''|| this.form.shop === null || this.form.shop === '') {
        this.$message({
          message: "请先选择站点和店铺",
          type: "warning"
        });
        return false;
      }
      this.shopsNo = num
      this.flag = false
      this.getShopClassList()
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
        this.form.listing_duration = 1
      }
      if (e === 1) {
        this.showFixedPrice = true;
        this.showQuantityInStock = true;
        this.showBargain = true;
        this.showWholesale = true;
        this.form.listing_duration = 0
      }
      if (e === 2) {
        this.showVariant = true;
        this.form.listing_duration = 0
      }
    },
    // 图片上传之前的钩子
    beforeUpload(file) {
      if (this.form.images.length === 12) {
          Loading.service({ fullscreen: true }).close();
          return false
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
      let isSmall = file.size / 1024 > 10
      let islarge = file.size / 1024 > 10240 
      if (!isSmall || islarge) {
        this.$message({
          message: "file 必须介于 10 - 10240 KB 之间",
          type: "error"
        });
        return false;
      }
      Loading.service({ fullscreen: true, text: "图片上传中，请稍后" });
    },
    // 图片上传之后的钩子
    onSuccess(response, file, fileList) {   
      this.form.images.push(response.data.file);
      if (this.form.images.length > 12) {
          this.form.images.splice(11, this.form.images.length - 12)
      }
      Loading.service({ fullscreen: true }).close();
    },
    // 上传失败
    uploadError(err, file, fileList) {
      this.$message({
          message: err.msg,
          type: "error"
        });
        return false;
    },
    // 变种类型上传图片
    beforeUplaodAttr(file, item) {
      if (item.imagesList.length === 12) {
          Loading.service({ fullscreen: true }).close();
          return false
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
      let isSmall = file.size / 1024 > 10
      let islarge = file.size / 1024 > 10240 
      if (!isSmall || islarge) {
        this.$message({
          message: "file 必须介于 10 - 10240 KB 之间",
          type: "error"
        });
        return false;
      }
      Loading.service({ fullscreen: true, text: "图片上传中，请稍后" });
    },
    // 
    // 自定义属性上传图片
    uplaodSuccessAttr(response, file, fileList, item) {
        let obj = { url: response.data.file }
        item.imagesList.push(obj)
      if (item.imagesList.length > 12) {
          item.imagesList.splice(11, item.imagesList.length - 12)
      }
      Loading.service({ fullscreen: true }).close();
    },
    // 删除图片
    productInfoRemove(index) {
      this.form.images.splice(index, 1);
    },
    handlePictureCardPreview(src) {
      window.open(src)
    },
    // 删除属性中的图片
    productInfoRemoveUploadList(list, index) {
      list.splice(index, 1)
    },
    // 一键下载
    downloadImages(spu) {
      if (!spu) {
        this.$message({
          type: 'warning',
          message: `当前没有与商品中心的spu进行关联或者你没有填写spu`
        })
        return false
      }
      downloadImagesApi({spu}).then(res => {
        download(res, 'Images.zip')
      })
    },
    confirmPastePath() { 
      if (!this.picturePasteInput) {
        this.$message({
          type: 'warning',
          message: '请输入图片地址'
        })
        return false
      }
      let index = this.picturePasteInput.lastIndexOf('.') // 获取最后一个点的位置
      let imgStr = this.picturePasteInput.substr(index + 1); // 获取最后一个点后面的文本
      if (imgStr !== 'jpg' && imgStr !== 'jpeg' && imgStr !== 'png') {
        this.$message({
          type: 'warning',
          message: '请输入正确的图片地址'
        })
        return false
      }
      this.form.images.push(this.picturePasteInput);
    },
    // 全选国家
    handleCheckAllChange(item) {
      item.shipping_location.forEach(location => {
        location.select = true
      });
    },
    // 国外全球选择
    foreignGlobalChange(item, e) {
      console.log(e)
      console.log(1111)
      item.global = e;
      if (item.global) {
        item.shipping_location.forEach(c => {
          this.$set(c, "select", false);
        });
      }
      this.$forceUpdate()
      console.log(this.form.internationalGroup )
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
<style src="@/styles/listing_scoped.scss" lang="scss" scoped>
</style>
<style src="@/styles/listing.scss" lang="scss">
  // @import '@/styles/listing.scss'
</style>