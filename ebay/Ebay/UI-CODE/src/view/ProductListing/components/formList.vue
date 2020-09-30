<template>
    <div class="form-list-content">
        <div v-for="(item, i) in formList" :key="i" :class="{ 'display-flex': item.parent_name }">     
            <el-form-item :label="item.name" v-if="item.selection_mode === 'select' " label-width="250px" :required="item.usage_constraint === 'Required' ">
                <el-select v-model="item.value"  placeholder="请选择" filterable clearable>
                <el-option
                    v-for="(sel, index) in item.options"
                    :key="index"
                    :label="sel.name"
                    :value="sel.value"
                ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="item.name" v-if="item.selection_mode === 'input' " label-width="250px" :required="item.usage_constraint === 'Required' ">
                <el-input v-model="item.value" placeholder="请输入" style="width: 217px" clearable></el-input>
            </el-form-item>
            <el-form-item :label="item.name" v-if="item.selection_mode === 'checkbox' " label-width="250px" :class="{ 'checkbox-list': item.options.length > 10 }">
                <el-checkbox-group v-model="item.value">
                <el-checkbox :label="check.name" v-for="(check, i) in item.options" :key="i"></el-checkbox>
                </el-checkbox-group>
                <el-input v-model.trim="item.checkedValue" placeholder="请输入" style="width: 217px"></el-input>
                <el-button type="primary" @click="addCheck(item, item.checkedValue)">添加</el-button>
            </el-form-item>
            <el-form-item :label="item.name"  v-if="item.selection_mode === 'selectInput' " label-width="250px" :required="item.usage_constraint === 'Required' ">
                <el-select
                    v-model="item.value"
                    allow-create
                    clearable
                    filterable
                    default-first-option
                    placeholder="请选择">
                    <el-option
                    v-for="(ele, index) in item.options"
                    :key="index"
                    :label="ele.name"
                    :value="ele.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    formList: {
      type: Array,
      default: () => {
        return [];
      }
    }
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
  }
};
</script>
<style lang="scss">
.form-list-content {
  background-color: #eee;
  .display-flex {
    display: flex;
    flex-wrap: wrap;
  }
}
.checkbox-list {
  .el-form-item__content {
    margin-left: 250px;
  }
}
</style>