<template>
  <div class="pending-list margin10">
    <el-card class="inventory-adjustment-rules-form">
      <el-form ref="form" :inline="true" :model="form" label-width="100px">
        <el-form-item label="SKU：" prop="sku">
          <el-input placeholder="请输入SKU" v-model="form.sku" clearable></el-input>
        </el-form-item>
        <el-form-item label="标题：" prop="title">
          <el-input placeholder="请输入标题" v-model="form.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="产品线：" prop="cat_id">
          <el-select v-model="form.cat_id" filterable clearable placeholder="请选择产品线">
            <el-option
              v-for="item in product_category"
              :key="item.id"
              :label="item.category_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建人：" prop="create_id">
          <el-select v-model="form.create_id" filterable clearable placeholder="请选择创建人">
            <el-option
              v-for="item in sellerlistData"
              :key="item.staff_id"
              :label="item.staff_name"
              :value="item.staff_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间：" label-width="100px" prop="date">
          <el-date-picker
            v-model="form.date"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <div class="search-reset-btn">
          <el-form-item>
            <el-button size="small" type="primary" @click="submitForm()">搜索</el-button>
            <el-button size="small" @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
    <div class="add-btn">
      <el-button size="small" type="primary" v-if="btnClass.batchRelease" @click="releaseBtn">批量发布</el-button>
      <el-button size="small" type="primary" v-if="btnClass.batchCopy" @click="bulkCopyBtn">批量复制</el-button>
      <el-button size="small" type="primary" v-if="btnClass.batchDel" @click="delBtn">批量删除</el-button>
    </div>
    <div class="permission-tab margin-tb20">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        ref="table"
        :height="tableHeight"
        :row-style="{height:'40px'}"
        :cell-style=" {padding:'0px'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="sku" label="SKU" align="center"></el-table-column>
        <el-table-column prop="title" label="标题" align="center"></el-table-column>
        <el-table-column prop="thumbnail" label="缩略图" width="100" align="center">
          <template slot-scope="{row}">
            <el-popover placement="right" width="350" trigger="hover">
              <img :src="row.thumbnail" alt style="width:100%;" />
              <div slot="reference">
                <img :src="row.thumbnail" alt style="width:100%; text-align:center;margin-top:10px" />
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="cat_id_one_name" label="产品线" align="center"></el-table-column>
        <el-table-column prop="shop_name" label="店铺" align="center"></el-table-column>
        <el-table-column prop="site" label="站点" align="center"></el-table-column>
        <el-table-column prop="sell_type" label="售卖形式" align="center"></el-table-column>
        <el-table-column prop="staff_name" label="创建人" align="center"></el-table-column>
        <el-table-column prop="created_at" label="创建时间" align="center"></el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="{row}">
            <el-button class="editColor" type="text" @click="edit(row.id)" v-if="btnClass.edit">编辑</el-button>
            <!-- <el-button class="note" type="text" @click="addNote(row.id)" v-if="btnClass.edit">备注</el-button> -->
            <el-button
              class="releaseColor"
              type="text"
              v-if="btnClass.release"
              @click="releaseBtn(row.id)"
            >发布</el-button>
            <el-button class="delColor" type="text" v-if="btnClass.del" @click="delBtn(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-bottom">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes=" [10, 20, 50, 100]"
        :current-page.sync="page.cureentPage"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
    </div>
    <el-dialog
      :visible.sync="modal_note"
      title="备注"
      :close-on-click-modal="false"
      width="40%"
      class-name="vertical-center-modal"
    >
        <div style="display:flex">
          <span style="width: 45px">内容:</span>
          <el-input 
          placeholder="请填写您要备注的内容(最多500字)"
          maxlength="500"
          :autosize="{ minRows: 5, maxRows: 5}"
          resize="none"
          type="textarea" 
          clearable></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" class="btn_button_primary" @click="confirmAddNote">确定</el-button>
            <el-button type="primary" class="btn_button_primary" @click="cancelAddNote">取消</el-button>
        </span>
    </el-dialog>
    <BulkCopyPopup
      v-if="showCopyPopup"
      :showCopyPopup="showCopyPopup"
      :storeNameData="storeNameData"
      @on-open-sesion="callbackCopyPopup"
    ></BulkCopyPopup>

  </div>
</template>


