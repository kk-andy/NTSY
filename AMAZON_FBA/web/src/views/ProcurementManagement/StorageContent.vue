<template>
    <div class="main">
        <Header>
            采购单入库
        </Header>
        <storage-content-head>
            <span>采购单号: {{ purchaserId }}</span>
        </storage-content-head>
        <storage-content-body :detail="detail" :flag="false" />
        <div class="content-table">
            <div id="print-content">
                <ul>
                    <li>图片</li>
                    <li>SKU</li>
                    <li>品名</li>
                    <!-- <li>采购单价</li> -->
                    <li>采购数量</li>
                    <li>已入数量</li>
                    <!-- <li>入库类型</li> -->
                    <li><i>*</i>入库数量</li>
                    <li>入库总金额</li>
                </ul>
                <div class="ul-content">
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
                            <span>{{ item.purchaseCount }}</span>
                        </li>
                        <li class="gray-block">
                            <span>{{ item.inCount }}</span>
                        </li>
                        <!-- <li>
                            {{ item.transAttr }}
                        </li> -->
                        <li>
                            <el-input v-model.number="item.count" clearable placeholder="请输入" oninput="value=value.replace(/[^\d]/g,'')" />
                        </li>
                        <li>
                            <span>{{ item.skuInAmount }}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <ul>
                <li>
                    <span>入库备注：</span>
                    <el-input v-model="note" clearable placeholder="请输入" type="textarea" maxlength="300" show-word-limit />
                </li>
                <li>
                    <el-button type="primary" class="btn_button_primary" @click="generatePutinStorageOrder">生成入库单</el-button>
                </li>
                <li>
                    <router-link :to="{ name: 'Procurementorder' }">
                        <el-button>返回</el-button>
                    </router-link>           
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import StorageContentHead from './components/StorageContentHead'
import StorageContentBody from './components/StorageContentBody'
import { mapState } from 'vuex'
import { message } from '@/utils/common'
export default {
    components: {
        StorageContentHead,
        StorageContentBody
    },
    computed: {
        ...mapState({
            detail: state => state.Procurementorder.detail,
            detailItems: state => state.Procurementorder.detailItems
        })
    },
    data() {
        return {
            note: '',
            purchaserId: '',
            // printObj: {
            //   id: "content",
            //   popTitle: '商品标签',
            // //   extraCss: 'https://www.google.com,https://www.google.com',
            //   extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
            // }
        }
    },
    methods: {
        generatePutinStorageOrder() {
            /* 判断当前有没有填写入库数量 */
            let list = this.detailItems.filter(item => item.planCount - item.inCount !== 0 && item.count)
            if (!list.length) {
                message('warning', '至少填写一个sku的入库数量')
                return
            }
            let flag = true
            list.forEach(item => {
                if (item.count > ( item.purchaseCount - item.inCount )) {
                    flag = false
                    return
                }
            })
            if (!flag) {
                message('warning', '入库数量必须不能大于采购数量与已入数量的最大差值')
                return
            }
            let data = {
                purchaseId: this.purchaserId,
                remark: this.note,
                skuList: list.map(item => {
                    return {
                        inCount: item.count,
                        sku: item.sku
                    }
                })
            }
            this.$store.dispatch('Procurementorder/generatePurchaseIn', data)
        }
    },
    async created() {
        this.purchaserId = this.$route.query.purchaserId
        // let params = {purchaseId: this.purchaserId}
        await this.$store.dispatch('Procurementorder/getPurchaseOrderDetail', this.purchaserId)
    }
}
</script>
<style scoped lang="scss">
.main {
    // width: 90% !important;
    margin: 0 auto;
    Header {
        font-weight: bold;
        font-size: 16px;
        color: #606266;
        padding: 15px 0;
        border-bottom: 1px solid #dfe6ec;
    }
    .content-table {
        font-size: 14px;
        ul {
            padding-left: 0px;
        }
        & > div {
            ul:nth-child(1), .ul-content ul {
                display: flex;
                margin: 0px;
                li {
                    display: flex;
                    align-items: center;
                    width: 15%;
                    justify-content: center;
                    color: #606266;
                    i {
                        color: red;
                    }
                }
                li:nth-child(1) {
                    width: 10%;
                }
                li:nth-child(3) {
                    width: 20%;
                }
                li:nth-child(6) {
                    width: 15%;
                }
                .gray-block > span {
                    display: inline-block;
                    width: 60%;
                    background-color: #DCDFE6;
                    height: 36px;
                    line-height: 36px;
                    text-align: center;
                    border-radius: 3px;
                    color: #606266;
                }
            }
            ul:nth-child(1) {
                height: 46px;
                // line-height: 46px;
                background-color: #F2F6FC;
                border: 1px solid #dfe6ec;
            }
            .ul-content ul {
                height: 58px;
                background-color: #F2F6FC;
                border-bottom: 1px solid #dfe6ec;
                img {
                    height: 57px;
                    width: 60%;
                    text-align: center;
                }
                // li:nth-child(3) {
                //     width: 15%;
                // }
            }
        } 
        & > ul:nth-child(2) {
            display: flex;
            margin: 0px;
            min-height: 58px;
            border-bottom: 1px solid #dfe6ec;
            li {
                display: flex;
                align-items: center;
            }
            li:first-child{
                width: 70%;
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
            li:nth-child(2), li:nth-child(3) {
                width: 15%;
                justify-content: flex-end;
            }
        }
    }
}
</style>
<style lang="scss">
.content-table {
    ul:nth-child(3) {
        input {
            height: 58px;
        }
    }
    .el-popover__reference {
        height: 57px;
    }
}
</style>
<style media="print" lang="scss">        
</style>