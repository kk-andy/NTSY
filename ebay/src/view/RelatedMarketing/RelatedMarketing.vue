<template>
    <div class="main list-of-selections margin10">
        <el-card>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                    <span>上架店铺:</span>
                    <el-select v-model="search.listing_shop" clearable filterable  placeholder="请选择">
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
                    <span>店铺账号:</span>
                    <el-input v-model.trim="search.title" style="width: 300px" clearable placeholder="请输入(模糊搜索)" />
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                    <span></span>
                    <el-button type="primary" @click="doFilter">搜索</el-button>
                    <el-button type="primary" @click="doReset">重置</el-button>
                    </div>
                </el-col>
            </el-row>
    </el-card>
    <div class="button_group">
        <div class="pull-left">
            <span class="fWhite bgColorJ pLeft10 pRight5">说明!</span>
            <span class="fColor2">当一个产品同时属于多个规则时，优先执行级别较高的规则</span>
        </div>
        <el-button type="primary" @click="doReset">创建关联营销</el-button>
    </div>
    <TableList :tableData="tableData" />
    </div>
</template>
<script>
import TableList from './components/table'
// import ChangePage from '@/components/page'
// import operationLog from '@/components/operationLog'
// import { clearObjValue, dateFormatT } from '@/utils/common.js'
// import { mixin  } from '@/mixins/common'
// import { mapState, mapGetters, mapActions } from 'vuex'
export default { 
    data() {
        return {
            search: {
                sku: '',
                title: '',
                platform: '',
                research_platform: '',
                listing_shop: '',
                product_line: '',
                keyword: '',
                offShelvesShop: '',
                sku_create_time: ['2020-06-10', new Date() ],
                isStopSale: '',
                isListing: '',
            }, 
            tableData: [{ quantity: 3}],
            shopList: []
        }
    },
    components: {
        TableList
    },
    methods: {
        doFilter() {

        },
        doReset() {

        },
        /* 获取数据 */
        getData() {
            // let params = {
            //     sku: this.search.sku,
            //     sku_name: this.search.title,
            //     cat_id: this.search.product_line,
            //     shop_id: this.search.listing_shop,
            //     is_publish: this.search.isListing,
            //     recommend_platform: this.search.platform,
            //     research_platform: this.search.research_platform,
            //     not_shop_id: this.search.offShelvesShop,
            //     done_at_start: this.search.sku_create_time  ? dateFormatT(this.search.sku_create_time).start : '',
            //     done_at_end: this.search.sku_create_time  ? dateFormatT(this.search.sku_create_time).end : '',
            //     core_word: this.search.keyword,
            //     sale_state: this.search.isStopSale,
            //     per_page_num: this.page.size,
            //     page: this.page.currentPage
            // }
            // this.$store.dispatch('listOfSelections/getData', params)
        },
        // ...mapActions(['getShopList', 'getProductLine'])
    },
    created() {
        // let id = this.$getMenuId(  sessionStorage.getItem("munuIdList"),this.$route.path);
        // this.$store.dispatch('listOfSelections/getButtonList', { id })
        // this.getShopList()
        // this.getProductLine()
        // this.getData()
    }
}
</script>
<style scoped lang="scss">
.margin10 {
    .button_group {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 25px;
        .pull-left {
            // display: flex;
            span {
                font-size: 13px;
            }
            & > span:nth-child(1) {
                background-color:rgb(0, 153, 153);
                box-sizing:border-box;
                color:rgb(255, 255, 255);
                padding: 0 10px;
            }
            & > span:nth-child(2) {
                color: #999;;
            }
        }
    }
}

</style>