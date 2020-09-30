import request from '@/utils/request'
// 获取返款操作列表
export const getAssessrefund = (query) => {
    return request({
        url: '/index.php/api/v1/assessrefund',
        method: 'get',
        params: query,
    })
}
// 返款操作-详情
export const assessrefundRead = (query) => {
    return request({
        url: '/index.php/api/v1/assessrefund/read',
        method: 'get',
        params: query,
    })
}
// 返款操作-提交
export const assessrefundSubmit = (data) => {
    return request({
        url: '/index.php/api/v1/assessrefund/submit',
        method: 'post',
        data
    })
}
// 获取二次返款列表
export const getAssessrefundagain = (query) => {
    return request({
        url: '/index.php/api/v1/assessrefundagain',
        method: 'get',
        params: query,
    })
}
// 二次返款-详情
export const assessrefundagainRead = (query) => {
    return request({
        url: '/index.php/api/v1/assessrefundagain/read',
        method: 'get',
        params: query,
    })
}
// 二次返款-提交
export const assessrefundagainSubmit = (data) => {
    return request({
        url: '/index.php/api/v1/assessrefundagain/submit',
        method: 'post',
        data
    })
}
// 获取信用卡充值列表
export const getCreditcardrechange = (query) => {
    return request({
        url: '/index.php/api/v1/creditcardrechange',
        method: 'get',
        params: query,
    })
}
// 信用卡充值-详情
export const creditcardrechangeRead = (query) => {
    return request({
        url: '/index.php/api/v1/creditcardrechange/read',
        method: 'get',
        params: query,
    })
}
// 信用卡充值-提交
export const creditcardrechangeCreate = (data) => {
    return request({
        url: '/index.php/api/v1/creditcardrechange/create',
        method: 'post',
        data,
    })
}