/* 盘点单模块 */
const baseURL = process.env.NODE_ENV === 'development' ? '/admin' : process.env.VUE_APP_ERP_JAVA_DOMAIN
import request from '@/utils/request'
/* 获取列表 */
export const getData = params => {
    return request({
        url: '/warehouseCheck',
        method: 'get',
        params,
        baseURL
    })
}
/* 获取盘点单详情 */
export const getContent = params => {
    return request({
        url: `/warehouseCheck/${params}`,
        method: 'get',
        baseURL
    })
}
/* 导出盘点单  */
export const exportData = params => {
    return request({
        url: `/warehouseCheck/export`,
        method: 'get',
        params,
        baseURL,
        responseType: 'blob'
    })
}
/* 修改盘点单 */
export const updateIninventory = data => {
    return request({
        url: `/warehouseCheck`,
        method: 'PUT',
        data,
        baseURL,
    })
}
/* 新增盘点单 */
export const addIninventory = data => {
    return request({
        url: `/warehouseCheck`,
        method: 'post',
        data,
        baseURL,
    })
}
/* 审核盘点单 */
export const auditIninvetory = data => {
    return request({
        url: `/warehouseCheck/check`,
        method: 'post',
        data,
        baseURL,
    })
}
/*查询sku */
export const findSkuDetail = ({ warehouseId, sku }) => {
    return request({
        url: `/warehouseCheck/findSku/${warehouseId}/${sku}`,
        method: 'get',
        baseURL,
    })
}
/* 作废盘点单 */
export const invalidIninvetory = params => {
    return request({
        url: `/warehouseCheck/drop/${params}`,
        method: 'get',
        baseURL,
    })
}