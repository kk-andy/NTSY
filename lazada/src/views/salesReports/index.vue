<template>
    <div class="main">
        <div class="head">
            <div>
                <span>选择店铺:</span>
                <el-select v-model="search.shop" clearalbe filterable  placeholder="请选择">
                    <el-option
                        v-for="item in list"
                        :key="item.address"
                        :label="item.value"
                        :value="item.address"
                        ></el-option>
                </el-select>
            </div>
            <div>
                <span>账号负责人:</span>
                <el-select v-model="search.creator"  clearalbe filterable  placeholder="请选择">
                    <el-option
                        v-for="item in creatorList"
                        :key="item.staff_id"
                        :label="item.staff_name"
                        :value="item.staff_id"
                        >
                    </el-option>
                </el-select>
            </div>
            <div>
                <span>选择年月:</span>
                <el-date-picker
                    v-model="search.time"
                    type="month"
                    placeholder="选择月">
                </el-date-picker>
            </div>
        </div>
        <tags-list :tags="tagsList" @handleClose="handleClose" />
        <div class="btn_group flex_group">
            <el-button type="primary" class="btn_button_primary_lone" @click="settingTarget">设定目标值</el-button>
            <i class="el-icon-refresh" @click="changeMounthDay"></i>
        </div>
        <table-list :tableData="tableData" :list="dataList"/>
        <el-dialog
            :visible.sync="modal_settingTarget"
            :title="settingTargetTitle"
            :close-on-click-modal="false"
            width="60%"
            class-name="vertical-center-modal"
            >
            <div>
                <span>选择年月:</span>
                <el-date-picker
                    v-model="search.time"
                    type="month"
                    placeholder="选择月">
                </el-date-picker>
            </div>
            <target-modal :targetValueList="targetValueList"/>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" class="btn_button_primary" @click="confirm">确定</el-button>
                <el-button type="primary" class="btn_button_primary" @click="cancel">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import TagsList from './components/tags'
import TableList from './components/table'
import { getDaysNum } from '@/utils/common'
import { mapState, mapGetters } from 'vuex'
import TargetModal from './components/targetModal'
export default {
    components: { TagsList, TableList, TargetModal },
    computed: {
        ...mapGetters(['settingTargetTitle']),
        ...mapState({
            tagsList: state => state.salesReports.tagsList,
            list: state => state.lazada.list,
            modal_settingTarget: state => state.salesReports.modal_settingTarget,
            targetValueList: state => state.salesReports.targetValueList
        }),
        modal_settingTarget: {
            get() {
                return this.$store.state.salesReports.modal_settingTarget
            },
            set(val) {
                this.$store.state.salesReports.modal_settingTarget = val
            }
        }
    },
    data() {
        return {
            search: {
                creator: '',
                time: 'Sat Feb 01 2020 00:00:00 GMT+0800 (',
                shop: ''
            },
            creatorList: [],
            tableData: [],
            dataList: [],
            isShowMaxDays: false,
        }
    },
    watch: {
        'search.shop': {
            handler(val) {
                if (val) {
                    if (this.tagsList.some(item => item.address == val)) {
                        return
                    }
                    let obj = this.list.filter(item => item.address == val)[0]
                    this.tagsList.push(obj)
                }
            }
        },
        'search.time': {
            handler(val) {
                let mounth = new Date(val).getMonth() + 1
                let days = this.getMonthDay(new Date(val).getFullYear(), mounth)
                if (new Date(val).getTime() >= new Date().getTime() || mounth >= new Date().getMonth() + 1 ) {
                    return false
                }         
                this.isShowMaxDays = true
                this.dataList = getDaysNum(days, mounth, this.isShowMaxDays)
            }
        },
    },
    methods: {
        handleClose(id) {
            if (id === this.search.shop) {
                this.search.shop = ''
            }
            this.tagsList.splice(this.tagsList.findIndex(item => item.address === id), 1)
        },
        getMonthDay(year, month) {
            let days = new Date(year, month, 0).getDate()
            return days      
        },
        getDataList() {
            let mounth = new Date(this.search.time).getMonth() + 1
            let days = this.getMonthDay(new Date(this.search.time).getFullYear(), mounth)
            this.dataList = getDaysNum(days, mounth, this.isShowMaxDays)
        },
        changeMounthDay() {         
            this.isShowMaxDays = !this.isShowMaxDays
            this.getDataList()
        },
        /* 设定目标值 */
        settingTarget() {
            this.modal_settingTarget = true
        },
        /* 确定修改目标值 */
        confirm() {

        },
        /* 取消修改目标值 */
        cancel() {
            this.modal_settingTarget = false
        }
    },
    created() {
        this.getDataList()
    }
}
</script>
<style lang="scss" scoped>
.main {
    .head{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin: 10px 0;
        & > div {
            display: flex;
            align-items: center;
            margin-right: 15px;
            & > span {
                width: fit-content;
                // text-align: right;
                margin-right: 15px;
            }
        }
    }
}
</style>