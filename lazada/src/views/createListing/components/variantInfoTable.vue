<template>
    <el-table
        :data="tableList"
        @cell-dblclick="dubleClick"
        max-height="500"
        border
        style="width: 100%">
        <el-table-column
        width="180"
        align="center">
        <template slot="header">
            <span class="red_symbol">*</span>
            <span>刊登SKU</span>
        </template>
        <template slot-scope="scope">
            <el-input type="text" v-model="scope.row.sku" :disabled="showDisabled" />
        </template>
        </el-table-column>
        <el-table-column
        v-for="(item, index) in headTableProAttr"
        :key="index"
        align="center">
        <template slot="header">
            <span class="red_symbol">{{item}}</span>
        </template>
        <template slot-scope="scope">
            <span>{{scope.row[item]}}</span>
        </template>
        </el-table-column>
        <el-table-column
        v-for="(item) in lazadaTableHead"
        width="200"
        :key="item.attr_label"
        align="center">
        <template slot="header">
            <span class="red_symbol" v-if="item.is_mandatory">*</span>
            <span>{{ item.attr_label }}</span>
        </template>
        <template slot-scope="scope">
            <el-input type="text" v-if="item.input_type === 'text' " v-model="scope.row[item.attr_label]"  @blur="changeColorFamily(item.attr_label, scope.row)"/>
            <el-select  v-if="item.input_type === 'singleSelect' " filterable  v-model="scope.row[item.attr_label]" @change="changeColorFamily(item.attr_label, scope.row)">
                <el-option :value="item" :label="item" v-for="(item, index) in item.options.split(',')" :key="index"></el-option>           
            </el-select>
            <el-select  v-if="item.input_type === 'multiSelect' " filterable multiple v-model="scope.row[item.attr_label]" @change="changeColorFamily(item.attr_label, scope.row)">
                <el-option :value="item" :label="item" v-for="(item, index) in item.options.split(',')" :key="index"></el-option>           
            </el-select>
            <el-select  v-if="item.input_type === 'enumInput' " filterable allow-create default-first-option v-model="scope.row[item.attr_label]" @change="changeColorFamily(item.attr_label, scope.row)">
                <el-option :value="item" :label="item" v-for="(item, index) in item.options.split(',')" :key="index"></el-option>           
            </el-select>
        </template>
        </el-table-column>
        <el-table-column
        width="150"
        prop="quantity"
        align="center">
        <template slot="header">
            <span class="red_symbol">*</span>
            <span>库存</span>
        </template>
        <template slot-scope="scope">
            <el-input type="text" v-model.number="scope.row.quantity" oninput="value=value.replace(/[^\d]/g,'')" />
        </template>
        </el-table-column>
        <el-table-column
        prop="price"
        width="150"
        align="center">
        <template slot="header" slot-scope="scope">
            <span class="red_symbol">*</span>
            <span>价格</span>
            <i class="el-icon-s-tools" v-if="showSeetingprice > 0 && showCites && showSteeingPrice" @click="settingPrice(scope.row, 'all')"></i>
        </template>
        <template slot-scope="scope" >
            <div class="price_setting">
                <el-input type="text" v-model="scope.row.price" oninput="value=value.replace(/[^0-9.]/g,'')" />
                <i class="el-icon-s-tools" v-if="showSeetingprice > 0 && showCites" @click="settingPrice(scope.row, 'single')"></i>
            </div>
        </template>
        </el-table-column>
        <el-table-column
        prop="special_price"
        width="150"
        align="center">
            <template slot="header">
                <span>促销价</span>
            </template>
            <template slot-scope="scope" >
                <el-input type="text" v-model="scope.row.special_price" oninput="value=value.replace(/[^0-9.]/g,'')" />
            </template>
        </el-table-column>
        <el-table-column
        prop="address"
        align="center"
        width="300"
        label="促销时间">
            <template slot-scope="scope">
                <el-date-picker
                v-model="scope.row.special_from_date"
                style="width:130px"
                size="mini"
                type="date"
                @change="changeTime(scope.row)"
                placeholder="选择日期">
                </el-date-picker>
                -
                <el-date-picker
                v-model="scope.row.special_to_date"
                @change="changeTime(scope.row)"
                style="width:130px"
                size="mini"
                type="date"
                placeholder="选择日期">
                </el-date-picker>
            </template>
        </el-table-column>
        <el-table-column
        align="center">
        <template slot="header">
            <span>更多信息</span>
            <i class="el-icon-s-tools" @click="setting('all')"></i>
        </template>
        <template slot-scope="scope" >
            <p class="editor" @click="setting(scope.row)">设置</p>
        </template>
        </el-table-column>
        <el-table-column
        label="操作"
        align="center"
        width="100">
        <template slot-scope="scope">
            <i class="el-icon-remove" style="color: #337ab7;cursor: pointer;font-size: 22px;" @click="deleteCell(scope.row, scope.$index)"></i>
        </template>
        </el-table-column>
  </el-table>
</template>
<script>
export default {
    name: 'variantInfoTable',
    props: {
        tableList: {
            type: Array,
            default: () => []
        },
        headTableProAttr: {
            type: Array,
            default: () => []
        },
        lazadaTableHead: {
            type: Array,
            default: []
        },
        showSeetingprice: {
            type: Number,
            default: 0
        },
        showCites: {
            type: Boolean,
            default: false
        },
        showSteeingPrice: {
            type: Boolean,
            default: false
        },
        showDisabled: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        setting(item) {
            this.$emit('settingInfo',item)
        },
        deleteCell(item, index) {
            this.$emit('deleteCell', item, index)
        },
        settingPrice(item, str) {
            this.$emit('settingPrice', item, str)
        },
        changeTime(item) {
            if (item.special_to_date && item.special_from_date) {
                if (new Date(item.special_from_date).getTime() > new Date(item.special_to_date).getTime()) {
                    let time = item.special_from_date
                    item.special_from_date = item.special_to_date
                    item.special_to_date = time
                }
            }
        },
        // 双击单元格
        dubleClick(row, column, cell, event) {
            if (column.property !== 'price' && column.property !== 'special_price') {
                return false
            }
            if (row.price) {
                this.tableList.forEach(item => {
                    item[column.property] = row[column.property]
                })
            }
            if (row.salePrice) {
                this.tableList.forEach(item => {
                    item[column.property] = row[column.property]
                })
            }
            
        },
        /* 改变colorFamily */
        changeColorFamily(label, item) {
            // if (!item[label]) {
            //     return
            // }
            this.$emit('changeColorFamily', label, item)
        },
        changesizelazada(item) {
            if (!item.sizelazada) {
                return
            }
            this.$emit('changesizelazada', item)
        }
    },
    mounted() {
        // if (this.tableList.length) {
        //     this.tableHead = this.tableList[0].attrs
        // }
        // console.log(this)
    }
}
</script>
<style lang="scss" scoped>
.red_symbol{
    color: #ff4949
}
.el-icon-s-tools{
    color: #337ab7;
    cursor: pointer;
}
.price_setting{
    display: flex;
    align-items: center;
    & > i {
        margin-left: 5px;
        font-size: 22px;     
    }
}
</style>