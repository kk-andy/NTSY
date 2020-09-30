<template>
  <el-table
    ref="multipleTable"
    :data="tableData"
    border
    tooltip-effect="dark"
    style="width: 100%"
  >
    <el-table-column label="产品子SkU" show-overflow-tooltip align="center" prop="sku"  />
    <el-table-column label="子产品名称" align="center" prop="sku_name" show-overflow-tooltip />
    <el-table-column :label="label1" v-if="iskuan1" align="center" show-overflow-tooltip prop="style_one_cn" />
    <el-table-column :label="label2" v-if="iskuan2" align="center" show-overflow-tooltip prop="style_two_cn" />
    <el-table-column label="采购价￥" align="center" prop="buy_price" />
    <el-table-column label="是否含运" align="center" prop="include_ship_cost">
      <template slot-scope="scope">
        <span>{{ scope.row.include_ship_cost ? '是' : '否' }}</span>
      </template>
    </el-table-column>
    <!-- <el-table-column label="阶梯数量1（包含）" align="center" prop="step_count_1" />
    <el-table-column label="阶梯价格1(￥)" align="center" prop="step_count_1" /> -->
    <el-table-column label="产品包装重量G" show-overflow-tooltip align="center" prop="pack_weight" />
    <el-table-column label="供应商名称" show-overflow-tooltip align="center" prop="supplier_name" />
    <el-table-column align="center" prop="supplier_link" label="采购链接" show-overflow-tooltip>
      <template slot-scope="scope">
        <el-link
          :underline="false"
          :href="scope.row.supplier_link"
          target="_blank"
        >{{scope.row.supplier_link}}</el-link>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { skulistinfo } from "@/utils/devoption";
export default {
  name: "StyleTableList",
  props: {
    // tableData: {
    //     type: Array,
    //     default: []
    // },
    fuspu: {
      type: String
    }
  },
  data() {
    return {
      tableData: [],
      iskuan1:false,
      iskuan2:false,
      label1:'',
      label2:'',
    };
  },
  watch:{
    fuspu:{
      handler(val,old){
        if (val) {
           this.role = Object.keys(this.$route.query)[0]
          if (this.role !== 'productpoolSpu' && this.$route.query.is_copy !='0') { // && this.role !== 'editProPicSku'
            this.init()
          }
        }
      },
      immediate:true
    }
  },
  methods:{
    init(){
      skulistinfo({sub_spu:this.fuspu}).then(res=>{
      this.tableData =   res.data.list
      if (res.data.style_one) {
          this.iskuan1 = true
          this.label1 = res.data.style_one
      }
      if (res.data.style_two) {
          this.iskuan2 = true
          this.label2 = res.data.style_two
      }
        console.log('父', res.data);
      })
    }
  },
  mounted(){
    this.fuspu
   this.role = Object.keys(this.$route.query)[0]; // 获取进入当前进入的模块
    this.paramsId = this.$route.query[this.role]; // 根据键值获取参数对应的值
    // if (this.role !== 'productpoolSpu') {
      
    //   this.init()
    // }
  }
  
};
</script>
