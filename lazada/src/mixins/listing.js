/* 编辑页面混入 相同的处理逻辑 相同的组件 监听 计算属性 包括data数据 */
import Tinymce from "@/components/Tinymce";
import CategoryClass from '@/views/basicConfig/components/categoryClass'
// import variantInfoTable from './components/variantInfoTable'
import variantInfoTable from '@/views/createListing/components/variantInfoTable'
// import settingSitePriceModal from './components/settingPriceModal'
import settingSitePriceModal from '@/views/createListing/components/settingPriceModal'
// import variantThumbnail from './components/variantThumbnail'
import variantThumbnail from '@/views/createListing/components/variantThumbnail'
// import variantPicture from './components/variantPicture'
import variantPicture from '@/views/createListing/components/variantPicture'
// import ProductFormList  from './components/productFormList'
import ProductFormList from '@/views/createListing/components/productFormList'
// import settingInfoModal from './components/moreInfoModal'
import settingInfoModal from '@/views/createListing/components/moreInfoModal'
// import FormList from './components/formList'
import FormList from '@/views/createListing/components/formList'
import { mapState, mapActions, mapGetters } from 'vuex'
import { getPeoduct1 } from '@/api/categoryClass'
import { message, loading, loadingClose, clearObjValue,  } from '@/utils/common'
import { getCategoryAttrList } from '@/api/listing'
import { getCategoryAttr, getSkuPrice } from '@/api/listing'
import { forEach } from "core-js/fn/array";
let priceReg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
let weightReg = /(^[1-9]\d*(\.\d{1,3})?$)|(^0(\.\d{1,3})?$)/;
export const Mixins = { /* 所有编辑包括创建共同的混入 */
    components: { 
        Tinymce, 
        variantInfoTable, 
        settingSitePriceModal, 
        variantThumbnail, 
        variantPicture,
        settingInfoModal,
        CategoryClass,
        ProductFormList,
        FormList
    },
    data() {
        return {
            modal_info: false,
                variantThumbnailList: [],
                priceForm: {
                    price: '',
                    special_price: '',
                    gross_margin: 20
                },
            
                showCites: false,
                moreTableInfo: {
                    length: '',
                    width: '',
                    height: '',
                    weight: '',
                    bracode: '',
                    note: ''
                },
                global_gross_margin_info: {},
                categoryList: [],
                showSteeingPrice: true,
                str: '',
                sta:'',
                showSearchInput: true,
                showSeetingprice: false,
                modal_product: false,
                settingGrossMarginFlag: false,
                // global_price_quantity_info: {},
                global_more_info: {},
                tableIdOrStr: '',
                saveProductName: [],
                categoryLevelList: [
                ],
                NextChild: {},
                levelIndex: null,
                savedActiveIndex: [],
                savedParentId: [''],
                saveProductNameList: {},
                saveProductIdList: {},
                productList: [],
                headTableProAttr: [],
                tableId: '',
                tableList: [
                  
                ],
                modal_settingPrice: false,
                formList: [
                
            ],
            sku_id: '',
            form: {
                shop: '',
                classCategory: '',
                classCategory_dianXiaomi: '',
                shortDescription: '',
                proDescription: '',
                product_category: '',
                brand: 'OEM',
                weight: '',
                length: 1,
                width: 1,
                height: 1,
                tax: 'default',
                videoURL: '',
                packagingContent: '',
                titleSelect: 'Amazon',
                template: '',
                model: '',
                type: '',
                selectBrand: '',
                product_title: '',
                product_title_malai: '',
            },
            lazada_product_info: {
                name: {
                is_display: 1,
                is_mandatory: 1
                },
                model: {
                    is_display: 1,
                    is_mandatory: 1,
                    options: []
                },
                warranty_type: {
                    is_display: 1,
                    is_mandatory: 1,
                    options: [],
                },
                brand: {
                    is_display: 1,
                    is_mandatory: 1,
                    options: []
                },
                name_ms: {
                    is_display: 1,
                    is_mandatory: 1
                },
            },
            lazadaTableHead: [],
            lazadaAttrsList: [],
            checkAll: false,
            checkedCities: [],
            isIndeterminate: false,
            active: 0,

        }
    },
    computed: {
        strNum() {
            return `${this.form.product_title.length}/255`
        },
        strMalaiNum() {
            return `${this.form.product_title_malai.length}/255`
        },
        packagingContentlength() {
            return `${this.form.packagingContent.length}/1000`
        },
        ...mapGetters(['templateList', 'brandList', 'shopList', 'siteList']),
        ...mapState({
            list: state => state.lazada.list,
            tags: state => state.lazada.tags,
            modules: state => state.listing.modules,
            rules: state => state.listing.rules,
            taxList: state => state.listing.taxList,
            siteListPrice: state => state.listOfSelections.siteListPrice,
            // global_price_quantity_info: state => state.listOfSelections.global_price_quantity_info
        }),
        variantPictureList: {
            get() {
                return this.$store.state.listing.variantPictureList
            },
            set(val) {
                this.$store.state.listing.variantPictureList = val
            }
        },
        flag: {
            get() {
                return this.$store.state.listOfSelections.flag
            },
            set(val) {
                this.$store.state.listOfSelections.flag = val
            }
        },
        global_price_quantity_info: {
            get() {
                return this.$store.state.listOfSelections.global_price_quantity_info
            },
            set(val) {
                this.$store.state.listOfSelections.global_price_quantity_info = val
            }
        }
    },
    watch: {
        'form.template': {
            handler(val) {
                let obj = this.templateList.filter(item => item.id === val)[0]
                this.form.proDescription = obj.info + this.form.proDescription 
                this.$refs.content.setContent(this.form.proDescription)
            }
        },
        'form.selectBrand': {
            handler(val) {
                if (val) {
                    this.form.brand = val
                }
            }
        },
    },
    methods: {
        /* 拖拽图片图片的位置改变缩略图 */
        changeImagePath(id, list) {
            // console.log(this.variantThumbnailList)
            // console.log(this.lazadaTableHead)
            // if (this.lazadaTableHead.some(item => item.attr_label === 'Color Family')) {
                if (this.tableList.find(item => item.id === id)) {
                    let obj = this.tableList.find(item => item.id === id)
                    this.$set(obj, 'color_thumbnail', list[0])
                }
                if (this.variantThumbnailList.length) {
                    if (this.variantThumbnailList.find(item => item.id === id)) {
                        let obj = this.variantThumbnailList.find(item => item.id === id)
                        this.$set(obj, 'img_path', list[0])
                    }

                }
            // }
            // console.log(this.tableList)
        },
        /* 获取分类属性 */
        async getCategoryAttr(query) {
            loading()
                await getCategoryAttr(query).then(res => {
                    let item = res.data
                    item.lazada_product_info.warranty_type.options = item.lazada_product_info.warranty_type.options ? item.lazada_product_info.warranty_type.options.split(',') : []
                    this.lazada_product_info = item.lazada_product_info
                    item.lazada_category_attr_info.forEach(item => {
                        item.value = ''
                        // if (item.attr_label === 'Dangerous Goods') {
                            
                            
                        //     // item.value = 'None'
                        // }
                        item.is_mandatory = item.is_mandatory ? true : false
                        if (item.input_type === 'multiEnumInput' || item.input_type === 'multiSelect') {
                            item.value = []
                            item.select = false
                            if (item.attr_label === 'Dangerous Goods') {
                                item.value = ['None']
                            }
                        }
                    })
                    this.form.type = this.form.type || 'No Warranty'
                    this.lazadaAttrsList = item.lazada_category_attr_info
                    let lazadaAttrs = item.lazada_category_attr_sku_info.map(item => item.attr_label) /* 拿到lazada的属性 */
                    let lazadaTableHeadAttrs = this.lazadaTableHead.map(item => item.attr_label) /* 拿到本地存在的属性 */
                    let lazadaAddAttrs = lazadaAttrs.filter(item => !lazadaTableHeadAttrs.includes(item)) /* 拿到新增的属性 */
                    let lazadaDelAttrs = lazadaTableHeadAttrs.filter(item => !lazadaAttrs.includes(item)) /* 拿到本地剩下的的属性 */
                    if (!lazadaAttrs.includes('Color Family')) { // 判断当前拉回来的属性如果没有color family这个字段 缩略图应当被删除
                        this.variantThumbnailList = []
                    }
                    lazadaAddAttrs.forEach(addLabel => {
                        this.tableList.forEach(ele => {
                            this.$set(ele, addLabel, '')
                        })
                    })
                    lazadaDelAttrs.forEach(delLabel => {
                        this.tableList.forEach(ele => {
                            this.$delete(ele, delLabel)
                        })
                    })
                    let variantAttrlist = []
                    this.variantPictureList.forEach(item => {
                        for (let key in item) {
                            if (key !== 'id' && key !== 'img_list') {
                                variantAttrlist.push(key)
                            }
                        }
                    })
                    let variantAddAttr = lazadaAttrs.filter(item => !Array.from(new Set(variantAttrlist)).includes(item)) /* 拿到新增的变种图片属性 */
                    let variantDelAttr = Array.from(new Set(variantAttrlist)).filter(item => !lazadaAttrs.includes(item)) /* 拿到变种图片中删除的属性 */
                    variantAddAttr.forEach(item => {
                        this.variantPictureList.forEach(ele => {
                            this.$set(ele, item, '')
                        })
                    })
                    variantDelAttr.forEach(item => {
                        this.variantPictureList.forEach(ele => {
                            this.$delete(ele, item)
                        })
                    })
                    this.lazadaTableHead = item.lazada_category_attr_sku_info
                    loadingClose()
                }).catch(err => {
                    loadingClose()
                })        
        },
        async getSkuPrice(shop_id) {
            let params = {
                shop_id,
                sku_ids: this.tableList.map(item => item.product_sku)
            }
            await getSkuPrice(params).then(res => {
                res.data.forEach(item => {
                    this.tableList.forEach(ele => {
                        if (item.sku_id === ele.product_sku) {
                            ele.price = item.price
                            ele.special_price = item.special_price
                        }
                    })
                })
            }).catch(err => {
                loadingClose()
            })
        },
        /* 复选框 */
        handleCheckAllChange(val) {
            this.checkedCities = val ? this.siteList : []
        },
        handleCheckedCitiesChange(value) {
            let length = value.length
            if (length === this.siteList.length) {
                this.checkAll = true
            } else {
                this.checkAll = false
            }
        },
        selectClassCategory(shop) {
            if (!shop) {
                this.$message({
                    type: 'warning',
                    message: '请先选择店铺',
                })
                return
            }
            this.getProductList()
        },
        /* 变种信息设置价格 */
        settingPrice(item, str) {
            
                for (let key in this.global_price_quantity_info) {
                    if (key === item.id) {
                        
                        this.global_gross_margin_info[item.id] = this.global_price_quantity_info[item.id][0].gross_margin;
                    }
                }
            /* formList:该字段只是用来展示数据，具体的存储数据为 global_price_quantity_info 字段*/ 
            /* 
                global_price_quantity_info 该字段为我们前端想要的数据格式字段，有默认数据则取后端的，没有则前端根据设置的生成
            */
            this.modal_settingPrice = true
            this.str = str
            if (str === 'single') {
                this.tableId = item.id       
                this.sku_id = item.product_sku      
                let obj = this.tableList.find(ele => ele.id === item.id) /* 拿到表格中的数据进行赋值 */
                this.$nextTick(() => {
                    this.priceForm.price = obj.price
                    this.priceForm.special_price = obj.special_price
                })
                if (Object.prototype.hasOwnProperty.call(this.global_gross_margin_info, item.id)) {
                    this.priceForm.gross_margin = this.global_gross_margin_info[item.id]
                } 
                else {
                    this.priceForm.gross_margin = 20
                }
                if (Object.prototype.hasOwnProperty.call(this.global_price_quantity_info, item.id)) {  /* 判断当前有没有设置过6合1站点价格数据 */ 
                    /* 可能会改变站点 */  
                    let newList = this.global_price_quantity_info[item.id].filter(f => this.checkedCities.includes(f.site_code)) /* 拿到还存在的站点 */
                    let someSiteList = newList.map(ele => ele.site_code)
                    let someList = this.checkedCities.filter(ele => someSiteList.indexOf(ele) == -1) /* 拿到新增的站点 */
                    let addSiteList = [] /* 新增站点 */   
                    if (this.siteListPrice.length) { /* 同样的有则取后端返回的数据 */
                        let obj = this.siteListPrice.find(ele => ele.id === item.id)
                        someList.forEach(ele => {
                            for (let key in obj) {
                                if (ele === key) {
                                    let obj2 = {}
                                    Reflect.set(obj2, 'site_code', ele)
                                    Reflect.set(obj2, 'price', obj[key].price)
                                    Reflect.set(obj2, 'special_price', obj[key].special_price)
                                    addSiteList.push(obj2)
                                }
                            }                   
                        })
                        
                        this.formList = JSON.parse(JSON.stringify([...newList, ...addSiteList]))
                    } else { /* 后端没有数据，自定义数据 */
                        someList.forEach(ele => {
                            let obj = {}
                            Reflect.set(obj, 'site_code', ele)
                            Reflect.set(obj, 'price', '')
                            Reflect.set(obj, 'special_price', '')
                            addSiteList.push(obj)                  
                        })
                    }            
                    
                    this.formList = JSON.parse(JSON.stringify([...newList, ...addSiteList])) /* 合并之前的站点数据和现在的站点数据 */
                } else {
                    this.formList = []
                    if (this.siteListPrice.length) { /* 判断是这个是因为，这个处理已经混入到所有的编辑，而只有刊登选聘列表编辑才有默认的价格 */
                        let obj = this.siteListPrice.find(ele => ele.id === item.id)
                        this.checkedCities.forEach(site => {
                            for (let key in obj) {
                                if (key === site) {
                                    this.formList.push({ 
                                        site_code: site,
                                        price: obj[key].price,
                                        special_price: obj[key].special_price
                                    })
                                }
                            }               
                        })
                    } else { /* 不是刊登选品列表 */
                        this.checkedCities.forEach(site => {
                            this.formList.push({
                                site_code: site,
                                price: '',
                                special_price: ''
                            })           
                        })       
                        this.global_price_quantity_info[item.id] = JSON.parse(JSON.stringify(this.formList))  /* 只有没有默认数据时才需要赋值 */
                    }                     
                }        
            } else {
                this.priceForm.price = ''
                this.priceForm.special_price = ''
                this.formList = []
                this.checkedCities.forEach(site => {
                    this.formList.push({
                        site_code: site,
                        price: '',
                        special_price: ''
                    })
                })
            }        
        },
        /* 搜索获取分类*/
        doSearch(params) {
            params.shop_id = this.form.shop
            loading()
            getCategoryAttrList(params).then(res => {
                if (res.code === 0) {
                    this.categoryList = res.data
                }
                loadingClose()
            }).catch(err => {
                loadingClose()
            })
        },
        /* 设置更多信息 */
        settingInfo(item) {
            if (typeof item === 'string') { // 修改全部
                this.tableIdOrStr = 'all'
            } else { // 修改单个
                this.tableIdOrStr = item.id
                if (Object.prototype.hasOwnProperty.call(this.global_more_info, item.id)) {
                    this.$nextTick(() => {
                        this.moreTableInfo = JSON.parse(JSON.stringify(this.global_more_info[item.id]))
                    })                 
                }
            }
            this.modal_info = true
        },
        /* 删除变种参数行 */
        deleteCell(item, index) {
            let i = this.variantPictureList.findIndex(ele => ele.id === item.id)
            this.variantPictureList.splice(i, 1)
            let variantIndex = this.variantThumbnailList.findIndex(ele => ele.id === item.id)
            this.variantThumbnailList.splice(variantIndex, 1)
            this.$delete(this.global_price_quantity_info, item.id)
            this.tableList.splice(index, 1)
            this.changeVariantThumbnailListFunc()
        },
        changeVariantThumbnailListFunc() {
            let colorList = this.tableList.map(item => item['Color Family'])
            let colorList2 = this.variantThumbnailList.map(item => item.attr_label)
            if (colorList.filter(item => !colorList2.includes(item)).every(ele => ele)) {
                let tabLabel = Array.from(new Set(colorList.filter(item => !colorList2.includes(item))))
                if (tabLabel.length) {
                    this.tableList.forEach(ele => {
                        tabLabel.forEach(name => {
                            if (ele['Color Family'] === name) {
                                if (!this.variantThumbnailList.find(item => item.attr_label === name)) {
                                    this.variantThumbnailList.push({
                                        id: ele.id,
                                        img_path: ele.color_thumbnail,
                                        attr_label: ele['Color Family']
                                    })
                                }                       
                            }
                        })
                    })
                }
            }     
        },
        /* 确定获取设置更多信息 */
        confirmSettingInfo(data) {
            if (typeof data === 'boolean') {
                clearObjValue(this.moreTableInfo)
                this.modal_info = false
                return
            }
            let flag = true
            for (let key in this.moreTableInfo) {
                if (this.moreTableInfo[key]) {
                    if (key !== 'weight') {
                        if (!priceReg.test(this.moreTableInfo[key])) {
                            flag = false
                        }
                    } else {
                        if (!weightReg.test(this.moreTableInfo[key])) {
                            flag = false
                        }
                    }                
                }
            }
            if (!flag) {
                message('warning', '产品尺寸只能是整数或者保留两位小数,重量最多保留三位小数')
                return
            }
            if (this.tableIdOrStr === 'all') { // 批量赋值
                this.tableList.forEach(item => {
                    this.moreCopyInfoFunc(item)
                })
            } else {
                this.tableList.forEach(item => {
                    if (item.id === this.tableIdOrStr) {
                        this.moreCopyInfoFunc(item)
                    }
                })
            }
            this.modal_info = false
            
            for (let key in this.global_gross_margin_info) {
                for (let keys in this.global_price_quantity_info) {
                    if (key === keys) {
                        this.global_gross_margin_info = this.global_price_quantity_info[
                            keys
                        ].gross_margin;
                    }
                }
            }
        },
        /* 更多信息赋值方法 */
        moreCopyInfoFunc(item) {
            item.package_length = this.moreTableInfo.length
            item.bracode = this.moreTableInfo.bracode
            item.package_width = this.moreTableInfo.width
            item.package_weight = this.moreTableInfo.weight
            item.package_height = this.moreTableInfo.height
            item.note = this.moreTableInfo.note
            this.global_more_info[item.id] = JSON.parse(JSON.stringify(this.moreTableInfo))
        },
        /*修改利润率按钮*/
        async search(params) {
            params.sku_ids = [this.sku_id];
            params.shop_id = this.form.shop;
            params.site_code = this.siteList;
            this.flag = false;
            await this.$store.dispatch("listOfSelections/getSitePrice", params);
            this.settingGrossMarginFlag = true
            this.formList.forEach((item) => {
                this.siteListPrice.forEach((ele) => {
                    for (let key in ele) {
                        if (key === item.site_code) {
                            item.price = ele[key].price;
                            item.special_price = ele[key].special_price;
                            item.gross_margin = ele[key].gross_margin;
                        }
                    }
                });
            });
            this.siteListPrice.forEach((ele) => {
                for (let key in ele) {
                    if (key === "MY") {
                        this.priceForm.price = ele[key].price;
                        this.priceForm.special_price = ele[key].special_price;
                        this.priceForm.gross_margin = ele[key].gross_margin;
                    }
                }
            })
            
        },
         /* 确定或取消设置价格 */
         confirmSettingPriceContent(data) {
            if (typeof data === 'boolean') {
                this.modal_settingPrice = false
                return
            }
            if (!this.priceForm.price || !this.priceForm.special_price) {
                message('warning', '默认站点价格和促销价必须填写', 2000)
                return
            }
            if (!priceReg.test(this.priceForm.price) || !priceReg.test(this.priceForm.special_price)) {
                message('warning', '变种信息中价格和促销价只能是整数或者保留两位小数')
                return
            }
            if (this.str === 'single') {
                // if (Number(data.gross_margin) !== Number(this.saveValue)){
                //     message('warning', '利润率与价格不符，请点击修改按钮')
                //     return;
                // }
                this.tableList.forEach(item => {
                    if (item.id === this.tableId) {
                        item.price = this.priceForm.price
                        item.special_price = this.priceForm.special_price
                    }
                })
                if (this.settingGrossMarginFlag) {
                    this.global_gross_margin_info[this.tableId] = JSON.parse(JSON.stringify(this.priceForm.gross_margin))
                    this.settingGrossMarginFlag = false
                }

                this.global_price_quantity_info[this.tableId] = JSON.parse(JSON.stringify(this.formList))
            } else {   
                this.tableList.forEach(item => {
                    // if (item.id === this.tableId) {
                        item.price = this.priceForm.price
                        item.special_price = this.priceForm.special_price
                        this.global_price_quantity_info[item.id] = JSON.parse(JSON.stringify(this.formList))
                    // }
                })
            }           
            this.modal_settingPrice = false          
        },       
        /* 改变color family */
        changeColorFamily(label, item) {
            this.variantPictureList.forEach(ele => {
                if (ele.id === item.id) {
                    if (typeof item[label] === 'object') {
                        this.$set(ele, label, item[label].join(','))
                    } else {
                        this.$set(ele, label, item[label])
                    }              
                }
            })
            if (label === 'Color Family') {
                if (!this.variantThumbnailList.length) { // 判断当前的变种缩略图数组为空
                    this.variantThumbnailList.push({
                        id: item.id,
                        img_path: item.color_thumbnail,
                        attr_label: item[label]
                    })
                } else {
                    if (this.variantThumbnailList.find(ele => ele.id === item.id)) { // 判断当前有没有这个id，没有直接插
                        if (this.variantThumbnailList.find(ele => ele.attr_label === item[label])) { // 判断有没有相同的属性
                            let index = this.variantThumbnailList.findIndex(ele => ele.id === item.id) 
                            this.variantThumbnailList.splice(index, 1)
                        } else {
                            this.variantThumbnailList.find(ele => ele.id === item.id).attr_label = item[label]
                        }                    
                    } else { // 没有相同的id
                        if (this.variantThumbnailList.every(ele => ele.attr_label !== item[label])) { // 判断有没有相同的属性
                            this.variantThumbnailList.push({
                                id: item.id,
                                img_path: item.color_thumbnail,
                                attr_label: item[label]
                            })
                        }
                    }     
                }
                /* 
                当进行修改操作过后，如果用户随意去修改，全部改成一样的，就会出现问题
                
                */
                let colorList = this.tableList.map(item => item[label]) /* 找到当前表格中的color */
                let colorList2 = this.variantThumbnailList.map(item => item.attr_label) /*  和 缩略图中的color */
                // console.log(colorList, 'colorList')
                // console.log(colorList2, 'colorList2')
                if (colorList.filter(item => !colorList2.includes(item)).every(ele => ele)) { /* 找到表格缩略图color有哪些是不存在余表格的 */
                    let tabLabel = Array.from(new Set(colorList.filter(item => !colorList2.includes(item)))) /* 如果有重复的colo应当进行去重 */
                    // console.log(this.variantThumbnailList)
                    // console.log(tabLabel, 'tabLabel')
                    if (tabLabel.length) {
                        this.tableList.forEach(ele => {
                            tabLabel.forEach(name => {
                                if (ele[label] === name) { /* 找到名称相同的 */
                                    if (!this.variantThumbnailList.find(item => item.attr_label === name)) { /* 即使去重了，表格的数据肯定大于缩略图得数据长度，所以在往缩略图插数据得时候，应当判断没有这个colo才插进去 */
                                        this.variantThumbnailList.push({
                                            id: ele.id,
                                            img_path: ele.color_thumbnail,
                                            attr_label: ele[label]
                                        })
                                    }                                
                                }
                            })
                        })
                    }
                }     
            }
        },
        /* 清除tale中缩略图的数据 */
        clearVariantThumbnaiList(id) {
            let index = this.tableList.findIndex(ele => ele.id === id)
            this.tableList[index].color_thumbnail = ''
        },
        changeVariantThumbnaiList(id, path) {
            this.tableList.forEach(ele => {
                if (ele.id === id) {
                    ele.color_thumbnail = path
                }
            })
        },
        ...mapActions(['getTemplateList', 'getBrandInfo', 'getShopList', 'getSiteList']),
        /* 获取产品分类和店铺的列表 */
        getProductList(args) {
            let query = {
            shop_id: this.form.shop,
            pid: 0
            }
            getPeoduct1(query).then(res => {
                if (args) {
                    this.categoryLevelList.splice(0, 1, res.data);
                } else {
                    this.categoryLevelList.push(res.data);
                }
                this.modal_product = true
            })
        },
        showChildren(item, index, activeIndex) {
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
                this.getProductList(true);
                return false;
            }
            let query = {
                shop_id: this.form.shop,
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
        // 取消选择产品分类
        cancel_product() {
            this.savedActiveIndex = []
            this.categoryLevelList = []
            this.saveProductName = []
            this.savedParentId = ['']
            this.categoryList = []
            this.$refs.categoryClass.searchWord = ''
            this.modal_product = false
        },
        returnTop(dom, index) {
            this.$el.querySelector(dom).scrollIntoView({
                behavior: "smooth"
            });
            this.active = index;
        },
        
    },
    created() {
        this.getShopList()
        this.getSiteList()
        this.getTemplateList()
        this.getBrandInfo()
    }
}
export const MixinsListingEdit = { /* 刊登记录列表编辑单独混入逻辑 */
    methods: {
         /* 改变店铺 */
         changeShop(val) {
            let obj = this.shopList.filter(ele => ele.shop_id === val)[0]
            if (obj.site_code === 'MY') {
                this.checkAll = true;
                this.checkedCities = this.siteList;
                this.showCites = true
            } else {
                this.showCites = false
            }
            // if (this.tableList.length) {
            //     this.getSkuPrice(val)
            // }
            if (this.form.classCategory) {
                let query = { lazada_category_id: this.form.classCategory, shop_id: val }
                this.getCategoryAttr(query)
            }
        },
        /* 改变分类 */
        changeClassCategory(val) {
            if (this.form.shop) {
                let query = { shop_id: this.form.shop, lazada_category_id: val }                 
                this.getCategoryAttr(query)
            }
        },
    }
}
export const createListingMixins = { /* 刊登选品列表编辑单独处理逻辑  */
    methods: {
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
            if (this.productList.find(item => item.id == this.NextChild.category_id)) {
                this.$message({
                    type: 'warning',
                    message: `已有重复类目`
                })
                return false
            }
            this.saveProductNameList[this.NextChild.category_id] = JSON.parse(JSON.stringify(this.saveProductName))
            this.saveProductIdList[this.NextChild.category_id] = JSON.parse(JSON.stringify(this.savedParentId))
            this.productList.push({ id: this.NextChild.category_id, label: this.NextChild.category_name, id_list: this.savedParentId})
            this.form.classCategory = this.NextChild.category_id
            this.cancel_product()
        },
        /* 通过搜索得到的品类进行选择 */
        selectLi(item) {
            if (this.productList.find(ele => ele.id == item.category_id)) {
                this.$message({
                    type: 'warning',
                    message: `已有重复类目`
                })
                return false
            }
            this.saveProductNameList[item.category_id] = JSON.parse(JSON.stringify(item.category_path))
            this.saveProductIdList[item.category_id] = JSON.parse(JSON.stringify(item.category_ids))
            this.productList.push({ id: item.category_id, label: item.category_name, id_list: this.savedParentId})
            this.form.classCategory = item.category_id
            this.cancel_product()
        },
    }
}
export const ListingEditMixins = { /* 刊登记录列表编辑单独处理逻辑 */
    methods: {
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
            if (this.productList.find(item => item.id == this.NextChild.category_id)) {
                this.$message({
                    type: 'warning',
                    message: `已有重复类目`
                })
                return false
            }
            this.saveProductNameList[this.NextChild.category_id] = JSON.parse(JSON.stringify(this.saveProductName))
            this.saveProductIdList[this.NextChild.category_id] = JSON.parse(JSON.stringify(this.savedParentId))
            this.productList.push({ id: this.NextChild.category_id, label: this.NextChild.category_name, id_list: this.savedParentId})
            this.form.classCategory = this.NextChild.category_id
            if (this.form.shop) {
                let query = { shop_id: this.form.shop, lazada_category_id: this.NextChild.category_id }                 
                this.getCategoryAttr(query)
            }
            this.cancel_product()
        },
        /* 通过搜索得到的品类进行选择 */
        selectLi(item) {
            if (this.productList.find(ele => ele.id === item.category_id)) {
                this.$message({
                    type: 'warning',
                    message: `已有重复类目`
                })
                return false
            }
            this.saveProductNameList[item.category_id] = JSON.parse(JSON.stringify(item.category_path))
            this.saveProductIdList[item.category_id] = JSON.parse(JSON.stringify(item.category_ids))
            this.productList.push({ id: item.category_id, label: item.category_name, id_list: this.savedParentId})
            this.form.classCategory = item.category_id
            
            if (this.form.shop) {
                let query = { shop_id: this.form.shop, lazada_category_id: item.category_id }                 
                this.getCategoryAttr(query)
            }
            this.cancel_product()
        },
    }
}