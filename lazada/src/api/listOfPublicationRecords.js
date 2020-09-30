import request from '@/utils/request'
import { data } from 'autoprefixer'
export const getData = (params) => {
    return request({
        url: '/listing/publishrecord/list',
        method: 'get',
        params
    })
}
/* 获取操作日志 */
export const getLogList = (params) => {
    return request({
        url: '/listing/publishrecord/log',
        method: 'get',
        params
    })
}
/* 批量或单个同步 */
export const updateSynchronous = (data) => {
    return request({
        url: '/listing/publishrecord/batch_sync',
        method: 'post',
        data
    })
}
/* 获取详细信息 */
export const getListingInfo = (params) => {
    return request({
        url: '/listing/publishrecord/detail',
        method: 'get',
        params
    })
}
/* 刊登记录保存 */
export const publishRecordUpdate = (data) => {
    return request({
        url: '/listing/publishrecord/update',
        method: 'post',
        data
    })
}