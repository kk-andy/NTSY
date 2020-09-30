<template>
    <el-table
        ref="multipleTable"
        class="clear_padding"
        :data="tableData"
        tooltip-effect="dark"
        :cell-class-name="tableRowClassName"
        @selection-change="handleSelectionChange"
        height="500"
        border
        style="width: 100%"
    >
        <el-table-column
        type="selection"
        align="center"
        width="55"
      />
        <el-table-column
            label="Listing信息"
            align="center"
        >
            <template slot-scope="{row}">
                <div style="margin:5px 0;">{{row.item_id}}</div>
                <div style="margin:5px 0;">{{row.account_name}}</div>
                <div style="margin:5px 0;">{{row.shop_name}}</div>
                <div style="margin:5px 0;">{{row.site_code}}</div>
            </template>
        </el-table-column>
        <el-table-column
            prop="pd_name"
            align="center"
            label="标题"        
        >
            <template slot-scope="{row}">
                <div class="isOverflow">
                    <el-link
                        :href="row.pd_name_url"
                        style="color:#46a6ff"
                        :underline="false"
                        target="_blank"
                        type="primary"
                    >{{row.pd_name}}</el-link>
                </div>
            </template>
        </el-table-column>
        <el-table-column
            prop="created_name"
            align="center"
            label="缩略图"     
        >
          <template slot-scope="{row}">
                <a :href="row.thumbnail_org " target="_blank">
                <el-popover placement="right" width="350" trigger="hover">
                    <img :src="row.thumbnail_org " alt style="width:100%;" />
                    <div slot="reference">
                    <img
                        :src="row.thumbnail"
                        alt
                        style="width:60%; text-align:center;margin-top:10px"
                    />
                    </div>
                </el-popover>
                </a>
          </template>
        </el-table-column>
        <el-table-column
            prop="online_status"
            align="center"
            width="80"
            label="平台状态"
        >
        </el-table-column>
        <el-table-column
            prop="created_at"
            align="center"
            label="刊登SKU"
            width="200"
            class="clear"
        >
            <template slot-scope="{row}" class="clear">
                <div
                class="isOverflow"
                :class="{ 'border_bottom': row.skuList.length > 1 && index !== row.skuList.length - 1}"
                v-for="(item,index) in row.skuList"
                :key="index"
                style="line-height: 33px;height: 33px;"
                >
                    <span>{{item.sku}}</span>
                    <span>{{item.status}}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column
            align="center"      
            label="价格(原价)"
        >
          <template slot-scope="{row}" class="clear_padding">
            <div 
            v-for="(item,index) in row.priceArr" 
            :key="index" 
            class="isOverflow" 
            :class="{ 'border_bottom': row.skuList.length > 1 && index !== row.skuList.length - 1}">
                <el-input
                    size="mini"
                    v-model="item.price"
                    :disabled="item.status === 'deleted' "
                    oninput="value=value.replace(/[^0-9.]/g,'')"
                    @blur="chagneInputVal(row,item,item.price,'price')"
                    @focus="chagneBeforeVal(item.price)"
                ></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            label="促销价"
        >
          <template slot-scope="{row}">
            <div 
            v-for="(item,index) in row.specialPriceArr" 
            :key="index" 
            class="isOverflow"
            :class="{ 'border_bottom': row.skuList.length > 1 && index !== row.skuList.length - 1}"
            >
                <el-input
                    size="mini"
                    v-model="item.price"
                    :disabled="item.status === 'deleted' "
                    oninput="value=value.replace(/[^0-9.]/g,'')"
                    @blur="chagneInputVal(row,item,item.price,'specialPrice')"
                    style="width: 50%"
                    @focus="chagneBeforeVal(item.price)"
                ></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            label="线上库存"
        >
          <template slot-scope="{row}">
            <div 
            v-for="(item,index) in row.isStockArr" 
            :key="index" 
            class="isOverflow" 
            :class="{ 'border_bottom': row.skuList.length > 1 && index !== row.skuList.length - 1}">
                <el-input
                    size="mini"
                    v-model.number="item.isStock"
                    :disabled="item.status === 'deleted' "
                    oninput="value=value.replace(/[^\d]/g,'')"
                    @blur="chagneInputVal(row,item,item.isStock,'isStoc')"
                    @focus="chagneBeforeVal(item.isStock)"
                ></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            label="处理SKU"
            width="100px"
        >
          <template slot-scope="{row}">
            <div 
            v-for="(item,index) in row.skuList" 
            :key="index" 
            class="isOverflow"
            :class="{ 'border_bottom': row.skuList.length > 1 && index !== row.skuList.length - 1}"
            >
                <img :src="shangjia" alt="" v-if="item.status === 'inactive'" @click="singleChangeSku(row.item_id, item.sku, 'Shelves')">
                <img :src="xiajia" alt="" v-if="item.status === 'active' || item.status === 'live' " @click="singleChangeSku(row.item_id, item.sku, 'offShelf')">
                <img :src="del" alt="" v-if="item.status !== 'deleted'" @click="singleChangeSku(row.item_id, item.sku, 'del')">
            </div>
          </template>
        </el-table-column>
        <el-table-column
            prop="publisher_id"
            align="center"
            width="80"
            label="刊登人"
        >
        </el-table-column>
        <!-- <el-table-column
            prop="push_date"
            align="center"
            label="刊登时间"
        >
        </el-table-column> -->
        <el-table-column
            prop="pull_date"
            align="center"
            label="拉取时间"
        >
        </el-table-column>
        <el-table-column
            label="操作"
            align="center"
        >
            <template slot-scope="{row}">
            <div>
                <el-button
                    type="text"
                    class="synColor"
                    v-if="row.online_status !== 'deleted' && showButtons.edit "
                    @click="edit(row.id)"
                >编辑</el-button>
                <el-button
                    class="synColor"
                    v-if="row.online_status === 'deleted' && showButtons.log "
                    type="text"
                    @click="log(row,'draft')"
                >日志</el-button>
                <el-dropdown trigger="click" v-if="row.online_status !== 'deleted' ">
                    <span class="el-dropdown-link">
                    <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <el-button
                        type="text"
                        class="editColor"
                        v-if="row.online_status !== 'rejected' && row.online_status !== 'deleted' && row.online_status !== 'inactive' && showButtons.offShelf "
                        @click="offShelf(row.item_id,'single')"
                        >下架</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-button
                        type="text"
                        class="editColor"
                        v-if="row.online_status !== 'rejected' && row.online_status !== 'deleted' && row.online_status !== 'live' && showButtons.shelves "
                        @click="shelves(row.item_id,'single')"
                        >上架</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-button
                        type="text"
                        class="editColor"
                        v-if="row.online_status !== 'deleted' && showButtons.deleteContent "
                        @click="deleteContent(row.item_id,'single')"
                        >删除</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-button
                        type="text"
                        class="copyColor"
                        v-if="row.online_status !== 'rejected' && row.online_status !== 'deleted' && showButtons.copyOperation "
                        @click="copyOperation(row.id)"
                        >复制</el-button>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <el-button
                        class="synColor"
                        type="text"
                        @click="log(row,'draft')"
                        >日志</el-button>
                    </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
          </template>
      </el-table-column>
    </el-table>
