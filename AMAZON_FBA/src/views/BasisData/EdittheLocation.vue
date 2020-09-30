<template>
    <div class="main">
        <h3>仓库:{{ warehouseName }}</h3>
        <div class="grid-content bg-purple min-select">
                    <span></span>
                    <el-select v-model="search.searchKey"  placeholder="请选择">
                    <el-option
                        v-for="item in searchList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        ></el-option>
                    </el-select>
                    <el-input v-model="search.searchWord" clearable placeholder="回车搜索内容" @keyup.enter.native="doFilter">
                        <i slot="suffix" class="el-input__icon el-icon-search"></i>
                    </el-input>
        </div>
        <div v-if="WarehouseSpaceListAll.length">
            <table-content  
            @bindingSKuInfo="bindingSKuInfo"
            @handleSelectionChange="handleSelectionChange" 
            :tableData="WarehouseSpaceListAll"/>
            <change-page :page="page" :total="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"  />
        </div>
        <no-data-content v-else msg="当前没找到任何库位数据" />      
        <div class="actions-group">
            <el-button class="btn_button_primary" type="primary" @click="downloadTemplate">下载导入模板</el-button>
            <upload-excel  @handleImageSuccess="handleImageSuccess" :data="uploadContent" :uploaddUrl="uploaddUrl" />
            <el-button  @click="exportData">导出</el-button>    
        </div>
        <transition name="el-fade-in-linear">
            <edit-binding-sku-info-modal 
            @changePickingUserId="changePickingUserId"
            :list="warehouseSpaceDetail"
            :pickingUserId="pickingUserId"
            :warehouseName="warehouseName"
            :OAUserList="OAUserList"
            :item="warehouseSpaceInfo"
            v-if="showSkuInfoModule"
            @handleSubmit="handleSubmit"
            :showSkuInfoModule="showSkuInfoModule"
            />
        </transition>
        <export-localtion
        v-if="showExportModule"
        :showExportModule="showExportModule"
        @downloLocaltion="downloLocaltion"
        :exportNum="exportNum"
        />
    </div>
</template>
<script>
import TableContent from './components/WarehouseDataTable'
import EditBindingSkuInfoModal from './components/EditSKuInfoAndUser'
import ChangePage from '@/components/page'
import NoDataContent from '@/components/NoDataImages'
import { message  } from '@/utils/common'
import { mapGetters, mapActions, mapState } from 'vuex'
import { mixin } from '@/mixins/common'
import UploadExcel from '@/components/Upload/uplaodExcel'
import ExportLocaltion from './components/exportModal'
export default {
    mixins: [mixin],
    components: {
        // StorageContentBody,
        UploadExcel,
        ChangePage,
        NoDataContent,
        TableContent,
        EditBindingSkuInfoModal,
        ExportLocaltion
    },
    computed: {
        showSkuInfoModule: {
            get() {
                return this.$store.state.WarehouseManagement.showSkuInfoModule
            },
            set(val) {
                this.$store.commit('WarehouseManagement/CHABGE_MODAL_STATUS', val)
            }
        },
        pickingUserId: {
            get() {
                return this.$store.state.WarehouseManagement.pickingUserId
            },
            set(val) {
                this.$store.state.WarehouseManagement.pickingUserId = val
            }
        },
        showExportModule: {
            get() {
                return this.$store.state.WarehouseManagement.showExportModule
            },
            set(val) {
                this.$store.state.WarehouseManagement.showExportModule = val
            }
        },
        exportNum: {
            get() {
                return this.$store.state.WarehouseManagement.exportNum
            },
            set(val) {
                this.$store.state.WarehouseManagement.exportNum = val
            }
        },
        ...mapState({
            OAUserList: state => state.common.OAUserList,
            total: state => state.WarehouseManagement.total,
            WarehouseSpaceListAll: state => state.WarehouseManagement.WarehouseSpaceListAll,
            searchList: state => state.WarehouseManagement.searchList,
            warehouseSpaceDetail: state => state.WarehouseManagement.warehouseSpaceDetail
        }),
    },
    data() {
        return {
            checkDataList: [],
            userID: '', /* 当前的负责人ID */
            warehouseName: '',
            search: {
                searchWord: '',
                searchKey: 'spaceCode'
            },
            uploaddUrl: `${process.env.VUE_APP_ERP_JAVA_DOMAIN}/warehouseSpace/importSpace`,
            uploadContent: {
                whouseId: ''
            },
            params: {
                whouseId: ''
            },
            warehouseSpaceInfo: {},
            showList: [],
        }
    },
    methods: {
         /* 上传成功 */
        handleImageSuccess(res) {
           this.getData()
        },
        /* 表格选中 */
        handleSelectionChange(val) {
            this.checkDataList = val
        },
        /* 搜索 */
        ...mapActions(['getOAUserList']),
        /* 导出 */
        exportData() {
            // this.$store.commit('WarehouseManagement/CLOSE_EXPORT_MODAL', true)
            this.downloLocaltion()
        },
        downloLocaltion() {
            let params = {
                whouseId: this.uploadContent.whouseId,
                // current_page: 1,
                // per_page: num
            }
            this.$store.dispatch('WarehouseManagement/exportLocation', params)
        },
        /* 下载导入模板 */
        downloadTemplate() {
            let url = `${process.env.VUE_APP_ERP_JAVA_DOMAIN}/warehouseSpace/downTemplate`
            let a = document.createElement('a')
            a.style.display = 'none'
            document.body.appendChild(a)
            a.href = url
            a.setAttribute('download', 'link') // 指示浏览器下载url,而不是导航到它
            a.click()
            document.body.removeChild(a)
        },
        /* 子组件修改负责人 */
        changePickingUserId(val) {
            this.$store.commit('WarehouseManagement/CHANGE_PICKIMGUSERID', val)
        },
        /* 绑定sku */
        bindingSKuInfo(item) {
            console.log(item)
            this.warehouseSpaceInfo = item
            this.$store.dispatch('WarehouseManagement/getSinglepositionsSkuInfo', { spaceId: item.spaceId })
        },
        /* 保存或取消绑定 */
        handleSubmit(flag) {
            if (typeof flag === 'boolean') {
                this.$store.commit('WarehouseManagement/CHABGE_MODAL_STATUS', false)
                return
            }
            flag.spaceId = this.warehouseSpaceInfo.spaceId
            flag.pickingUser = this.OAUserList.find(item => item.id === flag.pickingUserId).name /* 通过id找到人名 */
            let params = this.params
            this.$store.dispatch('WarehouseManagement/warehouseSpaceEditSpace', { flag, params })
        },
        /* 获取列表数据 */
        getData() {
            this.params = {
                whouseId: this.$route.query.whouseId,
                current_page: this.page.currentPage,
                per_page: this.page.size,
            }
            this.params[this.search.searchKey] = this.search.searchWord
            this.$store.dispatch('WarehouseManagement/getWarehouseSpaceListAll', this.params)
        },
    },
    async created() {
        this.warehouseName = this.$route.query.warehouseName
        this.uploadContent.whouseId = this.$route.query.whouseId
        await this.getData()
        await this.getOAUserList()     
    }
}
</script>
<style scoped lang="scss">
.main {
    width: 80% !important;
    margin: 0 auto;
    padding-top: 50px !important;
    Header {
        font-weight: bold;
        font-size: 16px;
        color: #333;
        padding: 15px 0;
        border-bottom: 1px solid #dfe6ec;
    }
    .actions-group {
        display: flex;
        flex-direction: row-reverse;
        margin-top: 25px;
        button {
            margin-left: 15px;
        }
    }
}
</style>