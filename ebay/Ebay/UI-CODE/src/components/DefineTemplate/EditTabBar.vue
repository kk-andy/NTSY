<template>
  <div class="edit-tabBar-popup">
    <el-dialog
      :title="recordCurrent.title"
      :visible.sync="showModule"
      @close="handleClose(false)"
      width="60%"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form :model="form" :rules="rules" ref="form" class="describe-template-settings-form">
        <el-form-item>
          <ul class="tabBarAll">
            <li
              v-for="(tab,index) in form.tabBarData"
              :key="index"
              class="tabName"
              :class="count === index ? 'hit' :'active'"
              @click="editTabBar(tab,index)"
            >
              <div class="flex-j">
                <span v-if="count !== index">{{tab.name}}</span>
                <span v-else>
                  <el-input v-model="tab.name" size="mini" style="width:150px" placeholder="请输入内容"></el-input>
                </span>
                <i
                  v-if="count !== index"
                  class="el-icon-close cloce-icon"
                  @click="cloceTabBar(index)"
                ></i>
                <i
                  v-if="count === index"
                  class="el-icon-edit cloce-icon"
                  @click="editTabBarName(tab,index)"
                ></i>
              </div>
            </li>
            <li class="tabName addTab">
              <el-button type="text" @click="addTabBar" v-show="form.tabBarData.length != 5">+添加</el-button>
            </li>
          </ul>
        </el-form-item>
        <el-form-item>
          <tinymce
            :showUpload="false"
            v-model="tab.value"
            v-show="index == count"
            v-for="(tab,index) in form.tabBarData"
            :key="index"
            :height="300"
          />
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
import Tinymce from "@/components/Tinymce";
export default {
  name: "EditBanner",
  components: {
    Tinymce
  },
  props: {
    showTab: {
      type: Boolean,
      default: false
    },
    recordCurrent: {
      type: Object
    }
  },

  data() {
    return {
      showModule: this.showTab,
      showIcon: false,
      showInput: true,
      active: 0,
      count: 0,
      clickSty: false,
      form: {
        tabBarData: []
      },

      rules: {
        title: { required: true, message: "请输入标题", trigger: "blur" }
      }
    };
  },
  created() {
    this.form.tabBarData = _g.getJsonParse(this.recordCurrent.tabBarData);
  },
  methods: {
    editTabBar(tab, index) {
      this.count = index;
    },
    addTabBar() {
      let index = this.form.tabBarData[this.form.tabBarData.length - 1];
      if (!index.name) {
        this.$message({
          message: "请填写当前政策标题",
          type: "warning"
        });
        return false;
      }
      this.form.tabBarData.push({ name: "", value: "" });
    },
    cloceTabBar(index) {
      if (this.form.tabBarData.length != 1) {
        this.form.tabBarData.splice(index, 1);
      }
    },
    editTabBarName(tab, index) {
      // console.log(tab.name);
    },
    handleClose(val) {
      if (!val) {
        this.$emit("on-open-sesion", false);
        return;
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit("on-open-sesion", this.form);
        }
      });
    }
  }
};
</script>


<style>
.describe-template-settings-form .hit {
  border-bottom: 2px solid #00a0dc;
  transition: 0.3s;
}
.describe-template-settings-form {
  width: 100%;
}
.describe-template-settings-form .tabBarAll {
  display: flex;
}
.flex-j {
  padding: 0 5px;
  display: flex;
  justify-content: space-between;
}
.describe-template-settings-form .tabBarAll .tabName {
  line-height: 40px;
  width: 30%;
  margin: 0 2px;
  cursor: pointer;
}
.describe-template-settings-form .tabName.addTab {
  margin: 10px auto;
}
.describe-template-settings-form .tabBarAll .tabName .cloce-icon {
  font-size: 20px;
  color: #888;
  display: none;
}
.describe-template-settings-form .tabBarAll .active:hover {
  border-bottom: 2px solid #ccc;
}
.describe-template-settings-form .tabBarAll .tabName:hover .cloce-icon {
  min-width: 20px;
  line-height: 40px;
  display: block;
}
</style>