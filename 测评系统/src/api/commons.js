import request from '@/utils/request'
//用户信息
export function getUserName(arg) {
    return request({
        url: "/index.php/api/v1/baseinfo/userinfo",
        method: "get",
        params: arg
    })
}
// 服务项目
export const getServiceitem = (data) => {
    return request({
        url: '/index.php/api/v1/baseinfo/serviceitem',
        method: 'get',
        params: data,
    })
}
// 需求人
export const getDemanderlist = (data) => {
    return request({
        url: '/index.php/api/v1/baseinfo/demanderlist',
        method: 'get',
        params: data,
    })
}
// 站点
export const getSitelist = (data) => {
    return request({
        url: '/index.php/api/v1/baseinfo/sitelist',
        method: 'get',
        params: data,
    })
}
// 平台
export const getPlatformlist = (data) => {
    return request({
        url: '/index.php/api/v1/baseinfo/platformlist',
        method: 'get',
        params: data,
    })
}
// 币种
export const getCurrency = (data) => {
    return request({
        url: '/index.php/api/v1/baseinfo/currency',
        method: 'get',
        params: data,
    })
}
// 测评人
export const getFollowerlist = (data) => {
    return request({
        url: '/index.php/api/v1/baseinfo/followerlist',
        method: 'get',
        params: data,
    })
}
// 结算渠道
export const getPaymenttype = (data) => {
    return request({
        url: '/index.php/api/v1/baseinfo/paymenttype',
        method: 'get',
        params: data,
    })
}
// 结算方式
export const getPaymentmethod = (data) => {
    return request({
        url: '/index.php/api/v1/baseinfo/paymentmethod',
        method: 'get',
        params: data,
    })
}
// 手续费
export const getChangetype = (data) => {
    return request({
        url: '/index.php/api/v1/baseinfo/changetype',
        method: 'get',
        params: data,
    })
}
// 评论星级
export const getReviewrating = (data) => {
    return request({
        url: '/index.php/api/v1/baseinfo/reviewrating',
        method: 'get',
        params: data,
    })
}
// 需求人组别
export const getDemanddept = (data) => {
    return request({
        url: '/index.php/api/v1/baseinfo/demanddept',
        method: 'get',
        params: data,
    })
}
// 买家号账号状态
export const getBuyerstatus = (data) => {
    return request({
        url: '/index.php/api/v1/baseinfo/buyerstatus',
        method: 'get',
        params: data,
    })
}
// const firstCateBaseURL = process.env.NODE_ENV === 'production' ? 'http://amazon.back.nantang-tech.com' : 'http://test.amazon.api.nantang-tech.com'
// const firstCateBaseURL = 'http://amazon.back.nantang-tech.com'
const firstCateBaseURL = process.env.VUE_APP_ISTEST == "istest" ? 'http://test.amazon.api.nantang-tech.com' : 'http://amazon.back.nantang-tech.com';
//购物习惯
export const getFirstCate = (arg) => {
    return request({
        url: "/listing/base/getFirstCate",
        method: 'get',
        params: arg,
        baseURL: firstCateBaseURL
    })
}
//信用卡号
export function getCreditcardList(arg) {
    return request({
        url: "/index.php/api/v1/baseinfo/creditcardlist",
        method: "get",
        params: arg
    })
}
// 信用卡状态
export const getCreditcardstatus = (data) => {
    return request({
        url: '/index.php/api/v1/baseinfo/creditcardstatus',
        method: 'get',
        params: data,
    })
}
// 信用卡渠道
export const getCreditcardchannel = (data) => {
    return request({
        url: '/index.php/api/v1/baseinfo/creditcardchannel',
        method: 'get',
        params: data,
    })
}
// 数据权限-选择部门组别
export const getuserdept = (data) => {
    return request({
        url: '/index.php/api/v1/baseinfo/userdept',
        method: 'get',
        params: data,
    })
}
// 退款原因
export const getRefundreason = (data) => {
    return request({
        url: '/index.php/api/v1/baseinfo/refundreason',
        method: 'get',
        params: data,
    })
}
// 根据员工id获取员工部门
export const getstaffdept = (data) => {
    return request({
        url: '/index.php/api/v1/baseinfo/getstaffdept',
        method: 'get',
        params: data,
    })
}
// 获取所有店铺
export const getshoplist = (data) => {
    return request({
        url: '/index.php/api/v1/baseinfo/getshoplist',
        method: 'get',
        params: data,
    })
}
// 根据服务类别id获取服务费用
export const getserverfee = (data) => {
    return request({
        url: '/index.php/api/v1/baseinfo/getserverfee',
        method: 'get',
        params: data,
    })
}
// 根据sku获取商品名称
export const getproductName = (data) => {
    return request({
        url: '/index.php/api/v1/assessdemand/productName',
        method: 'get',
        params: data,
    })
}
// 平台费承担方
export const platformcost = () => {
    return request({
        url: '/index.php/api/v1/baseinfo/platformcost',
        method: 'get',
    })
}
// 异常归档
export const assessorderAbnormalFile = (data) => {
    return request({
        url: '/index.php/api/v1/assessorder/abnormalFile',
        method: 'get',
        params: data,
    })
}
// 测评系统员工部门列表
export const staffdept = (data) => {
    return request({
        url: '/index.php/api/v1/baseinfo/staffdept',
        method: 'get',
        params: data,
    })
}
export default {
    getPlatformlist,
    getSitelist,
    getBuyerstatus,
    getCreditcardchannel,
    getCreditcardstatus,
    getCurrency,
    platformcost,
    getCreditcardList,
    getFirstCate
}
