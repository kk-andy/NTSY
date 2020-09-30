import request from '@/utils/http'
// 获取店铺列表
export const getshop_list = (params) => {
    return request({
        url: '/listing/marketing/shop_list',
        method: 'get',
        params
    })
}
// 获取产品分类
export const getproduct_cats_info = (params) => {
    return request({
        url: '/listing/marketing/product_cats_info',
        method: 'get',
        params
    })
}
// 获取店铺分类
export const getshop_cats_info = (params) => {
    return request({
        url: '/listing/marketing/shop_cats_info',
        method: 'get',
        params
    })
}
// 获取商品列表
export const getitem_list = (params) => {
    return request({
        url: '/listing/marketing/item_list',
        method: 'get',
        params
    })
}
// 商品变更（添加、移除）
export const change_listings = (data) => {
    return request({
        url: '/listing/marketing/change_listings',
        method: 'post',
        data
    })
}
// 创建规则页 获取商品列表
export const get_listings = (params) => {
    return request({
        url: '/listing/marketing/get_listings',
        method: 'get',
        params
    })
}
// 获取站点信息
export const getsite_list = (params) => {
    return request({
        url: '/listing/marketing/site_list',
        method: 'get',
        params
    })
}
// 获取关联营销规则列表
export const getrule_list = (params) => {
    return request({
        url: '/listing/marketing/rule_list',
        method: 'get',
        params
    })
}
// 新增关联营销规则
export const addRule = (data) => {
    return request({
        url: '/listing/marketing/add',
        method: 'post',
        data
    })
}
// 查询关联营销规则
export const selectRule = (params) => {
    return request({
        url: '/listing/marketing/select',
        method: 'get',
        params
    })
}
// 修改关联营销规则
export const editRule = (data) => {
    return request({
        url: '/listing/marketing/edit',
        method: 'post',
        data
    })
}
// 删除关联营销规则
export const deleteRule = (params) => {
    return request({
        url: '/listing/marketing/delete',
        method: 'get',
        params
    })
}
// 获取处理队列列表
export const gettask_list = (params) => {
    return request({
        url: '/listing/marketing/task_list',
        method: 'get',
        params
    })
}