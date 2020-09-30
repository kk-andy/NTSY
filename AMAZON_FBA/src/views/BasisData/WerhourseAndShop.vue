<template>
    <div class="main">
        <Header>
            <!-- <el-button type="primary" @click="addShop">新增</el-button> -->
            <upload-excel  @handleImageSuccess="handleImageSuccess" :uploaddUrl="uploaddUrl" v-if="showButtons.importData"/>
            <el-button type="primary" @click="downloadTemplate" v-if="showButtons.download">下载导入模板</el-button>
            <el-button @click="exportData" v-if="showButtons.exportData">导出</el-button>
        </Header>
        <!-- <Header> -->
            <el-row type="flex" class="row-bg search-head" justify="space-around">
                <el-col :span="5" >
                    <div class="grid-content bg-purple">
                            <span>仓库:</span>
                            <el-autocomplete
                                v-model="search.warehouseName"
                                :fetch-suggestions="querySearchAsync"
                                value-key="whouseName"
                                placeholder="请输入内容"
                                @select="handleSelect"
                            ></el-autocomplete>
                    </div>
                </el-col>
                <el-col :span="5" >
                    <div class="grid-content bg-purple">
                            <span>店铺:</span>
                            <el-select v-model="search.shop" filterable clearable  placeholder="请选择">
                            <el-option
                                v-for="item in allShopList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                ></el-option>
                            </el-select>
                    </div>
                </el-col>
                <el-col :span="6" >
                    <div class="grid-content bg-purple btn-no-span">
                        <search-btn-group @doFilter="doFilter" @doReset="doReset" />
                    </div>
                </el-col>
                <el-col :span="8" >
                    <div class="grid-content bg-purple">
                        <!-- <search-btn-group @doFilter="doFilter" @doReset="doReset" /> -->
                    </div>
                </el-col>
            </el-row>
        <!-- </Header> -->
        <div v-if="tableData.length">
            <warehouse-binding-shop-table 
            :showButtons="showButtons"
            @handleSelectionChange="handleSelectionChange"
            @deleteContent="del"
            :tableData="tableData"
            @edit="edit"
            />
            <change-page :page="page" :total="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"  />
        </div> 
        <no-data-content v-else />  
        <transition name="fade-transform" mode="out-in">
            <add-werhourse-and-shop-binding-modal
            @chandleSubmit="chandleSubmit"
            :shopList="allShopList"
            :warehouseList="virtList"
            :seaTransition="seaTransition"
            :airTransition="airTransition"
            :transitWarehoureList="transitWarehoureList"
            :showBandingModal="showBandingModal"
            :parentForm="parentForm"
            v-if="showBandingModal"
            />
        </transition>
    </div>
