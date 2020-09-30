<template>
    <div>
        <div class="product_name" v-if="saveProductName.length">
            <span v-for="(item, index) in saveProductName" :key="index">
            {{item}}
            <i class="el-icon-arrow-right" v-if="index !== saveProductName.length -1"></i>
            </span>
        </div>
        <div class="modal_content_product">
            <div class="categoryChooseOutDiv">
                <div class="categoryChooseMiddleDiv" :class="{'overflowx-sxroll': categoryLevelList.length > 3}">
                    <div class="pull-left categoryChooseInDiv" v-for="(item, levelIndex) in categoryLevelList" :key="levelIndex">
                    <div class="categoryList">
                        <div class="categoryDiv" v-for="(ele, i) in item" :key="i" @click="showChildren(ele,levelIndex,i)" :class="savedActiveIndex[levelIndex] === i ? 'active' : ''">
                            <span class="categoryNames">{{ele.category_name}}</span>
                            <i class="el-icon-arrow-right" v-if="ele.has_son"></i>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'CategoryClass',
    props: {
        saveProductName: {
            type: Array,
            default: function() {
                return []
            }
        },
        categoryLevelList: {
            type: Array,
            default: function() {
                return []
            }
        },
        savedActiveIndex: {
            type: Array,
            default: function() {
                return []
            }
        }
    },
    methods: {
        showChildren(ele,levelIndex,i) {
            this.$emit('showChildren', ele, levelIndex, i)
        },
    }
}
</script>
<style scoped lang="scss">
.categoryChooseOutDiv{
    width: 100%;
    height: 330px;
    overflow: hidden;
    overflow-x: auto;
    font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    .categoryChooseMiddleDiv{
      width: auto;
      display: flex;
      // flex-wrap: wrap;
      .categoryChooseInDiv{
        margin-right: 14px;
        border: 1px solid #ddd;
        height: 308px;
        overflow-y: auto;
        border-radius: 4px;
        width: 245px;
        .categoryList{
          .categoryDiv{
            width: 100%;
            cursor: pointer;
            height: 24px;
            line-height: 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #434649;
            margin-bottom: 3px;
            .categoryNames{
              display: inline-block;
              width: 200px;
              overflow: hidden;
              padding-left: 10px;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .el-icon-arrow-right{
              font-weight: bold;
            }
          }
          .active{
            background-color: rgba(254,219,207,0.5);
            color: #333;
          }
          .categoryDiv:hover{
           background-color: rgba(254,219,207,0.3);
          }
        }
      }
    }
    .overflowx-sxroll{
      overflow-x: scroll;
      // width: ;
    }
}
.product_name{
      height: 40px;
      line-height: 40px;
      font-size: 16px;
        span {
          font-size: 13px;
          color: #933;
          font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
        }
      .el-icon-arrow-right{
        font-size: 16px;
      }
}
</style>