<template>
  <div class="main">
    <div>
      <el-form ref="form" :inline="true" :model="form" label-width="100px">
        <el-col :span="6">
          <el-form-item label="需求编号">
            <el-input
              v-model="form.ntcp_id"
              clearable
              placeholder="需求编号"
              style="width: 107%"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="服务类型">
            <el-select v-model="form.type" clearable placeholder="服务类型">
              <el-option
                v-for="item in servicetype"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="服务项目">
            <el-select
              v-model="form.server_id"
              clearable
              placeholder="服务项目"
            >
              <el-option
                v-for="item in serviceitem"
                :key="item.id"
                :label="item.item_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="text-align: center">
          <el-row>
            <el-col :span="8">
              <el-form-item>
                <el-button
                  v-if="showButtons.search"
                  style="width: 100px"
                  type="primary"
                  icon="el-icon-search"
                  @click="getData(true)"
                  >搜索</el-button
                >
                <!-- <el-button type="primary" @click="addDemand">新增需求</el-button> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <!-- <el-button type="primary" icon="el-icon-search" @click="getData(true)">搜索</el-button> -->
                <el-button
                  type="primary"
                  v-if="showButtons.newDemand"
                  @click="addDemand"
                  >新增需求</el-button
                >
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <el-button
                  type="primary"
                  v-if="showButtons.newDemand"
                  @click="allSubmit"
                  >批量提交</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="6">
          <el-form-item label="店铺站点">
            <el-select
              style="width: 232px"
              v-model="form.site"
              clearable
              placeholder="站点"
            >
              <el-option
                v-for="(item, index) in sitelist"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="提交日期">
            <el-date-picker
              style="width: 217px"
              v-model="form.create_at"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              clearable
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="需求人员">
            <el-select
              v-model="form.staff_id"
              clearable
              filterable
              placeholder="需求人"
            >
              <el-option
                v-for="item in demanderlist"
                :key="item.staff_id"
                :label="item.staff_name"
                :value="item.staff_id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="text-align: center"></el-col>
      </el-form>
    </div>
    <demandListTable
      :tableData="purchaserList.list"
      :showCopy="showButtons.copy"
      :showSubmitCheck="showButtons.submitCheck"
      @selectionChange="selectionChange"
      @numberClick="numberClick"
      @copyClick="copyClick"
      @submitClick="submitClick"
    />
    <div class="change_page">
      <page-total
        :total="purchaserList.total"
        :size="form.size"
        :current-page="form.page"
      />
      <el-pagination
        :current-page="form.page"
        background
        :page-sizes="[10, 20, 30, 50]"
        :page-size="form.size"
        layout="sizes, prev, pager, next, jumper"
        :total="purchaserList.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <Modal
      v-model="modal_fail"
      title="请选择服务类型"
      width="20%"
      footer-hide
      class-name="vertical-center-modal"
      @on-cancel="cancelFail"
    >
      <div style="text-align: center; padding: 20px 0 30px 0">
        <el-radio-group v-model="radio">
          <el-radio :label="1">测评</el-radio>
          <!-- <el-radio :label="2">代购</el-radio> -->
        </el-radio-group>
      </div>
      <div class="modal_tontent">
        <el-button type="primary" @click="submitFail">确认</el-button>
        <el-button type="info" @click="cancelFail">取消</el-button>
      </div>
    </Modal>
  </div>
</template>
<script>
import demandListTable from "./table/demandListTable";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  components: { demandListTable },
  computed: {
    ...mapState({
      purchaserList: (state) => state.demandManagement.purchaserList,
      servicetype: (state) => state.commons.servicetype,
      serviceitem: (state) => state.commons.serviceitem,
      demanderlist: (state) => state.commons.demanderlist,
      sitelist: (state) => state.commons.sitelist,
      showButtons: (state) => state.demandList.showButtons,
    }),
    key() {
      return this.$route.path;
    },
  },
  data() {
    return {
      radio: 1,
      modal_fail: false,
      tableSel: [],
      form: {
        ntcp_id: "",
        type: "",
        server_id: "",
        staff_id: "",
        site: "",
        create_at: "",
        size: 10,
        page: 1,
      },
    };
  },
  created() {
    //获取button

    let id = this.$getMenuId(
      sessionStorage.getItem("munuIdList"),
      this.$route.path
    );
    this.$store.dispatch("demandList/getButtonList", { id });
  },
  mounted() {
    this.getData();
    this.$store.dispatch("commons/getServiceitem");
    this.$store.dispatch("commons/getDemanderlist");
    this.$store.dispatch("commons/getSitelist");
    console.log(this.showButtons);
  },
  methods: {
    getData(data) {
      data ? (this.form.page = 1) : "";
      this.$store.dispatch("demandManagement/getPurchaser", this.form);
    },
    numberClick(data) {
      this.$router.push({
        name: "AddDemand",
        query: { id: data.id },
      });
    },
    addDemand() {
      this.modal_fail = true;
    },
    cancelFail() {
      this.modal_fail = false;
    },
    submitFail() {
      this.$router.push({
        name: "AddDemand",
        query: { server_id: this.radio },
      });
    },
    selectionChange(data) {
      this.tableSel = data;
    },
    copyClick(data) {
      let query = {
        id: data.id,
      };
      let item = this.form;
      this.$store.dispatch("demandManagement/purchaserCopy", { query, item });
    },
    submitClick(data) {
      let query = {
        id: data.id,
      };
      let item = this.form;
      this.$store.dispatch("demandManagement/purchaserPush", { query, item });
    },
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
    allSubmit() {
      if (this.tableSel.length < 1) {
        this.$message.error("请先进行选择");
      } else {
        let arr = "";
        this.tableSel.forEach((item) => {
          arr += item.id + ",";
        });
        arr = arr.substring(0, arr.length - 1);
        let item = this.form;
        this.$store.dispatch("demandManagement/allSubmit", { ids: arr, item });
      }
    },
  },
};
</script>