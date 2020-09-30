import request from '@/utils/request'
const baseURL = process.env.NODE_ENV === 'development' ? '/admin' : process.env.VUE_APP_ERP_JAVA_DOMAIN
/* 库存数据 */
export const getData = params => {
    return request({
        url: '/warehouseData',
        method: 'get',
        params,
        baseURL
    })
}
export const getContent = params => {
    return request({
        url: `/fbaOrder/${params}`,
        method: 'get',
        baseURL
    })
}
/* 导出 */
export const exportData = params => {
    return request({
        url: `/fbaOrder/export`,
        method: 'get',
        params,
        baseURL,
        responseType: 'blob'
    })
}