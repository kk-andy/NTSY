<template>
  <div class="chart-container">
    <!-- <chart height="100%" width="100%" /> -->
    <butterfly-component />
  </div>
</template>

<script>
import Chart from '@/components/Charts/LineMarker'
import ButterflyComponent from './components/butterflyComponent'
import { getToken } from '@/utils/auth'
import { Upload } from 'view-design'
// import { getInfo } from '@/api/devoptions'
export default {
  name: 'LineChart',
  components: { Chart, Upload, ButterflyComponent },
  data() {
      return {
          uploadList: {
            '4yang' : [
              
            ],   
            'SEAAN' : [
             
            ],  
            'TTLIFE' : [
              
            ],  
            'vogvigo' : [
              
            ],    
          },
          uploadImage: `${process.env.VUE_APP_BASE_API}/api/v1/uploads/imageUploads`,
          headers: {
                'Authorization': getToken()
          },
          
      }
  },
  methods: {
      beforeUolaod() {

      },
      handleSuccess(response, file, fileList, key) {
        this.uploadList[key].push({url: response.data.url, name: response.data.name})
        console.log(this.uploadList)
      },
      handleFormatError() {

      },
      handleError() {

      },
      handleExceed() {

      },
      handleClose(key, index) {
        this.uploadList[key].splice(index, 1)
      }
  },
  created() {

  },
}
</script>

<style lang="scss" scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 164px);
  .upload_content{
      width: 100%;
      min-height: 150px;
      border: 1px solid #cccccc;
      justify-content: space-around;
      border-radius: 8px;
      display: flex;
      align-items: center;
      padding: 20px;
      & > div {
        text-align: center;
        .el-upload__tip{
          margin-top: 15px;
          min-width: 120px;
          .el-tag{
            display: block;
            margin-bottom: 5px;
            height: 26px;
            line-height: 26px;
          }
            p {
              margin-bottom: 5px;
            }
        }
        .overflowscroll{
          height: 150px;
          overflow-y: scroll;
        }
      }
  }
}
</style>

