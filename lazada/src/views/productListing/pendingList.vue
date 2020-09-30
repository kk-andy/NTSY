<template>
    <div class="main">
        <el-card>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="6" >
                    <div class="grid-content bg-purple">
                    <span>SKU:</span>
                    <el-input v-model="search.sku" placeholder="请输入(模糊搜索)" />
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                    <span>标题:</span>
                    <el-input v-model="search.title" placeholder="请输入(模糊搜索)" />
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                    <span>产品线:</span>
                    <el-select v-model="search.product_line" filterable  placeholder="请选择">
                    <el-option
                        v-for="item in creatorList"
                        :key="item.staff_id"
                        :label="item.staff_name"
                        :value="item.staff_id"
                        ></el-option>
                    </el-select>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                    <span>创建人:</span>
                    <el-select v-model="search.creator" filterable  placeholder="请选择">
                    <el-option
                        v-for="item in creatorList"
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
                    <span>创建时间:</span>
                    <el-date-picker
                        v-model="search.create_time"
                        style="width: 224px"
                        type="daterange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    />
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
                        <el-button type="primary" class="btn_button_primary">搜索</el-button>
                        <el-button type="primary" class="btn_button_primary">重置</el-button>
                    </div>
                </el-col>    
            </el-row>
    </el-card>
    <div class="btn_group">
        <el-button type="primary" class="btn_button_primary_lone" @click="allDistribution">批量发布</el-button>
        <el-button type="primary" class="btn_button_primary_lone" @click="timingDistribution">定时发布</el-button>
    </div>
    <table-list :tableData="tableData" @delete_pro="delete_pro" @release="release" @edit="edit" @viewLog="viewLog"/>
    <change-page :page="page" :total="total"  />
    <el-dialog
      :visible.sync="modal_operationlog"
      :title="operationLogTitle"
      :close-on-click-modal="false"
      width="40%"
      class-name="vertical-center-modal"
    >
        <operation-log :table-data="operationLogList" />
        <change-page :page="logPage" :total="logTotal"  />
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" class="btn_button_primary" @click="modal_operationlog = false">取消</el-button>
        </span>
    </el-dialog>
    <el-dialog
      :visible.sync="modal_release"
      :title="releaseTitle"
      :close-on-click-modal="false"
      width="40%"
      class-name="vertical-center-modal"
    >
        <el-date-picker
            v-model="releaseTime"
            style="width: 224px"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
        />
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" class="btn_button_primary" @click="confirm">确定</el-button>
            <el-button type="primary" class="btn_button_primary" @click="cancel_release">取消</el-button>
        </span>
    </el-dialog>
    </div>
</template>
<script>
import TableList from './components/pendingListTable'
import ChangePage from '@/components/page'
import operationLog from '@/components/operationLog'
import { confirmMsg, message } from '@/utils/common'
import { mapState, mapGetters } from 'vuex'
export default {
    components: { TableList, ChangePage, operationLog },
    computed: {
        ...mapGetters(['releaseTitle', 'operationLogList', 'distributionTitle', 'operationLogTitle']),
        ...mapState({
            total: state => state.pendingList.total,
            logTotal: state => state.pendingList.logTotal,
            tableData: state => state.pendingList.tableData
        }),
        modal_operationlog: {
            get() {
                return this.$store.state.pendingList.modal_operationlog
            },
            set(val) {
                this.$store.state.pendingList.modal_operationlog = val
            }
        },
        modal_release: {
            get() {
                return this.$store.state.pendingList.modal_release
            },
            set(val) {
                this.$store.state.pendingList.modal_release = val
            }
        },
        releaseTime: {
            get() {
                return this.$store.state.pendingList.releaseTime
            },
            set(val) {
                this.$store.state.pendingList.releaseTime = val
            }
        }
    },
    data() {
        return {
            search: {
                sku: '',
                title: '',
                creator: '',
                product_line: '',
                create_time: '',
            },
            creatorList: [],
            
            page: {
                currentPage: 1,
                size: 10
            },
            logPage: {
                currentPage: 1,
                size: 10
            },
        }
    },
    methods: {
        /* 单个发布 */
        release() {
            
        },
        /* 删除 */
        delete_pro() {
            confirmMsg('warning', '删除', '你确定要删除吗？', ()=> {
                // console.log(111)
            })
        },
        /* 定时发布 */
        timingDistribution() {
            this.modal_release = true
        },
        cancel_release() {
            this.modal_release = false
            this.releaseTime = ''
        },
        confirm() {
            if (!this.releaseTime) {
                message('warning', '请选择发布时间', 3000)
                return
            }
        },
        /* 批量发布 */
        allDistribution() {

        },
        /* 编辑 */
        edit() {

        },
        viewLog() {
            this.modal_operationlog = true
        }
    }
}
</script>