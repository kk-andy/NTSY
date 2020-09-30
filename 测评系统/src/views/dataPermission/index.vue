<template>
  <div class="main">
    <div>
      <el-form ref="form" :inline="true" :model="form" label-width="100px">
        <el-col :span="6">
          <el-form-item label="员工姓名">
            <el-input
              v-model="form.staff_id"
              placeholder="需求编号"
              style="width: 107%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="员工部门">
            <el-select v-model="form.dept_id" placeholder="服务项目" clearable>
              <el-option
                v-for="item in staffdepts"
                :key="item.dept_id"
                :label="item.dept_name"
                :value="item.dept_id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="text-align: center">
          <el-form-item>
            <el-button
              @click="getData('data')"
              type="primary"
              v-if="showButtons.search"
              icon="el-icon-search"
              >搜索</el-button
            >
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <indexTable
      :tableData="assessauth.list"
      :showEdit="showButtons.edit"
      @selectionChange="selectionChange"
      @editClick="editClick"
      ref="indexTable"
    />
    <div class="change_page">
      <page-total
        :total="assessauth.total"
        :size="form.size"
        :current-page="form.page"
      />
      <el-pagination
        :current-page="form.page"
        background
        :page-sizes="[10, 20, 30, 50]"
        :page-size="form.size"
        layout="sizes, prev, pager, next, jumper"
        :total="assessauth.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <Modal
      v-model="modal_fail"
      title="请选择其数据权限"
      width="20%"
      footer-hide
      class-name="vertical-center-modal"
      @on-cancel="cancelFail"
    >
      <div style="text-align: center; padding: 20px 0 30px 0">
        <el-tree
          :data="userdept"
          show-checkbox
          node-key="dept_id"
          ref="tree"
          :default-checked-keys="checkedList"
          :props="defaultProps"
          @check-change="checkChange"
        ></el-tree>
      </div>
      <div class="modal_tontent">
        <el-button type="primary" @click="submitFail">确认</el-button>
        <el-button type="info" @click="cancelFail">取消</el-button>
      </div>
    </Modal>
  </div>
</template>
<script>
import indexTable from "./table/indexTable";
import { mapState } from "vuex";
export default {
  components: { indexTable },
  computed: {
    ...mapState({
      assessauth: (state) => state.dataPermission.assessauth,
      staffdepts: (state) => state.commons.staffdept,
      userdept: (state) => state.commons.userdept,
      assessauthRead: (state) => state.dataPermission.assessauthRead,
      showButtons: (state) => state.dataPermission.showButtons,
    }),
    modal_fail: {
      get() {
        return this.$store.state.dataPermission.modal_fail;
      },
      set(val) {
        this.$store.state.dataPermission.modal_fail = val;
      },
    },
  },
  watch: {
    assessauthRead: {
      handler(newData, oldData) {
        if (newData[0].dept_id) {
          this.checkedList = newData[0].dept_id.split(",");
        }
      },
      deep: true,
    },
  },
  data() {
    return {
      radio: "",
      defaultProps: {
        children: "children",
        label: "dept_name",
        id: "dept_id",
      },
      checkedList: [],
      upData: {
        id: "",
        dept_id: "",
      },
      form: {
        staff_id: "",
        dept_id: "",
        size: 10,
        page: 1,
      },
    };
  },
  created() {
    let id = this.$getMenuId(
      sessionStorage.getItem("munuIdList"),
      this.$route.path
    );
    this.$store.dispatch("dataPermission/getButtonList", { id });
  },
  mounted() {
    this.getData();
    this.$store.dispatch("commons/getuserdept");
    this.$store.dispatch("commons/staffdept");
  },
  methods: {
    checkChange(data) {
      this.upData.dept_id = this.$refs.tree.getCheckedKeys(true).toString();
    },
    getData(data) {
      data ? (this.form.page = 1) : "";
      this.$store.dispatch("dataPermission/getAssessauth", this.form);
    },
    editClick(data) {
      this.checkedList = [];
      this.$store.dispatch("dataPermission/assessauthRead", { id: data.id });
      this.upData.id = data.id;
      this.modal_fail = true;
    },
    cancelFail() {
      this.$refs.tree.setCheckedKeys([]);
      this.modal_fail = false;
    },
    submitFail() {
      let that = this;
      let query = this.upData;
      let item = this.form;
      this.$store.dispatch("dataPermission/assessauthUpdate", {
        query,
        item,
        that,
      });
    },
    selectionChange(data) {
      console.log(data);
    },
    submit() {},
    handleSizeChange(size) {
      let that = this;
      that.form.page = 1;
      that.form.size = size;
      that.getData();
    },
    handleCurrentChange(nowpage) {
      let that = this;
      that.form.page = nowpage;
      that.getData();
    },
  },
};
</script>