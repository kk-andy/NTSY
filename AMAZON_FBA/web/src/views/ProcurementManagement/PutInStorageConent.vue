<template>
    <div class="main">
        <Header>
            入库单
        </Header>
        <storage-content-head>
            <span>入库单号: {{ inCode }}</span>
        </storage-content-head>
        <storage-content-body :detail="detail" :flag="true" />
        <div class="content-table">
            <ul>
                <li>图片</li>
                <li>SKU</li>
                <li>品名</li>
                <li>商品属性</li>
                <li>质检要求</li>
                <li>重量</li>
                <li>内箱长</li>
                <li>内箱宽</li>
                <li>内箱高</li>
                <li>库位</li>
                <li><i>*</i>入库数量</li>
                <li>入库总金额</li>
                <li>计划入库</li>
            </ul>
            <div class="content-ul">
                <ul v-for="item in detailItems" :key="item.sku">
                    <li>
                        <el-popover placement="right" width="350" trigger="hover">
                                <img :src="item.skuImg" alt style="width:100%;" />
                                <div slot="reference" style="text-align: center">
                                <img
                                    :src="item.skuImg"
                                    alt
                                    style=""
                                />
                                </div>
                        </el-popover>
                    </li>
                    <li>{{ item.sku }}</li>
                    <li>{{ item.skuName }}</li>
                    <li class="gray-block">
                        <span>{{ item.transAttr }}</span>
                    </li>
                    <li class="gray-block">
                        <span>{{ item.qualityStd }}</span>
                    </li>
                    <li :class="{'gray-block': type == 1}">
                        <el-input v-model="item.skuWeight" clearable placeholder="" oninput="value=value.replace(/[^0-9.]/g,'')" v-if="type == 0" />
                        <span v-else>{{ item.skuWeight }}</span>
                    </li>
                    <li :class="{'gray-block': type == 1}">
                        <el-input v-model="item.skuLength" clearable placeholder="" oninput="value=value.replace(/[^0-9.]/g,'')" v-if="type == 0" />
                        <span v-else>{{ item.skuLength }}</span>
                    </li>
                    <li :class="{'gray-block': type == 1}">
                        <el-input v-model="item.skuWide" clearable placeholder="" oninput="value=value.replace(/[^0-9.]/g,'')" v-if="type == 0" />
                        <span v-else>{{ item.skuWide }}</span>
                    </li>
                    <li :class="{'gray-block': type == 1}">
                        <el-input v-model="item.skuHeight" clearable placeholder="" oninput="value=value.replace(/[^0-9.]/g,'')" v-if="type == 0" />
                        <span v-else>{{ item.skuHeight }}</span>
                    </li>
                    <li>
                        <el-input v-model="item.spaceCode" clearable placeholder=""  disabled v-if="item.spaceCode"  />
                        <el-select v-model="item.spaceId" filterable clearable :disabled="type == 1"  placeholder="请选择" v-if="!item.spaceCode">
                        <el-option
                            v-for="item in spaceList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            ></el-option>
                        </el-select>
                    </li>
                    <li>        
                        <el-input v-if="detail.state === 3" v-model.number="item.inCount" min="1" :disabled="type == 1" clearable placeholder="" oninput="value=value.replace(/[^\d]/g,'')" />
                        <el-input v-else v-model.number="item.count" min="1" :disabled="item.planCount - item.inCount === 0 || type == 1 " clearable placeholder="" oninput="value=value.replace(/[^\d]/g,'')" />
                    </li>
                    <li>        
                        <span>{{ item.skuInAmount }}</span>
                    </li>
                    <li class="gray-block">
                        <span>{{ item.planCount }}</span>
                    </li>
                </ul>
            </div>       
            <ul>
                <li>
                    <span>入库备注：</span>
                    <el-input v-model="detail.remark" clearable placeholder="请输入" maxlength="300"  show-word-limit type="textarea" />
                </li>
                <li>
                    <el-button type="primary" class="btn_button_primary" @click="printShowProductModule">打印商品标签</el-button>
                </li>
                <li>
                    <el-button type="primary" class="btn_button_primary" @click="printShowModule">打印入库单</el-button>
                </li>
                <li v-if="type == 0">
                    <el-button type="primary" class="btn_button_primary" @click="confirmPutinStorage">确认入库</el-button>
                </li>
                <li>
                    <router-link :to="{ name: 'PutInStorageOrder' }">
                        <el-button>返回</el-button>
                    </router-link>           
                </li>   
            </ul>
            <procurement-documents 
            @handleChangeModule="handleChangeModule"
            v-if="showModule" 
            :showModule="showModule" 
            :detail="detail" 
            :detailItems="detailItems" 
            :date="date" />
            <product-barcode-components
            @handleChangeModule="changeProductModuleType"
            v-if="showProductModule"
            :showProductModule="showProductModule"
            :detailItems="detailItems" 
             />
        </div>
    </div>
