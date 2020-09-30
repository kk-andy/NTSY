<template>
    <div class="main">
        <el-card>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="6" >
                    <div class="grid-content bg-purple">
                    <span>用户名:</span>
                    <!-- <el-input v-model.trim="search.templateName" placeholder="输入多个时请换行" /> -->
                    <el-select v-model="search.creator" clearable filterable  placeholder="请选择">
                        <el-option
                            v-for="item in sellerList"
                            :key="item.staff_id"
                            :label="item.staff_name"
                            :value="item.staff_id"
                        ></el-option>
                    </el-select>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                    <span>店铺名:</span>
                    <el-select v-model="search.shop" clearable filterable  placeholder="请选择">
                        <el-option
                            v-for="item in shopList"
                            :key="item.shop_id"
                            :label="item.shop_name"
                            :value="item.shop_id"
                        ></el-option>
                    </el-select>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                    <span>修改时间:</span>
                    <el-date-picker
                            v-model="search.create_time"
                            type="datetimerange"
                            style="width: 375px"
                            :editable="false"
                            clearable
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                    </div>
                </el-col>    
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">              
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                    </div>
                </el-col>    
                <el-col :span="6">
                    <div class="grid-content bg-purple"></div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple"></div>
                </el-col>  
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span></span>
                        <el-button type="primary" class="btn_button_primary" @click="doFilter">搜索</el-button>
                        <el-button type="primary" class="btn_button_primary" @click="doReset">重置</el-button>
                    </div>
                </el-col>    
            </el-row>
    </el-card>
    <div class="btn_group">
    </div>
    <table-list :tableData="tableData" @edit="edit"/>
    <change-page 
    :page="page" 
    :total="total"
     @handleCurrentChange="handleCurrentChange"
    :showEdit="showButtons.edit"
    @handleSizeChange="handleSizeChange" />
    <el-dialog
      :visible.sync="modal_template"
      :title="templateTitle"
      :close-on-click-modal="false"
      :before-close="cancel"
      width="30%"
      class-name="vertical-center-modal"
    >
        <div class="shop-container">
        <el-checkbox v-model="checkedAll" @change="checkedAllChange">全选</el-checkbox>
        <ul class="shop-list margin-l20">
          <li v-for="shop in authShopList" :key="shop.id" class="shop">
            <el-checkbox v-model="shop.select" @change="shopChange(shop,$event)">{{shop.shop_name}}</el-checkbox>
          </li>
        </ul>
      </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" class="btn_button_primary" @click="confirm">确定</el-button>
            <el-button type="primary" class="btn_button_primary" @click="cancel">取消</el-button>
        </span>
    </el-dialog>
    </div>
</template>
<script>
import TableList from './components/table'
import ChangePage from '@/components/page'
import { confirmMsg, message, dateFormatT } from '@/utils/common'
import { clearObjValue } from '@/utils/common.js'
import { mapState, mapGetters, mapActions } from 'vuex'
import { mixin } from '@/mixins/common'
export default {
    components: { TableList, ChangePage },
    mixins: [mixin],
    computed: {
        ...mapGetters(['placeholder', 'shopList', 'sellerList']),
        ...mapState({
            total: state => state.dataPermission.total,
            tableData: state => state.dataPermission.tableData,
            showButtons: state => state.dataPermission.showButtons
        }),
        modal_template: {
            get() {
                return this.$store.state.dataPermission.modal_template
            },
            set(val) {
                this.$store.state.dataPermission.modal_template = val
            }
        },
        templateTitle: {
            get() {
                return this.$store.state.dataPermission.templateTitle
            },
            set(val) {
                this.$store.state.dataPermission.templateTitle = val
            }
        },
        checkedAll: {
            get() {
                return this.$store.state.dataPermission.checkedAll
            },
            set(val) {
                this.$store.state.dataPermission.checkedAll = val
            }
        },
        authShopList: {
            get() {
                return this.$store.state.dataPermission.shopList
            },
            set(val) {
                this.$store.state.dataPermission.shopList = val
            }
        }
    },
    data() {
        return {
            search: {
                shop: '',
                creator: '',
                create_time: '',
            },
            seller_id: '',
            creatorList: [],    
            params: {},
        }
    },
    methods: {
        /* 编辑 */
        edit(id) {
            this.seller_id = id
            this.templateTitle = '编辑权限'
            this.$store.dispatch('dataPermission/getAuthshop', { seller_id: id })
        },
        confirm() {
            let shops = this.authShopList.filter(item => item.select).map(item => item.id)
            if (!shops.length) {
                message('warning', '至少选择一个店铺')
                return
            }
            let data = { shops, seller_id: this.seller_id }
            let params = this.params
            console.log(params)
            this.$store.dispatch('dataPermission/authshopEdit', { data, params })
        },
        cancel() {
            this.modal_template = false
        },
        checkedAllChange() {
            if (this.checkedAll) {
                this.authShopList.forEach(item => {
                    item.select = true
                }) 
            } else {
                this.authShopList.forEach(item => {
                    item.select = false
                }) 
            }
        },
        shopChange(shop, val) {
            if (this.authShopList.every(item => item.select)) {
                this.checkedAll = true
            } else {
                this.checkedAll = false
            }
        },
        ...mapActions(['getShopList', 'getSellerlist']),
        getData() {
            this.params = {
                staff_id: this.search.creator,
                account_id: this.search.shop,
                update_at_start: this.search.create_time  ? dateFormatT(this.search.create_time).start : '',
                update_at_end: this.search.create_time  ? dateFormatT(this.search.create_time).end : '',
                page: this.page.currentPage,
                per_page_num: this.page.size
            }
            this.$store.dispatch('dataPermission/getData', this.params)
        }
    },
    created() {
        let id = this.$getMenuId(  sessionStorage.getItem("munuIdList"),this.$route.path);
        this.$store.dispatch('dataPermission/getButtonList', { id })
        this.getShopList()
        this.getSellerlist()
        this.getData()
    }
}
</script>
<style scoped>
.margin-l20{
    margin-left: 20px;
}
.shop-container {
  height: 100%;
  overflow: hidden;
}
.shop-list {
  height: 450px;
  overflow-y: auto;
}
.shop {
  margin: 15px 0;
  border-bottom: 1px solid #e5e5e5;
}
</style>