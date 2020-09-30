<template>
    <div class="main">
        <el-card>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="6" >
                    <div class="grid-content bg-purple">
                    <span>模板名称:</span>
                    <el-input v-model="search.templateName" clearable placeholder="请输入(模糊搜索)" @keyup.enter.native="doFilter" />
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                    <span>店铺:</span>
                    <!-- <el-input v-model.trim="search.shop" placeholder="请输入(模糊搜索)" /> -->
                    <el-select v-model="search.shop" filterable clearable placeholder="请选择">
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
                    <span>创建人:</span>
                    <el-select v-model="search.creator" filterable clearable placeholder="请选择">
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
                    <div class="grid-content bg-purple"></div>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">              
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                    <span>创建时间:</span>
                    <el-date-picker
                            v-model="search.create_time"
                            type="datetimerange"
                            clearable
                            style="width: 375px"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </el-col>    
                <el-col :span="6">
                    <div class="grid-content bg-purple"></div>
                </el-col>
                <el-col :span="6">
                    <search-btn-group @doFilter="doFilter" @doReset="doReset" />
                </el-col>    
            </el-row>
    </el-card>
    <div class="btn_group">
        <el-button type="primary" class="btn_button_primary_lone" @click="addTemplate" v-if="showButtons.addTemplate">新增模板</el-button>
    </div>
    <table-list :tableData="tableData" @edit="edit" :showEdit="showButtons.edit"/>
    <change-page :page="page" :total="total"  @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"  />
    <el-dialog
      :visible.sync="modal_template"
      :title="templateTitle"
      :close-on-click-modal="false"
      :before-close="cancel"
      width="60%"
      class-name="vertical-center-modal"
    >
        <div class="associated_shop">
            <span>关联店铺:</span>
            <el-select v-model="associatedShop" filterable  placeholder="请选择">
                <el-option
                    v-for="item in shopList"
                    :key="item.shop_id"
                    :label="item.shop_name"
                    :value="item.shop_id"
                ></el-option>
            </el-select>
        </div>
        <div class="associated_shop">
            <span>模板名称:</span>
            <el-input v-model="templateName" maxlength="100" placeholder="请输入" />
        </div>
        <tinymce v-model="richTextContent"  :height="300" ref="content" :flag.sync="flagMaxStrLength"/>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" class="btn_button_primary" @click="confirm">确定</el-button>
            <el-button type="primary" class="btn_button_primary" @click="cancel">取消</el-button>
        </span>
    </el-dialog>
    </div>
</template>
<script>
import TableList from './components/Templatetable'
import ChangePage from '@/components/page'
import { confirmMsg, message, dateFormatT, clearObjValue } from '@/utils/common'
import Tinymce from "@/components/Tinymce";
import { mixin } from '@/mixins/common'
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
    components: { TableList, ChangePage, Tinymce },
    mixins: [mixin],
    computed: {
        ...mapGetters(['shopList', 'sellerList']),
        ...mapState({
            total: state => state.descriptionTemplate.total,
            tableData: state => state.descriptionTemplate.tableData,
            modal_template: state => state.descriptionTemplate.modal_template,
            showButtons: state => state.descriptionTemplate.showButtons
        }),
        modal_template: {
            get() {
                return this.$store.state.descriptionTemplate.modal_template
            },
            set(val) {
                this.$store.state.descriptionTemplate.modal_template = val
            }
        },
        templateTitle: {
            get() {
                return this.$store.state.descriptionTemplate.templateTitle
            },
            set(val) {
                this.$store.state.descriptionTemplate.templateTitle = val
            }
        },
        templateName: {
            get() {
                return this.$store.state.descriptionTemplate.templateName
            },
            set(val) {
                this.$store.state.descriptionTemplate.templateName = val
            }
        },
        associatedShop: {
            get() {
                return this.$store.state.descriptionTemplate.associatedShop
            },
            set(val) {
                this.$store.state.descriptionTemplate.associatedShop = val
            }
        },
        richTextContent: {
            get() {
                return this.$store.state.descriptionTemplate.richTextContent
            },
            set(val) {
                this.$store.state.descriptionTemplate.richTextContent = val
            }
        }
    },
    data() {
        return {
            search: {
                templateName: '',
                shop: '',
                creator: '',
                create_time: '',
            },
            flagMaxStrLength: true,
            params: {},
            templateId: '',
            creatorList: [],    
        }
    },
    methods: {
        /*  新增模板 */
        addTemplate() {
            this.modal_template = true
            this.templateTitle = '新增模板'
            
        },
        /* 编辑 */
        edit(id) {
            this.templateTitle = '编辑模板'
            let _this = this
            this.templateId = id
            this.$store.dispatch('descriptionTemplate/getTemplateInfo', { id, _this })
        },
        confirm() {
            // console.log(this.$refs.content.getCount())
            // return
            if (!this.richTextContent || !this.templateName || !this.associatedShop) {
                message('warning', '关联店铺,模板名称和模板内容都是必填项', 1000)
                return
            }
            let data = {
                shop_id: this.associatedShop,
                template_name: this.templateName,
                template_info: this.richTextContent
            }
            let params = this.params
            let _this = this
            if (this.templateTitle === '编辑模板') {
                data.id = this.templateId
                this.$store.dispatch('descriptionTemplate/saveTemplate', { data, params, _this })
            } else {
                this.$store.dispatch('descriptionTemplate/addTemplate', { data, params, _this })
            }      
        },
        cancel() {
            this.modal_template = false
            this.richTextContent = null
            this.templateName = null
            this.associatedShop = null
            this.$refs.content.setContent('')
        },
        getData() {
            this.params = {
                template_name: this.search.templateName,
                shop_id: this.search.shop,
                create_user: this.search.creator,
                created_at_start: this.search.create_time  ? dateFormatT(this.search.create_time).start : '',
                created_at_end: this.search.create_time  ? dateFormatT(this.search.create_time).end : '',
                page: this.page.currentPage,
                per_page_num: this.page.size
            }
            this.$store.dispatch('descriptionTemplate/getData', this.params)
        },
        ...mapActions(['getShopList', 'getSellerlist'])
    },
    created() {
        let id = this.$getMenuId(sessionStorage.getItem("munuIdList"),this.$route.path);
        this.$store.dispatch('descriptionTemplate/getButtonList', { id })
        this.getShopList()
        this.getSellerlist()
        this.getData()
    }
}
</script>
<style lang="scss" scoped>
.associated_shop {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    & > span {
        width: fit-content;
        margin-right: 10px;
    }
    .el-input, .el-select{
        width: 237px;
    }
}
</style>