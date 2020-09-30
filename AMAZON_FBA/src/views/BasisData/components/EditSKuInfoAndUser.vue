<template>
    <el-dialog
        title="库位管理"
        :visible.sync="showModule"
        @close="handleSubmit(false)"
        width="60%"
        top="10%"
        :close-on-click-modal="false"
    >
        <div class="edit-sku-info">
            <div>
                <span>仓库名称:</span>
                <span>{{ warehouseName }}</span>
            </div>
            <div>
                <span>存放库位:</span>
                <span>{{ item.spaceCode }}</span>
            </div>
            <div>
                <span>拣货人:</span>
                <el-select v-model="userID" filterable   placeholder="请选择">
                    <el-option
                        v-for="item in OAUserList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        ></el-option>
                </el-select>
            </div>
            <div>
                <span>绑定SKU:</span>
                <el-input placeholder="请输入内容,回车即可查询" v-model="bindingSku" style="width: 300px" @keyup.enter.native="doFilter(bindingSku)">  
                    <i slot="suffix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </div>
            <div>
                <span></span>
                <table-content 
                @deleteSingleSku="deleteSingleSku"
                :tableData="list"
                />
            </div>
        </div>
        <div class="btn">
            <el-button @click="handleSubmit(false)">取消</el-button>
            <el-button class="btn_button_primary" type="primary" @click="handleSubmit(true)">保存</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { message } from '@/utils/common'
import EditSkuInfoTable from './EditSKuInfoTable'
import { mapState } from 'vuex'
export default {
    name: 'EditBindingSkuInfoModal',
    components: {
        'TableContent': EditSkuInfoTable
    },
    computed: {
        // ...mapState({
        //     singleSkuInfo: state => state.WarehouseManagement.singleSkuInfo
        // }),
        // singleSkuInfo: {
        //     get() {
        //         return this.$store.state.WarehouseManagement.singleSkuInfo
        //     },
        //     set(val) {
        //         this.$store.state.WarehouseManagement.singleSkuInfo = val
        //     }
        // }
    },
    watch: {
        userID(val) {
            this.$emit('changePickingUserId', val)
        }
    },
    props: {
        showSkuInfoModule: {
            type: Boolean,
            default: false
        },
        OAUserList: {
            type: Array,
            default: () => []
        },
        list: {
            type: Array,
            default: () => []
        },
        item: {
            type: Object,
            required: true
        },
        warehouseName: {
            type: String,
            default: ''
        },
        pickingUserId: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            bindingSku: '',
            userID: this.pickingUserId,
            showModule: this.showSkuInfoModule,
            originalList: JSON.parse(JSON.stringify(this.list))
        }
    },
    methods: {
        handleSubmit(flag) {
            this.bindingSku = ''
            if (!flag) {
                this.showModule = false
                this.$emit('handleSubmit', flag)
                return
            }
            if (!this.userID) {
                message('warning', '请选择拣货人')
                return
            }
            let originalSku = this.originalList.map(item => item.sku) /* 原始sku数据 */
            let newSku = this.list.map(item => item.sku) /* 新的shku数据 */
            let addSku = newSku.filter(item => !originalSku.includes(item)) /* 新增的sku */
            let delSku = originalSku.filter(item => !newSku.includes(item)) /* 删除的sku */
            let addSkuModelList = this.list.filter(item => addSku.includes(item.sku))
            let delSkuModelList = this.originalList.filter(item => delSku.includes(item.sku))
            let data = {
                pickingUserId: this.userID,
                addSkuModelList,
                delSkuModelList
            }
            this.$emit('handleSubmit', data)
        },
        deleteSingleSku(index) {
            // this.item.skuModelList.splice(index, 1)
        },
        /* 查询SKU */
        async doFilter(val) {
            if (!val) {
                message('warning', '请输入SKU')
                return
            }
            if (this.list.find(item => item.sku === val)) { /* 判断当前有没有相同的sku */
                message('warning', '当前的SKU已存在')
                return
            }
            await this.$store.dispatch('WarehouseManagement/getSingleSkuInfo', { sku: val }) /* 拿到sku信息 */
            // if (JSON.stringify(this.singleSkuInfo) !== '{}') { /* 判断当前已经获取到了sku */
            //     this.$store.commit('WarehouseManagement/ADD_SINGLE_POSITIONS_SKU_INFO', this.singleSkuInfo) /* 将当前的ksku信息插入到list中 */
            // }
        }
    },
}
</script>
<style scoped lang="scss">
.edit-sku-info {
    padding: 20px;
    & > div {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        // justify-content: space-around;
        span {
            height: 36px;
            line-height: 36px;
        }
        & > span:nth-child(1) {
            min-width: 100px;
            text-align: right;
            margin-right: 10px;
        }
        & > span:nth-child(2) {
            min-width: 300px;
            background-color: #dfe6ec;
            padding-left: 10px;
            border-radius: 5px;
            color: #333;
        }
        .el-select {
            min-width: 300px;
        }
    }
}
.btn{
    text-align: center;
}
</style>
