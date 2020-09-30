<template>
    <div class="content" id="content">
        <div>
            <div>
                <span>盘点日期:</span>
                <span>{{ date }}</span>
            </div>
            <div>
                <span>仓库:</span>
                <el-autocomplete
                        v-model="warehouseName"
                        clearable
                        :fetch-suggestions="querySearchAsync"
                        value-key="whouseName"
                        placeholder="请输入"
                        @select="handleSelect"
                ></el-autocomplete>
                <span class="biaoji">{{ message }}!!!</span>
            </div>
        </div>
        <div>
            <div>
                <span>备注:</span>
                <el-input v-model="note" clearable placeholder="请输入" maxlength="300"  show-word-limit type="textarea" />
            </div>
            <div>
            </div>
        </div>
    </div>
</template>
<script>
import { getSearchWarehourseList } from '@/api/WarehouseManagement'
import { debounce } from '@/utils/common'
export default {
    props: {
        date: {
            type: String,
            default:''
        },
        remark: {
            type: String,
            default:''
        },
    },
    data() {
        return {
            note: this.remark,
            message: '切换仓库会导致下面SKU清空,请谨慎选择',
            warehouseName: '',
        }
    },
    watch: {
        warehouseName(val) {
            if (!val) {
                this.$emit('change_warehouseId', '')
            }
        },
        note(val) {
            this.$emit('change_remark', val)
        }
    },
    methods: {
        handleSelect(item) {
            this.warehouseName = item.whouseName
            this.warehouseId = item.whouseId
            this.$emit('change_warehouseId', item.whouseId)
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
    }
}
</script>
<style scoped lang="scss">
.content {
    & > div {
        display: flex;
        justify-content: space-around;
        align-items: center;
        min-height: 58px;
        align-items: center;
        // line-height: 58px;
        border-bottom: 1px solid #dfe6ec;
        color: #606266;
        & > div {
            width: 50%;
            padding-left: 100px;
            .biaoji{
                color: red;
                font-weight: 600;
            }
        }
    }
    & > div:nth-child(2) {
        & > div {
            display: flex;
            align-items: center;
        }
    }
}
</style>