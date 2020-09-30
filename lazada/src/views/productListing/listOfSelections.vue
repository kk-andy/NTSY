<template>
    <div class="main">
        <el-card>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>SKU:</span>
                        <el-input
                            type="textarea"
                            resize="none"
                            v-model="search.sku"
                            clearable
                            :placeholder="placeholder"
                            @keyup.enter.native="doFilter"
                        />
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>SPU:</span>
                        <el-input
                            type="textarea"
                            resize="none"
                            v-model="search.spu"
                            clearable
                            :placeholder="placeholder"
                            @keyup.enter.native="doFilter"
                        />
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>标题:</span>
                        <el-input
                            v-model="search.title"
                            clearable
                            placeholder="请输入(模糊搜索)"
                            @keyup.enter.native="doFilter"
                        />
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>开发人:</span>
                        <el-select
                            v-model="search.developer_id"
                            multiple
                            clearable
                            filterable
                            placeholder="请选择(模糊搜索)"
                        >
                            <el-option
                                v-for="item in DevelperList"
                                :key="item.staff_id"
                                :label="item.staff_name"
                                :value="item.staff_id"
                            ></el-option>
                        </el-select>
                    </div>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>产品线:</span>
                        <el-select
                            v-model="search.product_line"
                            clearable
                            filterable
                            placeholder="请输入(单选)"
                        >
                            <el-option
                                v-for="item in productLineList"
                                :key="item.id"
                                :label="item.category_name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>二级品类:</span>
                        <el-select
                            v-model="search.Two_line_id"
                            multiple
                            clearable
                            filterable
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="item in ProductTwoLine"
                                :key="item.id"
                                :label="item.category_name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>上架店铺:</span>
                        <el-select
                            v-model="search.listing_shop"
                            clearable
                            filterable
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="item in shopList"
                                :key="item.shop_id"
                                :label="item.shop_name"
                                :value="item.shop_id"
                            ></el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>是否已刊登:</span>
                        <el-select v-model="search.isListing" clearable placeholder="请选择">
                            <el-option
                                v-for="item in isList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <!-- <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>是否已刊登:</span>
                        <el-select v-model="search.isListing" clearable placeholder="请选择">
                            <el-option
                                v-for="item in isList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                </el-col>-->
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>推荐平台:</span>
                        <el-select v-model="search.platform" filterable clearable placeholder="请选择">
                            <el-option
                                v-for="item in platform"
                                :key="item.id"
                                :label="item.value"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>调研平台:</span>
                        <el-select
                            v-model="search.research_platform"
                            filterable
                            clearable
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="item in platform"
                                :key="item.id"
                                :label="item.value"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>关键词:</span>
                        <el-input v-model="search.keyword" clearable placeholder="请输入关键词" />
                    </div>
                </el-col>
               <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>是否侵权:</span>
                        <el-select v-model="search.isTort" clearable placeholder="请选择">
                            <el-option
                                v-for="item in isTort"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                </el-col>
            
            </el-row>
            
            <el-row>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>是否在售:</span>
                        <el-select v-model="search.isStopSale" clearable placeholder="请选择">
                            <el-option
                                v-for="item in isList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>未上架店铺:</span>
                        <el-select
                            v-model="search.offShelvesShop"
                            multiple
                            filterableclearableplaceholder="请选择"
                        >
                            <el-option
                                v-for="item in shopList"
                                :key="item.shop_id"
                                :label="item.shop_name"
                                :value="item.shop_id"
                            ></el-option>
                        </el-select>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <span>SKU生成时间:</span>
                        <el-date-picker
                            v-model="search.sku_create_time"
                            type="datetimerange"
                            style="width: 375px"
                            :editable="false"
                            clearable
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                        ></el-date-picker>
                    </div>
                </el-col>
                <el-col :span="4" class="no-span">
                    <search-btn-group @doFilter="doFilter" @doReset="doReset" />
                </el-col>
            </el-row>
        </el-card>
        <div class="btn_group"></div>
        <checke-set  @passClo="passClo" /> 
        <table-list
            :tableData="tableData"
            @edit="edit"
            :showEdit="showButtons.edit"
            :ColList="ColList"
        />
        <change-page
            :page="page"
            :total="total"
            @handleCurrentChange="handleCurrentChange"
            @handleSizeChange="handleSizeChange"
        />
    </div>
