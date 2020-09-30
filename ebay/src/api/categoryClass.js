import request from '@/utils/http'
import { data } from 'autoprefixer'
export const getList = (query) => {
    return request({
        url: '/listing/listing/list_map',
        method: 'get',
        params: query
    })
}
export const deleteContent = (data) => {
    return request({
        url: '/listing/listing/del_map',
        method: 'post',
        data
    })
}
export const getCateList = () => {
        return request({
            url: '/listing/listing/cate_list',
            method: 'get',
        })
    }
    /* 根据平台id获取平台分类信息 */
export const getEbayCate = (query) => {
        return request({
            url: '/listing/listing/ebay_cate',
            method: 'get',
            params: query
        })
    }
    /* 根据公司id获取分类信息 */
export const getProductCate = query => {
        return request({
            url: '/listing/listing/product_cate',
            method: 'get',
            params: query
        })
    }
    /* 新建分类映射 */
export const createMap = (data) => {
        return request({
            url: '/listing/listing/create_map',
            method: 'post',
            data
        })
    }
    /* 获取创建人列表 */
export const getCteatorList = () => {
    return request({
        url: '/listing/info/staff/sellerlist',
        method: 'get',
    })
}