</template>
<script>
import StorageContentHead from './components/StorageContentHead'
import StorageContentBody from './components/StorageContentBody'
import ProcurementDocuments from '@/components/ProcurementDocuments'
import ProductBarcodeComponents from '@/components/ProcurementDocuments/productBarcode'
import { mapState } from 'vuex'
import { message, dateFormat } from '@/utils/common'
export default {
    components: {
        StorageContentHead,
        StorageContentBody,
        ProcurementDocuments,
        ProductBarcodeComponents
    },
    computed: {
        ...mapState({
            detail: state => state.PutInStorageOrder.detail,
            detailItems: state => state.PutInStorageOrder.detailItems,
            spaceList: state => state.PutInStorageOrder.spaceList
        })
    },
    data() {
        return {
            whouseId: '',
            type: 1,
            showModule: false,
            showProductModule: false,
            date: '',
            inCode: '',
        }
    },
    methods: {
        printShowModule() {
            this.date = dateFormat(new Date())
            this.showModule = true
        },
        printShowProductModule() {
            this.showProductModule = true
        },
        handleChangeModule(show) {
            this.showModule = show
        },
        changeProductModuleType(show) {
            this.showProductModule = show
        },
        confirmPutinStorage() {
             /* 判断当前有没有填写入库数量 */
            let list = this.detailItems.filter(item => item.planCount - item.inCount !== 0)
            let flagCount = true
            let flag = true
            list.forEach(item => {
                if (!item.count) {
                    flagCount = false
                    return
                }
                if (item.count > ( item.planCount - item.inCount )) {
                    flag = false
                    return
                }
            })
            if (!flagCount) {
                message('warning', '入库数量必须填写')
                return
            }
            if (!flag) {
                message('warning', '入库数量不能大于计划入库数量与已入库数量的差值')
                return
            }
            let data = {
                inCode: this.inCode,
                remark: this.detail.remark,
                skuList: list.map(item => {
                    return {
                        inCount: item.count,
                        sku: item.sku,
                        height: item.skuHeight,
                        length: item.skuLength,
                        spaceCode: item.spaceCode,
                        spaceId: item.spaceId,
                        weight: item.skuWeight,
                        wide: item.skuWide
                    }
                })
            }
            this.$store.dispatch('PutInStorageOrder/purchaseInStockIn', data)
        }
    },
    async created() {
        let { inCode, type, whouseId  } = this.$route.query
        this.inCode = inCode
        this.type = type
        this.whouseId = whouseId

        await this.$store.dispatch('PutInStorageOrder/getQuerySpace', this.whouseId)
        this.$store.dispatch('PutInStorageOrder/getPutInStorageOrderDetail', this.inCode)
    }
}
</script>
<style scoped lang="scss">
.main {
    // width: 95% !important;
    margin: 0 auto;
    Header {
        font-weight: bold;
        font-size: 16px;
        color: #606266;
        padding: 15px 0;
        border-bottom: 1px solid #dfe6ec;
    }
    .content-table {
        ul:nth-child(1), .content-ul ul {
            display: flex;
            margin: 0px;
            li {
                display: flex;
                align-items: center;
                width: 7%;
                justify-content: center;
                color: #606266;;
                i {
                    color: red;
                }
            }
            li:nth-child(2) {
                width: 10%;
            }
            li:nth-child(3) {
                width: 23%;
            }
            .gray-block > span {
                display: flex;
                width: 95%;
                background-color: #DCDFE6;
                height: 36px;
                align-items: center;
                justify-content: center;
                // line-height: 36px;
                text-align: center;
                border-radius: 3px;
                color: #333;
            }
        }
        ul:nth-child(1) {
            min-height: 46px;
            // line-height: 46px;
            background-color: #F2F6FC;
            border: 1px solid #dfe6ec;
        }
        .content-ul ul {
            min-height: 78px;
            border-bottom: 1px solid #dfe6ec;
            img {
                    height: 57px;
                    width: 60%;
                    text-align: center;
                }
        }
        & > ul:nth-child(3) {
            display: flex;
            margin: 0px;
            min-height: 58px;
            border-bottom: 1px solid #dfe6ec;
            li {
                display: flex;
                align-items: center;
            }
            li:first-child{
                width: 60%;
                span {
                    width: 100px;
                    color: #ccc;
                }
                .el-input {
                    min-height: 58px;
                    .el-input__inner {
                        min-height: 58px;
                    }
                }
            }
            li:nth-child(2), li:nth-child(3), li:nth-child(4), li:nth-child(5) {
                width: 15%;
                justify-content: flex-end;
            }
        }
    }
}
</style>
<style lang="scss">
.content-table {
    & > ul:nth-child(3) {
        input {
            height: 58px;
        }
    }
    .content-ul ul {
        .el-input {
            width: 80px;
        }
    }
     .el-popover__reference {
        height: 57px;
    }
}
</style>