import request from '@/utils/request'
/* 根据分类Id获取信息 */
export const getCategoryAttr = (query) => {
    return request({
        url: '/listing/prepublish/get_category_attr',
        method: 'get',
        params: query
    })
}
/* 根据不同站点获取价格 */
export const getSkuPrice = (params) => {
    return request({
        url: '/listing/prepublish/get_sku_price',
        method: 'get',
        params
    })
}
/* 根据分类名称获取所有的分类 */
export const getCategoryAttrList = (query) => {
    return request({
        url: '/listing/info/shop/category/search',
        method: 'get',
        params: query
    })
}
