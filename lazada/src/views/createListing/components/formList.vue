<template>
    <div class="form-list-content">
        <div v-for="(item, i) in lazadaAttrsList" :key="i">     
            <el-form-item :label=' item.attr_label'   v-if="item.input_type === 'singleSelect' " label-width="250px" :required="item.is_mandatory ? true : false">     
                <span slot="label" >
                    <span v-if="item.is_key_prop" class="importance">!</span>
                    <span>{{item.attr_label}}</span> 
                </span>  
                <el-select v-model="item.value"  placeholder="请选择" filterable clearable>
                    <el-option
                        v-for="(sel, index) in item.options.split(',')"
                        :key="index"
                        :label="sel"
                        :value="sel"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="item.attr_label" v-if="item.input_type === 'text' || item.input_type === 'numeric' || item.input_type === 'enumInput' " label-width="250px" :required="item.is_mandatory ? true : false">
                <span slot="label" >
                    <span v-if="item.is_key_prop" class="importance">!</span>
                    <span>{{item.attr_label}}</span> 
                </span> 
                <el-input v-model="item.value" placeholder="请输入" clearable></el-input>
            </el-form-item>
            <el-form-item :label="item.attr_label" v-if="item.input_type === 'multiEnumInput' " label-width="250px" :class="{ 'checkbox-list': item.options.length > 10 }">
                <span slot="label">
                    <span v-if="item.is_key_prop" class="importance">!</span>
                    <span>{{item.attr_label}}</span> 
                </span>
                <el-checkbox-group v-model="item.value">
                    <el-checkbox :label="check" v-for="(check, i) in item.options.split(',')" :key="i"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item :label="item.attr_label" class="multiSelect_form" v-if="item.input_type === 'multiSelect' " label-width="250px" :required="item.is_mandatory ? true : false">
                <span slot="label" >
                    <span v-if="item.is_key_prop" class="importance">!</span>
                    <span>{{item.attr_label}}</span> 
                </span>     
                <el-select
                    v-model="item.value"
                    filterable
                    clearable
                    multiple 
                    placeholder="请选择">
                    <el-option
                    v-for="(ele, index) in item.options.split(',')"
                    :key="index"
                    :label="ele"
                    :value="ele">
                    </el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item :label="item.attr_label"  v-if="item.input_type === 'richText' " label-width="250px" :required="item.is_mandatory ? true : false">
                <tinymce v-model="item.value" :height="250" :width="1000" :showUpload="showUpload" />
            </el-form-item> -->
        </div>
    </div>
</template>
<script>
import Tinymce from "@/components/Tinymce";
export default {
    props: {
        lazadaAttrsList: {
        type: Array,
        default: () => {
            return [];
        }
        }
    },
    data() {
        return {
            showUpload: false,
            label:{

            }
        }
    },
    components: {
        Tinymce
    },
    methods: {
        addCheck(item, val) {
            let nameList = item.options.map(ele => ele.name);
            if (nameList.indexOf(val) !== -1) {
                this.$message({
                    message: "当前的属性已存在",
                    type: "warning"
                });
                return false;
            }
            item.options.push({ name: val, value: val });
            item.value.push(val);
            item.checkedValue = "";
        }
    },
    watch: {
        formList(val) {}
    },
    created(){
        //   console.log(this)
    }
        
};
</script>
<style lang="scss">
.importance{
    color: #C0C4CC;
    font-size: 18px;
    font-weight:500;
}
.suggestIf{
    color: #ff4949;
}
.form-list-content {
  // background-color: #eee;
  .display-flex {
    display: flex;
    flex-wrap: wrap;
  }
}
.checkbox-list {
  .el-form-item__content {
    margin-left: 150px;
  }
}
</style>