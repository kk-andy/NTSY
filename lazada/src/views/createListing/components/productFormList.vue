<template>
    <div>
                <div>
                    <div>
                        <el-form-item label="产品标题:" prop="product_title" v-if="lazada_product_info.name.is_display && lazada_product_info.name.is_mandatory">
                            <div  class="add_laiyuan">
                                <el-input  placeholder="" style="width: 660px;" maxlength="255" v-model="form.product_title">
                                </el-input> 
                                <span class="strnum">{{ strNum }}</span> 
                            </div>                    
                        </el-form-item>
                        <el-form-item label="产品标题:" v-if="lazada_product_info.name.is_display && !lazada_product_info.name.is_mandatory">
                            <div  class="add_laiyuan">
                                <el-input  placeholder="" style="width: 660px;" maxlength="255" v-model="form.product_title">
                                </el-input> 
                                <span class="strnum">{{ strNum }}</span> 
                            </div>                    
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="产品标题(马来语):" prop="product_title" v-if="lazada_product_info.name_ms.is_display && lazada_product_info.name_ms.is_mandatory">
                            <div  class="add_laiyuan">
                                <el-input  placeholder="" style="width: 660px;" maxlength="255" v-model="form.product_title">
                                </el-input> 
                                <span class="strnum">{{ strNum }}</span> 
                            </div>                    
                        </el-form-item>
                        <el-form-item label="产品标题(马来语):" prop="product_title" v-if="lazada_product_info.name_ms.is_display && !lazada_product_info.name_ms.is_mandatory">
                            <div  class="add_laiyuan">
                                <el-input  placeholder="" style="width: 660px;" maxlength="255" v-model="form.product_title">
                                </el-input> 
                                <span class="strnum">{{ strNum }}</span> 
                            </div>                    
                        </el-form-item>
                    </div>
                </div>
                <div>
                    <el-form-item label="品牌:" prop="brand" v-if="lazada_product_info.brand.is_display && lazada_product_info.brand.is_mandatory">
                        <el-input  placeholder="请输入品牌" maxlength="255"  v-model="form.brand"></el-input>                         
                    </el-form-item>
                    <el-form-item label="品牌:"  v-if="lazada_product_info.brand.is_display && !lazada_product_info.brand.is_mandatory">
                        <el-input  placeholder="请输入品牌" maxlength="255"  v-model="form.brand"></el-input>                         
                    </el-form-item>
                    <el-form-item v-if="lazada_product_info.brand.is_display">
                        <el-select v-model="form.selectBrand"  placeholder="选择常用品牌" style="width: 100px">
                            <el-option :value="item" :label="item" v-for="item in brandList" :key="item"></el-option>        
                        </el-select>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="型号:" prop="model" v-if="lazada_product_info.model.is_display && lazada_product_info.model.is_mandatory">
                        <!-- <el-select v-model="form.model"  placeholder="请选择分类">
                            <el-option value=""></el-option>           
                        </el-select> -->
                        <el-input  placeholder="请输入型号" maxlength="255"  v-model="form.model"></el-input>  
                    </el-form-item>
                    <el-form-item label="型号:"  v-if="lazada_product_info.model.is_display && !lazada_product_info.model.is_mandatory">
                        <!-- <el-select v-model="form.model"  placeholder="请选择分类">
                            <el-option value=""></el-option>           
                        </el-select> -->
                        <el-input  placeholder="请输入型号" maxlength="255"  v-model="form.model"></el-input>  
                    </el-form-item>
                    <!-- <el-form-item label="型号:" prop="model" v-if="lazada_product_info.model.is_display && lazada_product_info.name.is_mandatory">
                        <el-select v-model="form.model"  placeholder="请选择分类">
                            <el-option value=""></el-option>           
                        </el-select>
                    </el-form-item> -->
                </div>
                <div>
                    <el-form-item label="质保类型:" prop="type" v-if="lazada_product_info.warranty_type.is_display && lazada_product_info.warranty_type.is_mandatory">
                        <el-select v-model="form.type"  placeholder="请选择质保类型">
                            <el-option :value="item" :label="item" v-for="item in lazada_product_info.warranty_type.options" :key="item"></el-option>           
                        </el-select>
                    </el-form-item>
                    <el-form-item label="质保类型:" v-if="lazada_product_info.warranty_type.is_display && !lazada_product_info.warranty_type.is_mandatory">
                        <el-select v-model="form.type"  placeholder="请选择质保类型">
                            <el-option :value="item" :label="item" v-for="item in lazada_product_info.warranty_type.options" :key="item"></el-option>           
                        </el-select>
                    </el-form-item>
                </div>
            </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    props: {
        form: {
            type: Object,
            required: true
        },
        lazada_product_info: {
            type: Object,
            required: true
        },
        brandList: {
            type: Array,
            required: true
        }
    },
    computed: {
        ...mapState({
            rules: state => state.listing.rules,
        }),
        strNum() {
            return `${this.form.product_title.length}/255`
        },
        strMalaiNum() {
            return `${this.form.product_title_malai.length}/255`
        },
        packagingContentlength() {
            return `${this.form.packagingContent.length}/1000`
        },
    },
    mounted(){
    }
}
</script>