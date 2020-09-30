import request from '@/utils/request'
import { data } from 'autoprefixer'

export const getData = (params) => {
    return request({
        url: '/listing/listing/list',
        method: 'get',
        params
    })
}
/* 单个修改价格 */
export const changePrice = data => {
    return request({
        url: '/listing/listing/single_price',
        method: 'post',
        data
    })
}
/* 单个修改库存 */
export const changeStock = data => {
    return request({
        url: '/listing/listing/single_quantity',
        method: 'post',
        data
    })
}
/* 单个修改促销价 */
export const changeSpecialPrice = data => {
    return request({
        url: '/listing/listing/single_special_price',
        method: 'post',
        data
    })
}
/* 操作日志 */
export const getLog = params => {
    return request({
        url: '/listing/listing/log',
        method: 'get',
        params
    })
}
/* 线上listing获取详细信息 */
export const getListingInfo = params => {
    return request({
        url: '/listing/listing/detail',
        method: 'get',
        params
    })
}
/* 上架 */
export const listingActive = data => {
    return request({
        url: '/listing/listing/active',
        method: 'post',
        data
    })
}
/* 下架 */
export const listingInactive = data => {
    return request({
        url: '/listing/listing/inactive',
        method: 'post',
        data
    })
}
/* 删除 */
export const listingDelete = data => {
    return request({
        url: '/listing/listing/delete',
        method: 'post',
        data
    })
}
/* 批量修改价格 */
export const allChangePrice = data => {
    return request({
        url: '/listing/listing/batch_price',
        method: 'post',
        data
    })
}
/* 批量修改库存 */
export const allChangeStock = data => {
    return request({
        url: '/listing/listing/batch_quantity',
        method: 'post',
        data
    })
}
/* 批量修改促销价 */
export const allChangeSpecialPrice = data => {
    return request({
        url: '/listing/listing/batch_special_price',
        method: 'post',
        data
    })
}
/* 更新listing信息 */
export const updateListingInfo = data => {
    return request({
        url: '/listing/listing/update',
        method: 'post',
        data
    })
}
/* 单个sku上架*/
export const singleSkuShelves = data => {
    return request({
        url: '/listing/listing/sku_active',
        method: 'post',
        data
    })
}
/* 单个sku下架*/
export const singleSkuOffShelf = data => {
    return request({
        url: '/listing/listing/sku_inactive',
        method: 'post',
        data
    })
}
/* 单个sku删除*/
export const singleSkuDelete = data => {
    return request({
        url: '/listing/listing/sku_delete',
        method: 'post',
        data
    })
}
/* 全量处理获取总数 */
export const getGloalTotal = params => {
    return request({
        url: '/listing/listing/gloab_update_count',
        method: 'get',
        params
    })
}
/* 全量处理提交 */
export const gloabUpdateSave = data => {
    return request({
        url: '/listing/listing/gloab_update_save',
        method: 'post',
        data
    })
}
/* 批量复制 */
export const batchCopy = data => {
    return request({
        url: '/listing/listing/batch_copy',
        method: 'post',
        data
    })
}