<template>
    <transition name="el-fade-in-linear">
        <el-dialog
            :visible.sync="modal_bool"
            title="多站点价格"
            :close-on-click-modal="false"
            :before-close="() => confirm(false)"
            width="40%"
            class-name="vertical-center-modal"
        >
            <el-row type="flex" class="row-bg first_content" justify="space-around">
                <el-col :span="8">
                    <div class="grid-content">
                        <span class="title">站点</span>
                        <p>默认</p>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content">
                        <span class="title">价格</span>
                        <p>
                            <el-input
                                style="width: 100px"
                                v-model="form.price"
                                placeholder
                                oninput="value=value.replace(/[^0-9.]/g,'')"
                            />
                        </p>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content">
                        <span class="title">促销价</span>
                        <p>
                            <el-input
                                style="width: 100px"
                                v-model="form.special_price"
                                placeholder
                                oninput="value=value.replace(/[^0-9.]/g,'')"
                            />
                        </p>
                    </div>
                </el-col>
            </el-row>
            <el-row
                type="flex"
                class="row-bg"
                justify="space-around"
                v-for="(item, index) in list"
                :key="index"
            >
                <el-col :span="8">
                    <div class="grid-content">
                        <span>{{item.site_code}}</span>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content">
                        <el-input
                            style="width: 100px"
                            v-model="item.price"
                            placeholder
                            oninput="value=value.replace(/[^0-9.]/g,'')"
                        />
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content">
                        <el-input
                            style="width: 100px"
                            v-model="item.special_price"
                            placeholder
                            oninput="value=value.replace(/[^0-9.]/g,'')"
                        />
                    </div>
                </el-col>
            </el-row >
            <el-row type="flex" class="row-bg" justify="space-around" v-if="showToarts">
                <el-col :span="8">
                    <div class="grid-content">
                        <span>修改利润率计算</span>
                    </div>
                </el-col>
                <el-col :span="16">
                    <div class="grid-set">
                        <el-input
                            style="width: 100px"
                            v-model="form.gross_margin"
                            id="textIndex"
                            placeholder="请输入修值"
                            oninput="value=value.replace(/[^0-9.]/g,'')"
                            @keyup.enter.native="search()"
                        />
                        <span class="fuHao">%</span>
                        <el-button type="primary" class="btn_button_primary" @click="search()">确定修改</el-button>
                    </div>
                </el-col>
            </el-row>
            <el-row  v-if="showToarts">
                <el-col :span="24">
                 <div class="prompt">***修改利润率时需点击确定修改***</div>
                 <div class="prompt">***每次保存利润率时需点击确定***</div>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" class="btn_button_primary" @click="confirm(true)">确定</el-button>
                <el-button type="primary" class="btn_button_primary" @click="confirm(false)">取消</el-button>
            </span>
        </el-dialog>
    </transition>
</template>
<script>
import { Message  } from "element-ui";
import{message} from "@/utils/common"
export default {
    name: "settingSitePriceModal",
    props: {
        modal_settingPrice: {
            type: Boolean,
            default: false,
        },
        list: {
            type: Array,
            default: () => [],
        },
        form: {
            type: Object,
            required: true,
        },
        showToart:Boolean
    },
    data() {
        return {
            modal_bool: this.modal_settingPrice,
            // form: {
            //     price: '',
            //     special_price: ''
            // }
            input: Number(20),
            showToarts:true
        };
    },
    watch:{
        
    },
    methods: {
        confirm(bool = false) {
            if (!bool) {
                // this.form.price = ''
                // this.form.special_price = ''
                this.$emit("action-modal-content", bool);
                return;
            } 
            if (this.form.gross_margin < 12 || this.form.gross_margin > 99) {
                message( "warning","利润率在百分之12到百分之99之间");
                return;
            }        
            this.$emit("action-modal-content", this.form);
        },
        search() {
            // this.flag = true;
            if(this.form.gross_margin < 12 ){
                message( "warning","利润率不能小于百分之12");
                return;
            }
            if(this.form.gross_margin > 99 ){
                message( "warning","利润率不能大于百分之99");
                return;
            }
            // let ele = document.getElementById("textIndex").value;
            let params = {
                gross_margin: this.form.gross_margin,
            };
            this.$emit("search", params);
        },
    },
    created(){
       if(this.showToart){
           this.showToarts=false
       }

   
    }
};
</script>
<style lang="scss" scoped>
.prompt{
    font-size: 2px;
    height: 15px;
    color: red;
    text-indent: 56px;
}
.el-dialog__wrapper {
    .first_content {
        border-bottom: 1px solid #ededed;
        padding-bottom: 5px;
    }
    .row-bg {
        margin-bottom: 10px;
    }
    .fuHao {
        font-size: 20px;
        height: 36px;
        line-height: 36px;
        margin-right: 130px;
    }
    .grid-set {
        justify-content: center;
        display: flex;
    }
    .grid-content {
        text-align: center;
        line-height: 36px;
        .title {
            font-weight: bold;
            color: #333;
        }
    }
}
</style>