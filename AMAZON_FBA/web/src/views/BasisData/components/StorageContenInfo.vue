<template>
    <div class="content">
        <div>
            <div>
                <span><i>*</i>仓库名称: </span>
                <el-input v-model="form.whouseName" clearable placeholder="请输入"/>
            </div>  
            <div>
                <span>仓库备注:</span>
                <el-input v-model="form.remark" clearable placeholder="请输入"/>
            </div>  
            <div>
                <span><i>*</i>仓库类型: </span>
                <el-select v-model="form.type" filterable clearable  placeholder="请选择">
                    <el-option
                        v-for="item in warehouseTypeList"
                        :key="item.dicValue"
                        :label="item.dicName"
                        :value="item.dicValue"
                        ></el-option>
                </el-select>
            </div>       
        </div>
        <div>
            <div>
                <span>省: </span>
                <el-input v-model="form.province" clearable placeholder="请输入"/>
            </div>
            <div>
                <span>市:</span>
                <el-input v-model="form.city" clearable placeholder="请输入"/>
            </div>
            <div>
                <span>联系人:</span>
                <el-input v-model="form.contactName" clearable placeholder="请输入"/>
            </div>
        </div>
        <div>
            <div>
                <span>邮编: </span>
                <el-input v-model.number="form.postalCode" clearable placeholder="请输入" oninput="value=value.replace(/[^\d]/g,'')" />
                </div>
            <div>
                <span>联系电话:</span>
                <el-input v-model.number="form.contactPhone" clearable placeholder="请输入" oninput="value=value.replace(/[^\d]/g,'')" />
            </div>  
            <div>
                <span>街道地址:</span>
                <el-input v-model="form.address" clearable placeholder="请输入" />
            </div>
        </div>
        <div v-show="show">
            <slot name="fourth"></slot>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        },
        form: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapGetters(['warehouseTypeList'])
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
        div {
            display: flex;
            align-items: center;
            width: 33%;
            & > span {
                min-width: 100px;
                i {
                    color: red;
                    margin-right: 3px
                }
            }
            .el-input, .el-select {
                width: 80%;
            }
        }   
    }
    & > div:nth-child(4) {
        justify-content: flex-start;
        div {
            width: 80%;
        }
    }
}
</style>