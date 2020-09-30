<template>
  <div>
    <el-table
      header-row-class-name="list-header"
      :stripe="!hasSubRow"
      v-loading="loading"
      :show-header="showHeader!=false"
      :span-method="getSpan"
      :default-sort="defaultSort"
      @selection-change="handleSelectionChange"
      @sort-change="sortChange"
      :border="border!=false"
      :data="getData"
      :row-class-name="rowClassName"
      :max-height="maxHeight"
      highlight-current-row
      @current-change="handleColumnChange"
      @cell-click="handleCellClick"
      :show-summary="showSummary"
      :summary-method="summaryMethod"
    >
      <template v-for="(column, index) in columns">
        <el-table-column
        :key="index"
          :render-header="(h,obj)=>renderHeader(h,obj,column)"
          :type="column.type"
          title="222ss"
          v-if="column.type=='selection'"
          :fixed="column.fixed"
        ></el-table-column>
        <el-table-column
          :render-header="(h,obj)=>renderHeader(h,obj,column)"
          :width="column.width"
          :key="index"
          :min-width="column.minWidth"
          v-if="!column.type"
          :prop="column.prop"
          :sortable="column.sortable"
          :align="column.align"
          :type="column.type"
          :fixed="column.fixed"
          :label="column.title"
        >
          <template slot-scope="scope">
            <el-tooltip
              v-if="column.propver==true"
              :content="scope.row[column.bind],column.formatter,scope.row | dataListFormat"
              placement="right"
              effect="light"
            >
              <span :class="column.getClass?column.getClass(column,scope.row):null">
                {{scope.row[column.bind],column.formatter,scope.row
                | dataListFormat}}
              </span>
            </el-tooltip>
            <span
              v-if="column.propver!=true"
              :class="column.getClass?column.getClass(column,scope.row):null"
            >{{scope.row[column.bind],column.formatter,scope.row | dataListFormat}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :render-header="(h,obj)=>renderHeader(h,obj,column)"
          :width="column.width"
          :key="index"
          :min-width="column.minWidth"
          v-if="column.type=='propver'"
          :prop="column.prop"
          :sortable="column.sortable"
          :align="column.align"
          :type="column.type"
          :fixed="column.fixed"
          :label="column.title"
        >
          <template slot-scope="scope">
            <el-popover
              v-if="column.isRender?column.isRender(scope.row):true"
              :placement="column.placement ? column.placement
            : 'left'"
              :trigger="column.trigger"
              :title="column.propverTitle"
              :popper-class="column.getClass?column.getClass(column,scope.row):null"
            >
              <p>{{ scope.row[column.propverText],column.formatter,scope.row | dataListFormat}}</p>
              <span :class="column.className" slot="reference">
                {{scope.row[column.bind],column.formatter,scope.row |
                dataListFormat}}
              </span>
            </el-popover>
            <span v-if="column.isRender?!column.isRender(scope.row):false">
              {{scope.row[column.bind],column.formatter,scope.row
              | dataListFormat}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          :render-header="(h,obj)=>renderHeader(h,obj,column)"
          :width="column.width"
          :key="index"
          :min-width="column.minWidth"
          v-if="column.type=='iconPropver'"
          :prop="column.prop"
          :sortable="column.sortable"
          :align="column.align"
          :type="column.type"
          :fixed="column.fixed"
          :label="column.title"
        >
          <template slot-scope="scope">
            <span v-if="column.isRender?column.isRender(scope.row):true" :class="column.className">
              {{scope.row[column.bind],column.formatter,scope.row
              | dataListFormat}}
              <el-tooltip
                v-if="column.isRender?column.isRender(scope.row):true"
                :placement="column.placement ? column.placement
                : 'left'"
                :title="column.propverTitle"
                :popper-class="column.getClass?column.getClass(column,scope.row):null"
                :effect="column.effect?column.effect:'dark'"
              >
                <div v-if="column.customText" slot="content" style="margin:0">
                  <p
                    v-for="(item, index) in column.customText(scope.row)"
                    :key="index"
                    style="margin:4px 0"
                  >{{item.text}}</p>
                </div>
                <p
                  v-else
                  slot="content"
                >{{ scope.row[column.propverText],column.formatter,scope.row | dataListFormat}}</p>
                <span class="iconPropver">
                  <i :class="column.iconClass"></i>
                </span>
              </el-tooltip>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          :render-header="(h,obj)=>renderHeader(h,obj,column)"
          :width="column.width"
          :min-width="column.minWidth"
          v-if="column.type=='click'"
          :key="index"
          :prop="column.prop"
          :type="column.type"
          :fixed="column.fixed"
          :label="column.title"
          :sortable="column.sortable"
        >
          <template slot-scope="scope">
            <el-button
              @click="cellClick(column,scope.$index, scope.row)"
              type="text"
              v-if="column.tag!='a'"
              style="padding:0"
            >
              {{
              scope.row[column.bind] }}
            </el-button>
            <el-popover trigger="hover" placement="right" width="300" v-if="column.tag=='a'">
              <p>{{ scope.row[column.bind] }}</p>
              <div slot="reference" class="name-wrapper">
                <a
                  @click="cellClick(column,scope.$index, scope.row)"
                  style="cursor: pointer;"
                  class="ew-jump"
                >{{ scope.row[column.bind] }}</a>
              </div>
            </el-popover>
            <!-- <a @click="cellClick(column,scope.$index, scope.row)" v-if="column.tag=='a'" style="cursor: pointer;">{{ scope.row[column.bind] }}</a> -->
          </template>
        </el-table-column>
        <el-table-column
          :render-header="(h,obj)=>renderHeader(h,obj,column)"
          :width="column.width"
          v-if="column.type=='img'"
          :key="index"
          :prop="column.prop"
          :type="column.type"
          :fixed="column.fixed"
          :label="column.title"
        >
          <template slot-scope="scope">
               <el-popover
                placement="right"
                width="330"
                trigger="hover">
                <img :src="scope.row[column.bind]" alt="" style="width: 300px">
                <img slot="reference" :src="scope.row[column.bind]" alt="" style="height: 40px">
              </el-popover> 
          </template>
        </el-table-column>
        <el-table-column
          :render-header="(h,obj)=>renderHeader(h,obj,column)"
          :width="column.width"
          :key="index"
          v-if="column.type=='buttons'"
          :prop="column.prop"
          :type="column.type"
          :fixed="column.fixed"
          :label="column.title"
          :align="column.align"
        >
          <template slot-scope="scope">
            <el-button
             :key="index"
              v-for="(btn,index) in column.btns"
              v-if="btn.isRender?btn.isRender(scope.row):true"
              @click="btnClick(btn,column,scope.$index,scope.row)"
              :type="btn.btnType?btn.btnType:'text'"
              :disabled="btn.disabled?btn.disabled:false"
              style="padding:0"
            >{{btn.text}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
         :key="index"
          :render-header="(h,obj)=>renderHeader(h,obj,column)"
          :width="column.width"
          v-if="column.type=='switch'"
          :prop="column.prop"
          :type="column.type"
          :fixed="column.fixed"
          :label="column.title"
        >
          <template slot-scope="scope">
            <el-switch
              :active-text="column.activeText"
              v-if="typeof(column.visable)=='function'?column.visable(column,scope.row):column.visable"
              :inactive-text="column.inactiveText"
              active-color="#13ce66"
              inactive-color="#bfcbd9"
              :value="scope.row[column.valueProp]"
              :active-value="column.activeValue?column.activeValue:true"
              :inactive-value="column.inactiveValue?column.inactiveValue:false"
              @change="switchChange(column, scope.$index, scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column
         :key="index"
          :render-header="(h,obj)=>renderHeader(h,obj,column)"
          :width="column.width"
          v-if="column.type=='tag'"
          :prop="column.prop"
          :type="column.type"
          :fixed="column.fixed"
          :label="column.title"
          :align="column.align"
        >
          <template slot-scope="scope">
            <el-tag
              :type="column.tagType?column.tagType(column,scope.row): ''"
              close-transition
            >{{scope.row[column.bind],column.formatter,scope.row | dataListFormat}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
         :key="index"
          :render-header="(h,obj)=>renderHeader(h,obj,column)"
          :width="column.width"
          v-if="column.type=='tags'"
          :prop="column.prop"
          :type="column.type"
          :fixed="column.fixed"
          :label="column.title"
          :align="column.align"
        >
          <template slot-scope="scope">
            <el-tag
             :key="index"
              style="margin:3px;"
              v-for="(tag,index) in scope.row[column.bind]"
              :type="column.tagType?column.tagType(column,scope.row):''"
              close-transition
            >{{tag,column.formatter,scope.row | dataListFormat}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
        :key="index"
          :render-header="(h,obj)=>renderHeader(h,obj,column)"
          :width="column.width"
          v-if="column.type=='custom'"
          :prop="column.prop"
          :fixed="column.fixed"
          :label="column.title"
          :align="column.align"
        >
          <template slot-scope="scope">
            <!--ework table 组件注册需同步-->
            <div :is="column.tagName" :data="scope" :column="column"></div>
          </template>
        </el-table-column>
        <el-table-column
        :key="index"
          :render-header="(h,obj)=>renderHeader(h,obj,column)"
          :width="column.width"
          v-if="column.type=='input'"
          :prop="column.prop"
          :fixed="column.fixed"
          :label="column.title"
          :align="column.align"
        >
          <template slot-scope="scope">
            <el-input
              v-if="scope.row[column.isRender]"
              v-model="scope.row[column.bind]"
              @change="column.change($event,scope.row,column.bind,scope)"
            ></el-input>
            <span v-else>{{scope.row[column.bind]}}</span>
          </template>
        </el-table-column>
      </template>
      <slot></slot>
    </el-table>
    <div class="ew-block" v-if="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="paging?paging:[10, 20, 30, 40]"
        :page-size="page.pageSize"
        :currentPage="page.currentPage"
        layout="total, sizes, prev, pager, next"
        :total="page.totalRecords"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import dataHelper from "./dataHelper";
// import dataHelper from "@/components/dataList/dataHelper";
export default {
  props: [
    "highlightCurrentRow",
    "showHeader",
    "columns",
    "data",
    "page",
    "loading",
    "defaultSort",
    "single",
    "hasSubRow",
    "subRowProp",
    "border",
    "rowClassName",
    "showSummary",
    "summaryMethod",
    "paging",
    "maxHeight",
  ],
  components:{dataHelper},
  data() {
    return {
      imgUrl: "",
    };
  },
  methods: {
    mergeRow(row, subRow) {
      let keys = Object.keys(subRow);
      let newRow = {};
      keys.forEach((key) => {
        row[key] = subRow[key];
      });
    },
    cloneRow(row) {
      let keys = Object.keys(row);
      let newRow = {};
      keys.forEach((key) => {
        newRow[key] = row[key];
      });
      return newRow;
    },
    getSpan(content) {
      let row = content.row;
      let column = content.column;
      let rowIndex = content.rowIndex;
      let columnIndex = content.columnIndex;

      if (!this.hasSubRow) {
        return [1, 1];
      } else {
        return row.spans[columnIndex];
      }
    },
    handleColumnChange(val) {
      this.$emit("column-change", val);
    },
    handleCellClick(row, column, cell, event) {
      this.$emit("cell-onclick", { row, column, cell, event });
    },
    handleSelectionChange(rows) {
      this.$emit("selection-change", rows);
    },
    handleSizeChange(val) {
      this.$emit("page-size-changed", val);
    },
    handleCurrentChange(val) {
      this.$emit("page-changed", val);
    },
    cellClick(column, rowIndex, row) {
      if (typeof column.click == "function") {
        column.click(column, row);
      } else {
        this.$emit(column.click, rowIndex, row);
      }
    },
    sortChange(column, prop, order) {
      this.$emit("sort-change", column, prop, order);
    },
    btnClick(btn, column, rowIndex, row) {
      this.$emit(btn.click, btn, column, row);
    },
    switchChange(column, rowIndex, row) {
      if (column.change) {
        column.change(column, rowIndex, row);
        return;
      }
      this.$emit("switch-change", column, rowIndex, row);
    },
    renderHeader(h, { column, $index }, col) {
        
      let _this = this;
      if (col.helpText) {
        return h("data-helper", {
          props: {
            title: col.title,
            helpText: col.helpText,
          },
        });
      } else {
        return col.title;
      }
    },
  },
  computed: {
    getData() {
      if (this.single) {
        return this.data && this.data.length ? this.data : [this.data];
      } else if (!this.hasSubRow) {
        return this.data;
      } else if (!this.data || !this.data.length) {
        return [];
      } else {
        let newRows = [];
        this.data.forEach((row) => {
          let subDatas = row[this.subRowProp];
          if (!subDatas || !subDatas.length) {
            let newRow = this.cloneRow(row);
            newRow.$_original = row;
            newRows.push(newRow);
            newRow.spans = {};
            this.columns.forEach((column, cIndex) => {
              if (column.prop) {
                newRow.spans[cIndex] = [1, 1];
              }
            });
          } else {
            subDatas.forEach((subRow, subRowIndex) => {
              subRow["index"] = subRowIndex;
              let newRow = this.cloneRow(row);
              this.mergeRow(newRow, subRow);
              newRow.$_original = row;
              newRows.push(newRow);
              newRow.spans = {};
              this.columns.forEach((column, cIndex) => {
                if (column.sub) {
                  newRow.spans[cIndex] = [1, 1];
                } else if (subRowIndex == 0) {
                  newRow.spans[cIndex] = [subDatas.length, 1];
                } else {
                  newRow.spans[cIndex] = [0, 0];
                }
              });
            });
          }
        });
        return newRows;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
