/* 调拨单 */
const baseURL = process.env.NODE_ENV === 'development' ? '/admin' : process.env.VUE_APP_ERP_JAVA_DOMAIN
import request from '@/utils/request'
/* 获取列表 */
export const getData = params => {
    return request({
        url: '/warehouseTransfer',
        method: 'get',
        params,
        baseURL
    })
}
/* 导出调拨单 */
export const exportData = params => {
    return request({
        url: '/warehouseTransfer/export',
        method: 'get',
        params,
        baseURL,
        responseType: 'blob'
    })
}
/* 调拨单详情 */
export const getContent = params => {
    return request({
        url: `/warehouseTransfer/${params}`,
        method: 'get',
        baseURL,
    })
}
/* 新增调拨单 */
export const createTransfer = data => {
    return request({
        url: `/warehouseTransfer`,
        method: 'post',
        data,
        baseURL,
    })
}
/* 修改调拨单 */
export const updateTransfers = data => {
    return request({
        url: `/warehouseTransfer`,
        method: 'put',
        data,
        baseURL,
    })
}
/* 作废调拨单 */
export const invalidTransfer = params => {
    return request({
        url: `/warehouseTransfer/drop/${params}`,
        method: 'get',
        baseURL,
    })
}
/* 审核调拨单 */
export const auditTransfer = data => {
    return request({
        url: `/warehouseTransfer/check`,
        method: 'post',
        data,
        baseURL,
    })
}
/* 查找sku */
export const findSkuDetail = ({ sourceWhouseId, distWhouseId, sku }) => {
    return request({
        url: `/warehouseTransfer/findSku/${sourceWhouseId}/${distWhouseId}/${sku}`,
        method: 'get',
        baseURL,
    })
}
