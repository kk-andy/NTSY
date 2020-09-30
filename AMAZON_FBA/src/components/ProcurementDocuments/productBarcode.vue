<template>
    <el-dialog title="产品标签" :visible.sync="dialogTableVisible" class="dialog-barcode" width="500px" :before-close="() => confirm(false)">
        <div :class="{'overflow-scroll': detailItems.length > 1}">
            <div id="ProductDocuments">  
                <ul>
                    <li v-for="item in detailItems" :key="item.sku">
                        <div>
                            <barcode :value="item.sku" :options="options" tag="img"/> 
                            <span>{{ item.skuName }}</span>  
                        </div> 
                    </li>
                    <!-- <li v-for="item in detailItems" :key="item.sku">
                        <div>
                            <barcode :value="item.sku" :options="options" tag="img"/> 
                            <span>{{ item.skuName }}</span>  
                        </div> 
                    </li>
                    <li v-for="item in detailItems" :key="item.sku">
                        <div>
                            <barcode :value="item.sku" :options="options" tag="img"/> 
                            <span>{{ item.skuName }}</span>  
                        </div> 
                    </li>
                    <li v-for="item in detailItems" :key="item.sku">
                        <div>
                            <barcode :value="item.sku" :options="options" tag="img"/> 
                            <span>{{ item.skuName }}</span>  
                        </div> 
                    </li> -->
                    <!-- <li v-for="item in detailItems" :key="item.sku">
                        <div>
                            <barcode :value="item.sku" :options="options" tag="img"/> 
                            <span>{{ item.skuName }}</span>  
                        </div> 
                    </li>
                    <li>
                        <div>
                            <barcode value="WJSXY0020O00" :options="options" tag="img"/> 
                            <span>WJSXY0020CO00</span>  
                        </div> 
                    </li> -->
                    <!-- <li v-for="item in detailItems" :key="item.sku">
                        <div>
                            <barcode :value="item.sku" :options="options" tag="img"/> 
                            <span>{{ item.skuName }}</span>  
                        </div> 
                    </li> -->
                </ul>     
        </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" class="btn_button_primary" v-print="printObj" @click="confirm(true)">确定</el-button>
            <el-button type="primary" class="btn_button_primary" @click="confirm(false)">取消</el-button>
        </span>
    </el-dialog>
</template>
<script>
import VueBarcode from 'vue-barcode';
export default {
    components: {
        'barcode': VueBarcode,
    },
    props: {
        showProductModule: {
            type: Boolean,
            default: false
        },
        detailItems: {
            type: Array,
            default:() => []
        }
    },
    data() {
        return {
            dialogTableVisible: this.showProductModule,
            printObj: {
              id: "ProductDocuments",
              popTitle: '产品标签',
              extraCss: 'www.nantang.erp.com',
              extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
            },
            options: {
                format: 'barcode-format',
                height: 48,
                width: 2,
                textMargin: 25,
                textAlign: "left"
            },
        }
    },
    methods: {
        confirm(flag) {
            if (!flag) {
                this.dialogTableVisible = false
                this.$emit('handleChangeModule', flag)
            }
        }
    },
    mounted() {
    }
}
</script>
<style  lang="scss">
#ProductDocuments{
    width: 360px;
    padding: 0;
    margin: 0;
    ul {
        list-style: none;
        padding-left: 0px;
        padding: 0;
        margin: 0;
        li {
            // padding-bottom: 5px;
            padding: 0;
            margin: 0;
            min-height: 210px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            overflow: hidden;
            font-size: 14px;
            div {
                // overflow: hidden;
                svg {
                    // height: 135px;
                    // width: 3000px;
                    // overflow: hidden;
                    rect {
                        height: 1000;
                        width: 800;
                    }
                    g {
                        rect {
                            height: 1080;
                        }
                    }
                }
                span {
                    overflow: hidden;
                }
               
            }
        }
    }
}
.overflow-scroll{
        height: 500px;
        margin: 0;
        padding: 0;
        overflow-y: scroll;
    }
</style>
<style lang="scss">
// #ProductDocuments {
//     Header {
//         & > div {
//             & > div:nth-child(2) {
//                 width: 60%;
//                 svg {
//                     height: 100px;
//                     rect {
//                         height: 100;
//                         width: 800;
//                     }
//                 }
//                 #barcode {
                    
//                     width: 100%;
//                 }
//         }   
//         }
//     }
// }
.dialog-barcode {
    .el-dialog__body {
        display: flex;
        justify-content: center;
    }
}
</style>

<style media="ProductDocuments" scoped>
   
    /*去除页眉页脚*/
  html{
    background-color: #FFFFFF;
  }
 
  body{
    /* border: solid 1px blue ; */
    /* margin: 10mm 15mm 10mm 15mm;  */
  }
  #ProductDocuments{
      /* border: 1px solid #000; */
  }

</style>