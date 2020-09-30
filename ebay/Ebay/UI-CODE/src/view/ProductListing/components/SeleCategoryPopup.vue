<template>
  <div class="sele-category-popup">
    <el-dialog :title="recordCurrent.title" :visible.sync="showModule" @close="handleClose(false)" :close-on-click-modal="false">
      <el-form :model="form" class="demo-form-inline">
        <el-row>
          <el-col :span="16">
            <el-form-item label-width="60px">
              <el-input v-model="form.name" placeholder="搜索分类名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="margin-left:15px">
            <el-form-item>
              <el-button type="primary" @click="search">搜索</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <h3 style="height:40px; margin-left:60px">
          <span v-for="(item,index) in tree" :key="index">
            {{item.name}}
            <i class="el-icon-arrow-right"></i>
          </span>
        </h3>
        <el-form-item label-width="60px" style="width:100%">
          <el-cascader
            placeholder="试试搜索：指南"
            style="width:65%"
            clearable
            :options="options"
            filterable
            @change="change"
            @expand-change="cascaderChange"
          ></el-cascader>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose(false)">取 消</el-button>
        <el-button type="primary" @click="handleClose(true)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "SeleCategoryPopup",
  props: {
    showCategoryaDialog: {
      type: Boolean,
      default: false
    },
    recordCurrent: {
      type: Object
    }
  },
  data() {
    return {
      showModule: this.showCategoryaDialog,
      form: {
        name: ""
      },
      options: [
        {
          value: "指南",
          label: "指南",
          children: [
            {
              value: "设计原则",
              label: "设计原则",
              children: [
                {
                  value: "一致",
                  label: "一致",
                  children: [
                    {
                      value: "一致",
                      label: "一致",
                      children: [
                        {
                          value: "一致",
                          label: "一致",
                          children: [
                            {
                              value: "一致",
                              label: "一致"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      tree: []
    };
  },
  created() {},
  methods: {
    handleClose(val) {
      this.$emit("on-open-sesion", false);
    },
    search() {},
    change(data) {
      if (!data.length) {
        this.tree = [];
      }
    },
    cascaderChange(e) {
      this.tree.push({ name: e[e.length - 1] });
    }
  }
};
</script>


<style scoped>
</style>