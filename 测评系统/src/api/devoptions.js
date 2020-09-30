import request from '@/utils/request'
const baseURL = process.env.VUE_APP_BASE_API_Puyuan
export const GetBasicEditingoption = () => { //所以下拉框
    return request({
        url: '/api/v1/product_editor/selectList',
        method: 'get',
    })
}
export const supplierName = (key) => { //供应商模糊
    return request({
        url: '/api/v1/functions/searchSupplier',
        method: 'get',
        params: { key }
    })
}
export const departName = (staff_id) => { //开发人部门
    return request({
        url: '/api/v1/functions/searchDepartList',
        method: 'get',
        params: { staff_id }
    })
}
export const catIdTwo = (id) => { //二级品类
    return request({
        url: '/api/v1/functions/getCat2',
        method: 'get',
        params: { id }
    })
}
export const newInformation = (data) => { //新建
    return request({
        url: '/api/v1/product_editor/createProduct',
        method: 'post',
        data
    })
}
export const getInformation = (spu) => { //获取编辑
    return request({
        url: '/api/v1/product_editor/productBaseInfo',
        method: 'get',
        params: { spu }
    })
}
export const saveBaseInfo = (data) => { //编辑保存
    return request({
        url: '/api/v1/product_editor/saveBaseInfo',
        method: 'post',
        data
    })
}

/-------------------多款式信息-----------------/
export const styleList = (spu) => { //多款式信息(获取)下拉框
    return request({
        url: '/api/v1/product_editor/skuStyleInfo',
        method: 'get',
        params: { spu }
    })
}
export const createSkuList = (data) => { //多款式信息生成
    return request({
        url: '/api/v1/product_editor/createSkuList',
        method: 'post',
        data
    })
}
export const saveSkuList = (data) => { //生成多款式信息列表
    return request({
        url: '/api/v1/product_editor/saveSkuList',
        method: 'post',
        data
    })
}
export const skuListInfo = (data) => { //获取多款式信息
    return request({
        url: '/api/v1/product_editor/skuListInfo',
        method: 'get',
        params: data
    })
}
/-----------------产品文案--------------------/
export const productCopy = (data) => { //产品文案保存
    return request({
        url: '/api/v1/product_editor/saveContent',
        method: 'post',
        data
    })
}

export const getContent = (data) => { //产品文案获取
    return request({
        url: '/api/v1/product_editor/getContent',
        method: 'get',
        params: data
    })
}

export const checkTortWords = (words) => { //是否存在侵权词
    return request({
        url: '/api/v1/TortWords/checkTortWords',
        method: 'post',
        params: { words }
    })
}
/=----------------------产品底图------------/
export const baseImageInfo = (spu) => { //产品底图获取
    return request({
        url: '/api/v1/product_editor/baseImageInfo',
        method: 'get',
        params: { spu }
    })
}
export const saveBaseImage = (data) => { //产品底图保存
    return request({
        url: '/api/v1/product_editor/saveBaseImage',
        method: 'post',
        data
    })
}
/------------------------中英文申报名审核-是否存在禁用词------------------------/
export const checkDeclareWords = (data) => { //中英文申报名审核-是否存在禁用词
    return request({
        url: '/api/v1/TortWords/checkDeclareWords',
        method: 'get',
        params: data
    })
}
/----------------------设计作图---------------------------/
export const designImageInfo = (data) => { //获取
    return request({
        url: '/api/v1/design/designImageInfo',
        method: 'get',
        params: data
    })
}
export const saveDesignImage = (data) => { //保存
    return request({
        url: '/api/v1/design/saveDesignImage',
        method: 'post',
        data
    })
}
/---------------产品池编辑------------/
export const skuBaseInfopool = (sku) => { //产品池编辑获取
    return request({
        url: '/api/v1/product_pool/skuBaseInfo',
        method: 'get',
        params: { sku }
    })
}
export const saveBaseInfopool = (data) => { //产品池编辑保存
    return request({
        url: '/api/v1/product_pool/saveBaseInfo',
        method: 'post',
        data
    })
}
export const getSkuInfo = (sku) => { //多款式获取
    return request({
        url: '/api/v1/product_pool/getSkuInfo',
        method: 'get',
        params: { sku }
    })
}
export const saveSkuInfo = (data) => { //多款式保存
    return request({
        url: '/api/v1/product_pool/saveSkuInfo',
        method: 'post',
        data
    })
}
/---------------产品池-获取spu对应仓库库存------------/
export const getStockItem = (sku,token) => { //产品池-获取spu对应仓库库存
    return request({
        url: '/rest/api/stock/store',
        method: 'get',
        params: { sku },
        baseURL,
        headers:{
            'Authorization':token
        }
    })
}
export const Authorize = (data) => { //获取token
    return request({
        url: '/rest/authorization/authorize',
        method: 'get',
        params:data,
        baseURL
    })
}
export const getStockqty = (sku,token) => { //查询指定SKU在各个仓库的销量
    return request({
        url: '/rest/api/trade/qty',
        method: 'get',
        params:{sku},
        baseURL,
        headers:{
            'Authorization':token
        }
    })
}
export const getTradeqty = (sku,token) => { //查询指定SKU在各个仓库的销量仓库库存
    return request({
        url: '/rest/api/stock/qty',
        method: 'get',
        params:{sku},
        baseURL,
        headers:{
            'Authorization':token
        }
    })
}
/-------------------------------/
export const searchSku = (query) => {
    return request({
        url: '/api/v1/Combination/searchSku',
        method: 'get',
        params:query
    })
}
/----------------- 开品数量----------------/
export const getProductQuantity = (query) => {
    return request({
        url: '/api/v1/productStatistics/getProductQuantity', ///api/v1/supplier/add
        method: 'get',
        params:query
    })
}