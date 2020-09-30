import request from '@/utils/request'
/*
    获取有权限控制的店铺列表
*/
export const getShopList = () => {
    return request({
        url: '/listing/info/shop_list',
        method: 'get',
    })
}
/* 获取销售人员列表 */
export const getSellerlist =  () => {
    return request({
        url: '/listing/info/staff/sellerlist',
        method: 'get'
    })
}

/* 获取所有站点 */
export const getSiteList = () => {
    return request({
        url: '/listing/info/site_list',
        method: 'get'
    })
}
/* 获取模板列表 */
export const getTemplateList = () => {
    return request({
        url:'/listing/config/template/listing_list',
        method: 'get'
    })
}
/* 获取产品线 */
export const getProductLine = () => {
    return request({
        url: '/listing/info/product_cate',
        method: 'get'
    })
}
/* 获取最近使用的品牌 */
export const getBrandInfo = () => {
    return request({
        url: '/listing/prepublish/brandinfo',
        method: 'get'
    })
}
/* 获取lazada平台状态 */
export const getLazadaStatusList = () => {
    return request({
        url: '/listing/info/lazada_status',
        method: 'get'
    })
}
/* 获取同步事项列表 */
export const getSyncList = () => {
    return request({
        url: '/listing/info/data_sync_status',
        method: 'get'
    })
}
/* 获取店铺运输方式 */
export const getShopMethod = () => {
    return request({
        url: '/listing/info/shipping_list',
        method: 'get'
    })
}

/*获取开发人员列表*/
export const getDevelperList = () => {
    return request({
        url: '/listing/info/develper_list',
        method: 'get',
    })
}
/* 获取无权限控制的店铺列表 */
export const getNoPermissionsShops = () => {
    return request({
        url: '/listing/listing/shop_list',
        method: 'get',
    })
}
/* 获取lazada帐号列表 */
export const getLazadaAccountList = () => {
    return request({
        url: '/listing/info/account_list',
        method: 'get'
    })
}