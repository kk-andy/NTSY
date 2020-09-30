import draggable from "vuedraggable";
import sortable from "sortablejs";
// import SeleCategoryPopup from "../components/SeleCategoryPopup.vue";
import SeleCategoryPopup from '@/view/ProductListing/components/SeleCategoryPopup.vue'
// import DescriptionTemplate from '../components/DescriptionTemplate'
import DescriptionTemplate from '@/view/ProductListing/components/DescriptionTemplate.vue'
// import FormList from '../components/formList'
import FormList from '@/view/ProductListing/components/formList.vue'
import Tinymce from "@/components/Tinymce";
import RestrictedAreaPopup from '@/view/BasicConfig/components/tabs/components/RestrictedAreaPopup'
import { getMutiData, deleteTableContent, deleteObjArrayItem } from '@/utils/getMutiData'
import { textFormat, debounce, gj_quantityValidator, _quantityValidator, download, firstToUpper } from '@/utils/common'
import toUpperCaseComponent from '@/components/toUpperCase'
import { getEbayCate } from '@/api/categoryClass'
import { mapState } from 'vuex'
import { 
    getPeoduct1,
    getShopClassList, 
    getProductSpecifications,
    getSkuCode,
    getImagePath,
    downloadImagesApi
    } from '@/api/listing'
