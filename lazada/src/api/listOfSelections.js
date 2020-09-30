import request from '@/utils/request'
import { data } from 'autoprefixer'
export const getData = (query) => {
    return request({
        url: '/listing/prepublish/list',
        method: 'get',
        params: query
    })
}
/* 编辑界面获取sku信息 */
export const getSkuInfo = (query) => {
    return request({
        url: '/listing/prepublish/skuinfo',
        method: 'get',
        params: query
    })
}
/* 保存刊登选品列表 */
export const saveSkuInfo = (data) => {
    return request({
        url: '/listing/prepublish/editsku',
        method: 'post',
        data
    })
}
/* 根据不同的站点获取六合一的数据 */
export const getSitePrice = params => {
    return request({
        url: '/listing/prepublish/get_site_price',
        method: 'get',
        params
    })
}

// 得到二级产品的数据
export const  getProductTwoLine = params => {
    return request({
        url: '/listing/info/product_cate_two',
        method: 'get',
        params
    })
}