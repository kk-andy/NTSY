import request from '@/utils/request'

export const getAssessabnormal = (query) => {
    return request({
        url: '/index.php/api/v1/assessabnormal',
        method: 'get',
        params: query,
    })
}
export const restore = (query) => {
    return request({
        url: '/index.php/api/v1/assessabnormal/restore',
        method: 'get',
        params: query,
    })
}
export const read = (query) => {
    return request({
        url: '/index.php/api/v1/assessabnormal/read',
        method: 'get',
        params: query,
    })
}
export const checkRead = (query) => {
    return request({
        url: '/index.php/api/v1/assesscompletedrecord/read',
        method: 'get',
        params: query,
    })
}
// 二次返款提交
export const submit = (data) => {
    return request({
        url: '/index.php/api/v1/assessrefundagain/submit',
        method: 'post',
        data
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
//导出
export const exportRecord = (query) => {
    return request({
        url: '/index.php/api/v1/assessabnormal/exportrecord',
        method: 'get',
        params: query,
        responseType: 'blob',
    })
}