export const mixin = {
    data() {
        return {
          uploadImageUrl: `${process.env.VUE_APP_AUTH_API_DOMAIN}/listing/tool/image/upload`,
          componentsName: 'AttrTemplate',
          spuInfo: {},
          unavailableShippingLocation: [],
          imageBaeUrl: 'https://file.ebay.nantang-tech.com',
          active: 0, // 当前激活的导航索引,
          product1: [],
          product2: [],
          shop1: [],
          recordFatherValue: '',
          shop2: [],
          headers: {
            Authorization: sessionStorage.getItem('token')
          },
          parmas: {
          },
          showReturnDescription: false,
          showDownloadButton: false,
          saveProductNameList1: {},
          saveProductNameList2: {},
          saveShop1Name: {},
          saveShop2Name: {},
          saveProduct1IdList: {},
          saveProduct2IdList: {},
          saveShop1IdList: {},
          saveShop2IdList: {},
          tableHeadList: [],
          productidList: [],
          formList: [], /* 动态表单列表 */
          formList2: [],
          modal_localtion: false,
          productAttrList: {},
          recordCurrent: {},
          productSkuList: [],
          productIdList: [],
          infoTitle: '',
          sku: '',
          props: {
            lazy: true,
            lazyLoad: this.cascaderLazyload,
            value: 'category_id',
            label: 'category_name',
            dialogVisible: false,
            children: 'son'
          },
          recordValue: '', // 记录自定义属性进入input框的值
          flag: true,
          list: [],
          parentId: 0,
          modal_attr: false,
          search_product: '',
          modal_product: false,
          categoryLevelList: [],
          flagListingListingduration: '',
          uploadList: [],
          productAndSku: [],
          // options: [{
          //     category_id: 'zhinan',
          //     category_name: '指南',          
          //   },
          // ],
          defineAttr: '',
          showCategoryaDialog: false, //控制三级联动弹窗
          is_plan_release: false, // 定时发布单选按钮
          showPriceGroup: true, //控制 起拍价、保留价、一口价显示
          showWholesale: true, //控制 批发 显示
          showVariant: false, //控制变种属性、变种图片、变种参数 显示
          showBargain: false, //控制  接受买家还价 显示
          showQuantityInStock: false, //控制 库存数量 显示
          showFixedPrice: false, //控制 固价价格 显示
          showTemplateEditing: false,
          showHTMLtemplate: true,
          content: 'content',
          // 对话框数据缓存区
          form: {
            spu: "",
            product1: '',
            site: 0,
            shop: '',
            product2: '',
            shop1: "",
            shop2: "",
            salesMethod: 0,
            productTitle: "", //产品标题
            subtitle: "", //子标题,
            upc: "",
            attributes: "", //产品属性,
            descriptionType: "HTML", //描述模板类型
            chooseTemplate: "", //描述模板选择
            attributesSelect: '',
            unavailable_shipping_location: '',
            return_description: '',
            internation_returns_accepted: true, //国外选择框
            returns_accepted: true,
            categoryOne: '',
            published_sku: '',
            categoryTwo: '',
            customizeAttr: [
              
            ],
            variantAttributeData: [
               
            ],
            variantPicture: [], //变种图片   主要控制
            private_listing: false, //私人拍卖单选框,
            listing_duration: 1, //刊登天数,
            pm_start_price: "", //起拍价     主要控制
            pm_reserve_price: "", //保留价      主要控制
            pm_buy_it_now_price: "", //一口价,         主要控制
            is_pm_lot_size: "", // 批发状态,   主要控制
            pm_lot_size: "", //批发数量
            paymentTemplate: "", //选择付款模板,
            pay_pal_email: "", //payPal账号
            payment_instructions: "", //付款说明
            refundTemplate: "", //选择退款模板,
            gj_best_offer_auto_accept_price: "", //自动接收大于
            gj_minP_best_offer_price: "", //自动接收小于
            returns_with_in: "", //国内退货天数
            shipping_cost_paid_by: "", //国内退货运营承担方
            internation_returns_with_in: "", //外内退货天数
            internation_shipping_cost_paid_by: "", //国外退货运营承担方
            gj_best_offer_auto_accept: false, // 开启自动接受高报价
            gj_best_offer_auto_decline: false, // 开启自动拒绝低报价
            transportTemplate: "", //选择运输模板
            location: "", //物品所在地
            country: "", //国家或区域
            postal_code: "", //邮编
            dispatch_time_max: "",
            fixedPrice: "", //固价价格   主要控制
            gj_quantity: "", //库存数量   主要控制
            gj_best_offer: "", //接收买家还价 主要控制
            //国内运输
            internalGroup: [
            ],
            // 国际运输
            internationalGroup: [
              
            ],
            ddl_exclusion_list_type: 0, //不运送地区
            otherTemplate: "", //选择其他政策模板
            disable_buyer_requirements: 0,
            ship_to_registration_country: false, // 范围之外的复选框
            max_unpaid_count_checkbox: false, //弃标复选框
            max_unpaid_count: 2, //弃标个案
            max_unpaid_period: 'Days_30', //弃标天数
            max_violations_count_checkbox: false, //违反政策检举复选框
            max_violations_count: 4, //违反政策检举
            max_violations_period: 'Days_30', //违反政策检举天数
            min_feedback_score_checkbox: false, // 信誉等级复选框
            min_feedback_score: -1, // 信誉等级复选框
            require_item_count_checkbox: false, //10天内的自我设定复选框
            require_item_count: 1, //10天内的自我设定复选框
            require_feedback_score_checkbox: false, // 限制买家信誉等级复选框
            require_feedback_score: 0, //限制买家信誉等级选择器
            sales_tax_state: "", //销售税选择器
            sales_tax_percent: "", //销售税的百分比
            shipping_included_in_tax: false, // 销售税单选框
            gallery_type: "None", // 图片广告
            features: false, // 图片特色
            internation: false,
            plan_update: "", //发布时间
            tableData: [
              //变种参数  主要控制
    
            
            ],
            images: [],
            richTextContent: "" // 类型描述类型的富文本框
          },
          rules: {
            site: [ { required: true, message: "请选择站点名称", trigger: "change" } ],
            gj_quantity: [ 
              { required: true, message: '请输入库存数量', trigger: 'blur' },
              { validator: _quantityValidator, trigger: "blur" } ],
            pm_lot_size: [ 
              { required: true, message: '请输入批量数量', trigger: 'blur' },
              { validator: _quantityValidator, trigger: "blur" } 
            ],
            gj_best_offer_auto_accept_price: [ 
              { required: true, message: '请输入自动接受大于的价格', trigger: 'blur' },
              { validator: gj_quantityValidator, trigger: "blur" } ],
            gj_minP_best_offer_price: [ 
              { required: true, message: '请输入自动接受小于的价格', trigger: 'blur' },
              { validator: gj_quantityValidator, trigger: "blur" } ],
            pm_start_price: [
                { required: true, message: '请输入1起拍价', trigger: 'blur' },
                { validator: gj_quantityValidator, trigger: "blur" } 
               ],
            pm_reserve_price: [ 
              { required: true, message: '请输入保留价', trigger: 'blur' },
              { validator: gj_quantityValidator, trigger: "blur" } ],
            pm_buy_it_now_price: [
              { required: true, message: '请输入一口价', trigger: 'blur' },
              { validator: gj_quantityValidator, trigger: "blur" }
              ],
            listing_duration: [
              { required: true, message: '请选择刊登天数', trigger: 'change' }
            ],
            shop: [{ required: true, message: "请选择店铺", trigger: "change" } ],
            product1: [ { required: true, message: "请选择产品分类", trigger: "change" } ],
            product2: [ { required: true, message: "请选择产品分类", trigger: "change" } ],
            productTitle: [{ required: true, message: "请填写产品标题", trigger: "blur" }],
            pay_pal_email: [ { required: true, message: "请填付款账号", trigger: "blur"  } ],
            fixedPrice: [ 
              { required: true, message: '请输入价格', trigger: 'blur' },
              { validator: gj_quantityValidator, trigger: "blur" }
            ],
            location: [
              { required: true, message: '请输入物品所在地', trigger: 'blur' },
            ],
            salesMethod: [
              {required: true, message: '请选择售卖形式', trigger: 'change'}
            ],
            descriptionType: [
              {required: true, message: '请选择类型描述', trigger: 'change' }
            ],
            shipping_type: [
              {required: true, message: '请选择运输方式', trigger: 'change' }
            ],
            country: [
              {required: true, message: '请选择国家和区域', trigger: 'change' }
            ],
            dispatch_time_max: [
              {required: true, message: '请选择处理时间', trigger: 'change' }
            ],
            internation_returns_accepted: [
              {type: 'boolean', required: true, message: '请选择退款政策', trigger: 'change' }
            ],
            returns_accepted: [
              {type: 'boolean', required: true, message: '请选择退款政策', trigger: 'change' }
            ],
                published_sku: [
                {required: true, message: '请填写刊登SKU', trigger: 'blur' }
                ]
            },
            picturePasteInput: "", //图片粘贴文本框
            templateData:"",
            desc_tpl_id:"",
            nameData: [
                
            ],
            noTransportationData: [
                {
                id: 0,
                value: "运送至所有国家"
                },
                {
                id: 2,
                value: "选择不运送地区"
                }
            ],  
            id: 2,
            transportId: 1,
            formLabelWidth: "100px",
            levelIndex: '',
            savedParentId: [''],
            savedActiveIndex: [],
            saveProductName: [],
            savedViewItem: '',
            parentId: 0,
            NextChild: '',
            productNo: '',
            shopsNo: '',
            testMutiData: {}
        };
    },
    components: {
        draggable,
        RestrictedAreaPopup,
        SeleCategoryPopup,
        DescriptionTemplate,
        sortable,
        Tinymce,
        FormList,
        toUpperCaseComponent,
        AttrTemplate: () => import ('@/view/BasicConfig/Subpage/AttrTemplate'),
        TableList: () => import ('@/view/ProductListing/components/tableList.vue')
    },
    computed: {
        ...mapState({
            siteData: state => state.listing.sites,
            shopList: state => state.listing.shops,
            currency: state => state.listing.currency,
            unavailableLocation: state => state.listing.unavailableLocation,
            availableLocation: state => state.listing.availableLocation,
            domesticList: state => state.listing.domestic,
            international: state => state.listing.international,
            listingConfig: state => state.listing.listingConfig,
            returnPolicy: state => state.listing.returnPolicy,
            shippingCountries: state => state.listing.shippingCountries,
            shippingDispatchTime: state => state.listing.shippingDispatchTime,
            taxLocation: state => state.listing.taxLocation,
            selfSettingNumData: state => state.listing.selfSettingNumData,
            restrictBuyerCreditNumData: state => state.listing.restrictBuyerCreditNumData,
            imageAdData: state => state.listing.imageAdData,
            creditRatingNumData: state => state.listing.creditRatingNumData,
            policyViolation: state => state.listing.policyViolation,
            policyViolationDays: state => state.listing.policyViolationDays,
            modules: state => state.listing.modules,
            discardBidData: state => state.listing.discardBidData,
            discardDaysData: state => state.listing.discardDaysData,
            allowMultiattr: state => state.listing.allowMultiattr,
            listing_durationList: state => state.listing.listing_durationList,
            templateList: state => state.listing.templateList,
            skuIdList: state => state.listing.skuIdList,
            paypal_accounts: state => state.listing.paypal_accounts,
            checkProductTitle: state => state.listing.checkProductTitle,
            checkeditContent: state => state.listing.checkeditContent,
            status: state => state.listing.status,
            Warnings: state => state.listing.Warnings,
            Errors: state => state.listing.Errors,
            feeResults: state => state.listing.feeResults,
            showMainFigureBUtton: state => state.listing.showMainFigureBUtton,
            showMainTitleButton: state => state.listing.showMainTitleButton
            // imagePath: state => state.listing.imagePath
        }),
        showAreaDialog: {
            get() {
              return this.$store.state.listing.showAreaDialog
            },
            set(val) {
              this.$store.state.listing.showAreaDialog = val
            }
        },
        upcCode: {
          get() {
            return this.$store.state.listing.upcCode
          },
          set(val) {
            this.$store.state.listing.upcCode = val
          }
        },
        modal_test_cost: {
          get() {
            return this.$store.state.listing.modal_test_cost
          },
          set(val) {
            this.$store.state.listing.modal_test_cost = val
          }
        }
    },
    watch: {
        'form.product1': {
            handler(val) {
                if (val) {
                  this.getProductSpecifications()
                  if (String(this.form.site) && this.form.shop) {
                    this.getAllowMultiattr()
                  }
                } 
            }
        },
        'form.product2': {
          handler(val) {
                  if (this.form.product1) {
                      this.getProductSpecifications()
                  }                           
                // if (val) {
                  if (String(this.form.site) && this.form.shop) {
                    this.getAllowMultiattr()
                  }
                // } 
          }
        },
        'form.shop': {
            handler(val) {
                  if (val) {
                      if (String(this.form.site)) {
                        if (this.form.product2 || this.form.product1) {
                          this.getAllowMultiattr()
                          this.getProductSpecifications()
                        }
                      }   
                      if (this.paypal_accounts.length) {
                        let paypal = this.paypal_accounts.filter(item => item.shop_id === val)[0]
                        this.form.pay_pal_email = paypal.paypal   
                      }      
                      this.$store.dispatch('listing/getTemplateList', { shop_id: val })
                      this.$set(this.parmas, 'shop_id', val)
                  } 
            }
        },
        'allowMultiattr': {
            handler(val) {
              if (!val) {
                if (this.form.salesMethod === 2) {
                  this.form.salesMethod = 0
                }
              }
            }
        },
        'form.ddl_exclusion_list_type': {
            handler(val) {
              if (val === 0) {
                this.form.ship_to_registration_country = false
              }
            }
          },
        'form.productTitle': {
            handler(val) {
              this.changeProductTitle()
            }
        },
        'form.site': {
            handler(val) {
                  if (String(val)) {
                    let query = { site_id: val }
                    this.$store.dispatch('listing/getAvailableLocation', query)
                    this.$store.dispatch('listing/getShippingType', query)
                    this.$store.dispatch('listing/getRefundPolicye', query)
                    this.$store.dispatch('listing/getShippingCountries', query)
                    this.$store.dispatch('listing/getshippingDispatchtime', query)
                    this.$store.dispatch('listing/getUnvailableLocation', query)
                    this.$store.dispatch('listing/getTaxLocation', query)
                    this.$store.dispatch('listing/getListingConfig', query)
                    this.getCurrency()
                      if (String(this.form.shop)) {
                        if (this.form.product2 || this.form.product1) { 
                          this.getAllowMultiattr()
                          this.getProductSpecifications()
                        }
                      }
                    let siteName = this.siteData.filter(item => item.site_id === val)[0].site
                    if (siteName === 'DE' || siteName === 'AT' || siteName === 'FR' || siteName === 'IT' || siteName === 'ES') {
                      this.showReturnDescription = true
                    } else {
                      this.showReturnDescription = false
                    }
                  } 
            }
        },
        'form.refundTemplate': {
            handler(val) {
                  if (String(val)) {
                      let obj = this.listingConfig.filter(item => item.tmp_id === val)[0]
                      this.form.returns_accepted = obj.returns_accepted ? true : false
                      this.form.internation_returns_accepted = obj.internation_returns_accepted ? true : false
                      this.form.return_description = obj.return_description
                      this.form.returns_with_in = obj.returns_with_in
                      this.form.shipping_cost_paid_by = obj.shipping_cost_paid_by
                      this.form.internation_returns_with_in = obj.internation_returns_with_in
                      this.form.internation_shipping_cost_paid_by = obj.internation_shipping_cost_paid_by
                   } 
            }
        },
        'form.salesMethod': {
            handler(val) {
              this.changeListingduration(val)
            }
        },
        'form.paymentTemplate': {
            handler(val) {
              if (String(val)) {
                let obj = this.listingConfig.filter(item => item.tmp_id === val)[0]
                console.log(obj)
                this.form.payment_instructions = obj.payment_instructions
              }
            }
        },
        'form.transportTemplate': {
            handler(val) {
                 if (String(val)) {
                     let obj = this.listingConfig.filter(item => item.tmp_id === val)[0]
                     this.form.dispatch_time_max = obj.dispatch_time_max
                     this.form.internalGroup = obj.domestic_shipping
                     this.unavailableShippingLocation = obj.unavailable_shipping_location
                     this.form.unavailable_shipping_location = obj.unavailable_shipping_location ? obj.unavailable_shipping_location.join('|') : ''
                     this.form.ddl_exclusion_list_type = obj.ddl_exclusion_list_type
                     obj.international_shipping.forEach(item => {
                       item.global = false
                       item.checkAll = false
                       if (typeof(item.shipping_location)=='string') { // 如果当前的类型为字符串，那么选择的就是全球
                         item.global = true
                         item.shipping_location =  _g.getJsonParse(this.availableLocation)
                       } else { // 不是则是数组类型，那么选的就是国家
                         item.checkAll = true
                         let availableLocation = _g.getJsonParse(this.availableLocation)
                         availableLocation.forEach(ele => {
                           item.shipping_location.forEach(location => {
                             let list = []
                             list.push(ele.value)
                             if (list.indexOf(location.value) != -1) {              
                               ele.select = true
                             }
                           })
                         })
                         item.shipping_location = availableLocation
                       }      
                     })
                     this.form.internationalGroup = obj.international_shipping
                     console.log(this.form.internationalGroup)
                     this.form.postal_code = obj.postal_code
                     this.form.country = obj.country
                     this.form.location = obj.location
                  } 
           }
        },
        'form.otherTemplate': {
            handler(val) {
                  if (String(val)) {
                      let obj = this.listingConfig.filter(item => item.tmp_id === val)[0]
                      this.form.disable_buyer_requirements = obj.disable_buyer_requirements
                      this.form.ship_to_registration_country = obj.ship_to_registration_country ? true : false
                      this.form.max_unpaid_count_checkbox = obj.max_unpaid_count_checkbox ? true : false
                      this.form.max_unpaid_count = obj.max_unpaid_count
                      this.form.max_unpaid_period = obj.max_unpaid_period
                      this.form.max_violations_count_checkbox = obj.max_violations_count_checkbox ? true : false
                      this.form.max_violations_count = obj.max_violations_count
                      this.form.max_violations_period = obj.max_violations_period
                      this.form.min_feedback_score_checkbox = obj.min_feedback_score_checkbox ? true : false
                      this.form.min_feedback_score = obj.min_feedback_score
                      this.form.require_item_count_checkbox = obj.require_item_count_checkbox ? true : false
                      this.form.require_item_count = obj.require_item_count
                      this.form.require_feedback_score_checkbox = obj.require_feedback_score_checkbox ? true : false
                      this.form.require_feedback_score = obj.require_feedback_score
                      this.form.sales_tax_state = obj.sales_tax_state
                      this.form.sales_tax_percent = obj.sales_tax_percent
                      this.form.shipping_included_in_tax = obj.shipping_included_in_tax ? true : false
                      this.form.gallery_type = obj.gallery_type
                   } 
            }
        }
    },
    methods: {
        /* 首字母转化为大写 */
        toUpper() {
            if (!this.form.productTitle) {
            return
            }
            this.form.productTitle = firstToUpper(this.form.productTitle)
        },
        // 一键插图
        insertImage() {
            let imgHTMLArr = []
            if (!this.form.images.length) {
                return false
            }
            getImagePath({ image_url: this.form.images }).then(res => {
            this.$refs.content.imageSuccessEditListing(res.data)
            })
        },
        changeListingduration(val) {
            let _this = this
            switch(val) {
              case 0:
                  deleteObjKey(val)
                  this.form.listing_duration = 1
                  this.infoTitle = '拍卖'
                  return
              case 1:
                  deleteObjKey(val)
                  this.infoTitle = '固价'
                  return
              case 2:
                  deleteObjKey(val)
                  this.infoTitle = '多属性'
                  return
            }
            function deleteObjKey (val){
              if (val === 0) {
                if (_this.listing_durationList[0].value === 'GTC') {
                  _this.listing_durationList.splice(0, 1)
                }
              } else {
                if (_this.listing_durationList[0].value === 'GTC') {
                    return _this
                }
                _this.listing_durationList.unshift({ id: 0, value: 'GTC' })
              }
              
            }
        },       
        getCurrency() {
            let site = null
            let usd = null
            this.siteData.forEach(item => {  
                if (item.site_id === this.form.site) {
                    site = item.site
                }
            })
            this.currency.forEach(item => {
                if (item.site === site) {
                    usd = item.currency
                }
            })
                return usd
        },
        deleteFiratItem(arr, id) {
            let newArr = arr[id].slice(0);
            newArr.splice(0, 1);
            return newArr.join('_')
        },
         /* 获取产品属性规格 */
        getProductSpecifications() {
            let query = {
            site_id: this.form.site,
            category_id: this.form.product1,
            // second_category_id: this.form.product2,
            shop_id: this.form.shop_id ? this.form.shop_id : 0
            }
            if (this.form.product2) {
            query.second_category_id = this.form.product2
            } else {
            this.formList2 = []
            }
            getProductSpecifications(query).then(res => {
                if (this.form.product1) {
                    res.data[this.form.product1].forEach(item => {
                        if (item.selection_mode === 'checkbox') {
                        item.value = []
                        } else {
                        item.value = ''
                        }
                    })
                    res.data[this.form.product1].forEach(item => {
                    for (let key in this.productAttrList) {
                        if (item.name === key) {
                        if (item.selection_mode === 'checkbox') {
                            if (typeof(this.productAttrList[key])=='string') {
                                item.value = [this.productAttrList[key]]
                            } else {
                                item.value = this.productAttrList[key]
                            }
                        } else {
                            item.value = this.productAttrList[key]
                        }             
                        }
                    }
                    })
                    this.formList = res.data[this.form.product1]
                }
                })
        },
        // 产品分类下是否允多属性sku
        getAllowMultiattr() {
            let query = {
            site_id: this.form.site,
            shop_id: this.form.shop
            }
            if (this.form.product1) {
            query.category_history_id = this.form.product1
            }
            if (this.form.product2) {
            query.second_category_history_id = this.form.product2
            }
            this.$store.dispatch('listing/getAllowMultiattr', query)
        },
        /* 是否有侵权词汇 */
        changeProductTitle() {
            if (!this.form.productTitle) {
                return false
            }
            let formData = new FormData()
            formData.append('words', this.form.productTitle)
            let flag = { title: 'productTitle' }
            debounce(() => {
                this.$store.dispatch('listing/InfringementOfWord', { formData, flag })
            }, 1000)
        },
        input(val) {
            if (!val) {
              return false
            }
            if (!textFormat(this.form.richTextContent)) {
              return false
            }
            debounce(() => {
              if (!this.form.richTextContent) {
                return false
              }
              let formData = new FormData()
              formData.append('words', textFormat(this.form.richTextContent))
              let flag = { title: 'editorContent' }
              this.$store.dispatch('listing/InfringementOfWord', { formData, flag })
            }, 1000)   
        },
        getUnvailableLocation() {
            this.$set(this.recordCurrent, "title", "添加不运送地区");
        },
        /* 获取产品分类和店铺的列表 */
        getProduct1List(args) {
            let query = {
            site_id: this.form.site,
            pid: 0
            }
            getPeoduct1(query).then(res => {
            if (args) {
                this.categoryLevelList.splice(0, 1, res.data);
                        // this.categoryLevelList[0] = res.data.data.children
            } else {
                this.categoryLevelList.push(res.data);
            }
            this.modal_product = true
            })
            this.$store.dispatch('listing/getPeoduct1', query)
        },
        getShopClassList(args) {
            let query = {
              site_id: this.form.site,
              shop_id: this.form.shop,
              pid: 0
            }
            getShopClassList(query).then(res => {
              if (args) {
                  this.categoryLevelList.splice(0, 1, res.data);
                        // this.categoryLevelList[0] = res.data.data.children
              } else {
                  this.categoryLevelList.push(res.data);
              }
              this.modal_product = true
            })
        },
        // 查看下一级的产品
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
        updateList (id, index) {
            if (!id) {
              this.getdata(true);
              return false;
            }
            let query = {
              site_id: this.form.site,
              pid: id
            }
            if (!this.flag) {
              query.shop_id = this.form.shop
              getShopClassList(query).then(res => {
                this.categoryLevelList.splice(index + 1);
                let tempArr = [...this.categoryLevelList];
                tempArr[index + 1] = res.data;
                this.$nextTick(() => {
                  this.categoryLevelList = tempArr;
                });
            })
            } else {
              getPeoduct1(query).then(res => {
                this.categoryLevelList.splice(index + 1);
                let tempArr = [...this.categoryLevelList];
                tempArr[index + 1] = res.data;
                this.$nextTick(() => {
                  this.categoryLevelList = tempArr;
                });
              })
            } 
        },
        cascaderLazyload(node, reslove) {
            let { category_id } = node
            this.parentId = category_id
            let nodes = []
            
        },
        cancel() {
            this.$router.go(-1);
        },
        // 添加变种属性按钮
        addVariantAttributes() {
            this.modal_attr = true
        },
        // 确定添加
        submit_attr() {
            if (!this.defineAttr) {
                this.$message({
                    message: '请输入自定义属性',
                    type: 'warning'
                })
                return false
            }
        let nameList =  this.form.variantAttributeData.map(item => item.name)
        if (nameList.indexOf(this.defineAttr) !== -1) {
            this.$message({
                    message: '不能添加相同的属性',
                    type: 'warning'
            })
            return false
        }
        if (this.form.variantAttributeData.length === 5) {
            this.$message({
                    message: '最多只能添加5个自定义属性',
                    type: 'warning'
            })
            return false
        }
            let valueList = [
            {
                val: '',
                imagesList: []
            },
            {
                val: '',
                imagesList: []
            },
            ]
            this.form.variantAttributeData.push({ name: this.defineAttr, valueList})
            this.form.attributesSelect  = this.form.variantAttributeData[0].name
            this.defineAttr = ''
            this.modal_attr = false
        },
        // 确定选择分类
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
            if (this.flag) {
            if (this.productNo === '1') {
                if (this.product1.filter(item => item.id === this.NextChild.category_id).length) {
                this.$message({
                    type: 'warning',
                    message: `错误：您选择的类目 “${this.NextChild.category_name}” 已存在！`
                })
                return false
                }
                this.saveProductNameList1[this.NextChild.category_id] = this.saveProductName
                this.saveProduct1IdList[this.NextChild.category_id] = this.savedParentId
                this.form.product1 = this.NextChild.category_id
                this.product1.push({ id: this.NextChild.category_id, label: this.NextChild.category_name})
            } else {
                if (this.product2.filter(item => item.id === this.NextChild.category_id).length) {
                this.$message({
                    type: 'warning',
                    message: `错误：您选择的类目 “${this.NextChild.category_name}” 已存在！`
                })
                return false
                }
                this.saveProductNameList2[this.NextChild.category_id] = this.saveProductName
                this.saveProduct2IdList[this.NextChild.category_id] = this.savedParentId
                this.form.product2 = this.NextChild.category_id
                this.product2.push({ id: this.NextChild.category_id, label: this.NextChild.category_name})
            }
            } else {
            if (this.shop1.filter(item => item.id === this.NextChild.category_id).length) {
                this.$message({
                    type: 'warning',
                    message: `错误：您选择的类目 “${this.NextChild.category_name}” 已存在！`
                })
                return false
                }
            if (this.shopsNo === '1') {
                this.saveShop1Name[this.NextChild.category_id] = this.saveProductName
                this.saveShop1IdList[this.NextChild.category_id] = this.savedParentId
                this.form.shop1 = this.NextChild.category_id
                this.shop1.push({ id: this.NextChild.category_id, label: this.NextChild.category_name})
            } else {
                if (this.shop2.filter(item => item.id === this.NextChild.category_id).length) {
                this.$message({
                    type: 'warning',
                    message: `错误：您选择的类目 “${this.NextChild.category_name}” 已存在！`
                })
                return false
                }
                this.saveShop2Name[this.NextChild.category_id] = this.saveProductName
                this.saveShop2IdList[this.NextChild.category_id] = this.savedParentId
                this.form.shop2 = this.NextChild.category_id
                this.shop2.push({ id: this.NextChild.category_id, label: this.NextChild.category_name})
            }
            }
            this.cancel_product()
        },
        // 取消选择产品分类
        cancel_product() {
            this.savedActiveIndex = []
            this.categoryLevelList = []
            this.saveProductName = []
            this.savedParentId = ['']
            this.modal_product = false
        },
        // 取消添加
        cancel_attr() {
            this.modal_attr = false
        },
        // 添加单个属性
        addSingleAttr(item) {
            if (item.valueList.length === 10) {
                this.$message({
                    message: '最多只能添加10个属性',
                    type: 'warning'
                })
                return false
            }
            item.valueList.push({ val: '', imagesList: [] })
        },
        // 删除单个属性
        removeSingleAttr(val, item, valueList, fatherLabel, index) {  
            item.valueList.splice(index, 1)
            this.uploadList.splice(index, 1)
            if (item.valueList.length === 0) { // 如果当前的属性中的单个属性长度为0，应该父属性
                this.form.variantAttributeData = this.form.variantAttributeData.filter(ele => ele.valueList.length > 0)       
            }
            this.testMutiData = deleteObjArrayItem(this.testMutiData, item.name, val)
            if (!this.testMutiData[item.name].length) { // 如果当前属性名的数值被删除完了
            this.$delete(this.testMutiData, item.name) // 那么这个属性也要删除
            this.tableHeadList = this.tableHeadList.filter(ele => ele !== item.name) // 当前的表头也要把这个属性名删除
            }    
            this.productIdList = []
            this.productIdList = deleteTableContent(this.form.tableData, item.name, val, valueList, this.form.variantAttributeData)
            this.productAndSku = this.productAndSku.filter(item => !this.productIdList.includes(item.sku))
            this.form.attributesSelect = this.form.variantAttributeData.length ? this.form.variantAttributeData[0].name : ''
            this.form.variantAttributeData.forEach(ele => {
            this.uploadList = ele.valueList.filter(son => son.val)
            })
            if (!this.form.variantAttributeData.length) {
                this.form.attributesSelect = ''
            }
        },
        /* 拿到当前 */
        getSameNum(val,arr) {
            let processArr 
            processArr = arr.filter((item) => {
                return item.val == val;
            })
            return processArr.length;
        },
        getSameNameNum(val,arr) {
            let processArr 
            processArr = arr.filter((item) => {
                return item == val;
            })
            return processArr.length;
        },
        // 获取焦点
        focusValue(val) {
            this.recordValue = val
        }, 
        focusFatherValue(val) {
            this.recordFatherValue = val
        },
        blurAttrFather(item, val, i) {
            if (!val) { // 如果清空暂时不管
              this.$message({
                type: 'warning',
                message: '不要填写空值噢'
              })
              item.name = this.recordFatherValue
              return
            }
            if (this.recordFatherValue === val) { // 进来和离开的值相同
              return 
            }
            if (this.tableHeadList.indexOf(val) !== -1) { // 当发现有重复值时
              item.name = this.recordFatherValue // 用之前的填写的值将当前的替换避免错误
              this.$message({
                type: 'warning',
                message: '不要填写重复的值噢'
              })
              return false
            }
            this.form.attributesSelect = this.form.variantAttributeData[i].name // 当前下拉框绑定的值也需要跟着变
            this.form.variantAttributeData.forEach(ele => {
              this.uploadList = ele.valueList.filter(son => son.val)
            })
            for (let key in this.testMutiData) {
              if (key === this.recordFatherValue) {
                this.testMutiData[val] = this.testMutiData[key]
                delete this.testMutiData[key]
              }
            }   
            this.tableHeadList[i] = val
            this.form.tableData.forEach(ele => {
              for (let key in ele) {
                if (key === this.recordFatherValue) {
                  ele[val] = ele[key];
                  // 删除原来的键
                  delete ele[key];
                }
              }
            })
            this.$forceUpdate()   
        },
        // 属性值失去焦点添加upload组件
        blurAttr(val, item, valueList, fatherLabel) {
            if (!this.recordValue) { // 鼠标刚进入没有值，说明是第一次进入
            if (!val) {
                return false
            }
            }  
            if (this.recordValue === val) {
            return false
            }
            if (this.recordValue) { // 鼠标进入有值，说明不是第一次进入
            if (!val) { // 说明值被清空 那么因该删除当前属性名中的属性值，并且删除table关于他的行
                this.testMutiData = deleteObjArrayItem(this.testMutiData, fatherLabel, this.recordValue)
                deleteTableContent(this.form.tableData, fatherLabel, this.recordValue, valueList, this.form.variantAttributeData)
                if (!this.testMutiData[fatherLabel].length) { // 如果当前属性名的数值被删除完了
                this.$delete(this.testMutiData, fatherLabel) // 那么这个属性也要删除
                this.tableHeadList = this.tableHeadList.filter(ele => ele !== fatherLabel) // 当前的表头也要把这个属性名删除
                }  
                this.$forceUpdate()
                return // 直接不往面走了
            } else if (this.recordValue === val) { // 鼠标离开和进入的值一样，那就什么都不做
                return
            } else { // 离开的值和进入的值不一样，说明是修改，那么就应该将当前属性名中的属性值进行更改
                if (this.testMutiData[fatherLabel]) {
                if (this.testMutiData[fatherLabel].indexOf(val) !== -1) {
                    return false
                }
                let flag = true
                this.form.tableData.forEach(item => {
                    if (item[fatherLabel] === this.recordValue) {
                    flag = false
                    return 
                    }
                })
                if (!flag) {
                    let index = this.testMutiData[fatherLabel].indexOf(this.recordValue) // 找到之前属性值的下标
                    this.testMutiData[fatherLabel][index] = val // 用现在的属性值将之前的属性值进行替换
                    // console.log(this.testMutiData)
                    this.form.tableData.forEach(ele => {
                    for (let key in ele) {
                        if (key === fatherLabel && ele[fatherLabel] === this.recordValue) {
                        ele[fatherLabel] = val
                        }
                    }
                    })
                    this.$forceUpdate()
                    return
                }       
                }        
            }
            }
            if (Object.prototype.hasOwnProperty.call(this.testMutiData, fatherLabel)) {       
            this.testMutiData[fatherLabel].push(val);
            } else {
            this.testMutiData[fatherLabel] = [val];
            }
            const result = getMutiData(this.testMutiData)
            if (result.length < this.productAndSku.length) {
            let length = this.productAndSku.length - result.length
            this.productAndSku.splice(0, length)
            }
            let query = {
            num: result.length,
            sku_arr: this.productAndSku
            }
            getSkuCode(query).then(res => {
            setTimeout(() => {
                result.forEach((item, index, arr) => {
                    item.sku = res.data[index].sku
                    item.product_sku = res.data[index].product_sku
                    item.attr_price =  res.data[index].attr_price 
                    item.quantity =  res.data[index].quantity
                    item.barcode = 'does not apply'    
                })
                this.form.tableData = result
                }, 100)    
            })
            this.form.variantAttributeData.forEach(ele => {
                if (ele.name === this.form.attributesSelect) {   // 如果当前的新增的自定义属性名称相同    
                    if (this.getSameNum(val, ele.valueList) >= 2 && val) { // 下面的自定义属性名称已有重复的 并且当前已经输入了值
                        let hash = {}; 
                        ele.valueList = ele.valueList.reduce((preVal, curVal) => {
                        hash[curVal.val] ? '' : hash[curVal.val] = true && preVal.push(curVal); 
                        return preVal 
                        }, [])
                    } 
                    this.uploadList = ele.valueList.filter(son => son.val)
                }  
            })    
            if (this.getSameNameNum(item.name, this.tableHeadList) === 1) return false // 判断添加的头部有没有相同的
            this.tableHeadList.push(item.name)
        },
        // 双击单元格
        dubleClick(row, column, cell, event) {
            if (column.property === 'barcode') {
            return false
            }
            this.form.tableData.forEach(item => {
            item[column.property] = row[column.property]
            })
        },
        // 根据下拉框中的值遍历产生上传
        changeVariantVal(val) {
            this.form.variantAttributeData.forEach(item => {
                if (item.name === val) {
                    this.uploadList = item.valueList.filter(item => item.val)
                }
            })
            if (!val) {
            this.uploadList = []
            }
        },
        // 删除属性
        deleteAttr(index) {
            // if (this.form.customizeAttr.length === 1 ) {
            //     return false
            // }
            this.form.customizeAttr.splice(index, 1)
        },
        //处理表删除
        handleTableDelete(index, data) {
            this.productAndSku = this.productAndSku.filter(item => item.sku !== data.sku)
            this.form.tableData.splice(index ,1)
        },
        // 添加运输方式
        addShipping() {
            this.form.internalGroup.push({
                shipping_type: "", //运输方式
                free_shipping: false, //免运费
                shipping_cost: "", //运费
                add_shipping_cost: "", //附加费用
            });
        },
        // 移除运输方式
        deleShipping(index, str) {
            if (str === 'in') {
                this.form.internalGroup.splice(index, 1)
            } else {
                this.form.internationalGroup.splice(index, 1)
            }
        },
        // 添加不运送地区
        addRestrictedArea() {
            if (this.form.site === null || this.form.site === '') {
                this.$message({
                message: "请先选择站点",
                type: "warning"
                });
                return false;
            }
            this.showAreaDialog = true
            this.$set(this.recordCurrent, "title", "添加不运送地区");
                this.$set(
                this.recordCurrent,
                "noShipping",
                this.form.unavailable_shipping_location
            );
        },
        // 添加自定义属性按钮
        addAttr() {
            if (this.form.customizeAttr.length === 10) {
                return false
            }
            this.form.customizeAttr.push({
                name: "",
                value: ""
            });
        },
        areaPopupData(data) {
            let arr = [];
            if (data) {
              data.forEach(item => {
              arr.push(item.value);
              });
              this.form.unavailable_shipping_location = arr.join("|");
            } else {
              this.form.unavailable_shipping_location = ''
            }
            this.showAreaDialog = false;
        },
        // 不运送地区弹窗回调
        cancel_modal_location() {
            this.modal_localtion = false
        },
        //选择分类
        chooseCategory(num) {
            if (this.form.site === null || this.form.site === '') {
            this.$message({
                message: "请先选择站点",
                type: "warning"
            });
            return false;
            }
            this.productNo = num
            this.flag = true
            this.getProduct1List()
        },
        confiromCategory(num) {
            if (!String(this.form.site)) {
              this.$message({
                message: "请先选择站点",
                type: "warning"
              });
              return false;
            }
            if (!this.form.categoryOne && !this.form.categoryTwo) {
              this.$message({
                message: "请输入分类ID",
                type: "warning"
              });
              return false;
            }
            if (num === '1') {
              if (this.product1.filter(item => item.id == this.form.categoryOne).length) {
                this.$message({
                  type: 'warning',
                  message: `已有重复类目`
                })
                return false
              }
              getEbayCate({ ebay_cate_id: this.form.categoryOne, site_id: this.form.site }).then(res => {
                      if (JSON.stringify(res.data) !== '{}') {
                          let data = res.data
                          this.form.product1 = data.category_id
                          let product1Ids = ['']
                          product1Ids.push(...data.category_ids)
                          this.saveProduct1IdList[data.category_id] = JSON.parse(JSON.stringify(product1Ids))
                          this.saveProductNameList1[data.category_id] = JSON.parse(JSON.stringify(data.category_path))
                          this.product1.push({ id: data.category_id, label: data.category_name})
                      }
                      else {
                          this.$message({
                              type: 'warning',
                              message: `未找到类目`
                          })
                      }
                  })
            }
            if (num === '2') {
              if (this.product2.filter(item => item.id == this.form.categoryTwo).length) {
                this.$message({
                  type: 'warning',
                  message: `已有重复类目`
                })
                return false
              }
              getEbayCate({ ebay_cate_id: this.form.categoryTwo, site_id: this.form.site }).then(res => {
                      if (JSON.stringify(res.data) !== '{}') {
                          let data = res.data
                          this.form.product2 = data.category_id
                          let product2Ids = ['']
                          product2Ids.push(...data.category_ids)
                          this.saveProduct2IdList[data.category_id] = JSON.parse(JSON.stringify(product2Ids))
                          this.saveProductNameList2[data.category_id] = JSON.parse(JSON.stringify(data.category_path))
                          this.product2.push({ id: data.category_id, label: data.category_name})
                      }
                      else {
                          this.$message({
                              type: 'warning',
                              message: `未找到类目`
                          })
                      }
                  })
            }
            
        },
        chooseShops(num) {
            if (this.form.site === null || this.form.site === ''|| this.form.shop === null || this.form.shop === '') {
              this.$message({
                message: "请先选择站点和店铺",
                type: "warning"
              });
              return false;
            }
            this.shopsNo = num
            this.flag = false
            this.getShopClassList()
        },
        // 三级联动弹窗回调
        categoryaPopupData(data) {
            this.showCategoryaDialog = false;
        },
         //添加国外一行
        addInternationaShipping() {
            this.form.internationalGroup.push({
            shipping_type: "", //运输方式 transport
            shipping_cost: "", //运费 postage
            add_shipping_cost: "", //附加费用 attach
            global: true, //全球勾选
            //判断勾选
            shipping_location: _g.getJsonParse(this.availableLocation) //运送范围 country
            });
        },
        // 售卖形式变化控制
        salesChanges(e) {
            this.showPriceGroup = false; //控制 起拍价、保留价、一口价显示
            this.showWholesale = false; //控制 批发 显示
            this.showVariant = false; //控制变种属性、变种图片、变种参数 显示
            this.showBargain = false; //控制  接受买家还价 显示
            this.showQuantityInStock = false; //控制 库存数量 显示
            this.showFixedPrice = false; //控制 固价价格 显示
    
            if (e === 0) {
            this.showPriceGroup = true;
            this.showWholesale = true;
            this.form.listing_duration = this.flagListingListingduration
            }
            if (e === 1) {
            this.showFixedPrice = true;
            this.showQuantityInStock = true;
            this.showBargain = true;
            this.showWholesale = true;
            this.form.listing_duration = 0
            }
            if (e === 2) {
            this.showVariant = true;
            this.form.listing_duration = 0
            }
        },
         // 图片上传之前的钩子
        beforeUpload(file) {
            if (this.form.images.length === 12) {
                Loading.service({ fullscreen: true }).close();
                return false
            }
            let type_arr = ["image/jpeg", "image/png"];
            let type = file.type;
            if (!type_arr.includes(type)) {
            this.$message({
                message: "图片格式不正确，只支持 jpg 和 png 类型图片",
                type: "error"
            });
            return false;
            }
            let isSmall = file.size / 1024 > 10
            let islarge = file.size / 1024 > 10240 
            if (!isSmall || islarge) {
            this.$message({
                message: "file 必须介于 10 - 10240 KB 之间",
                type: "error"
            });
            return false;
            }
            Loading.service({ fullscreen: true, text: "图片上传中，请稍后" });
        },
        // 变种类型上传图片
        beforeUplaodAttr(file, item) {
            if (item.imagesList.length === 12) {
                Loading.service({ fullscreen: true }).close();
                return false
            }
            let type_arr = ["image/jpeg", "image/png"];
            let type = file.type;
            if (!type_arr.includes(type)) {
            this.$message({
                message: "图片格式不正确，只支持 jpg 和 png 类型图片",
                type: "error"
            });
            return false;
            }
            let isSmall = file.size / 1024 > 10
            let islarge = file.size / 1024 > 10240 
            if (!isSmall || islarge) {
            this.$message({
                message: "file 必须介于 10 - 10240 KB 之间",
                type: "error"
            });
            return false;
            }
            Loading.service({ fullscreen: true, text: "图片上传中，请稍后" });
        },
        // 自定义属性上传图片
        uplaodSuccessAttr(response, file, fileList, item) {
            let obj = { url: response.data.file }
            item.imagesList.push(obj)
            if (item.imagesList.length > 12) {
                item.imagesList.splice(11, item.imagesList.length - 12)
            }
            Loading.service({ fullscreen: true }).close();
        },
        // 删除图片
        productInfoRemove(index) {
            this.form.images.splice(index, 1);  
        },
        handlePictureCardPreview(src) {
            window.open(src)
        },
        // 删除属性中的图片
        productInfoRemoveUploadList(list, index) {
            list.splice(index, 1)
        },
        // 一键下载图片
        downloadImages(spu) {
            if (!spu) {
            this.$message({
                type: 'warning',
                message: `当前没有与商品中心的spu进行关联`
            })
            return false
            }
            downloadImagesApi({spu}).then(res => {
                download(res, 'Images.zip')
            })
        },
        confirmPastePath() {
            if (!this.picturePasteInput) {
              this.$message({
                type: 'warning',
                message: '请输入图片地址'
              })
              return false
            }
            let index = this.picturePasteInput.lastIndexOf('.') // 获取最后一个点的位置
            let imgStr = this.picturePasteInput.substr(index + 1); // 获取最后一个点后面的文本
            if (imgStr !== 'jpg' && imgStr !== 'jpeg' && imgStr !== 'png') {
              this.$message({
                type: 'warning',
                message: '请输入正确的图片地址'
              })
              return false
            }
            this.form.images.push({
              img_path: this.picturePasteInput
            });
        },
        // 全选国家
        handleCheckAllChange(item) {
            item.shipping_location.forEach(location => {
            location.select = true
            });
        },
        // 国外全球选择
        foreignGlobalChange(item, e) {
            console.log(e)
            console.log(1111)
            item.global = e;
            if (item.global) {
            item.shipping_location.forEach(c => {
                this.$set(c, "select", false);
            });
            }
            this.$forceUpdate()
            console.log(this.form.internationalGroup )
        },
        // 选择国家
        handleCheckedCitiesChange(transport, location, e) {},
        //锚链接
        returnTop(dom, index) {
            this.$el.querySelector(dom).scrollIntoView({
                behavior: "smooth"
            });
            this.active = index;
        },
        setData(dataTransfer) {
            dataTransfer.setData("Text", "");
        },

    }
}