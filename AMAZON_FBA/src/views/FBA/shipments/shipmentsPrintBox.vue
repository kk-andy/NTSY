<template>
  <div style="padding:15px">
    <div class="main">
      <div class="title">
        <h2>打印箱子标签</h2>
      </div>
      <div class="table">
        <div class="head">
          <el-row>
            <el-col :span="8">
              <p style="fontWeight:bold">货件单号</p>
            </el-col>
            <el-col :span="8">
              <p style="fontWeight:bold">纸张类型</p>
            </el-col>
            <el-col :span="8">
              <p style="fontWeight:bold">打印数量</p>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="func">
        <el-button type="primary">打印</el-button>
        <el-button @click="cancel" plain>取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    //取消
    cancel() {
      this.$router.push({ name: "shipments" });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  padding: 10px;
  background: #f2f2f2;
  width: 100%;
  .title {
    width: 100%;
    border-bottom: 1px solid #dfdfdf;
    margin-bottom: 25px;
  }

  .func {
    display: flex;
    justify-content: flex-end;
  }
  .table {
    .head {
      width: 100%;
      background: #fafafa;
      p {
        text-align: center;
        line-height: 50px;
      }
    }
  }
}
</style>