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
          <div style="width:100px;height:50px;">
            <img style="width:100px;height:50px" :src="scope.row.main_image" alt />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="site" label="MSKU/FNSKU" align="center">
        <template slot-scope="scope">{{scope.row.m_sku}}/{{scope.row.fn_sku}}</template>
      </el-table-column>

      <el-table-column prop="plan" label="品名/SKU" align="center">
        <template slot-scope="scope">{{scope.row.title}}/{{scope.row.product_sku}}</template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center" />
      <el-table-column prop="available_num" label="可用量" align="center" />

      <el-table-column width="150" align="center" v-if="packingType == 1">
        <template slot="header">
          <span style="color:red">*</span>
          <span>单箱数量</span>
        </template>
        <template slot-scope="scope">
          <el-input
            v-model.number="scope.row.quantity_per_box"
            oninput="value=value.replace(/[^\d]/g,'')"
            @input="singleBoxChange(scope.row.available_num,scope.row.quantity_per_box,scope.row.boxes_num,scope.row.plan_num,scope.$index)"
          />
        </template>
      </el-table-column>
      <el-table-column width="150" align="center" v-if="packingType == 1">
        <template slot="header">
          <span style="color:red">*</span>
          <span>箱数</span>
        </template>
        <template slot-scope="scope">
          <el-input
            v-model.number="scope.row.boxes_num"
            oninput="value=value.replace(/[^\d]/g,'')"
            @input="boxesNumChange(scope.row.available_num,scope.row.quantity_per_box,scope.row.boxes_num,scope.row.plan_num,scope.$index)"
          />
        </template>
      </el-table-column>

      <el-table-column width="150" prop="plan_num" label="申报量" align="center">
        <template slot="header">
          <span v-if="packingType == 0" style="color:red">*</span>
          <span>申报量</span>
        </template>
        <template slot-scope="scope">
          <el-input
            v-if="packingType == 0"
            v-model.number="scope.row.plan_num"
            @input="planNumChange(scope.row.plan_num,scope.row.available_num,scope.$index)"
            oninput="value=value.replace(/[^\d]/g,'')"
          />
          <span v-else>{{scope.row.plan_num}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      planNumInput: "",
      singleNum: "",
      boxTotal: "",
    };
  },
  props: {
    tableData: {
      type: Array,
    },
    packingType: String,
    //是否点击申报按钮
    isDeclare: {
      type: Number,
    },
  },
  methods: {
    //table checkbox选中状态
    handleSelectionChange(arg) {
      console.log(arg);
    },
    //申报量检测
    planNumChange(planNum, availableNum, index) {
      if (planNum == 0) {
        this.$message.error("申报量不能为0");
        this.tableData[index].plan_num = 1;
      }
      // if (planNum > availableNum) {
      //   this.$message.error("申报量不能超过" + availableNum);
      //   this.tableData[index].plan_num = availableNum;
      // }
    },
    //单项数量检测
    singleBoxChange(
      availableNum,
      quantity_per_box,
      boxes_num,
      plan_num,
      index
    ) {
      if (quantity_per_box)
        if (boxes_num == 0) {
          if (quantity_per_box > plan_num) {
            this.$message.error("单箱数量不能超过申报量");
            this.tableData[index].quantity_per_box = plan_num;
          }
        } else {
          this.tableData[index].plan_num = quantity_per_box * boxes_num;
          // if (quantity_per_box * boxes_num > availableNum) {
          //   this.$message.error(
          //     "单箱数量*箱数的值超过了可用量，请输入正确的单箱数量"
          //   );
          //   this.tableData[index].quantity_per_box = 1;
          //   this.tableData[index].plan_num = boxes_num;
          // } else {
          //   this.tableData[index].plan_num = quantity_per_box * boxes_num;
          // }
        }
    },
    //箱数检测
    boxesNumChange(availableNum, quantity_per_box, boxes_num, plan_num, index) {
      let total = 0;
      if (boxes_num && boxes_num != 0) {
        //有且不未0
        this.tableData.forEach((item) => {
          if (item.boxes_num) {
            total += item.boxes_num;
          }
        });
        if (total > 500) {
          //不能大于500
          this.$message.error("总箱数不能超过500");
          this.tableData[index].boxes_num = 0;
        } else {
          if (quantity_per_box == 0) {
            //单项数量为0时
            if (boxes_num > plan_num) {
              this.$message.error("箱数不能超过申报量");
              this.tableData[index].boxes_num = plan_num;
            }
          } else {
            this.tableData[index].plan_num = quantity_per_box * boxes_num;
            // if (quantity_per_box * boxes_num > availableNum) {
            //   //乘积超过可用量
            //   this.$message.error(
            //     "单箱数量*箱数的值超过了可用量，请输入正确的单箱数量"
            //   );
            //   this.tableData[index].boxes_num = 1;
            //   this.tableData[index].plan_num = quantity_per_box;
            // } else {
            //   this.tableData[index].plan_num = quantity_per_box * boxes_num;
            // }
          }
        }
      }
    },
  },
  watch: {
    //父级申报按钮
    isDeclare() {
      if (this.packingType == 1) {
        //原装
        let needComplete = false; //检测单箱和箱数是否都填写完成
        this.tableData.forEach((item) => {
          if (
            item.quantity_per_box &&
            item.boxes_num &&
            item.quantity_per_box !== 0 &&
            item.boxes_num !== 0
          ) {
          } else {
            needComplete = true;
          }
        });
        if (needComplete) {
          this.$message.error("请填写完所有单箱数量和箱数");
        } else {
          this.$emit("sendToCreateParecel", this.tableData);
        }
      } else if (this.packingType == 0) {
        //混装
        let needComplete = false; //检测申报量是否填写完成
        this.tableData.forEach((item) => {
          if (item.plan_num && item.plan_num !== 0) {
          } else {
            needComplete = true;
          }
        });
        if (needComplete) {
          this.$message.error("请填写完所有申报量且不能为0");
        } else {
          this.$emit("sendToCreateParecel", this.tableData);
        }
      }
    },
  },
  mounted() {
    console.log(this.$props, 1);
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