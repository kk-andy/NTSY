
import { param } from '@/utils'
import request from '@/utils/http'
import { data } from 'autoprefixer'
export const getData = params => {
    return request({
        url: '/listing/best_offer/list',
        method: 'get',
        params
    })
}
/* 接受 */
export const acceptListing = data => {
    return request({
        url: '/listing/best_offer/accept',
        method: 'post',
        data
    })
}
/* 拒绝 */
export const declineListing = data => {
    return request({
        url: '/listing/best_offer/decline',
        method: 'post',
        data
    })
}
/* 获取详情 */
export const counterInfo = params => {
    return request({
        url: '/listing/best_offer/counter_info',
        method: 'get',
        params
    })
}
/* 保存议价信息 */
export const saveCounterInfo = data => {
    return request({
        url: '/listing/best_offer/counter',
        method: 'post',
        data
    })
}
/* 添加备注信息 */
export const addNote = data => {
    return request({
        url: '/listing/best_offer/note',
        method: 'post',
        data
    })
}