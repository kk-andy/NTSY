<template>
<el-col :pull="item.pull" :offset="item.offset" v-layoutform="item" v-if="item.show?item.show==='true':true"
    :class="{formEmpty: item.type == 'empty'}">
    <el-form-item :testId="itemIndex" :class="item.className" :label-width="item.label?item.labelWidth:'0px'"
        :prop="getProp" :label="!item.disabledLabel?item.label:null" :rules="item.rules">
        <template v-if="item.type=='tag'">
            <el-tag :type="item.tagType" @input="onInput(group,item)" @click="tagClick">{{item.value}}</el-tag>
        </template>
        <template v-if="item.type=='btns'">
            <div>
                <el-button @click="btnClick(group,item,btn)" v-for="(btn,index) in item.value" :key="index" :type="btn.style"
                    :icon="btn.icon" style="margin-left: 10px">{{btn.text}}</el-button>
            </div>
        </template>

        <template v-if="item.type=='moneyLabel'">
                <money-label :item="item" :group="group" :item-index="itemIndex"></money-label>
        </template>

        <template v-if="item.type=='label'">
            <span v-if="typeof(item.value)=='function'" :class="item.className">
                {{item.value()}}
            </span>
            <span v-if="item.format && typeof(item.value)!='function'" :class="item.className">
                {{item.value,item.format| dataListFormat}}
                <el-tooltip :disabled="!item.tooltipMessage" placement="right" class="labelPopper">
                    <div slot="content" class="labelToolTip">{{item.tooltipMessage}}</br>{{item.moreTooltipMessage}}
                    </div>
                    <div v-if="item.tooltipMessage">{{item.tooltipQuaere}}
                        <i class="el-icon-question"></i>
                    </div>
                </el-tooltip>
            </span>
            <span v-if="!item.format && typeof(item.value)!='function'" :class="item.className">
                <span v-if="!item.tooltip">{{item.value |nullValue}}</span>
                <el-tooltip v-if="item.tooltip" placement="right" class="labelPopper">
                    <span>{{item.value}}</span>
                    <div slot="content" class="labelToolTip">{{item.value}}</div>
                </el-tooltip>
            </span>
        </template>
        <template>
            <hr v-if="item.type=='line'" class="line-border">
        </template>
        <template v-if="item.type=='list'">
            <data-list :columns="item.columns" style="line-height: 0px" :single="item.single" :data="item.data"
                :sub-row-prop="item.subRowProp" :has-sub-row="item.hasSubRow">
            </data-list>
        </template>
        <template v-if="item.type=='img'">
            <upload-img :read-only="item.readOnly" :limit="item.limit" :append="item.append" :convert-name="item.convertName"
                @input="imgChange($event,item)" v-model="item.value">
            </upload-img>
        </template>
        <template v-if="item.type=='ossImg'">
            <oss-upload-img :read-only="item.readOnly" :limit="item.limit" :append="item.append" :sign="item.folder"
                @input="imgChange($event,item)" v-model="item.value">
            </oss-upload-img>
        </template>
        <template v-if="item.type=='textArea'">
            <el-input :rows="2" type="textarea" @input="onInput(group,item)" v-model.trim="item.value"
                :placeholder="item.placeholder" :maxlength="item.maxlength" :disabled="item.disabled">
            </el-input>
        </template>

        <template v-if="item.type=='secretSelect'">
            <div>
                <secret-select v-model="item.value"                 
                :item="item" 
                :group="group" 
                :item-index="itemIndex" 
                @on-input="onInput(group,item)" 
                @on-change="change(group,item)">
                </secret-select>
            </div>
        </template>

        <template v-if="item.type=='select'">
            <div>
                <el-select v-model="item.value" :collapse-tags="item.collapseTags" :clearable="item.clearable"
                    filterable :disabled="item.disabled" :multiple="item.multiple?item.multiple===true:false"
                    :multiple-limit="item.limit ? item.limit : 0" @input="onInput(group,item)"
                    @change="change(group,item)" :placeholder="item.placeholder">
                    <el-option v-for="option in item.options" :key="option.code" :label="option.name"
                        :value="option.code" :disabled="option.disabled">
                        <span v-if ="item.customValue" style="float: left">{{ option.name  }}({{ option.phoneList[0]}})</span>
                    </el-option>
                </el-select>
            </div>
            <el-tooltip v-if="item.tooltip" :disabled="!item.tooltip" :open-delay="600" placement="top">
                <div slot="content" class="selectToolTip"
                    :width="item.tooltip && item.tooltip.tooltipMessageWidth?item.tooltip.tooltipMessageWidth:'152px'"
                    v-html="item.tooltip.tooltipMessage"></div>
                <div :class="{noWarp:!item.tooltip.tooltipQuaere}" v-if="item.tooltip">{{item.tooltip.tooltipQuaere}}
                    <i class="el-icon-question"></i>
                </div>
            </el-tooltip>
            <el-popover v-if="item.popover" placement="right" trigger="hover">
                <img :src="item.popover.popoverSrc" alt="" :width="item.popover.popoverWidth" style="padding-top:10px;">
                <i class="el-icon-question" slot="reference"
                    style="color:#606266;margin-left:5px;position: absolute;right: -20px;top: 15px;"></i>
            </el-popover>
        </template>
        <template v-if="item.type === 'custom'">
            <div v-bind="getItem(item)" :data="item" class="col" :columns="item.options" v-model="item.value"
                :value="item.value" :is="item.tagName" @input="onInput(group,item)" @change="change(group,item)"></div>
        </template>
        <template v-if="item.type=='radioButton'">
            <el-radio-group @change="change(group,item)" @input="onInput(group,item)" v-model="item.value">
                <el-radio-button v-for="option in item.options" :key="option.code" :label="option.code">{{option.name}}</el-radio-button>
            </el-radio-group>
        </template>
        <template v-if="item.type=='radio'">
            <el-radio-group @change="change(group,item)"  @input="onInput(group,item)" v-model="item.value">
                <el-radio v-for="option in item.options" :key="option.code" :label="option.code" :disabled="item.disabled">{{option.name}}
                </el-radio>
            </el-radio-group>
        </template>
        <template v-if="item.type=='dataPicker'">
            <el-date-picker v-model="item.value" @change="dateRangeChange(group,item)" type="daterange"
                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd 00:00:00"
                unlink-panels :picker-options="item.pickerOptions">
            </el-date-picker>
        </template>

        <template v-if="item.type=='s_dataPicker'">
            <el-date-picker v-model="item.value" @input="onInput(group,item)" :class="itemIndex" type="date"
                :placeholder="item.placeholder" value-format="yyyy-MM-dd 00:00:00" :picker-options="item.pickerOptions">
            </el-date-picker>
        </template>
        <template v-if="item.type=='s_dataPickerMonth'">
            <el-date-picker v-model="item.value" @input="onInput(group,item)" :class="itemIndex" type="month"
                :placeholder="item.placeholder" value-format="yyyy-MM" :picker-options="item.pickerOptions">
            </el-date-picker>
        </template>

        <template v-if="item.type=='moneyInput'">
            <div>
                <money-input v-model="item.value" 
                :item="item" 
                :group="group" 
                :item-index="itemIndex" 
                @on-input="onInput(group,item)" 
                @on-change="change(group,item)">
                </money-input>
            </div>

        </template>

        <template v-if="item.type=='input'">
            <div style="height: 40px;">
                <el-input v-model.trim="item.value" @input="onInput(group,item)" :class="itemIndex"
                    @change="change(group,item)" :placeholder="item.placeholder" :disabled="item.disabled"> 
                    <template v-if="item.after" slot="append">{{item.after}}</template>
                    <template v-if="item.before" slot="prepend">{{item.before}}</template>
                </el-input>
                <el-tooltip :disabled="!item.tooltipMessage" placement="top">
                    <div slot="content" class="selectToolTip" width="152px" v-html="item.tooltipMessage"></div>
                    <div v-if="item.tooltipMessage">{{item.tooltipQuaere}}
                        <i class="el-icon-question"></i>
                    </div>
                </el-tooltip>
            </div>

        </template>
        <template v-if="item.type=='labels'">
            <span style="margin-right: 10px;" :key="text" v-for="text in item.value">{{text}}</span>
        </template>
        <template v-if="item.type=='asynSelect'">
            <asyn-select v-model="item.value" @input="onInput(group,item)" :init-options="item.options"
                :value="item.value" :provider="item.provider" :placeholder="item.placeholder"></asyn-select>
        </template>
        <template v-if="item.type=='cusSearch'">
            <search-select v-model="item.value" :value="item.value" :complete="item.complete"
                :type="item.getChannelType(group,item)"></search-select>
        </template>
        <template v-if="item.type=='peopleSearch'">
            <people-select v-model="item.value" :value="item.value" :placeholder="item.placeholder"
                :multiple="item.multiple?item.multiple===true:false" :data="item" :type="item.peopleType"></people-select>
        </template>
        <template v-if="item.type=='paperSearch'">
            <paper-search v-model="item.value" :value="item.value" :placeholder="item.placeholder"
                :custType="item.custType" :companyId="item.companyId" :defaultCode="item.defaultCode"></paper-search>
        </template>
        <template v-if="item.type=='elAlert'">
            <el-alert :title="item.value" :closable="false" type="info">
            </el-alert>
        </template>
        <template v-if="item.type=='newline'">
            <div class="newline"></div>
        </template>
        <template v-if="item.type=='prefixTag'">
            <div class="prefixTag">
                <el-tag size="mini">{{item.label}}</el-tag>
                <span>{{item.value}}</span>
            </div>
        </template>
        <template v-if="item.type=='industrySelect'">
            <industry-select v-model="item.value"></industry-select>
        </template>
        <template v-if="item.type=='pagination'">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="item.page" :page-sizes="item.pageSizes?item.pageSizes:[10, 20, 30, 40]"
                :page-size="item.pageSize" :layout="item.layout?item.layout:'total, sizes, prev, pager, next'"
                :total="item.total">
            </el-pagination>
        </template>
    </el-form-item>
