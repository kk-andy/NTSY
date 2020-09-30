<template>
    <div class="main">
        <el-card>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="6" >
                    <div class="grid-content bg-purple">
                    <span>SKU:</span>
                    <el-input v-model="search.sku" placeholder="输入多个时请换行" />
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
                    <el-input v-model="search.product_line" placeholder="多个Id请用英文逗号隔开" />
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                    <span>刊登店铺:</span>
                    <el-input v-model="search.listing_shop" placeholder="多个Id请用英文逗号隔开" />
                    </div>
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                    <span>分配状态:</span>
                    <el-select v-model="search.status" filterable  placeholder="请选择">
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
                    <span>是否已刊登:</span>
                    <el-select v-model="search.isListing" filterable  placeholder="请选择">
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
                    <span>SKU生成时间:</span>
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
                    <div class="grid-content bg-purple">
                    <span>分配组别:</span>
                    <el-select v-model="search.group" filterable  placeholder="请选择">
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
            <el-row>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <span>分配销售:</span>
                        <el-select v-model="search.sale" filterable  placeholder="请选择">
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
                    </div>
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
        <el-button type="primary" class="btn_button_primary_lone" @click="create">创建listing</el-button>
        <el-button type="primary" class="btn_button_primary_lone" @click="allDistribution">批量组长分配</el-button>
    </div>
    <table-list :tableData="tableData" @viewLog="viewLog" @distribution="distribution"/>
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
      :visible.sync="modal_distribution"
      :title="distributionTitle"
      :close-on-click-modal="false"
      width="30%"
      class-name="vertical-center-modal"
    >
        <el-select v-model="search.isAmazon" filterable  placeholder="请选择">
            <el-option
            v-for="item in creatorList"
            :key="item.staff_id"
            :label="item.staff_name"
            :value="item.staff_id"
            ></el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" class="btn_button_primary" @click="confirm">确定</el-button>
            <el-button type="primary" class="btn_button_primary" @click="cancel">取消</el-button>
        </span>
    </el-dialog>
    </div>
</template>
<script>
import TableList from './components/distributionListTable'
import ChangePage from '@/components/page'
import operationLog from '@/components/operationLog'
import { mapState, mapGetters } from 'vuex'
export default {
    components: { TableList, ChangePage, operationLog },
    computed: {
        ...mapGetters(['operationLogTitle', 'operationLogList', 'distributionTitle']),
        ...mapState({
            total: state => state.distributionList.total,
            logTotal: state => state.distributionList.logTotal,
            tableData: state => state.distributionList.tableData,
            creatorList: state => state.distributionList.creatorList
        }),
        modal_operationlog: {
            get() {
                return this.$store.state.distributionList.modal_operationlog
            },
            set(val) {
                this.$store.state.distributionList.modal_operationlog = val
            }
        },
        modal_distribution: {
            get() {
                return this.$store.state.distributionList.modal_distribution
            },
            set(val) {
                this.$store.state.distributionList.modal_distribution = val
            }
        }
    },
    data() {
        return {
            search: {
                sku: '',
                title: '',
                group: '',
                status: '',
                create_time: '',
                isListing: '',
                sale: ''
            },
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
        /* 查看日志 */
        viewLog() {
            this.modal_operationlog = true
        },
        /* 设计分配 */
        distribution() {
            this.modal_distribution = true
        },
        /* 批量分配 */
        allDistribution() {

        },
        cancel() {
            this.modal_distribution = false
        },
        confirm() {

        },
        /* 创建 */
        create() {

        }
    }
}
</script>