</template>
<script>
import WarehouseBindingShopTable from './components/WerhourseAndShopTable'
import AddWerhourseAndShopBindingModal from './components/AddWerhourseAndShopBindingModal'
import NoDataContent from '@/components/NoDataImages'
import UploadExcel from '@/components/Upload/uploadExcelWarhourse'
import { message, download } from '@/utils/common'
import { getSearchWarehourseList } from '@/api/WarehouseManagement'
import { debounce } from '@/utils/common'
import { mixin } from '@/mixins/common'
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
    components: {
        WarehouseBindingShopTable,
        AddWerhourseAndShopBindingModal,
        UploadExcel,
        NoDataContent
    },
    mixins: [mixin],
    computed: {
        ...mapState({
            tableData: state => state.WerhourseAndShop.tableData,
            total: state => state.WerhourseAndShop.total,
            searchList: state => state.WerhourseAndShop.searchList,
            showButtons: state => state.WerhourseAndShop.showButtons,
            showBandingModal: state => state.WerhourseAndShop.showBandingModal,
            parentForm: state => state.WerhourseAndShop.parentForm,
            seaTransition: state => state.WerhourseAndShop.seaTransition,
            airTransition: state => state.WerhourseAndShop.airTransition,
            virtList: state => state.WerhourseAndShop.virtList,
            allShopList: state => state.common.allShopList
        }),
        ...mapGetters(['transitWarehoureList']),
        checkDataList: {
            get() {
                return this.$store.state.WerhourseAndShop.checkDataList
            },
            set(val) {
                this.$store.commit('WerhourseAndShop/change_CheckDataList', val)
            }
        }
    },
    data() {
        return {
            search: {
                warehouseName: '',
                shop: ''
            },
            params: {

            },
            relationId: '',
            uploaddUrl: `${process.env.VUE_APP_ERP_JAVA_DOMAIN}/warehouse/shopRelation/importRelation`,
        }
    },
    methods: {
        handleSelectionChange(val) {
            this.checkDataList = val
        },
        edit(item) {
            this.relationId = item.relationId
            console.log(this.airTransition.find(ele => ele.label === item.airTransitionName))
            // return
            let detail = {
                shopId: item.shopId,
                site: item.site,
                airTransitionId: this.airTransition.find(ele => ele.label === item.airTransitionName) ? this.airTransition.find(ele => ele.label === item.airTransitionName).value : '',
                seaTransitionId: this.seaTransition.find(ele => ele.label === item.seaTransitionName) ? this.seaTransition.find(ele => ele.label === item.seaTransitionName).value : '',
                virtId: this.virtList.find(ele => ele.label === item.virtName) ? this.virtList.find(ele => ele.label === item.virtName).value : '',
                transferId: this.transitWarehoureList.find(ele => ele.label === item.transferName) ? this.transitWarehoureList.find(ele => ele.label === item.transferName).value : ''
            }
            this.$store.commit('WerhourseAndShop/CAHNGE_PARENT_FORM', detail)
            this.$store.commit('WerhourseAndShop/CHANGE_MODAL_TYPE', true)
        },
        /* 确定添加或者修改 */
        chandleSubmit(data) {
            data.relationId = this.relationId
            let params = this.params
            this.$store.dispatch('WerhourseAndShop/addOrEditWarehouse', { data, params })
        },
        handleSelect(item) {
            this.search.warehouseName = item.whouseName
        },
        querySearchAsync(queryString, cb) {
             if (queryString) {
                 debounce(() => {
                    getSearchWarehourseList({ whouseName: queryString }).then(res => {
                        let results = res.data
                        cb(results)
                    })
                }, 500)
            } else {
                cb([])
            } 
        },
        /* 导出数据 */
        exportData() {
            this.params.current_page = 1
            this.params.per_page = 3000
            this.$store.dispatch('WerhourseAndShop/exportData', this.params)
        },
        /* 下载模板 */
        downloadTemplate() {
            let url = `${process.env.VUE_APP_ERP_JAVA_DOMAIN}/warehouse/shopRelation/downTemplate`
            let a = document.createElement('a')
            a.style.display = 'none'
            document.body.appendChild(a)
            a.href = url
            a.setAttribute('download', 'link') // 指示浏览器下载url,而不是导航到它
            a.click()
            document.body.removeChild(a)
        },
        /* 上传成功 */
        handleImageSuccess(res) {
            if (res.code === 0) {
                this.getData()
            }
        },
        del(relationId) {
            this.relationId = relationId
            let data = {
                relationId
            }
            let parmas = this.params
            this.$store.dispatch('WerhourseAndShop/delContent', { relationId, parmas })
        },
        /* 获取数据 */
        getData() {
            this.params = {
                current_page: this.page.currentPage,
                per_page: this.page.size,
                shopId: this.search.shop,
                whouseName: this.search.warehouseName
            }
            this.params[this.search.searchKey] = this.search.searchWord
            this.$store.dispatch('WerhourseAndShop/getData', this.params)
        },
        ...mapActions(['getAllShop', 'gettransitWarehoureList', 'WerhourseAndShop/getWarehouseToShopRelation']),
        /* 新增绑定关系 */
        addShop() {
            this.relationId = ''
            this.$store.commit('WerhourseAndShop/CHANGE_MODAL_TYPE', true)
        }
    },
    async created() {
        await this.getData()
        let id = this.$getMenuId(sessionStorage.getItem("munuIdList"), this.$route.path);
        await this.$store.dispatch('WerhourseAndShop/getButtonList', { id })
        this['WerhourseAndShop/getWarehouseToShopRelation']()
        // this.getWarehouseList()
        this.gettransitWarehoureList()
        this.getAllShop()
        
    }
}
</script>
<style scoped lang="scss">
.main {
    Header {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        padding: 15px 0;
        margin-bottom: 25px;
        button {
            margin-left: 15px;
        }
    }
    & > Header:nth-child(2) {
        flex-direction: row;
        margin-bottom: 10px;
        & > div {
            margin-right: 10px;
        }
    }
}
</style>