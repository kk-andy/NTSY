import request from '@/utils/request'
import {
    get
} from 'sortablejs'
// 获取买家号库列表
export const getPurchaser = (query) => {
    return request({
        url: '/index.php/api/v1/purchaser',
        method: 'get',
        params: query,
    })
}
// 买家号库-详情
export const purchaserRead = (query) => {
    return request({
        url: '/index.php/api/v1/purchaser/read',
        method: 'get',
        params: query,
    })
}
// 买家号库-新增
export const purchaserCreate = (data) => {
    return request({
        url: '/index.php/api/v1/purchaser/create',
        method: 'post',
        data,
    })
}
// 买家号库-更新
export const purchaserUpdate = (data) => {
    return request({
        url: '/index.php/api/v1/purchaser/update',
        method: 'post',
        data,
    })
}
// 信用卡库-详情
export const creditcardRead = (query) => {
    return request({
        url: '/index.php/api/v1/creditcard/read',
        method: 'get',
        params: query,
    })
}
//购物习惯
export const getFirstCate = (arg) => {
    return request({
        url: "/listing/base/getFirstCate",
        method: get,
        params: arg
    })
}
// 信用卡库-新增
export const creditcardCreate = (data) => {
    return request({
        url: '/index.php/api/v1/creditcard/create',
        method: 'post',
        data,
    })
}
// 信用卡库-更新
export const creditcardUpdate = (data) => {
    return request({
        url: '/index.php/api/v1/creditcard/update',
        method: 'post',
        data,
    })
}
export const getCreditcard = (query) => {
    return request({
        url: '/index.php/api/v1/creditcard',
        method: 'get',
        params: query,
    })
}
// 
export const getServiceitem = (query) => {
    return request({
        url: '/index.php/api/v1/serviceitem',
        method: 'get',
        params: query,
    })
}
//买家号库-导出记录
export const purchaserExport = (query) => {
    return request({
        url: '/index.php/api/v1/purchaser/export',
        method: 'get',
        params: query,
        responseType: 'blob',
    })
}
//信用卡库-导出记录
export const creditcardExport = (query) => {
    return request({
        url: '/index.php/api/v1/creditcard/export',
        method: 'get',
        params: query,
        responseType: 'blob',
    })
}
//服务项目-导出记录
export const serviceitemExport = (query) => {
    return request({
        url: '/index.php/api/v1/serviceitem/export',
        method: 'get',
        params: query,
        responseType: 'blob',
    })
}
//dashboard页面
export const getdashboard = (query) => {
    return request({
        url: '/index.php/api/v1/serviceitem/dashboard',
        method: 'get',
        params: query,
    })
}