</template>
<script>
import CheckeSet from "./components/listOfSelectionsCheckebox";
import TableList from "./components/listOfSelectionsTable";
import ChangePage from "@/components/page";
import operationLog from "@/components/operationLog";
import { clearObjValue, dateFormatT } from "@/utils/common.js";
import { mixin } from "@/mixins/common";
import { getSesstionToken, getAppID } from "@/utils/auth";
import { mapState, mapGetters, mapActions } from "vuex";
let startTime = new Date(new Date().getTime() - 7 * 24 * 3600 * 1000);
export default {
    components: { TableList, ChangePage, operationLog, CheckeSet },
    mixins: [mixin],
    watch: {
        "search.product_line": {
            handler(val) {
                this.$store.dispatch("listOfSelections/getProductTwoLine", {
                    id: val,
                });
                this.search.Two_line_id = [];
            },
        },
    },
    computed: {
        ...mapGetters([
            "isTort",
            "isList",
            "placeholder",
            "shopList",
            "platform",
            "productLineList",
            "DevelperList",
            "lazadaURL",
        ]),
        ...mapState({
            total: (state) => state.listOfSelections.total,
            tableData: (state) => state.listOfSelections.tableData,
            creatorList: (state) => state.listOfSelections.creatorList,
            showButtons: (state) => state.listOfSelections.showButtons,
            ProductTwoLine: (state) => state.listOfSelections.ProductTwoLine,
        }),
    },
    data() {
        return {
            search: {
                sku: "",
                title: "",
                platform: "",
                research_platform: "",
                listing_shop: "",
                product_line: "",
                keyword: "",
                offShelvesShop: "",
                sku_create_time: [startTime, new Date()],
                isStopSale: "",
                isListing: "",
                Two_line_id: "",
                spu: "",
                developer_id: [],
                isTort:""
            },
            ColList: [],
        };
    },
    methods: {
        /* 编辑 */
        edit(spu) {
            let url = `${
                this.lazadaURL
            }/productListing/listOfSelectionsEdit?spu=${spu}&token=${getSesstionToken()}&id=${getAppID()}`;
            window.open(url);
        },
        /* 获取数据 */
        getData() {
            let params = {
                sku: this.search.sku,
                sku_name: this.search.title,
                cat_id: this.search.product_line,
                shop_id: this.search.listing_shop,
                is_publish: this.search.isListing,
                recommend_platform: this.search.platform,
                research_platform: this.search.research_platform,
                not_shop_id: this.search.offShelvesShop,
                done_at_start: this.search.sku_create_time
                    ? dateFormatT(this.search.sku_create_time).start
                    : "",
                done_at_end: this.search.sku_create_time
                    ? dateFormatT(this.search.sku_create_time).end
                    : "",
                core_word: this.search.keyword,
                sale_state: this.search.isStopSale,
                is_tort: this.search.isTort,
                per_page_num: this.page.size,
                page: this.page.currentPage,
                cat_two_id: this.search.Two_line_id,
                developer_id: this.search.developer_id,
                spu: this.search.spu
                    ? this.search.spu.replace(/\n/g, ",").split(",")
                    : [],
            };
            this.$store.dispatch("listOfSelections/getData", params);
        },
        ...mapActions(["getShopList", "getProductLine", "getDevelperList"]),
        passClo(val) {
            this.ColList = val;
        },
    },
    beforeDestroy() {
        this.$store.commit("listOfSelections/CLEARProductTwoLine");
    },
    created() {
        let id = this.$getMenuId(
            sessionStorage.getItem("munuIdList"),
            this.$route.path
        );
        this.$store.dispatch("listOfSelections/getButtonList", { id });
        this.getShopList();
        this.getProductLine();
        this.getData();
        this.getDevelperList();
    },
    mounted() {
    },
};
</script>
<style lang="scss">
.no-span {
    .bg-purple {
        & > span {
            min-width: 0px !important;
            // min-width: 0px;
            display: inline-block;
        }
    }
}
</style>