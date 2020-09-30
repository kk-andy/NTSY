import request from '@/utils/request'
import { data } from 'autoprefixer'
/* 数据权限 商品中心用户 */
export const getList = query => {
    return request({
        url: '/api/v1/Developer/index',
        method: 'get',
        params: query
    })
}
export const editEmployees = data => {
    return request({
        url: '/api/v1/Developer/editDeveloper',
        method: 'post',
        data
    })
}
export const configurationPermission = data => {
    return request({
        url: '/api/v1/Developer/assignAuth',
        method: 'post',
        data
    })
}
export const exportData = (data) => {
    return request({
        url: '/api/v1/Developer/export',
        method: 'post',
        data,
        responseType: 'blob'
    })
}
export const getAssignAuth = query => {
    return request({
        url: '/api/v1/Developer/assignAuth',
        method: 'get',
        params: query
    })
}