<template>
  <div class="table">
    <el-table
      ref="multipleTable"
      :data="tableData"
      height="500"
      tooltip-effect="dark"
      border
      style="width: 100%"
    >
      <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
      <el-table-column label="平台分类" align="center" prop="lazada_category"></el-table-column>
      <el-table-column prop="product_category" align="center" label="公司分类" show-overflow-tooltip />
      <el-table-column prop="lazada_category_id" align="center" label="平台分类ID" />
      <el-table-column prop="product_category_id" align="center" label="公司分类ID" />
      <el-table-column prop="create_user" align="center" label="创建人" />
      <el-table-column prop="created_at" align="center" show-overflow-tooltip label="创建时间" />
      <el-table-column align="center" width="120" label="操作">
        <template slot-scope="scope">
          <el-button
            type="warning"
            size="mini"
            v-if="showDelete"
            @click="delete_table(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "TableList",
  props: {
    tableData: {
      type: Array,
      required: true
    },
    showDelete: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    delete_table(val) {
      this.$emit("delete_table", val);
    }
  }
};
</script>