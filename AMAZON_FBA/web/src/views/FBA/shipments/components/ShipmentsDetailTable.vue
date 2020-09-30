<template>
  <div>
    <template v-if="pack_type == 0">
      <!-- sku信息 -->
      <template>
        <!-- <el-button @click="find">test</el-button> -->
        <el-table
          :data="tableData.sku_info"
          style="width: 100%"
          :header-cell-style="{ background: '#F5F7FA', color: '#606266' }"
          :default-expand-all="true"
          ref="t1"
        >
          <!-- <el-table-column type="expand" v-if="true">
          <template slot-scope="scope">
            <el-table :data="tableData" :show-header="false" v-if="scope.row.items">
              <el-table-column align="center" width="48"></el-table-column>
              <el-table-column align="center" width="180" label="123"></el-table-column>
              <el-table-column align="center" width="120" label="123"></el-table-column>
              <el-table-column align="center" width="180" label="123"></el-table-column>
              <el-table-column align="center" label="123"></el-table-column>
              <el-table-column align="center" width="150" label="123"></el-table-column>
              <el-table-column align="center" v-for="(item,key) in 20" :key="key" width="120">
                <template slot-scope="scope">
                  <el-input v-model="scope.row[key]" style="width:100px" />
                </template>
              </el-table-column>
            </el-table>
          </template>
          </el-table-column>-->
          <el-table-column
            width="120"
            prop="site"
            label="总箱数"
            align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.$index == 0">{{ boxes_total }}</span>
            </template>
          </el-table-column>
          <el-table-column
            width="120"
            prop="address"
            label="图片"
            align="center"
          >
            <template slot-scope="scope">
              <div style="width: 120px; height: 50px">
                <img
                  style="width: 100px; height: 50px"
                  :src="scope.row.main_image"
                  alt
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="site" label="MSKU/FNSKU" align="center">
            <template slot-scope="scope"
              >{{ scope.row.m_sku }}/{{ scope.row.fn_sku }}</template
            >
          </el-table-column>
          <el-table-column prop="plan" label="品名/SKU" align="center">
            <template slot-scope="scope"
              >{{ scope.row.title }}/{{ scope.row.product_sku }}</template
            >
          </el-table-column>
          <el-table-column
            width="150"
            prop="plan_num"
            label="申报量"
            align="center"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.plan_num"
                style="width: 80px"
                @blur="planNumChange(scope.row.plan_num, scope.$index)"
                :disabled="pack_status != 1"
                oninput="value=value.replace(/[^0-9]/g,'')"
              />
            </template>
          </el-table-column>
          <!-- <el-table-column v-for="(item,key) in 20" :key="key" align="center" width="120">
          <template slot-scope="scope">
            <el-input style="width:100px" v-model="scope.row.box_info[key]" />
          </template>
          </el-table-column>-->

          <el-table-column
            prop="sku_info"
            label="箱子"
            align="center"
            v-for="(item, key) in tableData.sku_info[0].box_info"
            :key="key"
            width="80"
          >
            <template slot="header">
              <span>箱子{{ item.label }}</span>
            </template>
            <template slot-scope="scope">
              <!-- {{ scope.row.box_info[key] }} -->
              <el-input
                v-model="scope.row.box_info[key].value"
                :disabled="pack_status != 1"
                oninput="value=value.replace(/[^0-9]/g,'')"
              />
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 箱子毛重 -->
      <template>
        <el-table
          :data="tableData.gross_weight"
          style="width: 100%"
          :header-cell-style="{ background: '#F5F7FA', color: '#606266' }"
          :show-header="false"
          ref="t2"
        >
          <el-table-column width="120" align="center">
            <template>
              <span>箱子毛重/KG</span>
            </template>
          </el-table-column>
          <el-table-column width="120" align="center">
            <template slot-scope="scope">
              <el-input
                placeholder="请输入"
                v-model="scope.row.grossWeightAll"
                :disabled="pack_status != 1"
                @input="changeGrossWeightAll"
                oninput="value=value.replace(/[^0-9.]/g,'')"
              />
            </template>
          </el-table-column>
          <el-table-column align="center"></el-table-column>
          <el-table-column prop="plan" align="center"></el-table-column>
          <el-table-column width="150" align="center" />
          <el-table-column
            prop="sku_info"
            label="箱子"
            align="center"
            v-for="(item, key) in tableData.sku_info[0].box_info"
            :key="key"
            width="80"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row[key + 1]"
                :disabled="pack_status != 1"
                oninput="value=value.replace(/[^0-9.]/g,'')"
              />
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 箱子长度 -->
      <template>
        <el-table
          :data="tableData.box_length"
          style="width: 100%"
          :header-cell-style="{ background: '#F5F7FA', color: '#606266' }"
          :show-header="false"
          ref="t3"
        >
          <el-table-column width="120" align="center">
            <template>
              <span>箱子长度/CM</span>
            </template>
          </el-table-column>
          <el-table-column width="120" align="center">
            <template slot-scope="scope">
              <el-input
                placeholder="请输入"
                v-model="scope.row.lengthAll"
                :disabled="pack_status != 1"
                @input="changeLengthAll"
                oninput="value=value.replace(/[^0-9.]/g,'')"
              />
            </template>
          </el-table-column>
          <el-table-column align="center"></el-table-column>
          <el-table-column prop="plan" align="center"></el-table-column>
          <el-table-column width="150" align="center" />
          <el-table-column
            prop="sku_info"
            label="箱子"
            align="center"
            v-for="(item, key) in tableData.sku_info[0].box_info"
            :key="key"
            width="80"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row[key + 1]"
                :disabled="pack_status != 1"
                oninput="value=value.replace(/[^0-9.]/g,'')"
              />
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 箱子宽度 -->
      <template>
        <el-table
          :data="tableData.box_width"
          style="width: 100%"
          :header-cell-style="{ background: '#F5F7FA', color: '#606266' }"
          :show-header="false"
          ref="t4"
        >
          <el-table-column width="120" align="center">
            <template>
              <span>箱子宽度/CM</span>
            </template>
          </el-table-column>
          <el-table-column width="120" align="center">
            <template slot-scope="scope">
              <el-input
                placeholder="请输入"
                :disabled="pack_status != 1"
                v-model="scope.row.widthAll"
                @input="changeWidthAll"
                oninput="value=value.replace(/[^0-9.]/g,'')"
              />
            </template>
          </el-table-column>
          <el-table-column align="center"></el-table-column>
          <el-table-column prop="plan" align="center"></el-table-column>
          <el-table-column width="150" align="center" />
          <el-table-column
            prop="sku_info"
            label="箱子"
            align="center"
            v-for="(item, key) in tableData.sku_info[0].box_info"
            :key="key"
            width="80"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row[key + 1]"
                :disabled="pack_status != 1"
                oninput="value=value.replace(/[^0-9.]/g,'')"
              />
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 箱子高度 -->
      <template>
        <el-table
          :data="tableData.box_height"
          style="width: 100%"
          :header-cell-style="{ background: '#F5F7FA', color: '#606266' }"
          :show-header="false"
          ref="t5"
        >
          <el-table-column width="120" align="center">
            <template>
              <span>箱子高度/CM</span>
            </template>
          </el-table-column>
          <el-table-column width="120" align="center">
            <template slot-scope="scope">
              <el-input
                placeholder="请输入"
                :disabled="pack_status != 1"
                v-model="scope.row.heightAll"
                @input="changeHeightAll"
                oninput="value=value.replace(/[^0-9.]/g,'')"
              />
            </template>
          </el-table-column>
          <el-table-column align="center"></el-table-column>
          <el-table-column prop="plan" align="center"></el-table-column>
          <el-table-column width="150" align="center" />
          <el-table-column
            prop="sku_info"
            label="箱子"
            align="center"
            v-for="(item, key) in tableData.sku_info[0].box_info"
            :key="key"
            width="80"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row[key + 1]"
                :disabled="pack_status != 1"
                oninput="value=value.replace(/[^0-9.]/g,'')"
              />
            </template>
          </el-table-column>
        </el-table>
      </template>
    </template>
    <template v-else>
      <el-table
        :data="tableData.sku_info"
        style="width: 100%"
        :header-cell-style="{ background: '#F5F7FA', color: '#606266' }"
        :default-expand-all="true"
        ref="t1"
      >
        <el-table-column width="120" prop="address" label="图片" align="center">
          <template slot-scope="scope">
            <div style="width: 120px; height: 50px">
              <img
                style="width: 100px; height: 50px"
                :src="scope.row.main_image"
                alt
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="MSKU/FNSKU" align="center">
          <template slot-scope="scope"
            >{{ scope.row.m_sku }}/{{ scope.row.fn_sku }}</template
          >
        </el-table-column>
        <el-table-column label="品名/SKU" align="center">
          <template slot-scope="scope"
            >{{ scope.row.title }}/{{ scope.row.product_sku }}</template
          >
        </el-table-column>
        <!-- <el-table-column width="120" label="申报量" align="center">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.plan_num"
              style="width: 80px"
              disabled
              @blur="planNumChange(scope.row.plan_num, scope.$index)"
            />
          </template>
        </el-table-column> -->
        <el-table-column width="130" label="箱子毛重（kg）" align="center">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.gross_weight"
              :disabled="pack_status != 1"
              style="width: 80px"
              oninput="value=value.replace(/[^0-9.]/g,'')"
            />
          </template>
        </el-table-column>
        <el-table-column width="250" label="箱子尺寸（cm）" align="center">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.box_length"
              :disabled="pack_status != 1"
              style="width: 50px"
              oninput="value=value.replace(/[^0-9.]/g,'')"
            />
            <span style="margin: 0 6px 0 6px">×</span>
            <el-input
              v-model="scope.row.box_width"
              :disabled="pack_status != 1"
              style="width: 50px"
              oninput="value=value.replace(/[^0-9.]/g,'')"
            />
            <span style="margin: 0 6px 0 6px">×</span>
            <el-input
              v-model="scope.row.box_height"
              :disabled="pack_status != 1"
              style="width: 50px"
              oninput="value=value.replace(/[^0-9.]/g,'')"
            />
          </template>
        </el-table-column>
        <el-table-column width="120" label="单箱数量" align="center">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.quantity_per_box"
              :disabled="pack_status != 1"
              style="width: 80px"
              @input="
                changeSingleOrTotal(
                  scope.row.quantity_per_box * 1,
                  scope.row.boxes_num * 1,
                  scope.row.plan_num * 1,
                  scope.$index,
                  1
                )
              "
              oninput="value=value.replace(/[^0-9]/g,'')"
            />
          </template>
        </el-table-column>
        <el-table-column width="120" label="箱数" align="center">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.boxes_num"
              :disabled="pack_status != 1"
              style="width: 80px"
              @input="
                changeSingleOrTotal(
                  scope.row.quantity_per_box * 1,
                  scope.row.boxes_num * 1,
                  scope.row.plan_num * 1,
                  scope.$index,
                  2
                )
              "
              oninput="value=value.replace(/[^0-9]/g,'')"
            />
          </template>
        </el-table-column>
        <el-table-column width="120" label="申报量" align="center">
          <template slot-scope="scope">
            <el-input
              :value="scope.row.plan_num"
              style="width: 80px"
              disabled
            />
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { reqUpdataInboundPackInfo } from "@/api/FBA";
export default {
  data() {
    return {
      t1: "",
      t2: "",
      t3: "",
      t4: "",
      t5: "",
      planNumCache: {},
      // tableData: {
      //   box_height: [{ heightAll: "" }],
      //   box_length: [{ lengthAll: "" }],
      //   box_width: [{ widthAll: "" }],
      //   gross_weight: [{ grossWeightAll: "" }],
      //   sku_info: [],
      //   boxes_total: "",
      // },
    };
  },
  computed: {
    plan_num() {},
  },

  props: {
    tableData: {
      type: Object,
    },
    inbound_id: {},
    boxes_total: {},
    pack_type: {},
    pack_status: {},
  },

  methods: {
    find() {
      console.log(this.tableData);
    },
    //table checkbox选中状态
    handleSelectionChange(arg) {
      console.log(arg);
    },
    //改变所有
    changeGrossWeightAll(arg) {
      for (let key in this.tableData.gross_weight[0]) {
        if (key !== "grossWeightAll") {
          this.tableData.gross_weight[0][key] = arg;
        }
      }
    },
    changeHeightAll(arg) {
      for (let key in this.tableData.box_height[0]) {
        if (key !== "heightAll") {
          this.tableData.box_height[0][key] = arg;
        }
      }
    },
    changeWidthAll(arg) {
      for (let key in this.tableData.box_width[0]) {
        if (key !== "WeightAll") {
          this.tableData.box_width[0][key] = arg;
        }
      }
    },
    changeLengthAll(arg) {
      console.log(arg);
      for (let key in this.tableData.box_length[0]) {
        if (key !== "lengthAll") {
          this.tableData.box_length[0][key] = arg;
        }
      }
    },

    //申报量change、
    planNumChange(arg, index) {
      let num = Math.floor(this.planNumCache[index] * 0.05);
      if (num < 6) {
        num = 6;
      }
      let max = this.planNumCache[index] + num;
      let min = this.planNumCache[index] - num;
      if (min <= 0) {
        min = 1;
      }

      let hasMessage = false;

      //max
      if (arg * 1 > max) {
        this.tableData.sku_info[index].plan_num = max;
        hasMessage = true;
      }
      //min
      if (arg < min) {
        this.tableData.sku_info[index].plan_num = min;
        hasMessage = true;
      }
      if (hasMessage) {
        this.$message.error(
          "当前申报量修改仅可介于" + min + "与" + max + "之间"
        );
      }
    },

    changeSingleOrTotal(single, total, planNum, index, type) {
      let num = Math.floor(this.planNumCache[index] * 0.05);
      if (num < 6) {
        num = 6;
      }
      let max = this.planNumCache[index] + num;
      let min = this.planNumCache[index] - num;
      if (min <= 0) {
        min = 1;
      }

      if (type == 1) {
        //单箱数量
        if (single == 0) {
          this.$message.error("单箱数量不能为0");
          this.tableData.sku_info[index].quantity_per_box = 1;
          // this.planNumCache[index] /
          // this.tableData.sku_info[index].boxes_total;
        } else if (single * total > max || single * total < min) {
          this.tableData.sku_info[index].quantity_per_box = 1;
          // this.planNumCache[index] /
          // this.tableData.sku_info[index].boxes_total;
          this.$message.error(
            "当前商品申报量仅可设置在" + min + "至" + max + "之间"
          );
        }
      } else if (type == 2) {
        // 箱数;
        if (total == 0) {
          this.$message.error("箱数不能为0");
          this.tableData.sku_info[index].boxes_num = 1;
          // this.planNumCache[index] /
          // this.tableData.sku_info[index].boxes_total;
        } else if (single * total > max || single * total < min) {
          this.tableData.sku_info[index].boxes_num = 1;
          // this.planNumCache[index] /
          // this.tableData.sku_info[index].boxes_total;
          this.$message.error(
            "当前商品申报量仅可设置在" + min + "至" + max + "之间"
          );
        }
      }
      this.tableData.sku_info[index].plan_num =
        this.tableData.sku_info[index].quantity_per_box *
        this.tableData.sku_info[index].boxes_num;
    },
  },
  mounted() {
    //缓存申报量
    if (this.tableData.sku_info) {
      this.$props.tableData.sku_info.forEach((item, key) => {
        this.planNumCache[key] = item.plan_num * 1;
      });
    }

    //上传
    this.$bus.$on("uploadBoxInfo", () => {
      let uploadData = {};
      uploadData.inbound_id = this.inbound_id;
      uploadData.boxes_total = this.boxes_total;
      uploadData.pack_type = this.pack_type;
      //混装
      if (this.pack_type == 0) {
        uploadData.gross_weight = this.tableData.gross_weight[0];
        delete uploadData.gross_weight.grossWeightAll;
        uploadData.box_height = this.tableData.box_height[0];
        delete uploadData.box_height.heightAll;
        uploadData.box_length = this.tableData.box_length[0];
        delete uploadData.box_length.lengthAll;
        uploadData.box_width = this.tableData.box_width[0];
        delete uploadData.box_width.widthAll;
        uploadData.sku_info = this.tableData.sku_info;

        //监测sku箱子里的数量是否等于申报量
        let skuTotalIsTrue = false;
        uploadData.sku_info.forEach((item) => {
          let boxTotalItem = 0;
          item.box_info.forEach((i) => {
            boxTotalItem += i.value * 1;
          });
          if (boxTotalItem != item.plan_num) {
            skuTotalIsTrue = true;
            return false;
          }
        });
        if (skuTotalIsTrue) {
          this.$message.error("存在各箱数量之和不等于申报量的情况");
          return false;
        }

        //监测空箱子情况
        let hasNoneBox = false;
        for (let i = 0; i < uploadData.boxes_total; i++) {
          let boxSingle = 0;
          uploadData.sku_info.forEach((item, key) => {
            // console.log(item, key);
            boxSingle += item.box_info[i].value * 1;
          });
          if (boxSingle == 0) {
            hasNoneBox = true;
            break;
          }
        }
        if (hasNoneBox) {
          this.$message.error("存在空箱子");
          return false;
        }

        //检测箱子参数是否完整
        let hasNoneArgBox = false;
        for (let i = 1; i <= uploadData.boxes_total; i++) {
          if (
            uploadData.box_height[i] &&
            uploadData.box_length[i] &&
            uploadData.box_width[i] &&
            uploadData.gross_weight[i]
          ) {
          } else {
            hasNoneArgBox = true;
            break;
          }
        }
        if (hasNoneArgBox) {
          this.$message.error("请完善箱子信息");
          return false;
        }
        //清空
        this.tableData.gross_weight.grossWeightAll = "";
        this.tableData.box_height.heightAll = "";
        this.tableData.box_length.lengthAll = "";
        this.tableData.box_width.widthAll = "";
        // 提交
        this.$emit("uploadBoxInfoToF", uploadData);
      }
      //原装
      else if (this.pack_type == 1) {
        uploadData.sku_info = this.tableData.sku_info;
        //验证信息完整性
        let infoMiss = false;
        uploadData.sku_info.forEach((item) => {
          if (
            item.box_height &&
            item.box_length &&
            item.box_width &&
            item.gross_weight &&
            item.quantity_per_box &&
            item.boxes_num &&
            item.box_height != 0 &&
            item.box_length != 0 &&
            item.box_width != 0 &&
            item.gross_weight != 0 &&
            item.quantity_per_box != 0 &&
            item.boxes_num != 0
          ) {
          } else {
            infoMiss = true;
          }
        });
        if (infoMiss) {
          this.$message.error("请完善装箱信息");
          return false;
        }
        // 提交
        this.$emit("uploadBoxInfoToF", uploadData);
      }
    });

    //滚动条事件
    if (this.pack_type == 0) {
      this.t1 = this.$refs.t1.bodyWrapper;
      this.t2 = this.$refs.t2.bodyWrapper;
      this.t3 = this.$refs.t3.bodyWrapper;
      this.t4 = this.$refs.t4.bodyWrapper;
      this.t5 = this.$refs.t5.bodyWrapper;
      this.t1.addEventListener("scroll", () => {
        this.t2.scrollLeft = this.t1.scrollLeft;
        this.t3.scrollLeft = this.t1.scrollLeft;
        this.t4.scrollLeft = this.t1.scrollLeft;
        this.t5.scrollLeft = this.t1.scrollLeft;
      });
      this.t2.addEventListener("scroll", () => {
        this.t1.scrollLeft = this.t2.scrollLeft;
        this.t3.scrollLeft = this.t2.scrollLeft;
        this.t4.scrollLeft = this.t2.scrollLeft;
        this.t5.scrollLeft = this.t2.scrollLeft;
      });
      this.t3.addEventListener("scroll", () => {
        this.t1.scrollLeft = this.t3.scrollLeft;
        this.t2.scrollLeft = this.t3.scrollLeft;
        this.t4.scrollLeft = this.t3.scrollLeft;
        this.t5.scrollLeft = this.t3.scrollLeft;
      });
      this.t4.addEventListener("scroll", () => {
        this.t1.scrollLeft = this.t4.scrollLeft;
        this.t2.scrollLeft = this.t4.scrollLeft;
        this.t3.scrollLeft = this.t4.scrollLeft;
        this.t5.scrollLeft = this.t4.scrollLeft;
      });
      this.t5.addEventListener("scroll", () => {
        this.t1.scrollLeft = this.t5.scrollLeft;
        this.t2.scrollLeft = this.t5.scrollLeft;
        this.t3.scrollLeft = this.t5.scrollLeft;
        this.t4.scrollLeft = this.t5.scrollLeft;
      });
    }
  },
  beforeDestroy() {
    this.$bus.$off("uploadBoxInfo");
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