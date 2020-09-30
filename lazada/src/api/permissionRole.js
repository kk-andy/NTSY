import request from '@/utils/request'
import { data } from 'autoprefixer'
import { resolvePlugin } from '@babel/core'

/* 数据权限 数据权限角色 */
export const getList = query => {
    return request({
        url: '/api/v1/Productrole/index',
        method: 'get',
        params: query
    })
}
export const deleteData = data => {
    return request({
        url: '/api/v1/Productrole/delRole',
        method: 'post',
        data
    })
}
export const getPermissonsList = () => {
    return request({
        url: '/api/v1/Productrole/addRole',
        method: 'get',
    })
}
export const addRole = data => {
    return request({
        url: '/api/v1/Productrole/addRole',
        method: 'post',
        data
    })
}
export const editRole = query => {
    return request({
        url: '/api/v1/Productrole/editRole',
        method: 'get',
        params: query
    })
}
export const editRoleSubmit = data => {
    return request({
        url: '/api/v1/Productrole/editRole',
        method: 'post',
        data
    })
}