import request from '@/utils/request'

export const getAssessauth = (query) => {
    return request({
        url: '/index.php/api/v1/assessauth',
        method: 'get',
        params: query,
    })
}
export const assessauthRead = (query) => {
    return request({
        url: '/index.php/api/v1/assessauth/read',
        method: 'get',
        params: query,
    })
}
export const assessauthUpdate = data => {
    return request({
        url: '/index.php/api/v1/assessauth/update',
        method: 'post',
        data,
    })
}