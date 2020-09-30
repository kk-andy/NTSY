import request from '@/utils/request'
import { data } from 'autoprefixer'

export const getData = (params) => {
    return request({
        url: '/listing/authshop/list',
        method: 'get',
        params
    })
}
export const getAuthshop  = params => {
    return request({
        url: '/listing/authshop/authinfo',
        method: 'get',
        params
    })
}
export const authshopEdit = data => {
     return request({
        url: '/listing/authshop/edit',
        method: 'post',
        data
     })
}