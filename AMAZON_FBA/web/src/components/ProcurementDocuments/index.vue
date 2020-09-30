<template>
    <el-dialog title="采购入库单" :visible.sync="dialogTableVisible" class="dialog-barcode" :before-close="() => confirm(false)">
        <div id="ProcurementDocuments">
            <Header>
                <h2>采购入库单</h2>
                <div>
                    <div>
                        <p>{{detail.purchaser}}</p>
                        <p>{{ detail.whouseName }}</p>
                    </div>
                    <div>
                        <barcode :value="detail.inCode" :options="options" tag="img"/>              
                    </div>
                    <div>
                        {{ date }}
                    </div>
                </div>
            </Header>
            <barcode-table :tableData="detailItems" :options="options"/>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" class="btn_button_primary" v-print="printObj" @click="confirm(true)">确定</el-button>
            <el-button type="primary" class="btn_button_primary" @click="confirm(false)">取消</el-button>
        </span>
    </el-dialog>
</template>
<script>
import VueBarcode from 'vue-barcode';
import BarcodeTable from './tableComponent'
export default {
    components: {
        'barcode': VueBarcode,
        BarcodeTable
    },
    props: {
        showModule: {
            type: Boolean,
            default: false
        },
        date: {
            type: String,
            required: true
        },
        detail: {
            type: Object,
            required: true
        },
        detailItems: {
            type: Array,
            default:() => []
        }
    },
    data() {
        return {
            dialogTableVisible: this.showModule,
            printObj: {
              id: "ProcurementDocuments",
              popTitle: '采购入库单标签',
              extraCss: 'www.nantang.erp.com',
              extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
            },
            options: {
                format: 'barcode-format',
                height: 48,
                width: '1px',
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
<style scoped lang="scss">
#ProcurementDocuments{
    width: 580px;
    border: 1px solid #000;
    Header {
        h2 {
            font-family:"Microsoft YaHei",微软雅黑,"Microsoft JhengHei",华文细黑,STHeiti,MingLiu;
            text-align: center;
            font-size: 24px;
            margin: 5px 0;
        }
        & > div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            min-height: 48px;
            padding: 0 10px;
            p{
                margin: 0;
                // line-height: 26px;
                // text-align: center;
            }
            & > div {
                width: 20%;
            }
            & > div:nth-child(2) {
                width: 60%;
                svg {
                    height: 58px;
                    rect {
                        height: 58;
                    }
                }
                #barcode {
                    
                    width: 100%;
                }
            }   
        }
        
    }
}
</style>
<style lang="scss">
#ProcurementDocuments {
    Header {
        & > div {
            & > div:nth-child(2) {
                width: 60%;
                svg {
                    height: 100px;
                    width: 356px;
                    rect {
                        height: 100;
                        width: 80;
                    }
                }
                #barcode {
                    
                    width: 100%;
                }
        }   
        }
    }
}
.dialog-barcode {
    .el-dialog__body {
        display: flex;
        justify-content: center;
    }
}
</style>

<style media="ProcurementDocuments" scoped>
   
    /*去除页眉页脚*/
  html{
    background-color: #FFFFFF;
    margin: 0;  /* this affects the margin on the html before sending to printer */
  }
 
  body{
    /* border: solid 1px blue ; */
    /* margin: 10mm 15mm 10mm 15mm;  */
  }
  #ProcurementDocuments{
      border: 1px solid #000;
  }

</style>