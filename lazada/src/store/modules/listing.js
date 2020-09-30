import { getCategoryAttr } from '@/api/listing'
import { loading, loadingClose } from '@/utils/common';
let priceReg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
let weightReg = /(^[1-9]\d*(\.\d{1,3})?$)|(^0(\.\d{1,3})?$)/;
const priceValidate = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入数值'));
    } else {
        if (!priceReg.test(value)) {
            callback(new Error('请输入正确的数值,整数或者保留两位小数'));
        } else {
            callback()
        }
    }
};
const weighValidate = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入数值'));
    } else {
        if (!weightReg.test(value)) {
            callback(new Error('请输入正确的数值,整数或者保留三位小数'));
        } else {
            callback()
        }
    }
};
const state = {
    modules: [{
            id: 0,
            name: "基础信息"
        },
        {
            id: 1,
            name: "产品信息"
        },
        {
            id: 2,
            name: "分类信息"
        },
        {
            id: 3,
            name: "包装信息"
        },
        {
            id: 4,
            name: "变种信息"
        },
        {
            id: 5,
            name: "变种缩略图"
        },
        {
            id: 6,
            name: "变种图片"
        },
        {
            id: 7,
            name: "描述信息"
        },
    ],
    variantPictureList: [],
    lazadaTableHead: [],
    lazadaAttrsList: [],
    rules: {
        shop: [{ required: true, message: "请选择店铺", trigger: "change" }],
        classCategory: [{ required: true, message: "请选择分类", trigger: "change" }],
        product_title: [{ required: true, message: "请输入产品标题", trigger: "blur" }],
        brand: [{ required: true, message: "请输入或选择品牌", trigger: "change" }],
        tax: [{ required: true, message: "请选择税率", trigger: "change" }],
        weight: [{ validator: weighValidate,  trigger: "blur" }],
        length: [{ validator: priceValidate, trigger: "blur" }],
        width: [{ validator: priceValidate, trigger: "blur" }],
        height: [{ validator: priceValidate, trigger: "blur" }],
        packagingContent: [{  required: true, message: "请输入包装内容", trigger: "blur" } ],
        shortDescription: [{ required: true, message: "请输入短描述", trigger: "blur" }],
        product_title_malai: [{ required: true, message: "请输入产品标题", trigger: "blur" }],
        model: [{ required: true, message: "请选择输入型号", trigger: "blur" }],
        type: [{  required: true, message: "请选择质保类型", trigger: "change" } ]
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
    taxList: [
        {
            label: 'default',
            value: 'default'
        },
        {
            label: 'tax6',
            value: 'tax6'
        }
    ]
}
const mutations = {
    GET_CATEGORY_ATTR(state, data) {
        console.log(data)
        data.lazada_product_info.warranty_type.options = data.lazada_product_info.warranty_type.options ? data.lazada_product_info.warranty_type.options.split(',') : []
        state.lazada_product_info = data.lazada_product_info
        data.lazada_category_attr_info.forEach(item => {
            item.value = ''
            item.is_mandatory = item.is_mandatory ? true : false
            if (item.input_type === 'multiEnumInput') {
                item.value = []
                item.select = false
            }
        })
        state.lazadaAttrsList = data.lazada_category_attr_info
        state.lazadaTableHead = data.lazada_category_attr_sku_info
        console.log(state.lazadaAttrsList)
    }
}
const actions = {
    async getCategoryAttr({ commit }, query) {
        loading()
        await getCategoryAttr(query).then(res => {
            commit('GET_CATEGORY_ATTR', res.data)
            loadingClose()
        }).catch(err => {
            loadingClose()
        })
    }
}
export default {
    namespaced: true,
    mutations,
    actions,
    state
}