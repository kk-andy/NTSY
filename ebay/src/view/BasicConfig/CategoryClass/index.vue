<template>
  <div class="listing-list margin10">
    <el-card>
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="6" >
                <div class="grid-content bg-purple">
                <span>平台分类:</span>
                <el-input v-model.trim="search.platform_catalog" placeholder="请输入(模糊搜索)" />
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                <span>公司分类:</span>
                <el-input v-model.trim="search.company_catalog" placeholder="请输入(模糊搜索)" />
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                <span>平台分类ID:</span>
                <el-input v-model.trim="search.platform_catalog_ID" placeholder="多个Id请用英文逗号隔开" />
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                <span>公司分类ID:</span>
                <el-input v-model.trim="search.company_catalogID" placeholder="多个Id请用英文逗号隔开" />
                </div>
            </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="6">
                <div class="grid-content bg-purple">
                <span>创建时间:</span>
                <el-date-picker
                    v-model="search.create_time"
                    style="width: 224px"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                />
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                <span>创建人:</span>
                <el-select v-model="search.creator" filterable  placeholder="请选择">
                <el-option
                    v-for="item in creatorList"
                    :key="item.staff_id"
                    :label="item.staff_name"
                    :value="item.staff_id"
                    ></el-option>
                </el-select>
                </div>
            </el-col>
            <el-col :span="6">
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                <span></span>
                <el-button type="primary"  @click="search_filter">搜索</el-button>
                <el-button type="primary" @click="reset">重置</el-button>
                </div>
            </el-col>
        </el-row>
    </el-card>
    <div class="button-add">
        <el-button type="primary" @click="addAapping" v-if="btnClass.new">新增映射</el-button>
    </div>
    <table-list 
    :tableData="tableData"
    @delete_table="delete_table"
    :showDel="btnClass.del"
     />
     <div class="change_page">
     <page-total :total="total" :size="page.size" :current-page="page.currentPage" />
      <el-pagination
        :current-page="page.currentPage"
        background
        :page-sizes="[10, 20, 30, 50]"
        :page-size="page.size"
        layout="sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog
      title="新增映射"
      :visible.sync="modal_product"
      width="70%"
      :close-on-click-modal="false"
      :before-close="cancel_binding"
      >
        <div class="company_class" :class="{'maxlengthclass': categoryList.length > 5}">
            <div v-for="(item, index) in categoryList" :key="index">
                <span>公司分类{{index + 1}}：</span>
                <el-select v-model="item.prodductClassId" filterable placeholder="" clearable>
                <el-option
                    v-for="el in item.companyClassList"
                    :key="el.id"
                    :label="el.category_name"
                    :value="el.id"
                ></el-option>
                </el-select>
                <el-input
                    v-model="item.productId"
                    maxlength="15"
                    placeholder="请输入公司分类ID"
                    oninput="value=value.replace(/[^\d]/g,'')"
                ></el-input>
                <el-button type="primary" @click="confirm_search_category(item)">确定</el-button>
                <i class="el-icon-circle-plus-outline" v-if="index === 0" @click="add_category" :class="{'maxlength': categoryList.length === 10}"></i>
                <i class="el-icon-remove-outline" v-if="index !== 0" @click="delete_categoty(index)"></i>
            </div>
        </div>
        <div class="company_class platform_class">
            <div>
                <span>平台分类：</span>
                <el-select v-model="platform_catalog"  placeholder="">
                <el-option
                    v-for="item in product1List"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                ></el-option>
                </el-select>
                <el-input
                    v-model.number="platform_productId"
                    maxlength="15"
                    placeholder="请输入平台分类ID"
                    oninput="value=value.replace(/[^\d]/g,'')"
                ></el-input>
                <el-button type="primary" @click="confirm_search_platform_catalog">确定</el-button>
            </div>
        </div>
        <div class="confirm_select">
            <div class="product_name">
                <span v-for="(item, index) in saveProductNameList[platform_catalog]" :key="index">
                  {{item}}
                  <i class="el-icon-arrow-right" v-if="index !== saveProductNameList[platform_catalog].length -1"></i>
                  </span>
            </div>
            <div>
                <el-button type="primary" @click="submit_product">确定</el-button>
                <!-- <el-button @click="cancel_product">取消</el-button> -->
            </div>
        </div>
        <category-class :saveProductName="saveProductName" :categoryLevelList="categoryLevelList" :savedActiveIndex="savedActiveIndex" @showChildren="showChildren"/>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submit_binding">绑定</el-button>
            <el-button @click="cancel_binding">取消</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import TableList from './components/table'
