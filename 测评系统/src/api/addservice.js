import request from '@/utils/request'
// 服务项目价卡-新增
export const serviceCreate = (data) => {
    return request({
        url: '/index.php/api/v1/serviceitem/create',
        method: 'post',
        data,
    })
}
// 服务项目价卡-更新
export const serviceUpdate = (data) => {
    return request({
        url: '/index.php/api/v1/serviceitem/update',
        method: 'post',
        data,
    })
}
export const serviceRead = (query) => {
    return request({
        url: '/index.php/api/v1/serviceitem/read',
        method: 'get',
        params: query,
    })
}
//