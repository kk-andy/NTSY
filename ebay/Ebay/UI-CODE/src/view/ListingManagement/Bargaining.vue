<template>
    <div class="list-of-selections margin10">
        <div class="inventory-adjustment-rules-form">
            <el-card>
                <el-form :inline="true" ref="form" :model="form" label-width="140px">
                    <el-form-item label="店铺账号:" prop="shopAccount">
                        <!-- <el-input placeholder="全部" v-model="form.shopAccount" clearable></el-input> -->
                        <el-select clearable v-model="form.shopAccount" filterable  placeholder="请选择店铺">
                            <el-option
                            v-for="shop in shopList"
                            :key="shop.shop_id"
                            :label="shop.shop_name"
                            :value="shop.shop_id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="站点:" prop="siteCode">
                        <!-- <el-input placeholder="全部" v-model="form.siteCode" clearable></el-input> -->
                        <el-select clearable v-model="form.siteCode" filterable  placeholder="请选择店铺">
                            <el-option
                            v-for="site in siteList"
                            :key="site.site_id"
                            :label="site.site"
                            :value="site.site_id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="买家账号:"  prop="buyersAccount">
                        <el-input placeholder="请输入买家账号" v-model="form.buyersAccount" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="item id:" prop="itemID">
                        <el-input placeholder="请输入item id" v-model="form.itemID" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="状态:" prop="status">
                        <el-select clearable v-model="form.status" filterable  placeholder="请选择状态">
                            <el-option
                            v-for="item in typeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <div class="search-reset-btn">
                        <el-form-item>
                            <el-button size="small" type="primary" @click="doFilter">搜索</el-button>
                            <el-button size="small" @click="doReset('form')">重置</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </el-card>
        </div>
        <bargaining-table 
        :tableData="tableData"
        @accept="accept"
        @refused="refused"
        @counteroffer="counteroffer"
        :buttons="buttons"
        @note="note"
        />
        <div class="pagination-bottom">
            <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes=" [10, 20, 50, 100]"
            :current-page.sync="page.cureentPage"
            :page-size="page.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        ></el-pagination>
        </div>
        <el-dialog
        title="备注"
        :visible.sync="modal_note"
        width="50%"
        :close-on-click-modal="false"
        :before-close="cancel_note"
        >
        <div class="note-content">
            <span>内容：</span>
            <el-input 
            type="textarea" 
            placeholder="请填写您要备注的内容（最多500字）" 
            resize="none"
            v-model="modalNote" 
            :autosize="{ minRows: 6, maxRows: 8}"
            clearable></el-input>
        </div>     
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submit_note">确定</el-button>
            <el-button @click="cancel_note">取消</el-button>
        </span>
        </el-dialog>
        <el-dialog
        title="还价"
        :visible.sync="modal_counteroffer"
        width="50%"
        :close-on-click-modal="false"
        :before-close="() => cancel_counteroffer('form')"
        >
        <div>
            <user-info :info="info" />
            <div class="counteroffer-content">
                <el-form ref="form" :model="counterofferForm" :rules="rule" label-width="55px" label-position="left">
                    <el-form-item label="还价:" prop="counteroffer" :required="true">
                        <el-input v-model="counterofferForm.counteroffer" oninput="value=value.replace(/[^0-9.]/g,'')" style="width: 250px">
                            <template slot="append">{{info.currency}}/件</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="数量:" prop="num">
                        <el-input v-model.number="counterofferForm.num" oninput="value=value.replace(/[^\d]/g,'')" style="width: 250px"></el-input>
                    </el-form-item>
                    <el-form-item label="留言:">
                        <el-input 
                        v-model="counterofferForm.note"
                        placeholder="最多支持输入300个字符" 
                        style="width: 80%"
                        resize="none"
                        :autosize="{ minRows: 3, maxRows: 4}"
                        clearable
                        type="textarea" />
                    </el-form-item>
                </el-form>
            </div>
            <div class="buyers-ontent-main">
                <buyers-ontent  :item="item" v-for="(item, index) in info.detail" :key="index"/>
            </div>         
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submit_counteroffer('form')">确定</el-button>
            <el-button @click="cancel_counteroffer('form')">取消</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