<script>
import BulkCopyPopup from "./components/BulkCopyPopup.vue"; //批量复制listing
import { mapGetters } from 'vuex'
export default {
  name: "PendingList",
  components: {
    BulkCopyPopup
  },
  computed: {
    ...mapGetters(['ebayURL'])
  },
  data() {
    return {
      showCopyPopup: false,
      modal_note: false,
      form: {
        sku: "",
        title: "",
        cat_id: "",
        create_id: "",
        date: []
      },
      sellerlistData: [],
      product_category: [],
      tableData: [],
      page: {
        cureentPage: 1,
        size: 20,
        total: 0
      },
      tableHeight: null,
      btnClass: {
        batchCopy: false,
        batchDel: false,
        batchRelease: false,
        del: false,
        edit: false,
        release: false
      },
      recordCurrent: {},
      multipleSelection: [],
      storeNameData: []
    };
  },
  created() {
    let id = this.$getMenuId(
      sessionStorage.getItem("munuIdList"),
      this.$route.path
    );
    this.getControlBtn(id);
  },
  mounted() {
    this.tableHeight = _g.getAdaptiveHeight(
      this.tableHeight,
      this.$refs.table.$el,
      160
    );
    this.getProductCate();
    this.getSellerlist();
    this.getList();
    this.getshopsitecurrency();
  },
  methods: {
    getList() {
      if (this.form.date) {
        var [createTimeStart, createTimeEnd] = this.form.date;
      }
      let params = {
        sku: this.form.sku,
        title: this.form.title,
        cat_id: this.form.cat_id,
        create_id: this.form.create_id,
        create_at_start: createTimeStart || "",
        create_at_end: createTimeEnd || "",
        page: this.page.cureentPage,
        per_page_num: this.page.size
      };
      this.$axios.get(`/listing/prelisting/list`, { params }).then(res => {
        this.page.total = res.data.total;
        this.tableData = res.data.data;
        _g.scrollTop();
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getProductCate() {
      this.$axios.get(`/listing/info/product_cate`).then(res => {
        this.product_category = res.data;
      });
    },
    // 获取下拉销售员
    getSellerlist() {
      this.$axios.get(`/listing/info/staff/sellerlist`).then(res => {
        this.sellerlistData = res.data;
      });
    },
    transform() {
      let arr = [];
      this.multipleSelection.forEach(ids => {
        arr.push(ids.id);
      });
      return arr.join(",");
    },

    // 批量复制按钮
    bulkCopyBtn() {
      if (!this.checkDataJudgment()) return;
      this.showCopyPopup = true;
    },
    // 批量复制回调
    callbackCopyPopup(data) {
      if (!data) {
        this.showCopyPopup = false;
        return false;
      }
      let formdata = new FormData();
      this.multipleSelection.forEach(ids => {
        formdata.append("listing_ids[]", ids.id);
      });
      formdata.append("shop_id", data.mode);
      this.$axios.post(`/listing/prelisting/copy`, formdata).then(res => {
        this.$message({
          message: res.msg,
          type: "success",
          duration: 5 * 1000
        });
        this.showCopyPopup = false;

        this.getList();
      });
    },
    // 发布按钮 & 批量发布
    releaseBtn(row) {
      let params = {};
      if (typeof row !== "number") {
        if (!this.checkDataJudgment()) return;
        params = {
          ids: this.transform()
        };
      } else {
        params = {
          ids: row
        };
      }
      this.$axios.get(`/listing/prelisting/release`, { params }).then(res => {
        this.$message({
          type: "success",
          message: "发布成功!"
        });
      });
    },
    edit(id) {
      let tokenAndID = this.$getTokenAndID()
      let path = '/listingManagement/pendingEdit'
      let str = `${ this.ebayURL }${ path }?${tokenAndID}&sku=${ id }`
      window.open(str)
    },
    addNote() {
      this.modal_note = true
    },
    confirmAddNote() {
      this.modal_note = false
    },
    cancelAddNote() {
      this.modal_note = false
    },
    // 删除按钮 & 批量删除
    delBtn(row) {
      let params = {};
      if (typeof row !== "number") {
        if (!this.checkDataJudgment()) return;
        params = {
          ids: this.transform()
        };
      } else {
        params = {
          ids: row
        };
      }
      _g.confirmMsg("warning", "提示", "确认删除?", () => {
        this.$axios.get(`/listing/prelisting/delete`, { params }).then(res => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getList();
        });
      });
    },
    checkDataJudgment() {
      if (!this.multipleSelection.length) {
        this.$message({
          type: "warning",
          message: "请至少勾选一条列表数据"
        });
        return false;
      }
      return true;
    },
    // 搜索表单
    submitForm() {
      this.page.cureentPage = 1;
      this.getList();
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getControlBtn(id) {
      let params = {
        id
      };
      this.$authHttp
        .get("/rest/auth/user/perms/buttons", { params })
        .then(res => {
          res.data.buttonList.forEach(btn => {
            this.btnClass[btn.key] = true;
          });
        });
    },
    // 获取店铺
    getshopsitecurrency() {
      this.$axios.get(`/listing/prepublish/shopsitecurrency`).then(res => {
        this.storeNameData = res.data.shops;
      });
    },
    // 获取分页size
    handleSizeChange(size) {
      this.page.size = size;
      this.page.cureentPage = 1;
      this.getList();
    },
    // 获取分页请求的page的值
    handleCurrentChange(nowpage) {
      this.page.cureentPage = nowpage;
      this.getList();
    }
  }
};
</script>





<style lang="scss" scoped>
.pending-list {
  .add-btn {
    margin: 10px 0;
  }
  .editColor {
    color: #e6a23c;
  }
  .note {
    color: #1890ff;
  }
  .releaseColor {
    color: #67c23a;
  }
  .delColor {
    color: #f56c6c;
  }
}
</style>