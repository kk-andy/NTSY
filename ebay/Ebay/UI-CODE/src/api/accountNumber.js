import request from '@/utils/http'
export const getBaseSessionId = (params) => {
    return request({
        url: '/listing/base/session_id',
        method: 'get',
        params
    })
}
export const getBaseToken = (params) => {
    return request({
        url: '/listing/base/token',
        method: 'get',
        params
    })
}