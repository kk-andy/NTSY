<template>
    <div>
      <div class="search-input" v-if="showSearchInput">
        <div>
          <el-input clearable style="width:70%" placeholder="搜索分类名称" v-model="searchWord"></el-input>
          <el-button class="btn_button_primary" @click="doSearch">搜索</el-button>
        </div>
        <div>
          <ul :class="{'overflow-scroll-y': list.length >= 10 }">
            <li v-for="(item, index) in list" :key="index" @click="selectLi(item)">
              <span v-for="(ele, i) in item.category_path" :key="i">
                {{ ele }}
                <i class="el-icon-arrow-right" v-if="i !== item.category_path.length -1"></i>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div v-show="list.length === 0">
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
    </div>
</template>
<script>
import { message, loading, loadingClose } from '@/utils/common'

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
        },
        list: {
          type: Array,
          default: function() {
                return []
            }
        },
        showSearchInput: {
          type: Boolean,
          default: false
        }
    },
    data() {
      return {
        searchWord: '',
      }
    },
    methods: {
        showChildren(ele,levelIndex,i) {
            this.$emit('showChildren', ele, levelIndex, i)
        },
        selectLi(item) {
          // this.list = []
          this.$emit('selectLi', item)
        },
        /* 搜索 */
        doSearch() {
            if (!this.searchWord) {
              message('warning', '请输入需要搜索的分类关键词')
              return
            }
            let params = {
              category_name: this.searchWord
            }
            this.$emit('doSearch', params)
        }
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
.search-input {
  & > div:nth-child(1) {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    button {
      margin-left: 20px;
    }
  }
  & > div:nth-child(2) {
    ul {
      list-style: none;
      li {
        line-height: 36px;
        cursor: pointer;
      }
      li:hover {
        background-color: rgba(254,219,207,0.3);
      }
      li:active{
        background-color: rgba(254,219,207,0.3);
      }
    }
    .overflow-scroll-y {
      height: 300px;
      overflow-y: scroll;
    }
  }
}
</style>