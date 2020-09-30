<template>
    <div class="chart-container">
        <el-form
            :inline="true"
            :model="form"
            ref="form"
            :rules="rules"
            class="demo-form-inline"
            label-width="135px"
        >
            <div class="form_content">
                <div class="item-title">
                    <span id="content-0">基础信息</span>
                </div>
                <div>
                    <div>
                        <el-form-item label="店铺:" prop="shop">
                            <el-select v-model="form.shop" filterable placeholder="请选择店铺">
                                <el-option
                                    v-for="item in shopList"
                                    :key="item.shop_id"
                                    :label="item.shop_name"
                                    :value="item.shop_id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label class="check_form_content" v-if="showCites">
                            <span>同步发布到其他站点:</span>
                            <el-checkbox
                                :indeterminate="isIndeterminate"
                                v-model="checkAll"
                                @change="handleCheckAllChange"
                                style="margin-right: 15px"
                            >全选</el-checkbox>
                            <el-checkbox-group
                                v-model="checkedCities"
                                @change="handleCheckedCitiesChange"
                            >
                                <el-checkbox
                                    v-for="city in siteList"
                                    :label="city"
                                    :key="city"
                                >{{city}}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </div>
                    <div>
                        <div class="no-select-group">
                            <el-form-item label="分类:" prop="classCategory">
                                <el-select v-model="form.classCategory" placeholder="请选择分类">
                                    <el-option
                                        :value="item.id"
                                        :label="item.label"
                                        v-for="item in productList"
                                        :key="item.id"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button
                                    type="primary"
                                    class="btn_button"
                                    @click="selectClassCategory(form.shop)"
                                >选择分类</el-button>
                            </el-form-item>
                        </div>
                        <div class="no-select-group">
                            <el-form-item label="  ">
                                <div class="product_name" v-if="form.classCategory">
                                    <span
                                        v-for="(item, index) in saveProductNameList[form.classCategory]"
                                        :key="index"
                                    >
                                        {{item}}
                                        <i
                                            class="el-icon-arrow-right"
                                            v-if="index !== saveProductNameList[form.classCategory].length -1"
                                        ></i>
                                    </span>
                                </div>
                            </el-form-item>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form_content">
                <div class="item-title">
                    <span id="content-1">产品信息</span>
                </div>
                <product-form-list
                    :form="form"
                    :lazada_product_info="lazada_product_info"
                    :brandList="brandList"
                />
            </div>
            <div class="form_content">
                <div class="item-title">
                    <span id="content-2">分类信息</span>
                </div>
                <div>
                    <form-list :lazadaAttrsList="lazadaAttrsList" />
                </div>
            </div>
            <div class="form_content">
                <div class="item-title">
                    <span id="content-3">包装信息</span>
                </div>
                <div>
                    <div>
                        <el-form-item label="税:" prop="tax">
                            <el-select v-model="form.tax" placeholder>
                                <el-option
                                    :value="item.value"
                                    :label="item.label"
                                    v-for="item in taxList"
                                    :key="item.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="包装重量:" prop="weight">
                            <div class="add_laiyuan baozhuang">
                                <el-input
                                    placeholder="kg"
                                    v-model="form.weight"
                                    oninput="value=value.replace(/[^0-9.]/g,'')"
                                >
                                    <template slot="append">kg</template>
                                </el-input>
                            </div>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="包装尺寸:" prop="length">
                            <div class="add_laiyuan baozhuang">
                                <el-input
                                    placeholder="长"
                                    v-model="form.length"
                                    oninput="value=value.replace(/[^0-9.]/g,'')"
                                >
                                    <template slot="append">cm</template>
                                </el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label prop="width">
                            <div class="add_laiyuan baozhuang">
                                <el-input
                                    placeholder="宽"
                                    v-model="form.width"
                                    oninput="value=value.replace(/[^0-9.]/g,'')"
                                >
                                    <template slot="append">cm</template>
                                </el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label prop="height">
                            <div class="add_laiyuan baozhuang">
                                <el-input
                                    placeholder="高"
                                    v-model="form.height"
                                    oninput="value=value.replace(/[^0-9.]/g,'')"
                                >
                                    <template slot="append">cm</template>
                                </el-input>
                            </div>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="包装内容:" prop="packagingContent">
                            <div class="add_laiyuan baozhuang">
                                <el-input
                                    v-model="form.packagingContent"
                                    style="min-height: 140px;width: 660px"
                                    clearable
                                    maxlength="1000"
                                    :autosize="{ minRows: 6, maxRows: 6}"
                                    type="textarea"
                                    resize="none"
                                    placeholder
                                ></el-input>
                                <span class="strnum">{{ packagingContentlength }}</span>
                            </div>
                        </el-form-item>
                    </div>
                </div>
            </div>
            <div class="form_content">
                <div class="item-title">
                    <span id="content-4">变种信息</span>
                </div>
                <div>
                    <variant-info-table
                        @settingPrice="settingPrice"
                        @changeColorFamily="changeColorFamily"
                        :headTableProAttr="headTableProAttr"
                        :showSeetingprice="checkedCities.length"
                        :lazadaTableHead="lazadaTableHead"
                        @settingInfo="settingInfo"
                        :showCites="showCites"
                        @deleteCell="deleteCell"
                        :tableList="tableList"
                        
                    />
                </div>
            </div>
            <div class="form_content">
                <div class="item-title">
                    <span id="content-5">变种缩略图</span>
                </div>
                <div>
                    <variant-thumbnail
                        :variantThumbnailList="variantThumbnailList"
                        @clearVariantThumbnaiList="clearVariantThumbnaiList"
                        @changeVariantThumbnaiList="changeVariantThumbnaiList"
                    />
                </div>
            </div>
            <div class="form_content">
                <div class="item-title">
                    <span id="content-6">变种图片</span>
                </div>
                <div>
                    <variant-picture
                        :variantPictureList="variantPictureList"
                        @change-image-path="changeImagePath"
                        :lazadaTableHead="lazadaTableHead"
                    />
                </div>
            </div>
            <div class="form_content">
                <div class="item-title">
                    <span id="content-7">描述信息</span>
                    <div>
                        <span>选择模板:</span>
                        <el-select v-model="form.template" placeholder="请选择模板">
                            <el-option
                                :value="item.id"
                                :label="item.name"
                                v-for="item in templateList"
                                :key="item.id"
                            ></el-option>
                        </el-select>
                    </div>
                </div>
                <div>
                    <div>
                        <el-form-item label="产品描述:">
                            <tinymce
                                v-model="form.proDescription"
                                :height="300"
                                :width="1100"
                                ref="content"
                            />
                            <p class="description">说明：描述区图片尺寸需小于5000x5000，图片大小不能超过3M!</p>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="短描述:" prop="shortDescription">
                            <tinymce v-model="form.shortDescription" :height="300" :width="1100" />
                            <!-- <span class="red_rule" v-if="showShortDescriptionRule">请填写短描述</span> -->
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="视频URL:">
                            <el-input style="width: 1100px" v-model="form.videoURL" />
                        </el-form-item>
                    </div>
                </div>
            </div>
            <div style="text-align: center" class="fixed_button">
                <el-form-item class="btn-group no-border-btn-group">
                    <el-button
                        type="success"
                        class="btn_button_primary"
                        @click="subimitForm('form')"
                    >发布</el-button>
                    <el-button class="btn_button_primary" @click="cancel('form')">取消</el-button>
                </el-form-item>
            </div>
        </el-form>
        <ul class="navs">
            <li
                :class="{active: active=== index}"
                v-for="(mod,index) in modules"
                :key="mod.id"
                @click="returnTop(`#content-${index}`,index)"
            >{{mod.name}}</li>
        </ul>
        <transition name="el-fade-in-linear">
            <setting-site-price-modal
                v-if="modal_settingPrice"
                :form="priceForm"
                ref="settingPrice"
                @action-modal-content="confirmSettingPriceContent"
                @search="search"
                :modal_settingPrice="modal_settingPrice"
                :list="formList"   
            />
        </transition>
        <transition name="el-fade-in-linear">
            <setting-info-modal
                v-if="modal_info"
                :form="moreTableInfo"
                :modal_info="modal_info"
                @action-modal-content="confirmSettingInfo"
            />
        </transition>
        <el-dialog
            title="选择分类"
            :visible.sync="modal_product"
            width="70%"
            :before-close="cancel_product"
            :close-on-click-modal="false"
        >
            <category-class
                :saveProductName="saveProductName"
                :categoryLevelList="categoryLevelList"
                :savedActiveIndex="savedActiveIndex"
                :shopId="form.shop"
                @showChildren="showChildren"
                :showSearchInput="showSearchInput"
                ref="categoryClass"
                @selectLi="selectLi"
                :list="categoryList"
                @doSearch="doSearch"
            />
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submit_product">确定</el-button>
                <el-button @click="cancel_product">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {
    message,
    loading,
    loadingClose,
    clearObjValue,
    lazadaRequiredWord,
    dateFormat,
    getAfterOneYear,
} from "@/utils/common";
import { getSkuInfo } from "@/api/listOfSelections";
import { getCategoryAttr, getSkuPrice } from "@/api/listing";
import { Mixins, createListingMixins } from "@/mixins/listing.js";
let priceReg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
let weightReg = /(^[1-9]\d*(\.\d{1,3})?$)|(^0(\.\d{1,3})?$)/;
export default {
    name: "ListOfSelectionsEdit",
    mixins: [Mixins, createListingMixins],
    data(){
        return{
            show:true
        }
    },
    watch: {
        "form.classCategory": {
            handler(val) {
                if (this.form.shop) {
                    let query = {
                        shop_id: this.form.shop,
                        lazada_category_id: val,
                    };
                    this.getCategoryAttr(query);
                }
            },
        },
        "form.shop": {
            handler(val) {
                let obj = this.shopList.filter((ele) => ele.shop_id === val)[0];
                if (obj.site_code === "MY") {
                    this.checkAll = true;
                    this.checkedCities = this.siteList;
                    this.showCites = true;
                    let params = {
                        sku_ids: this.tableList.map((item) => item.product_sku),
                        shop_id: val,
                        site_code: this.checkedCities,
                    };
                    this.global_price_quantity_info = {}; /* global_price_quantity_info已经从vuex取出来的后段返回，不在是前端本地存储，可以注释该段代码 */
                    this.flag = true;
                    this.$store.dispatch(
                        "listOfSelections/getSitePrice",
                        params
                    );
                } else {
                    this.showCites = false;
                }
                if (this.tableList.length) {
                    this.getSkuPrice(val);
                }
                if (this.form.classCategory) {
                    let query = {
                        lazada_category_id: this.form.classCategory,
                        shop_id: val,
                    };
                    this.getCategoryAttr(query);
                }
                if (this.global_gross_margin_info) {
                    for (let key in this.global_gross_margin_info) {
                        this.global_gross_margin_info[key] = 20;
                    }
                }
            },
        },
    },
    beforeRouteLeave(to, from, next) {
        this.$store.commit("listOfSelections/CLEAR_siteListPrice");
        this.$store.commit("listOfSelections/CLEAR_global_price_quantity_info");
        next();
    },
    methods: {
        cancel() {
            this.$router.push("/productListing/listOfSelections");
        },

        /* 发布 */
        subimitFormSave(formName) {
            // this.saveFormFunc(formName);
        },
        /* 保存 */
        subimitForm(formName) {
            this.saveFormFunc(formName);
        },
        /* 发布保存公共函数 */
        saveFormFunc(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let flag = true; // 变种信息中定死的属性
                    let flagAttr = true; // 变种信息中动态属性
                    let specialTimeFlag = true; /* 变种属性中的促销时间 */
                    let timeLimitFlag = true;
                    let priceTimeFlag = true;
                    if (this.form.product_title.length > 255) {
                        message("warning", "产品标题的字段最多只能是255个字符");
                        return;
                    }
                    this.tableList.forEach((item) => {
                        if (!item.sku || !item.quantity || !item.price) {
                            flag = false;
                            return;
                        }
                        this.lazadaTableHead.forEach((ele) => {
                            for (let key in item) {
                                if (
                                    ele.attr_label === key &&
                                    ele.is_mandatory === 1
                                ) {
                                    if (!item[key]) {
                                        flagAttr = false;
                                    }
                                }
                            }
                        });
                        if (
                            item.special_price &&
                            !priceReg.test(item.special_price)
                        ) {
                            priceTimeFlag = false;
                        }
                        if (
                            (item.special_to_date && !item.special_from_date) ||
                            (!item.special_to_date && item.special_from_date)
                        ) {
                            specialTimeFlag = false;
                        }
                        if (item.special_to_date && item.special_from_date) {
                            if (
                                new Date(item.special_to_date).getTime() <
                                    new Date() ||
                                new Date(item.special_from_date).getTime() ===
                                    new Date(item.special_to_date).getTime()
                            ) {
                                timeLimitFlag = false;
                                return;
                            }
                            item.special_to_date = dateFormat(
                                item.special_to_date
                            );
                            item.special_from_date = dateFormat(
                                item.special_from_date
                            );
                        }
                    });

                    if (!flag || !flagAttr) {
                        message("warning", "变种信息中带红*的都为必填项");
                        return;
                    }
                    if (!lazadaRequiredWord(this.lazadaAttrsList)) {
                        message("warning", "分类信息中带红*的都为必填项");
                        return;
                    }
                    if (!specialTimeFlag) {
                        message(
                            "warning",
                            "变种信息中促销时间不能只填单个时间"
                        );
                        return;
                    }
                    if (!timeLimitFlag) {
                        message(
                            "warning",
                            "变种信息中促销结束时间必须大于当前时间,并且起止时间不能相同"
                        );
                        return;
                    }
                    if (
                        !this.tableList.every((item) =>
                            priceReg.test(item.price)
                        ) ||
                        !priceTimeFlag
                    ) {
                        message(
                            "warning",
                            "变种信息中价格和促销价只能是整数或者保留两位小数"
                        );
                        return;
                    }
                    // if ()
                    // return
                    let fromListObj = {}; // 分类信息
                    this.lazadaAttrsList.forEach((item) => {
                        fromListObj[item.attr_label] = item.value;
                    });

                    let data = {
                        shop_id: this.form.shop,
                        lazada_category_id: this.form.classCategory,
                        global_site_code_info: this.showCites
                            ? this.checkedCities
                            : [],
                        name: this.form.product_title,
                        model: this.form.model,
                        warranty_type: this.form.type,
                        variant_image: this.variantPictureList /* 变种图 */,
                        name_ms: this.form.product_title_malai,
                        brand: this.form.brand,
                        category_attr: fromListObj /* 分类信息 */,
                        product_attrs: this.headTableProAttr,
                        package_weight: this.form.weight,
                        package_length: this.form.length,
                        package_width: this.form.width,
                        package_height: this.form.height,
                        package_include: this.form.packagingContent,
                        tax_class: this.form.tax,
                        sku_info: this.tableList,
                        sku_attrs: this.lazadaTableHead,
                        thumbnail: this.variantThumbnailList,
                        lazada_product_description: this.form.proDescription,
                        lazada_short_description: this.form.shortDescription,
                        video: this.form.videoURL,
                    };
                    console.log(this.global_price_quantity_info, 878787);
                    console.log(this.fromListObj);
                   
                    if (
                        this.showCites &&
                        this.checkedCities.length &&
                        JSON.stringify(this.global_price_quantity_info) !== "{}"
                    ) {
                        let obj = {};
                        for (let key in this.global_price_quantity_info) {
                            obj[key] = this.global_price_quantity_info[
                                key
                            ].filter((item) =>
                                this.checkedCities.includes(item.site_code)
                            ); /* 根据当前的站点过滤掉价格信息中不存在的站点 */
                            /* 如果用户在改变站点的时候，同时又去设置了价格，导致价格信息中的站点出现变化，那么在保存的时候，就少了之前选的站点，而别的sku没有设置，依然是原始数据 */
                            // this.checkedCities.filter(item => )
                            let list = [];
                            list = this.global_price_quantity_info[key].map(
                                (item) => item.site_code
                            );
                            this.checkedCities
                                .filter((item) => !list.includes(item))
                                .forEach((ele) => {
                                    obj[key].push({
                                        site_code: ele,
                                        special_price: "",
                                        price: "",
                                        gross_margin: "",
                                    });
                                });
                        }
                        data.global_price_info = obj; /* 六合一价格数组 */
                    }
                    console.log(data, "我是data");
                    this.$store.dispatch("listOfSelections/saveSkuInfo", {
                        data,
                        flag: true,
                    });
                } else {
                    message("warning", "请填写必填信息");
                    return false;
                }
            });
        },
        async getSkuInfoFunc(query) {
            loading();

            await getSkuInfo(query)
                .then((res) => {
                    try {
                        let data = res.data;
                        if (data.lazada_category_ids.length) {
                            let product1Ids = [""];
                            product1Ids.push(...data.lazada_category_ids);
                            this.saveProductIdList[
                                data.category_history_id
                            ] = product1Ids;
                            this.saveProductNameList[data.category_history_id] =
                                data.lazada_category_path;
                            this.productList = [
                                {
                                    id: data.category_history_id,
                                    label:
                                        data.lazada_category_path[
                                            data.lazada_category_path.length - 1
                                        ],
                                },
                            ];
                            this.form.classCategory = data.category_history_id;
                        }
                        // this.form.brand = data.product_brand ? data.product_brand : 'OEM'
                        if (data.product_weight < 0.02) {
                            data.product_weight = 0.02;
                        }
                        this.form.weight = data.product_weight;
                        //    console.log(data.product_weight)
                        this.form.product_title = data.pd_name;
                        this.headTableProAttr = data.product_attrs;

                        data.sku_info.forEach((item) => {
                            Reflect.set(item, "quantity", 6000);
                            Reflect.set(item, "special_from_date", new Date());
                            Reflect.set(
                                item,
                                "special_to_date",
                                getAfterOneYear()
                            );
                            // Reflect.set(item,'special_price','');
                            Reflect.set(item, "bracode", "1");
                            Reflect.set(item, "package_length", "");
                            Reflect.set(item, "package_width", "");
                            Reflect.set(item, "package_weight", "");
                            Reflect.set(item, "package_height", "");
                            Reflect.set(item, "note", "1");
                        });
                        this.form.proDescription =
                            data.lazada_product_description;
                        this.form.shortDescription =
                            data.lazada_short_description;
                        this.tableList = data.sku_info;
                        this.variantPictureList = data.variant_image;
                        loadingClose();
                    } catch (err) {
                        loadingClose();
                        throw new Error(err);
                    }
                })
                .catch((err) => {
                    loadingClose();
                });
        },
    },
    created() {
        // console.log(this,888888888)
        let query = { spu: this.$route.query.spu };
        this.getSkuInfoFunc(query);
        if (!this.form.model) this.form.model = this.$route.query.spu;
        
    },
};
</script>
<style lang="scss" scoped src='@/styles/listing-scoped.scss'></style>
<style lang="scss" src='@/styles/listing.scss'></style>