import BargainingTable from './components/BargainingTable'
import UserInfo from './components/counterofferInfo'
import BuyersOntent from './components/buyersOntent'
import { gj_quantityValidator } from '@/utils/common'
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState({
            typeList: state => state.Bargaining.typeList,
            total: state => state.Bargaining.total,
            tableData: state => state.Bargaining.tableData,
        }),
        modal_counteroffer: {
            get() {
                return this.$store.state.Bargaining.modal_counteroffer
            },
            set(val) {
                this.$store.state.Bargaining.modal_counteroffer = val
            }
        },
        info: {
            get() {
                return this.$store.state.Bargaining.info
            },
            set(val) {
                this.$store.state.Bargaining.info = val
            }
        },
        modal_note: {
            get() {
                return this.$store.state.Bargaining.modal_note
            },
            set(val) {
                this.$store.state.Bargaining.modal_note = val
            }
        },
        modalNote: {
            get() {
                return this.$store.state.Bargaining.modalNote
            },
            set(val) {
                this.$store.state.Bargaining.modalNote = val
            }
        }
    },
    data() {
        return {
            form: {
                shopAccount: '',
                siteCode: '',
                buyersAccount: '',
                itemID: '',
                status: ''
            },
            buttons: {
                note: false,
                accept: false,
                refused: false,
                counteroffer: false
            },
            counterofferForm: {
                counteroffer: '',
                num: 1,
                note: ''
            },
            id: null,
            best_offer_id: null,
            page: {
                size: 50,
                cureentPage: 1
            },
            item: {
                type: 'mai'
            },
            params: {},
            rule: {
                counteroffer: [
                    { validator: gj_quantityValidator, trigger: 'blur' }
                ],
                num: [
                    { required: true, message: '请输入数量', trigger: 'blur' }
                ],
            },
            shopList: [],
            siteList: [],
        }
    },
    components: {
        BargainingTable,
        UserInfo,
        BuyersOntent
    },
    methods: {
        getshopsitecurrency() {
            this.$axios.get(`/listing/prepublish/shopsitecurrency`).then(res => {
                this.shopList = res.data.shops;
                this.siteList = res.data.sites;
            });
        },
        /* 接受议价 */
        accept(id, best_offer_id) {
            _g.confirmMsg('warning', '提示', '你确定要接受买家的议价吗', () => {
                let data = { id, best_offer_id }
                let params = this.params
                this.$store.dispatch('Bargaining/acceptListing', { data, params })
            })
        },
        /* 决绝议价 */
        refused(id, best_offer_id) {
            _g.confirmMsg('warning', '提示', '你确定要拒绝买家的议价吗', () => {
                let data = { id, best_offer_id }
                let params = this.params
                this.$store.dispatch('Bargaining/declineListing', { data, params })
            })
        },
        /* 还价 */
        counteroffer(id, best_offer_id) {
            let params = { id, best_offer_id }
            this.id = id
            this.best_offer_id = best_offer_id
            // let params = this.params
            this.$store.dispatch('Bargaining/counterInfo', { params })
        },
        /* 备注*/
        note(id) {
            this.id = id
            this.modal_note = true
        },
        /* 取消填写备注 */
        cancel_note() {
            this.modalNote = ''
            this.modal_note = false
        },
        /* 确定填写备注 */
        submit_note() {
            let data = {
                id: this.id,
                note: this.modalNote
            }
            let params = this.params
            this.$store.dispatch('Bargaining/addNote', { data, params })
        },
        /* 确定还价 */
        submit_counteroffer(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = {
                        id: this.id,
                        best_offer_id: this.best_offer_id,
                        price: this.counterofferForm.counteroffer,
                        quantity: this.counterofferForm.num,
                        message: this.counterofferForm.note
                    }
                    let params = this.params
                    this.$store.dispatch('Bargaining/saveCounterInfo',{ data, params })
                } else {
                    return false;
                }
            });
        },
        /* 取消还价 */
        cancel_counteroffer(formName) {
            this.modal_counteroffer = false
            this.$refs[formName].resetFields();
        },
        doFilter() {
            this.page.cureentPage = 1
            this.getData()
        },
        doReset(form) {
            Object.keys(this.form).forEach(key => this.form[key] = '')
        },
        getData() {
            let params = {
                shop_id: this.form.shopAccount,
                site_id: this.form.siteCode,
                user_id: this.form.buyersAccount,
                item_id: this.form.itemID,
                type: this.form.status,
                page: this.page.cureentPage,
                per_page_num: this.page.size
            }
            this.$store.dispatch('Bargaining/getData', params)
        },
        handleSizeChange(size) {
            this.page.cureentPage = 1
            this.page.size = 1
            this.getData()
        },
        handleCurrentChange() {
            this.page.cureentPage = 1
            this.getData()
        },
        getControlBtn(id) {
            let params = { id }
            this.$authHttp.get('/rest/auth/user/perms/buttons', { params }).then(res => {
                res.data.buttonList.forEach(btn => {
                    this.buttons[btn.key] = true;
                });
            })
        }
    },
    created() {
        let id = this.$getMenuId(
        sessionStorage.getItem("munuIdList"),
        this.$route.path
        );
        this.getControlBtn(id)
        this.getshopsitecurrency()
        this.getData()
    }
}
</script>
<style scoped lang="scss">
.note-content {
    display: flex;
    & > span {
       min-width: 45px;
    }
}
</style>
<style lang="scss">
.el-dialog__footer {
    border-top: 1px solid #e5e5e5 ;
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
.counteroffer-content {
    margin: 15px 0;
    padding: 15px 0 0px 5px;
    background: #dedede;
    overflow: hidden;
}
.buyers-ontent-main {
    padding: 10px 0 10px 5px;
    box-shadow: rgba(71, 51, 51, 0.18) 0px 4px 12px 0px;
}
</style>