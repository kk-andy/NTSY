<template>
  <div class="main">
    <div class="roleName">
      <p style="margin:0">用户角色:</p>
    </div>
    <div class="roleName">
      <el-input v-model="roleName" placeholder="请输入 " />
    </div>
    <div class="sel">
      <span>店铺权限:</span>
      <el-select style="width:57%" v-model="sel.value">
        <el-option
          v-for="(item,key) in sel.selItem"
          :key="key"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="func">
      <el-button @click="save" style="marginLeft:150px" type="primary">保存</el-button>
      <el-button @click="calcel" spain>返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roleName: "",
      sel: {
        selItem: [
          {
            value: "选项1",
            label: "黄金糕",
          },
          {
            value: "选项2",
            label: "双皮奶",
          },
          {
            value: "选项3",
            label: "蚵仔煎",
          },
          {
            value: "选项4",
            label: "龙须面",
          },
          {
            value: "选项5",
            label: "北京烤鸭",
          },
        ],
        value: "",
      },
    };
  },
  methods: {
    save() {
      this.$emit("changeUserPermission", { hasTable: true });
    },
    calcel() {
      this.$emit("changeUserPermission", { hasTable: true });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  background-color: gainsboro;
  width: 100%;
  height: 430px;
  padding: 35px;
}
.roleName {
  height: 36px;
  width: 140px;
  line-height: 36px;
  text-align: center;
  margin-right: 20px;
  border-radius: 4px;
  background: white;
  float: left;
  margin-bottom: 30px;
}
.sel {
  clear: both;
  width: 400px;
  margin-bottom: 50px;
  span {
    margin-right: 10px;
  }
}
</style>