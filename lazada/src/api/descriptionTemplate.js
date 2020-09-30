import request from '@/utils/request'
import { data } from 'autoprefixer'
export const getData = (params) => {
    return request({
        url: '/listing/config/template/list',
        method: 'get',
        params
    })
}
export const addTemplate = (data) => {
    return request({
        url: '/listing/config/template/add',
        method: 'post',
        data
    })
}
export const getTemplateInfo = (params) => {
    return request({
        url: '/listing/config/template/get_edit',
        method: 'get',
        params
    })
}
export const saveTemplate = (data) => {
    return request({
        url: '/listing/config/template/edit',
        method:'post',
        data
    })
}