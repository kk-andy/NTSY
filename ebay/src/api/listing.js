import request from '@/utils/http'
import { data } from 'autoprefixer'
let baseURL = process.env.VUE_APP_AUTH_API_PRODUCT
    /* listing */
    // 获取一级品类
export const getPeoduct1 = query => {
        return request({
            url: '/listing/info/product/category/level',
            method: 'get',
            params: query
        })
    }
    /* 公共接口 获取店铺和站点 */
export const getCommonsList = () => {
        return request({
            url: '/listing/prepublish/shopsitecurrency',
            method: 'get'
        })
    }
    /* 获取去店铺分类 */
export const getShopClassList = query => {
        return request({
            url: '/listing/info/shop/category/level',
            method: 'get',
            params: query
        })
    }
    /* 获取产品属性规格 */
export const getProductSpecifications = query => {
        return request({
            url: '/listing/info/product/specifics',
            method: 'get',
            params: query
        })
    }
    /* 获取模板信息 */
export const getListingConfig = query => {
        return request({
            url: '/listing/config/policy/find',
            method: 'get',
            params: query
        })
    }
    /* 运输政策-- 不可运送国家 */
export const getUnvailableLocation = query => {
        return request({
            url: '/listing/info/shipping/unavailable/location',
            method: 'get',
            params: query
        })
    }
    /* 获取可运送国家 */
export const getAvailableLocation = query => {
        return request({
            url: '/listing/info/shipping/available/location',
            method: 'get',
            params: query
        })
    }
    /* 获取运输方式 */
export const getShippingType = query => {
        return request({
            url: '/listing/info/shipping/type',
            method: 'get',
            params: query
        })
    }
    /* 退款政策下拉框 */
export const getRefundPolicye = query => {
        return request({
            url: '/listing/info/refund/policy',
            method: 'get',
            params: query
        })
    }
    /* 运输政策--获取国家/区域 */
export const getShippingCountries = query => {
        return request({
            url: '/listing/info/shipping/countries',
            method: 'get',
            params: query
        })
    }
    /* 运输政策--处理时间Options */
export const getshippingDispatchtime = query => {
        return request({
            url: '/listing/info/shipping/dispatchtime',
            method: 'get',
            params: query
        })
    }
    /* 编辑--产品分类下是否允多属性sku */
export const getAllowMultiattr = query => {
        return request({
            url: '/listing/info/category/allow/multiattr',
            method: 'get',
            params: query
        })
    }
    /* 编辑--其他政策--税收地区 */
export const getTaxLocation = query => {
        return request({
            url: '/listing/info/tax/location',
            method: 'get',
            params: query
        })
    }
    /* 生成upc编码 */
export const getUPCcode = () => {
        return request({
            url: '/listing/upc/generate',
            method: 'get',
        })
    }
    /* 创建listing */
export const createListing = (data) => {
        return request({
            url: '/listing/prepublish/editsku',
            method: 'post',
            data
        })
    }
    /* 加载spu信息 */
export const getSpuInfo = query => {
        return request({
            url: '/listing/prepublish/skuinfo',
            method: 'get',
            params: query
        })
    }
    /* 获取sku信息 */
export const getSkuInfo = query => {
        return request({
            url: '/listing/prepublish/skuinfo',
            method: 'get',
            params: query
        })
    }
    /* 获取产品sku码 */
export const getSkuCode = (data) => {
        return request({
            url: '/listing/prepublish/genskuarr',
            method: 'post',
            data
        })
    }
    //     /* 在线listing详情 */
    // export const getListingDetail = (query) => {
    //         return request({
    //             url: '/listing/listing/detail',
    //             method: 'get',
    //             params: query
    //         })
    //     }
    /* 刊登记录详情 */
export const getListingPublishrecordDetail = query => {
        return request({
            url: '/listing/publishrecord/detail',
            method: 'get',
            params: query
        })
    }
    /* 保存编辑刊登记录 */
export const savePublicationRecords = (data) => {
        return request({
            url: '/listing/publishrecord/update',
            method: 'post',
            data
        })
    }
    /* 在线listing更新 */
export const upadteListingDetail = (data) => {
        return request({
            url: '/listing/listing/update',
            method: 'post',
            data
        })
    }
    /* 获取模板 */
export const getTemplateList = (query) => {
        return request({
            url: '/listing/config/template/listing_list',
            method: 'get',
            params: query
        })
    }
    /* 复制listing获取详情和在线listing详情 */
export const getCopyListingDetail = (query) => {
        return request({
            url: '/listing/listing/detail',
            method: 'get',
            params: query
        })
    }
    /* 复制listing保存接口 */
export const copyCreateListing = (data) => {
        return request({
            url: '/listing/prepublish/editsku',
            method: 'post',
            data
        })
    }
    /* 侵权词 */
export const InfringementOfWord = (data) => {
        return request({
            url: '/api/v1/TortWords/checkTortWords',
            method: 'post',
            data,
            baseURL
        })
    }
    /* 获取itemId得信息 */
export const getItemInfo = (query) => {
        return request({
            url: '/listing/listing/detail/item',
            method: 'get',
            params: query
        })
    }
    /* 一键插图获取图片url */
export const getImagePath = (data) => {
    return request({
        url: '/listing/tool/image/upload_url',
        method: 'post',
        data
    })
}
export const downloadImagesApi = (query) => {
        return request({
            url: '/listing/prepublish/getImgs',
            method: 'get',
            params: query,
            responseType: 'blob'
        })
    }
    // 费用检测
export const verifyAddItem = (data) => {
    return request({
        url: '/listing/verifyAddItem',
        method: 'post',
        data
    })
}
/* 单个或批量开启议价 */
export const openBargainingAPI = data => {
    return request({
        url: '/listing/manage/best_offer_open',
        method: 'post',
        data
    })
}
/* 单个或批量关闭议价 */
export const closeBargainingAPI = data => {
    return request({
        url: '/listing/manage/best_offer_close',
        method: 'post',
        data
    })
}
/* 搜索获取产品分类 */
export const searchCatagoryList = params => {
    return request({
        url: '/listing/info/category/search',
        method: 'get',
        params
    })
}