import CategoryClass from './components/categoryClass'
import { getPeoduct1 } from '@/api/listing'
import { getEbayCate, createMap, deleteContent, getProductCate } from '@/api/categoryClass'
import PageTotal from '@/components/pageTotal'
import { mapActions, mapState } from 'vuex'
import { dateFormatT, clearObjValue } from '@/utils/common'
export default {
    name: "CategorySetting",
    data() {
        return {
            search: {
                platform_catalog: '',
                company_catalog: '',
                platform_catalog_ID: '',
                company_catalogID: '',
                create_time: '',
                creator: ''
            },
            cat1: [],
            cat2: [],
            modal_product: false,
            saveProductName: [],
            categoryLevelList: [
            ],
            savedActiveIndex: [],
            prodductClass: '',
            productId: '',
            product1List: [],
            platform_catalog: '',
            platform_productId: '',
            categoryList: [
                {
                    prodductClassId: '',
                    productId: '',
                    companyClassList: []
                },
                {
                    prodductClassId: '',
                    productId: '',
                    companyClassList: []
                },
                {
                    prodductClassId: '',
                    productId: '',
                    companyClassList: []
                },
            ],
            btnClass: {
                new: false,
                del: false
            },
            NextChild: '',
            levelIndex: '',
            savedParentId: [''],
            saveProductIdList: {},
            saveProductNameList: {},
            parentId: 0,
            page: {
                currentPage: 1,
                size: 10
            }
        };
    },
    computed: {
        ...mapState({
            cate_list: state => state.categoryClass.cate_list,
            total: state => state.categoryClass.total,
            tableData: state => state.categoryClass.tableData,
            creatorList: state => state.categoryClass.creatorList
        })
    },
    components: {
        TableList,
        CategoryClass,
        PageTotal
    },
    created() {
        
    },
    methods: {
        /* 获取列表数据 */
        getData() {
            let query = {
                ebay_cate: this.search.platform_catalog,
                product_cate: this.search.company_catalog,
                ebay_cate_id: this.search.platform_catalog_ID ? this.search.platform_catalog_ID.replace(/，/ig, ',') : '',
                product_cate_id: this.search.company_catalogID ? this.search.company_catalogID.replace(/，/ig, ',') : '',
                creat_id: this.search.creator,
                created_at_start: '',
                created_at_end: '',
                per_page_num: this.page.size,
                page: this.page.currentPage
            }          
            if (this.search.create_time) {
                let time = dateFormatT(this.search.create_time).split('~')
                query.created_at_start = time[0]
                query.created_at_end = time[1]
            }
            this.$store.dispatch('categoryClass/getList', query)
        },
        /* 新增映射弹框 */
        addAapping() {
            this.categoryList = this.addThreeAapping(this.categoryList)
            this.categoryList.forEach(item => {
                item.companyClassList = this.cate_list
            })
            this.modal_product = true
        },
        addThreeAapping(list) {
            let obj = {
                prodductClassId: '',
                productId: '',
                companyClassList: []
            }
            if (list.length === 3) {
                return list
            }
            if (list.length === 1) {
                list.push(obj, obj)
                return list
            } 
            if (list.length === 2) {
                list.push(obj)
                return list
            }
        },
        /* 确定搜索分类 */
        confirm_search_category(item) {
            if (!item.productId) {
                this.$message({
                    type: 'warning',
                    message: `请输入公司分类ID`
                })
                return false
            }
            let query = { product_cate_id: item.productId}
            getProductCate(query).then(res => {
                if (res.data.length) {
                    item.prodductClassId = Number(item.productId)
                } else {
                    this.$message({
                        type: 'warning',
                        message: `公司分类ID不存在`
                    })
                }
            })
           
        },
        /* 添加映射 */
        add_category() {
            if (this.categoryList.length === 10) {
                return false
            }
            let obj = {
                    prodductClassId: '',
                    productId: '',
                    companyClassList: this.cate_list
                }
            this.categoryList.push(obj)
        },
        /* 删除映射 */
        delete_categoty(index) {
            this.categoryList.splice(index, 1)
        },
        /* 搜索平台分类 */
        confirm_search_platform_catalog() {
            if (!this.platform_productId) {
                this.$message({
                    type: 'warning',
                    message: `请输入平台分类ID`
                })
                return false
            }
            if (this.product1List.filter(item => item.id == this.platform_productId).length) {
                this.$message({
                    type: 'warning',
                    message: `已有重复类目`
                })
                return false
            }
            getEbayCate({ ebay_cate_id: this.platform_productId }).then(res => {
                if (JSON.stringify(res.data) !== '{}') {
                    let data = res.data
                    this.platform_catalog = data.category_id
                    let product1Ids = ['']
                    product1Ids.push(...data.category_ids)
                    this.saveProductIdList[data.category_id] = JSON.parse(JSON.stringify(product1Ids))
                    this.saveProductNameList[data.category_id] = JSON.parse(JSON.stringify(data.category_path))
                    this.product1List.push({ id: data.category_id, label: data.category_name})
                }
                else {
                    this.$message({
                        type: 'warning',
                        message: `未找到类目`
                    })
                }
            })
        },
        /* 获取产品分类和店铺的列表 */
        getProductList(args) {
            let query = {
            site_id: 0,
            pid: 0
            }
            getPeoduct1(query).then(res => {
            if (args) {
                this.categoryLevelList.splice(0, 1, res.data);
            } else {
                this.categoryLevelList.push(res.data);
            }
            })
            this.$store.dispatch('listing/getPeoduct1', query)
        },
        showChildren (item, index, activeIndex) {
            this.NextChild = item
            this.levelIndex = index;
            this.savedParentId[index + 1] = item.category_id;
            this.savedActiveIndex[index] = activeIndex;
            this.saveProductName[index] = item.category_name
            this.saveProductName.splice(index + 1)
            this.savedActiveIndex.splice(index + 1);
            if (index === 0) {
                this.parentId = 0;
            } else {
                this.parentId = item.category_id;
            }
            if (!item.has_son) {
                this.categoryLevelList.splice(index + 1);
                return false;
            }
            this.updateList(item.category_id, index);
        },
        updateList(id, index) {
            if (!id) {
                this.getdata(true);
                return false;
            }
            let query = {
                site_id: 0,
                pid: id
            }       
            getPeoduct1(query).then(res => {
                this.categoryLevelList.splice(index + 1);
                let tempArr = [...this.categoryLevelList];
                tempArr[index + 1] = res.data;
                this.$nextTick(() => {
                    this.categoryLevelList = tempArr;
                });
            })
        },
        submit_product() {
            if (this.NextChild) {
                if (this.NextChild.has_son) {
                    this.$message({
                        type: 'warning',
                        message: `错误：您选择的类目 “${this.NextChild.category_name}” 还有子类目,请选择子类目！`
                    })
                    return false
                }
            }      
            if (this.product1List.filter(item => item.id === this.NextChild.category_id).length) {
                this.$message({
                    type: 'warning',
                    message: `已有重复类目`
                })
                return false
            }
            this.saveProductNameList[this.NextChild.category_id] = JSON.parse(JSON.stringify(this.saveProductName))
            this.saveProductIdList[this.NextChild.category_id] = JSON.parse(JSON.stringify(this.savedParentId))
            this.product1List.push({ id: this.NextChild.category_id, label: this.NextChild.category_name, id_list: this.savedParentId})
            this.platform_catalog = this.NextChild.category_id
            console.log(this.saveProductIdList)
        },
        handleSizeChange(size) {
            this.page.currentPage = 1
            this.page.size = size
            this.getData()
        },
        handleCurrentChange(nowPage) {
            this.page.currentPage = nowPage
            this.getData()
        },
        search_filter() {
            this.page.currentPage = 1
            this.getData()
        },
        reset() {
            clearObjValue(this.search)
        },
        cancel_product() {

        },
        /* 确定绑定 */
        submit_binding() {
            if (!this.platform_catalog) {
                this.$message({
                    type: 'warning',
                    message: `请选择平台分类`
                })
                return false
            }
            let ebay_cate_name = this.product1List.filter(item => item.id == this.platform_catalog)[0].label
            let product_cate = []
            this.categoryList.forEach(item => {
                let obj = {}
                if (item.prodductClassId) {
                    if (item.companyClassList.filter(ele => ele.id == item.prodductClassId).length) {
                        let dataObj =  item.companyClassList.filter(ele => ele.id === item.prodductClassId)[0]
                        let name = dataObj.category_name
                        obj[item.prodductClassId] = name
                        product_cate.push(obj)
                    }
                }
            })
            if (!product_cate.length) {
                this.$message({
                    type: 'warning',
                    message: `请至少选择一个公司分类`
                })
                return false
            }
            console.log(product_cate)
            // return false
            let data = {
                ebay_cate_id: this.platform_catalog,
                ebay_cate_name,
                product_cate,
                category_ids: this.deleteFiratItem(this.saveProductIdList, this.platform_catalog),
                category_path: this.saveProductNameList[this.platform_catalog].join('_')
            }
            createMap(data).then(res => {
                this.getData()
                this.cancel_binding()
            })
            // this.modal_product = false
        },
        deleteFiratItem(arr, id) {
            let newArr = arr[id].slice(0);
            newArr.splice(0, 1);
            return newArr.join('_')
        },
        /* 取消绑定 */
        cancel_binding() {
            this.modal_product = false
            this.platform_catalog = ''
            this.savedActiveIndex = []
            this.saveProductName = []
            this.product1List = []
            this.platform_productId = ''
            this.categoryLevelList.splice(1, this.categoryLevelList.length)
            this.categoryList.forEach(item => {
                item.prodductClassId = ''
                item.productId = ''
            })
            if (this.categoryList.length > 3) {
                this.categoryList.splice(3, this.categoryList.length)
            }        
            this.savedParentId = ['']
        },
        /* 删除 */
        delete_table(id) {
            this.$confirm('你确定要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    deleteContent({ id }).then(res => {
                        this.getData()
                    })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
            });          
            });
        },
        getControlBtn(id) {
        let params = {
            id
        };
        this.$authHttp
            .get("/rest/auth/user/perms/buttons", { params })
            .then(res => {
            res.data.buttonList.forEach(btn => {
                this.btnClass[btn.key] = true;
            });
            });
        }
        // ...mapActions(['categoryClass/getCateList'])
    },
    created() {
        let id = this.$getMenuId(sessionStorage.getItem('munuIdList'), this.$route.path)
        this.getProductList()
        this.getData()
        this.getControlBtn(id)
        this.$store.dispatch('categoryClass/getCateList')
        this.$store.dispatch('categoryClass/getCteatorList')
    }  
}
</script>
<style lang="scss" >
.listing-list {
    .button-add {
        margin: 20px 0;
    }
    .change_page{
        margin: 15px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        & > span {
            color: #ccc;
        }
    }
}
.el-dialog__header{
  border-bottom: 1px solid #e5e5e5;
  padding: 18px;
  background: #eee;
  & > span {
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }
}
.company_class{
    width: 100%;
    & > div {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        & > span {
            min-width: 100px;
            display: inline-block;
        }
        .el-select {
            width: 230px;
            margin-right: 20px;
            .el-input{
                width: 230px
            }
        }
        .el-input {
            width: 200px;
            margin-right: 20px;
        }
        button {
            margin-right: 20px;
        }
        .el-icon-circle-plus-outline, .el-icon-remove-outline{
            font-weight: bold;
            font-size: 25px;
            cursor: pointer;
        }
        .maxlength{
            cursor: not-allowed;
        }
    }
}
.platform_class{
    margin-top: 30px;
    border-top: 1px solid #ccc;
    padding-top: 5px;
}
.maxlengthclass{
    height: 200px;
    overflow-y: scroll;
}
.el-dialog__footer{
    text-align: center;
    .dialog-footer {
        & > button {
        margin-right: 30px;
        }
    }
}
.confirm_select{
    display: flex;
    justify-content: space-between;
}
.product_name{
        span {
          font-size: 13px;
          color: #933;
          font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
        }
        .el-icon-arrow-right{
          font-size: 13px;
        }
      }
</style>