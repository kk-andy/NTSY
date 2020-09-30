import request from '@/utils/request'

export const getData = data => {
    return request({
        url: '/listing/data/list',
        method: 'POST',
        data
    })
}
/* 重新同步 */
export const batchSync = data => {
    return request({
        url: '/listing/data/batch_sync',
        method: 'POST',
        data
    })
}