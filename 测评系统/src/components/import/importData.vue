<template>
 <!--导入 -->
<el-dialog :title='title' :lock-scroll="false" v-loading="loading"  :close-on-click-modal="false" :visible.sync="visibleCopy"
  @close="cancel">
  <el-upload style="text-align:center;min-height:320px;padding-top:50px;" drag  :action="action"
 :headers="headers" :on-success="uploadSuccess" v-show="isShow" :file-list="fileList" ref="upload" :before-upload="beforeUpload">
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或
      <em> 点击上传</em>
    </div>
    <div class="el-upload__tip" slot="tip">
      注：只支持一次性导入核销！
<a :href="uploadApi" :download="downloadText">下载模板</a>
    </div>
  </el-upload>
  <div style="margin-bottom:10px;" v-show="show">
    <div class="sign2">--数据重复</span></div>
    <div class="sign3">--数据有问题</div>
    <div style="color:red;" v-if="tips">提示：{{tips}}</div>
  </div>
  <el-table :data="gridData" border highlight-current-row v-show="show" style="margin-bottom:20px;" :row-class-name="tableRowClassName">
      <el-table-column prop="cidAccount" label="CID" width="180"></el-table-column>
      <el-table-column prop="businessLineName" label="业务线" min-width="150">
      </el-table-column>
      <el-table-column  prop="currencyName" label="人民币" width="100">
      </el-table-column>
      <el-table-column  prop="mccAccount" label="MCC" width="150">
      </el-table-column>
      <el-table-column prop="moneyShow" label="moneyTitle" width="180">
      </el-table-column>
      <el-table-column prop="propsTitle" label="timeTitle" width="200">
      </el-table-column>
    </el-table>
  <div slot="footer" class="dialog-footer" v-if="show">
    <el-button plain v-if="!disabled" type="primary">
      <el-upload class="newBtn"  :action="action" :headers="headers" :on-success="uploadSuccess"
        :show-file-list="false">
        重新上传
      </el-upload>
    </el-button>
    <el-button type="primary" plain v-if="disabled" @click="submit">确定</el-button>
    <el-button type="info" plain  @click="cancel">取消</el-button>
  </div>
</el-dialog>
</template>

<script>
var token = ''
export default {
    name: '',
   props: ['title', 'visible', 'action', 'uploadApi', 'downloadText', 'submitApi','careTips'],
    data() {
        return {
           visibleCopy: false,
             headers: {
               'Authorization': token
             },
             isShow: true, //显示上传
             show: false,
             fileList: [], //清空上传列表
             gridData: [],
             disabled:false,
             tips:"",
             moneyTitle:'',
             timeTitle:'',
             moneyShowmccisShow:false,
             moneyShow:true,
             propsTitle:'operateDate',
             loading:false,
        }
    },
    watch:{
        visible: function (val) {
            this.visibleCopy = val
          },
    },
    mounted() {
      
    },
    methods: {
        beforeUpload(file) {
          this.loading=true
        },
         uploadSuccess(response) {
             debugger
           if (response.code !== 0) {
             this.fileList = [];
             this.$message.error(response.msg)
             this.loading = false
           } else {
            if (response.data && response.data.length>0) {
              this.show = true;
              this.isShow = false
              this.gridData = response.data;
              this.loading = false
              this.disabled = response.status
              this.tips = response.result
              this.$emit("update",2)
            }else if(response.code == 0){
              this.loading = false
              this.$emit("update")
              this.$message.success('导入成功')
            } else{
               this.loading = false
            }
      
        
        
             this.$refs.upload.clearFiles();
           }
         },
          //取消导入
          cancel() {
            this.$refs.upload.clearFiles();
            this.$emit("cancel-export-data")
            this.isShow = true;
            this.show = false;
            this.fileList = [];
            this.gridData = [];
          },
          tableRowClassName(row, index) {
            if (row.row.sign==2) {//数据有问�
              return 'info-row';
            } else if (row.row.sign==3) {//数据重复
              return 'info-row2';
            }

          },
          submit(){
           this.$ework.post(this.submitApi, {
               importDtos: this.gridData
             }).then(res => {
             if (res.status != 200) {
              this.$message.error(res.data.msg)
             }else{
               this.$message.success(res.data.msg)
               this.cancel()
               this.$emit("update")
             }
           })
          }
        },
}
</script>

<style scoped>

</style>
