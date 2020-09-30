import request from '@/utils/request'
export const getData = (params) => {
    return request({
        url: '/listing/account/list',
        method: 'get',
        params
    })
}
export const getAccountInfo = (params) => {
    return request({
        url: '/listing/account/accountinfo',
        method: 'get',
        params
    })
}
export const editAccountInfo = (data) => {
    return request({
        url: '/listing/account/edit',
        method: 'post',
        data
    })
}