</el-col>
</template>
<script>
// import { clearObjValue, } from '@/common'
// import supplierListTab from './supplierTabList'
import { panel } from "@/components/panel/index";
import { formRow } from "./formRow";
import { mapState } from "vuex";
export default {
  name: "",
  props: ["item", "group", "groupIndex", "itemIndex"],
  components: { panel, formRow },
  watch: {},
  data() {
    return {};
  },
  methods: {
    getItem(item) {
      let obj = _.clone(item);
      obj.$_show && delete obj.$_show;
      return obj;
    },
    changeContract() {},

    btnClick(group, item, value) {
      this.$emit("on-btn-click", group, item, value);
      if (item.click) {
        item.click(group, item, value);
      }
    },

    tagClick(group, item, value) {
      this.$emit("btn-click", group, item, value);
    },
    change(group, item) {
      if (item.valueChange) {
        item.valueChange(group, item);
      }
      this.$emit("on-change", group, item);
    },
    imgChange(fileList, item) {
      item.value = fileList;
    },
    onInput(group, item) {
      let traget = {
        group: group,
        item: item,
        itemIndex: this.itemIndex,
        groupIndex: this.groupIndex
      };
      this.$emit("on-input", traget);
    },
    dateRangeChange: function(group, item) {
      group.items[item.startValue] = {
        value: item.value ? item.value[0] : ""
      };
      group.items[item.endValue] = {
        value: item.value ? item.value[1] : ""
      };
    },
    handleSizeChange(val) {
      this.item.pageSize = val;
      this.item.change(this.item);
    },
    handleCurrentChange(val) {
      this.item.page = val;
      this.item.change(this.item);
    }
  },
  computed: {
    getheaders() {
      return {
        headers: {
          Authorization: "Bearer " + localStorage.Authorization
        }
      };
    },
    getProp() {
      let propName = this.item.prop
        ? this.item.prop
        : this.groupIndex + ".items." + this.itemIndex + ".value";

      //console.info(propName);
      return propName;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
