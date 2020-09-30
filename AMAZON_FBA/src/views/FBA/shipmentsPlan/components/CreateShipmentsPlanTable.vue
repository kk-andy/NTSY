<template>
  <div>
    <el-table
      :data="tableData"
      style="width:100%"
      :header-cell-style="{background:'#F5F7FA',color:'#606266'}"
      :default-sort="{prop: 'date', order: 'ascending'}"
    >
      <el-table-column width="120" label="图片" align="center">
        <template slot-scope="scope">
          <div style="width:120px;height:50px">
            <img style="width:100px;height:50px" :src="scope.row.main_image" alt />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="MSKU/FNSKU" align="center">
        <template slot-scope="scope">{{scope.row.m_sku}}/{{scope.row.fn_sku}}</template>
      </el-table-column>
      <el-table-column label="品名/SKU" align="center">
        <template slot-scope="scope">{{scope.row.title}}/{{scope.row.product_sku}}</template>
      </el-table-column>
      <el-table-column label="可用量" width="120" align="center">
        <template slot-scope="scope">{{scope.row.available_num}}</template>
      </el-table-column>
      <el-table-column width="120" align="center">
        <template slot="header">
          <span style="color:red">*</span>
          <span>计划发货量</span>
        </template>
        <template slot-scope="scope">
          <el-input
            v-model="tableSet[scope.$index][[0]]"
            placeholder="请输入"
            style="width:80%"
            @blur="checkPlanShipmentsPlan(scope.row.available_num,tableSet[scope.$index][[0]],scope.$index)"
          />
        </template>
      </el-table-column>
      <!-- <el-table-column width="120" prop="plan" label="单箱数量" align="center">
        <template slot="header">
          <span style="color:red">*</span>
          <span>单箱数量</span>
        </template>
        <template slot-scope="scope">
          <el-input v-model="tableSet[scope.$index][[1]]" placeholder="请输入" style="width:80%" />
        </template>
      </el-table-column>
      <el-table-column width="120" label="箱数" align="center">
        <template slot="header">
          <span style="color:red">*</span>
          <span>箱数</span>
        </template>
        <template slot-scope="scope">
          <el-input v-model="tableSet[scope.$index][[2]]" placeholder="请输入" style="width:80%" />
        </template>
      </el-table-column>-->
      <el-table-column width="120" prop="attr" label="商品属性" align="center" />
      <el-table-column width="150" prop="" label="是否可退税" align="center">
        <template slot-scope="{ row }">
          <el-select v-model="row.can_tax_refund" >
              <el-option :value="0" label="否"></el-option>    
              <el-option :value="1" label="是"></el-option>             
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="plan" label="备注" align="center">
        <template slot-scope="scope">
          <el-input
            v-model="tableSet[scope.$index][[1]]"
            placeholder="请输入"
            style="width:80%"
            :maxlength="300"
          />
        </template>
      </el-table-column>

      <el-table-column width="150" prop="money" label="操作" align="center">
        <template slot-scope="scope">
          <el-popconfirm title="确定删除吗？" @onConfirm="remove(scope.$index)">
            <el-button slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
//仅为编辑发货计划 不适用新增发货计划
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      shipmentsPlanNum: "", //计划发货量
      singleBoxNum: "", //单箱数量
      boxTotal: "", //箱数
      remark: "", //备注
      tableSet: [], //编辑table部分
      isDelete: true, //移除弹出框
      // tableData: [
      //   {
      //     MSKU: 11,
      //   },
      // ],
    };
  },
  props: {
    tableData: {
      type: Array,
    },
  },
  computed: {
    // ...mapState({
    //   //数据
    //   tableData: (state) =>
    //     state.FBAshipmentsPlan.shipmentsDetailTableData.items,
    // }),
  },
  methods: {
    ...mapMutations("FBAshipmentsPlan", ["deleteOneFromShipments"]),
    ...mapActions("FBAshipmentsPlan", ["changeShipmentsDetailEdit"]),
    //table checkbox选中状态
    handleSelectionChange(arg) {
      console.log(arg);
    },
    //移除
    remove(arg) {
      //删除编辑部分的数据

      this.changeShipmentsDetailEdit({ arg, type: 2 })
        .then(() => {
          this.tableSet.splice(arg, 1);
        })
        .catch(() => {
          this.$message.warning("删除失败");
        });
    },
    //检查计划发货量
    checkPlanShipmentsPlan(availableNum, planNum, index) {
      if (planNum * 1 > availableNum) {
        this.$message.warning("您输入的计划发货量超过了可用量");
        this.tableSet[index][[0]] = availableNum;
      }
    },
  },

  mounted() {
    if (this.tableData) {
      this.tableData.forEach((item, key) => {
        let data = {
          0: item.plan_num,

          1: item.remark,
        };
        this.tableSet.push(data);
      });
    } else {
      this.tableSet = [];
    }

    //详情编辑保存联动
    this.$bus.$on("save", () => {
      let saveToF = true;
      this.tableSet.forEach((item, key) => {
        console.log(item["0"]);
        if (item["0"] && item["0"] != 0) {
        } else {
          saveToF = false;
        }
      });
      if (saveToF) {
        this.$bus.$emit("saveToF", this.tableSet);
      } else {
        this.$message.error("请填写计划发货量且计划发货量不能为0");
      }
    });
  },
  beforeDestroy() {
    this.$bus.$off("save");
  },
};
</script>

<style lang="scss" scoped>
.shipmentsBtn {
  outline: none;
  border: 0;
  background: white;
  color: #1890ff;
}
</style>