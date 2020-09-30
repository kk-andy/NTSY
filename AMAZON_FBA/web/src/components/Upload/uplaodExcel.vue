<template>
    <el-upload
      :data="data"
      :multiple="false"
      :show-file-list="false"
      :on-success="handleImageSuccess"
      :on-error="handleError"
      :before-upload="beforeUpload"
      accept=".xlsx, .xls"
      :action="uploaddUrl"
    >
     <el-button class="btn_button_primary" type="primary" style="margin-left: 15px">导入</el-button> 
    </el-upload>
</template>

<script>
import { message, loading, loadingClose } from '@/utils/common'
export default {
  name: "UploadExcel",
  props: {
    value: {
      type: String,
      default: ""
    },
    data: {
        type: Object,
        default: () => {}
    },
    uploaddUrl: {
      type: String,
      required: true
    },
    transfer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tempUrl: "",
      dataObj: { token: "", key: "" }
    };
  },
  computed: {
    imageUrl() {
      return this.value;
    }
  },
  methods: {
    /* 上传之前 */
    beforeUpload(file) {
      if (this.transfer) {
        if (!this.data.distWhouseId || !this.data.sourceWhouseId) {
          console.log('jinlaile', 111111111111)
          message('warning', '请先选择仓库')
          return false
        }
        if (this.data.distWhouseId === this.data.sourceWhouseId) {
            message('warning', '调入仓和调出仓两个仓库不能相同')
            return false
        }
      } else {
        if (JSON.stringify(this.data) !== undefined) {
          if (!this.data.whouseId && !this.data.warehouseId) {
            console.log('jinlaile', 222222222222)
            message('warning', '请先选择仓库')
            return false
          }
        } 
      }
      let type_arr = ["xls", "xlsx"];     
      let extension = file.name.substring(file.name.lastIndexOf('.') + 1);/* 获取文件名后缀 */
      if (!type_arr.includes(extension)) {
        message('warning', '上传文件格式错误')
        return
      }
      loading()
    },
    /* 上传失败 */
    handleError(err, file, fileList) {
      message('error', err.msg)
      loadingClose()
    },
    /* 上传成功 */
    handleImageSuccess(response, file, fileList) {
      loadingClose()
      if (response.code ===0) {
        message('success', '导入成功')
        this.$emit("handleImageSuccess", response);
      } else {
        message('error', response.msg)
      } 
    },
  }
};
</script>
