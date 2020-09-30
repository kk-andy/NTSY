/* 添加仓库 */
import request from '@/utils/request'
export const addWarehouse = data => {
    return request({
        url: '/warehouse/addOne',
        method: 'post',
        data
    })
}
/* 获取仓库详情 */
export const getWarehouseContent = params => {
    return request({
        url: '/warehouse/findDetails',
        method: 'get',
        params
    })
}