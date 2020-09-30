import request from '@/utils/request'
// 获取需求列表
export const getAssesscompletedrecord = (query) => {
    return request({
        url: '/index.php/api/v1/assesscompletedrecord',
        method: 'get',
        params: query,
    })
}
//refundAgain
export const refundAgain = data => {
    return request({
        url: '/index.php/api/v1/assesscompletedrecord/refundAgain',
        method: 'post',
        data,
    })
}
//导出
export const exportRecord = (query) => {
    return request({
        url: '/index.php/api/v1/assesscompletedrecord/exportrecord',
        method: 'get',
        params: query,
        responseType: 'blob',
    })
}