</template>
<script>
import { message } from '@/utils/common'
import shangjia from '@/icons/images/shangjia.png'
import xiajia from '@/icons/images/xiajia.png'
import del from '@/icons/images/del.png'
export default {
    props: {
        tableData: Array,
        showButtons: {
            type: Object,
            required: true
        }
    },
    data() {
      return {
        beforeVal: '',
        shangjia,
        xiajia,
        del
      }
    },
    methods: {
        tableRowClassName({row, column, rowIndex}) {
            if (column.label === '刊登SKU' || column.label === '价格(原价)' || column.label === '线上库存' || column.label === '促销价' || column.label === '处理SKU') {
                return 'clear_row_padding'
            }
        },
        /* 记录鼠标进入的值 */
        chagneBeforeVal(value) {
            this.beforeVal = value
        },
        /* 改变价格 库存 促销价 */
        chagneInputVal(row, item, val, str) {
            if (this.beforeVal === val) {
                return
            }
            if (!val) {
                return
            }
            if (str !== 'isStoc') {
                let priceReg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
                if (!priceReg.test(val)) {
                    message('warning', '请输入正确的产品价格,整数或者保留两位小数')
                    return
                }
            }
            let data = {
                item_id: row.item_id,
                sku: item.sku,
                change_value: val
            }
            this.$emit('changeData', data, str)
        },
        log(item) {
            this.$emit('viewLog', { listing_id: item.id })
        },
        edit(id) {
            this.$emit('edit', id)
        },
        offShelf(id) {
            this.$emit('offShelf', id)
        },
        copyOperation(id) {
            this.$emit('copyOperation', id)
        },
        shelves(id) {
            this.$emit('shelves', id)
        },
        handleSelectionChange(val) {
            this.$emit('handleSelectionChange', val)
        },
        deleteContent(id) {
            this.$emit('deleteContent', id)
        },
        singleChangeSku(item_id, sku, status) {
            this.$emit('singleChangeSku', item_id, sku, status)
        },
    },
    mounted() {
        // this.addTdClass()
    },
    created(){
    }
}
</script>
<style scoped>
.editColor {
  color: #e6a23c;
}
.synColor {
  color: #409eff;
}
.logColor {
  color: #909399;
}
.copyColor {
  color: #67c23a;
}
</style>
<style lang="scss">
.clear_padding {
    .clear_row_padding{
        .cell {
            padding-left: 0;
            padding-right: 0;
            & > div {
                // border-bottom: 1px solid #dedede;
                .el-input {
                    width: 60%;
                }
            }
            .isOverflow{
                height: 33px;
                line-height: 33px;   
                white-space: nowrap;         
                margin: 5px 0;
                & > span:nth-child(2) {
                    // margin-right: 10px;
                    width: 45px;
                    // text-align: right;
                    display: inline-block;
                }
                img {
                    cursor: pointer;
                }
            }
            .border_bottom {
                border-bottom: 1px solid #dedede;
            }
        }
    }
}
</style>