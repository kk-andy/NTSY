import request from '@/utils/request'
// 获取评测下单-列表
export const getAssessorder = (query) => {
    return request({
        url: '/index.php/api/v1/assessorder',
        method: 'get',
        params: query,
    })
}
// 评测下单-获取详情
export const assessorderRead = (query) => {
    return request({
        url: '/index.php/api/v1/assessorder/read',
        method: 'get',
        params: query,
    })
}
// 评测下单-提交
export const assessorderSubmit = data => {
    return request({
        url: '/index.php/api/v1/assessorder/submit',
        method: 'post',
        data,
    })
}
// 评测下单-更改测评人
export const assessorderChangeFollower = (query) => {
    return request({
        url: '/index.php/api/v1/assessorder/changeFollower',
        method: 'get',
        params: query,
    })
}
// 评测下单-异常归档
export const assessorderAbnormalFile = (query) => {
    return request({
        url: '/index.php/api/v1/assessorder/abnormalFile',
        method: 'get',
        params: query,
    })
}
// 获取物流跟踪列表
export const getAssessship = (query) => {
    return request({
        url: '/index.php/api/v1/assessship',
        method: 'get',
        params: query,
    })
}
// 物流跟踪-获取详情
export const assessshipRead = (query) => {
    return request({
        url: '/index.php/api/v1/assessship/read',
        method: 'get',
        params: query,
    })
}
// 物流跟踪-提交
export const assessshipSubmit = data => {
    return request({
        url: '/index.php/api/v1/assessship/submit',
        method: 'post',
        data,
    })
}
// 物流跟踪-物流信息
export const assessshipShipInfo = (query) => {
    return request({
        url: '/index.php/api/v1/assessship/shipInfo',
        method: 'get',
        params: query,
    })
}
// 获取留评跟踪列表
export const getAssessreview = (query) => {
    return request({
        url: '/index.php/api/v1/assessreview',
        method: 'get',
        params: query,
    })
}
// 留评跟踪-获取详情
export const assessreviewRead = (query) => {
    return request({
        url: '/index.php/api/v1/assessreview/read',
        method: 'get',
        params: query,
    })
}
// 留评跟踪-提交
export const assessreSubmit = data => {
    return request({
        url: '/index.php/api/v1/assessreview/submit',
        method: 'post',
        data,
    })
}
// 获取运营审核列表
export const getAssessselleraudit = (query) => {
    return request({
        url: '/index.php/api/v1/assessselleraudit',
        method: 'get',
        params: query,
    })
}
// 运营审核-详情
export const assesssellerauditRead = (query) => {
    return request({
        url: '/index.php/api/v1/assessselleraudit/read',
        method: 'get',
        params: query,
    })
}
// 运营审核-提交
export const assesssellerauditRelease = (query) => {
    return request({
        url: '/index.php/api/v1/assessselleraudit/release',
        method: 'get',
        params: query,
    })
}
// 运营审核-批量提交
export const assesssellerauditBatchrelease = (query) => {
    return request({
        url: '/index.php/api/v1/assessselleraudit/batchrelease',
        method: 'get',
        params: query,
    })
}