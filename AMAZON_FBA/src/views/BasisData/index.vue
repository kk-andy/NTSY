<template>
    <div class="main">
        <el-row type="flex" class="row-bg search-head" justify="space-around">
            <el-col :span="18" >
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
            <el-col :span="6" >
                <div class="grid-content bg-purple btn-no-span">
                    <search-btn-group @doFilter="doFilter" @doReset="doReset" />
                </div>
            </el-col>
        </el-row>
        <Header>
            <el-button type="primary" class="btn_button_primary" @click="addWerehourse" v-if="showButtons.addWarhourse">新增仓库</el-button>         
        </Header>
        <div v-if="tableData.length">
            <warehouse-table 
            :showButtons="showButtons"
            :tableData="tableData" 
            @changeWhouseStatus="changeWhouseStatus"
            @handleSelectionChange="handleSelectionChange" 
            @addLocation="addLocation" />
            <change-page :page="page" :total="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"  />
        </div>
        <no-data-content v-else />    
        <transition name="fade-transform" mode="out-in">
            <add-localtion-modal 
            :showModuleParent="showModule" 
            :warehouseName="warehouseName"
            @change_location_num="change_location_num"
            v-if="showModule"
            @handleSubmit="handleSubmit" 
            :locationNumber="locationNumber"/>
        </transition>
    </div>
</template>
<script>
import { mixin } from '@/mixins/common'
import WarehouseTable from './components/WarehouseTable'
import NoDataContent from '@/components/NoDataImages'
import AddLocaltionModal from './components/addLocationsModel'
import { getSearchWarehourseList } from '@/api/WarehouseManagement'
import { message, debounce, confirmMsg } from '@/utils/common'
import { mapState, mapActions } from 'vuex'
export default {
    mixins: [mixin],
    components: {
        WarehouseTable,
        NoDataContent,
        AddLocaltionModal
    },
    computed: {
        ...mapState({
            tableData: state => state.WarehouseManagement.tableData,
            total: state => state.WarehouseManagement.total,
            showButtons: state => state.WarehouseManagement.showButtons,
            warehourseList: state => state.WarehouseManagement.warehourseList
        }),
        showModule: {
            get() {
                return this.$store.state.WarehouseManagement.showModule
            },
            set(val) {
                this.$store.state.WarehouseManagement.showModule = val
            }
        },
        locationNumber: {
            get() {
                return this.$store.state.WarehouseManagement.locationNumber
            },
            set(val) {
                this.$store.commit('WarehouseManagement/CHANEG_LOCALTION_NUM', val)
            }
        }
    },
    data() {
        return {
            search: {
                warehouse: '',
                warehouseName: ''
            }, 
            warehouseName: '',
            params: {},
            whouseId: '',
            list: [],
            idList: [],
            oldOptions: [],
            checkDataList: [],
            props: {
                value: 'whouseId',
                label: 'whouseName'
            }
        }
    },
    watch: {
        // 'search.warehouse': {
        //     handler(val, oldVal) {
        //         console.log(oldVal, val)
        //         let allIdArr = []
        //         for (const argumentId of this.warehourseList) {
        //             allIdArr.push(argumentId.whouseId)
        //         }
        //         // 当前选中的有'全选'
        //         if (val.includes('all')) {
        //             this.search.warehouse = allIdArr
        //             this.idList = allIdArr
        //         }
        //         console.log(val)
        //         // 旧数据包含'全选'，当前选中数据不包含全选
        //         if (oldVal.includes('all') && !val.includes('all')) {
        //             this.idList = []
        //         }
        //         // 旧数据包含'全选'，当前选中数据包含全选
        //         if (oldVal.includes('all') && val.includes('all')) {
        //             const index = val.indexOf('all')
        //             this.idList.splice(index, 1) // 排除全选选项
        //             console.log(val)
        //         }
        //         // 旧数据不包含'全选'，当前选中数据不包含'全选'
        //         if (!oldVal.includes('all') && !val.includes('all')) {
        //             console.log(11)
        //             // 除了全选外 其他全部选中时
        //             if (val.length === val.length - 1) {
        //                 this.idList = ['all'].concat(valArr)
        //             }
        //         }
        //         // 数据发生变化时保存数据，作为下次对比的旧数据                                                                    
        //     }
        // }
    },
    methods: {
        handleSelectionChange(val) {
            this.checkDataList = val
        },
        handleSelect(item) {
            this.search.warehouseName = item.whouseName
        },
        querySearchAsync(queryString, cb) {
             if (queryString) {
                 debounce(() => {
                    getSearchWarehourseList({ whouseName: queryString }).then(res => {
                        let results = res.data
                        console.log(results)
                        cb(results)
                    })
                }, 500)
            } else {
                cb([])
            } 
        },
        /* 改变仓库的状态 */
        changeWhouseStatus(id, type) {
            let data = {
                whouseId: id,
                state: type
            }
            let params = this.params
            if (type) {
                confirmMsg('warning', '停用', '你确定要停用吗？', ()=> {
                    this.$store.dispatch('WarehouseManagement/changesWarehouseStatus', { data, params })
                })
            } else {
                this.$store.dispatch('WarehouseManagement/changesWarehouseStatus', { data, params })
            }
        },
        /* 新增仓库 */
        addWerehourse() {
            if (!this.checkDataList.length) {
                this.$router.push({
                    name: 'WarehouseData',
                    query: {
                        type: 'addParent'
                    }
                })
                return
            }
            if (this.checkDataList.length > 1) {
                message('warning', '只能勾选一个仓库')
                return
            }
            let obj = this.checkDataList[0]
            this.$router.push({
                name: 'WarehouseData',
                query: {
                    type: 'addChildren',
                    pid: obj.pid,
                    level: obj.level,
                    whouseId: obj.whouseId
                }
            })
        },
        /* 新增库位 */
        addLocation(id, name) {
            this.whouseId = id
            this.warehouseName = name
            this.showModule = true
        },
        /* 保存或取消库位 */
        handleSubmit(form) {
            if (typeof form === 'boolean') {
                this.$store.commit('WarehouseManagement/CHANEG_LOCALTION_NUM', '')
                this.$store.commit('WarehouseManagement/CLOSE_SHOWMODULE')
                return
            }
            if (form) {
                if (form > 500) {
                    message('warning', '库位数不能超过500')
                    return
                }
            }    
            let data = {
                whouseId: this.whouseId,
                quantity: form
            }
            let params = this.params
            this.$store.dispatch('WarehouseManagement/addWarehouseSpace', { data, params })
        },
        /* 增加库位修改库位数 */
        change_location_num(val) {
            this.$store.commit('WarehouseManagement/CHANEG_LOCALTION_NUM', val)
        },
        // ...mapActions(['WarehouseManagement/getWarehourseList']),
        /* 获取数据 */
        getData() {
            this.params = {
                whouseName: this.search.warehouseName,
                current_page: this.page.currentPage,
                per_page: this.page.size
            }
            this.$store.dispatch('WarehouseManagement/getData', this.params)
        }
    },
    created() {
        let id = this.$getMenuId(sessionStorage.getItem("munuIdList"), this.$route.path);
        this.$store.dispatch('WarehouseManagement/getButtonList', { id })
        this.getData()
    }
}
</script>
<style scoped lang="scss">
.main {
    Header {
        display: flex;
        flex-direction: row-reverse;
        margin: 15px 0;
        button {
            margin-left: 15px;
        }
    }
}
</style>