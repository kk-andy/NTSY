import request from '@/utils/request'
// 获取需求列表
export const getPurchaser = (query) => {
    return request({
        url: '/index.php/api/v1/assessdemand',
        method: 'get',
        params: query,
    })
}
// 新增需求
export const purchaserCreate = data => {
    return request({
        url: '/index.php/api/v1/assessdemand/create',
        method: 'post',
        data
    })
}
// 更新需求
export const purchaserUpdate = data => {
    return request({
        url: '/index.php/api/v1/assessdemand/update',
        method: 'post',
        data,
    })
}
// 获取需求详情
export const purchaserRead = (query) => {
    return request({
        url: '/index.php/api/v1/assessdemand/read',
        method: 'get',
        params: query,
    })
}
// 提交审核
export const purchaserPush = (query) => {
    return request({
        url: '/index.php/api/v1/assessdemand/push',
        method: 'get',
        params: query,
    })
}
//批量提交
export function allSubmit(arg) {
    return request({
        url: "/index.php/api/v1/assessdemand/batchpush",
        method: "get",
        params: arg
    })
}
// 复制需求
export const purchaserCopy = (query) => {
    return request({
        url: '/index.php/api/v1/assessdemand/copy',
        method: 'get',
        params: query,
    })
}
// 审核派发-列表
export const getAssessrelease = (query) => {
    return request({
        url: '/index.php/api/v1/assessrelease',
        method: 'get',
        params: query,
    })
}
// 审核派发-详情
export const assessreleaseRead = (query) => {
    return request({
        url: '/index.php/api/v1/assessrelease/read',
        method: 'get',
        params: query,
    })
}
// 审核派发-提交
export const assessreleaseSubmit = data => {
    return request({
        url: '/index.php/api/v1/assessrelease/submit',
        method: 'post',
        data,
    })
}
// 审核派发-驳回/批量驳回
export const assessreleaseReject = (query) => {
    return request({
        url: '/index.php/api/v1/assessrelease/reject',
        method: 'get',
        params: query,
    })
}
// 审核派发-自动匹配买家账号
export const autoassign = (query) => {
    return request({
        url: '/index.php/api/v1/assessrelease/autoassign',
        method: 'get',
        params: query,
    })
}
