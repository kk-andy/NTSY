<template>
    <div class="main list-of-selections margin10 check_radio">
        <el-card>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                    <span>搜索类型:</span>
                    <el-radio-group v-model="radio1">
                        <el-radio v-model="radio1" label="item ID" border>item ID</el-radio>
                        <el-radio v-model="radio1" label="规则名称" border>规则名称</el-radio>
                    <!-- <el-radio-button label="item ID"></el-radio-button>
                    <el-radio-button label="规则名称"></el-radio-button> -->
                    </el-radio-group>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                    </div>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="9" v-show="radio1 === 'item ID'">
                    <div class="grid-content bg-purple">
                    <span>搜索内容:</span>
                    <el-input v-model.trim="search.itemId" style="width: 350px" clearable placeholder="多个Item ID用逗号隔开" />
                    </div>
                </el-col>
                <el-col :span="9" v-show="radio1 === '规则名称'">
                    <div class="grid-content bg-purple">
                    <span>搜索内容:</span>
                    <el-input v-model.trim="search.name" style="width: 350px" clearable placeholder="请输入规则名称" />
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                    <span></span>
                    <el-button type="primary" @click="doFilter">搜索</el-button>
                    <el-button type="primary" @click="doReset">重置</el-button>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                    </div>
                </el-col>
            </el-row>
    </el-card>
    <div class="height_btn">
        <el-button type="primary" @click="doReset"  v-if="radio2 === '失败' ">重新处理</el-button>
    </div>
    <div class="button_group">
        <el-radio-group v-model="radio2">
            <el-radio v-model="radio2" label="全部" border>全部</el-radio>
            <el-radio v-model="radio2" label="成功" border>成功</el-radio>
            <el-radio v-model="radio2" label="失败" border>失败</el-radio>
            <el-radio v-model="radio2" label="处理中" border>处理中</el-radio>
        </el-radio-group>
    </div>
    <TableList :tableData="tableData" />
    </div>
</template>
<script>
import TableList from './components/dealListTable'
// import ChangePage from '@/components/page'
// import operationLog from '@/components/operationLog'
// import { clearObjValue, dateFormatT } from '@/utils/common.js'
// import { mixin  } from '@/mixins/common'
// import { mapState, mapGetters, mapActions } from 'vuex'
export default { 
    data() {
        return {
            search: {
                itemId: '',
                name: ''
            }, 
            radio1: '规则名称',
            radio2: '全部',
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
    & > div:nth-child(1) {
        .row-bg:nth-child(1) {
            margin-bottom: 15px;
        }
    }
    .button_group {
        margin-bottom: 25px;
    }
    .height_btn {
        height: 36px;
        margin-bottom: 10px;
    }
}

</style>
<style lang="scss">
.check_radio {
    .el-radio-group {
            .el-radio {
                min-width: 110px;
                // label {
                    .el-radio__input {
                        display: none;
                    }
                // }
            }
            .el-radio.is-bordered.is-checked {
                background-color: #1890ff;
                span {
                    color: #fff;
                }
            }
    }
}
</style>